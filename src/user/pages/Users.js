
import { useEffect, useState } from 'react';
import UsersList from '../components/UserList';
import LoadingSpinner from '../../shared/components/UiEement/LoadingSpinner';
import ErrorModal from '../../shared/components/UiEement/ErrorModel';
const Users = () => {
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [loadedUsers, setLoadedUsers] = useState();
  useEffect(() => {
    const sendRequest = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/users');

        const responseData =await response.json();
        if (!response.ok) {
          throw new Error(responseData.message)
        }
        setLoadedUsers(responseData.users);
// console.log(responseData.users)
        setIsLoading(false);
        setError(null);
      } catch (err) {
        setIsLoading(false);
        setError(err.message)
      }
    }
    sendRequest();
  },[]);
  const errorHandler = () => {
    setError(null);
  }
  return <>
    <ErrorModal error={error} onClear={errorHandler} />
    {isloading && <div className='center'>
      <LoadingSpinner />
    </div>}

    {!isloading && loadedUsers && <UsersList items={loadedUsers} />}
  </>;
};
export default Users;
