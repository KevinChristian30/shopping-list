import {
  Canister,
  Err,
  int64,
  nat64,
  Ok,
  Opt,
  Principal,
  query,
  Record,
  Result,
  StableBTreeMap,
  text,
  update,
  Variant,
  Vec,
} from "azle";

const USERS_STORAGE_MEMORY_ID = 0;

const ShoppingList = Record({
  id: Principal,
  userId: Principal,
  shoppingListName: text,
  items: Vec(text),
});
type ShoppingList = typeof ShoppingList.tsType;

const ShoppingListCreateRequestDTO = Record({
  userId: Principal,
  shoppingListName: text,
});
type ShoppingListCreateRequestDTO = typeof ShoppingListCreateRequestDTO.tsType;

const ShoppingListUpdateRequestDTO = Record({
  userId: Principal,
  shoppingListId: Principal,
  shoppingListName: text,
});
type ShoppingListUpdateRequestDTO = typeof ShoppingListUpdateRequestDTO.tsType;

const ShoppingListItemsCreateRequestDTO = Record({
  userId: Principal,
  shoppingListId: Principal,
  items: Vec(text),
});
type ShoppingListItemsCreateRequestDTO =
  typeof ShoppingListItemsCreateRequestDTO.tsType;

const ShoppingListItemsRemoveRequestDTO = Record({
  userId: Principal,
  shoppingListId: Principal,
  itemToRemove: text,
});
type ShoppingListItemsRemoveRequestDTO =
  typeof ShoppingListItemsRemoveRequestDTO.tsType;

const User = Record({
  id: Principal,
  username: text,
  shoppingLists: Vec(ShoppingList),
});
type User = typeof User.tsType;

const UserCreateRequestDTO = Record({
  username: text,
});
type UserCreateRequestDTO = typeof UserCreateRequestDTO.tsType;

const Error = Variant({
  UserDoesNotExist: Principal,
  ShoppingListDoesNotExist: Principal,
});
type Error = typeof Error.tsType;

let usersStorage = StableBTreeMap<Principal, User>(USERS_STORAGE_MEMORY_ID);

function generateId(): Principal {
  const randomBytes = new Array(29)
    .fill(0)
    .map((_) => Math.floor(Math.random() * 256));

  return Principal.fromUint8Array(Uint8Array.from(randomBytes));
}

export default Canister({
  createUser: update(
    [UserCreateRequestDTO],
    User,
    (dto: UserCreateRequestDTO) => {
      const user: User = {
        id: generateId(),
        username: dto.username,
        shoppingLists: [],
      };
      usersStorage.insert(user.id, user);

      return user;
    }
  ),

  getUserCount: query([], nat64, () => {
    return usersStorage.len();
  }),

  getUserById: query([Principal], Opt(User), (id: Principal) => {
    return usersStorage.get(id);
  }),

  getUsers: query([], Vec(User), () => {
    return usersStorage.values();
  }),

  createShoppingList: update(
    [ShoppingListCreateRequestDTO],
    Result(ShoppingList, Error),
    (dto: ShoppingListCreateRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const user = userOpt.Some;
      let newShoppingList: ShoppingList = {
        id: generateId(),
        userId: user.id,
        shoppingListName: dto.shoppingListName,
        items: [],
      };

      user.shoppingLists = [...user.shoppingLists, newShoppingList];
      usersStorage.insert(user.id, user);

      return Ok(newShoppingList);
    }
  ),

  getShoppingLists: query(
    [Principal],
    Result(Vec(ShoppingList), Error),
    (userId: Principal) => {
      const userOpt = usersStorage.get(userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: userId,
        });
      }

      return Ok(userOpt.Some.shoppingLists);
    }
  ),

  updateShoppingList: update(
    [ShoppingListUpdateRequestDTO],
    Result(ShoppingList, Error),
    (dto: ShoppingListUpdateRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const user = userOpt.Some;
      for (let i = 0; i < user.shoppingLists.length; i++) {
        if (user.shoppingLists[i].id.compareTo(dto.shoppingListId) == "eq") {
          user.shoppingLists[i].shoppingListName = dto.shoppingListName;
          usersStorage.insert(user.id, user);
          return Ok(user.shoppingLists[i]);
        }
      }

      return Err({
        ShoppingListDoesNotExist: dto.shoppingListId,
      });
    }
  ),

  addToShoppingList: update(
    [ShoppingListItemsCreateRequestDTO],
    Result(ShoppingList, Error),
    (dto: ShoppingListItemsCreateRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const user = userOpt.Some;
      for (let i = 0; i < user.shoppingLists.length; i++) {
        if (user.shoppingLists[i].id.compareTo(dto.shoppingListId) == "eq") {
          user.shoppingLists[i].items = [
            ...user.shoppingLists[i].items,
            ...dto.items,
          ];
          usersStorage.insert(user.id, user);
          return Ok(user.shoppingLists[i]);
        }
      }

      return Err({
        ShoppingListDoesNotExist: dto.shoppingListId,
      });
    }
  ),

  removeFromShoppingList: update(
    [ShoppingListItemsRemoveRequestDTO],
    Result(ShoppingList, Error),
    (dto: ShoppingListItemsRemoveRequestDTO) => {
      const userOpt = usersStorage.get(dto.userId);
      if ("None" in userOpt) {
        return Err({
          UserDoesNotExist: dto.userId,
        });
      }

      const user = userOpt.Some;
      for (let i = 0; i < user.shoppingLists.length; i++) {
        if (user.shoppingLists[i].id.compareTo(dto.shoppingListId) == "eq") {
          user.shoppingLists[i].items = user.shoppingLists[i].items.filter(
            (item) => item != dto.itemToRemove
          );
          usersStorage.insert(user.id, user);
          return Ok(user.shoppingLists[i]);
        }
      }

      return Err({
        ShoppingListDoesNotExist: dto.shoppingListId,
      });
    }
  ),
});
