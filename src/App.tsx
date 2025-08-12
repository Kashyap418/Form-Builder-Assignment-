import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Container, Box } from '@mui/material';
import { RootState } from './store/store';
import { loadSavedForms } from './store/formSlice';
import CreateForm from './pages/CreateForm';
import PreviewForm from './pages/PreviewForm';
import MyForms from './pages/MyForms';
import Navigation from './components/Navigation';

function App() {
  const dispatch = useDispatch();
  const { savedForms } = useSelector((state: RootState) => state.form);

  useEffect(() => {
    dispatch(loadSavedForms());
  }, [dispatch]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Form Builder
          </Typography>
          <Navigation />
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/create" replace />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/preview" element={<PreviewForm />} />
          <Route path="/myforms" element={<MyForms />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;
