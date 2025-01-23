const { request } = require("express");

exports.verifyPayment = async (req, res) => {

    console.log(request.body);
    const {
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
      event_Id,
      amount,
    } = req.body;
    // find the course in the db
    const event = await event.findById(event_Id);
  
    const generated_signature = crypto
      .createHmac("sha256", process.env.razorpay_secret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");
  
    if (generated_signature === razorpay_signature) {
      try {
        // Create a new payment document
        const payment = new Payment({
          userId: req?.user?._id, // Assuming user is authenticated and `req.user` is available
          event_Id,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount,
          paymentStatus: "successful",
          razorpaySignature: razorpay_signature,
        });
  
        await payment.save();
  
       
  
        return res.status(200).json({
          message: "Payment verified and saved successfully!",
          payment,
        });
      } catch (error) {
        console.error("Error saving payment details", error);
        return res.status(500).json({
          message: "Error saving payment details",
          error: error.message,
        });
      }
    } else {
      try {
        // Log a failed payment for record-keeping
        const failedPayment = new Payment({
          userId: req.user._id,
          event_Id,
          paymentId: razorpay_payment_id,
          orderId: razorpay_order_id,
          amount,
          paymentStatus: "failed",
          razorpaySignature: razorpay_signature,
        });
  
        await failedPayment.save();
  
  
        return res.status(400).json({ message: "Payment verification failed" });
      } catch (error) {
        console.error("Error saving failed payment details", error);
        return res.status(500).json({
          message: "Error logging failed payment details",
          error: error.message,
        });
      }
    }
  };