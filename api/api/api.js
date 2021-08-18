const { ApolloServer } = require('apollo-server-lambda')
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');

const resolvers = {
  Query: {
    info: () => "This is a GraphQL wrapper for the student portal API",

    today: () => fetch("https://student.sbhs.net.au/api/calendar/days.json")
      .then(res => res.json())
      .then(data => data[Object.keys(data)[0]]),

    day: (parent, args) => fetch("https://student.sbhs.net.au/api/calendar/days.json?from=" + args.date)
      .then(res => res.json())
      .then(data => data[Object.keys(data)[0]]),

    terms: () => fetch("https://student.sbhs.net.au/api/calendar/terms.json")
      .then(res => res.json())
      .then(data => Object.values(data["terms"])),

    publicHolidays: () => fetch("https://student.sbhs.net.au/api/calendar/terms.json")
      .then(res => res.json())
      .then(data => Object.entries(data['publicHolidays'])),

    developmentDays: () => fetch("https://student.sbhs.net.au/api/calendar/terms.json")
      .then(res => res.json())
      .then(data => Object.entries(data["developmentDays"])),

    bellsToday: () => fetch("https://student.sbhs.net.au/api/timetable/bells.json")
      .then(res => res.json()),

    bells: (parent, args) => fetch("https://student.sbhs.net.au/api/timetable/bells.json?date=" + args.date)
      .then(res => res.json()),
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
