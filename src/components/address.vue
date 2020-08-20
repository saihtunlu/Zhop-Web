<template>
  <div class="myAddress big-radius">
    <div class="col-12 flex-x-between">
      <h3 class="upper flex-align-center my-3">
        <vs-button
          radius
          color="#000"
          class="darkBtn sm-hide mr-2"
          type="filled"
          icon-pack="bx"
          icon="bxs-truck"
        ></vs-button>Delivery Address
      </h3>
      <vs-button
        radius
        class="open-icon"
        transparent
        v-if="!edit && !addNew"
        @click="edit = true"
        type="flat"
        color="dark"
        icon-pack="bx"
        icon="bx-edit-alt"
      ></vs-button>
      <div v-else class="flex-x-between">
        <vs-button
          class="open-icon sm-hide"
          transparent
          @click="save()"
          type="filled"
          icon-pack="bx"
          icon="bx-save"
        >Save Changes</vs-button>
        <vs-button
          class="open-icon sm-hide ml-3"
          transparent
          color="warning"
          @click="edit = false"
          type="border"
          icon-pack="bx"
          icon="bx-x"
        >Cancel</vs-button>
      </div>
    </div>
    <div class="col-12 px-sm-0">
      <div class="flex-x-between w-100" v-if="!edit && !addNew">
        <p>State</p>
        <p>{{ address.state }}</p>
      </div>
      <vs-select
        class="w-100"
        label="State"
        autocomplete
        v-else
        @change="changeState"
        v-model="address.state"
      >
        <vs-select-item
          :value="item.value"
          :text="item.label"
          v-for="item in states"
          :key="item.value"
        />
      </vs-select>
    </div>
    <vs-divider />
    <div class="px-sm-0 col-12">
      <div class="w-100 flex-x-between" v-if="!edit && !addNew">
        <p>City/Township</p>
        <p>{{ address.city }}</p>
      </div>
      <vs-select v-else label="City/Township" class="w-100" autocomplete v-model="address.city">
        <vs-select-item
          :value="item.label"
          :text="item.label"
          v-for="item in cities"
          :key="item.value"
        />
      </vs-select>
    </div>
    <vs-divider />
    <div class="px-sm-0 col-12">
      <div class="w-100 flex-x-between" v-if="!edit && !addNew">
        <p>Address Line 1</p>
        <p>{{ address.addressLine1 }}</p>
      </div>
      <vs-input v-else class="w-100" label="Address Line 1" v-model="address.addressLine1" />
    </div>
    <vs-divider />
    <div class="px-sm-0 mb-3 col-12">
      <div v-if="!edit && !addNew" class="w-100 flex-x-between">
        <p>Address Line 2</p>
        <p>{{ address.addressLine2 }}</p>
      </div>
      <vs-input v-else class="w-100" label="Address Line 2" v-model="address.addressLine2" />
    </div>
    <vs-button
      class="w-100 my-3 lg-hide md-hide"
      transparent
      v-if="edit || addNew"
      @click="save()"
      type="filled"
      icon-pack="bx"
      icon="bx-save"
    >Save Changes</vs-button>
    <vs-button
      class="w-100 lg-hide md-hide"
      transparent
      v-if="edit || addNew"
      color="warning"
      @click="edit = false"
      type="border"
    >Cancel</vs-button>
  </div>
</template>

<script>
import { state, city } from "../constants/address";
export default {
  data() {
    return {
      edit: false,
      address: null,
      addNew: false,
      states: state,
      cities: [],
    };
  },
  computed: {
    originAddress() {
      return this.$store.state.address;
    },
  },
  created() {
    this.$emit("setTab", false);
  },
  mounted() {
    this.address = this.originAddress;
    if (!this.originAddress.state) {
      this.addNew = true;
    }
    this.changeState();
  },
  methods: {
    save() {
      this.edit = false;
      this.addNew = false;
      var address = this.address;
      var addNew = this.addNew;
      this.$store.dispatch("updateAddress", { address, addNew });
    },
    changeState() {
      var cities = city.filter((data) => {
        return data.state === this.address.state;
      });
      console.log("changeState -> cities", cities);

      var data = cities.sort(function (a, b) {
        return b.label - a.label || a.label.localeCompare(b.label);
      }); // reorder
      this.cities = data;
    },
  },
};
</script>

<style>
.myAddress {
  padding: 15px;
  background: rgb(var(--vs-theme));
  box-shadow: 0 0 25px 0 rgb(0, 0, 0, 0.04);
}
</style>
