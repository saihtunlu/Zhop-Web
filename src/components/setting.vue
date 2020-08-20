<template>
  <div>
    <div class="myAddress big-radius">
      <div class="col-12 flex-x-between">
        <h3 class="upper flex-align-center py-3">
          <vs-button
            radius
            color="#000"
            class="darkBtn sm-hide mr-2"
            type="filled"
            icon-pack="bx"
            icon="bx-user"
          ></vs-button>Personal Information
        </h3>
        <vs-button
          radius
          class
          transparent
          color="dark"
          v-if="!edit"
          @click="edit = true"
          type="flat"
          icon-pack="bx"
          icon="bx-edit-alt"
        ></vs-button>
        <div v-else class="flex-x-between">
          <vs-button
            class="sm-hide"
            transparent
            @click="savePersonal()"
            type="filled"
            icon-pack="bx"
            icon="bx-save"
          >Save Changes</vs-button>
          <vs-button
            class="sm-hide ml-3"
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
        <div class="flex-x-between" v-if="!edit">
          <p>Username</p>
          <p>{{ user.name }}</p>
        </div>
        <vs-input v-else label="Username" class="w-100" v-model="user.name" />
      </div>
      <vs-divider />
      <div class="flex-x-between col-12 px-sm-0">
        <div class="flex-x-between w-100" v-if="!edit">
          <p>Email</p>
          <p>{{ user.email }}</p>
        </div>
        <vs-input v-else label="Email" type="email" class="w-100" v-model="user.email" />
      </div>
      <vs-divider />
      <div class="flex-x-between mb-3 col-12 px-sm-0">
        <div class="flex-x-between w-100" v-if="!edit">
          <p>Phone Number</p>
          <p>{{ user.phone }}</p>
        </div>
        <vs-input v-else label="Phone Number" type="number" class="w-100" v-model="user.phone" />
      </div>
      <vs-button
        class="w-100 my-3 lg-hide md-hide"
        transparent
        v-if="edit"
        @click="savePersonal()"
        type="filled"
        icon-pack="bx"
        icon="bx-save"
      >Save Changes</vs-button>
      <vs-button
        class="w-100 lg-hide md-hide"
        transparent
        v-if="edit"
        color="warning"
        @click="edit = false"
        type="border"
      >Cancel</vs-button>
    </div>

    <div class="myAddress big-radius mt-medium">
      <div class="col-12 flex-x-between">
        <h3 class="upper flex-align-center py-3">
          <vs-button
            radius
            color="#000"
            class="darkBtn sm-hide mr-2"
            type="filled"
            icon-pack="bx"
            icon="bx-lock"
          ></vs-button>Security
        </h3>
        <vs-button
          class="open-icon sm-hide"
          transparent
          @click="save()"
          :disabled="passwordError ? true : false"
          :color="passwordError ? 'danger' : 'primary'"
          type="filled"
          icon-pack="bx"
          icon="bx-save"
        >Change Password</vs-button>
      </div>
      <vs-input
        placeholder="Enter Current Password"
        type="password"
        class="w-100 w-100 mb-3"
        label="Current Password"
        v-model="currentPassword"
      />
      <vs-input
        placeholder="Enter New Password"
        type="password"
        label="New Password"
        class="w-100 w-100 mb-3"
        v-model="newPassword"
      />
      <vs-input
        placeholder="Enter Password Confirmation"
        type="password"
        :danger="passwordError"
        danger-text="The confirmation password does not match with password."
        @change="checkPassword"
        class="w-100 w-100 mb-3"
        label="New Password Confirmation"
        v-model="passwordConfirmation"
      />
      <p
        class="ml-3 mb-3 mt-3 sm-text primary pointer"
        @click="$router.push({name:'Forgot'})"
      >Forgot Password?</p>
      <div class="col-12 p-0">
        <vs-button
          class="lg-hide md-hide w-100"
          transparent
          style="float:none !important;"
          @click="save()"
          :disabled="passwordError ? true : false"
          :color="passwordError ? 'danger' : 'primary'"
          type="filled"
          icon-pack="bx"
          icon="bx-save"
        >Change Password</vs-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      edit: false,
      passwordError: false,
      currentPassword: "",
      newPassword: "",
      passwordConfirmation: "",
      user: {},
    };
  },
  created() {
    this.user = this.$store.state.user;
    this.$emit("setTab", false);
  },
  methods: {
    savePersonal() {
      var data = {};
      data.id = this.user.id;
      data.email = this.user.email;
      data.name = this.user.name;
      data.phone = this.user.phone;
      this.$store.dispatch("updatePersonal", { data }).then(() => {
        this.edit = false;
      });
    },
    checkPassword() {
      if (this.newPassword !== this.passwordConfirmation) {
        this.passwordError = true;
        return false;
      } else {
        this.passwordError = false;
        return true;
      }
    },
    save() {
      var data = {};
      data.current_password = this.currentPassword;
      data.new_password = this.newPassword;

      this.$axios
        .post(`/updatePassword`, { data: data })
        .then(() => {
          this.$vs.notify({
            title: "Success",
            text: `Password has been changed.`,
            color: "success",
          });
        })
        .catch((error) => {
          this.$vs.notify({
            title: "Error",
            text: error.response.data.error,
            color: "danger",
          });
        });
    },
  },
};
</script>

<style></style>
