import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import './index.css';
import { ChakraProvider } from "@chakra-ui/react"
import theme from "./theme"

ReactDOM.render(
  <React.StrictMode>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
