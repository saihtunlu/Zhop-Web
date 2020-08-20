export default {

    isLogged: state => !!state.user,
    getTheme: (state) => (mode) => {
        var theme = state.themes.filter((data) => {
            return data.mode === mode;
        })[0]
        return theme;
    },
    featured: (state) => (limit) => {
        var products = state.products.filter((data) => {
            return parseInt(data.featured) === 1;
        }).slice(0, limit)
        return products;
    },
    new: (state) => (limit) => {
        var products = state.products.sort(function (a, b) {
            return new Date(b.created_at) - new Date(a.created_at);
        }).slice(0, limit)
        return products;
    },
    discount: (state) => (limit) => {
        var products = state.products.filter((data) => {
            return data.sale_price;
        }).slice(0, limit)
        return products;
    },
    sellProduct: (state) => (limit) => {
        var products = state.products.sort(function (low, hight) {
            return parseInt(hight.sold_out) - parseInt(low.sold_out)
        }).slice(0, limit)
        return products;
    },
    selectedCategory: (state) => (id) => {
        var category = state.categories.filter((data) => {
            return parseInt(data.id) === parseInt(id);
        })[0]
        return category;
    },
    filterProduct: (state) => (params) => {
        var array = [];
        for (let i = 0; i < 3; i++) {
            var selectedData = state.products.filter(element => {
                if (!element.categories[i]) {
                    return false;
                } else {
                    return parseInt(element.categories[i].category3_id) === parseInt(params.id);
                }
            })
            selectedData.forEach(element => {
                array.push(element)
            });
        }

        return array.slice(0, params.number);
    },
    searchProduct: (state) => (params) => {
        var filterByCategory = state.products.filter(data => {
            for (let i = 0; i < 3; i++) {
                if (!data.categories[i]) {
                    return false;
                } else {
                    return parseInt(data.categories[i].category1_id) === parseInt(params.id);
                }
            }
        })
        return filterByCategory.filter(data => data.title.toLowerCase().includes(params.query.toLowerCase()))
    },
    searchAllProduct: (state) => (params) => {
        return state.products.filter(data => data.title.toLowerCase().includes(params.toLowerCase()))
    },
    getAllProducts: (state) => (number) => {
        return state.products.slice(0, number)
    },
    priceRange: (state) => {
        var prices = [];
        state.products.forEach((data) => {
            if (data.type === "Simple Product") {
                var price = data.sale_price ? data.sale_price : data.regular_price;
                prices.push(parseInt(price));
            } else {
                data.variations.forEach((data2) => {
                    var price = data2.sale_price
                        ? data2.sale_price
                        : data2.regular_price;
                    prices.push(parseInt(price));
                });
            }
        });
        var min = Math.min.apply(Math, prices.map(function (price) { return price; }))
        var max = Math.max.apply(Math, prices.map(function (price) { return price; }))
        return [min, max]
    },
    priceRangeByCategory: (state) => (id) => {
        var products = state.products.filter((data) => {
            for (let i = 0; i < 3; i++) {
                if (!data.categories[i]) {
                    return false;
                } else {
                    return parseInt(data.categories[i].category1_id) === parseInt(id);
                }
            }
        });
        var prices = [];
        products.forEach((data) => {
            if (data.type === "Simple Product") {
                var price = data.sale_price ? data.sale_price : data.regular_price;
                prices.push(parseInt(price));
            } else {
                data.variations.forEach((data2) => {
                    var price = data2.sale_price
                        ? data2.sale_price
                        : data2.regular_price;
                    prices.push(parseInt(price));
                });
            }
        });
        var min = Math.min.apply(Math, prices.map(function (price) { return price; }))
        var max = Math.max.apply(Math, prices.map(function (price) { return price; }))
        return [min, max]
    },
    filterPriceByCategory: (state) => (params) => {
        var id = params.id;
        var min = params.min;
        var max = params.max;
        var results = []
        var products = state.products.filter((data) => {
            for (let i = 0; i < 3; i++) {
                if (!data.categories[i]) {
                    return false;
                } else {
                    return parseInt(data.categories[i].category1_id) === parseInt(id);
                }
            }
        });

        products.forEach(data => {
            if (data.type === "Simple Product") {
                var price = data.sale_price ? data.sale_price : data.regular_price;
                if (min <= parseInt(price) && max >= parseInt(price)) {
                    results.push(data)
                }
            } else {
                var prices = []
                data.variations.forEach((data2) => {
                    var price = data2.sale_price
                        ? data2.sale_price
                        : data2.regular_price;
                    prices.push(parseInt(price));
                });
                var maxVal = Math.max.apply(Math, prices.map(function (price) { return price; }))
                if (min <= parseInt(maxVal) && max >= parseInt(maxVal)) {
                    results.push(data)
                }
            }
        })
        return results;
    },
    filterPriceByAll: (state) => (params) => {
        var min = params.min;
        var max = params.max;
        var results = []
        state.products.forEach(data => {
            if (data.type === "Simple Product") {
                var price = data.sale_price ? data.sale_price : data.regular_price;
                if (min <= parseInt(price) && max >= parseInt(price)) {

                    results.push(data)
                }
            } else {
                var prices = []
                data.variations.forEach((data2) => {
                    var price = data2.sale_price
                        ? data2.sale_price
                        : data2.regular_price;
                    prices.push(parseInt(price));
                });
                var maxVal = Math.max.apply(Math, prices.map(function (price) { return price; }))
                if (min - 1 <= parseInt(maxVal) && max + 1 >= parseInt(maxVal)) {
                    results.push(data)
                }
            }
        })
        return results;
    },
    getProduct: (state) => (id) => {
        return state.products.filter(data => {
            return parseInt(data.id) === parseInt(id)
        })[0]
    },
    getVariation: (state) => (number) => {
        return state.variations.filter(data => {
            return parseInt(data.product_no) === parseInt(number)
        })
    },
    getBrandProduct: (state) => (params) => {
        return state.products.filter(data => {
            return parseInt(data.brand_id) === parseInt(params.id);
        }).slice(0, params.number)
    },
    getRelatedProduct: (state) => (params) => {
        var products = state.products;
        var product = params.product;
        console.log("product", product)
        var array = []
        for (let i = 0; i < product.categories.length; i++) {
            var data2 = products.filter(data => {
                if (data.categories[i]) {
                    return parseInt(data.categories[i].category3_id) === parseInt(product.categories[i].category3_id) && parseInt(data.id) !== parseInt(product.id);
                }
            })
            data2.forEach(element => {
                array.push(element)
            });
        }

        for (let i = 0; i < product.tags.length; i++) {
            var checkedArray = []
            products.forEach(productValue => {
                var check = productValue.tags.filter(data => {
                    return parseInt(data.tag_id) === parseInt(product.tags[i].tag_id) && parseInt(productValue.id) !== parseInt(product.id);
                })[0]
                if (check) {
                    checkedArray.push(productValue);
                }
            });
            checkedArray.forEach(element => {
                array.push(element)
            });
        }
        return array.slice(0, params.number)
    },
}