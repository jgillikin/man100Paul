// server/api.js
/*
 |--------------------------------------
 | Dependencies
 |--------------------------------------
 */

const jwt = require('express-jwt');
const jwks = require('jwks-rsa');
const Event = require('./models/Event');
//const Events = require('./models/Events');

const Rsvp = require('./models/Rsvp');
const _eventListProjection = 'title startDatetime endDatetime start_date end_date text id viewPublic';

/*
 |--------------------------------------
 | Authentication Middleware
 |--------------------------------------
 */

module.exports = function(app, config) {
  // Authentication middleware
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: `https://${config.AUTH0_DOMAIN}/.well-known/jwks.json`
    }),
    audience: config.AUTH0_API_AUDIENCE,
    issuer: `https://${config.AUTH0_DOMAIN}/`,
    algorithm: 'RS256'
  });

/*
 |--------------------------------------
 | API Routes
 |--------------------------------------
 */

  // GET API root
  app.get('/api/', (req, res) => {
    res.send('API works');
  });

// GET list of public events starting in the future
  app.get('/api/events', (req, res) => {
    Event.find({viewPublic: true},  _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

// GET list of all events, public and private (admin only)
  app.get('/api/events/admin', jwtCheck, (req, res) => {
    Event.find({}, _eventListProjection, (err, events) => {
      let eventsArr = [];
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (events) {
        events.forEach(event => {
          eventsArr.push(event);
        });
      }
      res.send(eventsArr);
    });
  });

// GET event by event ID
  app.get('/api/event/:id',  (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      res.send(event);
    });
  });

// check Login auth
  app.get('/', jwtCheck,  (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      res.send(event);
    });
  });


// POST a new event
  app.post('/api/event/new', (req, res) => {
console.log('in post');
  
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (existingEvent) {
        return res.status(409).send({message: 'You have already created an event with this title, location, and start date/time.'});
      }
      const event = new Event({
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        id: 'ac33',
        counselor: 'jason',
        viewPublic: req.body.viewPublic
      });
      event.save((err) => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(event);
      });
    
	
	
  });

// PUT (edit) an existing event
  app.put('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      event.title = req.body.title;
      event.location = req.body.location;
      event.startDatetime = req.body.startDatetime;
      event.endDatetime = req.body.endDatetime;
      event.viewPublic = req.body.viewPublic;
      event.description = req.body.description;

      event.save(err => {
        if (err) {
          return res.status(500).send({message: err.message});
        }
        res.send(event);
      });
    });
  });

// DELETE an event and all associated RSVPs
  app.delete('/api/event/:id', jwtCheck, (req, res) => {
    Event.findById(req.params.id, (err, event) => {
      if (err) {
        return res.status(500).send({message: err.message});
      }
      if (!event) {
        return res.status(400).send({message: 'Event not found.'});
      }
      Rsvp.find({eventId: req.params.id}, (err, rsvps) => {
        if (rsvps) {
          rsvps.forEach(rsvp => {
            rsvp.remove();
          });
        }
        event.remove(err => {
          if (err) {
            return res.status(500).send({message: err.message});
          }
          res.status(200).send({message: 'Event and RSVPs successfully deleted.'});
        });
      });
    });
  });



};