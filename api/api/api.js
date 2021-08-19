const { ApolloServer } = require('apollo-server-lambda')
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const fetch_api = (endpoint, parameters={}, event, authenticated=false) =>
  fetch("https://student.sbhs.net.au/api/" + endpoint + "?" + new URLSearchParams(parameters))
    .then(res => res.json())

const resolvers = {
  Query: {
    info: () => "This is a GraphQL wrapper for the student portal API",

    today: () => fetch_api("calendar/days.json")
      .then(data => data[Object.keys(data)[0]]),

    day: (parent, args) => fetch_api("calendar/days.json", {"from": args.date})
      .then(data => data[Object.keys(data)[0]]),

    terms: () => fetch_api("calendar/terms.json")
      .then(data => Object.values(data["terms"])),

    publicHolidays: () => fetch_api("calendar/terms.json")
      .then(data => Object.entries(data['publicHolidays'])),

    developmentDays: () => fetch_api("calendar/terms.json")
      .then(data => Object.entries(data["developmentDays"])),

    bellsToday: () => fetch_api("timetable/bells.json"),

    bells: (parent, args) => fetch_api("timetable/bells.json", { date: args.date }),
  },
  DayOff: {
    date: parent => parent[0],
    name: parent => parent[1]
  }
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(
    path.join(__dirname, 'schema.graphql'),
    'utf8'
  ),
  resolvers,
})

const runHandler = (event, context, handler) =>
  new Promise((resolve, reject) => {
    const callback = (error, body) => (error ? reject(error) : resolve(body));
    handler(event, context, callback);
});

const handler = server.createHandler()

module.exports.handler = async (event, context) => {
  return await runHandler(event, context, handler)
}
