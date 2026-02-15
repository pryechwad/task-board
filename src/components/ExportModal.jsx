import { FileText, Download, X } from 'lucide-react';

const ExportModal = ({ isOpen, onClose, onExportPDF, onExportExcel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-scale-in">
        <div className="border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Export Report</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <p className="text-sm text-gray-600 mb-4">
            Choose your preferred format to download the task report
          </p>

          <button
            onClick={() => {
              onExportPDF();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
          >
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <FileText className="w-6 h-6 text-red-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">PDF Report</h3>
              <p className="text-xs text-gray-500">Complete report with stats and tasks</p>
            </div>
          </button>

          <button
            onClick={() => {
              onExportExcel();
              onClose();
            }}
            className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-cyan-500 hover:bg-cyan-50 transition-all group"
          >
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <Download className="w-6 h-6 text-green-600" />
            </div>
            <div className="flex-1 text-left">
              <h3 className="font-semibold text-gray-900">Excel Spreadsheet</h3>
              <p className="text-xs text-gray-500">CSV format for Excel/Sheets</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportModal;
