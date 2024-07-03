/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** Big number integer */
  BigInt: { input: any; output: any; }
  /** A scalar that can represent any JSON value */
  JSON: { input: any; output: any; }
};

export type Apy = {
  __typename?: 'APY';
  apy: Scalars['Float']['output'];
  chain: Chain;
  id: Scalars['String']['output'];
  protocol: Protocol;
  timestamp: Scalars['Float']['output'];
  token: Scalars['String']['output'];
};

export type ApyEdge = {
  __typename?: 'APYEdge';
  cursor: Scalars['String']['output'];
  node: Apy;
};

export enum ApyOrderByInput {
  ApyAsc = 'apy_ASC',
  ApyAscNullsFirst = 'apy_ASC_NULLS_FIRST',
  ApyAscNullsLast = 'apy_ASC_NULLS_LAST',
  ApyDesc = 'apy_DESC',
  ApyDescNullsFirst = 'apy_DESC_NULLS_FIRST',
  ApyDescNullsLast = 'apy_DESC_NULLS_LAST',
  ChainIdAsc = 'chain_id_ASC',
  ChainIdAscNullsFirst = 'chain_id_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chain_id_ASC_NULLS_LAST',
  ChainIdDesc = 'chain_id_DESC',
  ChainIdDescNullsFirst = 'chain_id_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chain_id_DESC_NULLS_LAST',
  ChainNameAsc = 'chain_name_ASC',
  ChainNameAscNullsFirst = 'chain_name_ASC_NULLS_FIRST',
  ChainNameAscNullsLast = 'chain_name_ASC_NULLS_LAST',
  ChainNameDesc = 'chain_name_DESC',
  ChainNameDescNullsFirst = 'chain_name_DESC_NULLS_FIRST',
  ChainNameDescNullsLast = 'chain_name_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProtocolIdAsc = 'protocol_id_ASC',
  ProtocolIdAscNullsFirst = 'protocol_id_ASC_NULLS_FIRST',
  ProtocolIdAscNullsLast = 'protocol_id_ASC_NULLS_LAST',
  ProtocolIdDesc = 'protocol_id_DESC',
  ProtocolIdDescNullsFirst = 'protocol_id_DESC_NULLS_FIRST',
  ProtocolIdDescNullsLast = 'protocol_id_DESC_NULLS_LAST',
  ProtocolNameAsc = 'protocol_name_ASC',
  ProtocolNameAscNullsFirst = 'protocol_name_ASC_NULLS_FIRST',
  ProtocolNameAscNullsLast = 'protocol_name_ASC_NULLS_LAST',
  ProtocolNameDesc = 'protocol_name_DESC',
  ProtocolNameDescNullsFirst = 'protocol_name_DESC_NULLS_FIRST',
  ProtocolNameDescNullsLast = 'protocol_name_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenAsc = 'token_ASC',
  TokenAscNullsFirst = 'token_ASC_NULLS_FIRST',
  TokenAscNullsLast = 'token_ASC_NULLS_LAST',
  TokenDesc = 'token_DESC',
  TokenDescNullsFirst = 'token_DESC_NULLS_FIRST',
  TokenDescNullsLast = 'token_DESC_NULLS_LAST'
}

export type ApyWhereInput = {
  AND?: InputMaybe<Array<ApyWhereInput>>;
  OR?: InputMaybe<Array<ApyWhereInput>>;
  apy_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_gt?: InputMaybe<Scalars['Float']['input']>;
  apy_gte?: InputMaybe<Scalars['Float']['input']>;
  apy_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  apy_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  apy_lt?: InputMaybe<Scalars['Float']['input']>;
  apy_lte?: InputMaybe<Scalars['Float']['input']>;
  apy_not_eq?: InputMaybe<Scalars['Float']['input']>;
  apy_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  chain?: InputMaybe<ChainWhereInput>;
  chain_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  protocol?: InputMaybe<ProtocolWhereInput>;
  protocol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  token_contains?: InputMaybe<Scalars['String']['input']>;
  token_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_eq?: InputMaybe<Scalars['String']['input']>;
  token_gt?: InputMaybe<Scalars['String']['input']>;
  token_gte?: InputMaybe<Scalars['String']['input']>;
  token_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token_lt?: InputMaybe<Scalars['String']['input']>;
  token_lte?: InputMaybe<Scalars['String']['input']>;
  token_not_contains?: InputMaybe<Scalars['String']['input']>;
  token_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  token_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  token_not_eq?: InputMaybe<Scalars['String']['input']>;
  token_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  token_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type APiesConnection = {
  __typename?: 'APiesConnection';
  edges: Array<ApyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export enum ActionType {
  AddStrategy = 'ADD_STRATEGY',
  Bridge = 'BRIDGE',
  Deposit = 'DEPOSIT',
  DepositInStrategy = 'DEPOSIT_IN_STRATEGY',
  RebalanceFulfillment = 'REBALANCE_FULFILLMENT',
  RebalanceRequest = 'REBALANCE_REQUEST',
  RemoveStrategy = 'REMOVE_STRATEGY',
  Withdraw = 'WITHDRAW',
  WithdrawFromStrategy = 'WITHDRAW_FROM_STRATEGY',
  WithdrawRequestFulfillment = 'WITHDRAW_REQUEST_FULFILLMENT'
}

export type Balance = {
  __typename?: 'Balance';
  balance: Scalars['BigInt']['output'];
  vault: Scalars['String']['output'];
};

export type Chain = {
  __typename?: 'Chain';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  protocols: Array<Protocol>;
  strategies: Array<Strategy>;
};


export type ChainProtocolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProtocolOrderByInput>>;
  where?: InputMaybe<ProtocolWhereInput>;
};


export type ChainStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyOrderByInput>>;
  where?: InputMaybe<StrategyWhereInput>;
};

