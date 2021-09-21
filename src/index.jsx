import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { createClient, Provider } from 'urql';
import config from './config';
import { AuthProvider } from './components/AuthContext';
import { BrowserRouter } from 'react-router-dom';

const client = createClient({
  url: config.api_endpoint,
  fetchOptions: () => ({
    credentials: 'same-origin',
  }),
  requestPolicy: 'cache-and-network',
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Provider value={client}>
        <AuthProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AuthProvider>
      </Provider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
