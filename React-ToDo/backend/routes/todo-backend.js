var express = require("express");
var aws = require("aws-sdk")

aws.config.update({
    region: "ap-northeast-2",
    endpoint: "http://localhost:8000"
});

const dynamoDb = new aws.DynamoDB();
const docClient = new aws.DynamoDB.DocumentClient();

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
                UserId: item.UserId,
                TodoId: item.TodoId,
                TodoText: item.TodoText,
                Completed: item.Completed
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
        KeyConditionExpression: '#uid = :userId',
        ExpressionAttributeNames: {
            "#uid" : "UserId"
        },
        ExpressionAttributeValues: {
            ':userId': userId
        }
    };

    docClient.query(params, (err, data) => {
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
            'UserId': userId,
            'TodoId': todo.todoId,
            'TodoText': todo.text,
            'Completed': todo.isCompleted === true ? 1 : 0
        }
    };

    insertTodoItem(insertParams, (data) => {
        res.send({ result: "success" });
    });    
});

function insertTodoItem(insertParams, callback) {
    docClient.put(insertParams, (err, data) => {
        if(err) {
            console.log("insertTodoItem error: ", err);
            throw err;
        } else {
            console.log("insertTodoItem: ", data);
            callback(data);
        }
    });
}

router.put("/:userId", (req, res, next) => {
    const todo = req.body.todo;

    const updateParams = {
        TableName: tableName,
        Key: {
            "UserId": req.params.userId,
			"TodoId": todo.todoId,
        },
        UpdateExpression: "set Completed = :c, TodoText = :t",
        ExpressionAttributeValues: {
            ":c": todo.isCompleted === true ? 1 : 0,
            ":t": todo.text
        },
        ReturnValues:"UPDATED_NEW"
    };

    updateTodoItem(updateParams, (data) => {
        console.log("data: ", data);
        res.send({ result: "success"});
    });
});

function updateTodoItem(updateParams, callback) {
    docClient.update(updateParams, (err, data) => {
        if(err) {
            console.log("updateTodoItem error: ", err);
            throw err;
        } else {
            callback(data);
        }
    });
}

router.delete("/:userId", (req, res, next) => {
	const params = {
		TableName: tableName,
		Key: {
			"UserId": req.params.userId,
			"TodoId": req.body.todoId,
		}
	};

    console.log("params: ", params);
	removeTodoItem(params, () => {
		res.send({ result: "success" });
	});
});

function removeTodoItem(removeParams, callback) {
	docClient.delete(removeParams, (err, data) => {
        if(err) {
            console.log("removeTodoItem error: ", err);
            throw err;
        } else {
            callback(data);
        } 
    });
}

module.exports = router;