export type ChainEdge = {
  __typename?: 'ChainEdge';
  cursor: Scalars['String']['output'];
  node: Chain;
};

export enum ChainOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST'
}

export type ChainWhereInput = {
  AND?: InputMaybe<Array<ChainWhereInput>>;
  OR?: InputMaybe<Array<ChainWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  protocols_every?: InputMaybe<ProtocolWhereInput>;
  protocols_none?: InputMaybe<ProtocolWhereInput>;
  protocols_some?: InputMaybe<ProtocolWhereInput>;
  strategies_every?: InputMaybe<StrategyWhereInput>;
  strategies_none?: InputMaybe<StrategyWhereInput>;
  strategies_some?: InputMaybe<StrategyWhereInput>;
};

export type ChainsConnection = {
  __typename?: 'ChainsConnection';
  edges: Array<ChainEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MaatAction = {
  __typename?: 'MaatAction';
  chain: Chain;
  data: Scalars['JSON']['output'];
  id: Scalars['String']['output'];
  timestamp: Scalars['Float']['output'];
  token: Token;
  txId?: Maybe<Scalars['String']['output']>;
  txhash: Scalars['String']['output'];
  type: ActionType;
};

export type MaatActionEdge = {
  __typename?: 'MaatActionEdge';
  cursor: Scalars['String']['output'];
  node: MaatAction;
};

export enum MaatActionOrderByInput {
  ChainIdAsc = 'chain_id_ASC',
  ChainIdAscNullsFirst = 'chain_id_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chain_id_ASC_NULLS_LAST',
  ChainIdDesc = 'chain_id_DESC',
  ChainIdDescNullsFirst = 'chain_id_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chain_id_DESC_NULLS_LAST',
  ChainNameAsc = 'chain_name_ASC',
  ChainNameAscNullsFirst = 'chain_name_ASC_NULLS_FIRST',
  ChainNameAscNullsLast = 'chain_name_ASC_NULLS_LAST',
  ChainNameDesc = 'chain_name_DESC',
  ChainNameDescNullsFirst = 'chain_name_DESC_NULLS_FIRST',
  ChainNameDescNullsLast = 'chain_name_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsAscNullsLast = 'token_decimals_ASC_NULLS_LAST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsFirst = 'token_decimals_DESC_NULLS_FIRST',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdAscNullsLast = 'token_id_ASC_NULLS_LAST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsFirst = 'token_id_DESC_NULLS_FIRST',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameAscNullsLast = 'token_name_ASC_NULLS_LAST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsFirst = 'token_name_DESC_NULLS_FIRST',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolAscNullsLast = 'token_symbol_ASC_NULLS_LAST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsFirst = 'token_symbol_DESC_NULLS_FIRST',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST',
  TxIdAsc = 'txId_ASC',
  TxIdAscNullsFirst = 'txId_ASC_NULLS_FIRST',
  TxIdAscNullsLast = 'txId_ASC_NULLS_LAST',
  TxIdDesc = 'txId_DESC',
  TxIdDescNullsFirst = 'txId_DESC_NULLS_FIRST',
  TxIdDescNullsLast = 'txId_DESC_NULLS_LAST',
  TxhashAsc = 'txhash_ASC',
  TxhashAscNullsFirst = 'txhash_ASC_NULLS_FIRST',
  TxhashAscNullsLast = 'txhash_ASC_NULLS_LAST',
  TxhashDesc = 'txhash_DESC',
  TxhashDescNullsFirst = 'txhash_DESC_NULLS_FIRST',
  TxhashDescNullsLast = 'txhash_DESC_NULLS_LAST',
  TypeAsc = 'type_ASC',
  TypeAscNullsFirst = 'type_ASC_NULLS_FIRST',
  TypeAscNullsLast = 'type_ASC_NULLS_LAST',
  TypeDesc = 'type_DESC',
  TypeDescNullsFirst = 'type_DESC_NULLS_FIRST',
  TypeDescNullsLast = 'type_DESC_NULLS_LAST'
}

export type MaatActionWhereInput = {
  AND?: InputMaybe<Array<MaatActionWhereInput>>;
  OR?: InputMaybe<Array<MaatActionWhereInput>>;
  chain?: InputMaybe<ChainWhereInput>;
  chain_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  data_eq?: InputMaybe<Scalars['JSON']['input']>;
  data_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  data_jsonContains?: InputMaybe<Scalars['JSON']['input']>;
  data_jsonHasKey?: InputMaybe<Scalars['JSON']['input']>;
  data_not_eq?: InputMaybe<Scalars['JSON']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  timestamp_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txId_contains?: InputMaybe<Scalars['String']['input']>;
  txId_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txId_endsWith?: InputMaybe<Scalars['String']['input']>;
  txId_eq?: InputMaybe<Scalars['String']['input']>;
  txId_gt?: InputMaybe<Scalars['String']['input']>;
  txId_gte?: InputMaybe<Scalars['String']['input']>;
  txId_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txId_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txId_lt?: InputMaybe<Scalars['String']['input']>;
  txId_lte?: InputMaybe<Scalars['String']['input']>;
  txId_not_contains?: InputMaybe<Scalars['String']['input']>;
  txId_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txId_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txId_not_eq?: InputMaybe<Scalars['String']['input']>;
  txId_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txId_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txId_startsWith?: InputMaybe<Scalars['String']['input']>;
  txhash_contains?: InputMaybe<Scalars['String']['input']>;
  txhash_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txhash_endsWith?: InputMaybe<Scalars['String']['input']>;
  txhash_eq?: InputMaybe<Scalars['String']['input']>;
  txhash_gt?: InputMaybe<Scalars['String']['input']>;
  txhash_gte?: InputMaybe<Scalars['String']['input']>;
  txhash_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txhash_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  txhash_lt?: InputMaybe<Scalars['String']['input']>;
  txhash_lte?: InputMaybe<Scalars['String']['input']>;
  txhash_not_contains?: InputMaybe<Scalars['String']['input']>;
  txhash_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  txhash_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  txhash_not_eq?: InputMaybe<Scalars['String']['input']>;
  txhash_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  txhash_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  txhash_startsWith?: InputMaybe<Scalars['String']['input']>;
  type_eq?: InputMaybe<ActionType>;
  type_in?: InputMaybe<Array<ActionType>>;
  type_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  type_not_eq?: InputMaybe<ActionType>;
  type_not_in?: InputMaybe<Array<ActionType>>;
};

export type MaatActionsConnection = {
  __typename?: 'MaatActionsConnection';
  edges: Array<MaatActionEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type MaatTvl = {
  __typename?: 'MaatTVL';
  id: Scalars['String']['output'];
  staked: Scalars['BigInt']['output'];
  timestamp: Scalars['Float']['output'];
  token: Token;
};

export type MaatTvlEdge = {
  __typename?: 'MaatTVLEdge';
  cursor: Scalars['String']['output'];
  node: MaatTvl;
};

export enum MaatTvlOrderByInput {
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  StakedAsc = 'staked_ASC',
  StakedAscNullsFirst = 'staked_ASC_NULLS_FIRST',
  StakedAscNullsLast = 'staked_ASC_NULLS_LAST',
  StakedDesc = 'staked_DESC',
  StakedDescNullsFirst = 'staked_DESC_NULLS_FIRST',
  StakedDescNullsLast = 'staked_DESC_NULLS_LAST',
  TimestampAsc = 'timestamp_ASC',
  TimestampAscNullsFirst = 'timestamp_ASC_NULLS_FIRST',
  TimestampAscNullsLast = 'timestamp_ASC_NULLS_LAST',
  TimestampDesc = 'timestamp_DESC',
  TimestampDescNullsFirst = 'timestamp_DESC_NULLS_FIRST',
  TimestampDescNullsLast = 'timestamp_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsAscNullsLast = 'token_decimals_ASC_NULLS_LAST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsFirst = 'token_decimals_DESC_NULLS_FIRST',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdAscNullsLast = 'token_id_ASC_NULLS_LAST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsFirst = 'token_id_DESC_NULLS_FIRST',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameAscNullsLast = 'token_name_ASC_NULLS_LAST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsFirst = 'token_name_DESC_NULLS_FIRST',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolAscNullsLast = 'token_symbol_ASC_NULLS_LAST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsFirst = 'token_symbol_DESC_NULLS_FIRST',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST'
}

export type MaatTvlWhereInput = {
  AND?: InputMaybe<Array<MaatTvlWhereInput>>;
  OR?: InputMaybe<Array<MaatTvlWhereInput>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  staked_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_gte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  staked_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  staked_lt?: InputMaybe<Scalars['BigInt']['input']>;
  staked_lte?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_eq?: InputMaybe<Scalars['BigInt']['input']>;
  staked_not_in?: InputMaybe<Array<Scalars['BigInt']['input']>>;
  timestamp_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_gte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  timestamp_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  timestamp_lt?: InputMaybe<Scalars['Float']['input']>;
  timestamp_lte?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_eq?: InputMaybe<Scalars['Float']['input']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['Float']['input']>>;
  token?: InputMaybe<TokenWhereInput>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type MaatTvLsConnection = {
  __typename?: 'MaatTVLsConnection';
  edges: Array<MaatTvlEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor: Scalars['String']['output'];
  hasNextPage: Scalars['Boolean']['output'];
  hasPreviousPage: Scalars['Boolean']['output'];
  startCursor: Scalars['String']['output'];
};

export type Protocol = {
  __typename?: 'Protocol';
  chain?: Maybe<Chain>;
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  strategies: Array<Strategy>;
};


export type ProtocolStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyOrderByInput>>;
  where?: InputMaybe<StrategyWhereInput>;
};

export type ProtocolEdge = {
  __typename?: 'ProtocolEdge';
  cursor: Scalars['String']['output'];
  node: Protocol;
};

export enum ProtocolOrderByInput {
  ChainIdAsc = 'chain_id_ASC',
  ChainIdAscNullsFirst = 'chain_id_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chain_id_ASC_NULLS_LAST',
  ChainIdDesc = 'chain_id_DESC',
  ChainIdDescNullsFirst = 'chain_id_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chain_id_DESC_NULLS_LAST',
  ChainNameAsc = 'chain_name_ASC',
  ChainNameAscNullsFirst = 'chain_name_ASC_NULLS_FIRST',
  ChainNameAscNullsLast = 'chain_name_ASC_NULLS_LAST',
  ChainNameDesc = 'chain_name_DESC',
  ChainNameDescNullsFirst = 'chain_name_DESC_NULLS_FIRST',
  ChainNameDescNullsLast = 'chain_name_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST'
}

export type ProtocolWhereInput = {
  AND?: InputMaybe<Array<ProtocolWhereInput>>;
  OR?: InputMaybe<Array<ProtocolWhereInput>>;
  chain?: InputMaybe<ChainWhereInput>;
  chain_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  strategies_every?: InputMaybe<StrategyWhereInput>;
  strategies_none?: InputMaybe<StrategyWhereInput>;
  strategies_some?: InputMaybe<StrategyWhereInput>;
};

export type ProtocolsConnection = {
  __typename?: 'ProtocolsConnection';
  edges: Array<ProtocolEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  apies: Array<Apy>;
  apiesConnection: APiesConnection;
  apyById?: Maybe<Apy>;
  /** @deprecated Use apyById */
  apyByUniqueInput?: Maybe<Apy>;
  chainById?: Maybe<Chain>;
  /** @deprecated Use chainById */
  chainByUniqueInput?: Maybe<Chain>;
  chains: Array<Chain>;
  chainsConnection: ChainsConnection;
  maatActionById?: Maybe<MaatAction>;
  /** @deprecated Use maatActionById */
  maatActionByUniqueInput?: Maybe<MaatAction>;
  maatActions: Array<MaatAction>;
  maatActionsConnection: MaatActionsConnection;
  maatEarnings: Scalars['String']['output'];
  maatLastRebalanceTxIds: Array<RebalanceTxId>;
  maatTvlById?: Maybe<MaatTvl>;
  /** @deprecated Use maatTvlById */
  maatTvlByUniqueInput?: Maybe<MaatTvl>;
  maatTvls: Array<MaatTvl>;
  maatTvlsConnection: MaatTvLsConnection;
  maatUserStats: UserData;
  protocolById?: Maybe<Protocol>;
  /** @deprecated Use protocolById */
  protocolByUniqueInput?: Maybe<Protocol>;
  protocols: Array<Protocol>;
  protocolsConnection: ProtocolsConnection;
  squidStatus?: Maybe<SquidStatus>;
  strategies: Array<Strategy>;
  strategiesConnection: StrategiesConnection;
  strategyById?: Maybe<Strategy>;
  /** @deprecated Use strategyById */
  strategyByUniqueInput?: Maybe<Strategy>;
  strategyStats: Array<StrategyStats>;
  tokenById?: Maybe<Token>;
  /** @deprecated Use tokenById */
  tokenByUniqueInput?: Maybe<Token>;
  tokens: Array<Token>;
  tokensConnection: TokensConnection;
};


export type QueryApiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ApyOrderByInput>>;
  where?: InputMaybe<ApyWhereInput>;
};


export type QueryApiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ApyOrderByInput>;
  where?: InputMaybe<ApyWhereInput>;
};


