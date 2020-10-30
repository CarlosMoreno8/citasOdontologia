const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppointmentSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
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
         type: Schema.Types.ObjectId, ref: 'Client' 
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
AppointmentSchema.pre('find', function() {
    this.populate('clientId');
  });

const AppointmentModel = mongoose.model('Appointment', AppointmentSchema);
module.exports = AppointmentModel;