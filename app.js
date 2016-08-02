module.exports = function(){

    var express = require('express')
      , routes = require('./routes')
      , user = require('./routes/user')
      , path = require('path');

    var app = express();
    var bodyParser = require('body-parser');
    // all environments
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(bodyParser.json());

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    app.get('/users', user.list);

    app.get('/contactlist', routes.getContactList);

    app.post('/contactlist', routes.addContact);

    app.delete('/contactlist/:id', routes.deleteContact);

    app.get('/contactlist/:id', routes.getContactById);

    app.put('/contactlist/:id', routes.updateContact);
}
