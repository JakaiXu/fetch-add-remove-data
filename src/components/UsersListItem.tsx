import React from "react";
import { BiDownArrow } from "react-icons/bi";
import { TiDelete } from "react-icons/ti";
import { deleteUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import ExpandablePanel from "./ExpandablePanel";
import AlbumList from "./AlbumList";
export type UserItem = {
  name: string;
  id: number;
};
export interface User {
  user: { name: string; id: number };
}
const UsersListItem = ({ user }: User) => {
  const [doRemoveUser, isLoading, error] = useThunk(deleteUser);
  const handleDelete = () => {
    doRemoveUser(user);
  };
  const header = (
    <>
      <div className="flex items-center px-2 m-2  justify-between text-blue-600 font-bold">
        {isLoading ? (
          <AiOutlineLoading3Quarters />
        ) : (
          <TiDelete
            className="text-3xl mr-2 cursor-pointer"
            type="button"
            onClick={handleDelete}
          />
        )}
        {user.name}
      </div>
      {error && <div>Error deleting user</div>}
    </>
  );
  return (
    <ExpandablePanel header={header}>
      <AlbumList user={user} />
    </ExpandablePanel>
  );
};

export default UsersListItem;
