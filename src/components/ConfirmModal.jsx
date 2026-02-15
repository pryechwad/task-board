import { AlertTriangle } from 'lucide-react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', type = 'danger' }) => {
  if (!isOpen) return null;

  const buttonClass = type === 'danger' 
    ? 'bg-red-500 hover:bg-red-600' 
    : 'bg-purple-500 hover:bg-purple-600';

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 animate-scale-in">
        <div className="flex items-center gap-3 mb-4">
          <div className={`${type === 'danger' ? 'bg-red-100' : 'bg-purple-100'} p-3 rounded-full`}>
            <AlertTriangle className={`w-6 h-6 ${type === 'danger' ? 'text-red-600' : 'text-purple-600'}`} />
          </div>
          <h3 className="text-xl font-bold text-gray-800">{title}</h3>
        </div>
        
        <p className="text-gray-600 mb-6">{message}</p>
        
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-medium"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`flex-1 px-4 py-2 ${buttonClass} text-white rounded-lg transition font-medium`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
