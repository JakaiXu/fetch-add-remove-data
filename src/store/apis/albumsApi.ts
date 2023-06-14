import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
import { UserItem } from "../../components/UsersListItem";


// Dev only, test loading
// const pause = (duration: number) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, duration);
//   });
// };

export const albumsApi = createApi({
  reducerPath: "albums",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
    // fetchFn: async (...args) => {
    //     //remove later
    //   await pause(1000);
    //   return fetch(...args)
    // },
  }),
  tagTypes: ["Album",'UsersAlbums'],

  endpoints: (builder) => ({
    removeAlbum: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "Album", id: album.id }];
      },
      query: (album) => {
        return {
          url: `/albums/${album.id}`,
          method: "DELETE",
        };
      },
    }),
    addAlbum: builder.mutation({
      invalidatesTags: (result, error, user) => {
        return [{ type: "UsersAlbums", id: user.id }];
      },
      query: (user: UserItem) => {
        return {
          url: "/albums",
          method: "POST",
          body: {
            userId: user.id,
            name: faker.commerce.productName(),
          },
        };
      },
    }),
    fetchAlbums: builder.query({
      providesTags: (result, error, user) => {
        console.log(result);
        
        const tags = result.map((album:any) => {
          return { type: "Album", id: album.id };
        });
        tags.push({ type: "UsersAlbums", id: user.id });

        console.log(tags);
        return tags;
        
      },
      query: (user) => {
        return {
          url: "/albums",
          params: {
            userId: user.id,
          },
          method: "GET",
        };
      },
    }),
  }),
});
export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useRemoveAlbumMutation,
} = albumsApi;
