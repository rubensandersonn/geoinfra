import React, {useState} from "react";
import Modall from "../Components/Modall";

import "../utils/fonts/flaticon/font/flaticon.css";

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
    <>
      <div className="site-section bg-light" id="press-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-5 mb-lg-0">
              <div className="block-heading-1">
                <span>Sobre O Projeto</span>
                <h2>GEOINFRA</h2>
              </div>
            </div>
            <div className="col-lg-8">
              <ul className="list-unstyled">
                <li className="mb-4">
                  <h2 className="h4">
                    <a
                      href="press-single.html"
                      className="text-black"
                    >
                      O que é?
                    </a>
                  </h2>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Pariatur dolores voluptas
                    obcaecati quo consequuntur mollitia facilis,
                    perferendis molestias commodi adipisci.
                  </p>
                </li>
                <li className="mb-4">
                  <h2 className="h4">
                    <a
                      href="press-single.html"
                      className="text-black"
                    >
                      Objetivo
                    </a>
                  </h2>
                  <span className="d-block text-secondary">
                    subtitulo
                  </span>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Pariatur dolores voluptas
                    obcaecati quo consequuntur mollitia facilis,
                    perferendis molestias commodi adipisci.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="site-section" id="team-section">
        <div className="container">
          <div className="row mb-5">
            <div className="col-12">
              <div className="block-heading-1">
                <h2>Autores</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div
              className="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div className="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">Autor</h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p className="px-3 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Atque, repellat. At, soluta. Repellendus vero,
                  consequuntur!
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div className="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">Autor</h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p className="px-3 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Atque, repellat. At, soluta. Repellendus vero,
                  consequuntur!
                </p>
              </div>
            </div>

            <div
              className="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div className="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">Autor</h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p className="px-3 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Atque, repellat. At, soluta. Repellendus vero,
                  consequuntur!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="site-section bg-light block-13"
        id="testimonials-section"
        data-aos="fade"
      >
        <div className="container">
          <div className="text-center mb-5">
            <div className="block-heading-1">
              <h2>Agradecimentos</h2>
            </div>
          </div>

          <div className="align-items-center justify-content-center row owl-carousel nonloop-block-13">
            <div>
              <div
                style={{minHeight: 200, minWidth: 180}}
                className="block-testimony-1 text-center rounded border m-2"
              >
                {/* <blockquote className="mb-4">
                  <p>
                    &ldquo;Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Dolorem, fugit excepturi
                    sapiente voluptatum nulla odio quaerat quibusdam
                    tempore similique doloremque veritatis et
                    cupiditate, maiores cumque repudiandae explicabo
                    tempora deserunt consequuntur?&rdquo;
                  </p>
                </blockquote> */}

                <img
                  style={{width: 120, maxHeight: 120}}
                  src={require("../utils/images/logos/ufc2.png")}
                  alt="Image"
                  className="img-fluid  mx-auto"
                />
                <h3 className="font-size-20 text-black m-4">UFC</h3>
              </div>
            </div>

            <div>
              <div
                style={{minHeight: 200, minWidth: 180}}
                className="block-testimony-1 text-center rounded border m-2"
              >
                {/* <blockquote className="mb-4">
                  <p>
                    &ldquo;Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Dolorem, fugit excepturi
                    sapiente voluptatum nulla odio quaerat quibusdam
                    tempore similique doloremque veritatis et
                    cupiditate, maiores cumque repudiandae explicabo
                    tempora deserunt consequuntur?&rdquo;
                  </p>
                </blockquote> */}

                <img
                  style={{width: 120, maxHeight: 120}}
                  src={require("../utils/images/logos/petran.png")}
                  alt="Image"
                  className="img-fluid  mx-auto"
                />
                <h3 className="font-size-20 text-black m-4">
                  PETRAN
                </h3>
              </div>
            </div>

            <div>
              <div
                style={{minHeight: 200, minWidth: 180}}
                className="block-testimony-1 text-center rounded border m-2"
              >
                {/* <blockquote className="mb-4">
                  <p>
                    &ldquo;Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Dolorem, fugit excepturi
                    sapiente voluptatum nulla odio quaerat quibusdam
                    tempore similique doloremque veritatis et
                    cupiditate, maiores cumque repudiandae explicabo
                    tempora deserunt consequuntur?&rdquo;
                  </p>
                </blockquote> */}

                <img
                  style={{width: 120, maxHeight: 120}}
                  src={require("../utils/images/logos/capes.jpg")}
                  alt="Image"
                  className="img-fluid  mx-auto"
                />
                <h3 className="font-size-20 text-black m-4">CAPES</h3>
              </div>
            </div>

            <div>
              <div
                style={{minHeight: 200, minWidth: 180}}
                className="block-testimony-1 text-center rounded border m-2"
              >
                {/* <blockquote className="mb-4">
                  <p>
                    &ldquo;Lorem ipsum dolor sit amet, consectetur
                    adipisicing elit. Dolorem, fugit excepturi
                    sapiente voluptatum nulla odio quaerat quibusdam
                    tempore similique doloremque veritatis et
                    cupiditate, maiores cumque repudiandae explicabo
                    tempora deserunt consequuntur?&rdquo;
                  </p>
                </blockquote> */}

                <img
                  style={{width: 120, maxHeight: 120}}
                  src={require("../utils/images/logos/funcap.png")}
                  alt="Image"
                  className="img-fluid  mx-auto"
                />
                <h3 className="font-size-20 text-black m-4">
                  FUNCAP
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="site-footer align-items-center">
        <div className="text-center">
          <p>
            Software Desenvolvido por:
            <a
              className="ml-2"
              href="http://rubens-portfolio.herokuapp.com/"
              target="_blank"
            >
              RUBENS SILVA
            </a>{" "}
          </p>
        </div>
      </footer>
    </>
  );
};

//const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AboutPage);
export default AboutPage;
