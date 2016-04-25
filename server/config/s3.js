import moment from 'moment';
import crypto from 'crypto';

var s3Config = {
  bucket: process.env.AWS_BUCKET,
  region: 's3',
  keyStart: process.env.AWS_BUCKET_ASSETS_SUBFOLDER,
  acl: 'public-read',
  accessKeyId: process.env.AWS_ACCESS_KEY
};

s3Config.policy = {
  expiration: moment().add(1, 'days').toISOString(),
  conditions: [
    {bucket: s3Config.bucket},
    {acl: s3Config.acl},
    {success_action_status: '201'},
    {'x-requested-with': 'xhr'},
    ['starts-with', '$key', s3Config.keyStart],
    ['starts-with', '$Content-Type', '']
  ]
};
s3Config.policy = new Buffer(JSON.stringify(s3Config.policy)).toString('base64');

var hash = crypto.createHmac('sha1', process.env.AWS_SECRET_KEY);
s3Config.signature = new Buffer(hash.update(s3Config.policy).digest()).toString('base64');

module.exports.s3Config = s3Config;
