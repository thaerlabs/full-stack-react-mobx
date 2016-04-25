/**
 * App component, mounted at '/'
 *
 * this is the main application frame, register here stores to be passed down to all subviews in `this.context.store`
 */

import React, { Component } from 'react';
import provideStore from 'decorators/provideStore';
import NotificationSystem from 'react-notification-system';
import Auth from 'stores/Auth';
import Notify from 'services/Notify';

@provideStore({
  auth: Auth
})
export default class App extends Component {

  componentDidMount() {
    Notify.init(this.refs.notificationSystem);
  }

  render() {
    return (
      <div>
        {this.props.children}
        <NotificationSystem ref="notificationSystem" />
      </div>
    );
  }
}
