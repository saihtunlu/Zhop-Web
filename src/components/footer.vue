<template>
  <div class="row mt-lg-5 mt-md-4 mt-sm-2" id="footer">
    <div class="col-lg-4 firstFooter">
      <div @click="$router.push('/')" id="header_sm" class="upper flex-align-center pointer">
        <h2
          class="mr-1"
          style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #fff;"
        >Z</h2>
        <h2
          class="mr-1"
          style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #fff;"
        >H</h2>
        <h2
          class="mr-1"
          style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #000;"
        >O</h2>
        <h2
          class="mr-1"
          style="-webkit-text-stroke-width: 2px;
    -webkit-text-stroke-color: #fff;"
        >P</h2>
      </div>
      <p style="color:white" class="mb-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita autem
        reiciendis dolor sunt dolorum nemo ea, mollitia animi, quos a nulla
        enim, quisquam corporis voluptatum tempore voluptate fugiat ad
        voluptatem!
      </p>
      <vs-button
        radius
        class="open-icon footer-icon"
        transparent
        color="white"
        type="filled"
        icon-pack="bx"
        icon="bxl-facebook"
      ></vs-button>
      <vs-button
        radius
        class="open-icon footer-icon mx-2"
        color="white"
        transparent
        type="filled"
        icon-pack="bx"
        icon="bxl-twitter"
      ></vs-button>
      <vs-button
        radius
        transparent
        class="open-icon footer-icon"
        color="white"
        type="filled"
        icon-pack="bx"
        icon="bxl-instagram"
      ></vs-button>
    </div>
    <div class="col-lg-4 col-md-6 footer-center">
      <p style="color:white" class="text-bold mb-4">CONTACT US</p>
      <p style="color:white" class="mb-2">
        <vs-icon icon="bx-map-pin" class="mr-2" icon-pack="bx" color="white" />Address :
        <span class="sm-text">Street 1, Unknown Tsp, Yangon, MM.</span>
      </p>
      <p style="color:white" class="mb-2">
        <vs-icon icon="bx-mail-send" class="mr-2" icon-pack="bx" color="white" />Email :
        <a
          href="mailto:saihtunlu14996@gmail.com"
          style="color:white"
          class="sm-text"
        >saihtunlu14996@gmail.com</a>
      </p>
      <p style="color:white" class="mb-2">
        <vs-icon icon="bx-phone" class="mr-2" icon-pack="bx" color="white" />Phone :
        <a
          href="tel:saihtunlu14996@gmail.com"
          style="color:white"
          class="sm-text"
        >+959 XXXXXXXXX</a>
      </p>
    </div>
    <div class="col-lg-4 col-md-6">
      <p style="color:white" class="text-bold mb-4">SUBSCRIBE US</p>
      <form
        action="https://saihtunlu.us17.list-manage.com/subscribe/post?u=de398323affeb69d9445fb65d&amp;id=bc16c94446"
        method="post"
        id="mc-embedded-subscribe-form"
        name="mc-embedded-subscribe-form"
        class="validate"
        target="_blank"
        novalidate
      >
        <div class="subscribe">
          <p style="color:white">Subscribe us to get the latest news.</p>
          <vs-input
            icon="bx-mail-send"
            class="my-3 w-100"
            name="EMAIL"
            type="email"
            id="mce-EMAIL"
            icon-pack="bx"
            v-model="email"
          />
          <input
            hidden
            type="text"
            name="b_de398323affeb69d9445fb65d_bc16c94446"
            tabindex="-1"
            value
          />
          <button
            type="submit"
            class="hidden"
            id="mc-embedded-subscribe"
            value="Subscribe"
            name="subscribe"
            ref="submit"
          ></button>
          <vs-button color="primary" @click="$refs.submit.click()" class="w-100">Subscribe</vs-button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      email: "",
    };
  },
};
</script>

<style>
.subscribe {
  background: rgb(var(--vs-theme), 0.4);
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.footer-icon {
  background: rgb(var(--vs-theme), 0.2) !important;
  height: 45px !important;
  width: 45px !important;
}
input#mce-EMAIL {
  height: 40px !important;
  background: rgb(var(--vs-input)) !important;
  border-radius: 30px !important;
}
div#footer {
  background: rgb(var(--vs-primary));
  border-radius: 30px;
  box-shadow: 0px 4px 25px -8px rgb(var(--vs-primary), 0.2);
}
/* ------------------------------------------------'mobile'------------------------------------------------ */
@media screen and (max-width: 600px) {
  .subscribe .vs-button-primary.vs-button-filled {
    background: rgb(var(--vs-theme), 0.2) !important;
  }
  .subscribe {
    padding: 0px !important;
    background: transparent !important;
  }
  div#footer {
    margin-left: 0px !important;
    max-width: 100% !important;
    margin-right: 0px !important;
    padding: 15px !important;
    padding-top: 30px !important;
    background: rgb(var(--vs-primary));
    box-shadow: 0px 4px 25px -8px rgb(var(--vs-primary), 0.2);
    border-bottom-left-radius: 0px !important;
    border-bottom-right-radius: 0px !important;
    margin-bottom: 0px !important;
  }
  .footer-center {
    margin: 1rem 0px;
    padding: 1rem 5px !important;
    border-top: 1px solid rgb(255, 255, 255, 0.2);
    border-bottom: 1px solid rgb(255, 255, 255, 0.2);
  }
}
/* ------------------------------------------------'tablet'------------------------------------------------ */
@media screen and (min-width: 600px) and (max-width: 992px) {
  .firstFooter {
    margin-bottom: 1.5rem;
  }
  div#footer {
    margin-bottom: 15px !important;
    margin-left: 0px !important;
    max-width: 100% !important;
    padding: 20px !important;
    margin-right: 0px !important;
  }
  .footer-center {
    border-right: 1px solid rgb(255, 255, 255, 0.2);
  }
}
/* ------------------------------------------------'desktop'------------------------------------------------ */
@media (min-width: 992px) {
  div#footer {
    margin-left: 15px;
    padding: 30px;
    max-width: calc(100% - 30px) !important;
    margin-bottom: 30px !important;
  }
  .footer-center {
    border-left: 1px solid rgb(255, 255, 255, 0.2);
    border-right: 1px solid rgb(255, 255, 255, 0.2);
  }
}
</style>
