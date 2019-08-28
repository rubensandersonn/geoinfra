/**
 * @author RUBENS ANDERSON DE SOUSA SILVA
 * @version 1.0
 * contact: rubensanderson.cc@gmail.com
 * site author: rubens-portfolio.herokuapp.com
 */
import React from "react";

import "../utils/fonts/flaticon/font/flaticon.css";

//import { withAuthorization } from '../Session';

const AboutPage = () => {
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
                  <h2 className="h4">O que é?</h2>

                  <p>
                    Aplicação Baseada em geoprocessamento para web com
                    a finalidade de disponibilizar na internet o banco
                    de dados integrado das infraestruturas urbanas
                    assim como os dados técnicos de planejamento de
                    futuras intervenções nos subsistemas urbanos
                  </p>
                </li>
                <li className="mb-4">
                  <h2 className="h4">Objetivo</h2>

                  <p>
                    Contribuir para o desenvolvimento e
                    aperfeiçoamento de sistemas de gerência de
                    infraestrutura urbana, apresentando um método para
                    compatibilizar, integrar e gerenciar as diferentes
                    redes dos subsistemas urbanos de forma eficaz,
                    rápida e de baixo custo.
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
                    style={{maxHeight: 180}}
                    src={require("../utils/images/persons/ygor.jpg")}
                    alt="Ygor"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">
                  Ygor de Carvalho Alencar
                </h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Autor
                </span>
                <p className="px-3 mb-3">
                  Mestrando em Engenharia dos Transportes da
                  Universidade Federal do Ceará
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
                    style={{maxHeight: 180}}
                    src={require("../utils/images/persons/uchoa.jpg")}
                    alt="Carlos Uchoa"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">
                  D.Sc. Carlos Augusto Uchôa da Silva
                </h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Orientador
                </span>
                <p className="px-3 mb-3">
                  Professor Associado no Centro de Tecnologia da
                  Universidade Federal do Ceará
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
                    style={{maxHeight: 180}}
                    src={require("../utils/images/persons/rubens.jpg")}
                    alt="Rubens"
                    className="img-fluid rounded-circle"
                  />
                </div>
                <h3 className="font-size-20 text-black m-4">
                  Rubens Anderson de Sousa Silva
                </h3>
                <span className="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Co-autor
                </span>
                <p className="px-3 mb-3">
                  Mestrando em Ciência da Computação da Universidade
                  Federal do Ceará
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
                  alt="ufc"
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
                  alt="petran"
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
                  alt="capes"
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
                  alt="funcap"
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

      <footer
        style={{minHeight: 200}}
        className="site-footer align-items-center p-4"
      >
        <div
          style={{minHeight: 100}}
          className="mt-4 text-center align-items-center justify-content-center"
        >
          Este apliativo foi desenvolvido com objetivos científicos no
          programa de pós graduação em Engenharia dos Transportes da
          Universidade Federal do Ceará. Os autores não se
          responsabilizam pelas informações apresentadas na aplicação
        </div>
        <div className="text-center">
          <p>
            Software Desenvolvido por: YGOR CARVALHO | RUBENS SILVA |
            Orientador: Carlos Augusto Uchôa da Silva
          </p>
        </div>
      </footer>
    </>
  );
};

//const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AboutPage);
export default AboutPage;
