import axios from '../axios'

export default {
    login: async ({ dispatch }, { email, password, remember }) => {
        return (await axios
            .get("https://zhop.admin.saihtunlu.me/sanctum/csrf-cookie")
            .then(() => {
                axios
                    .post("https://zhop.admin.saihtunlu.me/login", { email: email, password: password, remember: remember })
                    .then(() => {
                        dispatch('getUser')
                    })
                    .catch((error) => {
                        console.log("login -> error", error);
                    });
            })).catch(err => {
                return err.response.data
            })
    },
    logout({ commit }) {
        axios.post("https://zhop.admin.saihtunlu.me/logout").then(() => {
            commit('clearUserData')
        });
    },
    getCart({ dispatch }) {
        if (localStorage.getItem("cart")) {
            const cart = JSON.parse(localStorage.getItem("cart"));
            dispatch('addToCart', { cart })
        }

    },
    beforeAddToCart({ dispatch, state }, { params }) {
        var cart = state.cart;
        var product = params.product;
        var qty = params.qty;
        if (product.type === "Variable Product") {
            var selectedProduct = params.selectedProduct;
            if (!selectedProduct) {
                return 'error';
            } else {
                var Selected = selectedProduct;
                Selected.title = product.title;
                Selected.addCart = qty;
                Selected.type = product.type;
                Selected.brand = product.brand;
                Selected.product_id = product.id;
                var check = cart.filter((data) => {
                    return data.id === Selected.id;
                });
                if (check.length > 0) {
                    var index = cart
                        .map((x) => {
                            return x.id;
                        })
                        .indexOf(Selected.id);
                    cart[index].addCart =
                        parseInt(cart[index].addCart) + parseInt(Selected.addCart);
                    dispatch("addToCart", { cart });
                } else {
                    cart.push(Selected);
                    dispatch("addToCart", { cart });
                }
                return 'success';
            }
        }
        if (product.type === "Simple Product") {
            product.addCart = qty;
            check = cart.filter((data) => {
                return data.id === product.id;
            });
            if (check.length > 0) {
                index = cart
                    .map((x) => {
                        return x.id;
                    })
                    .indexOf(product.id);
                cart[index].addCart =
                    parseInt(cart[index].addCart) + parseInt(product.addCart);
            } else {
                cart.push(product);
            }
            dispatch("addToCart", { cart });
            return 'success';
        }
    },
    addToCart({ commit }, { cart }) {
        commit('addToCart', cart)
        var values = cart.map(item => Number(item.addCart));
        var cart_no = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
                return prev + curr;
            } else {
                return prev;
            }
        }, 0);
        commit('addCartLength', cart_no)
        var subtotal = cart.reduce((sum, item) => sum + (item.sale_price ? item.addCart * item.sale_price : item.addCart * item.regular_price), 0);
        commit('addCartTotal', subtotal)
    },
    register: async ({ dispatch }, { data }) => {
        return await axios
            .post("/signUp", {
                data
            }).then(() => {
                var email = data.email;
                var password = data.password;
                dispatch('login', { email, password })
            })
    },
    getUser: async ({ commit }) => {
        return await axios.get("/auth").then((response) => {
            commit('setUserData', response.data)
        })
    },
    getAllData: async ({ commit }) => {
        const res = await axios.get(`/getAllData`)
        if (res !== null || res.data !== null) {
            commit('setSiteData', res.data)
        }
    },
    getUserAddress: async ({ commit }) => {

        return await axios.get("/address").then((response) => {
            commit('setUserAddress', response.data)
        })
    },
    getUserFav: async ({ commit }) => {
        return await axios.get("/getFav").then((response) => {
            commit('setUserFav', response.data)
        })
    },
    getUserOrders: async ({ commit }) => {
        return await axios.get("/orders").then((response) => {
            commit('setUserOrders', response.data)
        })
    },
    addToFav: async ({ commit, state }, { product }) => {
        console.log("product", product)
        const res = await axios.post(`/addFav`, { id: product.id });
        if (res !== null || res.data !== null) {
            var array = {};
            array.product_id = product.id;
            array.product = product;
            const fav = [...state.fav, array]
            commit('setUserFav', fav)
            return 'success';
        }
    },
    removeFav: async ({ commit, state }, { product_id }) => {
        const res = await axios.post(`/removeFav`, { id: product_id });
        if (res !== null || res.data !== null) {
            var fav = state.fav;
            var index = fav
                .map(x => {
                    return x.product_id;
                })
                .indexOf(product_id);
            fav.splice(index, 1)
            commit('setUserFav', fav)
            return 'success';
        }
    },
    updateAddress: async ({ commit }, { address, addNew }) => {
        if (addNew) {
            await axios.post(`/addAddress`, { data: address })
                .then(response => {
                    commit('setUserAddress', response.data)
                })
        } else {
            await axios.post(`/updateAddress`, { data: address })
                .then(response => {
                    commit('setUserAddress', response.data)
                })
        }
    },
    updateProfileImage: async ({ commit, state }, { image }) => {
        await axios.post(`/updateProfile`, { file: image, id: state.user.id })
            .then(response => {
                var user = { ...state.user, profile_image: response.data }
                commit('setCurrentUser', user)
            })
    },
    updatePersonal: async ({ commit, state }, { data }) => {
        await axios.post(`/updateUser`, { data: data })
            .then(() => {
                var user = { ...state.user, data }
                commit('setCurrentUser', user)
            })
    }
}