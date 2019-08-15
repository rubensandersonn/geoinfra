import React from "react";

/**
 * Aqui eu posso colocar os niveis de autenticação retornando Link rota certa
 */
const Logos = () => (
  <div className="border rounded">
    <img
      alt="ufc"
      style={{
        maxHeight: 50,
        minWidth: 100,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5
      }}
      src={require("../../utils/images/logos/ufc3.png")}
    />
    <img
      alt="petran"
      style={{
        maxHeight: 50,
        minWidth: 100,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5
      }}
      src={require("../../utils/images/logos/petran.png")}
    />
    <img
      alt="capes"
      style={{
        maxHeight: 50,
        minWidth: 100,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5
      }}
      src={require("../../utils/images/logos/capes.jpg")}
    />
    <img
      alt="funcap"
      style={{
        maxHeight: 50,
        minWidth: 100,
        marginLeft: 30,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 5
      }}
      src={require("../../utils/images/logos/funcap.png")}
    />
  </div>
);

export default Logos;
