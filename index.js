const express = require('express');
const hbs = require('hbs');
const wax = require('wax-on');
const database = require('./data');

const app = express();

app.set('view engine', 'hbs');

wax.on(hbs.handlebars);
wax.setLayoutPath('./views/layouts');

app.use(express.urlencoded({extended:false}));

app.get('/', function(req,res){
    data = database.getAll();
    res.render('index.hbs', {
        data: data,
    })
})

app.get('/book/add', function(req,res){
    res.render('add-book.hbs')
})

app.post('/book/add', function(req, res){
    database.addBook(req.body.title, req.body.isbn)
    res.redirect('/')
})

app.get('/book/:book_id/update', function(req, res){
    let book = database.getBook(req.params.book_id)
    res.render('update-book.hbs', {
        book:book
    })
})

app.post('/book/:book_id/update', function(req, res){
    database.updateBook(req.params.book_id, req.body.title, req.body.isbn)
    res.redirect('/')
})

app.get('/book/:book_id/delete', function(req, res){
    let book = database.getBook(req.params.book_id)
    res.render('delete-book.hbs', {
        book:book
    })
})

app.post('/book/:book_id/delete', function(req, res){
    database.deleteBook(req.params.book_id);
    res.redirect('/')
})

app.get('/book/search', function(req, res){
    res.render('search-book.hbs')
})

app.post('/book/search', function(req, res){
    let book = database.getBook(req.body.search)
    res.render('search-results.hbs', {
        book:book
    })
})

app.listen(3000, function(){
    console.log("Server has started");
})