const Reservation = require("../models/Reservation");

const createReservation = async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const reservation = await Reservation.create(req.body);

    console.log("Saved Successfully:", reservation);

    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      reservation,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    console.log("Reservations Found:", reservations);

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getReservations,
};