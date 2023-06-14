import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { faker } from "@faker-js/faker";
export type PhotoProps = {
  name: string;
  id: number;
};
export const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3003",
  }),
  tagTypes: ["Photo", "AlbumsPhotos"],
  endpoints: (builder) => ({
    fetchPhotos: builder.query({
      providesTags: (result, error, album) => {
        const tags = result.map((photo: PhotoProps) => {
          return { type: "Photo", id: photo.id };
        });
        tags.push({ type: "AlbumsPhotos", id: album.id });
        return tags;
      },
      query: (album) => {
        return {
          url: "/photos",
          params: {
            albumId: album.id,
          },
          method: "GET",
        };
      },
    }),
    addPhoto: builder.mutation({
      invalidatesTags: (result, error, album) => {
        return [{ type: "AlbumsPhotos", id: album.id }];
      },
      query: (album) => {
        return {
          url: "/photos",
          method: "POST",
          body: {
            albumId: album.id,
            name: faker.image.url({ height: 150, width: 150 }),
          },
        };
      },
    }),
    removePhoto: builder.mutation({
      invalidatesTags: (result, error, photo) => {
        return [{ type: "Photo", id: photo.id }];
      },
      query: (photo) => {
        return {
          url: `/photos/${photo.id}`,
          method: "DELETE",
        };
      },
    }),
  }),
});
export const {
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useRemovePhotoMutation,
} = photosApi;
