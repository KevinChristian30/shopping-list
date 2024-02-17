import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface _SERVICE {
  'addToShoppingList' : ActorMethod<
    [
      {
        'userId' : Principal,
        'items' : Array<string>,
        'shoppingListId' : Principal,
      },
    ],
    {
        'Ok' : {
          'id' : Principal,
          'shoppingListName' : string,
          'userId' : Principal,
          'items' : Array<string>,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'ShoppingListDoesNotExist' : Principal }
      }
  >,
  'createShoppingList' : ActorMethod<
    [{ 'shoppingListName' : string, 'userId' : Principal }],
    {
        'Ok' : {
          'id' : Principal,
          'shoppingListName' : string,
          'userId' : Principal,
          'items' : Array<string>,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'ShoppingListDoesNotExist' : Principal }
      }
  >,
  'createUser' : ActorMethod<
    [{ 'username' : string }],
    {
      'id' : Principal,
      'username' : string,
      'shoppingLists' : Array<
        {
          'id' : Principal,
          'shoppingListName' : string,
          'userId' : Principal,
          'items' : Array<string>,
        }
      >,
    }
  >,
  'getShoppingLists' : ActorMethod<
    [Principal],
    {
        'Ok' : Array<
          {
            'id' : Principal,
            'shoppingListName' : string,
            'userId' : Principal,
            'items' : Array<string>,
          }
        >
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'ShoppingListDoesNotExist' : Principal }
      }
  >,
  'getUserById' : ActorMethod<
    [Principal],
    [] | [
      {
        'id' : Principal,
        'username' : string,
        'shoppingLists' : Array<
          {
            'id' : Principal,
            'shoppingListName' : string,
            'userId' : Principal,
            'items' : Array<string>,
          }
        >,
      }
    ]
  >,
  'getUserCount' : ActorMethod<[], bigint>,
  'getUsers' : ActorMethod<
    [],
    Array<
      {
        'id' : Principal,
        'username' : string,
        'shoppingLists' : Array<
          {
            'id' : Principal,
            'shoppingListName' : string,
            'userId' : Principal,
            'items' : Array<string>,
          }
        >,
      }
    >
  >,
  'removeFromShoppingList' : ActorMethod<
    [
      {
        'itemToRemove' : string,
        'userId' : Principal,
        'shoppingListId' : Principal,
      },
    ],
    {
        'Ok' : {
          'id' : Principal,
          'shoppingListName' : string,
          'userId' : Principal,
          'items' : Array<string>,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'ShoppingListDoesNotExist' : Principal }
      }
  >,
  'updateShoppingList' : ActorMethod<
    [
      {
        'shoppingListName' : string,
        'userId' : Principal,
        'shoppingListId' : Principal,
      },
    ],
    {
        'Ok' : {
          'id' : Principal,
          'shoppingListName' : string,
          'userId' : Principal,
          'items' : Array<string>,
        }
      } |
      {
        'Err' : { 'UserDoesNotExist' : Principal } |
          { 'ShoppingListDoesNotExist' : Principal }
      }
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: ({ IDL }: { IDL: IDL }) => IDL.Type[];
