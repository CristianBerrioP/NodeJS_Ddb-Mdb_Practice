'use strict'

const AWS = require('aws-sdk')
const awsConfig = require('../../config/awsConfig')
AWS.config.update(awsConfig)
let db = new AWS.DynamoDB()

function createTable(){
    var params = {
        TableName: "Products",
        KeySchema: [
            { AttributeName: "reference", KeyType: "HASH"}
        ],
        AttributeDefinitions: [
            { AttributeName: "reference", AttributeType: "S"},
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        }
    }

    db.createTable(params, (err,data)=>{
        if (err) {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2));
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2));
        }
    })
}

createTable()