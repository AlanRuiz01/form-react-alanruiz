/* eslint-disable react/prop-types */
const ConfirmationModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>¿Estás seguro de que deseas eliminar este usuario?</h3>
        <button onClick={onConfirm}>Confirmar</button>
        <button onClick={onCancel}>Cancelar</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
