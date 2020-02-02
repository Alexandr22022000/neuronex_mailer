const Mailer = require('./index');

const mailer = new Mailer();

mailer.sendMsg({
    to: "info@neuronex.pro",
    subject: "Demo message",
    html: "TEST"
})
    .then(msg => console.log(msg))
    .catch(e => console.log(e));