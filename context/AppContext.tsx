
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User, Transaction, Card, NotificationItem, Contact } from '../types';
import { INITIAL_USER, MOCK_TRANSACTIONS, MOCK_CARDS, MOCK_NOTIFICATIONS, MOCK_CONTACTS, TEST_CREDENTIALS } from '../constants';

interface AppContextType {
  user: User | null;
  transactions: Transaction[];
  cards: Card[];
  notifications: NotificationItem[];
  contacts: Contact[];
  isDarkMode: boolean;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  sendMoney: (toId: string, amount: number, note: string) => Promise<void>;
  addCard: (card: Card) => void;
  updateCard: (id: string, updates: Partial<Card>) => void;
  addBankAccount: (details: any) => void;
  markNotificationRead: (id: string) => void;
  toggleTheme: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [cards, setCards] = useState<Card[]>(MOCK_CARDS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Fake login
  const login = async (email: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API
    
    // Check if logging in as the test user
    if (email.toLowerCase() === TEST_CREDENTIALS.email.toLowerCase()) {
      setUser(INITIAL_USER);
    } else {
      // Create a generic user for other emails
      setUser({ 
        ...INITIAL_USER, 
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        balance: 0 
      });
    }
    
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
  };

  const sendMoney = async (toId: string, amount: number, note: string) => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate Processing

    const contact = MOCK_CONTACTS.find(c => c.id === toId);
    
    // Deduct balance
    if (user) {
      setUser(prev => prev ? ({ ...prev, balance: prev.balance - amount }) : null);
    }

    // Add transaction
    const newTx: Transaction = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'sent',
      amount: amount,
      date: new Date().toISOString(),
      description: note || 'Payment Sent',
      counterpartyName: contact?.name || 'Unknown Recipient',
      counterpartyAvatar: contact?.avatar
    };

    setTransactions(prev => [newTx, ...prev]);
    setIsLoading(false);
  };

  const addCard = (card: Card) => {
    setCards(prev => [...prev, card]);
  };

  const updateCard = (id: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => card.id === id ? { ...card, ...updates } : card));
  };

  const addBankAccount = (details: any) => {
    // Logic to add bank (mock)
    console.log('Bank added', details);
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <AppContext.Provider value={{
      user,
      transactions,
      cards,
      notifications,
      contacts: MOCK_CONTACTS,
      isDarkMode,
      isLoading,
      login,
      logout,
      sendMoney,
      addCard,
      updateCard,
      addBankAccount,
      markNotificationRead,
      toggleTheme
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
