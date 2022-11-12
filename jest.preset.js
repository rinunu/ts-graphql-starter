const nxPreset = require('@nrwl/jest/preset').default;

/** @type {import('ts-jest').InitialOptionsTsJest} */
module.exports = {
  ...nxPreset,
  maxWorkers: 1,
};
