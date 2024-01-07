const rfidMiddleware = (req, res, next) => {
    // Tutaj możesz dodać logikę middleware do obsługi RFID, jeśli to konieczne
    next();
  };
  
  module.exports = rfidMiddleware;
  