// module.exports = func = (req, res, next) => {
//   Promise.resolve(func(req, res, next));
// };

module.exports = (req, res, next) => {
  Promise.resolve()
    .then(() => {
      func(req, res, next);
    })
    .catch((error) => {
      next(error);
    });
};
