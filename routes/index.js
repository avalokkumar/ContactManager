module.exports = function() {
    var db = mongojs("contactlist", [ "contactlist" ]), functions = {};
    functions.index = function(req, res) {
        res.render("index", {
            title: "Express"
        });
    };
    functions.getContactList = function(req, res) {
        console.log("Received a GET request!");
        db.contactlist.find(function(err, docs) {
            if (err) {
                throw err;
            }
            res.json(docs);
        });
    };
    functions.addContact = function(req, res) {
        console.log(req.body);
        db.contactlist.insert(req.body, function(err, doc) {
            res.json(doc);
        });
    };
    functions.deleteContact = function(req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.remove({
            _id: mongojs.ObjectId(id)
        }, function(err, doc) {
            res.send(doc);
        });
    };
    functions.getContactById = function(req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.findOne({
            _id: mongojs.ObjectId(id)
        }, function(err, doc) {
            res.json(doc);
        });
    };
    functions.updateContact = function(req, res) {
        var id = req.params.id;
        console.log(id);
        db.contactlist.findAndModify({
            query: {
                _id: mongojs.ObjectId(id)
            },
            update: {
                $set: {
                    name: req.body.name,
                    email: req.body.email,
                    number: req.body.number
                }
            },
            new: true
        }, function(err, doc) {
            res.json(doc);
        });
    };
    return functions;
};