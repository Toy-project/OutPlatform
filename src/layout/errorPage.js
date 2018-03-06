import React from 'react';
import { ErrorPage } from 'components/';
const ErrorPageLayout = ({ match }) => (
  <div>
    <ErrorPage type={match.params.type} />
  </div>
)

ErrorPageLayout.propTypes = {
};

export default ErrorPageLayout;
