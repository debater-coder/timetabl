class User {
  constructor(setLogged_in) {
    this.setLogged_in = setLogged_in
    // Stash away the query object then dispose of it
    this.query = Object.fromEntries(new URLSearchParams(window.location.search).entries());
    window.history.replaceState({}, null, '/');

    // If we just logged in, claim an access token
    if ('code' in this.query && 'state' in this.query) {
      this._finalize_login(this.query.code, this.query.state)
    }
    // if we have an access token already then we're already logged in
    else if (localStorage.getItem("access_token") !== null && localStorage.getItem("refresh_token") !== null) {
      this.setLogged_in(true)
    }
  }

  login = () => {
    // Generate state then redirect to authorize page
    let state = this.generateRandomString();
    localStorage.setItem('oauth-state', state);
    window.location = `https://student.sbhs.net.au/api/authorize?response_type=code&client_id=timetabl&redirect_uri=https%3A%2F%2Fsbhs-timetabl.netlify.app%2F&scope=all-ro&state=${state}`;
  };

  _finalize_login = (code, state) => {

    // Stash the real state away then dispose of it
    let true_state = localStorage.getItem("oauth-state")
    localStorage.removeItem("oauth-state")

    // Check if state is valid
    if (state !== true_state) {
      console.error("Invalid state!")
      return
    }
    // Request token
    fetch('https://sbhs-timetabl.netlify.app/.netlify/functions/auth', {
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
        this.setLogged_in(true)
      })
  }

  logout = () => {
    // Simulate log out
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")
    this.setLogged_in(false)
  }

  asyncApiRequest = (api) =>
    fetch('https://sbhs-timetabl.netlify.app/.netlify/functions/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({ api, token: localStorage.getItem("access_token") })
    })
      .then(response => response.json())

  apiRequest = async (api) => await this.asyncApiRequest(api)

  generateRandomString = () => {
    let array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  };
}

export default User