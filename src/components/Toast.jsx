import { X, CheckCircle, AlertCircle, Info, Trash2 } from 'lucide-react';
import { useEffect } from 'react';

const ICONS = {
  success: CheckCircle,
  error: AlertCircle,
  info: Info,
  warning: AlertCircle,
  delete: Trash2
};

const COLORS = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
  delete: 'bg-red-500'
};

const Toast = ({ message, type = 'info', onClose }) => {
  const Icon = ICONS[type];
  const colorClass = COLORS[type];

  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="flex items-center gap-3 bg-white rounded-lg shadow-lg p-4 min-w-[300px] max-w-md border border-gray-200 animate-slide-in">
      <div className={`${colorClass} p-2 rounded-lg`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <p className="flex-1 text-gray-800 text-sm font-medium">{message}</p>
      <button
        onClick={onClose}
        className="text-gray-400 hover:text-gray-600 transition"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;
