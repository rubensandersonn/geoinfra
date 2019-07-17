import React from 'react';

//import { withAuthorization } from '../Session';

const AboutPage = () => (
  <div className="container mt-4">
    <h1>Sobre este projeto</h1>
    <p>Autores</p>
    <p>Descrição</p>
    <p>Agradecimentos</p>
  </div>
);

//const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AboutPage);
export default AboutPage;