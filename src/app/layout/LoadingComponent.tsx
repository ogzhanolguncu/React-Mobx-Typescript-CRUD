import React from 'react';
import { Loader } from 'semantic-ui-react';

const LoadingComponent: React.FC<{ inverted?: boolean; content?: string }> = ({
  content
}) => {
  return (
        <Loader active content={content} />
  );
};

export default LoadingComponent;