const HOST = "localhost";
const PORT = 27017;
const DB_NAME = 'ebazzar';
const DB_USERNAME = 'ebazzar-user';
const DB_PASS = "ebazzar-pwd";

const DB_CONN_STRING = `mongodb://${DB_USERNAME}:${DB_PASS}@${HOST}:${PORT}/${DB_NAME}`;
const DB_LOCAL_CONN_STRING = `mongodb://${HOST}:${PORT}/${DB_NAME}`;


module.exports = {DB_CONN_STRING, DB_LOCAL_CONN_STRING};