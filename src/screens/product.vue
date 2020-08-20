<template>
  <div class="row product_page lg-80 pb-5">
    <div class="col-lg-12">
      <div class="row mt-medium mt-sm-0" style="position:sticky;top:100px;">
        <div class="col-lg-5 col-md-6 col-sm-12 p-sm-0" style="max-height:80vh">
          <ProductZoomer
            id="productImageView"
            :base-images="images"
            :base-zoomer-options="zoomerOptions"
          />
          <vs-divider class="lg-hide md-hide" />
        </div>

        <div class="col-lg-7 col-md-6 mt-sm-5 mt-md-5 col-sm-12 pl-4 px-sm-4">
          <div class="flex-align-center">
            <h1>{{ product.title }}</h1>
            <vs-chip
              v-if="product.discount"
              style="box-shadow: 0px 4px 25px -4px rgb(var(--vs-danger),0.4);"
              class="ml-3"
              color="danger"
            >-{{ product.discount }}%</vs-chip>
          </div>

          <p class="transparent_p" v-if="product.brand">By {{ product.brand.name }}</p>
          <div class="flex-x-between">
            <Price
              class="mt-3"
              style="font-size: 25px;"
              :product="selectedProduct ? selectedProduct : product"
            />
            <vs-chip
              color="success"
              class="ml-3"
              transparent
              style="font-size:10px !important; color:rgb(var(--vs-success))"
            >{{ product.sold_out }} Sold Out!</vs-chip>
          </div>

          <p class="mt-3">{{ product.short_description }}</p>
          <vs-divider v-if="variation1" />
          <div v-if="variation1">
            <p class="mb-3">{{ variation1.name }}</p>
            <div class="flex-align-center" style="flex-wrap:wrap;">
              <div
                v-for="variation in variation1.details"
                :key="variation.name"
                @click="filterVariation1(variation.id)"
              >
                <div
                  class="pointer variationCard mr-3 mb-3"
                  :class="
                    parseInt(selectedVariation1_id) === parseInt(variation.id) ? 'selectedItem' : ''
                  "
                  v-if="variation.image"
                >
                  <img :src="`https://zhop.admin.saihtunlu.me${variation.image}`" alt />
                  <p class="sm-p">{{ variation.name }}</p>
                </div>
                <vs-chip
                  v-else
                  transparent
                  :class="
                    parseInt(selectedVariation1_id) === parseInt(variation.id) ? 'selectedChip' : ''
                  "
                  class="pointer variationChip mr-2 mb-3 sm-p"
                  color="primary"
                >{{ variation.name }}</vs-chip>
              </div>
            </div>
          </div>
          <vs-divider v-if="variation2" />
          <div v-if="variation2">
            <p class="mb-3">{{ variation2.name }}</p>
            <div class="flex-align-center" style="flex-wrap:wrap;">
              <div
                v-for="variation in variation2.details"
                :key="variation.name"
                @click="filterVariation2(variation.id)"
              >
                <div
                  class="pointer variationCard mr-3"
                  :class="
                    parseInt(selectedVariation2_id) === parseInt(variation.id) ? 'selectedItem' : ''
                  "
                  v-if="variation.image"
                >
                  <img :src="`https://zhop.admin.saihtunlu.me${variation.image}`" alt />
                  <p class="sm-p">{{ variation.name }}</p>
                </div>
                <vs-chip
                  v-else
                  transparent
                  :class="
                    parseInt(selectedVariation2_id) === parseInt(variation.id) ? 'selectedChip' : ''
                  "
                  class="pointer variationChip mr-2 mb-3 sm-p"
                  color="primary"
                >{{ variation.name }}</vs-chip>
              </div>
            </div>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class>Quantity</p>
            <div class="flex-align-center">
              <vs-input-number
                icon-pack="bx"
                class="mr-5"
                icon-dec="bx-minus"
                icon-inc="bx-plus"
                v-model="qty"
                min="1"
                :max="parseInt(limit)"
              />
              <vs-chip color="danger" v-if="parseInt(limit) === 0">Out of Stock!</vs-chip>
            </div>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class>Tags</p>
            <div class="flex-align-center">
              <vs-chip
                class="mr-3"
                v-for="tag in product.tags"
                :key="tag.tag.name"
                transparent
                color="primary"
              >{{ tag.tag.name }}</vs-chip>
            </div>
          </div>
          <vs-divider />
          <div class="flex-align-center md-hide sm-hide">
            <vs-button
              style="width:60%"
              class="mr-3"
              color="primary"
              type="filled"
              :disabled="parseInt(limit) === 0 ? true:false"
              @click="AddToCart"
            >
              <vs-icon icon="bx-loader-circle" v-if="adding" icon-pack="bx" />
              <span v-else>
                <vs-icon icon-pack="bx" icon="bx-shopping-bag" />Add To
                Bag
              </span>
            </vs-button>
            <vs-button
              color="danger"
              id="addFav"
              :type="addedFav ? 'filled' : 'flat'"
              @click="AddToFav"
            >
              <span v-if="addedFav">
                <vs-icon icon-pack="bx" icon="bx-heart" />Remove From
                Wishlist
              </span>
              <span v-else>
                <vs-icon icon-pack="bx" icon="bx-heart" />Add To
                Wishlist
              </span>
            </vs-button>
          </div>
          <vs-divider class="md-hide sm-hide" />
          <p class="mb-3">Social Share</p>
          <ShareNetwork
            v-for="network in networks"
            :key="network.name"
            :network="network.network"
            :url="shareUrl"
            :title="product.title"
            :description="product.short_description"
            :quote="`Branded By ${product.brand.name}`"
            :hashtags="shareTags"
          >
            <vs-button
              :color="network.color"
              type="filled"
              class="mr-3"
              radius
              icon-pack="bx"
              :icon="network.icon"
            ></vs-button>
          </ShareNetwork>
        </div>
      </div>
    </div>
    <vs-divider class="lg-hide md-hide mt-medium" />
    <div class="col-12">
      <vs-tabs id="productTabs">
        <vs-tab label="Description">
          <div class="con-tab-ejemplo mt-3">
            <span class v-html="product.long_description"></span>
          </div>
        </vs-tab>
        <vs-tab label="Additional Information">
          <div class="con-tab-ejemplo">
            <div class="mt-medium">
              <div class="flex-x-between" v-if="product.Length">
                <p>Length</p>
                <p>{{ product.Length }} (cm)</p>
              </div>
              <vs-divider v-if="product.Length" />
              <div class="flex-x-between" v-if="product.width">
                <p>Width</p>
                <p>{{ product.width }} (cm)</p>
              </div>
              <vs-divider v-if="product.width" />
              <div class="flex-x-between" v-if="product.height">
                <p>Height</p>
                <p>{{ product.height }} (cm)</p>
              </div>
              <vs-divider v-if="product.height" />
              <div class="flex-x-between" v-if="product.weight">
                <p>Weight</p>
                <p>{{ product.weight }} (Kg)</p>
              </div>
            </div>
          </div>
        </vs-tab>
        <vs-tab label="Reviews">
          <div class="con-tab-ejemplo">Service</div>
        </vs-tab>
      </vs-tabs>
    </div>

    <div class="col-12 sm-padding">
      <vs-divider />
      <div class="flex-x-between" v-if="product.brand">
        <p class="transparent_text text-bolder caption">Products By {{ product.brand.name }}</p>
        <vs-button
          color="primary"
          icon="bx-chevron-right"
          icon-pack="bx"
          class="seeMoreBtn"
          icon-after
          @click="
            $router.push({
              name: 'Shop',
              query: { target: 'brand',bid:product.brand_id,bname:product.brand.name },
            })
          "
          type="filled"
        >See More</vs-button>
      </div>
      <fade-transition class="row mt-3 mx-0" group>
        <div
          class="col-lg-3 col-md-4 col-sm-6"
          v-for="product in brandProducts"
          :key="product.title"
        >
          <Card :product="product" />
        </div>
      </fade-transition>
    </div>
    <div class="col-12 sm-padding">
      <vs-divider />
      <div class="flex-x-between">
        <p class="transparent_text text-bolder caption">Related Products</p>
        <vs-button
          color="primary"
          icon="bx-chevron-right"
          icon-pack="bx"
          icon-after
          @click="
            $router.push({
              name: 'Shop',
              query: { target: 'related',pid:product.id },
            })
          "
          class="seeMoreBtn"
          type="filled"
        >See More</vs-button>
      </div>
      <fade-transition class="row mt-3 mx-0" group>
        <div
          class="col-lg-3 col-md-4 col-sm-6"
          v-for="product in relatedProducts"
          :key="product.title"
        >
          <Card :product="product" />
        </div>
      </fade-transition>
    </div>

    <div id="floatAddToBag" class="lg-hide">
      <div class="flex-align-center">
        <vs-button
          radius
          class="mr-3"
          color="danger"
          icon-pack="bx"
          icon="bx-heart"
          :type="addedFav ? 'filled' : 'flat'"
          @click="AddToFav"
        ></vs-button>
        <vs-button
          style="width:85%"
          class="mr-3"
          color="primary"
          type="filled"
          :disabled="parseInt(limit) === 0 ? true:false"
          @click="AddToCart"
        >
          <vs-icon icon="bx-loader-circle" v-if="adding" icon-pack="bx" />
          <span v-else>
            <vs-icon icon-pack="bx" icon="bx-shopping-bag" />Add To
            Bag
          </span>
        </vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Price from "../components/productPrice";
