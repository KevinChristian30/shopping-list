export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'addToShoppingList' : IDL.Func(
        [
          IDL.Record({
            'userId' : IDL.Principal,
            'items' : IDL.Vec(IDL.Text),
            'shoppingListId' : IDL.Principal,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'shoppingListName' : IDL.Text,
              'userId' : IDL.Principal,
              'items' : IDL.Vec(IDL.Text),
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'ShoppingListDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'createShoppingList' : IDL.Func(
        [
          IDL.Record({
            'shoppingListName' : IDL.Text,
            'userId' : IDL.Principal,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'shoppingListName' : IDL.Text,
              'userId' : IDL.Principal,
              'items' : IDL.Vec(IDL.Text),
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'ShoppingListDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'createUser' : IDL.Func(
        [IDL.Record({ 'username' : IDL.Text })],
        [
          IDL.Record({
            'id' : IDL.Principal,
            'username' : IDL.Text,
            'shoppingLists' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'shoppingListName' : IDL.Text,
                'userId' : IDL.Principal,
                'items' : IDL.Vec(IDL.Text),
              })
            ),
          }),
        ],
        [],
      ),
    'getShoppingLists' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Variant({
            'Ok' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Principal,
                'shoppingListName' : IDL.Text,
                'userId' : IDL.Principal,
                'items' : IDL.Vec(IDL.Text),
              })
            ),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'ShoppingListDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        ['query'],
      ),
    'getUserById' : IDL.Func(
        [IDL.Principal],
        [
          IDL.Opt(
            IDL.Record({
              'id' : IDL.Principal,
              'username' : IDL.Text,
              'shoppingLists' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'shoppingListName' : IDL.Text,
                  'userId' : IDL.Principal,
                  'items' : IDL.Vec(IDL.Text),
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'getUserCount' : IDL.Func([], [IDL.Nat64], ['query']),
    'getUsers' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Principal,
              'username' : IDL.Text,
              'shoppingLists' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Principal,
                  'shoppingListName' : IDL.Text,
                  'userId' : IDL.Principal,
                  'items' : IDL.Vec(IDL.Text),
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'removeFromShoppingList' : IDL.Func(
        [
          IDL.Record({
            'itemToRemove' : IDL.Text,
            'userId' : IDL.Principal,
            'shoppingListId' : IDL.Principal,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'shoppingListName' : IDL.Text,
              'userId' : IDL.Principal,
              'items' : IDL.Vec(IDL.Text),
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'ShoppingListDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
    'updateShoppingList' : IDL.Func(
        [
          IDL.Record({
            'shoppingListName' : IDL.Text,
            'userId' : IDL.Principal,
            'shoppingListId' : IDL.Principal,
          }),
        ],
        [
          IDL.Variant({
            'Ok' : IDL.Record({
              'id' : IDL.Principal,
              'shoppingListName' : IDL.Text,
              'userId' : IDL.Principal,
              'items' : IDL.Vec(IDL.Text),
            }),
            'Err' : IDL.Variant({
              'UserDoesNotExist' : IDL.Principal,
              'ShoppingListDoesNotExist' : IDL.Principal,
            }),
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
