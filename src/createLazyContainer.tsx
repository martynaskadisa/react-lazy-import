import * as React from 'react';

type Loader = () => Promise<any>;

type ReactComponent<P> = React.ComponentClass<P> | React.SFC<P> | null;

interface IState<P> {
  Component: ReactComponent<P>;
  ErrorComponent: ReactComponent<any>;
  LoadingComponent: ReactComponent<any>;
  failed: boolean;
}

function createLazyContainer<P> (
  loader: Loader,
  loadingComponent?: ReactComponent<{}>,
  errorComponent?: ReactComponent<{}>
) {
  return class extends React.Component<{}, IState<P>> {
    public static displayName = 'LazyContainer';
    public state: IState<P> = {
        Component: null,
        ErrorComponent: errorComponent || null,
        LoadingComponent: loadingComponent || null,
        failed: false
    };

    public componentWillMount () {
      if (!this.state.Component) {
        loader()
          .then(module => module.default || module)
          .then((Component: ReactComponent<P>) => this.setState({ Component }))
          .catch(err => {
            this.setState({ failed: true });
          });
      }
    }

    public render () {
      const { Component, LoadingComponent, ErrorComponent, failed } = this.state;

      if (Component) {
        return (
          <Component {...this.props} />
        );
      }

      if (failed && ErrorComponent) {
        return <ErrorComponent />;
      }

      if (LoadingComponent) {
        return <LoadingComponent />;
      }

      return null;
    }
  };
}

export default createLazyContainer;
