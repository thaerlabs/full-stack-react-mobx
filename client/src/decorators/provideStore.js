import React, { Component } from 'react';

/**
 * This decorator is to be used in the Root component to inject in the `context` the designated stores
 *
 * @example
 *
 * @provideStore({
 *   auth: Auth,
 *   hotel: Hotel,
 *   language: Language
 * })
 * export default class App extends Component {
 *   render() {
 *     return (
 *       <div class="root">{this.props.children}</div>
 *     );
 *   }
 * }
 *
 * @param store
 * @returns {Function}
 */
function provideStore(store) {
  return function (DecoratedComponent) {
    return class extends Component {
      static childContextTypes = {
        store: React.PropTypes.object
      };

      getChildContext() {
        return {
          store: store
        };
      }

      render() {
        return (
          <DecoratedComponent {...this.props} />
        );
      }
    }
  }
};

export default provideStore;
