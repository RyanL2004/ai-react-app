// OktaProvider.jsx
import React from 'react';
import oktaConfig from '../okta-config';

const OktaProvider = ({ children }) => {
  // You don't need to create oktaAuth instance here

  return <>{children}</>;
};

export default OktaProvider;
