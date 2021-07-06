// Initializes the `prediction` service on path `/prediction`
const { Prediction } = require('./prediction.class');
const hooks = require('./prediction.hooks');

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/prediction', new Prediction(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('prediction');

  service.hooks(hooks);
};
