/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
import { gql } from '@apollo/client';
import { useQuery, useLazyQuery, useSuspenseQuery } from '@apollo/client/react';
import type { QueryHookOptions, LazyQueryHookOptions, SuspenseQueryHookOptions, UseSuspenseQueryResult, QueryResult, SkipToken } from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Category = {
  __typename?: 'Category';
  creationAt: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
};

export type Product = {
  __typename?: 'Product';
  category: Category;
  description: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  images: Array<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  title: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<Product>;
};


export type QueryProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
};

export type GetProductsQueryVariables = Exact<{
  offset?: number | null | undefined;
  limit?: number | null | undefined;
}>;


export type GetProductsQuery = { products: Array<{ id: number, title: string, price: number, description: string, images: Array<string>, category: { id: number, name: string, slug: string, image: string, creationAt: string, updatedAt: string } }> };


export const GetProductsDocument = gql`
    query GetProducts($offset: Int, $limit: Int) {
  products(offset: $offset, limit: $limit) {
    id
    title
    price
    description
    category {
      id
      name
      slug
      image
      creationAt
      updatedAt
    }
    images
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      offset: // value for 'offset'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions?: QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
// @ts-ignore
export function useGetProductsSuspenseQuery(baseOptions?: SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>): UseSuspenseQueryResult<GetProductsQuery, GetProductsQueryVariables>;
export function useGetProductsSuspenseQuery(baseOptions?: SkipToken | SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>): UseSuspenseQueryResult<GetProductsQuery | undefined, GetProductsQueryVariables>;
export function useGetProductsSuspenseQuery(baseOptions?: SkipToken | SuspenseQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = typeof baseOptions === 'object' && 'kind' in baseOptions && baseOptions.kind === 'skipToken' ? baseOptions : {...defaultOptions, ...baseOptions}
          return useSuspenseQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsSuspenseQueryHookResult = ReturnType<typeof useGetProductsSuspenseQuery>;
export type GetProductsQueryResult = QueryResult<GetProductsQuery, GetProductsQueryVariables>;