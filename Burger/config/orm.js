//Import the MySQL connection object
var connection = require ('./connection.js');

//Helper function for generating MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for(var i=0; i < num; i++) {
		arr.push ("?");
	}

	return arr.toString();
}

//Helper function for generating MySQL syntax
function objToSQL(ob) {
	var arr = [];

	for(var key in ob) {
		arr.push(key + "_" + ob[key]);
	}

	return arr.toString();
}

//Create the ORM object to perform SQL queries
var orm = {
	//function that returns all table entries
	selectAll: function(tableInput, cb) {
		//Construct the query string that retruns all rows from the target table
		var queryString = "SELECT * FROM " + tableInput + ";";

		//Perform the database query
		connection.query(queryString, function(err,result) {
			if (err) {
				throw err;
			}

			//Return results in callback
			cb(result);
		});
	},

	//Function that insert a single table entry
	insertOne: function(table, cols, vals, cd) {
		//Construct the query string that inserts a single row into the target table
		var queryString = "INSERT INTO" + table;

		queryString += "(";
		queryString += cols.toString();
		queryString += ")";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ")";

		//console.log(queryString);

		//Perform the database query
		connection.query(queryString, vals, function(err, result)
			if (err) {
				throw err;
			}

			//Return results in callback
			cd(result);
		});
	},

	//Function that updates a single table entry
	updatecOne: function(table, objColVals, condition, cd) {
		//Construct the query string that updates a single entry in the target table
		var queryString = "UPDATE" + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE";
		queryString += condition;

		//console.log(queryString);

		//Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			//Return results in callabck
			cd(result);
		});
	};

	//Export the orm object for use in other modules
	module.exports = orm;
