<template>
  <div class="row order-completed">
    <div class="col-lg-12 mt-3 lg-80">
      <div class="topDetail big-radius mb-3 row mx-0">
        <div class="flex-x-between col-12 px-0 mt-1 mb-3">
          <p class="pointer transparent_text upper text-bold caption">Order Completed</p>
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
              <vs-chip :color="order.paid ? 'success' : 'danger'">{{ order.paid ? "Yes" : "No" }}</vs-chip>
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
            ></vs-button>Billing Address
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
        class="topDetail big-radius row mx-0"
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
        <div class="col-lg-12 py-3 open bg-theme shadow big-radius mt-3">
          <vs-table
            hoverFlat
            class="vs-con-loading__container"
            pagination
            max-items="5"
            search
            :data="items"
          >
            <template slot="header">
              <p class="upper flex-align-center">
                <vs-button
                  radius
                  color="#fff"
                  class="whiteBtn sm-hide mr-2"
                  type="filled"
                  icon-pack="bx"
                  icon="bx-cube"
                ></vs-button>Items
              </p>
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
                              : data[indextr].product_id,
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
      items: [],
    };
  },
  created() {
    this.$emit("showTab", false);
    var order = this.$route.params.order;
    this.order = order;
    var array = [];
    order.detail.forEach((data) => {
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
  },
};
</script>

<style lang="scss" scoped>
</style>