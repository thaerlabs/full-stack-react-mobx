import singleton from 'singleton';

const defaults = {
  position: 'tc'
};

class Notify extends singleton {

  notificationSystem = null;

  init(notificationSystem) {
    this.notificationSystem = notificationSystem;
  }

  addNotification(notification) {
    this.notificationSystem.addNotification(Object.assign(notification, defaults));
  }

  removeNotification(notification) {
    this.notificationSystem.removeNotification(Object.assign(notification, defaults));
  }
}

export default Notify.get();
