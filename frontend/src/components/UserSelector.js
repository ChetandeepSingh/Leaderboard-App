import React, { useEffect, useState } from 'react';
import { 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Button, 
  TextField, 
  CircularProgress,
  Typography,
  Chip,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://leaderboard-app-ehsz.onrender.com';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
    background: 'rgba(255, 255, 255, 0.9)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(102, 126, 234, 0.2)',
    '&:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  fontWeight: 700,
  padding: theme.spacing(1.5, 3),
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 6px 20px rgba(102, 126, 234, 0.3)',
  border: '2px solid rgba(255, 255, 255, 0.2)',
  color: 'white',
  minHeight: 40,
  '&:hover': {
    background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
    boxShadow: '0 8px 25px rgba(102, 126, 234, 0.4)',
    transform: 'translateY(-2px)',
  },
  '&:disabled': {
    background: 'rgba(102, 126, 234, 0.3)',
    color: 'rgba(255, 255, 255, 0.5)',
    boxShadow: 'none',
    transform: 'none',
  },
  transition: 'all 0.3s ease',
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1.2, 2.5),
    fontSize: '0.9rem',
    minHeight: 36,
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  color: theme.palette.primary.main,
  marginBottom: theme.spacing(1),
  fontSize: '1rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '0.9rem',
    marginBottom: theme.spacing(0.8),
  }
}));

const AnimatedChip = styled(Chip)(({ theme }) => ({
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  fontWeight: 600,
  transition: 'all 0.3s ease',
  animation: 'pulse 0.6s ease-in-out',
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
    },
    '50%': {
      transform: 'scale(1.05)',
    },
    '100%': {
      transform: 'scale(1)',
    },
  },
}));

export default function UserSelector({ selectedUser, setSelectedUser, onUserAdded, refresh }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState('');
  const [adding, setAdding] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUsers();
  }, [refresh]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/users`);
      setUsers(res.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
    setLoading(false);
  };

  const handleAddUser = async () => {
    if (!newUser.trim()) return;
    setAdding(true);
    try {
      const res = await axios.post(`${API_URL}/users`, { name: newUser });
      setUsers(prev => [...prev, res.data]);
      setNewUser('');
      onUserAdded && onUserAdded();
    } catch (e) {
      alert(e.response?.data?.error || 'Error adding user');
    }
    setAdding(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddUser();
    }
  };

  return (
    <Box display="flex" flexDirection="column" gap={isMobile ? 1.8 : 2.2} width="100%">
      {/* User Selection */}
      <Box>
        <SectionTitle>
          👤 Select User
        </SectionTitle>
        <StyledFormControl fullWidth>
          <InputLabel>Choose a user</InputLabel>
          <Select
            value={selectedUser || ''}
            label="Choose a user"
            onChange={e => setSelectedUser(e.target.value)}
            disabled={loading}
          >
            {loading ? (
              <MenuItem value="">
                <Box display="flex" alignItems="center" gap={1}>
                  <CircularProgress size={16} />
                  <Typography variant="body2">Loading users...</Typography>
                </Box>
              </MenuItem>
            ) : (
              users.map(user => (
                <MenuItem key={user._id} value={user._id}>
                  <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
                    <Typography 
                      variant={isMobile ? "body2" : "body1"}
                      sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}
                    >
                      {user.name}
                    </Typography>
                    <AnimatedChip 
                      label={`${user.totalPoints} pts`} 
                      size="small" 
                      sx={{ 
                        fontSize: isMobile ? '0.7rem' : '0.8rem',
                        height: isMobile ? 20 : 24,
                      }} 
                    />
                  </Box>
                </MenuItem>
              ))
            )}
          </Select>
        </StyledFormControl>
      </Box>

      {/* Add New User */}
      <Box>
        <SectionTitle>
          ➕ Add New User
        </SectionTitle>
        <Box display="flex" gap={1} alignItems="flex-end">
          <StyledTextField
            fullWidth
            placeholder="Enter user name"
            value={newUser}
            onChange={e => setNewUser(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={adding}
            size="small"
          />
          <StyledButton
            variant="contained"
            onClick={handleAddUser}
            disabled={adding || !newUser.trim()}
            startIcon={adding ? <CircularProgress size={isMobile ? 14 : 16} /> : <PersonAddIcon />}
            sx={{ 
              minWidth: 'auto', 
              px: isMobile ? 2 : 2.5,
              '& .MuiButton-startIcon': {
                marginRight: isMobile ? 0.5 : 0.8
              }
            }}
          >
            {adding ? '' : (isMobile ? 'Add' : 'Add User')}
          </StyledButton>
        </Box>
      </Box>
    </Box>
  );
} 