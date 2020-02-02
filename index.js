const remoteMailer = require('./remoteMailer'),
    nodemailer = require('nodemailer');

class Mailer {
    constructor (connection, timer) {
        if (!connection) connection = {};

        connection.host = connection.host || 'https://mail.neuronex.pro/msg';
        connection.email = connection.email || 'easyhotels24@gmail.com';
        connection.secret = connection.secret || 'public';

        this.connection = connection;
        this.timer = timer || 10000;
    }

    sendMsg (msg) {
        if (this.connection.email)
            return remoteMailer(this.connection, msg);

        if (!this.transport) {
            this.transport = nodemailer.createTransport(this.connection);
        }
        else {
            clearTimeout(this.timeout);
        }

        this.timeout = setTimeout(() => {
            this.transport.close();
            this.transport = null;
        }, this.timer);

        return new Promise((resolve, reject) => {
            this.transport.sendMail(msg, (err, info) => {
                if (err) return reject(err);
                resolve(info);
            });
        });
    }
}

module.exports = Mailer;