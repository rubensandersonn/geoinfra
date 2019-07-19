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
      <div class="site-section bg-light" id="press-section">
        <div class="container">
          <div class="row">
            <div class="col-lg-4 mb-5 mb-lg-0">
              <div class="block-heading-1">
                <span>Sobre O Projeto</span>
                <h2>GEOINFRA</h2>
              </div>
            </div>
            <div class="col-lg-8">
              <ul class="list-unstyled">
                <li class="mb-4">
                  <h2 class="h4">
                    <a href="press-single.html" class="text-black">
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
                <li class="mb-4">
                  <h2 class="h4">
                    <a href="press-single.html" class="text-black">
                      Objetivo
                    </a>
                  </h2>
                  <span class="d-block text-secondary">
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
      <div class="site-section" id="team-section">
        <div class="container">
          <div class="row mb-5">
            <div class="col-12">
              <div class="block-heading-1">
                <h2>Autores</h2>
              </div>
            </div>
          </div>
          <div class="row">
            <div
              class="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div class="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    class="img-fluid rounded-circle"
                  />
                </div>
                <h3 class="font-size-20 text-black m-4">Autor</h3>
                <span class="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p class="px-3 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Atque, repellat. At, soluta. Repellendus vero,
                  consequuntur!
                </p>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div class="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    class="img-fluid rounded-circle"
                  />
                </div>
                <h3 class="font-size-20 text-black m-4">Autor</h3>
                <span class="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p class="px-3 mb-3">
                  Lorem ipsum dolor sit amet, consectetur adipisicing
                  elit. Atque, repellat. At, soluta. Repellendus vero,
                  consequuntur!
                </p>
              </div>
            </div>

            <div
              class="col-lg-4 col-md-6 mb-4 mb-lg-0"
              data-aos="fade-up"
            >
              <div class="block-team-member-1 text-center rounded">
                <div style={{marginBottom: 15}}>
                  <img
                    src={require("../utils/images/avatar.png")}
                    alt="Image"
                    class="img-fluid rounded-circle"
                  />
                </div>
                <h3 class="font-size-20 text-black m-4">Autor</h3>
                <span class="d-block font-gray-5 letter-spacing-1 text-uppercase font-size-12 mb-3">
                  Cargo
                </span>
                <p class="px-3 mb-3">
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
        class="site-section bg-light block-13"
        id="testimonials-section"
        data-aos="fade"
      >
        <div class="container">
          <div class="text-center mb-5">
            <div class="block-heading-1">
              <h2>Agradecimentos</h2>
            </div>
          </div>

          <div class="row owl-carousel nonloop-block-13">
            <div>
              <div class="block-testimony-1 text-center rounded border m-2">
                {/* <blockquote class="mb-4">
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
                  src={require("../utils/images/avatar.png")}
                  alt="Image"
                  class="img-fluid rounded-circle mx-auto"
                />
                <h3 class="font-size-20 text-black m-4">UFC</h3>
              </div>
            </div>

            <div>
              <div class="block-testimony-1 text-center rounded border m-2">
                {/* <blockquote class="mb-4">
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
                  src={require("../utils/images/avatar.png")}
                  alt="Image"
                  class="img-fluid rounded-circle mx-auto"
                />
                <h3 class="font-size-20 text-black m-4">MDCC</h3>
              </div>
            </div>

            <div>
              <div class="block-testimony-1 text-center rounded border m-2">
                {/* <blockquote class="mb-4">
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
                  src={require("../utils/images/avatar.png")}
                  alt="Image"
                  class="img-fluid rounded-circle mx-auto"
                />
                <h3 class="font-size-20 text-black m-4">CAPES</h3>
              </div>
            </div>

            <div>
              <div class="block-testimony-1 text-center rounded border m-2">
                {/* <blockquote class="mb-4">
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
                  src={require("../utils/images/avatar.png")}
                  alt="Image"
                  class="img-fluid rounded-circle mx-auto"
                />
                <h3 class="font-size-20 text-black m-4">CNPq</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class="site-footer" />
    </>
  );
};

//const condition = authUser => !!authUser;

//export default withAuthorization(condition)(AboutPage);
export default AboutPage;
