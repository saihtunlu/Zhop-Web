const { default: axios } = require("../axios")

export const getAllData = async () => {
    return await axios.get(`/getAllData`)
}

