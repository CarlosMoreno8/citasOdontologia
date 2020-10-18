const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const AppointmentSchema = new mongoose.Schema({

    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        default: 'pending',
        enum: ['pending', 'cancelled', 'made']
    },
    clientId: {
        type: ObjectId
    },
    reason: {
        type: String
    }
});

AppointmentSchema.methods.toJSON = function () {
    const appointment = this.toObject();
    delete appointment.__v;
    return appointment;
};

const AppointmentModel = mongoose.model('appointment', AppointmentSchema);
module.exports = AppointmentModel;