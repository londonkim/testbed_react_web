import axios from 'axios'

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'

export default {
    getCards(params, cb, errCb) {
        axios.get('https://toyproject.kidsnote.com/cards/london.kim/api/', {
            params: params
        }).then(cb).catch(errCb)
    }
}