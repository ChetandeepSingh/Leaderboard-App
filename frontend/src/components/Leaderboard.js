import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  CircularProgress, 
  Avatar, 
  Card,
  CardContent,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://leaderboard-app-ehsz.onrender.com';

// Styled components
const TrophyContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: theme.spacing(4),
  position: 'relative',
}));

const TrophyIcon = styled(Box)(({ theme }) => ({
  width: 140,
  height: 140,
  background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: '0 12px 40px rgba(255, 215, 0, 0.4)',
  position: 'relative',
  animation: 'float 3s ease-in-out infinite',
  '@keyframes float': {
    '0%, 100%': {
      transform: 'translateY(0px)',
    },
    '50%': {
      transform: 'translateY(-10px)',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: -15,
    left: -15,
    right: -15,
    bottom: -15,
    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)',
    borderRadius: '50%',
    zIndex: -1,
    animation: 'pulse 2s ease-in-out infinite',
  },
  '@keyframes pulse': {
    '0%, 100%': {
      transform: 'scale(1)',
      opacity: 0.7,
    },
    '50%': {
      transform: 'scale(1.1)',
      opacity: 0.3,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 120,
    height: 120,
    '&::before': {
      top: -12,
      left: -12,
      right: -12,
      bottom: -12,
    }
  }
}));

const TopRankCard = styled(Card)(({ theme, rank }) => ({
  background: rank === 1 
    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    : rank === 2
    ? 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)'
    : 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)',
  color: 'white',
  borderRadius: 20,
  boxShadow: '0 12px 40px rgba(0, 0, 0, 0.15)',
  border: '3px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  transform: rank === 1 ? 'scale(1.1)' : 'scale(1)',
  transition: 'all 0.4s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%)',
    transform: 'translateX(-100%)',
    transition: 'transform 0.6s ease',
  },
  '&:hover': {
    transform: rank === 1 ? 'scale(1.15)' : 'scale(1.05)',
    boxShadow: '0 20px 50px rgba(0, 0, 0, 0.2)',
    '&::before': {
      transform: 'translateX(100%)',
    }
  },
  [theme.breakpoints.down('sm')]: {
    transform: rank === 1 ? 'scale(1.05)' : 'scale(1)',
    '&:hover': {
      transform: rank === 1 ? 'scale(1.08)' : 'scale(1.03)',
    }
  }
}));

const RegularRankCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  borderRadius: 16,
  boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  backdropFilter: 'blur(10px)',
  transition: 'all 0.3s ease',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '3px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  },
  '&:hover': {
    transform: 'translateY(-3px)',
    boxShadow: '0 12px 35px rgba(0, 0, 0, 0.15)',
  },
  [theme.breakpoints.down('sm')]: {
    '&:hover': {
      transform: 'translateY(-2px)',
    }
  }
}));

const RankBadge = styled(Box)(({ theme, rank }) => ({
  width: 36,
  height: 36,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 800,
  fontSize: '1.2rem',
  background: rank === 1 
    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    : rank === 2
    ? 'linear-gradient(135deg, #C0C0C0 0%, #A0A0A0 100%)'
    : rank === 3
    ? 'linear-gradient(135deg, #CD7F32 0%, #B8860B 100%)'
    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  boxShadow: '0 6px 20px rgba(0, 0, 0, 0.2)',
  border: '2px solid rgba(255, 255, 255, 0.3)',
  [theme.breakpoints.down('sm')]: {
    width: 32,
    height: 32,
    fontSize: '1.1rem',
  }
}));

const PointsDisplay = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
  fontWeight: 800,
  fontSize: '1.2rem',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.1rem',
  }
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 800,
  textAlign: 'center',
  textShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
  marginBottom: theme.spacing(3),
  fontSize: '1.8rem',
  letterSpacing: '1px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.4rem',
    marginBottom: theme.spacing(2),
  }
}));

