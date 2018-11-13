var sql = require('mssql');

ServiceLayer = function() {
    
}

var config = {
    user: 'root',
    password: 'coolermaster',
    server: 'localhost',
    database: 'my-first-schema',
    port: 1433
};

sql.connect(config, function (err) {
    if(err) {
        console.log("Server connection failed - %s", err);
    } else {
        console.log("Server connection successful");
    }

});

export function setAsFavourite(id) {
    var request = new sql.Request();
    var queryString =  'UPDATE recipe SET favourite = NOT (SELECT favourite WHERE id = ' + id + ');';
    request.query(queryString, function (err, recordSet) {
        if(err) console.log(err);
        
        return recordSet;
    });
}

exports.ServiceLayer = ServiceLayer;
