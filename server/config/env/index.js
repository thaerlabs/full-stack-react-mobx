'use strict';

import nconf from 'nconf';
import fs from 'fs';
import path from 'path'

/**
 * Initialize Configurations
 */
export function init() {
  /**
   * Loading config from environment
   */
  nconf.env();

  /**
   * Verify Config file exist
   */
  const configFilePath = path.join(__dirname, process.env.NODE_ENV + '.json');
  try {
    fs.accessSync(configFilePath, fs.F_OK);
  }
  catch (err) {
    console.log("Configuration file does not exist for current environment");
    process.exit(1);
  }

  /**
   * Loading default and environment specific config
   */
  nconf
    .file({file: configFilePath})
    .defaults(require('./default.json'));
}


