import { Copy, Download, Upload, FileText } from 'lucide-react';

const QuickActions = ({ tasks, onExport, onImport }) => {
  const duplicateAllTasks = () => {
    const duplicated = tasks.map(task => ({
      ...task,
      id: Date.now() + Math.random(),
      title: `${task.title} (Copy)`,
      createdAt: new Date().toISOString()
    }));
    return duplicated;
  };

  const exportToJSON = () => {
    const dataStr = JSON.stringify(tasks, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Description', 'Priority', 'Status', 'Due Date', 'Tags', 'Created At'];
    const rows = tasks.map(task => [
      task.title,
      task.description || '',
      task.priority,
      task.status,
      task.dueDate || '',
      task.tags?.join('; ') || '',
      new Date(task.createdAt).toLocaleDateString()
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={exportToJSON}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 border-2 border-gray-300 hover:border-cyan-400 rounded-lg transition-all shadow-sm"
        title="Export as JSON"
      >
        <Download className="w-4 h-4" />
        <span className="hidden sm:inline">JSON</span>
      </button>
      <button
        onClick={exportToCSV}
        className="flex items-center gap-2 px-3 py-2 text-sm bg-white text-gray-700 border-2 border-gray-300 hover:border-cyan-400 rounded-lg transition-all shadow-sm"
        title="Export as CSV"
      >
        <FileText className="w-4 h-4" />
        <span className="hidden sm:inline">CSV</span>
      </button>
    </div>
  );
};

export default QuickActions;
