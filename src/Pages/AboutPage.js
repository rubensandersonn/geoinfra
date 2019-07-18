import React, {useState} from "react";
import Modall from "../Components/Modall";

//import { withAuthorization } from '../Session';

const AboutPage = () => {
  //const [visible, setVisible] = useState(false);

  const content = () => (
    <div>
      <h1>Sobre este projeto</h1>
      <p>Autores</p>
      <p>Descrição</p>
      <p>Agradecimentos</p>
    </div>
  );

  return (
    <div>
      <Modall buttonValue={"Click me NOW"} content={content} />
    </div>
  );
};

//const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AboutPage);
export default AboutPage;
