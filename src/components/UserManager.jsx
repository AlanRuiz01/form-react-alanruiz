import { useState, useEffect } from 'react';
import UserForm from './UserForm';
import UserList from './UserList';
import Pagination from './Pagination';
import ConfirmationModal from './ConfirmationModal';

const UserManager = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem('users'));
    if (storedUsers) {
      setUsers(storedUsers);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const handleSave = (user) => {
    if (editingUser) {
      setUsers(
        users.map((u) => (u.email === editingUser.email ? user : u))
      );
      setEditingUser(null);
    } else {
      setUsers([...users, user]);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = () => {
    setUsers(users.filter((user) => user.email !== userToDelete));
    setShowModal(false);
    setUserToDelete(null);
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm) ||
      user.email.toLowerCase().includes(searchTerm)
  );

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <main>
      <h1>Formulario y Gestion de Usuarios Alan Ruiz</h1>
    <div className='container-form'>
      <UserForm 
        onSave={handleSave} 
        onCancel={handleCancel} 
        editingUser={editingUser} 
      />
      </div>
      <div className='search'>
      <input
        type="text"
        placeholder="Buscar por nombre o correo"
        value={searchTerm}
        onChange={handleSearch}
      />
       
      <UserList 
        users={currentUsers} 
        onEdit={handleEdit} 
        onDelete={(email) => {
          setUserToDelete(email);
          setShowModal(true);
        }} 
      />
      {showModal && (
        <ConfirmationModal
          onConfirm={handleDelete}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
    <div className='pagination'>
      <Pagination
        usersPerPage={usersPerPage}
        totalUsers={filteredUsers.length}
        paginate={handlePageChange}
        currentPage={currentPage}
      />
   </div>
    </main>
  );
};

export default UserManager;
