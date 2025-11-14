import { createContext, useContext, useState, useEffect } from 'react';
import { citizenAPI, authorityAPI, adminAPI } from '../api/api';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');

    if (token && storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType);
      
      // Verify token by fetching profile (only for citizens)
      if (storedUserType === 'citizen') {
        citizenAPI.getProfile()
          .then((res) => {
            setUser(res.data.data.citizen);
            localStorage.setItem('user', JSON.stringify(res.data.data.citizen));
          })
          .catch(() => {
            // Token invalid, clear storage
            logout();
          })
          .finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  // Citizen login
  const citizenLogin = async (email, password) => {
    try {
      const res = await citizenAPI.login({ email, password });
      const { token, citizen } = res.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(citizen));
      localStorage.setItem('userType', 'citizen');
      
      setUser(citizen);
      setUserType('citizen');
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Citizen register
  const citizenRegister = async (data) => {
    try {
      const res = await citizenAPI.register(data);
      const { token, citizen } = res.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(citizen));
      localStorage.setItem('userType', 'citizen');
      
      setUser(citizen);
      setUserType('citizen');
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Registration failed' };
    }
  };

  // Authority login
  const authorityLogin = async (email, password) => {
    try {
      const res = await authorityAPI.login({ email, password });
      const { token, authority } = res.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(authority));
      localStorage.setItem('userType', 'authority');
      
      setUser(authority);
      setUserType('authority');
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Admin login
  const adminLogin = async (email, password) => {
    try {
      const res = await adminAPI.login({ email, password });
      const { token, admin } = res.data.data;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(admin));
      localStorage.setItem('userType', 'admin');
      
      setUser(admin);
      setUserType('admin');
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      return { success: false, error: error.response?.data?.message || 'Login failed' };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    setUser(null);
    setUserType(null);
    toast.success('Logged out successfully');
  };

  // Get profile (for citizens)
  const getProfile = async () => {
    if (userType !== 'citizen') return;
    try {
      const res = await citizenAPI.getProfile();
      const updatedUser = res.data.data.citizen;
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return updatedUser;
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  };

  const value = {
    user,
    userType,
    loading,
    isAuthenticated: !!user,
    isCitizen: userType === 'citizen',
    isAuthority: userType === 'authority',
    isAdmin: userType === 'admin',
    citizenLogin,
    citizenRegister,
    authorityLogin,
    adminLogin,
    logout,
    getProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

