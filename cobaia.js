const fauna = require('./lib/connect.js')
const dotenv = require('dotenv')
dotenv.config()

fauna.getByAuthorAndName(98478268,'Ligar pro dentista')
