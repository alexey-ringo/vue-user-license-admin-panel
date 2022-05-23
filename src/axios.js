// axios
import axios from 'axios'

const baseURL = process.env.VUE_APP_BASE_URL

export default axios.create({
  baseURL
  // You can add your headers here
})
