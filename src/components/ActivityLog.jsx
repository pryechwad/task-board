import { Clock } from 'lucide-react';

const ActivityLog = ({ activities }) => {
  const getActivityIcon = (type) => {
    const colors = {
      created: 'text-green-600',
      edited: 'text-blue-600',
      moved: 'text-purple-600',
      deleted: 'text-red-600'
    };
    return colors[type] || 'text-gray-600';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Clock className="w-5 h-5" />
        Recent Activity
      </h3>
      <div className="space-y-2 max-h-96 overflow-y-auto">
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500 text-center py-4">No activity yet</p>
        ) : (
          activities.slice(0, 20).map((activity) => (
            <div key={activity.id} className="text-sm border-l-2 border-gray-200 pl-3 py-1">
              <p className={`font-medium ${getActivityIcon(activity.type)}`}>
                {activity.message}
              </p>
              <p className="text-xs text-gray-500">
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
