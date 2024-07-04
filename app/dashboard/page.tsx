import dynamic from 'next/dynamic';

const DynamicClientLayout = dynamic(() => import('@/app/layout/DynamicImport'), { ssr: false });

const Dashboard = () => {

  return (
      <DynamicClientLayout>
          <div>
            <h1>Dashboard</h1>
          </div>
      </DynamicClientLayout>
  );
};

export default Dashboard;