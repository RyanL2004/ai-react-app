// okta-config.js

export default {
    clientId: 'gR2cVkrFCFiSLs6RxO5AuGiNhSBUYGZl', // Your Okta Client ID
    issuer: 'https://dev-5afl7tada4jnztx8.uk.auth0.com/oauth2/default', // Your Okta Authorization Server URL
    redirectUri: window.location.origin + '/login/callback', // Your Okta redirect URI
    scopes: ['openid', 'email', 'profile'], // Adjust scopes as needed
  };
  