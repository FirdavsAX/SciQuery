import axios from  'axios'

export const create = async (url,object) => {
    const response = await axios.post(url,object);
}