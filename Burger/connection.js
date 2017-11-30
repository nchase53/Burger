//Dependencies
var mysql = require ('mysql');

//Create MySQL connection object
var connection;

if(process.env.JAWSDB_URL) {
	//DB on Heroku
	connection = mysql.createConnection(process.env.JAWS_URL);
}else{
	//DB on localhost
	connection = mysql.createConnection({
		port: 3306,
		host:'localhost',
		user: 'root',
		password: '',
		database: burger_db
	})
};

//Connection to MySQL
connection.connect(function(err) {
	if (err) {
		console.error('ERROR: MySQL connection error -- ' + err.stack + '\n\n');
		return;
	}
	console.log('Connected to MySQL database as id ' + connection.threshold + '\n\n');
});

//Export connection for ORM 
module.export = connection;