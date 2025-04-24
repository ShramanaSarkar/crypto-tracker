import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import CryptoTable from './components/CryptoTable';
import { Container, Typography, CssBaseline } from '@mui/material';

function App() {
  return (
    <Provider store={store}>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Real-Time Crypto Price Tracker
        </Typography>
        <CryptoTable />
      </Container>
    </Provider>
  );
}

export default App;