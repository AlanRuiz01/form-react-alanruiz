/* eslint-disable react/prop-types */
import UserItem from './UserItem';

const UserList = ({ users, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo electrónico</th>
          <th>Teléfono</th>
          <th>Dirección</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserItem 
            key={user.email} 
            user={user} 
            onEdit={onEdit} 
            onDelete={onDelete} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default UserList;
