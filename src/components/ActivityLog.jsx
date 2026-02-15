import { Clock } from 'lucide-react';

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    const colors = {
      created: 'text-emerald-600 dark:text-emerald-400',
      edited: 'text-blue-600 dark:text-blue-400',
      moved: 'text-purple-600 dark:text-purple-400',
      deleted: 'text-rose-600 dark:text-rose-400'
    };
    return colors[type] || 'text-gray-600 dark:text-gray-400';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-5">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <Clock className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
        Recent Activity
      </h3>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {activities.length === 0 ? (
          <div className="text-center py-8">
            <Clock className="w-12 h-12 text-gray-300 dark:text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500 dark:text-gray-400">No activity yet</p>
          </div>
        ) : (
          activities.slice(0, 20).map((activity) => (
            <div key={activity.id} className="text-sm border-l-3 border-cyan-400 dark:border-cyan-600 pl-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-r-lg transition-colors">
              <p className={`font-medium mb-1 ${getActivityIcon(activity.type)}`}>
                {activity.message}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(activity.timestamp).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityLog;
