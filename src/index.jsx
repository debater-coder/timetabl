import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { Compose, withProps } from './contextualise/src/contextualise';

ReactDOM.render(
  <Compose components={[React.StrictMode, withProps(ChakraProvider, { theme }), AuthProvider, BrowserRouter]}>
    <App />
  </Compose>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    navigator.serviceWorker.register('/sw.js').then(function(registration) {
      // Registration was successful
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    }, function(err) {
      // registration failed :(
      console.log('ServiceWorker registration failed: ', err);
    });
  });
}
