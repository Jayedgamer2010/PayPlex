
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AdminUser, AuditLog, SecurityAlert, User } from '../types';
import { CURRENT_ADMIN, MOCK_AUDIT_LOGS, MOCK_SECURITY_ALERTS, MOCK_USERS } from '../adminConstants';

type AuthStep = 'login' | 'otp' | '2fa' | 'authenticated';

interface AdminContextType {
  admin: AdminUser | null;
  authStep: AuthStep;
  users: User[];
  auditLogs: AuditLog[];
  securityAlerts: SecurityAlert[];
  isLoading: boolean;
  loginStep1: (password: string) => Promise<boolean>;
  loginStep2: (otp: string) => Promise<boolean>;
  loginStep3: (method: 'biometric' | 'totp') => Promise<boolean>;
  logout: () => void;
  updateUserStatus: (userId: string, status: User['status']) => void;
  deleteUser: (userId: string) => void;
  resolveAlert: (alertId: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children?: ReactNode }) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [authStep, setAuthStep] = useState<AuthStep>('login');
  const [users, setUsers] = useState<User[]>(MOCK_USERS);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(MOCK_AUDIT_LOGS);
  const [securityAlerts, setSecurityAlerts] = useState<SecurityAlert[]>(MOCK_SECURITY_ALERTS);
  const [isLoading, setIsLoading] = useState(false);

  // Step 1: Password
  const loginStep1 = async (password: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    if (password === 'Admin@2024') {
      setAuthStep('otp');
      return true;
    }
    return false;
  };

  // Step 2: OTP
  const loginStep2 = async (otp: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    if (otp.length === 6) {
      setAuthStep('2fa');
      return true;
    }
    return false;
  };

  // Step 3: Biometric/TOTP
  const loginStep3 = async (method: 'biometric' | 'totp') => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    setAdmin(CURRENT_ADMIN);
    setAuthStep('authenticated');
    return true;
  };

  const logout = () => {
    setAdmin(null);
    setAuthStep('login');
  };

  const updateUserStatus = (userId: string, status: User['status']) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status } : u));
    // Add audit log
    const newLog: AuditLog = {
      id: `evt_${Date.now()}`,
      adminId: admin?.id || 'unknown',
      adminName: admin?.name || 'Unknown',
      action: 'Update Status',
      target: userId,
      timestamp: new Date().toISOString(),
      ip: '127.0.0.1',
      details: `Changed status to ${status}`,
      status: 'success'
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const deleteUser = (userId: string) => {
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  const resolveAlert = (alertId: string) => {
    setSecurityAlerts(prev => prev.filter(a => a.id !== alertId));
  };

  return (
    <AdminContext.Provider value={{
      admin,
      authStep,
      users,
      auditLogs,
      securityAlerts,
      isLoading,
      loginStep1,
      loginStep2,
      loginStep3,
      logout,
      updateUserStatus,
      deleteUser,
      resolveAlert
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
