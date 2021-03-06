import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import { AuthProvider } from './hooks/useAuth';
import { BrowserRouter } from 'react-router-dom';
import { Compose, withProps } from './contextualise/src/contextualise';
import { DataProvider } from './hooks/useDataManager';
import { BannerProvider } from './hooks/useBanner';
import { QueryClientProvider } from 'react-query';
import queryClient from './initQuery';
import { ReactQueryDevtools } from 'react-query/devtools';


ReactDOM.render(
  <Compose components={[
    React.StrictMode,
    withProps(ChakraProvider, { theme }),
    withProps(QueryClientProvider, { client: queryClient }),
    BannerProvider,
    AuthProvider,
    DataProvider,
    BrowserRouter,
  ]}>
    <App />
    <ReactQueryDevtools initialIsOpen={false} />
  </Compose>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}

console.log(
  '%cWelcome to Timetabl, feel free to lurk around the console, or view the source code at: https://github.com/debater-coder/timetabl',
  'background-color: #FBAB7E;' +
  'background-image: linear-gradient(62deg, #FBAB7E 0%, #F7CE68 100%);' +
  'border-radius: 32px;' +
  'padding: 16px;',
);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js', { scope: '/' })
    .then((reg) => {
      // registration worked
      console.log('Registration succeeded. Scope is ' + reg.scope);
    }).catch((error) => {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}