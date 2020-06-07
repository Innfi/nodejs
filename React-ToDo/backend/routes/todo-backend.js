var express = require("express");
var aws = require("aws-sdk")

aws.config.update({
    region: "ap-northeast-2",
    endpoint: "http://localhost:8000"
});

let dynamoDb = new aws.DynamoDB();

const tableName = "TodoHistory";

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
        TableName: tableName, 
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
    const params = {
        TableName: tableName
    };
    dynamoDb.deleteTable(params, (err, data) => {
        if(err) {
            console.log("error deleteTable", err);
        }
    });
}

//resetTable(tableName);
tryCreateTable(tableName);

let router = express.Router();

router.get("/:userId", (req, res, next) => {
    const userId = req.params.userId;
    
    readTodos(userId, (items) => {
        const todos = items.map(item => {
            const todo = {
                UserId: item.UserId.S,
                TodoId: item.TodoId.N,
                TodoText: item.TodoText.S,
                Completed: item.Completed.N
            };
        
            return todo;
        });
    
        res.send(todos);   
    });
});

function readTodos(userId, callback) {
    console.log("userId: ", userId);

    const params = {
        TableName: tableName,
        KeyConditionExpression: 'UserId = :userId',
        ExpressionAttributeValues: {
            ':userId': { S: userId}
        }
    };

    dynamoDb.query(params, (err, data) => {
        if(err) {
            console.error("readTodos: ", JSON.stringify(err, null, 2));
            throw err;
        } else {
            callback(data.Items);
        }
    });
}

router.post("/:userId", (req, res, next) => {    
    const userId = req.params.userId;
    const todo = req.body.todo;
    const insertParams = {
        TableName: tableName, 
        Item: {
            'UserId': {S: userId},
            'TodoId': {N: todo.todoId.toString()},
            'TodoText': {S: todo.text},
            'Completed': {N: todo.isCompleted ? "1" : "0" }
        }
    };

    insertTodoItem(insertParams, (data) => {
        res.send({ result: "success" });
    });    
});

function insertTodoItem(insertParams, callback) {
    dynamoDb.putItem(insertParams, (err, data) => {
        if(err) {
            console.log("insertTodoItem error: ", err);
            throw err;
        } else {
            console.log("insertTodoItem: ", data);
            callback(data);
        }
    });
}

module.exports = router;