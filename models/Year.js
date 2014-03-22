module.exports = function(sequelize, DataTypes) {
	var Year = sequelize.define('Year', {
		year: DataTypes.INTEGER
	}, {
		classMethods: {
			associate: function(models) {
				Year.hasMany(models.Semester)
			}
		}
	})

	return Year
}