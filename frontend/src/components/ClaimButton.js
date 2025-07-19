import React, { useState } from 'react';
import { 
  Button, 
  CircularProgress, 
  Snackbar, 
  Alert,
  Box,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://leaderboard-app-ehsz.onrender.com';

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 16,
  textTransform: 'none',
  fontWeight: 700,
  fontSize: '1.1rem',
  padding: theme.spacing(2, 4),
  background: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 100%)',
  boxShadow: '0 8px 25px rgba(255, 107, 53, 0.3)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  minWidth: 200,
  '&:hover': {
    background: 'linear-gradient(135deg, #E55A2B 0%, #E0851A 100%)',
    boxShadow: '0 12px 35px rgba(255, 107, 53, 0.4)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: 'rgba(255, 255, 255, 0.3)',
    color: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'none',
    transform: 'none',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1rem',
    padding: theme.spacing(1.5, 3),
    minWidth: 160,
    '&:hover': {
      transform: 'translateY(-1px)',
    }
  }
}));

const PointsAnimation = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  animation: 'pulse 0.6s ease-in-out',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.1)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

export default function ClaimButton({ selectedUser, onClaimed }) {
  const [loading, setLoading] = useState(false);
  const [points, setPoints] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedUserName, setSelectedUserName] = useState('');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClaim = async () => {
    if (!selectedUser) return;
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/claim`, { userId: selectedUser });
      setPoints(res.data.pointsAwarded);
      setSelectedUserName(res.data.user.name);
      setOpen(true);
      onClaimed && onClaimed();
    } catch (e) {
      alert(e.response?.data?.error || 'Error claiming points');
    }
    setLoading(false);
  };

  return (
    <>
      <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
        <StyledButton
          variant="contained"
          onClick={handleClaim}
          disabled={!selectedUser || loading}
          startIcon={
            loading ? (
              <CircularProgress size={isMobile ? 18 : 20} sx={{ color: 'white' }} />
            ) : (
              <LocalFireDepartmentIcon sx={{ fontSize: isMobile ? 20 : 24 }} />
            )
          }
        >
          {loading ? 'Claiming...' : 'Claim Points'}
        </StyledButton>
        
        {!selectedUser && (
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary', 
              textAlign: 'center',
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}
          >
            Please select a user first
          </Typography>
        )}
      </Box>

      <Snackbar 
        open={open} 
        autoHideDuration={3000} 
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert 
          severity="success" 
          sx={{ 
            width: '100%',
            background: 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)',
            color: 'white',
            borderRadius: 2,
            boxShadow: '0 8px 25px rgba(76, 175, 80, 0.3)',
            [theme.breakpoints.down('sm')]: {
              margin: theme.spacing(1),
              fontSize: '0.9rem'
            }
          }}
          icon={
            <PointsAnimation>
              <LocalFireDepartmentIcon sx={{ color: 'white' }} />
            </PointsAnimation>
          }
        >
          <Box>
            <Typography 
              variant={isMobile ? "body2" : "body1"} 
              sx={{ fontWeight: 600 }}
            >
              {selectedUserName} claimed {points} points!
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.9,
                fontSize: isMobile ? '0.8rem' : '0.9rem'
              }}
            >
              Keep claiming to climb the leaderboard! 🔥
            </Typography>
          </Box>
        </Alert>
      </Snackbar>
    </>
  );
} 