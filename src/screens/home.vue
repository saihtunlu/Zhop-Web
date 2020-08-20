<template>
  <div class="home-page row">
    <div class="col-lg-12 mb-2" style="padding:0px 15px !important;">
      <agile :initial-slide="3" :dots="false" :autoplay="true" id="homeBanner">
        <div class="slide" v-for="(slide, n) in events" :key="n">
          <div
            class="bannerSlider light-shadow big-radius"
            :style="`background:url('https://zhop.admin.saihtunlu.me${slide.image}')`"
          >
            <h3>{{ slide.title }}</h3>
          </div>
        </div>
        <template slot="prevButton">
          <vs-icon
            icon="bx-chevron-left"
            style="font-size:22px !important;"
            size="22px"
            class="bx"
            icon-pack="feather"
          />
        </template>
        <template slot="nextButton">
          <vs-icon
            icon="bx-chevron-right"
            style="font-size:22px !important;"
            size="22px"
            class="pointer"
            icon-pack="bx"
          />
        </template>
      </agile>
      <ScrollBtn class="sm-hide md-hide" />
    </div>
    <div class="col-lg-12 base-padding mt-base lg-80" id="section2">
      <svg
        class="svgBg"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="900"
        height="957.156"
        viewBox="0 0 1050.651 957.156"
      >
        <defs>
          <radialGradient
            id="radial-gradient"
            cx="795.024"
            cy="27.237"
            r="1441.224"
            gradientTransform="translate(68.06 -2.134) scale(0.911 0.911)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#6A53D6" stop-opacity="0" />
            <stop offset="1" stop-color="#7764d1" />
          </radialGradient>
        </defs>
        <path
          id="Path_751"
          data-name="Path 751"
          d="M1049.675,449.08c-30.256-53.492-74.739-96.853-122.132-135.212C884.013,278.634,843.98,263.1,815.9,210.049c-18.826-35.548-32.718-74.136-57.388-105.907C706.591,37.291,616.076,45.537,542.632,65.5,347.7,118.5,176.536,253.694,79.843,431.057,54.853,476.89,34.393,526.4,30.741,578.482S42.132,685.734,79.6,722.085c46.615,45.225,117.208,53.781,173.346,86.454,57,33.171,96.166,89.309,144.306,134.39s116.346,80.8,178.5,58.754C628.065,983.12,658.6,930.426,698.02,891.35,760.3,829.616,846.97,800.9,924.085,759.143s152.4-109.066,156.594-196.661C1082.582,522.812,1069.233,483.647,1049.675,449.08Z"
          transform="translate(-30.208 -51.222)"
          opacity="0.4"
          fill="url(#radial-gradient)"
        />
      </svg>
      <p
        class="transparent_text lg-text-center md-text-center text-bolder header upper"
      >Top Categories</p>
      <div class="row mt-medium">
        <div class="col-3" v-for="category1 in categories" :key="category1.label">
          <div
            class="catCard"
            @click="
              $router.push({
                name: 'Shop',
                query: { target: 'category', cid: category1.id },
              })
            "
          >
            <div class="overflow-hidden" style="width:100%">
              <img v-lazy="`https://zhop.admin.saihtunlu.me${category1.image}`" alt=" " />
            </div>
            <p class="flex-center">
              <vs-icon :icon="`bx-${category1.icon}`" class="sm-hide mr-2" icon-pack="bx" />
              {{ category1.label }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="col-lg-12 base-padding lg-80 mt-base" id="section3">
      <svg
        class="svgBg2 sm-hide"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="900"
        height="957.156"
        viewBox="0 0 1050.651 957.156"
      >
        <defs>
          <radialGradient
            id="radial-gradient"
            cx="795.024"
            cy="27.237"
            r="1441.224"
            gradientTransform="translate(68.06 -2.134) scale(0.911 0.911)"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stop-color="#6A53D6" stop-opacity="0" />
            <stop offset="1" stop-color="#7764d1" />
          </radialGradient>
        </defs>
        <path
          id="Path_751"
          data-name="Path 751"
          d="M1049.675,449.08c-30.256-53.492-74.739-96.853-122.132-135.212C884.013,278.634,843.98,263.1,815.9,210.049c-18.826-35.548-32.718-74.136-57.388-105.907C706.591,37.291,616.076,45.537,542.632,65.5,347.7,118.5,176.536,253.694,79.843,431.057,54.853,476.89,34.393,526.4,30.741,578.482S42.132,685.734,79.6,722.085c46.615,45.225,117.208,53.781,173.346,86.454,57,33.171,96.166,89.309,144.306,134.39s116.346,80.8,178.5,58.754C628.065,983.12,658.6,930.426,698.02,891.35,760.3,829.616,846.97,800.9,924.085,759.143s152.4-109.066,156.594-196.661C1082.582,522.812,1069.233,483.647,1049.675,449.08Z"
          transform="translate(-30.208 -51.222)"
          opacity="0.4"
          fill="url(#radial-gradient)"
        />
      </svg>
      <p
        class="transparent_text sm-hide md-text-center text-bolder lg-text-center header upper"
      >What's new</p>
      <div class="flex-center tabbar mt-medium mb-3">
        <a
          class="navbar-item nav_animated mr-3"
          :class="{ 'is-active-item': productType == 'featured' }"
          @click="
            () => {
              productType = 'featured';
              changeProducts();
            }
          "
        >
          <vs-icon icon="bx-star sm-hide" class="mr-2" icon-pack="bx" />Featured
          Products
        </a>
        <a
          class="navbar-item nav_animated mr-3"
          :class="{ 'is-active-item': productType == 'sellProduct' }"
          @click="
            () => {
              productType = 'sellProduct';
              changeProducts();
            }
          "
        >
          <vs-icon icon="bx-bar-chart sm-hide" class="mr-2" icon-pack="bx" />Top Sell
          Products
        </a>
        <a
          class="navbar-item nav_animated mr-3"
          :class="{ 'is-active-item': productType == 'newArrival' }"
          @click="
            () => {
              productType = 'newArrival';
              changeProducts();
            }
          "
        >
          <vs-icon icon="bx-gift sm-hide" class="mr-2" icon-pack="bx" />New Arrivals
        </a>
        <a
          class="navbar-item nav_animated mr-3"
          :class="{ 'is-active-item': productType == 'discount' }"
          @click="
            () => {
              productType = 'discount';
              changeProducts();
            }
          "
        >
          <vs-icon icon="bxs-discount sm-hide" class="mr-2" icon-pack="bx" />Discounts
        </a>
      </div>
      <fade-transition class="row mt-3 sm-padding" group>
        <div class="col-lg-3 col-md-4 col-sm-6" v-for="product in products" :key="product.title">
          <Card :product="product" />
        </div>
      </fade-transition>
      <div class="flex-center mt-3" style="width:100%">
        <vs-button
          color="primary"
          class="mb-4"
          icon-pack="bx"
          icon="bx-chevron-right"
          type="filled"
          icon-after
          @click="
            $router.push({
              name: 'Shop',
              query: { target: target },
            })
          "
        >View More</vs-button>
      </div>
    </div>

    <div class="col-12 base-padding big-radius bg-theme shadow lg-80 mt-base">
      <div class="row p-5">
        <div class="col-12">
          <div class="header transparent_text upper text-center text-bold mb-3">How To Use</div>
        </div>
        <div class="col-lg-4 flex-center">
          <div class="text-center">
            <div class="stepSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="116"
                height="148"
                viewBox="0 0 116 148"
              >
                <defs>
                  <filter
                    id="a"
                    width="218.7%"
                    height="1330.7%"
                    x="-59.3%"
                    y="-615.3%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12.457" />
                  </filter>
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <path
                    stroke="#3E3D3F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="4"
                    d="M39.353 39.456V20.633c0-10.202 8.3-18.473 18.541-18.473 10.24 0 18.543 8.271 18.543 18.473v18.823"
                  />
                  <path fill="#E0E5EC" d="M26.652 63.735h62.992V23.753H26.652z" />
                  <path fill="#CFD4DC" d="M26.652 23.753v60.733h-10.16V47.76l5.08-7.768z" />
                  <path fill="#F7BE35" d="M31.006 32.088l6.736-12.784 24.686 7.782-6.736 12.785z" />
                  <path
                    fill="#B28D32"
                    d="M55.68 39.86l6.736-12.785.5 4.117a28.108 28.108 0 0 1-3.039 16.49l-2.639 5.011-1.559-12.833z"
                  />
                  <path fill="#F57F2D" d="M32.592 44.972l-1.586-12.885 24.686 7.782 1.586 12.885z" />
                  <path fill="#CFD4DC" d="M89.136 23.753v60.733h10.16V47.76l-5.08-7.768z" />
                  <path fill="#32658F" d="M37.89 65.297l-11.894-.305-7.35-30.346 11.892.304z" />
                  <path fill="#68ACE4" d="M30.537 34.97l-11.893-.305 7.722-8.519 11.893.305z" />
                  <path fill="#3097EB" d="M45.63 56.721l-7.741 8.576-7.352-30.346 7.741-8.577z" />
                  <path fill="#A2252B" d="M63.753 59.738l-9.277-7.42 12.603-28.582 9.278 7.42z" />
                  <path fill="#F04B54" d="M76.344 31.171l-9.277-7.42 11.323-2.118 9.277 7.42z" />
                  <path
                    fill="#705BD4"
                    d="M75.126 57.586l-11.374 2.152 12.604-28.582 11.373-2.152z"
                  />
                  <path fill="#45914E" d="M49.14 63.735l-13.845-4.268 3.179-25.6 13.846 4.267z" />
                  <path fill="#61E16F" d="M52.311 38.149L38.466 33.88l12.382-3.866 13.845 4.267z" />
                  <path fill="#3AAB47" d="M61.566 59.832L49.14 63.734l3.18-25.6 12.427-3.902z" />
                  <path fill="#D25D27" d="M95.982 53.77l-5.348 13.419-25.372-5.151 5.349-13.42z" />
                  <path
                    fill="#563665"
                    d="M70.624 48.628l-5.348 13.42-.933-4.041a28.097 28.097 0 0 1 1.28-16.719l2.097-5.259 2.904 12.599z"
                  />
                  <path fill="#794D8D" d="M93.044 41.124l2.937 12.647-25.371-5.152-2.938-12.646z" />
                  <path
                    fill="#1B3554"
                    d="M10.692 108.345h62.992v6.073H10.692z"
                    filter="url(#a)"
                    transform="translate(15.706 1.528)"
                  />
                  <path
                    fill="#FFF"
                    d="M16.492 47.54h82.805v67.056a4.312 4.312 0 0 1-4.32 4.304H20.812a4.312 4.312 0 0 1-4.32-4.304V47.54z"
                  />
                  <g transform="translate(35.863 20.799)">
                    <g fill="#3E3D3F" opacity=".5">
                      <path
                        d="M7.12 56.75c.884-.382 1.755-.573 2.614-.573.841 0 1.682.183 2.523.55a2.076 2.076 0 0 1 1.248 1.903.718.718 0 0 1-1.025.649c-.915-.433-1.836-.649-2.765-.649-.933 0-1.867.218-2.8.655a.724.724 0 0 1-1.03-.655c0-.817.485-1.556 1.235-1.88zM33.028 56.75c.884-.382 1.755-.573 2.614-.573.841 0 1.682.183 2.523.55a2.076 2.076 0 0 1 1.248 1.903.718.718 0 0 1-1.025.649c-.914-.433-1.836-.649-2.765-.649-.933 0-1.867.218-2.8.655a.724.724 0 0 1-1.03-.655c0-.817.485-1.556 1.235-1.88zM22.649 71.87c4.489 0 8.128-2.614 8.128-7.086-8.128-.026-9.877.13-16.256 0 0 4.472 3.639 7.086 8.128 7.086z"
                      />
                    </g>
                    <ellipse
                      cx="3.853"
                      cy="37.452"
                      fill="#1B3554"
                      opacity=".149"
                      rx="3.048"
                      ry="3.037"
                    />
                    <ellipse
                      cx="40.937"
                      cy="37.452"
                      fill="#1B3554"
                      opacity=".149"
                      rx="3.048"
                      ry="3.037"
                    />
                    <path
                      fill-rule="nonzero"
                      stroke="#3E3D3F"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="4"
                      d="M3.853 37.296V18.473C3.853 8.27 12.154 0 22.395 0c10.24 0 18.542 8.27 18.542 18.473v18.823"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div class="flex-center">
              <div class="transparent_text header text-bold mr-3">1</div>
              <p>Add Products To Bag</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 flex-center">
          <div class="text-center">
            <div class="stepSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="124"
                height="118"
                viewBox="0 0 124 118"
              >
                <defs>
                  <filter
                    id="a"
                    width="198.8%"
                    height="810.6%"
                    x="-49.4%"
                    y="-355.3%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12.457" />
                  </filter>
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#FFF"
                    d="M87.702 6.37a6.002 6.002 0 1 1-12.005-.001 6.002 6.002 0 0 1 12.005 0"
                  />
                  <path
                    fill="#1B3554"
                    d="M19.57 87.464l-7.055-7.292c-.105-.108.192-.215.749-.272l18.635-1.905a8.928 8.928 0 0 1 1.223-.031l22.986.952c.431.017.886.005 1.26-.036l15.376-1.666c.905-.097 2.118-.022 2.417.152l12.938 7.478c.19.11-.054.227-.607.294l-14.157 1.698a8.697 8.697 0 0 1-1.326.043L45.08 85.752a9.135 9.135 0 0 0-1.12.021L21.887 87.66c-.971.083-2.143-.016-2.318-.196"
                    filter="url(#a)"
                    transform="translate(11.5 -.316)"
                  />
                  <path
                    fill="#F1F2F7"
                    d="M21.277 91.529l-8.941-55.196a2.035 2.035 0 0 1 .949-2.063l23.617-14.417a2.038 2.038 0 0 1 1.55-.239l29.133 7.205a2.039 2.039 0 0 0 1.595-.267l19.49-12.61a2.036 2.036 0 0 1 3.062 1.143L108.129 71.7c.24.829-.068 1.719-.769 2.222L89.417 86.782c-.486.348-1.1.465-1.68.32L53.609 78.57a2.039 2.039 0 0 0-1.42.162L24.214 93.017a2.038 2.038 0 0 1-2.937-1.488"
                  />
                  <path
                    fill="#D8DBEA"
                    d="M19.053 37.826l-1.19-4.63a2.344 2.344 0 0 1 1.107-2.618l14.51-8.292c.115-.065.234-.12.357-.166l4.81-1.76a2.345 2.345 0 0 1 1.301-.09l10.554 2.284a2.344 2.344 0 0 1-.708 4.626l-4.643-.422a2.344 2.344 0 0 0-2.54 2.613l.428 3.563a2.344 2.344 0 0 1-1.523 2.482l-9.755 3.563a2.347 2.347 0 0 1-2.068-.228l-2.676-1.712a2.344 2.344 0 0 0-3.24.716l-.476.746c-1.1 1.73-3.736 1.312-4.248-.675M83.185 58.778l3.33 14.275c.383 1.641 2.322 2.355 3.677 1.353l11.09-8.197a2.342 2.342 0 0 0 .87-2.493L99.55 54.02a2.344 2.344 0 0 0-2.95-1.634l-11.818 3.618a2.344 2.344 0 0 0-1.597 2.774M69.503 63.506l7.606.487a2.345 2.345 0 0 1 2.11 1.714l1.477 5.34c.476 1.719-1.064 3.318-2.799 2.907l-7.529-1.783a2.344 2.344 0 0 1-1.647-1.44l-1.556-4.045c-.613-1.595.632-3.29 2.338-3.18"
                  />
                  <path
                    fill="#705BD4"
                    d="M59.404 37.819a8.185 8.185 0 1 1 0-16.37 8.185 8.185 0 0 1 0 16.37m0-25.464c-9.28-.263-17.013 7.045-17.276 16.323-.007.264-.008.528-.004.792 0 14.333 16.006 27.592 16.68 28.138a.907.907 0 0 0 1.181 0c.71-.636 16.697-15.223 16.697-28.138.175-9.28-7.206-16.945-16.487-17.119a17.316 17.316 0 0 0-.791.004"
                  />
                </g>
              </svg>
            </div>
            <div class="flex-center">
              <div class="transparent_text header text-bold mr-3">2</div>
              <p>Enter Address For Delivering</p>
            </div>
          </div>
        </div>
        <div class="col-lg-4 flex-center">
          <div class="text-center">
            <div class="stepSvg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                width="122"
                height="129"
                viewBox="0 0 122 129"
              >
                <defs>
                  <filter
                    id="a"
                    width="202.8%"
                    height="839.7%"
                    x="-51.4%"
                    y="-369.8%"
                    filterUnits="objectBoundingBox"
                  >
                    <feGaussianBlur in="SourceGraphic" stdDeviation="12.457" />
                  </filter>
                  <path
                    id="b"
                    d="M3.385.158h23.043a3.06 3.06 0 0 1 3.06 3.06v18.763a3.06 3.06 0 0 1-3.06 3.06H3.385a3.06 3.06 0 0 1-3.06-3.06V3.218a3.06 3.06 0 0 1 3.06-3.06z"
                  />
                </defs>
                <g fill="none" fill-rule="evenodd">
                  <path
                    fill="#1B3554"
                    d="M29.453 98.72l-6.778-7.004c-.1-.104.185-.208.72-.262l17.901-1.83a8.576 8.576 0 0 1 1.175-.03l22.082.914c.413.017.85.005 1.209-.034l14.772-1.6c.868-.094 2.034-.021 2.32.145l12.43 7.185c.181.105-.052.218-.583.282l-13.6 1.631a8.355 8.355 0 0 1-1.274.04l-25.868-1.082a8.775 8.775 0 0 0-1.076.02L31.679 98.91c-.932.08-2.058-.016-2.226-.19"
                    filter="url(#a)"
                    transform="translate(1.892 -.472)"
                  />
                  <path
                    fill="#F1F2F7"
                    d="M44.904 1.822c-19.707 9.045-55.646 29.1-37.842 57.543 17.803 28.444 40.76 57.263 60.034 44.48 19.275-12.784 59.528-40.982 51.352-61.856-8.175-20.873-53.836-49.211-73.544-40.167z"
                  />
                  <g transform="translate(15.892 8.528)">
                    <path fill="#17142C" d="M13.667 3.503h1.842v13.863h-1.842z" />
                    <path
                      fill="#705BD4"
                      d="M.98 9.223H15.51V1.758c0-.963-.782-1.745-1.745-1.745H.98a.745.745 0 0 0-.535 1.263l1.829 1.889a2.09 2.09 0 0 1 0 2.907L.445 7.96A.745.745 0 0 0 .98 9.223z"
                    />
                    <g transform="translate(9.175 16.515)">
                      <mask id="c" fill="#fff">
                        <use xlink:href="#b" />
                      </mask>
                      <use fill="#705BD4" xlink:href="#b" />
                      <g fill="#321ca0" mask="url(#c)">
                        <path
                          d="M24.245 18.035c-3.55.857-6.675 2.228-11.025 3.433-.456.126-.923.251-1.408.373l-.087.02c-2.376.537-4.655.834-6.639.834-3.004 0-5.266-.846-6.748-2.434a27.217 27.217 0 0 0 2.036 5.683l.539 1.099a2.574 2.574 0 0 0 2.311 1.441h2.942a27.227 27.227 0 0 0 19.966-8.718c-.207-1.187-.682-2.022-1.887-1.731M7.398 5.615c-2.44 0-4.195 2.14-4.709 5.18 3.939-.129 6.892-.643 6.892-3.04 0-1.455-.942-2.14-2.183-2.14"
                        />
                        <path
                          d="M31.13 10.58A27.228 27.228 0 0 0 6.68-4.668h-.781c-.862 0-1.666.432-2.144 1.15L2.152-1.109A27.198 27.198 0 0 0-1.06 5.534C.942 2.877 4.047 1.12 8.169 1.12c5.565 0 7.576 3.21 7.576 5.908 0 6.635-6.934 7.277-13.098 7.32.042 2.74 1.755 3.681 4.58 3.681.366 0 .756-.026 1.16-.07.845-.09 1.764-.273 2.731-.529l.096-.025c.195-.053.39-.107.59-.166.057-.016.115-.035.173-.052 6.238-1.876 11.832-6.01 15.628-5.28 1.222.236 2.192.958 2.872 1.96l.485-.729c.507-.762.57-1.735.168-2.557"
                        />
                      </g>
                    </g>
                    <circle cx="78.977" cy="63.651" r="11.541" fill="#17142C" />
                    <circle cx="78.977" cy="63.651" r="6.609" fill="#FFF" />
                    <circle cx="33.17" cy="63.651" r="11.541" fill="#17142C" />
                    <circle cx="33.17" cy="63.651" r="6.609" fill="#FFF" />
                    <path
                      fill="#321ca0"
                      d="M76.51 61.283h14.216c2.3 0 3.848-2.383 2.88-4.47-1.762-3.801-6.218-8.649-17.49-8.649l.394 13.12z"
                    />
                    <path
                      fill="#705BD4"
                      d="M70.848 18.087c-.67-1.34-1.952-2.285-3.438-2.482-2.232-.296-5.395-.17-6.923 2.43-2.506 4.26 1.879 12.904 1.879 12.904s-5.305 4.51-2.653 8.394c0 0 8.576 12.584 6.912 16.538-1.274 3.03-6.514 3.132-6.514 3.132h-9.377c-3.89 0-6.67-3.826-5.4-7.502.524-1.515 1.143-3.057 1.85-4.408.595-1.138-.237-2.498-1.52-2.498H32.96c-1.75 0-3.472.495-4.927 1.468-3.007 2.01-7.689 6.226-8.883 13.5a3.075 3.075 0 0 0 3.03 3.574h52.398c3.59 0 6.262-3.374 5.37-6.851a11.24 11.24 0 0 0-.043-.165s-4.51-16.287-12.904-25.182c0 0-2.004-5.011 1.754-5.763h.808c2.219 0 3.662-2.335 2.67-4.32l-1.385-2.77z"
                    />
                    <path
                      fill="#17142C"
                      d="M48.27 41.556H29.055a1.49 1.49 0 0 0-1.49 1.49v.059a1.49 1.49 0 0 0 1.49 1.49H48.27a1.49 1.49 0 0 0 1.49-1.49v-.06a1.49 1.49 0 0 0-1.49-1.49zM61.713 21.724H55.68a1.476 1.476 0 0 1 0-2.953h6.033a1.476 1.476 0 1 1 0 2.953z"
                    />
                    <ellipse
                      cx="69.53"
                      cy="20.31"
                      fill="#FFF"
                      rx="1.182"
                      ry="3.177"
                      transform="rotate(-23.122 69.53 20.31)"
                    />
                    <path
                      fill="#321ca0"
                      d="M62.366 30.939s-5.306 4.51-2.653 8.394c0 0 8.576 12.584 6.912 16.537-.595 1.413-2.052 2.185-3.437 2.611l.001.004c16.349 0 2.596-18.713 2.596-18.713-4.19-6.011-3.42-8.833-3.42-8.833z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <div class="flex-center">
              <div class="transparent_text header text-bold mr-3">3</div>
              <p>Then We Start Delivering ;)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer class="mt-base" />
  </div>
