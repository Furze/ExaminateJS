module.exports = function(sequelize, DataTypes) {
	var Semester = sequelize.define('Semester', {
		_year: DataTypes.INTEGER,
		semester: DataTypes.STRING
	}, {
		classMethods: {
			associate: function(models) {
				Semester.belongsTo(models.Year)
			}
		}
	})

	return Semester
}