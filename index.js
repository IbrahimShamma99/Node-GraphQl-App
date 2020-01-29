import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import ToDo from './model/todo';
import schema from './graphql/Schema/Schema';
const app = express();
import config from './config/config';
import { graphql } from 'graphql';
import graphqlHTTP from 'express-graphql';
import Routes from './config/Routes';

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(config.DB);

var db = mongoose.connection;
db.on('error', () => { console.log('FAILED to connect to mongoose') })
db.once('open', () => {
    console.log('Connected to MongoDb')
})


app.get(Routes.base, (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.use(Routes.Graph, graphqlHTTP(req => ({
    schema
    ,graphiql:true
})))

app.post(Routes.quotes, (req, res) => {
    // Insert into TodoList Collection
    var todoItem = new ToDo({
        itemId: 1,
        item: req.body.item,
        completed: false
    })

    todoItem.save((err, result) => {
        if (err) { console.log("---TodoItem save failed " + err) }
        console.log("TodoItem saved successfully " + todoItem.item)
        res.redirect('/')
    })
})

app.listen(config.PORT, () => { console.log("Express Server is Running @ Port -> 3000!!!") })