/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateContact(\n    $first_name: String!, \n    $last_name: String!, \n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name, \n        last_name: $last_name, \n        phones: { \n            data: $phones\n        }\n      }\n    ) {\n      returning {\n        id\n        first_name\n        last_name\n        phones {\n          number\n        }\n      }\n    }\n}\n": types.CreateContactDocument,
    " \nmutation DeleteContact($id: Int!) {\n  delete_contact(where: {\n    id: {\n      _eq: $id\n    }\n  }) {\n    returning {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n}\n": types.DeleteContactDocument,
    "\n  query GetContact($id: Int!) {\n    contact_by_pk(id: $id) {\n      id\n      first_name\n      last_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactDocument,
    "\n  query GetContacts(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateContact(\n    $first_name: String!, \n    $last_name: String!, \n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name, \n        last_name: $last_name, \n        phones: { \n            data: $phones\n        }\n      }\n    ) {\n      returning {\n        id\n        first_name\n        last_name\n        phones {\n          number\n        }\n      }\n    }\n}\n"): (typeof documents)["\n  mutation CreateContact(\n    $first_name: String!, \n    $last_name: String!, \n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name, \n        last_name: $last_name, \n        phones: { \n            data: $phones\n        }\n      }\n    ) {\n      returning {\n        id\n        first_name\n        last_name\n        phones {\n          number\n        }\n      }\n    }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: " \nmutation DeleteContact($id: Int!) {\n  delete_contact(where: {\n    id: {\n      _eq: $id\n    }\n  }) {\n    returning {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n}\n"): (typeof documents)[" \nmutation DeleteContact($id: Int!) {\n  delete_contact(where: {\n    id: {\n      _eq: $id\n    }\n  }) {\n    returning {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n}\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContact($id: Int!) {\n    contact_by_pk(id: $id) {\n      id\n      first_name\n      last_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContact($id: Int!) {\n    contact_by_pk(id: $id) {\n      id\n      first_name\n      last_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetContacts(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContacts(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;