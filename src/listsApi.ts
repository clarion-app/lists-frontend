import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { backend } from '.';

const rawBaseQuery = (baseUrl: string) => fetchBaseQuery({ 
  baseUrl: baseUrl,
  prepareHeaders: (headers) => {
      headers.set('Content-Type', 'application/json');
      headers.set('Authorization', 'Bearer ' + backend.token);
      return headers;
  }
});

function baseQuery(): BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> {
    return async (args, api, extraOptions) => {
        let result = await rawBaseQuery((await backend).url + '/api/clarion-app/lists')(args, api, extraOptions);
        return result;
    };
}

export interface ListItemType {
  id: string;
  name: string;
}

export interface ListType {
  id: string;
  name: string;
  items: ListItemType[];
}

export const listsApi = createApi({
  reducerPath: 'listsApi',
  baseQuery: baseQuery(),
  tagTypes: ['List'],
  endpoints: (builder) => ({
    getLists: builder.query({
      query: () => '/lists',
      providesTags: ['List'],
    }),
    getList: builder.query<ListType, string>({
      query: (id) => `/lists/${id}`,
      providesTags: ['List'],
    }),
    createList: builder.mutation<ListType, Partial<ListType>>({
      query: (list) => ({
        url: '/lists',
        method: 'POST',
        body: list,
      }),
      invalidatesTags: ['List'],
    }),
    updateList: builder.mutation<ListType, { id: string; list: Partial<ListType> }>({
      query: ({ id, list }) => ({
        url: `/lists/${id}`,
        method: 'PUT',
        body: list,
      }),
      invalidatesTags: ['List'],
    }),
    deleteList: builder.mutation<void, string>({
      query: (id) => ({
        url: `/lists/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['List'],
    }),
    cloneList: builder.mutation<ListType, string>({
      query: (id) => ({
        url: `/lists/${id}/clone`,
        method: 'POST',
      }),
      invalidatesTags: ['List'],
    }),
  }),
});

export const {
  useGetListsQuery,
  useGetListQuery,
  useCreateListMutation,
  useUpdateListMutation,
  useDeleteListMutation,
  useCloneListMutation,
} = listsApi;