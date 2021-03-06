const mongoose = require('mongoose');
const AppointmentModel = require('../models/Appointment');


const newAppointment = async (req,res) => {

    try {

        let appointment = await AppointmentModel.create({
            date: new Date(req.body.date),
            clientId: req.client._id,
            reason: req.body.reason,
            title: req.body.title
        });

        res.send(appointment);

    } catch (error) {
        console.log(error)
        res.status(500).send({ messasge: 'Cant create the appointment.'});
        
    }
};

const appointments = async (req,res) => {
    try {
        let clientId = req.client._id;

        let appointments = await AppointmentModel.find({ clientId: clientId });
        res.send(appointments)

    } catch (error) {
        console.log(error)
        res.status(500).send({ message: 'Cant find appointments'});
    }
};

const cancellAppointment =async (req,res) => {
    try {
        let appointmentId = req.params.id;

        let destroy = await AppointmentModel.findByIdAndUpdate(appointmentId,
            { status: 'cancelled'},
            {new: true, useFindAndModify: false}
        );

        if (!destroy) {
            return res.send({messasge: 'Cant cancell the appointment correctly'})
        }

        res.send({message: 'The appointment was cancelled correctly'})

    } catch (error) {
        console.log(error)
        res.status(500).send({message: 'Cant cancell the appointment correctly'});
    }
};


module.exports = {newAppointment, appointments, cancellAppointment}