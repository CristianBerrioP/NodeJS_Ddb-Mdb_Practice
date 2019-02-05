const AWS = require('aws-sdk')
const awsConfig = require('../../config/awsConfig')
AWS.config.update(awsConfig)

let docClient = new AWS.DynamoDB.DocumentClient()

function readProducts(req, res){
    var params = {
        TableName: "Products",
        Limit: 2
    }
    docClient.scan(params, (err, products)=>{
        if(err){
            res.status(500).send({
                message: "Error at database connection"
            })
        }
        if(products.Items.length == 0){
            res.status(404).send({
                message: "There aren't products on database"
            })
        }
        res.status(200).send({
            Products: products
        })
    })
}

function writeProduct(req, res){
    let name = req.body.name
    let reference = req.body.reference
    let description = req.body.description

    var product = {
        name : name,
        reference : reference,
        description : description
    }

    var params = {
        TableName: "Products",
        Item: product
    }
    docClient.put(params, (err, productSaved)=>{
        if(err){
            res.status(500).send((err)=>{
                console.log(`Error accesing the database: ${err}`)
            })
        }
        res.status(200).send({
            message: "The product has been saved"
        })
    })   
}

function updateProductByReference(req, res){
    let reference = req.body.reference
    let newDesc = req.body.newDescription

    var params = {
        Key : { reference : reference},
        TableName : 'Products',
        UpdateExpression: "SET description =:d",
        ExpressionAtttributeValues: {
            ':d' : 'PrettyPC'
        },
        ReturnValues : 'UPDATED_NEW'
    }
    docClient.update(params, (err, data)=>{
        if(err){
            res.status(500).send({
                message: `Error accesing the database:    ${err}`
            })
        }else{
            res.status(200).send({
                message: `The product has been updated:  ` + JSON.stringify(data)
             })
        }
    })
}

function deleteProductByReference(){

}

module.exports = {
    writeProduct,
    readProducts,
    updateProductByReference
}
