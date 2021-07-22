let login = () => {
    // Generate state then redirect to authorize page
    let state = generateRandomString();
    localStorage.setItem('oauth-state', state);
    window.location = `https://student.sbhs.net.au/api/authorize?response_type=code&client_id=timetabl&redirect_uri=https%3A%2F%2Fsbhs-timetabl.netlify.app%2F&scope=all-ro&state=${state}`;
  };

let finalize_login = (code, state) => {

    // Stash the real state away then dispose of it
    let true_state = localStorage.getItem("oauth-state")
    localStorage.removeItem("oauth-state")

    // Check if state is valid
    if (state !== true_state) {
      return new Promise((resolve, reject) => reject("Invalid state!"))
    }
    // Request token
    return fetch('https://sbhs-timetabl.netlify.app/.netlify/functions/auth', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ code })
    })
      .then(response  => response.json())
      .then(data => {
        localStorage.setItem('access_token', data['access_token']);
        localStorage.setItem('refresh_token', data['refresh_token']);
      })
  }

let logout = () => {
    return new Promise( (resolve, reject) => {
      try {
        // Simulate log out
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        resolve()
      } catch {
        reject()
      }
    })
  }

let apiRequest = (api) =>
    fetch('https://sbhs-timetabl.netlify.app/.netlify/functions/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ api, token: localStorage.getItem("access_token") })
    })
      .then(response => response.json())

let generateRandomString = () => {
    let array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
};

export {login, logout, apiRequest, finalize_login}