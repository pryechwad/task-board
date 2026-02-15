import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CheckSquare } from 'lucide-react';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-teal-50 to-cyan-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Left Side - Info */}
        <div className="hidden lg:block space-y-8 animate-fade-in">
          <div>
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-2xl mb-6 shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Organize Your Work,<br />Boost Productivity
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              A powerful task management tool designed to help teams and individuals stay organized, 
              track progress, and achieve their goals efficiently.
            </p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md mx-auto lg:mx-0">
          {/* Mobile Header */}
          <div className="text-center lg:hidden mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-xl mb-4 shadow-lg">
              <CheckSquare className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Board</h1>
            <p className="text-cyan-700">Organize your work efficiently</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl border border-cyan-100 p-6 sm:p-8">
            <div className="hidden lg:block mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-600">Sign in to continue to your workspace</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-scale-in">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
                  placeholder="intern@demo.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
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
                className="w-full bg-gradient-to-r from-cyan-600 to-teal-600 text-white py-3 rounded-lg font-medium hover:from-cyan-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials</p>
              <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-lg p-3 text-center border border-cyan-100">
                <p className="text-sm text-cyan-900 font-mono">intern@demo.com</p>
                <p className="text-sm text-cyan-900 font-mono">intern123</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
