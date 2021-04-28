const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://user_1:jjTh7eJhEw0i796D@cluster0.pymuo.mongodb.net/stocks?retryWrites=true&w=majority";
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
if(err) { return console.log(err); return;}
	
	http.createServer(function (req, res) 
		{
			if (req.url == "/") {
	  			file = 'stock_ticker_find.html';
	  			fs.readFile(file, function(err, txt) {
	  			res.writeHead(200, {'Content-Type': 'text/html'});
	  			res.write(txt);
	  			res.end();
  				});
  			} else if (req.url == "/process") {
 				res.writeHead(200, {'Content-Type':'text/html'});
				res.write ("<html><head><style type='text/css'>body {background-color: #DDC9B4; color: #2A3D45; text-align: center} </style></head>");
				res.write("<h2>Company(ies) Queried:</h2>")
  				pdata = "";
  				req.on('data', data => {
  					pdata += data.toString();
				});
				
				req.on('end', () => {
					pdata = qs.parse(pdata);
					
					var dbo = db.db("stocks");
					var collection = dbo.collection('companies');
					var output = "";
					
					if (pdata['n_or_t'] == "name") {
						var query = ({"name" : pdata['name']});
						var filter = {projection : {"name" : 1, "ticker" : 1, "_id" : 0}};
						
						collection.find(query, filter).toArray(function(err, result) {
							if(err) throw err;
							
							if(result.length == 0) {
								res.write("No Companies Matching Search");
								res.end();
							} else {
								for(i = 0; i < result.length; i++) {
									output = output + "Name: " + result[i]["name"] + "<br>Ticker: " + result[i]["ticker"] + "<br>";
								}
								
								res.write(output);
								res.end();
							}
							
						});
						
					} else {
						
						var query = ({"ticker" : pdata['ticker']});
						var filter = {projection : {"name" : 1, "ticker" : 1, "_id" : 0}};
						
						collection.find(query, filter).toArray(function(err, result) {
							if(err) throw err;
							
							if(result.length == 0) {
								res.write("No Companies Matching Search");
								res.end();
							} else {
								for(i = 0; i < result.length; i++) {
									output = output + "Name: " + result[i]["name"] + "<br>Ticker: " + result[i]["ticker"] + "<br>";
								}
								
								res.write(output);
								res.end();
							}
							
						});
					}
				
				});
  		  } else {
			  res.writeHead(200, {'Content-Type':'text/html'});
			  res.write ("<html><head><style type='text/css'>body {background-color: #DDC9B4; color: #2A3D45; text-align: center} </style></head>");
			  res.write ("Unknown page request");
			  res.end();
		  }
		  
	}).listen(8080);
	
});

