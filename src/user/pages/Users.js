
import UsersList from '../components/UserList';

const Users = () => {
  const USERS = [
    {
      id: 'u1',
      name: 'Max Schwarz',
      image:
        'https://images.pexels.com/photos/839011/pexels-photo-839011.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      places: 3
    },
    {
      id: 'u2',
      name: 'John Rozzer',
      image:
        'https://cdn.midjourney.com/aecf5e2a-5e68-435f-826b-1713a8bf28ea/grid_0_640_N.webp',
      places: 7
    },
  ];

  return <UsersList items={USERS} />;
};

export default Users;
