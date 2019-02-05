//process.env.NODE_ENV = 'test'
let server = require('../index')
let mongoose = require('mongoose')
let chai = require('chai')
let chaiHttp = require('chai-http')
let expect = chai.expect

chai.use(chaiHttp)
describe('Products', ()=>{
    describe('GET/ Products', ()=>{
        it('It should get all the products', (done)=>{
            chai.request(server).get('/product') 
            .end((err,res)=>{
                expect(res).to.have.status(200)
                done()
            })
        })
        it('It should be an json object', (done)=>{
            chai.request(server).get('/product')
            .end((err,res)=>{
                expect(res.body).to.be.an('object')
                done()
            })
        })
        it('It should not be empty', (done)=>{
            chai.request(server).get('/product')
            .end((err,res)=>{
                expect(res.body).to.be.not.empty
                done()
            })
        })
        
    })
    describe('POST/ Products',()=>{
        it('It should save a product', (done)=>{
            chai.request(server).post('/product').send({
                name: 'testPC',
                picture: 'testPC.jpg',
                price: 2000,
                category: 'computers',
                description: 'Test'
            }).end((err,res)=>{
                expect(res).to.have.status(200)
                done()
            })
        })
    })
})  