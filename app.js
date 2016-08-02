module.exports = function(){

    var express = require('express')
      , routes = require('./routes/index.js')()
      , router = require('router')
      /*, user = require('./routes/user')*/
      , path = require('path'), app = express(), bodyParser = require('body-parser');
    // all environments
    app.set('views', __dirname + '/views'),
    app.set('view engine', 'jade'),
//    app.set('port', process.env.PORT || 3000);
    app.use(express.logger('dev')),
    app.use(express.methodOverride()),
    app.use(router()),
    app.use(express.static(path.join(__dirname, 'public'))),
    app.use(bodyParser.json()), 
    app.use(bodyParser.urlencoded({
        extended: !0
    }));

    // development only
    if ('development' == app.get('env')) {
      app.use(express.errorHandler());
    }

    app.get('/', routes.index);
    app.get("/app", function(err, res) {
            if(err){
                console.log(err.message);
            }
            res.sendFile(__dirname + "/public/index.html");
        });
//    app.get('/users', user.list);
    app.get('/contactlist', routes.getContactList);
    app.post('/contactlist', routes.addContact);
    app.delete('/contactlist/:id', routes.deleteContact);
    app.get('/contactlist/:id', routes.getContactById);
    app.put('/contactlist/:id', routes.updateContact);
    
    return app;
}
