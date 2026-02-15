import { Calendar, Tag, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const AdvancedFilters = ({ isOpen, onClose, onApplyFilters, tasks }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    tags: [],
    priority: 'all',
    status: 'all'
  });
  const [savedFilters, setSavedFilters] = useState(() => {
    const saved = localStorage.getItem('savedFilters');
    return saved ? JSON.parse(saved) : [];
  });
  const [filterName, setFilterName] = useState('');

  const allTags = [...new Set(tasks.flatMap(t => t.tags || []))];

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const handleSaveFilter = () => {
    if (!filterName.trim()) return;
    const newFilter = { name: filterName, filters: { ...filters } };
    const updated = [...savedFilters, newFilter];
    setSavedFilters(updated);
    localStorage.setItem('savedFilters', JSON.stringify(updated));
    setFilterName('');
  };

  const handleLoadFilter = (savedFilter) => {
    setFilters(savedFilter.filters);
  };

  const handleDeleteFilter = (index) => {
    const updated = savedFilters.filter((_, i) => i !== index);
    setSavedFilters(updated);
    localStorage.setItem('savedFilters', JSON.stringify(updated));
  };

  const handleReset = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      tags: [],
      priority: 'all',
      status: 'all'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Advanced Filters</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Date Range */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Calendar className="w-4 h-4" />
              Date Range
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">From</label>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500 dark:text-gray-400">To</label>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => setFilters({ ...filters, dateTo: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Tag className="w-4 h-4" />
              Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    const newTags = filters.tags.includes(tag)
                      ? filters.tags.filter(t => t !== tag)
                      : [...filters.tags, tag];
                    setFilters({ ...filters, tags: newTags });
                  }}
                  className={`px-3 py-1 rounded-full text-sm transition-colors ${
                    filters.tags.includes(tag)
                      ? 'bg-cyan-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Priority & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Priority</label>
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Status</label>
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All</option>
                <option value="todo">To Do</option>
                <option value="doing">In Progress</option>
                <option value="done">Completed</option>
              </select>
            </div>
          </div>

          {/* Save Filter */}
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              <Save className="w-4 h-4" />
              Save Filter Preset
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={filterName}
                onChange={(e) => setFilterName(e.target.value)}
                placeholder="Filter name..."
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 dark:text-white"
              />
              <button
                onClick={handleSaveFilter}
                className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors text-sm"
              >
                Save
              </button>
            </div>
          </div>

          {/* Saved Filters */}
          {savedFilters.length > 0 && (
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Saved Presets</label>
              <div className="space-y-2">
                {savedFilters.map((saved, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <button
                      onClick={() => handleLoadFilter(saved)}
                      className="flex-1 text-left text-sm text-gray-700 dark:text-gray-300 hover:text-cyan-600"
                    >
                      {saved.name}
                    </button>
                    <button
                      onClick={() => handleDeleteFilter(idx)}
                      className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleApply}
            className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdvancedFilters;
