const createContact = async (req, res) => {
  try {
    console.log(req.body);

    res.status(201).json({
      success: true,
      message: "Message sent successfully"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createContact
};