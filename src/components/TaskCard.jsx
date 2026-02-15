import { Calendar, Tag, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

const PRIORITY_STYLES = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700'
};

const TaskCard = ({ task, onEdit, onDelete }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
      <div className="p-3">
        {/* Header with Title and Actions */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-medium text-gray-900 text-sm flex-1 leading-snug">
            {task.title}
          </h3>
          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="w-4 h-4 text-gray-500" />
            </button>
            {showActions && (
              <div className="absolute right-0 top-6 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10 min-w-[120px]">
                <button
                  onClick={() => {
                    onEdit(task);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-3 h-3" />
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {task.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">
            {task.description}
          </p>
        )}

        {/* Tags */}
        {task.tags && task.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-100 text-gray-700 rounded"
              >
                <Tag className="w-2.5 h-2.5" />
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer with Priority and Due Date */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <span className={`text-xs px-2 py-1 rounded font-medium ${PRIORITY_STYLES[task.priority]}`}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </span>
          
          {task.dueDate && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
