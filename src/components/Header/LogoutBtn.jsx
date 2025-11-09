import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { Button, CircularProgress } from '@mui/material';

function LogoutButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await authService.logout(); // Appwrite: delete session
      dispatch(logout());         // Redux update
     navigate("/");            // Redirect to home/login
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="outlined"
      color="error"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? <CircularProgress size={20} /> : 'Logout'}
    </Button>
  );
}

export default LogoutButton;

