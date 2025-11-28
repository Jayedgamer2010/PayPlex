
import { User, Contact, Transaction, Card, NotificationItem } from './types';

export const TEST_CREDENTIALS = {
  email: 'jayed@payflex.com',
  password: 'password123'
};

export const INITIAL_USER: User = {
  id: 'u1',
  name: 'Jayed Sheikh',
  email: 'jayed@payflex.com',
  phone: '+880123456789',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFsvcobZwon2014KOpRaxys0laNXV1eseOX1g-nvV5ASwrqxy0dGpl-EaLtDcGFYZGI834w4r03buZwAdZsB99zYHhF5gNlehdkhp9vi48XI7_vPDkhC_CMIUVCsWz_t5BKrcgmuM61Z8QgSITkt_pL06nvjrZJimwxL56L8JCP_2RCS0oCg9tLUfv9YsdrXg9S91ZET4_yQf5bcA2m7zhPY-8PEhQxTzHyUuECz2Hu0wnrIX3jQUpXs5VRddi2ShCzPfcSfprCt9K',
  balance: 1234.56,
  status: 'active',
  joinDate: '2023-01-15T10:00:00Z'
};

export const MOCK_CONTACTS: Contact[] = [
  { id: 'c1', name: 'Aliah Lane', handle: '@aliahlane', phone: '(555) 123-4567', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAGr9xToDwPozmHjEadkrnF5hK1S4Wd9bAxaZbKU-0MMi0hGAHcwTog5WGM9i9y_BqaAgV7YEbmlUkO5dbFKJ1bAfPT9Um6aPs_qdmBd5doiLJNH7MRI5R508dxE_cl-YItWniO1knLCwdkbVbBKMhJ5RLVdLkAy9B0NHn9u19kvFpKaSeKHQxNDVCI1uVKJXjB5cXrDVbJfhycEnLpvURcx1mSEmldpaTJN-eh6lGSZPQVR5zVIN7fapW9M9Yb_DqvsE-ETa7WgOh' },
  { id: 'c2', name: 'John Doe', handle: '@johndoe', phone: '(555) 987-6543', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAO7tK6NRllS6QR33BxjVgpqikJuYE_R_Odp0obu1G7DsPWrmxT8LyYvd_QQbzhkXL-1e6nKn75JuFQjHPabwbgLsLNbgKu32G4lw1lYT0U32SZH2o37oDvYYPzVbzQ8rG6Myz3FEh-sYTYiS7Plm8k08zJIHypgIUKvhyCHuVikViNWrjOVlogm4SVcQNwZBg54eSLwJQI-nZGcIkqytQZ7abzmZNYrKIfOAfwn_KjRx0DFMwg9LIHPa_OPhQLF0kFBP3kUJDHrqCx' },
  { id: 'c3', name: 'Maya Rao', handle: '@mayarao', phone: '(555) 222-3333', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAZV3Kcm_3qR38IgTmgv1EZcCen-EvERG1BjiQcg_ueZlTWZNq3_p73EsTkau6-iU2DArdMuIG77yI3FZxMMD6YXmns9fg0Tdl2qltOw_18sy_nUEquxtv6eREKrXgpQLu23tfm_2tZYiKFQWLLD7GjryVHPUOeZtVp76N0BDyvhd_0GwzmJTMdh7TvJPPO3Z8v7fOBZ0HKidq6jGk8E4r4jDhYSRxPHxWilGzxqfIKEKKcgbIIh85t5yXuMUzBf-dJ7XqCQD909Ua_' },
  { id: 'c4', name: 'Sarah Miller', handle: '@sarahm', phone: '(555) 444-5555', avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgEpk6hF7J6Je3SZkJIJoPbcFgh8vxkGdlKo_tdp0r2jbd4KeHbi5K6QjYEme2Z3HEWaZ8liHYlRC2_u_QuWJDdS4mH8P_o4wXtcpkvNsbqVcxtuDZ_519reLDRmGr7z3OOjNWWQ8PuFQ7tZb5YplTrZrV5VLCR5J8oxv7QfWzosMWOqiIF70aHSa8m1_JMPeNZi0SKaV4BG8vH0hFHHV16iLH_LIyURkPoKBTQCIBDr1Rc0xserEhUeI7TiweQU5bzGdu3X0tK8uR' },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 't1', type: 'received', amount: 250.00, date: new Date().toISOString(), description: 'Payment Received', counterpartyName: 'Sarah Miller', counterpartyAvatar: MOCK_CONTACTS[3].avatar },
  { id: 't2', type: 'payment', amount: 999.00, date: new Date(Date.now() - 3600000).toISOString(), description: 'Shopping', counterpartyName: 'Apple Store', category: 'shopping_bag' },
  { id: 't3', type: 'sent', amount: 42.50, date: new Date(Date.now() - 86400000).toISOString(), description: 'Dinner Share', counterpartyName: 'John Doe', counterpartyAvatar: MOCK_CONTACTS[1].avatar },
  { id: 't4', type: 'payment', amount: 15.99, date: new Date(Date.now() - 172800000).toISOString(), description: 'Subscription', counterpartyName: 'Netflix', category: 'movie' },
  { id: 't5', type: 'topup', amount: 500.00, date: new Date(Date.now() - 259200000).toISOString(), description: 'Wallet Top Up', counterpartyName: 'Bank of America', category: 'account_balance' },
];

export const MOCK_CARDS: Card[] = [
  { id: 'card1', type: 'visa', number: '4111 1111 1111 1234', holderName: 'Jayed Sheikh', expiry: '08/26', cvv: '123', isVirtual: true, color: 'from-blue-500 to-teal-400', status: 'active', spendingLimit: 5000 },
  { id: 'card2', type: 'visa', number: '4000 0000 0000 5678', holderName: 'Jayed Sheikh', expiry: '12/25', cvv: '456', isVirtual: false, color: 'bg-slate-800', status: 'active', spendingLimit: 10000 },
  { id: 'card3', type: 'amex', number: '3759 876543 21001', holderName: 'Jayed Sheikh', expiry: '03/27', cvv: '789', isVirtual: false, color: 'bg-yellow-600', status: 'frozen', spendingLimit: 15000 },
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: 'n1', type: 'payment', title: 'Payment Received', message: 'You received $50.00 from Jane Smith.', date: '10m ago', read: false },
  { id: 'n2', type: 'payment', title: 'Payment Sent', message: 'You sent $25.00 to Coffee Shop.', date: '1h ago', read: true },
  { id: 'n3', type: 'promo', title: 'Special Offer Unlocked', message: 'Get 10% cashback on your next purchase.', date: 'Yesterday', read: false },
  { id: 'n4', type: 'security', title: 'Security Alert', message: 'A new device was used to log into your account.', date: '2 days ago', read: true },
];
