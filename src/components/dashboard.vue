<template>
  <div class="dashboard">
    <div class="flex-center flex-column user-detail">
      <div class="editProfile">
        <vs-avatar
          size="120px"
          class="mt-3"
          :src="`https://zhop.admin.saihtunlu.me${user.profile_image}`"
        />
        <input type="file" name="profile" @change="onFileChange" hidden ref="profile" id />
        <vs-button
          radius
          class="open-icon footer-icon"
          color="white"
          transparent
          @click="$refs.profile.click()"
          type="filled"
          icon-pack="bx"
          icon="bx-camera"
        ></vs-button>
      </div>
      <p class="caption mt-3" style="color:#fff">{{ user.name }}</p>
      <p class="sm-text" style="color:#fff">{{ user.email }}</p>
    </div>
    <div class="status big-radius pt-sm-4">
      <div class="flex-align-center row status-row">
        <div
          class="detailBox col-lg-2 col-md-2 col-sm-5"
          style="background:rgb(var(--vs-success),0.2);color:rgb(var(--vs-success))"
        >
          <p class="mb-3 sm-text">Orders Completed</p>
          <p class="caption">{{completed}}</p>
        </div>
        <div
          class="detailBox col-lg-2 col-md-2 col-sm-5"
          style="background:rgb(var(--vs-warning),0.2);color:rgb(var(--vs-warning))"
        >
          <p class="mb-3 sm-text">Orders Pending</p>
          <p class="caption">{{pending}}</p>
        </div>
        <div
          class="detailBox col-lg-2 col-md-2 col-sm-5"
          style="background:rgb(var(--vs-primary),0.2);color:rgb(var(--vs-primary))"
        >
          <p class="mb-3 sm-text">Orders delivering</p>
          <p class="caption">{{delivering}}</p>
        </div>
        <div
          class="detailBox col-lg-2 col-md-2 col-sm-5"
          style="background:rgb(var(--vs-danger),0.2);color:rgb(var(--vs-danger))"
        >
          <p class="mb-3 sm-text">Orders Cancelled</p>
          <p class="caption">{{cancelled}}</p>
        </div>
      </div>
      <div class="mt-3" v-if="isSmall">
        <div
          class="flex-x-between medium-radius bg-gray mb-3"
          style="padding:1.3rem"
          v-for="tab in tabs "
          :key="tab.name"
          @click="
            () => {
              $router.push({
                name: 'MyAccount',
                query: { index: tab.name },
              });
            }
          "
        >
          <div class="flex-align-center">
            <vs-icon :icon="tab.icon" icon-pack="bx" class="mr-2" />
            <p>{{tab.name}}</p>
          </div>
          <vs-icon icon="bx-chevron-right" icon-pack="bx" />
        </div>

        <div class="flex-x-between medium-radius bg-gray mb-3 p-3">
          <div class="flex-align-center">
            <vs-icon icon="bx-moon" icon-pack="bx" class="mr-2" />
            <p>Dark Mode</p>
          </div>
          <Theme />
        </div>
        <div class="flex-x-between medium-radius bg-gray mb-3 p-3">
          <div class="flex-align-center">
            <vs-icon icon="bx-flag" icon-pack="bx" class="mr-2" />
            <p>Language</p>
          </div>
          <Lang />
        </div>
        <vs-button
          color="danger"
          class="w-100 mb-4"
          @click="$store.dispatch('logout')"
          type="flat"
          icon="bx-log-out-circle"
          icon-pack="bx"
          icon-after
          id="signOutBtn"
        >Sign Out</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "../constants/tabs";
import { isMobile, isTablet } from "mobile-device-detect";
import Theme from "./themeSwitcher";
import Lang from "./LangaugeSwitcher";

export default {
  data() {
    return {
      isSmall: isMobile || isTablet,
      pending: 0,
      tabs: tabs,
      delivering: 0,
      completed: 0,
      cancelled: 0,
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    orders() {
      return this.$store.state.orders;
    },
  },
  components: {
    Theme,
    Lang,
  },
  created() {
    this.$emit("setTab", true);
  },
  mounted() {
    var orders = this.orders;
    this.pending = orders.filter((data) => {
      return data.status === "Pending";
    }).length;
    this.delivering = orders.filter((data) => {
      return data.status === "Delivering";
    }).length;
    this.completed = orders.filter((data) => {
      return data.status === "Completed";
    }).length;
    this.cancelled = orders.filter((data) => {
      return data.status === "Cancelled";
    }).length;
  },
  methods: {
    onFileChange(e) {
      var file = e.target.files[0];
      this.user.profile_image = null;
      var reader = new FileReader();
      reader.onload = (e) => {
        this.user.profile_image = e.target.result;
        this.$store.dispatch("updateProfileImage", {
          image: this.user.profile_image,
        });
      };
      reader.readAsDataURL(file);
    },
  },
};
</script>

<style>
button#signOutBtn {
  background: rgb(var(--vs-danger), 0.2) !important;
}
.detailBox {
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px !important;
  border-radius: 15px;
}
.user-detail {
  background: rgb(var(--vs-primary));
  padding: 15px;
  padding-bottom: 65px !important;
}
.dashboard {
  border-radius: 30px;
  background: rgb(var(--vs-theme));
  overflow: hidden;
  box-shadow: 0px 4px 25px 0px rgba(0, 0, 0, 0.07) !important;
}
.status {
  background: rgb(var(--vs-theme));
  margin-top: -30px;
}
.editProfile button.vs-component {
  position: absolute;
  margin-top: -50px;
  margin-left: 90px;
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  .status-row {
    justify-content: space-evenly !important;
  }
  .detailBox {
    margin-bottom: 1rem;
  }
  .status {
    padding: 15px;
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  .status-row {
    justify-content: space-evenly !important;
  }
  .detailBox {
    margin-bottom: 1rem;
  }
  .status {
    padding: 25px;
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  .status-row {
    justify-content: center !important;
  }
  .detailBox {
    margin-right: 1rem;
  }
  .status {
    padding: 30px;
  }
}
</style>
