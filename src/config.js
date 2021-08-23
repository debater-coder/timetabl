export default {
  client_id: 'timetabldev',
  redirect_uri: 'http://localhost:8888/',
  authorization_endpoint: 'https://student.sbhs.net.au/api/authorize',
  auth_endpoint: 'http://localhost:8888/.netlify/functions/auth',
  scopes: 'all-ro',
};
