const Client = require('./../models/auth/client');

// Create endpoint /api/client for POST
exports.newClient = (req, res) => {
    let client = new Client();

    // Set the client properties that came from the POST data
    client.name = req.body.name;
    client.id = req.body.id;
    client.secret = req.body.secret;
    client.userId = req.user._id;

    // Save the client and check for errors
    client.save((err, client) => {
        //hay error
        if (err) { res.status(500).send(err);}

        res.status(200).json({
            message: 'new client created!!',
            data: client
        });
    });
};

// Create endpoint /api/clients for GET
exports.allClient = (req, res) => {
    // Use the Client model to find all clients
    Client.find((err, clients) => {
        if(err){
            res.status(500).send(err);
        }

        res.status(200).json(clients);
    });
};