const dotenv = require('dotenv');
dotenv.config();


export default {
	PostgreSQLDB_URL: process.env.DATABASE_URL,
}