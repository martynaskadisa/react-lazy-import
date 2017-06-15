import * as React from 'react';

type Loader = () => Promise<any>;

type ReactComponent = React.ComponentClass<any> | React.SFC<any> | null;

interface IState {
  Component: ReactComponent;
  ErrorComponent: ReactComponent;
  LoadingComponent: ReactComponent;
  failed: boolean;
}

const createLazyComponentClass = (
  loader: Loader,
  loadingComponent?: ReactComponent,
  errorComponent?: ReactComponent
) => (
  class extends React.PureComponent<{}, IState> {
    public state: IState = {
        Component: null,
        ErrorComponent: errorComponent || null,
        LoadingComponent: loadingComponent || null,
        failed: false
    };

    public componentWillMount () {
      if (!this.state.Component) {
        loader()
          .then(module => module.default)
          .then((Component: ReactComponent) => this.setState({ Component }))
          .catch(err => {
            this.setState({ failed: true });
          });
      }
    }

    public render () {
      const { Component, LoadingComponent, ErrorComponent, failed } = this.state;

      if (Component) {

        /**
         * Render our component with pass through props
         */
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
  } as React.ComponentClass<any>
);

export default createLazyComponentClass;
