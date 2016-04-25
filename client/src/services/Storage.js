import Basil from 'basil.js';

const namespace = 'pim';

export default new Basil({
  namespace
});

export const cookieStorage = new Basil({
  namespace,
  storages: ['cookie']
});

export const localStorage = new Basil({
  namespace,
  storages: ['local']
});
