
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  balance: number;
  status: 'active' | 'suspended' | 'pending';
  joinDate: string;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  handle: string;
  avatar: string;
}

export interface Transaction {
  id: string;
  type: 'sent' | 'received' | 'topup' | 'payment';
  amount: number;
  date: string; // ISO string
  description: string;
  counterpartyName: string;
  counterpartyAvatar?: string;
  category?: string;
  status?: 'success' | 'pending' | 'failed';
  fee?: number;
}

export interface Card {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  number: string; // Last 4 digits or masked
  holderName: string;
  expiry: string;
  cvv: string;
  isVirtual: boolean;
  color: string;
  status: 'active' | 'frozen' | 'blocked';
  spendingLimit: number;
}

export interface NotificationItem {
  id: string;
  type: 'payment' | 'security' | 'promo' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  read: boolean;
}

// --- ADMIN TYPES ---

export type AdminRole = 'super_admin' | 'admin' | 'moderator' | 'support';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar: string;
  lastLogin: string;
}

export interface AuditLog {
  id: string;
  adminId: string;
  adminName: string;
  action: string;
  target: string;
  timestamp: string;
  ip: string;
  details: string;
  status: 'success' | 'failure';
}

export interface SecurityAlert {
  id: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  type: string;
  description: string;
  timestamp: string;
  status: 'open' | 'investigating' | 'resolved';
}
