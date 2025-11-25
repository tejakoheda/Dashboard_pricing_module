import Keycloak from 'keycloak-js';
 
// setup
const keycloak = new Keycloak({
  url: 'http://localhost:8080',  
  realm: 'react-app-realm',     
  clientId: 'react-client', 
});
 
export default keycloak;