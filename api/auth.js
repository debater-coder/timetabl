const fetch = require('node-fetch');
const cookie = require('cookie')

const config = {
  client_id: 'timetabl',
  redirect_uri: 'https://sbhs-timetabl.netlify.app/',
  authorization_endpoint: 'https://student.sbhs.net.au/api/authorize',
  token_endpoint: 'https://student.sbhs.net.au/api/token',
  api_endpoint: 'https://student.sbhs.net.au/api',
  scopes: 'all-ro',
};

const post = async (event) => {
  let res = await fetch(config.token_endpoint, {
    method: "POST",
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code: JSON.parse(event.body)["code"],
      client_id: config.client_id,
      redirect_uri: config.redirect_uri,
      code_verifier: JSON.parse(event.body)["verifier"],
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })

  if (!res.ok) {
    return { statusCode: res.status, body: res.statusText }
  }

  let json = await res.json()

  return {
    statusCode: 200,
    multiValueHeaders: {
      "Set-Cookie": [
        cookie.serialize("access_token", json["access_token"], {
          httpOnly: true,
          path: "/",
          sameSite: 'lax',
          secure: true,
          maxAge: 60*60
        }),
        cookie.serialize("code_verifier", JSON.parse(event.body)["verifier"], {
          httpOnly: true,
          path: "/",
          sameSite: 'lax',
          secure: true,
          maxAge: 90*24*60*60
        }),
        cookie.serialize("refresh_token", json["refresh_token"], {
          httpOnly: true,
          path: "/",
          sameSite: 'lax',
          secure: true,
          maxAge: 90*24*60*60
        })
      ]
    }
  }
}

const logout = async () => ({
  statusCode: 200,
  multiValueHeaders: {
    "Set-Cookie": [
      cookie.serialize("access_token", "", {
        httpOnly: true,
        path: "/",
        sameSite: 'lax',
        secure: true,
        maxAge: 0
      }),
      cookie.serialize("code_verifier", "", {
        httpOnly: true,
        path: "/",
        sameSite: 'lax',
        secure: true,
        maxAge: 0
      }),
      cookie.serialize("refresh_token", "", {
        httpOnly: true,
        path: "/",
        sameSite: 'lax',
        secure: true,
        maxAge: 0
      })
    ]
  }
})

exports.handler = async (event) => {
  try {

    if (event["httpMethod"] === "POST") {
      return await post(event)
    } else if (event["httpMethod"] === "DELETE") {
      return await logout()
    }

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: error.message })
    }
  }
}