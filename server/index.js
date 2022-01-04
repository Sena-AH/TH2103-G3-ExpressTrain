// server/index.js

// Read settings
const settings = require('../settings.json');

// Database initialization
const DbInitializer = require('./database/DbInitializer');
const dbInitializer = new DbInitializer(settings.dbName);
dbInitializer.Init();
// use "const db = dbInitializer.GetDatabase();" to get the database.

// NOTE: No ACL 
// (access - control / user credentials) yet!

// require path (helper for file paths)
const path = require('path');

// require/import express
const express = require('express');

// create a new web server
const webServer = express();

// Swift
const SwishClient = require('./swish/SwishClient');
const swishClient = new SwishClient('server/swish/ssl');

// tell the web server to serve
// all files (static content)
// that are inside the folder "frontend"
webServer.use(express.static('client'));

// make it possible to read req bodies
// (needed for post and put reqs)
webServer.use(express.json({ limit: '100MB' }));

// start the webserver and tell it to listen
// on a specific port (in this case port 3000)
webServer.listen(settings.port,
  () => console.log(
    'Listening on http://localhost:' + settings.port
  ));

// require the sqlite driver better-sqlite3
// const driver = require('better-sqlite3');

// connect to a database (call the connection db)
// const db = driver(path.join(require('path').resolve(__dirname, '..'),
//   'database', settings.dbName));
const db = dbInitializer.GetDatabase();

// get the table and view names from the db 
// so we can restrict to routes matching existing 
// tables and views
let r = db.prepare(`
  SELECT name, type
  FROM sqlite_schema
  WHERE type IN ('table', 'view')
        AND name NOT LIKE 'sqlite_%';
`).all();
let tablesInDb = r.filter(x => x.type === 'table')
  .map(x => x.name).sort();
let viewsInDb = r.filter(x => x.type === 'view')
  .map(x => x.name).sort();
let tablesAndViewsInDb = [...tablesInDb, ...viewsInDb];

// helper function to run query, catch errors & return result
function runQuery(req, res, query, params = {}, one = false) {
  let result, table = req.params.table;
  let isSelect = query.trim().toUpperCase().indexOf('SELECT') === 0;
  // check if table or view name exists in db
  if (isSelect && !tablesAndViewsInDb.includes(table)) {
    result = { error: 'No such table or view.' }
  }
  if (!isSelect && !tablesInDb.includes(table)) {
    result = { error: 'No such table.' }
  }
  // run query (and catch any errors)
  try {
    result = result || db.prepare(query)[isSelect ? 'all' : 'run'](params);
  } catch (e) { result = { error: e + '' }; }
  // unwrap object from array if one = true
  one && result instanceof Array && (result = result[0]);
  result === undefined && (result = { error: 'No such post' });
  // status (404 = missing, 500 = error or 200 = ok)
  let status =
    (result.error + '').indexOf('No such') === 0
      || !result ? 404 : result.error ? 500 : 200;
  res.status(status).json(result || null);
}

// REST ROUTE: db-info
webServer.get('/api/db-info', (req, res) =>
  res.json({ tablesInDb, viewsInDb })
);

// REST ROUTE: GET swish/paymentresult/:id
webServer.get('/api/swish/paymentresult/:id', async (req, res) => {
  await swishClient.getPaymentResultAsync(res, req.params.id);
});

// REST ROUTE: PATCH swish/paymentresult/:id
webServer.patch('/api/swish/paymentresult/:id', async (req, res) => {
  await swishClient.cancelPaymentResultAsync(res, req.params.id);
});

// REST ROUTE: PUT swish/paymentrequest
webServer.put('/api/swish/paymentrequest/:id', async (req, res) => {
  await swishClient.createPaymentRequestV2Async(res, req.params.id, req.body);
});

// REST ROUTE: POST swish/paymentrequest
webServer.post('/api/swish/paymentrequest', async (req, res) => {
  await swishClient.createPaymentRequestV1Async(res, req.body);
});

// REST ROUTE: GET many/all
let getMany = (req, res) => {
  // example of query params: ?order=name,-age&limit=10&offset=20
  // translates to ORDER BY name, age DESC LIMIT 10 OFFSET 20
  let orderBy = !req.query.order ? '' : 'ORDER BY ' +
    (req.query.order || '').split(',')
      .map(x => x[0] === '-' ? x.slice(1) + ' DESC' : x)
      .join(', ');
  let limit = !req.query.limit ? '' :
    'LIMIT ' + req.query.limit;
  let offset = !req.query.limit || !req.query.offset ? '' :
    'OFFSET ' + req.query.offset;
  // run query and return result  
  runQuery(req, res, `
    SELECT *
    FROM ${req.params.table}
    ${req.body.where ? 'WHERE ' + req.body.where : ''}
    ${orderBy} ${limit} ${offset}
  `);
};
webServer.get('/api/:table', getMany);
// Special route that allows full WHERE clauses
// (might be dangerous from a security perspective)
settings.allowWherePosts
  && webServer.post('/api/where/:table/', getMany);

