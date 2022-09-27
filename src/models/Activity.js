const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = sequelize => {
	sequelize.define("activity", {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		difficulty: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		duration: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		season: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	});
};
