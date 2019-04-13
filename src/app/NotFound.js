import React from 'react';
import PropTypes from 'prop-types';

const NotFound = ({ staticContext = {} }) => {
  staticContext.status = 404;
  return <h1>Oops, nothing here!</h1>;
};

NotFound.displayName = 'NotFound';

NotFound.propTypes = {
  staticContext: PropTypes.object,
};

export default NotFound;