// REST ROUTE: GET by BookingCode
webServer.get('/api/Booking/BookingCode/:bookingCode', (req, res) => {
  req.params.table = 'Booking';
  runQuery(req, res, `
  SELECT *
  FROM ${ req.params.table }
  WHERE BookingCode = :bookingCode
  `, { bookingCode: req.params.bookingCode }, true);
});

// REST ROUTE: Get Schedule stages by bookingId
webServer.get('/api/Schedulestage/Booking/:id', (req, res) => {
  req.params.table = 'ScheduleStage';
  runQuery(req, res, `
  SELECT *
  FROM ${ req.params.table }
  WHERE BookingId = :id
  `, { id: req.params.id });
});

// REST ROUTE: Get Schedule stages by ScheduleId
webServer.get('/api/Schedulestage/ScheduleId/:id', (req, res) => {
  req.params.table = 'ScheduleStage';
  runQuery(req, res, `
  SELECT *
  FROM ${ req.params.table }
  WHERE ScheduleId = :id
  `, { id: req.params.id });
});

// REST ROUTE: Get one, ScheduleStage table
webServer.get('/api/Schedulestage/:id/:seat', (req, res) => {
  req.params.table = 'ScheduleStage';
  runQuery(req, res, `
  SELECT *
  FROM ${ req.params.table }
  WHERE ScheduleId = :id AND SeatNumber = :seat
  `, { id: req.params.id, seat: req.params.seat  }, true);
});

// REST ROUTE: GET one
webServer.get('/api/:table/:id', (req, res) => {
  // run query
  runQuery(req, res, `
    SELECT *
    FROM ${req.params.table}
    WHERE id = :id
  `, { id: req.params.id }, true
  );
});

// REST ROUTE: GET one
webServer.get('/api/Schedule/:id', (req, res) => {
  // run query
  runQuery(req, res, `
    SELECT *
    FROM ${req.params.table}
    WHERE id = :id
  `, { id: req.params.id }, true
  );
});

// REST ROUTE: POST
webServer.post('/api/:table', (req, res) => {
  // do not allow id to be set manually
  delete req.body.id;
  // run query and return result
  runQuery(req, res, `
    INSERT INTO ${req.params.table} (${Object.keys(req.body)})     
    VALUES (${Object.keys(req.body).map(x => ':' + x)})
  `, req.body
  );
});

// REST ROUTE: PUT (and PATCH - alias in our case)
// Note: PUT are PATCH are used interchangably
// in many REST-api:s
let putOrPatch = (req, res) => {
  // run query and return result
  runQuery(req, res, `
    UPDATE ${req.params.table} 
    SET ${Object.keys(req.body).map(x => x + " = :" + x)}
    WHERE id = :id
  `, { ...req.body, id: req.params.id }
  );
};
webServer.put('/api/:table/:id', putOrPatch);
webServer.patch('/api/:table/:id', putOrPatch);

// REST ROUTE: DELETE
webServer.delete("/api/Booking/:id", (req, res) => {
  req.params.table = 'Booking';
  runQuery(req, res, `
    DELETE FROM ${req.params.table} 
    WHERE Id = :id AND ManipulationCode = :manipulationCode
    
  `, { id: req.params.id, manipulationCode: req.body.ManipulationCode }
  );
});

// REST ROUTE: DELETE
webServer.delete('/api/:table/:id', (req, res) => {
  // run query and return result
  runQuery(req, res, `
    DELETE FROM ${req.params.table} 
    WHERE id = :id
  `, { id: req.params.id }
  );
});

// no such route / 404
webServer.all('/api/*', (req, res) => {
  res.status(404).json({ error: 'No such route.' });
});

// handle errors with faulty json bodies etc...
// (might hide runtime errors - 
//  in that casecomment out while developing)
webServer.use((error, req, res, next) => {
  // remove some unnecessary keys from error
  error = error && {
    ...error,
    statusCode: undefined,
    expose: undefined
  };
  // send error if there is an error
  error ?
    res.status(error.status || 500).json({ error }) : next();
});