const express = require("express");
const { celebrate, Segments, Joi } = require("celebrate");

const SessionController = require("./controllers/SessionController");
const OngController = require("./controllers/OngController");
const IncidentController = require("./controllers/IncidentController");
const ProfileController = require("./controllers/ProfileController");

const Validators = require('./validators/routerValidator');

const routes = express.Router();

// Sessions
routes.post("/sessions", Validators.sessionsPost, SessionController.create);

// Profile
routes.get( "/profile", Validators.profileGet, ProfileController.index);

// Ongs
routes.get("/ongs", OngController.index);
routes.post("/ongs", Validators.ongPost, OngController.create);

// Incidents
routes.get("/incidents", Validators.incidentGet, IncidentController.index);
routes.post("/incidents", Validators.incidentPost, IncidentController.create);
routes.delete("/incidents/:id", Validators.incidentDelete, IncidentController.delete);

module.exports = routes;
