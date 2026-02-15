import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CheckSquare, Sparkles, BarChart3, Users, Zap } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    const result = login(email, password, rememberMe);
    if (result.success) {
      navigate('/board');
    } else {
      setError(result.error);
    }
  };

  const features = [
    { icon: CheckSquare, title: 'Task Management', desc: 'Create, organize, and track tasks effortlessly' },
    { icon: Sparkles, title: 'Pre-built Templates', desc: 'Get started quickly with ready-to-use templates' },
    { icon: BarChart3, title: 'Analytics Dashboard', desc: 'Track progress and visualize your productivity' },
    { icon: Zap, title: 'Drag & Drop', desc: 'Move tasks seamlessly between columns' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div>
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <CheckSquare className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
                Task Board
              </h1>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
              Organize Your Work,<br />Boost Productivity
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              A powerful task management solution designed to help teams and individuals 
              stay organized, track progress, and achieve their goals efficiently.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 border border-gray-200 hover:border-cyan-300 hover:shadow-md transition-all">
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{feature.title}</h3>
                <p className="text-xs text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="flex gap-8 pt-4">
            <div>
              <p className="text-3xl font-bold text-cyan-600">100+</p>
              <p className="text-sm text-gray-600">Active Users</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-teal-600">5K+</p>
              <p className="text-sm text-gray-600">Tasks Completed</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-cyan-600">99%</p>
              <p className="text-sm text-gray-600">Satisfaction</p>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Header */}
          <div className="text-center lg:hidden mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl mb-4 shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent mb-2">Task Board</h1>
            <p className="text-gray-600">Organize your work efficiently</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm animate-scale-in">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                />
                <label htmlFor="remember" className="ml-2 text-sm text-gray-700">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3.5 rounded-xl font-semibold hover:from-cyan-700 hover:to-teal-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Sign In to Your Workspace
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl p-4 border border-cyan-200">
                <p className="text-xs font-semibold text-cyan-900 mb-2 text-center">Demo Credentials</p>
                <div className="space-y-1">
                  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-500">Email:</span>
                    <span className="text-sm text-gray-900 font-mono font-medium">intern@demo.com</span>
                  </div>
                  <div className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                    <span className="text-xs text-gray-500">Password:</span>
                    <span className="text-sm text-gray-900 font-mono font-medium">intern123</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 grid grid-cols-2 gap-3">
            {features.map((feature, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 border border-gray-200 text-center">
                <p className="text-xs font-semibold text-gray-900">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
