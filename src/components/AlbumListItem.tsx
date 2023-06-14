import React from "react";
import ExpandablePanel from "./ExpandablePanel";
import { TiDelete } from "react-icons/ti";
import { useRemoveAlbumMutation } from "../store";
import PhotosList from "./PhotosList";
export interface AlbumListItemProps {
  album: { name: string; id: number };
}
const AlbumListItem = ({ album }: AlbumListItemProps) => {
  const [removeAlbum, results] = useRemoveAlbumMutation();
  const handleRemoveAlbum = () => {
    removeAlbum(album);
  };
  const header = (
    <div className="pl-4 my-2 font-bold text-orange-700">
      <div className="flex justify-between items-center">
        <div className="text-2xl">
          <TiDelete type="button" onClick={handleRemoveAlbum} />
        </div>
        <div className="pl-2">{album.name}</div>
      </div>
    </div>
  );
  return (
    <ExpandablePanel key={album.id} header={header}>
      <PhotosList album={album} />
    </ExpandablePanel>
  );
};

export default AlbumListItem;
