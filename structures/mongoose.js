const mongoose = require('mongoose');

module.exports = {
    init: () => {
        const dbOptions = {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
        };
    

    mongoose.connect(`mongodb+srv://SUPER:${process.env.PASS}@cluster0.wt4mh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, dbOptions);
    mongoose.set('useFindAndModify', false)
   // mongoose.set('debug', true);
    mongoose.Promise = global.Promise;

    mongoose.connection.on('connected', () => {
        console.log('[G] The bot has connected to the database.');

    });
    mongoose.connection.on('disconnected', () => {
        console.log('[R] The bot has disconnected to the database.');

    });
    mongoose.connection.on('err', (err) => {
        console.log('[Y] There was an error connecting.' + err);

    });
    }
}