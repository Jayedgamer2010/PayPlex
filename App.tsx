
import React from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { AdminProvider, useAdmin } from './context/AdminContext';
import { AppShell, BottomNav } from './components/Layout';

// User Pages
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Auth from './pages/Auth';
import Home from './pages/Home';
import Transactions from './pages/Transactions';
import Cards from './pages/Cards';
import Profile from './pages/Profile';
import { SelectContact, EnterAmount, PaymentSuccess } from './pages/SendMoney';
import Notifications from './pages/Notifications';
import ScanQR from './pages/ScanQR';

// Admin Pages
import AdminAuth from './pages/admin/AdminAuth';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import TransactionManagement from './pages/admin/TransactionManagement';
import CardManagement from './pages/admin/CardManagement';
import Analytics from './pages/admin/Analytics';
import SecurityCenter from './pages/admin/SecurityCenter';
import AuditLogs from './pages/admin/AuditLogs';
import Settings from './pages/admin/Settings';
import Reports from './pages/admin/Reports';
import AdminProfile from './pages/admin/AdminProfile';
import AdminNotifications from './pages/admin/AdminNotifications';

const ProtectedRoute = () => {
  return (
    <>
      <Outlet />
      <BottomNav />
    </>
  );
};

const ProtectedAdminRoute = () => {
  const { authStep } = useAdmin();
  if (authStep !== 'authenticated') {
    return <Navigate to="/admin/auth" replace />;
  }
  return <AdminLayout />;
};

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <HashRouter>
          <Routes>
            {/* --- USER ROUTES --- */}
            <Route path="/" element={<AppShell><Splash /></AppShell>} />
            <Route path="/onboarding" element={<AppShell><Onboarding /></AppShell>} />
            <Route path="/auth" element={<AppShell><Auth /></AppShell>} />
            
            <Route path="/app" element={<AppShell><ProtectedRoute /></AppShell>}>
              <Route path="home" element={<Home />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="cards" element={<Cards />} />
              <Route path="profile" element={<Profile />} />
            </Route>

            <Route path="/flow" element={<AppShell><Outlet /></AppShell>}>
              <Route path="send/contacts" element={<SelectContact />} />
              <Route path="send/amount/:id" element={<EnterAmount />} />
              <Route path="send/success" element={<PaymentSuccess />} />
              <Route path="notifications" element={<Notifications />} />
              <Route path="scan" element={<ScanQR />} />
              <Route path="add-card" element={<div className="p-4">Add Card Placeholder</div>} />
            </Route>

            {/* --- ADMIN ROUTES --- */}
            <Route path="/admin/auth" element={<AdminAuth />} />
            
            <Route path="/admin" element={<ProtectedAdminRoute />}>
              <Route index element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="users" element={<UserManagement />} />
              <Route path="transactions" element={<TransactionManagement />} />
              <Route path="cards" element={<CardManagement />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="security" element={<SecurityCenter />} />
              <Route path="logs" element={<AuditLogs />} />
              <Route path="settings" element={<Settings />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="notifications" element={<AdminNotifications />} />
            </Route>

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </HashRouter>
      </AdminProvider>
    </AppProvider>
  );
}
