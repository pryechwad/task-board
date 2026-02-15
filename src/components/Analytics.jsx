import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const Analytics = ({ tasks, activities }) => {
  const getTasksByDate = () => {
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const completed = tasks.filter(t => 
        t.status === 'done' && 
        t.updatedAt?.startsWith(dateStr)
      ).length;
      last7Days.push({ date: date.toLocaleDateString('en-US', { weekday: 'short' }), count: completed });
    }
    return last7Days;
  };

  const getPriorityDistribution = () => {
    const high = tasks.filter(t => t.priority === 'high').length;
    const medium = tasks.filter(t => t.priority === 'medium').length;
    const low = tasks.filter(t => t.priority === 'low').length;
    const total = tasks.length || 1;
    return { high: (high/total)*100, medium: (medium/total)*100, low: (low/total)*100 };
  };

  const getProductivityScore = () => {
    const completed = tasks.filter(t => t.status === 'done').length;
    const total = tasks.length || 1;
    return Math.round((completed / total) * 100);
  };

  const tasksByDate = getTasksByDate();
  const maxCount = Math.max(...tasksByDate.map(d => d.count), 1);
  const priority = getPriorityDistribution();
  const productivityScore = getProductivityScore();

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-cyan-500 to-teal-600 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm opacity-90">Productivity</p>
            <p className="text-4xl font-bold">{productivityScore}%</p>
          </div>
          <Award className="w-12 h-12 opacity-80" />
        </div>
        <div className="w-full bg-white/20 rounded-full h-2">
          <div className="bg-white rounded-full h-2 transition-all" style={{ width: `${productivityScore}%` }}></div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">7-Day Trend</h3>
        </div>
        <div className="flex items-end justify-between gap-2 h-32">
          {tasksByDate.map((day, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full bg-cyan-500 rounded-t transition-all hover:bg-cyan-600" 
                   style={{ height: `${(day.count / maxCount) * 100}%`, minHeight: day.count > 0 ? '8px' : '2px' }}>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400">{day.date}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-cyan-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">Priority</h3>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">High</span>
              <span className="text-red-600 font-medium">{Math.round(priority.high)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-red-500 rounded-full h-2 transition-all" style={{ width: `${priority.high}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Medium</span>
              <span className="text-yellow-600 font-medium">{Math.round(priority.medium)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-500 rounded-full h-2 transition-all" style={{ width: `${priority.medium}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600 dark:text-gray-400">Low</span>
              <span className="text-green-600 font-medium">{Math.round(priority.low)}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 rounded-full h-2 transition-all" style={{ width: `${priority.low}%` }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <Clock className="w-5 h-5 text-cyan-600 mb-2" />
          <p className="text-xs text-gray-500 dark:text-gray-400">Avg/Day</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {(tasksByDate.reduce((a, b) => a + b.count, 0) / 7).toFixed(1)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-gray-200 dark:border-gray-700">
          <Target className="w-5 h-5 text-teal-600 mb-2" />
          <p className="text-xs text-gray-500 dark:text-gray-400">This Week</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">
            {tasksByDate.reduce((a, b) => a + b.count, 0)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
