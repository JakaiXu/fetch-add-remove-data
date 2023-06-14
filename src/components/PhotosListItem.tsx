import React from "react";
import { useRemovePhotoMutation } from "../store";
import { GoTrashcan } from "react-icons/go";
type PhotosListItemProps = {
  photo: { name: string; id: number };
};
const PhotosListItem = ({ photo }: PhotosListItemProps) => {
    const [removePhoto,results]= useRemovePhotoMutation()
   
    const handleRemovePhoto=() => {
        removePhoto(photo)
    }
  return (
    <div className="m-2 cursor-pointer relative">
      <img src={photo.name} alt="pics" />
      <div className="absolute inset-0 flex items-center justify-center hover:bg-gray-200 opacity-0 hover:opacity-60">
        <GoTrashcan className="text-4xl" onClick={handleRemovePhoto} />
      </div>
    </div>
  );
};

export default PhotosListItem;
