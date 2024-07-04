import ProtectedRoute from '@/route/route';
import dynamic from 'next/dynamic';

const DynamicClientLayout = dynamic(() => import('@/app/layout/DynamicImport'), { ssr: false });

const Settings = () => {
    return (
      <DynamicClientLayout>
        <ProtectedRoute>
          <div>
            <h1>Settings</h1>
            {/* Add settings related code here */}
          </div>
        </ProtectedRoute>
      </DynamicClientLayout>
    );
  };
  
  export default Settings;  