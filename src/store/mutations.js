export default {
    setCurrentUser(state, data) {
        state.user = data;
        localStorage.setItem('user', JSON.stringify(data))
    },
    addToCart(state, data) {
        state.cart = data;
        localStorage.setItem('cart', JSON.stringify(data));
    },
    addCartLength(state, data) {
        state.cartLength = data;
    },
    addCartTotal(state, data) {
        state.cartTotal = data;
    },
    setLang(state, data) {
        state.lang = data;
    },
    setActiveIndex(state, data) {
        state.activeIndex = data;
    },
    setUserData(state, userData) {
        state.user = userData
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem('user', JSON.stringify(userData))
        window.location.reload();
    },
    setUserFav(state, userData) {
        state.fav = userData
    },
    setUserOrders(state, userData) {
        state.orders = userData
    },
    setUserAddress(state, userData) {
        state.address = userData
    },
    setSiteData(state, data) {
        state.products = data.products
        state.categories = data.categories
        state.shippings = data.shippings
        state.payments = data.payments
        state.events = data.events
        state.general = data.general
        state.themes = data.themes
        state.variations = data.variations
        state.isPageReady = true;

    },
    clearUserData() {
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("user");
        window.location.reload();
    },

}