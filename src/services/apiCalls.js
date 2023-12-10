import axios from 'axios'

const host='http://localhost:8003'

export const logUser = async(body)=>{
    return await axios.post(`${host}/api/login`,body)
}