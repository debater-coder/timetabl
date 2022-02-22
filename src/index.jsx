import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { Compose, withProps } from './contextualise/src/contextualise';
import { DataProvider } from './hooks/useDataManager';
import UrqlProvider from './initGraphQL';
import { BannerProvider } from './hooks/useBanner';

ReactDOM.render(
  <Compose components={[
    React.StrictMode,
    withProps(ChakraProvider, { theme }),
    UrqlProvider,
    BannerProvider,
    AuthProvider,
    DataProvider,
    BrowserRouter,
  ]}>
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
  navigator.serviceWorker.register("/sw.js", {scope: '/'})
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}