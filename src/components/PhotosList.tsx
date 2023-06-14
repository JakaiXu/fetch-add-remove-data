import React from "react";
import PhotosListItem from "./PhotosListItem";
import { AlbumListItemProps } from "./AlbumListItem";
import { useAddPhotoMutation, useFetchPhotosQuery } from "../store";
import Skeleton from "./Skeleton";
import { UserItem } from "./UsersListItem";
type AlbumProps = {
  name: string;
  id: number;
};
const PhotosList = ({ album }: AlbumListItemProps) => {
  const { data, error, isFetching } = useFetchPhotosQuery(album);
  const [addPhoto, results] = useAddPhotoMutation();
  const handleAddPhoto = (album: AlbumProps) => {
    addPhoto(album);
  };
  let content;
  if (isFetching) {
    content = <Skeleton times={5} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error Fetching Photos.</div>;
  } else {
    content = data.map((photo: UserItem) => {
      return <PhotosListItem key={photo.id} photo={photo} />;
    });
  }
  const header = (
    <div className="flex justify-between items-center ">
      <div className="text-red-600 font-bold">{album.name}</div>
      <button
        onClick={() => handleAddPhoto(album)}
        type="button"
        className="border px-2 py-1 rounded bg-red-600 text-white"
      >
        +Add Photo
      </button>
    </div>
  );
  return (
    <div>
      {header}
      <div className="flex flex-row flex-wrap justify-center">{content}</div>
    </div>
  );
};

export default PhotosList;
