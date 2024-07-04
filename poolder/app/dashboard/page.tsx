import ProtectedRoute from '@/route/route';
import dynamic from 'next/dynamic';

const DynamicClientLayout = dynamic(() => import('@/app/layout/DynamicImport'), { ssr: false });

const Dashboard = () => {

  return (
    <DynamicClientLayout>
      <ProtectedRoute>
        <div>
          <h1>Dashboard</h1>
        </div>
      </ProtectedRoute>
    </DynamicClientLayout>
  );
};

export default Dashboard;