</template>

<script>
import Footer from "../components/footer";
import ScrollBtn from "../components/ScrollBtn";
import Card from "../components/productCart";
import { mapGetters, mapState } from "vuex";
export default {
  data() {
    return {
      productType: "featured",
      products: [],
      target: "featured",
    };
  },
  created() {
    window.scrollTo(0, 0);
    this.$store.commit("setActiveIndex", this.$route.meta.index);
    this.$emit("showTab", true);
  },
  mounted() {
    this.changeProducts();
  },
  computed: {
    ...mapGetters({
      isLogged: "isLogged",
      featured: "featured",
      newArrival: "new",
      discount: "discount",
      sellProduct: "sellProduct",
    }),
    ...mapState({
      user: "user",
      events: "events",
      categories: "categories",
    }),
  },
  components: {
    Card,
    Footer,
    ScrollBtn,
  },
  methods: {
    changeProducts() {
      if (this.productType === "featured") {
        this.products = this.featured(8);
        this.target = "featured";
      }
      if (this.productType === "newArrival") {
        this.products = this.newArrival(8);
        this.target = "newArrival";
      }
      if (this.productType === "discount") {
        this.products = this.discount(8);
        this.target = "discount";
      }
      if (this.productType === "sellProduct") {
        this.products = this.sellProduct(8);
        this.target = "sellProduct";
      }
    },
    logout() {
      this.$store.dispatch("logout");
    },
  },
};
</script>

