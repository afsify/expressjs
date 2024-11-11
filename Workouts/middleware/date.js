const printDate = (req, res, next) => {
  const currentDate = new Date();
  console.log(
    `${currentDate.toLocaleTimeString()}, ${currentDate.toLocaleDateString()}`
  );
  next(); // Pass control to the next middleware or route handler
};

module.exports = printDate;
