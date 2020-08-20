<template>
  <div class="productCard flex-column">
    <agile :slidesToShow="1" :autoplay="false" :initial-slide="1">
      <div class="slide" v-for="image in product.images" :key="image.path">
        <img
          @click="
            $router.push({
              name: 'Product',
              query: { title: product.title, pid: product.id },
            })
          "
          v-lazy="`https://zhop.admin.saihtunlu.me${image.path}`"
          width="100%"
          alt
          class="pointer w-100"
        />
      </div>
      <template slot="prevButton">
        <vs-icon icon="bx-chevron-left" icon-pack="bx" />
      </template>
      <template slot="nextButton">
        <vs-icon icon="bx-chevron-right" icon-pack="bx" />
      </template>
    </agile>
    <vs-chip
      class="discount big-radius"
      v-if="product.discount"
      color="danger"
    >-{{ product.discount }}%</vs-chip>
    <div class="actions">
      <vs-button
        radius
        :color="addedFav ? 'danger' : 'primary'"
        type="filled"
        class="mr-3 open-icon"
        icon-pack="bx"
        icon="bx-heart"
        @click="AddToFav()"
      ></vs-button>
      <vs-button
        radius
        color="primary"
        type="filled"
        class="mr-3 open-icon"
        icon-pack="bx"
        @click="AddToCart()"
        :icon="product.type === 'Simple Product' ? 'bx-cart' : 'bx-slider-alt'"
      ></vs-button>
    </div>
    <div
      class="cardDetail pointer mt-1 p-2"
      @click="
        $router.push({
          name: 'Product',
          query: { title: product.title, pid: product.id },
        })
      "
    >
      <p class="text-truncate text-bold mb-2">{{ product.title }}</p>
      <div class="flex-x-between">
        <Price :product="product" />
        <vs-chip
          color="success"
          class="sm-hide"
          transparent
          style="font-size:8px; color:rgb(var(--vs-success))"
        >{{ product.sold_out }} Sold Out!</vs-chip>
      </div>
    </div>
  </div>
</template>

<script>
import Price from "./productPrice";
export default {
  props: {
    product: {},
  },
  data() {
    return {
      addedFav: false,
    };
  },
  components: {
    Price,
  },
  mounted() {
    var check = this.$store.state.fav.filter((data) => {
      return parseInt(data.product_id) === this.product.id;
    });
    if (check.length > 0) {
      this.addedFav = true;
    }
  },
  methods: {
    AddToCart() {
      if (this.product.type === "Simple Product") {
        var params = {};
        params.product = this.product;
        params.qty = 1;
        this.$store.dispatch("beforeAddToCart", { params }).then((data) => {
          if (data === "success") {
            this.$vs.notify({
              title: "Success",
              text: `${this.product.title} has been successfully added to bag.`,
              color: "success",
            });
          } else {
            this.$vs.notify({
              title: "Error",
              text: "Please, Select a product first!",
              color: "danger",
            });
          }
        });
      } else {
        this.$router.push({
          name: "Product",
          query: { title: this.product.title, pid: this.product.id },
        });
      }
    },
    AddToFav() {
      var product_id = this.product.id;
      var product = this.product;
      if (this.addedFav) {
        this.$store.dispatch("removeFav", { product_id }).then((data) => {
          if (data === "success") {
            this.$vs.notify({
              title: "Success",
              text: `${this.product.title} has been successfully removed from wishlist.`,
              color: "success",
            });
            this.addedFav = false;
          } else {
            this.$vs.notify({
              title: "Error",
              text:
                "Oops! There is an error while removing product from wishlist!",
              color: "danger",
            });
          }
        });
      } else {
        this.$store.dispatch("addToFav", { product }).then((data) => {
          if (data === "success") {
            this.$vs.notify({
              title: "Success",
              text: `${this.product.title} has been successfully added to wishlist.`,
              color: "success",
            });
            this.addedFav = true;
          } else {
            this.$vs.notify({
              title: "Error",
              text: "There is an error while adding product to wishlist!",
              color: "danger",
            });
          }
        });
      }
    },
  },
};
</script>

<style>
.con-vs-chip.discount {
  position: absolute;
  left: 35px;
  border-radius: 10rem !important;
  top: 15px;
  box-shadow: 0px 4px 25px -8px rgb(var(--vs-danger), 0.2);
}
.productCard {
  background: rgb(var(--vs-theme));
  padding: 5px;
  border-radius: 15px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
.productCard .agile {
  border-radius: 10px !important;
  overflow: hidden;
}
.productCard img {
  max-height: 220px;
  object-fit: cover;
  object-position: center;
}
.productCard button.agile__nav-button {
  display: none;
  background: rgb(255, 255, 255, 0.2);
  border: 0px;
  border-radius: 10px;
  padding: 10px;
  margin-top: -10px;
  color: #fff;
  cursor: pointer;
  font-weight: bolder;
  margin-left: 10px;
  margin-right: 10px;
}
.actions {
  position: absolute;
  top: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: 0;
  left: 0;
  display: none;
}

.productCard:hover button.agile__nav-button,
.productCard:hover .actions {
  display: flex !important;
}
.agile__actions {
  position: absolute !important;
  width: 100% !important;
  top: 50% !important;
}
.productCard ul.agile__dots {
  display: none !important;
}
.productCard .slide.agile__slide {
  display: flex !important;
}

/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  .con-vs-chip.discount {
    height: 30px;
    left: 20px !important;
  }
  .productCard {
    margin-bottom: 1rem;
  }
  .productCard img {
    max-height: 158px;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  .con-vs-chip.discount {
    height: 35px;
  }
  .productCard {
    margin-bottom: 1rem;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  .actions button {
    width: 45px !important;
    height: 45px !important;
  }
  .con-vs-chip.discount {
    height: 40px;
  }
  .productCard {
    margin-bottom: 1.5rem;
  }
  .productCard img {
    max-height: 220px !important;
  }
}
</style>
