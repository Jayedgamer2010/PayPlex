
import { AdminUser, AuditLog, SecurityAlert, User } from './types';

export const ADMIN_CREDENTIALS = {
  email: 'admin@payflex.com',
  password: 'Admin@2024'
};

export const CURRENT_ADMIN: AdminUser = {
  id: 'adm_001',
  name: 'Alex Maxwell',
  email: 'admin@payflex.com',
  role: 'super_admin',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAl1_wvHz7_CR_BsWvNSSSUXn1DoaKqF97Xp9aBIr4g3REUIpxATkN5jvGs6HgxsXl5Zo55EjTuYCcGbiOeF_3Sp0SUgwYtRFzdVNmTtfzTcM0sJVVV4Pgy2uNEKTm2czIbBV1fUjxea5UzfY-K4ToVdeG4Vao2ie1aFMQROEvaIdjoJDRDJn7CYJDIAPOmR85zwnPVUfhQrMas0S1WxVyGW_Gm1-LD0PSljrZgx25GuYXJ_zbF9rTXDTaRoO5qNhrIDBiFCXxzkDOZ',
  lastLogin: new Date().toISOString()
};

export const MOCK_USERS: User[] = [
  { id: 'u1', name: 'Jayed Sheikh', email: 'jayed@payflex.com', phone: '+880123456789', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFsvcobZwon2014KOpRaxys0laNXV1eseOX1g-nvV5ASwrqxy0dGpl-EaLtDcGFYZGI834w4r03buZwAdZsB99zYHhF5gNlehdkhp9vi48XI7_vPDkhC_CMIUVCsWz_t5BKrcgmuM61Z8QgSITkt_pL06nvjrZJimwxL56L8JCP_2RCS0oCg9tLUfv9YsdrXg9S91ZET4_yQf5bcA2m7zhPY-8PEhQxTzHyUuECz2Hu0wnrIX3jQUpXs5VRddi2ShCzPfcSfprCt9K', balance: 1234.56, status: 'active', joinDate: '2023-01-15' },
  { id: 'u2', name: 'Wade Warren', email: 'wade.w@example.com', phone: '+15550001111', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGcH7hZ6ENMKtIbj3ZCd861k7Exf4xFr6Afm5EB-MUf4r4tYnzoV1-KaCdraPbB1c58vBMwdNhBLTTt8zUCmhsw2ts6pd80vGLrIp7-zR-N3-a3dgeJvqt4zxoUj6BXUQ3MuJMa6pBfw9OIvp3nBgUEGrk6XQAOssVlCpPl7fLlBnjrn8F0iIkxQzHrByPWHkoinMR4Y72DmlZUZRy3PO1TYHMsnnnnH3ngJwchH6hVgWQO9vpD4MlqdAzxUc9DakxGzzX1YwH-cm0', balance: 1450.00, status: 'active', joinDate: '2023-03-22' },
  { id: 'u3', name: 'Eleanor Pena', email: 'eleanor@example.com', phone: '+15550002222', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCgYZqurRDeiAWvPTGpQOht3-umxRhgv2mraPS71K67XjS2uT0guzIc5f_VTdbPjxAq4uHIWxgV-p_G36jjV60NoaOJH659t__Pl-jlqWiEhA1I5naeASKc6mAE2puk_lFJo8umGEl1k3AH_T0vONIamEVW1zeOc9H2e8-fhqHjkt_x55bRe5vxrBq9Q5C8ym8ETtYk3QH1xknXzDtWq6OFYvk9070tCHY4gZvswHDimmSoiilQxq9XlWTcR9u2XHvmEXvnbSWI28ra', balance: 250.75, status: 'suspended', joinDate: '2023-04-10' },
  { id: 'u4', name: 'Robert Fox', email: 'robert.f@example.com', phone: '+15550003333', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_Z-5hArmdyt1-j0lWNZIHWu_rk2TgdltFrLN8SkAb5sqhmizsLaYPwBWZ8ykCHyytQ4qPpvtEytAwPIccJlEvyZNjdHev2fW1mhExg29ciGpS7D3HQDbMaqBKeUM0cEBJO1e6u8rupG0FDPzPyzmEuxpuq68AyyNyp-VwUmUsM2NHoxJaZp4Ecslk9HCVzismcLSjRw0-2XEU3kkAg1dg2RFDr2sHBBUksvkKI8Q9yS-ND-dHkEk5VtcFUH2f7tTbvLzv4ee8UiXb', balance: 5120.00, status: 'active', joinDate: '2023-02-05' },
  { id: 'u5', name: 'Jane Cooper', email: 'j.cooper@example.com', phone: '+15550004444', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBII95eKlQ35j0EEWscdC739Vgh2bFpEf6TKev2NAon1rbzCppLBjv0_0xwMgF0tDTlc1urUyvfE8YB_OIxBVTlouhNPsy55LdSSVdTTQhSv5yumqLtc-DDMLzcJm96aZpyUkJLdhiBbj8GjG0AJvEDD7BM8ToMCyluVOpZjq4FphYwW-H6IKXsS6K2anl5w5gU2Zwt0gxqILHRzklIHm5jnqR3i-BNvxr-hSKw_SOSGQmgJKB8k4NbwVU6-jNqPDF9IeGYd1psv9Mz', balance: 0.00, status: 'active', joinDate: '2023-06-18' },
];

export const MOCK_AUDIT_LOGS: AuditLog[] = [
  { id: 'evt_12345', adminId: 'adm_001', adminName: 'Alex Maxwell', action: 'Login Success', target: 'System', timestamp: '2023-10-27T14:30:15Z', ip: '192.168.1.101', details: 'User Agent: iOS App v2.3.1', status: 'success' },
  { id: 'evt_12344', adminId: 'adm_001', adminName: 'Alex Maxwell', action: 'Account Lock', target: 'u3', timestamp: '2023-10-27T14:28:05Z', ip: '203.0.113.45', details: 'Reason: Suspicious activity', status: 'success' },
  { id: 'evt_12340', adminId: 'adm_002', adminName: 'Sarah Smith', action: 'Setting Changed', target: 'Transaction Limit', timestamp: '2023-10-27T11:05:21Z', ip: '10.0.0.1', details: 'Value changed from 5000 to 10000', status: 'success' },
];

export const MOCK_SECURITY_ALERTS: SecurityAlert[] = [
  { id: 'sa_1', severity: 'high', type: 'Suspicious Transaction', description: '$2,500.00 to @digitalart from User #5821', timestamp: '10 min ago', status: 'open' },
  { id: 'sa_2', severity: 'medium', type: 'Failed Login', description: 'Multiple failed attempts for admin account', timestamp: '2 hours ago', status: 'investigating' },
  { id: 'sa_3', severity: 'low', type: 'New Device', description: 'User #9921 logged in from unusual location', timestamp: '1 day ago', status: 'resolved' },
];
