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
    "\n  query MaatTokensApy($from: Float!) {\n    apies(where: { protocol: { id_eq: \"maat\" }, timestamp_gt: $from }) {\n      timestamp\n      token\n      id\n      apy\n    }\n    tokens {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n": types.MaatTokensApyDocument,
    "\n  query MaatTokensTvl($from: Float!) {\n    maatTvls(where: {timestamp_gt: $from}) {\n    id\n    staked\n    timestamp\n    token {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n  }\n": types.MaatTokensTvlDocument,
    "\n  query Overview($address: String!) {\n    apies(where: { protocol: { id_eq: \"maat\" } }, limit: 1, orderBy: id_DESC) {\n      apy\n    }\n    maatTvls(orderBy: id_DESC) {\n    staked\n    token {\n      decimals\n      symbol\n    }\n  }\n  strategies {\n    id\n  }\n  maatUserStats(address: $address) {\n    balances {\n      balance\n      vault\n    }\n  }\n  maatEarnings\n  }\n": types.OverviewDocument,
    "\n  query Rebalance($type_in: [ActionType!], $symbol: String) {\n    maatLastRebalanceTxIds {\n    token\n    txId\n  }\n  maatActions(where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    type\n    txhash\n    txId\n    timestamp\n    txId\n    data\n  }\n  strategyStats {\n    protocol\n    apy\n    chainName\n    strategyId\n  }}\n": types.RebalanceDocument,
    "\n  query MyQuery {\n    strategyStats {\n      apy\n      chainId\n      chainName\n      decimals\n      deposited\n      protocol\n      strategyId\n      tokenAddress\n      tokenSymbol\n    }\n  }\n": types.MyQueryDocument,
    "\n  query TxHistory($type_in: [ActionType!], $first: Int, $after: String, $symbol: String) {\n    maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},first: $first, after: $after) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n      }\n    }\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}": types.TxHistoryDocument,
    "\n  query TxHistoryDesktop($type_in: [ActionType!], $symbol: String, $limit: Int, $offset: Int) {\n    maatActions(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},limit: $limit, offset: $offset) {\n      type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n  }\n  maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    totalCount\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}": types.TxHistoryDesktopDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MaatTokensApy($from: Float!) {\n    apies(where: { protocol: { id_eq: \"maat\" }, timestamp_gt: $from }) {\n      timestamp\n      token\n      id\n      apy\n    }\n    tokens {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n"): (typeof documents)["\n  query MaatTokensApy($from: Float!) {\n    apies(where: { protocol: { id_eq: \"maat\" }, timestamp_gt: $from }) {\n      timestamp\n      token\n      id\n      apy\n    }\n    tokens {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MaatTokensTvl($from: Float!) {\n    maatTvls(where: {timestamp_gt: $from}) {\n    id\n    staked\n    timestamp\n    token {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n  }\n"): (typeof documents)["\n  query MaatTokensTvl($from: Float!) {\n    maatTvls(where: {timestamp_gt: $from}) {\n    id\n    staked\n    timestamp\n    token {\n      addresses\n      decimals\n      id\n      name\n      symbol\n    }\n  }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Overview($address: String!) {\n    apies(where: { protocol: { id_eq: \"maat\" } }, limit: 1, orderBy: id_DESC) {\n      apy\n    }\n    maatTvls(orderBy: id_DESC) {\n    staked\n    token {\n      decimals\n      symbol\n    }\n  }\n  strategies {\n    id\n  }\n  maatUserStats(address: $address) {\n    balances {\n      balance\n      vault\n    }\n  }\n  maatEarnings\n  }\n"): (typeof documents)["\n  query Overview($address: String!) {\n    apies(where: { protocol: { id_eq: \"maat\" } }, limit: 1, orderBy: id_DESC) {\n      apy\n    }\n    maatTvls(orderBy: id_DESC) {\n    staked\n    token {\n      decimals\n      symbol\n    }\n  }\n  strategies {\n    id\n  }\n  maatUserStats(address: $address) {\n    balances {\n      balance\n      vault\n    }\n  }\n  maatEarnings\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Rebalance($type_in: [ActionType!], $symbol: String) {\n    maatLastRebalanceTxIds {\n    token\n    txId\n  }\n  maatActions(where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    type\n    txhash\n    txId\n    timestamp\n    txId\n    data\n  }\n  strategyStats {\n    protocol\n    apy\n    chainName\n    strategyId\n  }}\n"): (typeof documents)["\n  query Rebalance($type_in: [ActionType!], $symbol: String) {\n    maatLastRebalanceTxIds {\n    token\n    txId\n  }\n  maatActions(where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    type\n    txhash\n    txId\n    timestamp\n    txId\n    data\n  }\n  strategyStats {\n    protocol\n    apy\n    chainName\n    strategyId\n  }}\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MyQuery {\n    strategyStats {\n      apy\n      chainId\n      chainName\n      decimals\n      deposited\n      protocol\n      strategyId\n      tokenAddress\n      tokenSymbol\n    }\n  }\n"): (typeof documents)["\n  query MyQuery {\n    strategyStats {\n      apy\n      chainId\n      chainName\n      decimals\n      deposited\n      protocol\n      strategyId\n      tokenAddress\n      tokenSymbol\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TxHistory($type_in: [ActionType!], $first: Int, $after: String, $symbol: String) {\n    maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},first: $first, after: $after) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n      }\n    }\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}"): (typeof documents)["\n  query TxHistory($type_in: [ActionType!], $first: Int, $after: String, $symbol: String) {\n    maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},first: $first, after: $after) {\n    totalCount\n    pageInfo {\n      hasNextPage\n      hasPreviousPage\n      startCursor\n      endCursor\n    }\n    edges {\n      cursor\n      node {\n        type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n      }\n    }\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TxHistoryDesktop($type_in: [ActionType!], $symbol: String, $limit: Int, $offset: Int) {\n    maatActions(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},limit: $limit, offset: $offset) {\n      type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n  }\n  maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    totalCount\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}"): (typeof documents)["\n  query TxHistoryDesktop($type_in: [ActionType!], $symbol: String, $limit: Int, $offset: Int) {\n    maatActions(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}},limit: $limit, offset: $offset) {\n      type\n        txhash\n        txId\n        timestamp\n        id\n        data\n        chain {\n          name\n          id\n        }\n  }\n  maatActionsConnection(orderBy: timestamp_DESC, where: {type_in: $type_in, token: {symbol_eq: $symbol}}) {\n    totalCount\n  }\n  strategyStats {\n    apy\n    chainId\n    chainName\n    decimals\n    deposited\n    strategyId\n    protocol\n    tokenAddress\n    tokenSymbol\n  }\n}"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;