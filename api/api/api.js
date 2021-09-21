const { ApolloServer, AuthenticationError } = require('apollo-server-lambda');
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const cookie = require('cookie');

const fetch_api = (endpoint, parameters = {}, event, authenticated = false) => {
  if (!authenticated) {
    return fetch('https://student.sbhs.net.au/api/' + endpoint + '?' + new URLSearchParams(parameters)).then(res => res.json());
  } else {

    if (!event.headers.cookie) {
      throw new AuthenticationError('The cookies are missing');
    }
    let cookies;

    try {
      cookies = cookie.parse(event.headers.cookie);
    } catch {
      throw new AuthenticationError('The cookies are invalid');
    }

    if (cookies['access_token']) {
      return fetch('https://student.sbhs.net.au/api/' + endpoint + '?' + new URLSearchParams(parameters) +
        (authenticated ? '&access_token=' + cookie.parse(event.headers.cookie)['access_token'] : ''),
      )
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              throw new AuthenticationError('Refresh the access token.');
            }
            throw new Error(`${(res.status)}`);
          }
          return res;
        })
        .then(res => res.json());
    } else if (cookies['refresh_token'] && cookies['code_verifier']) {
      throw new AuthenticationError('Refresh the access token.');
    } else {
      throw new AuthenticationError('No access token or refresh token');
    }
  }
};

// noinspection EqualityComparisonWithCoercionJS
const resolvers = {
  Query: {
    info: () => 'This is a GraphQL wrapper for the student portal API',

    today: () => fetch_api('calendar/days.json')
      .then(data => data[Object.keys(data)[0]]),

    day: (parent, args) => fetch_api('calendar/days.json', { 'from': args.date })
      .then(data => data[Object.keys(data)[0]]),

    terms: () => fetch_api('calendar/terms.json')
      .then(data => Object.values(data['terms'])),

    publicHolidays: () => fetch_api('calendar/terms.json')
      .then(data => Object.entries(data['publicHolidays'])),

    developmentDays: () => fetch_api('calendar/terms.json')
      .then(data => Object.entries(data['developmentDays'])),

    bellsToday: () => fetch_api('timetable/bells.json'),

    bells: (parent, args) => fetch_api('timetable/bells.json', { date: args.date }),

    user: (parent, args, { event }) => fetch_api('details/userinfo.json', {}, event, true),

    loggedIn: (parent, args, { event }) => {
      try {
        let cookies = cookie.parse(event.headers.cookie);
        return !!(cookies['access_token'] || cookies['refresh_token'] && cookies['code_verifier']); // !! is the simplest way to cast to a boolean in js
      } catch {
        return false;
      }
    },
  },
  DayOff: {
    date: parent => parent[0],
    name: parent => parent[1],
  },

  User: {
    participation: (parent, args, { event }) => fetch_api('details/participation.json', {}, event, true),
    totalPoints: (parent, args, { event }) => fetch_api('details/participation.json', {}, event, true).then(
      data => data.pop()['points'],
    ),
  },
  Day: {
    term: ({ term: value }) => value != 0 && value != '' ? value : null, // Double equals used to not compare type
    week: ({ week: value }) => value != 0 && value != '' ? value : null,
    weekType: ({ weekType: value }) => value != 0 && value != '' ? value : null,
    dayNumber: ({ dayNumber: value }) => value != 0 && value != '' ? value : null,
  },
};

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8',
  ),
  resolvers,
  context: event => event,
});

const runHandler = (event, context, handler) =>
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));
    handler(event, context, callback);
  });

const handler = server.createHandler();

module.exports.handler = async (event, context) => {
  process.env.NODE_ENV = 'development';
  return await runHandler(event, context, handler);
};
