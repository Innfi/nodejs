var express = require("express");
var aws = require("aws-sdk")

aws.config.update({
    region: "ap-northeast-2",
    endpoint: "http://localhost:8000"
});

let dynamoDb = new aws.DynamoDB();

function tryCreateTable(tableName) {
    dynamoDb.listTables((err, data) => {
        if(err) {
            console.error("listTables error");
        } else {
            if(data.TableNames.includes(tableName))
            {
                console.log("tables: ", data.TableNames);
                return;
            }

            createTableTodoHistory(tableName);
        }
    });
}

function createTableTodoHistory(tableName) {
    let params = {
        TableName: "TodoHistory", 
        KeySchema: [
            { AttributeName: "UserId", KeyType: "HASH" },
            { AttributeName: "TodoId", KeyType: "RANGE" }
        ],
        AttributeDefinitions: [
            { AttributeName: "UserId", AttributeType: "S" },
            { AttributeName: "TodoId", AttributeType: "N" }
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1, 
            WriteCapacityUnits: 1
        }
    };
    
    dynamoDb.createTable(params, (err, data) => {
        if(err) {
            console.error("createTable error: ", JSON.stringify(err, null, 2));
        } else {
            console.log("table created: ", createTable.TableName);
        }
    });    
}

function resetTable(tablenName) {
    var params = {
        TableName: tableName
    };
    dynamoDb.deleteTable(params, (err, data) => {
        if(err) {
            console.log("error deleteTable", err);
        }
    });
}

function insertTodoItem(tableName) {
    const params = {
        TableName = tableName,
        Item: {
            'UserId': {S: "innfi"},
            'TodoId': {N: "1"},
            'TodoText' : {S: "test-todos"}
        }
    };
    
    dynamoDb.putItem(params, (err, data) => {
        if(err) {
            console.log("insertTodoItem error: ", err);
        } else {
            console.log("insertTodoItem: ", data)
        }
    });
}

resetTable("TodoHistory");
tryCreateTable("TodoHistory");

let router = express.Router();

router.get("/user", (req, res, next) => {
    
});

module.exports = router;