const constants = require("../../constants");
module.exports = (req, res, next) => {
  const code = typeof req.response === "undefined" ? 200 : req.response.code;
  const message =
    typeof req.response === "undefined" ? "" : req.response.message;
  const data = typeof req.response === "undefined" ? {} : req.response.data;
  res.status(code || constants.HTTP_200).json({
    error: false,
    success: true,
    message: message,
    data: data,
  });
};
