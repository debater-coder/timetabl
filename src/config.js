export default {
  client_id: 'timetabl',
  redirect_uri: 'https://sbhs-timetabl.netlify.app/',
  authorization_endpoint: 'https://student.sbhs.net.au/api/authorize',
  auth_endpoint: 'https://sbhs-timetabl.netlify.app/.netlify/functions/auth',
  api_endpoint: 'https://sbhs-timetabl.netlify.app/.netlify/functions/api',
  scopes: 'all-ro',
};
