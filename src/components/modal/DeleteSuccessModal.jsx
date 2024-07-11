import { Modal } from 'antd';

const DeleteSuccessModal = ({ visible, onClose }) => (
    <Modal
        title="Profesor eliminado con éxito"
        visible={visible}
        onCancel={onClose}
        onOk={onClose}
        okText="Aceptar"
    >
        <p>El profesor ha sido eliminado correctamente.</p>
    </Modal>
);

export default DeleteSuccessModal;
