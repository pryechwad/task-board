import { Briefcase, Users, Rocket, Code, Target, Zap } from 'lucide-react';

const TEMPLATES = {
  startup: {
    icon: Rocket,
    title: 'Startup Founder',
    description: 'Essential tasks for launching a startup',
    color: 'text-purple-600',
    bg: 'bg-purple-50 dark:bg-purple-900/20',
    border: 'border-purple-200 dark:border-purple-800',
    tasks: [
      { title: 'Conduct Market Research', description: 'Analyze target market, competitors, and customer needs', priority: 'high', tags: ['research', 'strategy'] },
      { title: 'Build MVP', description: 'Develop minimum viable product with core features', priority: 'high', tags: ['development', 'product'] },
      { title: 'Create Pitch Deck', description: 'Design compelling investor presentation', priority: 'medium', tags: ['fundraising', 'presentation'] },
      { title: 'User Testing & Feedback', description: 'Conduct interviews and gather user insights', priority: 'medium', tags: ['ux', 'research'] }
    ]
  },
  product: {
    icon: Target,
    title: 'Product Manager',
    description: 'Core responsibilities for product management',
    color: 'text-blue-600',
    bg: 'bg-blue-50 dark:bg-blue-900/20',
    border: 'border-blue-200 dark:border-blue-800',
    tasks: [
      { title: 'Define Product Roadmap', description: 'Create quarterly product strategy and milestones', priority: 'high', tags: ['planning', 'strategy'] },
      { title: 'Write User Stories', description: 'Document detailed user requirements and acceptance criteria', priority: 'high', tags: ['requirements', 'documentation'] },
      { title: 'Sprint Planning Meeting', description: 'Plan next sprint with engineering team', priority: 'medium', tags: ['agile', 'planning'] },
      { title: 'Stakeholder Review', description: 'Present product progress to stakeholders', priority: 'medium', tags: ['communication', 'review'] }
    ]
  },
  founder: {
    icon: Briefcase,
    title: 'CEO / Founder',
    description: 'Strategic tasks for company leadership',
    color: 'text-orange-600',
    bg: 'bg-orange-50 dark:bg-orange-900/20',
    border: 'border-orange-200 dark:border-orange-800',
    tasks: [
      { title: 'Fundraising Strategy', description: 'Plan Series A round and investor outreach', priority: 'high', tags: ['fundraising', 'strategy'] },
      { title: 'Key Hires Recruitment', description: 'Recruit senior leadership and critical roles', priority: 'high', tags: ['hiring', 'hr'] },
      { title: 'Strategic Partnerships', description: 'Negotiate and close partnership deals', priority: 'medium', tags: ['business', 'partnerships'] },
      { title: 'Board Meeting Prep', description: 'Prepare quarterly board meeting materials', priority: 'medium', tags: ['governance', 'reporting'] }
    ]
  },
  cto: {
    icon: Code,
    title: 'CTO / Tech Lead',
    description: 'Technical leadership and architecture',
    color: 'text-green-600',
    bg: 'bg-green-50 dark:bg-green-900/20',
    border: 'border-green-200 dark:border-green-800',
    tasks: [
      { title: 'System Architecture Review', description: 'Evaluate and optimize system design', priority: 'high', tags: ['architecture', 'technical'] },
      { title: 'Code Review & Quality', description: 'Review team PRs and ensure code quality', priority: 'high', tags: ['code-review', 'quality'] },
      { title: 'Tech Stack Evaluation', description: 'Research and decide on new technologies', priority: 'medium', tags: ['technology', 'decision'] },
      { title: 'Team 1:1 Meetings', description: 'Conduct individual meetings with engineers', priority: 'medium', tags: ['management', 'people'] }
    ]
  },
  manager: {
    icon: Users,
    title: 'Engineering Manager',
    description: 'Team management and operations',
    color: 'text-cyan-600',
    bg: 'bg-cyan-50 dark:bg-cyan-900/20',
    border: 'border-cyan-200 dark:border-cyan-800',
    tasks: [
      { title: 'Daily Team Standup', description: 'Facilitate daily sync and remove blockers', priority: 'high', tags: ['meeting', 'communication'] },
      { title: 'Performance Reviews', description: 'Conduct quarterly performance evaluations', priority: 'high', tags: ['hr', 'performance'] },
      { title: 'Resource Planning', description: 'Plan team capacity and project allocation', priority: 'medium', tags: ['planning', 'resources'] },
      { title: 'Team Building Activity', description: 'Organize team bonding event', priority: 'low', tags: ['culture', 'team'] }
    ]
  },
  teamlead: {
    icon: Zap,
    title: 'Team Lead',
    description: 'Technical leadership and mentoring',
    color: 'text-pink-600',
    bg: 'bg-pink-50 dark:bg-pink-900/20',
    border: 'border-pink-200 dark:border-pink-800',
    tasks: [
      { title: 'Sprint Retrospective', description: 'Facilitate team retrospective and improvements', priority: 'high', tags: ['agile', 'improvement'] },
      { title: 'Technical Debt Cleanup', description: 'Address and prioritize technical debt', priority: 'medium', tags: ['technical', 'maintenance'] },
      { title: 'Junior Developer Mentoring', description: 'Guide and mentor junior team members', priority: 'medium', tags: ['mentoring', 'growth'] },
      { title: 'Update Documentation', description: 'Maintain technical documentation', priority: 'low', tags: ['documentation', 'knowledge'] }
    ]
  }
};

const TaskTemplates = ({ isOpen, onClose, onSelectTemplate }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose}>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-gradient-to-r from-cyan-500 to-teal-600 px-6 py-6 rounded-t-2xl">
          <h2 className="text-2xl font-bold text-white mb-2">Task Templates</h2>
          <p className="text-cyan-50">Choose a professional template to jumpstart your workflow</p>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(TEMPLATES).map(([key, template]) => {
              const Icon = template.icon;
              return (
                <div
                  key={key}
                  onClick={() => {
                    onSelectTemplate(template.tasks);
                    onClose();
                  }}
                  className={`${template.bg} border-2 ${template.border} hover:shadow-xl rounded-xl p-5 cursor-pointer transition-all transform hover:scale-105 group`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`p-3 bg-white dark:bg-gray-700 rounded-xl shadow-md ${template.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900 dark:text-white text-base">{template.title}</h3>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    {template.tasks.map((task, idx) => (
                      <div key={idx} className="bg-white/50 dark:bg-gray-700/50 rounded-lg p-2">
                        <p className="text-sm font-medium text-gray-800 dark:text-gray-200">{task.title}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{task.description}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-600">
                    <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {template.tasks.length} tasks included
                    </span>
                    <span className={`text-xs font-semibold ${template.color}`}>
                      Click to use →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4 rounded-b-2xl">
          <button
            onClick={onClose}
            className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskTemplates;
