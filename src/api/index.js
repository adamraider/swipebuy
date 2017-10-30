import axios from 'axios'

export function marty () {
  return axios.get('/static/marty.json', {
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(res => res.data)
}
