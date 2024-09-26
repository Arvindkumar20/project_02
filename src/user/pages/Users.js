
import { useEffect, useState } from 'react';
import UsersList from '../components/UserList';
import LoadingSpinner from '../../shared/components/UiEement/LoadingSpinner';
import {useHttpClient} from "../../shared/hooks/http-hook.js"
import ErrorModal from '../../shared/components/UiEement/ErrorModel';
const Users = () => {
  const [loadedUsers, setLoadedUsers] = useState();
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(`${process.env.REACT_APP_BACKEND_URL}/users`);
        setLoadedUsers(responseData.users);
      } catch (err) {
      console.log("object")
      }
    }
    fetchUsers();
  },[sendRequest]);
 
  return <>
    <ErrorModal error={error} onClear={clearError} />
    {isLoading && <div className='center'>
      <LoadingSpinner />
    </div>}

    {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
  </>;
};
export default Users;
