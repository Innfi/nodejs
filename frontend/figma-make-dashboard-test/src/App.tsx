import { useState } from 'react';
import { WorkoutDashboard } from './components/WorkoutDashboard';
import { SchedulePage } from './components/SchedulePage';
import { WorkoutPage } from './components/WorkoutPage';
import { ProfilePage } from './components/ProfilePage';
import { BottomNavigation } from './components/BottomNavigation';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <WorkoutDashboard />;
      case 'schedule':
        return <SchedulePage />;
      case 'workout':
        return <WorkoutPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <WorkoutDashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderContent()}
      <BottomNavigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
}