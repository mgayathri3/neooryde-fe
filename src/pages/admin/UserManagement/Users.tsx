import ListUsers from '../../../components/ListUsers/ListUsers';
import useGetAllUsers from '../../../services/queries/useGetAllUsers';

const Users = () => {
  const {
    data: allUsers,
    isSuccess: isGetAllUsersSuccess,
    isLoading: isGetAllUsersLoading,
    refetch: refetchUsers,
  } = useGetAllUsers();

  const onModalClose = (refetch: boolean) => {
    if (refetch) {
      refetchUsers();
    }
  };

  return (
    <>
      {allUsers && allUsers.data.result && (
        <ListUsers
          allUsers={allUsers?.data.result}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};

export default Users;
