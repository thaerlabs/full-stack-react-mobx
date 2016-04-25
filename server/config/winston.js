import winston from 'winston';
import config from 'nconf';

/**
 * Winston trnasports
 * @type {*[]}
 */
const winstonTransports = [
  {
    type: winston.transports.File,
    options: {
      level: 'error',
      filename: config.get('LOG_FILE_PATH'),
      logstash: true,
      maxsize: config.get('LOG_FILE_SIZE')
    }
  }
];

/**
 * Return Transport Instances
 * @returns {Array}
 */
export function getTransportsInstance() {
  return winstonTransports.map(function (t) {
    return new t.type(t.options);
  })
}

/**
 * Initialize winston config
 */
export function init(){
  winston.remove(winston.transports.Console);

  winstonTransports.forEach(function (t) {
    winston.add(t.type, t.options);
  });
}
