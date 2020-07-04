module.exports = function (error, req, res, next) {
  console.log("New Error");
    if (res.headersSent) {
      console.log('error sent');
      return next(error)
    }
    console.log(error)
    console.log(`\nerror ${error.message} will be sent, error stack above.`);
    res.status(401)
    res.json(error.message)
  }