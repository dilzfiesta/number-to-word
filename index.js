console.log('Loading function');
var doc = require('dynamodb-doc');
var db = new doc.DynamoDB();
var converter = require('number-to-words');

exports.handler = function(event, context, callback) 
{
    var number = event.number;
    var word = converter.toWords(number);
    var tableName = "number-to-word-dynamodb";
    
    var item = {
        "number": number,
        "word": word,
        "timestamp": Date.now()
    };
    
    var params = {
        TableName: tableName, 
        Item: item
    };
    
    console.log(params);
    db.putItem(params,function(err,data) {
        if (err) callback(err, null);
        else callback(null, data);
    });
};
