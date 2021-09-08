export default {
  client_id: 'timetabldev',
  redirect_uri: 'http://localhost:8888/',
  authorization_endpoint: 'http://localhost:8888/api/authorize',
  auth_endpoint: 'http://localhost:8888/.netlify/functions/auth',
  api_endpoint: 'http://localhost:8888/.netlify/functions/api',
  scopes: 'all-ro',
};