import Card from "../components/productCart";
export default {
  data() {
    return {
      shareTags: "",
      shareUrl: window.location.href,
      networks: [
        {
          network: "email",
          name: "Email",
          icon: "bx bx-mail-send bx-tada-hover",
          color: "#D44638",
        },
        {
          network: "facebook",
          name: "Facebook",
          icon: "bx bxl-facebook bx-tada-hover",
          color: "#1877f2",
        },
        {
          network: "sms",
          name: "SMS",
          icon: "bx bx-message-square-detail bx-tada-hover",
          color: "success",
        },
        {
          network: "twitter",
          name: "Twitter",
          icon: "bx bxl-twitter bx-tada-hover",
          color: "#1da1f2",
        },
      ],
      addedFav: false,
      adding: false,
      brandProducts: [],
      relatedProducts: [],
      selectedProduct: null,
      variation1: null,
      variation2: null,
      selectedVariation2_id: null,
      selectedVariation1_id: null,
      product: {},
      qty: 1,
      limit: null,
      zoomerOptions: {
        zoomFactor: 3,
        pane: "container-round",
        hoverDelay: 100,
        namespace: "inline-round-zoomer",
        move_by_click: true,
        scroll_items: 4,
        choosed_thumb_border_color: "#7561D2",
        scroller_position: "bottom",
      },
    };
  },
  created() {
    this.$emit("showTab", false);
    window.scrollTo(0, 0);
    this.setData();
  },
  computed: {
    ...mapGetters({
      getProduct: "getProduct",
      getVariation: "getVariation",
      getBrandProduct: "getBrandProduct",
      getRelatedProduct: "getRelatedProduct",
    }),
    ...mapState({
      cart: "cart",
    }),
  },
  components: {
    Price,
    Card,
  },
  watch: {
    limit(newValue) {
      if (newValue === 0) {
        this.qty = 0;
      }
    },
  },
  methods: {
    setData() {
      this.product = this.getProduct(this.$route.query.pid);
      var check = this.$store.state.fav.filter((data) => {
        return data.product_id === this.product.id;
      });
      if (check.length > 0) {
        this.addedFav = true;
      }
      var params = {};
      params.id = this.product.brand_id;
      params.number = 8;
      this.brandProducts = this.getBrandProduct(params);
      var params2 = {};
      params2.product = this.product;
      params2.number = 8;
      this.relatedProducts = this.getRelatedProduct(params2);
      var images = [];
      this.product.images.forEach((data) => {
        var array = {};
        array.url = `https://zhop.admin.saihtunlu.me${data.path}`;
        array.id = data.id;
        images.push(array);
      });
      this.zoomerOptions.scroll_items = images.length > 3 ? 4 : 3;
      this.images = { thumbs: images, normal_size: images };
      var tags = [];
      this.product.tags.forEach((data) => {
        tags.push(data.tag.name);
      });
      this.shareTags = tags.toString();

      if (this.product.type === "Simple Product") {
        this.limit =
          this.product.stock === "Out Of Stock"
            ? 0
            : this.product.stock === "Manage Stock"
            ? this.product.number_of_stock
            : 100000;
      } else {
        var variations = this.getVariation(this.product.product_no);
        this.variation1 = variations[0];
        if (variations[1]) {
          this.variation2 = variations[1];
        }
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
    filterVariation1(id) {
      console.log("id", id);
      this.selectedVariation1_id = parseInt(id);
      var product = this.product;
      var selectedVariation2_id = parseInt(this.selectedVariation2_id);
      var selected = null;
      if (selectedVariation2_id) {
        selected = product.variations.filter((data) => {
          return (
            parseInt(data.attribute2_id) === parseInt(selectedVariation2_id) &&
            parseInt(data.attribute1_id) === parseInt(id)
          );
        })[0];
      } else {
        selected = product.variations.filter((data) => {
          return parseInt(data.attribute1_id) === parseInt(id);
        })[0];
      }
      console.log("selected", selected);
      if (selected) {
        this.limit =
          selected.stock === "Out Of Stock"
            ? 0
            : selected.stock === "Manage Stock"
            ? selected.number_of_stock
            : 100000;
        this.qty = selected.number_of_stock === "Out of stock" ? 0 : 1;
        this.selectedProduct = selected;
      }
    },
    filterVariation2(id) {
      this.selectedVariation2_id = id;
      var product = this.product;
      var selectedVariation1_id = this.selectedVariation1_id;
      var selected = null;
      selected = product.variations.filter((data) => {
        return (
          parseInt(data.attribute2_id) === parseInt(id) &&
          parseInt(data.attribute1_id) === parseInt(selectedVariation1_id)
        );
      })[0];
      console.log("selected", selected);
      if (selected) {
        this.limit =
          selected.stock === "Out Of Stock"
            ? 0
            : selected.stock === "Manage Stock"
            ? selected.number_of_stock
            : 100000;
        this.qty = selected.number_of_stock === "Out of stock" ? 0 : 1;
        this.selectedProduct = selected;
      }
    },
    AddToCart() {
      this.adding = true;
      var params = {};
      params.product = this.product;
      if (this.product.type === "Variable Product") {
        params.selectedProduct = this.selectedProduct;
      }
      params.qty = this.qty;
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
        this.adding = false;
      });
    },
  },
};
</script>

