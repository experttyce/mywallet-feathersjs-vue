const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const hooks = require('feathers-authentication-hooks');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      })
    ],
    get: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      })
    ],
    create: [
      hooks.associateCurrentUser({
        as: 'userId'
      })
    ],
    update: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      })
    ],
    patch: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      })
    ],
    remove: [
      hooks.restrictToOwner({
        ownerField: 'userId'
      })
    ]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
