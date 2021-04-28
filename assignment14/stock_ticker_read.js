const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://user_1:jjTh7eJhEw0i796D@cluster0.pymuo.mongodb.net/stocks?retryWrites=true&w=majority";


var fs = require('fs');

var name = [];
var ticker = [];

file="companies.csv";
fs.readFile(file, 'utf8', function(err, txt) {
    var split_data = txt.split("\n");
    
    for(i = 1; i < split_data.length; i++)
    {
        var split = split_data[i].split(",");
        name[i - 1] = split[0];
        ticker[i - 1] = split[1].slice(0,-1);
    }
});

function main() 
{
    MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
    if(err) { return console.log(err); return;}

      var dbo = db.db("stocks");
      var collection = dbo.collection('companies');
      
      for(i = 0; i < name.length; i++)
      {
          var newData = {"name": name[i], "ticker": ticker[i]};
          
          collection.insertOne(newData, function(err, res) {
              if(err) { console.log("Insert Error: " + err); return; }
              console.log("New document inserted!");
          });
      }
      
      console.log("Success!");

    });
}

main();
