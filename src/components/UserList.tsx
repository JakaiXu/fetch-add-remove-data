import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchUsers, addUser } from "../store";
import { useThunk } from "../hooks/use-thunk";
import { State } from "../store";
import Skeleton from "./Skeleton";

import UsersListItem from "./UsersListItem";

const UserList = () => {
  const [doFetchUsers, isLoadingUsers, loadingUsersError] =
    useThunk(fetchUsers);
  const [doAddUser, isCreatingUser, creatingUserError] = useThunk(addUser);

  useEffect(() => {
    doFetchUsers(fetchUsers);
  }, [doFetchUsers]);
  const handleUserAdd = () => {
    doAddUser(addUser);
  };
  const { data } = useSelector((state: State) => {
    return state.users;
  });

  let content;

  if (isLoadingUsers) {
    content = <Skeleton times={6} className="h-10 w-full" />;
  }
  if (loadingUsersError) {
    content = <div>Error fetching data ...</div>;
  } else {
    content = data.map((user) => <UsersListItem key={user.id} user={user} />);
  }

  return (
    <div>
      <div className="flex justify-between p-4">
        <h1 className="font-bold text-2xl">Users</h1>
        {isCreatingUser ? (
          "Creating User..."
        ) : (
          <button
            type="button"
            className="border rounded  px-3 py-1 bg-blue-500 text-white"
            onClick={handleUserAdd}
          >
            + Add User
          </button>
        )}
        {creatingUserError && "Error creating user..."}
      </div>
      {content}
    </div>
  );
};

export default UserList;
