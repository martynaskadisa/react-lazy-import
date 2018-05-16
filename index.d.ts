import * as React from 'react';

type ReactComponent<P> = React.ComponentClass<P> | React.StatelessComponent<P> | null;

declare function createLazyContainer<P> (
  loader: () => Promise<any>, 
  loadingComponent?: ReactComponent<any>, 
  errorComponent?: ReactComponent<any>,
  onLoad?: () => void
): React.ComponentClass<P>;

export default createLazyContainer;
