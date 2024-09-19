const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialize Firebase Admin SDK
admin.initializeApp();

// Configure Nodemailer with your email service credentials
const transporter = nodemailer.createTransport({
  service: 'gmail', // or any other email service
  auth: {
    user: 'medicart2024@gmail.com',
    pass: 'MediCartGL@2024', // Use environment variables in production
  },
});

exports.sendAppointmentStatusEmail = functions.firestore
    .document('appointments/{appointmentId}')
    .onUpdate(async (change, context) => {
        const newData = change.after.data();
        const previousData = change.before.data();
        
        // Only send email if the status changed
        if (newData.status !== previousData.status) {
            const emailOptions = {
                from: 'medicart2024@gmail.com',
                to: newData.patientsEmail, // Use patient's email from appointment data
                subject: `Appointment ${newData.status}`,
                text: `Dear ${newData.patientsName}, your appointment on ${newData.date} at ${newData.time} has been ${newData.status}.`,
            };

            try {
                await transporter.sendMail(emailOptions);
                console.log('Email sent successfully');
            } catch (error) {
                console.error('Error sending email:', error);
            }
        }
    });
