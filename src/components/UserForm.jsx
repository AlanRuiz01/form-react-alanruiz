/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';

const UserForm = ({ onSave, onCancel, editingUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingUser) {
      setName(editingUser.name);
      setEmail(editingUser.email);
      setPhone(editingUser.phone);
      setAddress(editingUser.address);
    } else {
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
    }
  }, [editingUser]);

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const validatePhone = (phone) => {
    return /^\d{10}$/.test(phone); // Número de teléfono de 10 dígitos
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (name.length < 3) {
      setError('El nombre debe tener al menos 3 caracteres.');
      return;
    }

    if (!validateEmail(email)) {
      setError('El correo electrónico no tiene un formato válido.');
      return;
    }

    if (!validatePhone(phone)) {
      setError('El teléfono debe tener 10 dígitos.');
      return;
    }

    if (!name || !email || !phone || !address) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    setError('');
    const userData = { name, email, phone, address };
    onSave(userData);
  };

  return (
    <form onSubmit={handleSubmit} className='forms'>
      {error && <p style={{ color: 'red' }}>{error}</p>}
        <h2>Formulario de registro</h2>
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Correo electrónico:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Teléfono:</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="address">Dirección:</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
      </div>

      <div className='buttons'>
        <button type="submit">Guardar</button>
        <button type="button" onClick={onCancel}>Cancelar</button>
      </div>
    </form>
  );
};

export default UserForm;
