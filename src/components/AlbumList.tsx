import React, { useEffect } from "react";
import { User, UserItem } from "./UsersListItem";
import { useFetchAlbumsQuery, useAddAlbumMutation } from "../store";
import Skeleton from "./Skeleton";
import ExpandablePanel from "./ExpandablePanel";
import AlbumListItem from "./AlbumListItem";
const AlbumList = ({ user }: User) => {
  const { data, error, isFetching } = useFetchAlbumsQuery(user);
  const [addAlbum, results] = useAddAlbumMutation();
  console.log(data);

  let content;
  if (isFetching) {
    content = <Skeleton times={3} className="h-10 w-full" />;
  } else if (error) {
    content = <div>Error Loading albums.</div>;
  } else {
    content = data.map((album: UserItem) => {
      return <AlbumListItem key={album.id} album={album} />;
    });
  }
  const handleAddAlbums = () => {
    addAlbum(user);
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <div className="font-bold text-green-600">{user.name} </div>
        <button
          type="button"
          className="border px-2 py-1 bg-green-600 rounded text-white"
          onClick={handleAddAlbums}
        >
          +Add Album
        </button>
      </div>
      <div className="my-3">{content}</div>
    </div>
  );
};

export default AlbumList;
