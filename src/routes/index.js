const { Router } = require("express");
const {
	getCountryName,
	getApiInfoCountry,
	getIdCountry,
} = require("../controllers/countryController");
const {
	postActivity,
	getActivities,
} = require("../controllers/activityController");
const { Activity } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/llamar", getApiInfoCountry);
router.get("/countries", getCountryName);
router.get("/countries/:id", getIdCountry);
router.post("/activities", postActivity);
router.get("/activities", getActivities);


module.exports = router;
