import User from '../models/User';
import bluebird from 'bluebird';

export function init(){
  bluebird.coroutine(function *() {
    /**
     * Initializing users
     */
    yield User.remove({});
    yield new User({username: 'admin', password: 'admin123', passwordConfirmation: 'admin123'}).save();
    yield new User({username: 'user', password: 'user123', passwordConfirmation: 'user123'}).save();

    console.log("Seeding completed");

  })().catch((err) => {
    console.log(err);
  });
}

