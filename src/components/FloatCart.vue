<template>
  <div>
    <div class="bagIcon pointer" @click="active = true">
      <vs-icon :icon="cartLength>0 ? 'bx-shopping-bag bx-tada':'bx-shopping-bag'" icon-pack="bx" />
      <span class="badge" v-if="cartLength>0 ">{{cartLength}}</span>
    </div>
    <!-- <div class="sm-hide pointer" @click="active = true" id="rightCart">
      <div class="flex-x-between mt-2 mb-3 pointer">
        <vs-icon icon="bx-shopping-bag" icon-pack="bx" class="mr-2" style="color:#fff" />
        <p style="color:#fff">{{ cartLength }} item</p>
      </div>
      <p id="totalPrice" class="small-radius sm-text pointer">{{ cartTotal }} Ks</p>
    </div>
    <vs-button
      color="primary"
      icon="bx-shopping-bag"
      icon-pack="bx"
      class="lg-hide md-hide"
      id="floatIcon"
      @click="active = true"
      type="filled"
      icon-after
    >
      <span class="badge">{{cartLength}}</span>
    </vs-button>-->
    <!-- <div
      @click="active = true"
      class="lg-hide md-hide pointer flex-x-between"
      :class="showCart ? 'showBar' : ''"
      id="bottomCart"
    >
      <div class="flex-x-between ml-4">
        <vs-icon icon="bx-shopping-bag" icon-pack="bx" class="mr-2" style="color:#fff" />
        <p style="color:#fff">{{ cartLength }} item</p>
      </div>
      <p id="totalPrice-bottom" class="small-radius px-2 pointer">{{ cartTotal }} Ks</p>
    </div>-->

    <!-- ............................... sidebar ........................................ -->
    <vs-sidebar
      position-right
      parent="body"
      id="cartSidebar"
      color="primary"
      class="sidebarx"
      spacer
      hidden-background
      v-model="active"
      click-not-close
    >
      <div class="header-sidebar px-4" slot="header">
        <div class="flex-x-between">
          <div class="flex-align-center">
            <vs-icon
              icon="bxs-shopping-bag"
              style="font-weight:bold;color:rgb(var(--vs-primary));font-size:22px !important;"
              icon-pack="bx"
              class="mr-2"
            />
            <p style="color:rgb(var(--vs-primary))">{{ cartLength }} item</p>
          </div>
          <vs-button @click="active = false" color="danger" type="flat" icon-pack="bx" icon="bx-x"></vs-button>
        </div>
      </div>

      <div class="cartBody" style="height:100%">
        <div class="flex-align-center flex-column" v-if="cart.length === 0">
          <svg xmlns="http://www.w3.org/2000/svg" width="60%" height="328" viewBox="0 0 347 328">
            <defs>
              <filter
                id="a"
                width="173.2%"
                height="856.2%"
                x="-36.6%"
                y="-378.1%"
                filterUnits="objectBoundingBox"
              >
                <feGaussianBlur in="SourceGraphic" stdDeviation="12.557" />
              </filter>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <path
                fill="#F2F2F2"
                fill-rule="nonzero"
                d="M144.831 73.163c-36.375 16.752-102.71 53.897-69.849 106.58 32.862 52.682 75.233 106.06 110.81 82.382 35.578-23.677 109.875-75.904 94.784-114.566-15.09-38.662-99.37-91.149-135.745-74.396z"
              />
              <path
                fill="#D2D8DF"
                fill-rule="nonzero"
                d="M10.058 150.729c0-1.032.563-1.867 1.257-1.867.695 0 1.257.835 1.257 1.867v3.835c0 1.03-.562 1.867-1.257 1.867-.694 0-1.257-.836-1.257-1.867v-3.835zm-7.06 2.265a1.68 1.68 0 0 1 .035-2.393 1.721 1.721 0 0 1 2.416.035l2.869 2.924a1.68 1.68 0 0 1-.035 2.392 1.721 1.721 0 0 1-2.417-.034l-2.868-2.924zm-1.273 9.744c-.953 0-1.725-.564-1.725-1.261s.772-1.262 1.725-1.262h4.094c.952 0 1.724.565 1.724 1.262 0 .697-.772 1.261-1.724 1.261H1.725zm3.724 7.057c-.657.67-1.74.685-2.416.034a1.68 1.68 0 0 1-.035-2.392l2.868-2.924a1.721 1.721 0 0 1 2.417-.035 1.68 1.68 0 0 1 .035 2.393l-2.869 2.924zm7.123-.093c0 1.031-.562 1.867-1.257 1.867-.694 0-1.257-.836-1.257-1.867v-3.835c0-1.031.563-1.867 1.257-1.867.695 0 1.257.836 1.257 1.867v3.835zm8.255-3.852a1.877 1.877 0 0 1 0 2.648 1.861 1.861 0 0 1-2.639 0l-2.555-2.564a1.877 1.877 0 0 1 0-2.647 1.861 1.861 0 0 1 2.639 0l2.555 2.563zm2.457-5.635c1.028 0 1.86.565 1.86 1.262 0 .697-.832 1.261-1.86 1.261h-3.822c-1.027 0-1.86-.564-1.86-1.261s.833-1.262 1.86-1.262h3.822zm-3.838-8.282a1.861 1.861 0 0 1 2.638 0 1.877 1.877 0 0 1 0 2.647l-2.555 2.564a1.861 1.861 0 0 1-2.638 0 1.877 1.877 0 0 1 0-2.647l2.555-2.564zM194.873 1.873c0-1.035.563-1.873 1.257-1.873.695 0 1.258.838 1.258 1.872v2.564c0 1.034-.563 1.872-1.258 1.872-.694 0-1.257-.838-1.257-1.872V1.872zm-6.935 8.22c-1.03 0-1.866-.566-1.866-1.262 0-.697.836-1.262 1.866-1.262h2.555c1.03 0 1.866.565 1.866 1.262 0 .696-.836 1.261-1.866 1.261h-2.555zm9.45 5.696c0 1.034-.563 1.873-1.258 1.873-.694 0-1.257-.839-1.257-1.873v-2.563c0-1.034.563-1.872 1.257-1.872.695 0 1.258.838 1.258 1.872v2.563zm4.42-8.22c1.03 0 1.866.565 1.866 1.262 0 .696-.835 1.261-1.866 1.261h-2.555c-1.03 0-1.865-.565-1.865-1.261 0-.697.835-1.262 1.865-1.262h2.555zM62.862 97.744c0-1.031.563-1.867 1.258-1.867.694 0 1.257.836 1.257 1.867v3.835c0 1.031-.563 1.867-1.257 1.867-.695 0-1.258-.836-1.258-1.867v-3.835zm-9.454 10.748c-1.028 0-1.86-.565-1.86-1.261 0-.697.832-1.262 1.86-1.262h3.822c1.028 0 1.86.565 1.86 1.262 0 .696-.832 1.261-1.86 1.261h-3.822zm11.969 9.487c0 1.031-.563 1.867-1.257 1.867-.695 0-1.258-.836-1.258-1.867v-3.835c0-1.031.563-1.867 1.258-1.867.694 0 1.257.836 1.257 1.867v3.835zm6.94-12.01c1.027 0 1.86.565 1.86 1.262 0 .696-.833 1.261-1.86 1.261h-3.822c-1.028 0-1.86-.565-1.86-1.261 0-.697.832-1.262 1.86-1.262h3.822zm235.08 117.04a1.748 1.748 0 0 1-1.745-1.751c0-.967.781-1.75 1.745-1.75 3.818 0 6.915 3.107 6.915 6.938 0 3.832-3.096 6.939-6.915 6.939-3.82 0-6.915-3.107-6.915-6.939 0-.967.781-1.75 1.745-1.75.963 0 1.744.783 1.744 1.75a3.432 3.432 0 0 0 3.426 3.438 3.432 3.432 0 0 0 3.425-3.438 3.432 3.432 0 0 0-3.425-3.438zm23.259-45.762c2.83-.898 7.168-4.416 8.172-8.2.91 3.345 4.728 7.302 8.172 7.602-3.877 1.395-7.584 5.54-8.172 8.797-.4-3.32-5.527-7.716-8.172-8.2zM31.43 220.138c1.525-.483 3.86-2.377 4.4-4.415.49 1.8 2.546 3.932 4.4 4.094-2.087.75-4.082 2.983-4.4 4.737-.215-1.788-2.976-4.156-4.4-4.416zM57.833 61.815a3.778 3.778 0 0 1-3.771 3.785 3.777 3.777 0 0 1-3.772-3.785 3.778 3.778 0 0 1 3.772-3.784 3.778 3.778 0 0 1 3.771 3.784zm255.221 10.723c0 3.833-3.096 6.939-6.914 6.939-3.82 0-6.915-3.106-6.915-6.939 0-3.832 3.095-6.938 6.915-6.938 3.818 0 6.914 3.106 6.914 6.938zm-182.3 218.877c0 2.787-2.252 5.047-5.03 5.047-2.777 0-5.028-2.26-5.028-5.047 0-2.786 2.25-5.046 5.028-5.046 2.778 0 5.03 2.26 5.03 5.046zm-3.445 0c0-.879-.71-1.59-1.585-1.59s-1.584.711-1.584 1.59c0 .88.71 1.592 1.584 1.592.876 0 1.585-.713 1.585-1.592zm.93-253.569c0 2.787-2.251 5.046-5.029 5.046-2.777 0-5.029-2.259-5.029-5.046 0-2.787 2.252-5.046 5.03-5.046 2.777 0 5.028 2.26 5.028 5.046zm-3.05 0a1.983 1.983 0 0 0-1.979-1.986c-1.093 0-1.979.89-1.979 1.986 0 1.098.886 1.987 1.98 1.987 1.092 0 1.978-.89 1.978-1.987zM216.7 323.53c-1.358-3.582.435-7.59 4.003-8.95 3.568-1.363 7.562.435 8.919 4.015 1.359 3.58-.434 7.588-4.002 8.95-3.568 1.363-7.562-.435-8.92-4.015zm9.56-3.652a3.312 3.312 0 0 0-4.278-1.926 3.332 3.332 0 0 0-1.92 4.295 3.314 3.314 0 0 0 4.279 1.927 3.332 3.332 0 0 0 1.92-4.296z"
              />
              <path
                stroke="#3E3D3F"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="7.056"
                d="M143.304 122.913V92.034c0-16.734 13.57-30.302 30.31-30.302s30.313 13.568 30.313 30.302v30.879"
              />
              <path fill="#E0E5EC" d="M122.541 162.74h102.975V97.153H122.541z" />
              <path
                fill="#CFD4DC"
                d="M122.542 97.153v99.626h-16.61v-60.244l8.307-12.743zM224.687 97.153v99.626h16.61v-60.244l-8.307-12.743z"
              />
              <path fill="#D25D27" d="M235.877 146.393l-8.743 22.012-41.475-8.449 8.744-22.014z" />
              <path
                fill="#1B3554"
                d="M17.755 177.73h102.976v9.962H17.755z"
                filter="url(#a)"
                transform="translate(104.372 60.695)"
              />
              <path
                fill="#FFF"
                d="M105.63 136.387h135.363v110a7.06 7.06 0 0 1-7.062 7.06H112.69a7.062 7.062 0 0 1-7.062-7.06v-110z"
              />
              <g fill="#3E3D3F" opacity=".5">
                <path
                  d="M200.511 189.832c-1.442.624-2.864.937-4.265.937-1.373 0-2.745-.3-4.117-.897a3.41 3.41 0 0 1-2.047-3.127 1.176 1.176 0 0 1 1.68-1.062c1.493.708 2.998 1.062 4.515 1.062 1.524 0 3.049-.357 4.573-1.073a1.185 1.185 0 0 1 1.688 1.073 3.364 3.364 0 0 1-2.027 3.087zM158.159 189.832c-1.442.624-2.864.937-4.266.937-1.372 0-2.744-.3-4.116-.897a3.41 3.41 0 0 1-2.048-3.127 1.176 1.176 0 0 1 1.68-1.062c1.493.708 2.998 1.062 4.515 1.062 1.524 0 3.049-.357 4.573-1.073a1.185 1.185 0 0 1 1.689 1.073 3.364 3.364 0 0 1-2.027 3.087zM182.302 214.167c-2.077.883-4.124 1.324-6.141 1.324-1.978 0-3.956-.424-5.934-1.272a4.581 4.581 0 0 1-2.776-4.21 1.627 1.627 0 0 1 2.31-1.478c2.131.985 4.28 1.477 6.444 1.477 2.175 0 4.35-.497 6.526-1.491a1.64 1.64 0 0 1 2.322 1.491 4.52 4.52 0 0 1-2.751 4.16z"
                />
              </g>
              <g transform="translate(138.857 92.307)">
                <ellipse
                  cx="5.041"
                  cy="61.436"
                  fill="#1B3554"
                  opacity=".149"
                  rx="4.983"
                  ry="4.981"
                />
                <ellipse
                  cx="65.664"
                  cy="61.436"
                  fill="#1B3554"
                  opacity=".149"
                  rx="4.983"
                  ry="4.981"
                />
                <path
                  stroke="#3E3D3F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="7.056"
                  d="M5.04 61.18V30.303C5.04 13.567 18.613 0 35.353 0c16.74 0 30.312 13.567 30.312 30.303V61.18"
                />
              </g>
            </g>
          </svg>
          <p class="transparent_text text-bold">No Products Found</p>
        </div>
        <div v-else>
          <div
            class="cartCart mb-2 w-100 flex-x-between"
            v-for="(product, index) in cart"
            :key="product.title + product.id"
          >
            <img
              style="width:80px;height:80px;object-fit:cover"
              @click="
                () => {
                  active = false;
                  $router.push({
                    name: 'Product',
                    query: {
                      title: product.title,
                      pid:
                        product.type === 'Simple Product'
                          ? product.id
                          : product.product_id,
                    },
                  });
                }
              "
              class="pointer"
              v-lazy="
                `https://zhop.admin.saihtunlu.me${
                  product.type === 'Simple Product'
                    ? product.images[0].path
                    : product.attri1.image
                    ? product.attri1.image
                    : product.attri2.image
                }`
              "
              alt
            />
            <div class="cartDetail">
              <div class="flex-x-between mb-2">
                <p
                  class="text-truncate upper pointer"
                  @click="
                    () => {
                      active = false;
                      $router.push({
                        name: 'Product',
                        query: {
                          title: product.title,
                          pid:
                            product.type === 'Simple Product'
                              ? product.id
                              : product.product_id,
                        },
                      });
                    }
                  "
                >{{ product.title }}</p>
                <p class="primary">
                  {{
                  parseInt(
                  product.sale_price
                  ? product.sale_price
                  : product.regular_price
                  ) * parseInt(product.addCart)
                  }}Ks
                </p>
              </div>
              <p v-if="product.type === 'Variable Product'" class="sm-text gray">
                {{ product.attri1.attribute.name }} - {{ product.attri1.name }}
                <span
                  v-if="product.attri2"
                >
                  / {{ product.attri2.attribute.name }} -
                  {{ product.attri2.name }}
                </span>
              </p>
              <div class="flex-x-between">
                <p class="gray sm-text">
                  {{
                  product.sale_price
                  ? product.sale_price
                  : product.regular_price
                  }}Ks {{ product.weight ? `(${product.weight}Kg)` : "" }} x
                  {{ product.addCart }}
                </p>
                <div class="flex-align-center">
                  <vs-input-number
                    icon-pack="bx"
                    class="mr-3"
                    icon-dec="bx-minus"
                    icon-inc="bx-plus"
                    v-model="product.addCart"
                    min="1"
                    @input="changeCart()"
                    :max="
                      product.number_of_stock
                        ? parseInt(product.number_of_stock)
                        : 100000000
                    "
                  />
                  <vs-button
                    @click="removeItem(index)"
                    color="danger"
                    type="flat"
                    icon="bx-trash-alt"
                    icon-pack="bx"
                  ></vs-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-sidebar" slot="footer">
        <div
          class="flex-x-between primaryHover pointer checkoutBtn"
          @click="
            () => {
              if (cartLength > 0) {
                active = false;
                $router.push({
                  name: 'Checkout',
                });
              }
            }
          "
        >
          <p class="ml-4" style="color:#fff !important;">CheckOut</p>
          <p id="totalPrice-bottom" class="small-radius px-2 pointer">{{ cartTotal }} Ks</p>
        </div>
      </div>
    </vs-sidebar>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      helper: 0,
      active: false,
      showCart: false,
      lastScrollPosition: null,
    };
  },
  computed: {
    ...mapState({
      cartLength: "cartLength",
      cartTotal: "cartTotal",
      cart: "cart",
    }),
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  methods: {
    onScroll() {
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 60) {
        return;
      }
      this.showCart = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    changeCart() {
      var cart = this.cart;
      this.$store.dispatch("addToCart", { cart });
    },
    removeItem(index) {
      this.cart.splice(index, 1);
      var cart = this.cart;
      this.$store.dispatch("addToCart", { cart });
    },
  },
};
</script>

