import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { NotificationProvider } from './hooks/useNotification';
import { ThemeProvider } from './hooks/useTheme';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Board from './pages/Board';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/board"
                element={
                  <ProtectedRoute>
                    <Board />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/board" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
