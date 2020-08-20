const { default: axios } = require("../axios")

const getAllData = () => {
    axios.get(`/getAllData`)
        .then(response => {
            console.log("getAllData -> response", response.data)
        })
        .catch(error => {
            console.log("getAllData -> error", error)
        });
}
export { getAllData };