<style>
button#floatIcon {
  position: fixed;
  right: -5px;
  z-index: 1000;
  top: 45vh;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
}
.bagIcon span.badge {
  position: absolute;
  background: rgb(var(--vs-danger));
  min-width: 15px;
  border-radius: 10rem;
  font-size: 10px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  top: 15px;
  margin-right: -13px;
}
.bagIcon {
  display: flex;
  height: 35px !important;
  width: 35px !important;
  align-items: center;
  justify-content: center;
}
/* ------------------------------------------------'right'------------------------------------------------ */
div#rightCart {
  position: fixed;
  z-index: 1000;
  right: 0px;
  top: calc(50vh - 50px);
  background: rgb(var(--vs-primary));
  border-bottom-left-radius: 15px;
  border-top-left-radius: 15px;
  padding: 10px;
  box-shadow: 0px 4px 25px -8px rgb(var(--vs-primary));
}
div#cartSidebar > .vs-sidebar.vs-sidebar-primary.vs-sidebar-position-right {
  background: rgb(var(--vs-theme));
}

.cartCart {
  padding: 10px 15px;
  border-bottom: 1px solid rgb(var(--vs-dark), 0.05);
}
.cartCart img {
  border-radius: 5px;
  margin-right: 5px;
}
.cartDetail {
  width: 78%;
}
p#totalPrice {
  background: #fff;
  color: rgb(var(--vs-primary));
  font-weight: bold;
  text-align: center;
  padding: 10px 5px;
}

