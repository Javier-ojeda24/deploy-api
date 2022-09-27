const { Country, Activity } = require("../db");

const postActivity = async (req, res) => {
	try {
		let { name, difficulty, duration, season, countries } = req.body;
		let newActivity = await Activity.create({
			name,
			difficulty,
			duration,
			season,
		});

		let selectCountries = await Country.findAll({
			where: {
				name: countries,
			},
		});

		newActivity.addCountry(selectCountries);
		res.status(200).send("Actividad creada con exito");
	} catch (error) {
		console.log(error);
	}
};

const getActivities = async (req, res) => {
    try {
        const activities = await Activity.findAll({
            include: [
                {
                    model: Country,
                    attributes: ['name'],
                    through: { attributes: [] },
                }
            ],
        })
        res.status(200).send(activities)
    } catch (error) {
        res.status(400).send('no funca')
    }
}

module.exports = {
	postActivity,
	getActivities
};
