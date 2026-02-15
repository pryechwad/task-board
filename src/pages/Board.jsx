import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { useNotification } from '../hooks/useNotification';
import { storage } from '../utils/storage';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';
import ActivityLog from '../components/ActivityLog';
import ConfirmModal from '../components/ConfirmModal';
import ExportModal from '../components/ExportModal';
import TaskTemplates from '../components/TaskTemplates';
import AdvancedFilters from '../components/AdvancedFilters';
import Analytics from '../components/Analytics';
import { Plus, Search, LogOut, RotateCcw, Menu, X, BarChart3, Download, Moon, Sun, XCircle, FileText, Filter, Sparkles, User, ChevronDown } from 'lucide-react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const COLUMNS = {
  todo: { id: 'todo', title: 'To Do', color: 'bg-slate-500' },
  doing: { id: 'doing', title: 'In Progress', color: 'bg-cyan-500' },
  done: { id: 'done', title: 'Completed', color: 'bg-teal-500' }
};

const Board = () => {
  const { user, logout } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const { showSuccess, showInfo } = useNotification();
  const [tasks, setTasks] = useState([]);
  const [activities, setActivities] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [sortByDate, setSortByDate] = useState(false);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: '', taskId: null });
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    setTasks(storage.getTasks());
    setActivities(storage.getActivity());
  }, []);

  const addActivity = (type, message) => {
    const newActivity = {
      id: Date.now(),
      type,
      message,
      timestamp: new Date().toISOString()
    };
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    storage.setActivity(updatedActivities);
  };

  const handleSaveTask = (taskData) => {
    if (editingTask) {
      const updatedTasks = tasks.map(t =>
        t.id === editingTask.id
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      );
      setTasks(updatedTasks);
      storage.setTasks(updatedTasks);
      addActivity('edited', `Updated task: "${taskData.title}"`);
      showSuccess('Task updated!');
    } else {
      const newTask = {
        id: Date.now(),
        ...taskData,
        createdAt: new Date().toISOString()
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      storage.setTasks(updatedTasks);
      addActivity('created', `Created task: "${taskData.title}"`);
      showSuccess('Task created!');
    }
    setEditingTask(null);
  };

  const handleSelectTemplate = (templateTasks) => {
    const newTasks = templateTasks.map(t => ({
      ...t,
      id: Date.now() + Math.random(),
      status: 'todo',
      createdAt: new Date().toISOString()
    }));
    const updatedTasks = [...tasks, ...newTasks];
    setTasks(updatedTasks);
    storage.setTasks(updatedTasks);
    addActivity('created', `Created ${newTasks.length} tasks from template`);
    showSuccess(`${newTasks.length} tasks created!`);
  };

  const handleDeleteTask = (taskId) => {
    setConfirmModal({ isOpen: true, type: 'delete', taskId });
  };

  const confirmDelete = () => {
    const task = tasks.find(t => t.id === confirmModal.taskId);
    const updatedTasks = tasks.filter(t => t.id !== confirmModal.taskId);
    setTasks(updatedTasks);
    storage.setTasks(updatedTasks);
    addActivity('deleted', `Deleted task: "${task.title}"`);
    showSuccess('Task deleted!');
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    
    // Prevent drag within same column
    if (source.droppableId === destination.droppableId) return;

    const taskId = parseInt(draggableId);
    const task = tasks.find(t => t.id === taskId);
    const updatedTasks = tasks.map(t =>
      t.id === taskId ? { ...t, status: destination.droppableId } : t
    );
    
    setTasks(updatedTasks);
    storage.setTasks(updatedTasks);
    addActivity('moved', `Moved "${task.title}" to ${COLUMNS[destination.droppableId].title}`);
    showInfo(`Moved to ${COLUMNS[destination.droppableId].title}`);
  };

  const handleResetBoard = () => {
    setConfirmModal({ isOpen: true, type: 'reset' });
  };

  const confirmReset = () => {
    setTasks([]);
    setActivities([]);
    storage.clearAll();
    showSuccess('Board reset!');
  };

  const openModal = (column = null) => {
    setSelectedColumn(column);
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    const stats = getStats();
    
    doc.setFontSize(20);
    doc.text('Task Board Report', 105, 20, { align: 'center' });
    doc.setFontSize(10);
    doc.text(new Date().toLocaleDateString(), 105, 28, { align: 'center' });
    
    doc.autoTable({
      startY: 35,
      head: [['Metric', 'Value']],
      body: [
        ['Total Tasks', stats.total.toString()],
        ['In Progress', stats.inProgress.toString()],
        ['Completed', stats.completed.toString()],
        ['Progress', `${stats.completionRate}%`]
      ]
    });
    
    let yPos = doc.lastAutoTable.finalY + 10;
    
    ['todo', 'doing', 'done'].forEach((status) => {
      const columnTasks = tasks.filter(t => t.status === status);
      if (columnTasks.length > 0) {
        doc.setFontSize(12);
        doc.text(COLUMNS[status].title, 14, yPos);
        
        doc.autoTable({
          startY: yPos + 5,
          head: [['Task', 'Priority', 'Due Date']],
          body: columnTasks.map(t => [
            t.title,
            t.priority,
            t.dueDate ? new Date(t.dueDate).toLocaleDateString() : '-'
          ])
        });
        
        yPos = doc.lastAutoTable.finalY + 10;
      }
    });
    
    doc.save(`tasks-${new Date().toISOString().split('T')[0]}.pdf`);
    showSuccess('PDF downloaded!');
  };

  const exportToCSV = () => {
    const headers = ['Title', 'Priority', 'Status', 'Due Date', 'Tags'];
    const rows = tasks.map(t => [
      t.title,
      t.priority,
      t.status,
      t.dueDate || '',
      t.tags?.join('; ') || ''
    ]);
    
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `tasks-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    URL.revokeObjectURL(url);
    showSuccess('CSV downloaded!');
  };

  const getFilteredAndSortedTasks = (columnId) => {
    let filtered = tasks.filter(task => {
      const matchesColumn = task.status === columnId;
      const matchesSearch = 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
      return matchesColumn && matchesSearch && matchesPriority;
    });

    if (sortByDate) {
      filtered.sort((a, b) => {
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      });
    }

    return filtered;
  };

  const getStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const inProgress = tasks.filter(t => t.status === 'doing').length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, inProgress, completionRate };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm backdrop-blur-lg bg-white/95 dark:bg-gray-800/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">Task Board</h1>
            </div>
            
            <div className="hidden md:flex items-center gap-2">
              <button onClick={() => setShowTemplates(true)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Templates
              </button>
              <button onClick={toggleTheme} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                {isDark ? 'Light' : 'Dark'}
              </button>
              <button onClick={() => setShowAnalytics(!showAnalytics)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Analytics
              </button>
              <button onClick={() => setShowExportModal(true)} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Export
              </button>
              <button onClick={handleResetBoard} className="px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-sm font-medium text-gray-700 dark:text-gray-300">
                Reset
              </button>
              <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-1"></div>
              <div className="relative">
                <button onClick={() => setShowProfileMenu(!showProfileMenu)} className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{user?.email}</span>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>
                {showProfileMenu && (
                  <div className="absolute right-0 top-12 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl py-2 z-10 min-w-[200px] animate-scale-in">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user?.email}</p>
                    </div>
                    <button onClick={() => { logout(); setShowProfileMenu(false); }} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>

            <button onClick={() => setShowMobileMenu(!showMobileMenu)} className="md:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
              {showMobileMenu ? <X className="w-5 h-5 dark:text-white" /> : <Menu className="w-5 h-5 dark:text-white" />}
            </button>
          </div>

          {showMobileMenu && (
            <div className="md:hidden pb-3 space-y-1">
              <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                <p className="text-xs text-gray-500 dark:text-gray-400">Signed in as</p>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.email}</p>
              </div>
              <button onClick={() => { setShowTemplates(true); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Templates
              </button>
              <button onClick={() => { toggleTheme(); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button onClick={() => { setShowAnalytics(!showAnalytics); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Analytics
              </button>
              <button onClick={() => { setShowExportModal(true); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Export
              </button>
              <button onClick={() => { handleResetBoard(); setShowMobileMenu(false); }} className="w-full text-left px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                Reset Board
              </button>
              <button onClick={logout} className="w-full text-left px-3 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Empty State */}
        {tasks.length === 0 && (
          <div className="bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl border-2 border-dashed border-cyan-300 dark:border-cyan-700 p-12 text-center mb-6">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome to Task Board!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">Get started by creating your first task or use a pre-built template</p>
              <div className="flex gap-3 justify-center">
                <button onClick={() => openModal('todo')} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-teal-600 text-white rounded-xl hover:from-cyan-700 hover:to-teal-700 font-medium shadow-lg hover:shadow-xl transition-all">
                  <Plus className="w-5 h-5" />
                  Create Task
                </button>
                <button onClick={() => setShowTemplates(true)} className="flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 font-medium transition-all">
                  <FileText className="w-5 h-5" />
                  Use Template
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-cyan-400 dark:hover:border-cyan-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Total Tasks</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-cyan-400 dark:hover:border-cyan-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">In Progress</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-cyan-500 bg-clip-text text-transparent">{stats.inProgress}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-teal-400 dark:hover:border-teal-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Completed</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">{stats.completed}</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-200 hover:border-cyan-400 dark:hover:border-cyan-600">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Success Rate</p>
            <p className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">{stats.completionRate}%</p>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 mb-6 shadow-sm">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks by title, description, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-12 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 bg-white dark:bg-gray-700 dark:text-white transition-all"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 hover:bg-gray-100 dark:hover:bg-gray-600 p-1 rounded-lg transition-colors">
                  <XCircle className="w-5 h-5 text-gray-400" />
                </button>
              )}
            </div>
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-white dark:bg-gray-700 dark:text-white font-medium transition-all focus:outline-none focus:ring-2 focus:ring-cyan-500"
            >
              <option value="all">All Priorities</option>
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
            </select>
          </div>
        </div>

        {/* Board */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className={showAnalytics ? 'lg:col-span-3' : 'lg:col-span-4'}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.values(COLUMNS).map((column) => (
                  <div key={column.id} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 shadow-sm hover:shadow-md transition-all">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${column.color} shadow-lg`}></div>
                        <h2 className="font-bold text-gray-900 dark:text-white text-base">{column.title}</h2>
                        <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2.5 py-1 rounded-full font-semibold">
                          {getFilteredAndSortedTasks(column.id).length}
                        </span>
                      </div>
                      <button onClick={() => openModal(column.id)} className="p-2 bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-700 hover:to-teal-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <Droppable droppableId={column.id}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`space-y-3 min-h-[500px] p-3 rounded-xl transition-all ${
                            snapshot.isDraggingOver ? 'bg-cyan-50 dark:bg-cyan-900/20 border-2 border-dashed border-cyan-400 dark:border-cyan-600' : 'bg-gray-50 dark:bg-gray-900/50'
                          }`}
                        >
                          {getFilteredAndSortedTasks(column.id).map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className={snapshot.isDragging ? 'opacity-50' : ''}
                                >
                                  <TaskCard task={task} onEdit={openEditModal} onDelete={handleDeleteTask} />
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                          {getFilteredAndSortedTasks(column.id).length === 0 && (
                            <div className="flex flex-col items-center justify-center py-16">
                              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-3">
                                <Plus className="w-8 h-8 text-gray-400 dark:text-gray-500" />
                              </div>
                              <p className="text-gray-400 dark:text-gray-500 text-sm font-medium">No tasks yet</p>
                              <p className="text-gray-400 dark:text-gray-500 text-xs mt-1">Click + to add one</p>
                            </div>
                          )}
                        </div>
                      )}
                    </Droppable>
                  </div>
                ))}
              </div>
            </DragDropContext>
          </div>

          {showAnalytics && (
            <div className="hidden lg:block lg:col-span-1">
              <Analytics tasks={tasks} activities={activities} />
            </div>
          )}
        </div>
      </div>

      <TaskModal isOpen={isModalOpen} onClose={() => { setIsModalOpen(false); setEditingTask(null); }} onSave={handleSaveTask} task={editingTask} column={selectedColumn} />
      <TaskTemplates isOpen={showTemplates} onClose={() => setShowTemplates(false)} onSelectTemplate={handleSelectTemplate} />
      <AdvancedFilters isOpen={showAdvancedFilters} onClose={() => setShowAdvancedFilters(false)} onApplyFilters={() => {}} tasks={tasks} />
      <ExportModal isOpen={showExportModal} onClose={() => setShowExportModal(false)} onExportPDF={exportToPDF} onExportExcel={exportToCSV} />
      <ConfirmModal isOpen={confirmModal.isOpen && confirmModal.type === 'delete'} onClose={() => setConfirmModal({ isOpen: false, type: '', taskId: null })} onConfirm={confirmDelete} title="Delete Task" message="Delete this task?" confirmText="Delete" type="danger" />
      <ConfirmModal isOpen={confirmModal.isOpen && confirmModal.type === 'reset'} onClose={() => setConfirmModal({ isOpen: false, type: '' })} onConfirm={confirmReset} title="Reset Board" message="Delete all tasks?" confirmText="Reset" type="danger" />
    </div>
  );
};

export default Board;
