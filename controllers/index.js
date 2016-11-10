module.exports = () => {
  
  var controller = {
    index: (req, res) => {
      var mysql      = require('mysql');
      var connection = mysql.createConnection({
          host     : 'bancotcc.criwayq9m3wj.us-west-2.rds.amazonaws.com',
        user     : 'luis',
        password : 'pa$$w0rd827',
        database : 'bancoTcc',
          ssl  : {
            // DO NOT DO THIS 
            // set up your ca correctly to trust the connection 
            rejectUnauthorized: false
          }
        });

      connection.connect();
      
      connection.query('SELECT SUM(qtd) AS Quantidade FROM faces', function(err, rows, fields) {
        if (err) throw err;

        var quantidade = rows[0].Quantidade;

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end("<h1> Quantidade de faces: " + quantidade + "</h1>");
      });
      
      connection.end();
    }
  };
  
  return controller;
};