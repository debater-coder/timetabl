import { useEffect, useState } from 'react';
import contextualise from '../contextualise/src/contextualise';
import config from '../config';
import React from 'react';
import { useBanner } from './useBanner';
import { Alert, AlertIcon, AlertTitle, Button } from '@chakra-ui/react';

let useAuth = (config, store = localStorage) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shouldLogin, setShouldLogin] = useState(false);
  const {banner, setBanner} = useBanner()


  /////////////////////////////////////////////////////////////////////
  // PKCE HELPER FUNCTIONS
  ////////////////////////////////////////////////////////////////////

  // Generate a secure random string using the browser crypto functions
  const generateRandomString = () => {
    let array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ('0' + dec.toString(16)).substr(-2)).join(
      '',
    );
  };

  // Calculate the SHA256 hash of the input text.
  // Returns a promise that resolves to an ArrayBuffer
  const sha256 = (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest('SHA-256', data);
  };

  // Base64-urlencodes the input string
  const base64urlencode = (str) => {
    // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
    // btoa accepts chars only within ascii 0-255 and base64 encodes them.
    // Then convert the base64 encoded to base64url encoded
    //   (replace + with -, replace / with _, trim trailing =)
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  };

  // Return the base64-urlencoded sha256 hash for the PKCE challenge
  const pkceChallengeFromVerifier = async (v) => {
    let hashed = await sha256(v);
    return base64urlencode(hashed);
  };

  /////////////////////////////////////////////////////////////////////
  // PUBLIC FUNCTIONS
  /////////////////////////////////////////////////////////////////////

  // Login function
  const login = async () => {
    // Create and store a random "state" value
    let state = generateRandomString();
    store.setItem('pkce_state', state);

    // Create and store a new PKCE code_verifier (the plaintext random secret)
    let code_verifier = generateRandomString();
    store.setItem('pkce_code_verifier', code_verifier);

    // Hash and base64-urlencode the secret to use as the challenge
    let code_challenge = await pkceChallengeFromVerifier(code_verifier);

    // Build the authorization URL
    // Redirect to the authorization server
    window.location =
      config.authorization_endpoint +
      '?response_type=code' +
      '&client_id=' +
      encodeURIComponent(config.client_id) +
      '&state=' +
      encodeURIComponent(state) +
      '&scope=' +
      encodeURIComponent(config.scopes) +
      '&redirect_uri=' +
      encodeURIComponent(config.redirect_uri) +
      '&code_challenge=' +
      encodeURIComponent(code_challenge) +
      '&code_challenge_method=S256';
  };

  // Logout Function
  const logout = () => {
    setLoggedIn(false);
    store.removeItem('loggedIn');
  };

  /////////////////////////////////////////////////////////////////
  // OAUTH REDIRECT HANDLING
  /////////////////////////////////////////////////////////////////
  useEffect(() => {

    let query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries(),
    );
    window.history.replaceState({}, null, '/');

    if (query.error) {
      throw new Error(query.error + '\n\n' + query.error_description);
    }

    // If the server returned an authorization code, attempt to exchange it for an access token
    if (query.code) {
      // Verify state matches what we set at the beginning
      if (store.getItem('pkce_state') !== query.state) {
        console.error('Invalid state');
      } else {
          // Exchange code for access token
          fetch("https://student.sbhs.net.au/api/token", {
            method: "POST",
            body: new URLSearchParams({
              grant_type: 'authorization_code',
              code: query.code,
              client_id: config.client_id,
              redirect_uri: config.redirect_uri,
              code_verifier: store.getItem("pkce_code_verifier"),
            }),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
          }).then(res => {
            if (!res.ok) {
              throw new Error(`Error ${res.status}`)
            }
            return res.json()
          }).then(data => {
            store.setItem("access_token", data["access_token"])
            store.setItem("refresh_token", data["refresh_token"])
            store.setItem("loggedIn", "true")
            setLoggedIn(true)
            setIsLoading(false)
            setShouldLogin(false)
          })
      }
      // Clean these up since we don't need them anymore
      store.removeItem('pkce_state');
      store.removeItem('pkce_code_verifier');
    } else if (store.getItem('loggedIn')) {
      setLoggedIn(true);
      setIsLoading(false);
    } else {
      setLoggedIn(false);
      setShouldLogin(false)
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (shouldLogin) {
      setBanner(
        <Alert status={"warning"} rounded={5} variant={"left-accent"}><AlertIcon /><AlertTitle>Log in to see the latest information.</AlertTitle><Button onClick={login}>Log in</Button></Alert>
      )
    }
  }, [shouldLogin])

  return { loggedIn, login, isLoading, logout, shouldLogIn: shouldLogin, setShouldLogin };
};

let [useAuthGlobal, AuthProvider] = contextualise(useAuth, [config], undefined);

export { AuthProvider, useAuthGlobal as useAuth };