var fs        = require('fs')
	, path      = require('path')
	, Sequelize = require('sequelize')
	, lodash    = require('lodash')
	, sequelize = new Sequelize("examinate_db", "flamingo", "IWishICouldRememberAllThis#69", {
		dialect:  'mysql',
		port:     1433,
		host:     'ep9gru174l.database.windows.net',
		logging:  console.log //false
	})
	, db        = {}

fs
	.readdirSync(__dirname)
	.filter(function(file) {
		return (file.indexOf('.') !== 0) && (file !== 'index.js')
	})
	.forEach(function(file) {
		var model = sequelize.import(path.join(__dirname, file))
		db[model.name] = model
	})

Object.keys(db).forEach(function(modelName) {
	if ('associate' in db[modelName]) {
		db[modelName].associate(db)
	}
})

module.exports = lodash.extend({
	sequelize: sequelize,
	Sequelize: Sequelize
}, db)

/*var sqldb = mysql.createConnection({
 host     : 'ep9gru174l.database.windows.net',
 user     : 'flamingo',
 password : 'IWishICouldRememberAllThis#69',
 database:   'examinate_db',
 port: 1433
 });*/