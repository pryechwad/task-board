import { Briefcase, Users, Rocket, Code, Target, Zap } from 'lucide-react';

const TEMPLATES = {
  startup: {
    icon: Rocket,
    title: 'Startup Task',
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    tasks: [
      { title: 'Market Research', description: 'Analyze target market and competitors', priority: 'high', tags: ['research', 'strategy'] },
      { title: 'MVP Development', description: 'Build minimum viable product', priority: 'high', tags: ['development', 'product'] },
      { title: 'Pitch Deck', description: 'Create investor presentation', priority: 'medium', tags: ['fundraising', 'presentation'] },
      { title: 'User Testing', description: 'Conduct user interviews and feedback', priority: 'medium', tags: ['ux', 'research'] }
    ]
  },
  product: {
    icon: Target,
    title: 'Product Manager',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    tasks: [
      { title: 'Product Roadmap', description: 'Define quarterly product roadmap', priority: 'high', tags: ['planning', 'strategy'] },
      { title: 'User Stories', description: 'Write detailed user stories', priority: 'high', tags: ['requirements', 'documentation'] },
      { title: 'Sprint Planning', description: 'Plan next sprint with team', priority: 'medium', tags: ['agile', 'planning'] },
      { title: 'Stakeholder Review', description: 'Present progress to stakeholders', priority: 'medium', tags: ['communication', 'review'] }
    ]
  },
  founder: {
    icon: Briefcase,
    title: 'Founder/CEO',
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    tasks: [
      { title: 'Fundraising Strategy', description: 'Plan Series A fundraising', priority: 'high', tags: ['fundraising', 'strategy'] },
      { title: 'Team Hiring', description: 'Recruit key team members', priority: 'high', tags: ['hiring', 'hr'] },
      { title: 'Partnership Deals', description: 'Negotiate strategic partnerships', priority: 'medium', tags: ['business', 'partnerships'] },
      { title: 'Board Meeting', description: 'Prepare board meeting materials', priority: 'medium', tags: ['governance', 'reporting'] }
    ]
  },
  cto: {
    icon: Code,
    title: 'CTO/Tech Lead',
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    tasks: [
      { title: 'Architecture Review', description: 'Review system architecture', priority: 'high', tags: ['architecture', 'technical'] },
      { title: 'Code Review', description: 'Review team pull requests', priority: 'high', tags: ['code-review', 'quality'] },
      { title: 'Tech Stack Decision', description: 'Evaluate new technologies', priority: 'medium', tags: ['technology', 'decision'] },
      { title: 'Team 1:1s', description: 'Conduct team one-on-ones', priority: 'medium', tags: ['management', 'people'] }
    ]
  },
  manager: {
    icon: Users,
    title: 'Team Manager',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    tasks: [
      { title: 'Team Standup', description: 'Daily team sync meeting', priority: 'high', tags: ['meeting', 'communication'] },
      { title: 'Performance Reviews', description: 'Conduct quarterly reviews', priority: 'high', tags: ['hr', 'performance'] },
      { title: 'Resource Planning', description: 'Plan team capacity and allocation', priority: 'medium', tags: ['planning', 'resources'] },
      { title: 'Team Building', description: 'Organize team activity', priority: 'low', tags: ['culture', 'team'] }
    ]
  },
  teamlead: {
    icon: Zap,
    title: 'Team Lead',
    color: 'text-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    tasks: [
      { title: 'Sprint Retrospective', description: 'Facilitate sprint retro', priority: 'high', tags: ['agile', 'improvement'] },
      { title: 'Technical Debt', description: 'Address technical debt items', priority: 'medium', tags: ['technical', 'maintenance'] },
      { title: 'Mentoring', description: 'Mentor junior developers', priority: 'medium', tags: ['mentoring', 'growth'] },
      { title: 'Documentation', description: 'Update technical documentation', priority: 'low', tags: ['documentation', 'knowledge'] }
    ]
  }
};

const TaskTemplates = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Task Templates</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose a template to quickly create tasks</p>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(TEMPLATES).map(([key, template]) => {
            const Icon = template.icon;
            return (
              <div
                key={key}
                onClick={() => {
                  onSelectTemplate(template.tasks);
                  onClose();
                }}
                className={`${template.bg} border-2 border-transparent hover:border-cyan-500 rounded-lg p-4 cursor-pointer transition-all hover:shadow-lg group`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 bg-white dark:bg-gray-700 rounded-lg ${template.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">{template.title}</h3>
                </div>
                <div className="space-y-2">
                  {template.tasks.map((task, idx) => (
                    <div key={idx} className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                      {task.title}
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                  {template.tasks.length} tasks
                </div>
              </div>
            );
          })}
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTemplates;
