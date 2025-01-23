// models/Payment.js
const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  event_Id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true,
  },
  paymentId: {
    type: String,
    required: true, // Store Razorpay payment ID
  },
  orderId: {
    type: String,
    required: true, // Store Razorpay order ID
  },
  amount: {
    type: Number,
    required: true, // Store the amount paid
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'successful', 'failed'], // Track payment status
    default: 'pending',
  },
  paymentDate: {
    type: Date,
    default: Date.now, // Date when the payment was made
  },
  razorpaySignature: {
    type: String,
    required: true, // Store the Razorpay signature for verification
  },
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;