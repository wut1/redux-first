var path = require('path');
var fs = require('fs');
module.exports = function(app) {
	app.post('/searchQuest',function(req,res){
		readData('searchQuest.json')
	})
    app.post('/searchHotQuest',function(req,res){
    	readData('searchHotQuest.json')
    });

    function readData(fileName,res) {
        fs.readFile("./json/" + fileName ,"utf8", function(err, data){
            if(err) {
                console.log(err);
            } else{
                res.json(JSON.parse(data));
            }
        })
    }
}