import { createClient, Provider, defaultExchanges } from 'urql';
import { devtoolsExchange } from '@urql/devtools';

import config from './config';
import { withProps } from './contextualise/src/contextualise';

const client = createClient({
  url: config.api_endpoint,
  fetchOptions: () => ({
    credentials: 'same-origin',
  }),
  exchanges: [devtoolsExchange, ...defaultExchanges]
});

export default withProps(Provider, {value: client})