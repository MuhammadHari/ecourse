import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A datetime string with format `Y-m-d H:i:s`, e.g. `2018-05-23 13:43:32`. */
  DateTime: any;
  /** A date string with format `Y-m-d`, e.g. `2011-05-23`. */
  Date: any;
};

export type Query = {
  __typename?: 'Query';
  gRedirect?: Maybe<Scalars['String']>;
  dRedirect?: Maybe<Scalars['String']>;
  auth?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  name: Scalars['String'];
  email: Scalars['String'];
  google_only: Scalars['Boolean'];
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  has_connect_google: Scalars['Boolean'];
  is_drive_granted: Scalars['Boolean'];
};



/** The available directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Pagination information about the corresponding list of items. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Total count of available items in the page. */
  count: Scalars['Int'];
  /** Current pagination page. */
  currentPage: Scalars['Int'];
  /** Index of first item in the current page. */
  firstItem?: Maybe<Scalars['Int']>;
  /** If collection has more pages. */
  hasMorePages: Scalars['Boolean'];
  /** Index of last item in the current page. */
  lastItem?: Maybe<Scalars['Int']>;
  /** Last page number of the collection. */
  lastPage: Scalars['Int'];
  /** Number of items per page in the collection. */
  perPage: Scalars['Int'];
  /** Total items available in the collection. */
  total: Scalars['Int'];
};

/** Pagination information about the corresponding list of items. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** Total number of node in connection. */
  total?: Maybe<Scalars['Int']>;
  /** Count of nodes in current request. */
  count?: Maybe<Scalars['Int']>;
  /** Current page of request. */
  currentPage?: Maybe<Scalars['Int']>;
  /** Last page in connection. */
  lastPage?: Maybe<Scalars['Int']>;
};

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type GetGoogleRedirectQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGoogleRedirectQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'gRedirect'>
);

export type AuthQueryVariables = Exact<{ [key: string]: never; }>;


export type AuthQuery = (
  { __typename?: 'Query' }
  & { auth?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'google_only' | 'created_at' | 'updated_at' | 'is_drive_granted' | 'has_connect_google'>
  )> }
);

export type GetGDriveRedirectQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGDriveRedirectQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'dRedirect'>
);


export const GetGoogleRedirectDocument = gql`
    query GetGoogleRedirect {
  gRedirect
}
    `;

/**
 * __useGetGoogleRedirectQuery__
 *
 * To run a query within a React component, call `useGetGoogleRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGoogleRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGoogleRedirectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGoogleRedirectQuery(baseOptions?: Apollo.QueryHookOptions<GetGoogleRedirectQuery, GetGoogleRedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGoogleRedirectQuery, GetGoogleRedirectQueryVariables>(GetGoogleRedirectDocument, options);
      }
export function useGetGoogleRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGoogleRedirectQuery, GetGoogleRedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGoogleRedirectQuery, GetGoogleRedirectQueryVariables>(GetGoogleRedirectDocument, options);
        }
export type GetGoogleRedirectQueryHookResult = ReturnType<typeof useGetGoogleRedirectQuery>;
export type GetGoogleRedirectLazyQueryHookResult = ReturnType<typeof useGetGoogleRedirectLazyQuery>;
export type GetGoogleRedirectQueryResult = Apollo.QueryResult<GetGoogleRedirectQuery, GetGoogleRedirectQueryVariables>;
export const AuthDocument = gql`
    query Auth {
  auth {
    id
    name
    email
    google_only
    created_at
    updated_at
    is_drive_granted
    has_connect_google
  }
}
    `;

/**
 * __useAuthQuery__
 *
 * To run a query within a React component, call `useAuthQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthQuery({
 *   variables: {
 *   },
 * });
 */
export function useAuthQuery(baseOptions?: Apollo.QueryHookOptions<AuthQuery, AuthQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options);
      }
export function useAuthLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthQuery, AuthQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthQuery, AuthQueryVariables>(AuthDocument, options);
        }
export type AuthQueryHookResult = ReturnType<typeof useAuthQuery>;
export type AuthLazyQueryHookResult = ReturnType<typeof useAuthLazyQuery>;
export type AuthQueryResult = Apollo.QueryResult<AuthQuery, AuthQueryVariables>;
export const GetGDriveRedirectDocument = gql`
    query GetGDriveRedirect {
  dRedirect
}
    `;

/**
 * __useGetGDriveRedirectQuery__
 *
 * To run a query within a React component, call `useGetGDriveRedirectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGDriveRedirectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGDriveRedirectQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetGDriveRedirectQuery(baseOptions?: Apollo.QueryHookOptions<GetGDriveRedirectQuery, GetGDriveRedirectQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetGDriveRedirectQuery, GetGDriveRedirectQueryVariables>(GetGDriveRedirectDocument, options);
      }
export function useGetGDriveRedirectLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetGDriveRedirectQuery, GetGDriveRedirectQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetGDriveRedirectQuery, GetGDriveRedirectQueryVariables>(GetGDriveRedirectDocument, options);
        }
export type GetGDriveRedirectQueryHookResult = ReturnType<typeof useGetGDriveRedirectQuery>;
export type GetGDriveRedirectLazyQueryHookResult = ReturnType<typeof useGetGDriveRedirectLazyQuery>;
export type GetGDriveRedirectQueryResult = Apollo.QueryResult<GetGDriveRedirectQuery, GetGDriveRedirectQueryVariables>;