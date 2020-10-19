const dbconnect = () => {

    //dB connection//////////
    const mongoose = require("mongoose");
    const uri = "mongodb+srv://carlosmoreno8:calasnidad8@cluster0.ofkpt.mongodb.net/clinicaDental?retryWrites=true&w=majority";

    mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        }).then(() => {
            console.log('CONNECTION TO mDB ESTABLISHED');
        })
        .catch(error => console.log('Error connecting to the dB' + error));
    ////////////////////////

}

module.exports = dbconnect;