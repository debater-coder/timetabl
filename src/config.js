export default {
  client_id: import.meta.env.VITE_CLIENT_ID,
  redirect_uri: import.meta.url,
  authorization_endpoint: "https://student.sbhs.net.au/api/authorize",
  auth_endpoint: import.meta.env.VITE_AUTH_ENDPOINT,
  api_endpoint: import.meta.env.API_ENDPOINT,
  scopes: import.meta.env.VITE_SCOPES,
};
