const mongoose = require('mongoose');
const connectdb = () => {
    var con = mongoose.connect(process.env.mongoURl,{}
    )
    con.then(() => {
        console.log("connect to database")
    })
    con.catch((error) => {
        console.log(error)
        console.log(error.message)
        process.exit(1)
    })
}
module.exports = connectdb;