<style>
#productTabs .con-ul-tabs .line-vs-tabs {
  height: 40px !important;
  margin-top: -40px !important;
  border-radius: 15px;
  background: rgb(var(--vs-gray)) !important;
  box-shadow: none !important;
}
#productTabs ul.ul-tabs.vs-tabs--ul.ul-tabs-left {
  box-shadow: none !important;
}
div#productImageView img.responsive-image.preview-box {
  width: 100% !important;
  object-fit: cover;
  max-height: 60vh;
  object-position: center;
  border-radius: 5px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
div#productImageView .thumb-list > img.responsive-image {
  border-radius: 5px !important;
  width: 90% !important;
  margin-top: 1rem;
}
div#productImageView,
div#productImageView .thumb-list {
  height: auto !important;
  width: 100% !important;
}
.variationCard img {
  border-radius: 8px;
  width: 100px;
  height: 100px;
  object-fit: cover;
  object-position: center;
}
.variationCard {
  text-align: center;
  padding: 3px;
  background: rgb(var(--vs-gray));
  border-radius: 10px;
}
.variationCard.selectedItem {
  background: rgb(var(--vs-primary));
  box-shadow: 0px 4px 25px -4px rgb(var(--vs-primary), 0.2);
  color: #fff !important;
}
.variationChip {
  height: 35px;
  padding: 0px 10px;
}
.selectedChip {
  background: rgb(var(--vs-primary)) !important;
  color: #fff !important;
  box-shadow: 0px 4px 25px -4px rgb(var(--vs-primary), 0.4);
}
div#productTabs img {
  border-radius: 5px;
}
div#floatAddToBag {
  position: fixed;
  z-index: 100;
  bottom: 0px;
  right: 0px;
  left: 0px;
  background: rgb(var(--vs-theme));
  padding: 10px;
  box-shadow: 0px 0px 25px 0px rgb(0, 0, 0, 0.04);
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  button#addFav {
    padding: 0px 5px !important;
    width: 60%;
  }

  .row.mt-medium.mt-sm-0 {
    margin-top: 0px !important;
  }
  .seeMoreBtn {
    max-height: 30px !important;
  }
  .variationCard img {
    width: 60px !important;
    height: 60px !important;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
}
</style>
