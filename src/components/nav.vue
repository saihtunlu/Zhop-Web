<template>
  <div>
    <div
      class="row nabarx light-shadow navbar flex-align-center home_nav"
      id="navbar"
      :class="{ 'navbar-hidden': !showNavbar }"
    >
      <div class="col-6 flex-align-center">
        <div @click="$router.push('/')" id="header_sm" class="upper mr-5 pointer flex-center">
          <h2
            class="mr-1"
            style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(var(--vs-dark));"
          >Z</h2>
          <h2
            class="mr-1"
            style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(var(--vs-dark));"
          >H</h2>
          <h2
            class="mr-1"
            style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(var(--vs-primary));"
          >O</h2>
          <h2
            class="mr-1"
            style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: rgb(var(--vs-dark));"
          >P</h2>
        </div>
        <vs-dropdown class="pointer" v-if="!isSmall" vs-trigger-click>
          <a id="navShopList" class="flex-x-between dark">
            <div class="flex-align-center">
              <vs-icon icon="bxs-store" class="mr-2" icon-pack="bx" />
              <p class="dark text-bold normal-text">{{ $t("shop") }}</p>
            </div>
            <vs-icon icon="bxs-chevron-down" class="ml-3" icon-pack="bx" />
          </a>

          <vs-dropdown-menu id="main_dropdown">
            <vs-dropdown-item
              class="link-item"
              v-for="category in categories"
              :key="category.label + category.id"
              @click="
                () => {
                  indexActive = 2;
                  $router.push({
                    name: 'Shop',
                    query: { target: 'category', cid: category.id },
                  });
                }
              "
            >
              <vs-icon :icon="`bx-${category.icon}`" class="mr-2" icon-pack="bx" />
              {{ category.label }}
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <div class="col-6 flex-end">
        <div class="sm-hide md-hide flex-end flex-align-center" v-if="!isSmall">
          <Cart class="mr-3" />
          <router-link :to="{ name: 'Help' }" class="mr-4 dark text-bold flex-align-center">
            <vs-icon icon="bxs-help-circle" color="dark" class="mr-1" icon-pack="bx" />
            {{ $t("help") }}
          </router-link>
          <Lang class="mr-4" />
          <ThemeSwitcher class="mr-4" />
          <vs-button
            v-if="!isLogged"
            color="primary"
            type="filled"
            icon-pack="bx"
            icon="bx-log-in-circle"
            icon-after
            :to="{ name: 'Login' }"
          >
            <span class="sm-hide md-hide block">
              {{
              $t("login")
              }}
            </span>
          </vs-button>

          <vs-dropdown v-else class="pointer" vs-trigger-click>
            <vs-avatar size="45px" :src="`https://zhop.admin.saihtunlu.me${user.profile_image}`" />
            <vs-dropdown-menu id="myaccount_dropdown">
              <vs-dropdown-item
                class="link-item flex-align-center"
                v-for="tab in tabs"
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
                <vs-icon :icon="tab.icon" class="mr-2" icon-pack="bx" />
                {{ tab.name }}
              </vs-dropdown-item>
              <vs-dropdown-item
                class="link-item flex-align-center danger"
                @click="$store.dispatch('logout')"
              >
                <vs-icon icon="bx-log-out-circle" class="mr-2" icon-pack="bx" />Sign Out
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>
        </div>

        <vs-dropdown class="pointer" v-if="isSmall" vs-trigger-click>
          <a id="navShopList" class="flex-x-between dark">
            <div class="flex-align-center">
              <vs-icon icon="bxs-store" class="mr-2" icon-pack="bx" />
              <p class="dark text-bold normal-text">{{ $t("shop") }}</p>
            </div>
            <vs-icon icon="bxs-chevron-down" class="ml-3" icon-pack="bx" />
          </a>

          <vs-dropdown-menu id="main_dropdown">
            <vs-dropdown-item
              class="link-item"
              v-for="category in categories"
              :key="category.label + category.id"
              @click="
                () => {
                  indexActive = 2;
                  $router.push({
                    name: 'Shop',
                    query: { target: 'category', cid: category.id },
                  });
                }
              "
            >
              <vs-icon :icon="`bx-${category.icon}`" class="mr-2" icon-pack="bx" />
              {{ category.label }}
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import tabs from "../constants/tabs";
import { mapGetters, mapState } from "vuex";
import Lang from "./LangaugeSwitcher";
import ThemeSwitcher from "./themeSwitcher";
import { isMobile, isTablet } from "mobile-device-detect";
import Cart from "./FloatCart";

export default {
  props: {
    auth: null,
  },
  data() {
    return {
      tabs: tabs,
      active: false,
      active1: false,
      isSmall: isMobile || isTablet,
      scrollPosition: null,
      showNavbar: true,
      lastScrollPosition: 0,
      query: null,
      results: [],
    };
  },
  components: {
    Lang,
    Cart,
    ThemeSwitcher,
  },
  computed: {
    indexActive() {
      return this.$store.state.activeIndex;
    },
    ...mapGetters(["isLogged"]),
    ...mapState(["user", "categories"]),
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("scroll", this.updateScroll);
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
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
    updateScroll() {
      this.scrollPosition = window.scrollY;
    },
  },
};
</script>

<style>
div#myaccount_dropdown {
  width: 180px;
}
/* ------------------------------------start of navbar-------------------------------------------- */
.navbar {
  background: rgb(var(--vs-theme));
  width: 100% !important;
  padding: 10px;
  margin: 0 !important;
  top: 0px;
  position: fixed !important;
  transform: translateY(0);
  transition: 0.3s all ease-out;
  z-index: 1010;
  left: 0px;
  right: 0px;
}
.navbar-hidden {
  transform: translateY(-100%) !important;
}
div#navbar {
  height: 70px;
}
a#navShopList {
  padding: 12px 10px;
  background: rgb(var(--vs-gray));
  min-width: 120px;
  border-radius: 15px;
}

/* --------------------------------end of sidebar -------------------------------- */
/* ----------------------------------------desktop----------------------------------------------------------- */
@media (min-width: 992px) {
  a#navShopList {
    min-width: 180px !important;
  }
  .navbar {
    padding: 0px 15px;
  }
}

/* -----------------------------------------------------------mobile--------------------------------------------------- */
@media screen and (max-width: 600px) {
  .navbar {
    padding: 0px 5px;
  }
}

/* -------------------------------------tablet------------------------------------------------ */
@media screen and (min-width: 500px) and (max-width: 992px) {
  .navbar {
    padding: 0px 15px;
  }
  div#mainSidebar .vs-sidebar {
    max-width: 320px;
  }
}
</style>
