<template>
  <div>
    <div class="myOrders" v-if="!seeOrder">
      <vs-table pagination max-items="7" hover-flat search :data="orders">
        <template slot="header">
          <h3 class="upper flex-align-center">
            <vs-button
              radius
              color="#000"
              class="darkBtn sm-hide mr-2"
              type="filled"
              icon-pack="bx"
              icon="bx-gift"
            ></vs-button>My Orders
          </h3>
        </template>
        <template slot="thead">
          <vs-th sort-key="No" class="sm-hide">No</vs-th>
          <vs-th sort-key="Order ID">Order ID</vs-th>
          <vs-th sort-key="id">Status</vs-th>
          <vs-th sort-key="totalPrice" class="sm-hide">Total Price</vs-th>
          <vs-th sort-key="Ordered Date" class="sm-hide">Ordered Date</vs-th>
          <vs-th sort-key="Action">Action</vs-th>
        </template>

        <template slot-scope="{ data }">
          <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
            <vs-td class="sm-hide" :data="indextr + 1">{{ indextr + 1 }}</vs-td>

            <vs-td :data="data[indextr].order_id">{{ data[indextr].order_id }}</vs-td>
            <vs-td :data="data[indextr].status">
              <span class="truncate">
                <vs-progress
                  :height="6"
                  :percent="25"
                  v-if="data[indextr].status === 'Pending'"
                  color="warning"
                ></vs-progress>
                <vs-progress
                  :height="6"
                  :percent="50"
                  v-if="data[indextr].status === 'Confirmed'"
                  color="#bfdd13"
                ></vs-progress>
                <vs-progress
                  :height="6"
                  :percent="75"
                  v-if="data[indextr].status === 'Delivering'"
                  color="#7cdd13"
                ></vs-progress>
                <vs-progress
                  :height="6"
                  :percent="100"
                  v-if="data[indextr].status === 'Completed'"
                  color="success"
                ></vs-progress>
                <vs-progress
                  :height="6"
                  :percent="100"
                  v-if="data[indextr].status === 'Cancelled'"
                  color="danger"
                ></vs-progress>
              </span>
            </vs-td>
            <vs-td class="sm-hide" :data="data[indextr].totalPrice">
              <span class="truncate">{{ data[indextr].totalPrice }} Ks</span>
            </vs-td>

            <vs-td class="sm-hide" :data="data[indextr].created_at">
              <span class="truncate">
                {{
                $moment(
                data[indextr].created_at,
                "YYYY-MM-DDTHH:mm:ss.SSS"
                ).format("DD/MM/YYYY")
                }}
              </span>
            </vs-td>
            <vs-td>
              <vs-button
                radius
                color="#000"
                class="darkBtn"
                type="filled"
                @click="seeDetail(data[indextr])"
                icon-pack="bx"
                icon="bx-chevron-right"
              ></vs-button>
            </vs-td>
          </vs-tr>
        </template>
      </vs-table>
    </div>
    <div class="orderDetail" v-else>
      <div class="topDetail big-radius mb-3 row mx-0">
        <div class="flex-x-between col-12 px-0 mt-1 mb-3">
          <p class="flex-align-center" @click="seeOrder=false">
            <vs-icon icon="bx-chevron-left" icon-pack="bx" class="mr-2" />Back
          </p>
          <vs-button
            color="primary"
            type="filled"
            icon="bx-download"
            icon-pack="bx"
            :href="`https://zhop.admin.saihtunlu.me/api/slip/${order.id}`"
          >Download Slip</vs-button>
        </div>
        <div class="col-lg-12 px-0">
          <p class="mb-3 upper text-bold flex-align-center">
            <vs-button
              radius
              color="white"
              class="sm-hide whiteBtn mr-2"
              type="filled"
              icon-pack="bx"
              icon="bx-gift"
            ></vs-button>Order Detail
          </p>
          <div class="flex-x-between">
            <p>Order ID</p>
            <p>{{ order.order_id }}</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p>Total Weight</p>
            <p>{{ order.totalWeight }} Kg</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p>Delivery Price</p>
            <p>
              {{
              order.shippingPrice === "0" || !order.shippingPrice
              ? "Free Delivery"
              : `${order.shippingPrice} Ks`
              }}
            </p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p>Total Price</p>
            <p>{{ order.totalPrice }} Ks</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p>Status</p>
            <p>
              <span class="truncate">
                <vs-chip
                  transparent
                  :height="6"
                  :percent="25"
                  v-if="order.status === 'Pending'"
                  color="warning"
                >{{ order.status }}</vs-chip>

                <vs-chip
                  transparent
                  :height="6"
                  :percent="50"
                  v-if="order.status === 'Confirmed'"
                  color="#bfdd13"
                >{{ order.status }}</vs-chip>
                <vs-chip
                  transparent
                  :height="6"
                  :percent="75"
                  v-if="order.status === 'Delivering'"
                  color="#7cdd13"
                >{{ order.status }}</vs-chip>
                <vs-chip
                  transparent
                  :height="6"
                  :percent="100"
                  v-if="order.status === 'Completed'"
                  color="success"
                >{{ order.status }}</vs-chip>
                <vs-chip
                  transparent
                  :height="6"
                  :percent="100"
                  v-if="order.status === 'Cancelled'"
                  color="danger"
                >{{ order.status }}</vs-chip>
              </span>
            </p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p>Payment Method</p>
            <p>{{ order.payment_method }}</p>
          </div>
          <vs-divider v-if="order.payment_method === 'Bank Direct Transfer'" />
          <div class="flex-x-between" v-if="order.payment_method === 'Bank Direct Transfer'">
            <p>Paid</p>
            <p>
              <vs-chip :color="parseInt(order.paid)===1 ? 'success' : 'danger'">{{ parseInt(order.paid)===1 ? "Yes" : "No" }}</vs-chip>
            </p>
          </div>
          <vs-divider />
        </div>

        <div class="col-lg-12 px-0">
          <p class="mb-3 upper text-bold flex-align-center">
            <vs-button
              radius
              color="white"
              class="sm-hide whiteBtn mr-2"
              type="filled"
              icon-pack="bx"
              icon="bx-user"
            ></vs-button>Customer Detail
          </p>
          <div class="flex-x-between">
            <p class="detail_p">Name</p>
            <p>{{ order.userName }}</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class="detail_p">Email</p>
            <p>{{ order.email }}</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class="detail_p">Phone</p>
            <p>{{ order.phone }}</p>
          </div>
          <vs-divider />
        </div>
        <div class="col-lg-12 px-0">
          <p class="mb-3 upper text-bold flex-align-center">
            <vs-button
              radius
              color="white"
              class="sm-hide whiteBtn mr-2"
              type="filled"
              icon-pack="bx"
              icon="bx-map-pin"
            ></vs-button>Delivery Address
          </p>
          <div class="flex-x-between">
            <p class="detail_p">State</p>
            <p>{{ order.bill_address.state }}</p>
          </div>
          <vs-divider />

          <div class="flex-x-between">
            <p class="detail_p">City</p>
            <p>{{ order.bill_address.city }}</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class="detail_p">Address Line 1</p>
            <p>{{ order.bill_address.addressLine1 }}</p>
          </div>
          <vs-divider />
          <div class="flex-x-between">
            <p class="detail_p">Address Line 2</p>
            <p>{{ order.bill_address.addressLine2 }}</p>
          </div>
        </div>
      </div>
      <div
        class="topDetail big-radius mb-3 row mx-0"
        v-if="order.payment_method === 'Bank Direct Transfer'"
      >
        <div class="col-12 px-0">
          <p class="mb-3 upper text-bold flex-align-center">
            <vs-button
              radius
              color="white"
              class="sm-hide whiteBtn mr-2"
              type="filled"
              icon-pack="bx"
              icon="bx-credit-card-alt"
            ></vs-button>Our Banks Information
          </p>
        </div>
        <div class="col-lg-6" v-for="bank in order.payment.banks" :key="bank.name">
          <div
            class="bankCard shadow p-3 small-radius mb-3"
            style="border:2px solid rgb(var(--vs-primary))"
          >
            <div class="flex-x-between mb-3">
              <p>Bank Name</p>
              <p>{{ bank.bankName }}</p>
            </div>
            <div class="flex-x-between mb-3">
              <p>Account Number</p>
              <p>{{ bank.accNumber }}</p>
            </div>
            <div class="flex-x-between mb-3">
              <p>Account Holder Name</p>
              <p>{{ bank.holderName }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row mx-0">
        <div class="col-lg-12 py-3 open bg-theme shadow big-radius mt-medium">
          <vs-table
            hoverFlat
            class="vs-con-loading__container"
            pagination
            max-items="5"
            search
            :data="items"
          >
            <template slot="header">
              <h3 class="upper flex-align-center">
                <vs-button
                  radius
                  color="#000"
                  class="darkBtn sm-hide mr-2"
                  type="filled"
                  icon-pack="bx"
                  icon="bx-cube"
                ></vs-button>Items
              </h3>
            </template>
            <template slot="thead">
              <vs-th sort-key="image">Product Image</vs-th>
              <vs-th sort-key="title">Title</vs-th>
              <vs-th sort-key="title">Quantity</vs-th>
              <vs-th sort-key="title">Subtotal</vs-th>
            </template>

            <template slot-scope="{ data }">
              <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">
                <vs-td :data="data[indextr].images">
                  <img
                    @click="
                      $router.push({
                        name: 'Product',
                        query: {
                          title: data[indextr].title,
                          pid:
                            data[indextr].type === 'Simple Product'
                              ? data[indextr].id
                              : parseInt(data[indextr].product_id),
                        },
                      })
                    "
                    style="width:60px;height:60px;object-fit:cover;border-radius:5px"
                    :src="
                      `https://zhop.admin.saihtunlu.me${
                        data[indextr].type === 'Simple Product'
                          ? data[indextr].images[0].path
                          : data[indextr].attri1.image
                      }`
                    "
                  />
                </vs-td>
                <vs-td
                  :data="data[indextr].title"
                  @click="
                    $router.push({
                      name: 'Product',
                      query: {
                        title: data[indextr].title,
                        pid:
                          data[indextr].type === 'Simple Product'
                            ? data[indextr].id
                            : data[indextr].product_id,
                      },
                    })
                  "
                >
                  {{
                  data[indextr].type === "Simple Product"
                  ? data[indextr].title
                  : data[indextr].product.title +
                  " - " +
                  data[indextr].attri1.name
                  }}
                  <span
                    v-if="data[indextr].attri2"
                  >
                    {{
                    "/" + data[indextr].attri2.name
                    }}
                  </span>
                </vs-td>
                <vs-td :data="data[indextr].quantity">
                  <span>
                    {{
                    data[indextr].sale_price
                    ? data[indextr].sale_price
                    : data[indextr].regular_price
                    }}
                    Ks
                  </span>
                  x{{ data[indextr].quantity }}
                </vs-td>
                <vs-td :data="data[indextr].regular_price">
                  <span>
                    {{
                    parseFloat(
                    data[indextr].sale_price
                    ? data[indextr].sale_price
                    : data[indextr].regular_price
                    ) * parseFloat(data[indextr].quantity)
                    }}Ks
                  </span>
                </vs-td>
              </vs-tr>
            </template>
          </vs-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      order: {},
      seeOrder: false,
      items: [],
    };
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
  created() {
    this.$emit("setTab", false);
  },
  methods: {
    seeDetail(order) {
      this.order = order;
      var array = [];
      this.order.detail.forEach((data) => {
        var product = {};
        if (data.product_type === "Simple Product") {
          product = data.product;
          product.quantity = data.quantity;
          array.push(product);
        } else {
          product = data.variation;
          product.quantity = data.quantity;
          array.push(product);
        }
      });
      this.items = array;
      this.seeOrder = true;
    },
  },
};
</script>

<style>
.myOrders {
  padding: 15px;
  background: rgb(var(--vs-theme));
  border-radius: 30px;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
.topDetail {
  background: rgb(var(--vs-theme));
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
.topDetail tr > td {
  vertical-align: top;
  word-break: break-all;
  min-width: 200px;
  color: rgb(var(--vs-dark));
  padding-bottom: 0.8rem;
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  .topDetail tr > td {
    min-width: 150px !important;
  }
  .topDetail {
    padding: 15px;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  .topDetail {
    padding: 25px;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  .topDetail {
    padding: 30px;
  }
}
</style>
