const catchAsyncErrors = (func = (req, res, next) => {
  return Promise.resolve(func(req, res, next)).catch(next);
});

module.exports = catchAsyncErrors;
// module.exports = (req, res, next) => {
//   Promise.resolve()
//     .then(() => {
//       func(req, res, next);
//     })
//     .catch((error) => {
//       next(error);
//     });
// };
