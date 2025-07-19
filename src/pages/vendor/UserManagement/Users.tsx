import ListUsers from '../../../components/ListUsers/ListUsers';
import useGetAllUsersByOrgId from '../../../services/queries/useGetAllUsersByOrgId';

const Users = () => {
  const {
    data: allUsers,
    isSuccess: isGetAllUsersSuccess,
    isLoading: isGetAllUsersLoading,
    refetch: refetchUsers,
  } = useGetAllUsersByOrgId();

  const onModalClose = (refetch: boolean) => {
    if (refetch) {
      refetchUsers();
    }
  };

  return (
    <>
      {allUsers && allUsers?.data.result && (
        <ListUsers
          allUsers={allUsers?.data.result}
          onModalClose={onModalClose}
        />
      )}
    </>
  );
};

export { Users as VendorUsers };
