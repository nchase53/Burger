//Dependencies
var mysql = require('mysql');

//Create MySQL Connection
var connection;

if(process.env.JAWSDB_URL) {
	//DB is CHOPS on Heroku
	connection = mysql.createConnection(process.env.CHOPS_URL);
} else {
	//DB is local on locla host
	connection = mysql.createConnection({
		port: 3306,
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'Burger_db'
	})
};

//Make connection to MySQL
connection.connect(function(err) {
	if(err) {
		console.error('Error:MySQL connection error -- ' + err.stack + '\n\n');
		return;
	}
	console.log('Connected to MySQL database as id' + connection.threadId + '\n\n');
});

//Export connection for ORM
module.export = connection;