export type QueryApyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryApyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryChainByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryChainByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryChainsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ChainOrderByInput>>;
  where?: InputMaybe<ChainWhereInput>;
};


export type QueryChainsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ChainOrderByInput>;
  where?: InputMaybe<ChainWhereInput>;
};


export type QueryMaatActionByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMaatActionByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMaatActionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MaatActionOrderByInput>>;
  where?: InputMaybe<MaatActionWhereInput>;
};


export type QueryMaatActionsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MaatActionOrderByInput>;
  where?: InputMaybe<MaatActionWhereInput>;
};


export type QueryMaatTvlByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryMaatTvlByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryMaatTvlsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<MaatTvlOrderByInput>>;
  where?: InputMaybe<MaatTvlWhereInput>;
};


export type QueryMaatTvlsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<MaatTvlOrderByInput>;
  where?: InputMaybe<MaatTvlWhereInput>;
};


export type QueryMaatUserStatsArgs = {
  address: Scalars['String']['input'];
};


export type QueryProtocolByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryProtocolByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryProtocolsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<ProtocolOrderByInput>>;
  where?: InputMaybe<ProtocolWhereInput>;
};


export type QueryProtocolsConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<ProtocolOrderByInput>;
  where?: InputMaybe<ProtocolWhereInput>;
};


