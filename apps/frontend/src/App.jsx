import { useAuthStore } from './stores/auth.store';
import { AuthPage } from './pages/AuthPage/AuthPage';
import { TasksPage } from './pages/TasksPage/TasksPage';

export function App() {
  const token = useAuthStore((state) => state.token);

  return token ? <TasksPage /> : <AuthPage />;
}

export default App;
