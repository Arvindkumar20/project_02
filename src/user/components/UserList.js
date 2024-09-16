
import UserItem from './UserItem';
import Card from '../../shared/components/UiEement/Card';
import './userList.css';

const UsersList = props => {
  if (props.items.length===0) {
    return (
      <div className="center">
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <ul className="users-list">
      {props.items.map(user => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places?user.places.length:0}
        />
      ))}
    </ul>
  );
};

export default UsersList;
