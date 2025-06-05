
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { BottomNavigation } from './BottomNavigation';
import { TopHeader } from './TopHeader';

export default function Layout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="h-screen bg-primary/5 flex items-center justify-center">
        <div className="text-primary text-xl font-semibold">Loading UniStay...</div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <TopHeader />
      <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>
      <BottomNavigation />
    </div>
  );
}
