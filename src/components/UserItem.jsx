/* eslint-disable react/prop-types */
const UserItem = ({ user, onEdit, onDelete }) => {
  return (
    <tr>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.phone}</td>
      <td>{user.address}</td>
      <td>
        <button onClick={() => onEdit(user)}>Editar</button>
        <button onClick={() => onDelete(user.email)}>Eliminar</button>
      </td>
    </tr>
  );
};

export default UserItem;
