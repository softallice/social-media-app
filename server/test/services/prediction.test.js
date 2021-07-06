const assert = require('assert');
const app = require('../../src/app');

describe('\'prediction\' service', () => {
  it('registered the service', () => {
    const service = app.service('prediction');

    assert.ok(service, 'Registered the service');
  });
});
