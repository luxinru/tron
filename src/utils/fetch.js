import axios from 'axios'
import qs from 'qs'
import {
  Toast
} from 'vant'
import router from '@/router'
// import {Notify} from 'vant'
import {
  Dialog
} from 'vant'
import 'vant/lib/index.css'
let loadingCount = 0

export const showLoading = () => {
  if (loadingCount <= 0) {
    Toast.loading({
      // mask: true,
      duration: 20000
    })
  }
  loadingCount++
}

export const hideLoading = () => {
  loadingCount--
  if (loadingCount <= 0) {
    Toast.clear()
    loadingCount = 0
  }
}

const getErrorMsg = function (type = 1) {
  let lang = window.localStorage.getItem('lang') || 'en'
  if (type === 1) {
    switch (lang) {
      case 'ar':
        return '网络错误，请稍后重试！'
      case 'de':
        return '网络错误，请稍后重试！'
      case 'es':
        return '网络错误，请稍后重试！'
      case 'fr':
        return '网络错误，请稍后重试！'
      case 'id':
        return '网络错误，请稍后重试！'
      case 'jp':
        return '网络错误，请稍后重试！'
      case 'kr':
        return '网络错误，请稍后重试！'
      case 'pt':
        return '网络错误，请稍后重试！'
      case 'tr':
        return '网络错误，请稍后重试！'
      case 'en':
        return '网络错误，请稍后重试！'
      case 'ch':
        return '网络错误，请稍后重试！'
      case 'hk':
        return '网络错误，请稍后重试！'
    }
  } else {
    switch (lang) {
      case 'ar':
        return '非法用户，请稍后重试！'
      case 'de':
        return '非法用户，请稍后重试！'
      case 'es':
        return '非法用户，请稍后重试！'
      case 'fr':
        return '非法用户，请稍后重试！'
      case 'id':
        return '非法用户，请稍后重试！'
      case 'jp':
        return '非法用户，请稍后重试！'
      case 'kr':
        return '非法用户，请稍后重试！'
      case 'pt':
        return '非法用户，请稍后重试！'
      case 'tr':
        return '非法用户，请稍后重试！'
      case 'en':
        return '非法用户，请稍后重试！'
      case 'ch':
        return '非法用户，请稍后重试！'
      case 'hk':
        return '非法用户，请稍后重试！'
    }
  }
}

const getConfirmLang = function () {
  let lang = window.localStorage.getItem('lang') || 'en'
  switch (lang) {
    case 'ar':
      return 'يتأكد'
    case 'de':
      return 'Bestätigen Sie'
    case 'es':
      return 'Confirmar'
    case 'fr':
      return 'Confirmer'
    case 'id':
      return 'Mengonfirmasi'
    case 'jp':
      return '確認'
    case 'kr':
      return '확인하다'
    case 'pt':
      return 'Confirmar'
    case 'tr':
      return 'Onaylamak'
    case 'en':
      return 'Confirm'
    case 'ch':
      return '网络错误，请稍后重试！'
    case 'hk':
      return '網絡錯誤，請稍後重試！'
  }
}

export default async (url, data, opt, isLoad = true) => {
  data = {
    ...data,
    lang: window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'en'
  }
  // return;
  if (isLoad) {
    showLoading()
  }
  // url = "/api"+url;
  if (url.indexOf('http') != -1) {
    console.log('111 :>> ', 111);
  } else {
    url = "http://www.test.com/api" + url; //url = "https://ybqjy.com/api"+url;
    // url = "https://haoxlb.com/api"+url;
    // url = 'https://tron2269.com/api' + url;    // var host = 'https://' + window.location.host;
    // url = host+"/api"+url;
    /* var host = 'https://' + window.location.host;
    url = host+"/api"+url; */
  }

  const set = {
    method: 'post',
    ...opt
  }
  var token = localStorage.getItem('token')
  return (set.method === 'post' ?
      axios.post(url + `?lang=${window.localStorage.getItem('lang') ? window.localStorage.getItem('lang') : 'en'}`, {
        ...data,
        token
      }) :
      axios.get(
        url +
        '?' +
        qs.stringify({
          ...data,
          token
        })
      )
    )
    .then(r => {
      if (isLoad) {
        hideLoading()
      }

      if (r.status === 200) {
        // console.log(r.data)
        return r.data
      }

      if (r.data.code === 0) {
        return r.data
      }

      throw {
        msg: getErrorMsg(1)
      }
    })
    .then(r => {
      if (r.code === 1) {
        return r
      } else {
        if (r.code === 0) {
          throw {
            msg: r.info
          }
        }

        if (!r.code) {
          throw {
            msg: getErrorMsg(1)
          }
        }

        if (r.code === 406) {
          router.push('/firstsetpaypwd')
        }

        if (r.code === 405) {
          const current = {
            ...router.currentRoute
          }
          router.push('/auth?redirect=' + current.path)
        }

        if (r.code === 500) {
          throw {
            msg: getErrorMsg(2)
          }
        }

        if (r.code === 403 || r.code === 401) {
          if (r.code === 401) {
            localStorage.removeItem('token')
          }

          const current = {
            ...router.currentRoute
          }
          if (
            current &&
            current.path !== '/' &&
            !['/', '/reg', '/forgetpwd'].includes(current.path)
          ) {
            if (current.path !== '/login' && current.path !== '/home') {
              router.replace('/login??redirect=' + current.path)
            }
          }
        }
      }

      throw r
    })
    .catch(r => {
      if (isLoad) {
        hideLoading()
      }

      var message = getErrorMsg(1)
      if (r.info) {
        message = r.info
      }

      if (r.msg) {
        message = r.msg
      }

      if (isLoad) {
        Dialog.alert({
          message: message,
          confirmButtonText: getConfirmLang(),
        })
      }

      throw ''
    })
}