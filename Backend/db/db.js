const mongoose = require('mongoose');

let connectionPromise;

function connectToDb() {
    if (mongoose.connection.readyState === 1) {
        return Promise.resolve(mongoose.connection);
    }

    if (!process.env.DB_CONNECT) {
        return Promise.reject(new Error('DB_CONNECT environment variable is required'));
    }

    if (!connectionPromise) {
        connectionPromise = mongoose.connect(process.env.DB_CONNECT)
            .then((connection) => {
                console.log('Connected to DB');
                return connection;
            })
            .catch((error) => {
                connectionPromise = undefined;
                throw error;
            })
            .finally(() => {
                if (mongoose.connection.readyState === 1) {
                    connectionPromise = undefined;
                }
            });
    }

    return connectionPromise;
}

module.exports = connectToDb;
