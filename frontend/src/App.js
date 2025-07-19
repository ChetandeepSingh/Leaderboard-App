import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  AppBar, 
  Toolbar, 
  IconButton, 
  useTheme, 
  useMediaQuery,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import RefreshIcon from '@mui/icons-material/Refresh';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import UserSelector from './components/UserSelector';
import ClaimButton from './components/ClaimButton';
import Leaderboard from './components/Leaderboard';

// Styled components for the purple gradient background
const GradientBackground = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
    pointerEvents: 'none',
  }
}));

const ContentWrapper = styled(Box)(({ theme }) => ({
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    paddingTop: theme.spacing(0.5),
    paddingBottom: theme.spacing(1),
  }
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.15)',
  backdropFilter: 'blur(20px)',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  color: 'white',
  fontWeight: 700,
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  letterSpacing: '0.5px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.3rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.8rem',
  }
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: 'white',
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.2)',
    transform: 'scale(1.1)',
    boxShadow: '0 8px 25px rgba(255, 255, 255, 0.2)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '&:hover': {
      transform: 'scale(1.05)',
    }
  },
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(1.5),
  }
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: 20,
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
  }
}));

function App() {
  const [selectedUser, setSelectedUser] = useState('');
  const [refresh, setRefresh] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleRefresh = () => setRefresh(r => r + 1);

  const handleHelpOpen = () => setHelpOpen(true);
  const handleHelpClose = () => setHelpOpen(false);

  const helpContent = [
    {
      icon: <PersonAddIcon />,
      title: "Add Users",
      description: "Create new users by entering their name and clicking 'Add User'"
    },
    {
      icon: <TrendingUpIcon />,
      title: "Claim Points",
      description: "Select a user and click 'Claim Points' to earn random points (1-10)"
    },
    {
      icon: <EmojiEventsIcon />,
      title: "Leaderboard",
      description: "Watch users climb the rankings as they earn more points"
    },
    {
      icon: <LocalFireDepartmentIcon />,
      title: "Points System",
      description: "Points are awarded randomly. The more you claim, the higher you rank!"
    }
  ];

  return (
    <GradientBackground>
      <StyledAppBar position="static" elevation={0}>
        <Toolbar sx={{ 
          justifyContent: 'space-between', 
          minHeight: isMobile ? '64px' : '72px',
          px: isMobile ? 2 : 3
        }}>
          <Box display="flex" alignItems="center" gap={2}>
            <StyledTitle>
              🏆 Leaderboard
            </StyledTitle>
            <Chip 
              label="Live" 
              size="small"
              sx={{
                background: 'linear-gradient(45deg, #4CAF50 30%, #45a049 90%)',
                color: 'white',
                fontWeight: 600,
                fontSize: '0.7rem',
                height: 20,
                '& .MuiChip-label': {
                  px: 1
                }
              }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <StyledIconButton onClick={handleRefresh}>
              <RefreshIcon sx={{ fontSize: isMobile ? 20 : 22 }} />
            </StyledIconButton>
            <StyledIconButton onClick={handleHelpOpen}>
              <HelpOutlineIcon sx={{ fontSize: isMobile ? 20 : 22 }} />
            </StyledIconButton>
          </Box>
        </Toolbar>
      </StyledAppBar>

      <ContentWrapper>
        <Container 
          maxWidth="md" 
          sx={{ 
            px: isMobile ? 2 : 3,
            py: isMobile ? 1 : 2
          }}
        >
          {/* User Controls Section */}
          <StyledPaper 
            elevation={0} 
            sx={{ 
              p: isMobile ? 2.5 : 3.5, 
              mb: isMobile ? 2.5 : 3.5, 
              position: 'relative'
            }}
          >
            <Typography 
              variant={isMobile ? "h6" : "h5"} 
              align="center" 
              gutterBottom 
              fontWeight={800} 
              color="primary"
              sx={{ 
                mb: isMobile ? 2.5 : 3,
                background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontSize: isMobile ? '1.3rem' : '1.8rem'
              }}
            >
              Claim Your Points
            </Typography>
            <Box display="flex" flexDirection="column" gap={isMobile ? 2 : 2.5} alignItems="center">
              <UserSelector 
                selectedUser={selectedUser} 
                setSelectedUser={setSelectedUser} 
                onUserAdded={handleRefresh}
                refresh={refresh}
              />
              <ClaimButton 
                selectedUser={selectedUser} 
                onClaimed={handleRefresh} 
              />
            </Box>
          </StyledPaper>

          {/* Leaderboard Section */}
          <Leaderboard refresh={refresh} />
        </Container>
      </ContentWrapper>

      {/* Help Dialog */}
      <Dialog 
        open={helpOpen} 
        onClose={handleHelpClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
          }
        }}
      >
        <DialogTitle sx={{ 
          textAlign: 'center', 
          fontWeight: 800,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          borderRadius: '12px 12px 0 0',
          fontSize: isMobile ? '1.2rem' : '1.4rem'
        }}>
          How to Use Leaderboard
        </DialogTitle>
        <DialogContent sx={{ pt: 3 }}>
          <List>
            {helpContent.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem sx={{ px: 0 }}>
                  <ListItemIcon sx={{ minWidth: 50 }}>
                    <Box sx={{
                      width: 45,
                      height: 45,
                      borderRadius: '50%',
                      background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
                    }}>
                      {React.cloneElement(item.icon, { 
                        sx: { fontSize: isMobile ? 22 : 24 } 
                      })}
                    </Box>
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography variant="h6" fontWeight={700} color="primary" sx={{ mb: 0.5 }}>
                        {item.title}
                      </Typography>
                    }
                    secondary={
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                        {item.description}
                      </Typography>
                    }
                  />
                </ListItem>
                {index < helpContent.length - 1 && <Divider sx={{ my: 2 }} />}
              </React.Fragment>
            ))}
          </List>
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button 
            onClick={handleHelpClose} 
            variant="contained"
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: 3,
              textTransform: 'none',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 8px 25px rgba(102, 126, 234, 0.3)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a6fd8 0%, #6a4190 100%)',
                boxShadow: '0 12px 35px rgba(102, 126, 234, 0.4)',
                transform: 'translateY(-2px)',
              }
            }}
          >
            Got it!
          </Button>
        </DialogActions>
      </Dialog>
    </GradientBackground>
  );
}

export default App;
