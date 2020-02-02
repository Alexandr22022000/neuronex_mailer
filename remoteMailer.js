const unirest = require('unirest');

module.exports = (connection, msg) => {
    return new Promise((resolve, reject) => {
        unirest.post(connection.host)
            .send({email: connection.email, secret: connection.secret, msg: JSON.stringify(msg)})
            .end(response => {
                if (response.error) reject(response.body ? response.body.message : response);
                else resolve(response.body.message);
            });
    });
};