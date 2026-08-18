import Modal from './Modal';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title = 'Confirm Action', message = 'Are you sure?', confirmText = 'Confirm', loading = false }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm" light={false}>
    <p className="mb-6 text-white/70">{message}</p>
    <div className="flex gap-3 justify-end">
      <button onClick={onClose} className="btn-ghost px-4 py-2" disabled={loading}>Cancel</button>
      <button onClick={onConfirm} className="btn-primary px-4 py-2 bg-red-600 hover:bg-red-500" disabled={loading}>
        {loading ? 'Processing...' : confirmText}
      </button>
    </div>
  </Modal>
);

export default ConfirmModal;