function getInitials(name) {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getRandomEmoji() {
  const emojis = ['🎉', '🔥', '⭐', '💪', '🚀', '🎯', '🏆', '💎', '🌟', '✨'];
  return emojis[Math.floor(Math.random() * emojis.length)];
}

export default function Leaderboard({ refresh }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line
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

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress size={60} sx={{ color: 'white' }} />
      </Box>
    );
  }

  const top3Users = users.slice(0, 3);
  const otherUsers = users.slice(3);

  return (
    <Box>
      {/* Trophy Section - Centered */}
      <TrophyContainer>
        <Box textAlign="center">
          <TrophyIcon>
            <EmojiEventsIcon sx={{ fontSize: 70, color: 'white' }} />
          </TrophyIcon>
        </Box>
      </TrophyContainer>

      {/* Top 3 Users - Position 1 centered and bigger */}
      {top3Users.length > 0 && (
        <Box sx={{ mb: 4 }}>
          <SectionTitle>
            Top Performers
          </SectionTitle>
          
          {/* Custom Grid Layout for Top 3 */}
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'flex-end',
            gap: isMobile ? 1.5 : 2.5,
            px: isMobile ? 1 : 2
          }}>
            {/* Position 2 (Left) */}
            {top3Users[1] && (
              <Box sx={{ 
                flex: isMobile ? '1' : '0.8',
                maxWidth: isMobile ? '130px' : '150px'
              }}>
                <TopRankCard rank={2}>
                  <CardContent sx={{ 
                    p: isMobile ? 1.5 : 2, 
                    textAlign: 'center' 
                  }}>
                    <RankBadge rank={2} sx={{ mx: 'auto', mb: 1 }}>
                      2
                    </RankBadge>
                    <Avatar 
                      sx={{ 
                        width: isMobile ? 50 : 60, 
                        height: isMobile ? 50 : 60, 
                        mx: 'auto', 
                        mb: 1,
                        background: 'rgba(255, 255, 255, 0.2)',
                        fontSize: isMobile ? '1.2rem' : '1.4rem',
                        fontWeight: 700,
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {getInitials(top3Users[1].name)}
                    </Avatar>
                    <Typography 
                      variant={isMobile ? "caption" : "body2"}
                      sx={{ 
                        fontWeight: 700, 
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {top3Users[1].name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      ID: {top3Users[1]._id.slice(-6)}
                    </Typography>
                    <PointsDisplay sx={{ mt: 1, justifyContent: 'center' }}>
                      <LocalFireDepartmentIcon sx={{ 
                        color: 'white', 
                        fontSize: isMobile ? 16 : 18 
                      }} />
                      {top3Users[1].totalPoints}
                    </PointsDisplay>
                  </CardContent>
                </TopRankCard>
              </Box>
            )}

            {/* Position 1 (Center) - Bigger */}
            {top3Users[0] && (
              <Box sx={{ 
                flex: isMobile ? '1.3' : '1.5',
                maxWidth: isMobile ? '160px' : '200px'
              }}>
                <TopRankCard rank={1}>
                  <CardContent sx={{ 
                    p: isMobile ? 2 : 2.5, 
                    textAlign: 'center' 
                  }}>
                    <RankBadge rank={1} sx={{ mx: 'auto', mb: 1.5 }}>
                      1
                    </RankBadge>
                    <Avatar 
                      sx={{ 
                        width: isMobile ? 70 : 80, 
                        height: isMobile ? 70 : 80, 
                        mx: 'auto', 
                        mb: 1.5,
                        background: 'rgba(255, 255, 255, 0.2)',
                        fontSize: isMobile ? '1.6rem' : '1.8rem',
                        fontWeight: 700,
                        border: '3px solid rgba(255, 255, 255, 0.4)'
                      }}
                    >
                      {getInitials(top3Users[0].name)}
                    </Avatar>
                    <Typography 
                      variant={isMobile ? "body2" : "body1"}
                      sx={{ 
                        fontWeight: 800, 
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        fontSize: isMobile ? '1rem' : '1.1rem'
                      }}
                    >
                      {top3Users[0].name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      ID: {top3Users[0]._id.slice(-6)}
                    </Typography>
                    <PointsDisplay sx={{ mt: 1.5, justifyContent: 'center' }}>
                      <LocalFireDepartmentIcon sx={{ 
                        color: 'white', 
                        fontSize: isMobile ? 20 : 22 
                      }} />
                      {top3Users[0].totalPoints}
                    </PointsDisplay>
                  </CardContent>
                </TopRankCard>
              </Box>
            )}

            {/* Position 3 (Right) */}
            {top3Users[2] && (
              <Box sx={{ 
                flex: isMobile ? '1' : '0.8',
                maxWidth: isMobile ? '130px' : '150px'
              }}>
                <TopRankCard rank={3}>
                  <CardContent sx={{ 
                    p: isMobile ? 1.5 : 2, 
                    textAlign: 'center' 
                  }}>
                    <RankBadge rank={3} sx={{ mx: 'auto', mb: 1 }}>
                      3
                    </RankBadge>
                    <Avatar 
                      sx={{ 
                        width: isMobile ? 50 : 60, 
                        height: isMobile ? 50 : 60, 
                        mx: 'auto', 
                        mb: 1,
                        background: 'rgba(255, 255, 255, 0.2)',
                        fontSize: isMobile ? '1.2rem' : '1.4rem',
                        fontWeight: 700,
                        border: '2px solid rgba(255, 255, 255, 0.3)'
                      }}
                    >
                      {getInitials(top3Users[2].name)}
                    </Avatar>
                    <Typography 
                      variant={isMobile ? "caption" : "body2"}
                      sx={{ 
                        fontWeight: 700, 
                        mb: 0.5,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {top3Users[2].name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8 }}>
                      ID: {top3Users[2]._id.slice(-6)}
                    </Typography>
                    <PointsDisplay sx={{ mt: 1, justifyContent: 'center' }}>
                      <LocalFireDepartmentIcon sx={{ 
                        color: 'white', 
                        fontSize: isMobile ? 16 : 18 
                      }} />
                      {top3Users[2].totalPoints}
                    </PointsDisplay>
                  </CardContent>
                </TopRankCard>
              </Box>
            )}
          </Box>
        </Box>
      )}

      {/* Other Users */}
      {otherUsers.length > 0 && (
        <Box>
          <SectionTitle>
            Other Rankings
          </SectionTitle>
          
          <Box display="flex" flexDirection="column" gap={1.5}>
            {otherUsers.map((user, index) => (
              <RegularRankCard key={user._id}>
                <CardContent sx={{ p: isMobile ? 1.5 : 2 }}>
                  <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Box display="flex" alignItems="center" gap={isMobile ? 1.5 : 2}>
                      <RankBadge rank={index + 4}>
                        {index + 4}
                      </RankBadge>
                      <Avatar 
                        sx={{ 
                          width: isMobile ? 40 : 45, 
                          height: isMobile ? 40 : 45,
                          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          fontWeight: 700,
                          border: '2px solid rgba(255, 255, 255, 0.3)'
                        }}
                      >
                        {getInitials(user.name)}
                      </Avatar>
                      <Box>
                        <Typography 
                          variant={isMobile ? "caption" : "body2"}
                          sx={{ 
                            fontWeight: 700,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            maxWidth: isMobile ? 110 : 130,
                            fontSize: isMobile ? '0.9rem' : '1rem'
                          }}
                        >
                          {getRandomEmoji()} {user.name}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          ID: {user._id.slice(-6)}
                        </Typography>
                      </Box>
                    </Box>
                    <PointsDisplay>
                      {user.totalPoints}
                      <LocalFireDepartmentIcon sx={{ 
                        color: '#FF6B35', 
                        fontSize: isMobile ? 18 : 20 
                      }} />
                    </PointsDisplay>
                  </Box>
                </CardContent>
              </RegularRankCard>
            ))}
          </Box>
        </Box>
      )}

      {users.length === 0 && (
        <Box textAlign="center" sx={{ color: 'white', py: 4 }}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            No users found
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            Add some users to get started!
          </Typography>
        </Box>
      )}
    </Box>
  );
} 