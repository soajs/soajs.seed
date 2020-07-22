const mydomain = 'imateco.com';
const mydomainAPI = 'api.';
const protocol = window.location.protocol;
const mydomainport = (protocol === 'https:') ? 443 : 80;


export const environment = {
  production: true,
  apiEndpoint: protocol + '//'+ mydomainAPI + mydomain + ':' + mydomainport,
  tenant: '0a206663c86719a4e3d97abe72c169355d629d828a4b94c3796ac5ad1edf6ee40b2623f3511b998d23434d561d7fefdaf49da617dfd3a24b77b6fe9a252a94267103d8de35d471be5d3ef0fa3d8f8f0e8dce78b9054b75c6fb8d505066275347'
};
