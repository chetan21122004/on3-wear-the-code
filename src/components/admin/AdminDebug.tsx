import { useAuth } from "@/contexts/AuthContext";

export const AdminDebug = () => {
  const { user, userProfile, loading } = useAuth();

  // Only show in development
  if (process.env.NODE_ENV !== 'development') return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-black/90 text-white p-3 rounded text-xs max-w-xs">
      <div className="font-bold mb-2">Admin Debug Info:</div>
      <div>Loading: {loading ? 'true' : 'false'}</div>
      <div>User: {user ? 'logged in' : 'not logged in'}</div>
      <div>Email: {user?.email || 'none'}</div>
      <div>Profile: {userProfile ? 'loaded' : 'not loaded'}</div>
      <div>Role: {userProfile?.role || 'unknown'}</div>
      <div>Full Name: {userProfile?.full_name || 'none'}</div>
    </div>
  );
};
