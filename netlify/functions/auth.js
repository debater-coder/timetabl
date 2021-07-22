const fetch = require('node-fetch');

exports.handler = async function(event) {
  let body = JSON.parse(event.body);
  let response = await fetch('https://student.sbhs.net.au/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    },
    body: body["grantType"] === "true" ? `grant_type=refresh_token&refresh_token=${body.code}&client_id=timetabl&client_secret=${process.env.SECRET}`:`grant_type=authorization_code&code=${body.code}&redirect_uri=https%3A%2F%2Fsbhs-timetabl.netlify.app%2F&client_id=timetabl&client_secret=${process.env.SECRET}`,
  });
  if (!response.ok) {
    // NOT res.status >= 200 && res.status < 300
    return { statusCode: response.status, body: response.body };
  }
  let result = await response.json();

  console.log(result);
  return {
    statusCode: 200,
    body: JSON.stringify(result),
  };
};