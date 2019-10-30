# react-lazy-import

# DEPRECATED: Please use `React.lazy` or `@loadable/component` which is a recommended solution by React team

A simple higher order component for easy code splitting.

## Features

* Supports `import()`
* Supports react-router v4
* Ability to add `<LoadingComponent />`
* Ability to Add `<ErrorComponent />`

## Quick example
```jsx
import createLazyContainer from 'react-lazy-import';

const MyComponent = createLazyContainer(() => import('./MyComponent'));

const App = () => {
  return (
    <div>
      My lazy component:
      <MyComponent />
    </div>
  );
}
```

## Complete example

```jsx
// Greeter.jsx
import React from 'react';

const Greeter = ({ name }) => (
  <div>Hello {name}, I am lazy loaded</div>
);

export default Greeter;
```


```jsx
// App.jsx
import React from 'react';
import { render } from 'react-dom';
import createLazyContainer from 'react-lazy-import';

const Loading = () => <div>Loading...</div>;
const Error = () => <div>Error!</div>;

const Greeter = createLazyContainer(() => import('./Greeter'), Loading, Error);

const App = () => {
  return (
    <div>
      My lazy component:
      <Greeter name="Jason" />
    </div>
  );
}

render(<App />, document.getElementById('app'));
```


### Usage with react-router

```jsx

import { Route, Switch } from 'react-router-dom';

const Loading: React.SFC<{}> = () => <div>Loading...</div>;
const Error: React.SFC<{}> = () => <div>Error!</div>;

const Home = createLazyContainer(() => import('./Home'), Loading, Error);
const About = createLazyContainer(() => import('./About'), Loading, Error);
const Contact = createLazyContainer(() => import('./Contact'), Loading, Error);
const NotFound = createLazyContainer(() => import('./NotFound'), Loading, Error);

class App extends React.Component {
  render () {
    return (
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/About' component={About} />
        <Route path='/Contact' component={Contact} />
        <Route component={NotFound} />
      </Switch>
    );
  }
}
```

## API

### `createLazyContainer(loader, [loadingComponent], [errorComponent])`

* `loader: () => Promise<React.ComponentClass>`

  Function returning promise which returns a React component.
* `loadingComponent` (optional)

  React component which is rendered while your component is loading.
* `errorComponent` (optional)

  React component which is rendered when loader fails to load your component
