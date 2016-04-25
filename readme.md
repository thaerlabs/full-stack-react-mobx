# Full Stack Node + React-Mobx


## Sructure guide

```
├── actions
├── stores
├── views
│   ├── Login
│   │   └── Login.js
│   └── Admin
│       ├── lib
│       │   └── components
│       │       └── Avatar.js
                └── Sidebar.js
│       ├── views
│       │   ├── Hotels
│       │   │   ├── views
│       │   │   │   ├── List
│       │   │   │   │   └── List.js
│       │   │   │   ├── Create
│       │   │   │   │   └── Create.js
│       │   │   │   ├── Edit
│       │   │   │   │   └── Edit.js
│       │   │   └── Handler.js
│       │   └── Dashboard
│       │       ├── components
│       │       │   ├── Stream.js
│       │       │   ├── StreamItem.js
│       │       │   ├── TodoItem.js
│       │       │   └── TodoList.js
│       │       └── Dashboard.js
│       └── Admin.js
└── index.js

```

## State management

Application state management is done using [mobx](http://mobxjs.github.io/mobx/), MobX is one of the least obtrusive libraries you can use for state management.

`stores/appStore.js`

```javascript
import {observable} from 'mobx';

var appStore = observable({
    timer: 0,
    resetTimer: function() { this.timer = 0 }
});
```

```javascript
import {observer} from 'mobx-react';
import appStore from './stores/appStore';

@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset}>
                Seconds passed: {this.props.appStore.timer}
            </button>);
    }

    onReset = () => {
        this.props.appStore.resetTimer();
    }
};

setInterval(() => { appStore.timer++ }, 1000); //change state as you change objects, no flux/action creators/reducers loops. Profit!

React.render(<TimerView appStore={appStore} />, document.body);
```

## Doing http requests

[axios](https://github.com/mzabriskie/axios). Ultimately axios is an effort to provide a standalone $http-like service for use outside of Angular.

```javascript
import { get, post } from 'axios';

class Auth {
  login(username, password) {
    return post('/api/auth/login', {
      username, password
    })
    .then((res) => {
      this.user = res.data;
      return res;
    });
  }
}

```

## Routing in components

```javascript
class Admin extends Component {

  handleLogout() {
    const { auth } = this.props.store;

    auth.logout().then(() => {
      this.context.router.push('login'); // take the router from this.context
    });
  }


  renderTopNavBar() {
    return (
      <div className="pim-admin__top-navbar">
        <Navbar fluid>
          <Navbar.Header>
            <Navbar.Brand>
              Hotel CMS
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Nav pullRight>
            <NavItem onClick={this.handleLogout.bind(this)}>Logout</NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

// Declare the router as a dependency in the context
Admin.contextTypes = {
  router: React.PropTypes.object.isRequired
};
```
