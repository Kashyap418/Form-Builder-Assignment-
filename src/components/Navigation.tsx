import React from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Button, Box } from '@mui/material';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <Box sx={{ display: 'flex', gap: 1 }}>
      <Button
        component={RouterLink}
        to="/create"
        color="inherit"
        variant={isActive('/create') ? 'contained' : 'text'}
        sx={{
          backgroundColor: isActive('/create') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Create Form
      </Button>
      <Button
        component={RouterLink}
        to="/preview"
        color="inherit"
        variant={isActive('/preview') ? 'contained' : 'text'}
        sx={{
          backgroundColor: isActive('/preview') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        Preview
      </Button>
      <Button
        component={RouterLink}
        to="/myforms"
        color="inherit"
        variant={isActive('/myforms') ? 'contained' : 'text'}
        sx={{
          backgroundColor: isActive('/myforms') ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
        }}
      >
        My Forms
      </Button>
    </Box>
  );
};

export default Navigation;