/* ------------------------------------------------'bottom'------------------------------------------------ */
div#bottomCart {
  position: fixed;
  bottom: 30px;
  width: calc(100vw - 60px);
  background: rgb(var(--vs-primary));
  height: 45px;
  border-radius: 30px;
  left: 30px;
  right: 30px;
  z-index: 10000;
  box-shadow: 0px 4px 25px -8px rgb(var(--vs-primary));
  transition: 0.25s all;
  transform: translateY(75px);
}
div#bottomCart.showBar {
  transform: translateY(0px) !important;
}
p#totalPrice-bottom {
  height: calc(100% - 4px);
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 80px;
  border-radius: 30px;
  background: #fff;
  margin-right: 2px;
  padding: 0px 5px;
  color: rgb(var(--vs-primary));
  font-weight: bold;
}
.checkoutBtn {
  background: rgb(var(--vs-primary));
  height: 45px;
  border-radius: 30px;
  margin: 15px;
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  div#cartSidebar > .vs-sidebar.vs-sidebar-primary.vs-sidebar-position-right {
    max-width: 100vw !important;
  }
  span.badge {
    top: 8px !important;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  div#cartSidebar > .vs-sidebar.vs-sidebar-primary.vs-sidebar-position-right {
    max-width: 50vw !important;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  div#cartSidebar > .vs-sidebar.vs-sidebar-primary.vs-sidebar-position-right {
    max-width: 30vw !important;
  }
}
</style>