export type QueryStrategiesArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<StrategyOrderByInput>>;
  where?: InputMaybe<StrategyWhereInput>;
};


export type QueryStrategiesConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<StrategyOrderByInput>;
  where?: InputMaybe<StrategyWhereInput>;
};


export type QueryStrategyByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryStrategyByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryStrategyStatsArgs = {
  token?: InputMaybe<Scalars['String']['input']>;
};


export type QueryTokenByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryTokenByUniqueInputArgs = {
  where: WhereIdInput;
};


export type QueryTokensArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  orderBy?: InputMaybe<Array<TokenOrderByInput>>;
  where?: InputMaybe<TokenWhereInput>;
};


export type QueryTokensConnectionArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderBy: Array<TokenOrderByInput>;
  where?: InputMaybe<TokenWhereInput>;
};

export type RebalanceTxId = {
  __typename?: 'RebalanceTxId';
  token: Scalars['String']['output'];
  txId: Scalars['String']['output'];
};

export type SquidStatus = {
  __typename?: 'SquidStatus';
  /** The height of the processed part of the chain */
  height?: Maybe<Scalars['Int']['output']>;
};

export type StrategiesConnection = {
  __typename?: 'StrategiesConnection';
  edges: Array<StrategyEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type Strategy = {
  __typename?: 'Strategy';
  chain: Chain;
  id: Scalars['String']['output'];
  protocol: Protocol;
  token: Token;
  tokenAddress: Scalars['String']['output'];
};

export type StrategyEdge = {
  __typename?: 'StrategyEdge';
  cursor: Scalars['String']['output'];
  node: Strategy;
};

export enum StrategyOrderByInput {
  ChainIdAsc = 'chain_id_ASC',
  ChainIdAscNullsFirst = 'chain_id_ASC_NULLS_FIRST',
  ChainIdAscNullsLast = 'chain_id_ASC_NULLS_LAST',
  ChainIdDesc = 'chain_id_DESC',
  ChainIdDescNullsFirst = 'chain_id_DESC_NULLS_FIRST',
  ChainIdDescNullsLast = 'chain_id_DESC_NULLS_LAST',
  ChainNameAsc = 'chain_name_ASC',
  ChainNameAscNullsFirst = 'chain_name_ASC_NULLS_FIRST',
  ChainNameAscNullsLast = 'chain_name_ASC_NULLS_LAST',
  ChainNameDesc = 'chain_name_DESC',
  ChainNameDescNullsFirst = 'chain_name_DESC_NULLS_FIRST',
  ChainNameDescNullsLast = 'chain_name_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  ProtocolIdAsc = 'protocol_id_ASC',
  ProtocolIdAscNullsFirst = 'protocol_id_ASC_NULLS_FIRST',
  ProtocolIdAscNullsLast = 'protocol_id_ASC_NULLS_LAST',
  ProtocolIdDesc = 'protocol_id_DESC',
  ProtocolIdDescNullsFirst = 'protocol_id_DESC_NULLS_FIRST',
  ProtocolIdDescNullsLast = 'protocol_id_DESC_NULLS_LAST',
  ProtocolNameAsc = 'protocol_name_ASC',
  ProtocolNameAscNullsFirst = 'protocol_name_ASC_NULLS_FIRST',
  ProtocolNameAscNullsLast = 'protocol_name_ASC_NULLS_LAST',
  ProtocolNameDesc = 'protocol_name_DESC',
  ProtocolNameDescNullsFirst = 'protocol_name_DESC_NULLS_FIRST',
  ProtocolNameDescNullsLast = 'protocol_name_DESC_NULLS_LAST',
  TokenAddressAsc = 'tokenAddress_ASC',
  TokenAddressAscNullsFirst = 'tokenAddress_ASC_NULLS_FIRST',
  TokenAddressAscNullsLast = 'tokenAddress_ASC_NULLS_LAST',
  TokenAddressDesc = 'tokenAddress_DESC',
  TokenAddressDescNullsFirst = 'tokenAddress_DESC_NULLS_FIRST',
  TokenAddressDescNullsLast = 'tokenAddress_DESC_NULLS_LAST',
  TokenDecimalsAsc = 'token_decimals_ASC',
  TokenDecimalsAscNullsFirst = 'token_decimals_ASC_NULLS_FIRST',
  TokenDecimalsAscNullsLast = 'token_decimals_ASC_NULLS_LAST',
  TokenDecimalsDesc = 'token_decimals_DESC',
  TokenDecimalsDescNullsFirst = 'token_decimals_DESC_NULLS_FIRST',
  TokenDecimalsDescNullsLast = 'token_decimals_DESC_NULLS_LAST',
  TokenIdAsc = 'token_id_ASC',
  TokenIdAscNullsFirst = 'token_id_ASC_NULLS_FIRST',
  TokenIdAscNullsLast = 'token_id_ASC_NULLS_LAST',
  TokenIdDesc = 'token_id_DESC',
  TokenIdDescNullsFirst = 'token_id_DESC_NULLS_FIRST',
  TokenIdDescNullsLast = 'token_id_DESC_NULLS_LAST',
  TokenNameAsc = 'token_name_ASC',
  TokenNameAscNullsFirst = 'token_name_ASC_NULLS_FIRST',
  TokenNameAscNullsLast = 'token_name_ASC_NULLS_LAST',
  TokenNameDesc = 'token_name_DESC',
  TokenNameDescNullsFirst = 'token_name_DESC_NULLS_FIRST',
  TokenNameDescNullsLast = 'token_name_DESC_NULLS_LAST',
  TokenSymbolAsc = 'token_symbol_ASC',
  TokenSymbolAscNullsFirst = 'token_symbol_ASC_NULLS_FIRST',
  TokenSymbolAscNullsLast = 'token_symbol_ASC_NULLS_LAST',
  TokenSymbolDesc = 'token_symbol_DESC',
  TokenSymbolDescNullsFirst = 'token_symbol_DESC_NULLS_FIRST',
  TokenSymbolDescNullsLast = 'token_symbol_DESC_NULLS_LAST'
}

export type StrategyStats = {
  __typename?: 'StrategyStats';
  apy: Scalars['Float']['output'];
  chainId: Scalars['String']['output'];
  chainName: Scalars['String']['output'];
  decimals: Scalars['Float']['output'];
  deposited: Scalars['BigInt']['output'];
  protocol: Scalars['String']['output'];
  strategyId: Scalars['String']['output'];
  tokenAddress: Scalars['String']['output'];
  tokenSymbol: Scalars['String']['output'];
};

export type StrategyWhereInput = {
  AND?: InputMaybe<Array<StrategyWhereInput>>;
  OR?: InputMaybe<Array<StrategyWhereInput>>;
  chain?: InputMaybe<ChainWhereInput>;
  chain_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  protocol?: InputMaybe<ProtocolWhereInput>;
  protocol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  token?: InputMaybe<TokenWhereInput>;
  tokenAddress_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_gte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  tokenAddress_lt?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_lte?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_contains?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_eq?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  tokenAddress_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  tokenAddress_startsWith?: InputMaybe<Scalars['String']['input']>;
  token_isNull?: InputMaybe<Scalars['Boolean']['input']>;
};

export type Token = {
  __typename?: 'Token';
  addresses: Array<Scalars['String']['output']>;
  decimals: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  symbol: Scalars['String']['output'];
};

export type TokenEdge = {
  __typename?: 'TokenEdge';
  cursor: Scalars['String']['output'];
  node: Token;
};

export enum TokenOrderByInput {
  DecimalsAsc = 'decimals_ASC',
  DecimalsAscNullsFirst = 'decimals_ASC_NULLS_FIRST',
  DecimalsAscNullsLast = 'decimals_ASC_NULLS_LAST',
  DecimalsDesc = 'decimals_DESC',
  DecimalsDescNullsFirst = 'decimals_DESC_NULLS_FIRST',
  DecimalsDescNullsLast = 'decimals_DESC_NULLS_LAST',
  IdAsc = 'id_ASC',
  IdAscNullsFirst = 'id_ASC_NULLS_FIRST',
  IdAscNullsLast = 'id_ASC_NULLS_LAST',
  IdDesc = 'id_DESC',
  IdDescNullsFirst = 'id_DESC_NULLS_FIRST',
  IdDescNullsLast = 'id_DESC_NULLS_LAST',
  NameAsc = 'name_ASC',
  NameAscNullsFirst = 'name_ASC_NULLS_FIRST',
  NameAscNullsLast = 'name_ASC_NULLS_LAST',
  NameDesc = 'name_DESC',
  NameDescNullsFirst = 'name_DESC_NULLS_FIRST',
  NameDescNullsLast = 'name_DESC_NULLS_LAST',
  SymbolAsc = 'symbol_ASC',
  SymbolAscNullsFirst = 'symbol_ASC_NULLS_FIRST',
  SymbolAscNullsLast = 'symbol_ASC_NULLS_LAST',
  SymbolDesc = 'symbol_DESC',
  SymbolDescNullsFirst = 'symbol_DESC_NULLS_FIRST',
  SymbolDescNullsLast = 'symbol_DESC_NULLS_LAST'
}

export type TokenWhereInput = {
  AND?: InputMaybe<Array<TokenWhereInput>>;
  OR?: InputMaybe<Array<TokenWhereInput>>;
  addresses_containsAll?: InputMaybe<Array<Scalars['String']['input']>>;
  addresses_containsAny?: InputMaybe<Array<Scalars['String']['input']>>;
  addresses_containsNone?: InputMaybe<Array<Scalars['String']['input']>>;
  addresses_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_gt?: InputMaybe<Scalars['Int']['input']>;
  decimals_gte?: InputMaybe<Scalars['Int']['input']>;
  decimals_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  decimals_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  decimals_lt?: InputMaybe<Scalars['Int']['input']>;
  decimals_lte?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_eq?: InputMaybe<Scalars['Int']['input']>;
  decimals_not_in?: InputMaybe<Array<Scalars['Int']['input']>>;
  id_contains?: InputMaybe<Scalars['String']['input']>;
  id_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_eq?: InputMaybe<Scalars['String']['input']>;
  id_gt?: InputMaybe<Scalars['String']['input']>;
  id_gte?: InputMaybe<Scalars['String']['input']>;
  id_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  id_lt?: InputMaybe<Scalars['String']['input']>;
  id_lte?: InputMaybe<Scalars['String']['input']>;
  id_not_contains?: InputMaybe<Scalars['String']['input']>;
  id_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  id_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  id_not_eq?: InputMaybe<Scalars['String']['input']>;
  id_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  id_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  id_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_contains?: InputMaybe<Scalars['String']['input']>;
  name_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_eq?: InputMaybe<Scalars['String']['input']>;
  name_gt?: InputMaybe<Scalars['String']['input']>;
  name_gte?: InputMaybe<Scalars['String']['input']>;
  name_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  name_lt?: InputMaybe<Scalars['String']['input']>;
  name_lte?: InputMaybe<Scalars['String']['input']>;
  name_not_contains?: InputMaybe<Scalars['String']['input']>;
  name_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  name_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  name_not_eq?: InputMaybe<Scalars['String']['input']>;
  name_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  name_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  name_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_gt?: InputMaybe<Scalars['String']['input']>;
  symbol_gte?: InputMaybe<Scalars['String']['input']>;
  symbol_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_isNull?: InputMaybe<Scalars['Boolean']['input']>;
  symbol_lt?: InputMaybe<Scalars['String']['input']>;
  symbol_lte?: InputMaybe<Scalars['String']['input']>;
  symbol_not_contains?: InputMaybe<Scalars['String']['input']>;
  symbol_not_containsInsensitive?: InputMaybe<Scalars['String']['input']>;
  symbol_not_endsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_not_eq?: InputMaybe<Scalars['String']['input']>;
  symbol_not_in?: InputMaybe<Array<Scalars['String']['input']>>;
  symbol_not_startsWith?: InputMaybe<Scalars['String']['input']>;
  symbol_startsWith?: InputMaybe<Scalars['String']['input']>;
};

export type TokensConnection = {
  __typename?: 'TokensConnection';
  edges: Array<TokenEdge>;
  pageInfo: PageInfo;
  totalCount: Scalars['Int']['output'];
};

export type UserData = {
  __typename?: 'UserData';
  balances: Array<Balance>;
};

export type WhereIdInput = {
  id: Scalars['String']['input'];
};

export type MaatTokensApyQueryVariables = Exact<{
  from: Scalars['Float']['input'];
}>;


export type MaatTokensApyQuery = { __typename?: 'Query', apies: Array<{ __typename?: 'APY', timestamp: number, token: string, id: string, apy: number }>, tokens: Array<{ __typename?: 'Token', addresses: Array<string>, decimals: number, id: string, name: string, symbol: string }> };

export type MaatTokensTvlQueryVariables = Exact<{
  from: Scalars['Float']['input'];
}>;


export type MaatTokensTvlQuery = { __typename?: 'Query', maatTvls: Array<{ __typename?: 'MaatTVL', id: string, staked: any, timestamp: number, token: { __typename?: 'Token', addresses: Array<string>, decimals: number, id: string, name: string, symbol: string } }> };

export type OverviewQueryVariables = Exact<{
  address: Scalars['String']['input'];
}>;


export type OverviewQuery = { __typename?: 'Query', maatEarnings: string, apies: Array<{ __typename?: 'APY', apy: number }>, maatTvls: Array<{ __typename?: 'MaatTVL', staked: any, token: { __typename?: 'Token', decimals: number, symbol: string } }>, strategies: Array<{ __typename?: 'Strategy', id: string }>, maatUserStats: { __typename?: 'UserData', balances: Array<{ __typename?: 'Balance', balance: any, vault: string }> } };

export type RebalanceQueryVariables = Exact<{
  type_in?: InputMaybe<Array<ActionType> | ActionType>;
}>;


export type RebalanceQuery = { __typename?: 'Query', maatLastRebalanceTxIds: Array<{ __typename?: 'RebalanceTxId', token: string, txId: string }>, maatActions: Array<{ __typename?: 'MaatAction', type: ActionType, txhash: string, txId?: string | null, timestamp: number, id: string, data: any }>, strategyStats: Array<{ __typename?: 'StrategyStats', protocol: string, chainName: string, strategyId: string }> };

export type MyQueryQueryVariables = Exact<{ [key: string]: never; }>;


export type MyQueryQuery = { __typename?: 'Query', strategyStats: Array<{ __typename?: 'StrategyStats', apy: number, chainId: string, chainName: string, decimals: number, deposited: any, protocol: string, strategyId: string, tokenAddress: string, tokenSymbol: string }> };

export type TxHistoryQueryVariables = Exact<{
  type_in?: InputMaybe<Array<ActionType> | ActionType>;
  first?: InputMaybe<Scalars['Int']['input']>;
  after?: InputMaybe<Scalars['String']['input']>;
  symbol?: InputMaybe<Scalars['String']['input']>;
}>;


export type TxHistoryQuery = { __typename?: 'Query', maatActionsConnection: { __typename?: 'MaatActionsConnection', totalCount: number, pageInfo: { __typename?: 'PageInfo', hasNextPage: boolean, hasPreviousPage: boolean, startCursor: string, endCursor: string }, edges: Array<{ __typename?: 'MaatActionEdge', cursor: string, node: { __typename?: 'MaatAction', type: ActionType, txhash: string, txId?: string | null, timestamp: number, id: string, data: any, chain: { __typename?: 'Chain', name: string, id: string } } }> }, strategyStats: Array<{ __typename?: 'StrategyStats', apy: number, chainId: string, chainName: string, decimals: number, deposited: any, strategyId: string, protocol: string, tokenAddress: string, tokenSymbol: string }> };

export type TxHistoryDesktopQueryVariables = Exact<{
  type_in?: InputMaybe<Array<ActionType> | ActionType>;
  symbol?: InputMaybe<Scalars['String']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
}>;


export type TxHistoryDesktopQuery = { __typename?: 'Query', maatActions: Array<{ __typename?: 'MaatAction', type: ActionType, txhash: string, txId?: string | null, timestamp: number, id: string, data: any, chain: { __typename?: 'Chain', name: string, id: string } }>, maatActionsConnection: { __typename?: 'MaatActionsConnection', totalCount: number }, strategyStats: Array<{ __typename?: 'StrategyStats', apy: number, chainId: string, chainName: string, decimals: number, deposited: any, strategyId: string, protocol: string, tokenAddress: string, tokenSymbol: string }> };


export const MaatTokensApyDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaatTokensApy"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"protocol"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"StringValue","value":"maat","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"apy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tokens"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]} as unknown as DocumentNode<MaatTokensApyQuery, MaatTokensApyQueryVariables>;
export const MaatTokensTvlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MaatTokensTvl"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"from"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Float"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maatTvls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"timestamp_gt"},"value":{"kind":"Variable","name":{"kind":"Name","value":"from"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"staked"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addresses"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}}]}}]} as unknown as DocumentNode<MaatTokensTvlQuery, MaatTokensTvlQueryVariables>;
export const OverviewDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Overview"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"address"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apies"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"protocol"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id_eq"},"value":{"kind":"StringValue","value":"maat","block":false}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apy"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maatTvls"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"id_DESC"}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"staked"}},{"kind":"Field","name":{"kind":"Name","value":"token"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"symbol"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategies"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maatUserStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"address"},"value":{"kind":"Variable","name":{"kind":"Name","value":"address"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balances"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"vault"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"maatEarnings"}}]}}]} as unknown as DocumentNode<OverviewQuery, OverviewQueryVariables>;
export const RebalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Rebalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActionType"}}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maatLastRebalanceTxIds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"maatActions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"txhash"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategyStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"protocol"}},{"kind":"Field","name":{"kind":"Name","value":"chainName"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}}]}}]}}]} as unknown as DocumentNode<RebalanceQuery, RebalanceQueryVariables>;
export const MyQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MyQuery"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"strategyStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apy"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"chainName"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"deposited"}},{"kind":"Field","name":{"kind":"Name","value":"protocol"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenSymbol"}}]}}]}}]} as unknown as DocumentNode<MyQueryQuery, MyQueryQueryVariables>;
export const TxHistoryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TxHistory"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActionType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"first"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"after"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maatActionsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"symbol_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"first"},"value":{"kind":"Variable","name":{"kind":"Name","value":"first"}}},{"kind":"Argument","name":{"kind":"Name","value":"after"},"value":{"kind":"Variable","name":{"kind":"Name","value":"after"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}},{"kind":"Field","name":{"kind":"Name","value":"pageInfo"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"hasNextPage"}},{"kind":"Field","name":{"kind":"Name","value":"hasPreviousPage"}},{"kind":"Field","name":{"kind":"Name","value":"startCursor"}},{"kind":"Field","name":{"kind":"Name","value":"endCursor"}}]}},{"kind":"Field","name":{"kind":"Name","value":"edges"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"cursor"}},{"kind":"Field","name":{"kind":"Name","value":"node"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"txhash"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategyStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apy"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"chainName"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"deposited"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"protocol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenSymbol"}}]}}]}}]} as unknown as DocumentNode<TxHistoryQuery, TxHistoryQueryVariables>;
export const TxHistoryDesktopDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TxHistoryDesktop"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}},"type":{"kind":"ListType","type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ActionType"}}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"limit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"offset"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"Int"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"maatActions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"symbol_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"limit"}}},{"kind":"Argument","name":{"kind":"Name","value":"offset"},"value":{"kind":"Variable","name":{"kind":"Name","value":"offset"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"type"}},{"kind":"Field","name":{"kind":"Name","value":"txhash"}},{"kind":"Field","name":{"kind":"Name","value":"txId"}},{"kind":"Field","name":{"kind":"Name","value":"timestamp"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"data"}},{"kind":"Field","name":{"kind":"Name","value":"chain"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"maatActionsConnection"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"EnumValue","value":"timestamp_DESC"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"type_in"},"value":{"kind":"Variable","name":{"kind":"Name","value":"type_in"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"token"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"symbol_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"symbol"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"totalCount"}}]}},{"kind":"Field","name":{"kind":"Name","value":"strategyStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"apy"}},{"kind":"Field","name":{"kind":"Name","value":"chainId"}},{"kind":"Field","name":{"kind":"Name","value":"chainName"}},{"kind":"Field","name":{"kind":"Name","value":"decimals"}},{"kind":"Field","name":{"kind":"Name","value":"deposited"}},{"kind":"Field","name":{"kind":"Name","value":"strategyId"}},{"kind":"Field","name":{"kind":"Name","value":"protocol"}},{"kind":"Field","name":{"kind":"Name","value":"tokenAddress"}},{"kind":"Field","name":{"kind":"Name","value":"tokenSymbol"}}]}}]}}]} as unknown as DocumentNode<TxHistoryDesktopQuery, TxHistoryDesktopQueryVariables>;