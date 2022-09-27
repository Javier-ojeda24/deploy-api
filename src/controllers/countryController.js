const axios = require("axios");
const { Country, Activity } = require("../db");

//INFO DE LA API
const getApiInfoCountry = async (req, res) => {
	try {
		let infoDb = await Country.findAll();

		if (!infoDb.length) {
			const apiUrl = await axios.get("https://restcountries.com/v3/all");
			const apiInfoUrl = await apiUrl.data.map(p => {
				return {
					id: p.cca3,
					name: p.name.common,
					flag: p.flags[1],
					continents: p.continents ? p.continents : "No hay continente",
					capital: p.capital ? p.capital[0] : "No tiene capital",
					subregion: p.subregion ? p.subregion : "No hay datos de subregion",
					area: p.area ? p.area : "No hay Area",
					population: p.population,
				};
			});
			apiInfoUrl.forEach(c => {
				Country.findOrCreate({
					where: {
						id: c.id,
						name: c.name,
						flag: c.flag,
						continents: c.continents[0],
						capital: c.capital,
						subregion: c.subregion,
						area: c.area,
						population: c.population,
					},
				});
			});
			// console.log(apiInfoUrl);
			return apiInfoUrl;
		} else {
			// console.log(infoDb);
			return infoDb;
		}
	} catch (error) {
		console.log(error);
	}
};

const getCountryName = async (req, res) => {
	const { name } = req.query;
	const countries = await Country.findAll({
		include: [
			{
				model: Activity,
				attributes: ["name"],
				through: { attributes: [] },
			},
		],
	});
	const allCountries = countries.map(e => {
		return {
			id: e.id,
			name: e.name,
			flag: e.flag,
			continents: e.continents,
			capital: e.capital,
			subregion: e.subregion,
			area: e.area,
			population: e.population,
			activities: e.activities.map(e => e.name),
		};
	});
	if (name) {
		let countryName = allCountries.filter(e =>
			e.name.toLowerCase().includes(name.toLowerCase())
		);
		countryName.length
			? res.status(200).send(countryName)
			: res.status(404).send("No existe dicho país");
	} else {
		res.status(200).send(allCountries);
	}
};
const getIdCountry = async (req, res) => {
	const { id } = req.params;
	if (id) {
		let buscar = await Country.findOne({
			where: {
				id,
			},
			include: {
				model: Activity,
				attributes: ["name", "difficulty", "duration", "season"],
				through: {
					attributes: [],
				},
			},
		});
		if (buscar) {
			return res.send(buscar);
		} else {
			return res.status(404).send("No encontramos el id");
		}
	}
};

// router.delete('/:id', async(req, res) => {
//     const  id  = req.params.id
//     console.log(id)

//     actividades = await Activity.destroy(
//         {
//             where: {id: id },
//         }
//         )
//         res.status(200).send('la actividad se creo correctamente')
//     }
// )
module.exports = {
	getCountryName,
	getApiInfoCountry,
	getIdCountry,
};
