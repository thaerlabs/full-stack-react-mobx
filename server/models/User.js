import mongoose from 'mongoose';
var Schema = mongoose.Schema;
import uniqueValidator from 'mongoose-unique-validator';
import crypto from 'crypto';

var UserSchema = new Schema({
  username: {type: String, unique: true, required: true, uniqueCaseInsensitive: true},
  lastLoginAt: Date,
  registeredAt: Date,
  FirstName: {type: String},
  LastName: {type: String},
  hashedPassword: String,
  isActive: {type: Boolean, default: true},
  salt: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role',  index: true }
}, { timestamps: true });

/**
 * Virtuals
 */
UserSchema
  .virtual('password')
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashedPassword = this.encryptPassword(password);
  })
  .get(() => {
    return this._password;
  });

UserSchema.virtual('passwordConfirmation')
  .get(function () {
    return this._passwordConfirmation;
  })
  .set(function (value) {
    this._passwordConfirmation = value;
  });

/**
 * Validations
 */

// Validate empty password
UserSchema
  .path('hashedPassword')
  .validate(function (hashedPassword) {
    if (this._password || this._passwordConfirmation) {
      if (this._password.length < 5) {
        this.invalidate('password', 'Password must be at least 5 characters.');
      }
      if (this._password !== this._passwordConfirmation) {
        this.invalidate('passwordConfirmation', 'Password verification mismatch.');
      }
    }

    if (hashedPassword.length == 0) {
      this.invalidate('password', 'Password can not be blank');
    }
  }, null);

/**
 * Methods
 */
UserSchema.methods = {
  /**
   * Authenticate - check if the passwords are the same
   *
   * @param {String} plainText
   * @return {Boolean}
   * @api public
   */
  authenticate: function (plainText) {
    return this.encryptPassword(plainText) === this.hashedPassword;
  },

  /**
   * Make salt
   *
   * @return {String}
   * @api public
   */
  makeSalt: function () {
    return crypto.randomBytes(16).toString('base64');
  },

  /**
   * Encrypt password
   *
   * @param {String} password
   * @return {String}
   * @api public
   */
  encryptPassword: function (password) {
    if (!password || !this.salt) return '';
    var salt = new Buffer(this.salt, 'base64');
    return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
  }
};

UserSchema.plugin(uniqueValidator, {message: 'User already exist for the provided {PATH}.'});
module.exports = mongoose.model('User', UserSchema);
