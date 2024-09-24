import { useState } from 'react';
import {UserList} from './UserList';
import {UserForm} from './UserForm';

const MasterDetailPage = () => {
    const [selectedUserId, setSelectedUserId] = useState(null);

    const handleUserSelect = (userId) => {
        setSelectedUserId(userId);
    };

    return (
        <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
                <UserList onUserSelect={handleUserSelect} />
            </div>
            <div style={{ flex: 1 }}>
                {selectedUserId && <UserForm userId={selectedUserId} />}
            </div>
        </div>
    );
};

export default MasterDetailPage;

/*
import React from 'react';
import { useUserListViewModel } from '../viewModels/useUserListViewModel';

const UserList = ({ onUserSelect }) => {
  const { users, status, error } = useUserListViewModel();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <ul>
      {users.map((user) => (
        <li key={user.id} onClick={() => onUserSelect(user.id)}>
          {user.name}
        </li>
      ))}
    </ul>
  );
};

export default UserList;

 */

/*
import React from 'react';
import { useUserFormViewModel } from '../viewModels/useUserFormViewModel';

const UserForm = ({ userId }) => {
  const { user, status, error } = useUserFormViewModel(userId);

  if (status === 'loading') {
    return <div>Loading user details...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return user ? (
    <div>
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
    </div>
  ) : (
    <div>No user selected</div>
  );
};

export default UserForm;

 */
