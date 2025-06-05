
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { NowPlaying } from './NowPlaying';

export default function Layout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-900 to-black">
            <Outlet />
          </main>
        </div>
      </div>
      <NowPlaying />
    </div>
  );
}