<style>
.stepSvg {
  height: 180px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.home-page {
  overflow: hidden !important;
}
.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.5;
  transform: scale(0.7);
}

div#homeBanner {
  width: calc(100% + 30px);
  margin: 0px -15px;
}
svg.svgBg {
  position: absolute;
  right: -40%;
  z-index: -1;
}
svg.svgBg2 {
  position: absolute;
  left: -40%;
  z-index: -1;
}
.bannerSlider {
  border-radius: 30px;
  margin-top: 15px;
  overflow: hidden !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-size: cover !important;
}

/* ------------------------------------------------'categories card'------------------------------------------------ */
.catCard {
  background: rgb(var(--vs-theme));
  padding: 5px;
  margin-bottom: 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
  transition: 0.3s ease all;
}
.catCard:hover img {
  transform: scale(1.1);
}
.catCard:hover {
  box-shadow: 0px 0px 0px 0px rgb(0, 0, 0, 0.2);
}
.catCard img {
  transition: 0.25s all;
  width: 100%;
  border-radius: 20px;
}
.catCard p {
  background: rgb(var(--vs-primary), 0.2);
  padding: 8px;
  border-radius: 30px;
  margin-top: 5px;
  text-align: center;
  color: rgb(var(--vs-primary));
}
.bannerSlider.big-radius {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bannerSlider.big-radius h3 {
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 5px;
  font-weight: bolder;
  background: rgb(255, 255, 255, 0.2);
  padding: 5px 10px;
  border-radius: 10px;
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {
  .tabbar a.navbar-item {
    min-width: 0px !important;
    padding: 0px !important;
    background: none !important;
    margin-bottom: 0px !important;
    clear: both;
    height: 15px !important;
    display: block;
    border-radius: 0px !important;
    overflow: hidden;
    white-space: nowrap;
  }
  .tabbar a.navbar-item.is-active-item {
    height: 15px !important;
  }
  .tabbar {
    overflow-x: scroll;
    padding-bottom: 5px;
    justify-content: flex-start !important;
  }
  div#section3 {
    margin-top: 0px !important;
  }
  .agile__actions {
    display: none !important;
  }
  .agile__dot button {
    cursor: pointer;
    width: 10px;
    display: block;
    font-size: 0;
    height: 10px !important;
    border-radius: 10px !important;
    border: 0px;
    margin-right: 5px;
    transition: 0.25s all;
    background: rgb(var(--vs-primary), 0.2);
  }
  li.agile__dot.agile__dot--current button {
    background: rgb(var(--vs-primary)) !important;
  }
  svg.svgBg2 {
    bottom: 0%;
  }
  .bannerSlider {
    width: calc(100% - 30px);
    height: 200px;
    margin-left: 15px;
  }
  div#section2 > .row > .col-3 {
    padding: 0px 5px;
  }
  .catCard {
    border-radius: 10px !important;
    padding: 5px !important;
    margin-bottom: 1rem !important;
  }
  .catCard img {
    border-radius: 10px !important;
  }
  .catCard p {
    padding: 2px 5px !important;
    font-size: 10px !important;
    margin-top: 2px !important;
  }
  div#section2 > .row {
    padding: 0px 5px;
  }
  .bannerSlider.big-radius h3 {
    font-size: 20px;
  }
  li.vs-tabs--li span {
    font-size: 12px !important;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) and (max-width: 992px) {
  .bannerSlider {
    width: calc(100% - 30px);
    height: 50vh;
    margin-left: 15px;
  }
  .bannerSlider.big-radius h3 {
    font-size: 30px;
  }
  li.vs-tabs--li span {
    font-size: 14px !important;
  }
  div#homeBanner .agile__actions {
    width: calc(100% - 120px) !important;
    left: 60px;
    right: 30px;
  }
  div#homeBanner button.agile__nav-button {
    display: flex !important;
    border: 2px #fff solid;
    border-radius: 10rem !important;
    height: 45px;
    width: 45px;
    justify-content: center;
    align-items: center;
    background: transparent !important;
    color: #fff !important;
    font-size: 20px;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 992px) {
  li.vs-tabs--li span {
    font-size: 16px !important;
  }
  .bannerSlider {
    width: calc(100% - 60px);
    height: calc(100vh - 120px);
    margin-left: 30px;
  }
  div#homeBanner .agile__actions {
    width: calc(100% - 120px) !important;
    left: 60px;
    right: 30px;
  }
  div#homeBanner button.agile__nav-button {
    display: flex !important;
    border: 2px #fff solid;
    border-radius: 10rem !important;
    height: 45px;
    width: 45px;
    justify-content: center;
    align-items: center;
    background: transparent !important;
    color: #fff !important;
    font-size: 20px;
  }
  .bannerSlider.big-radius h3 {
    font-size: 40px;
  }
}
</style>
