const mydomain = 'localhost';
const mydomainAPI = '';
const protocol = window.location.protocol;
const mydomainport = (protocol === 'https:') ? 4000 : 4000;


export const environment = {
  production: true,
  apiEndpoint: protocol + '//'+ mydomainAPI + mydomain + ':' + mydomainport,
  tenant: '3d90163cf9d6b3076ad26aa5ed58556348069258e5c6c941ee0f18448b570ad1c5c790e2d2a1989680c55f4904e2005ff5f8e71606e4aa641e67882f4210ebbc5460ff305dcb36e6ec2a2299cf0448ef60b9e38f41950ec251c1cf41f05f3ce9'
};
