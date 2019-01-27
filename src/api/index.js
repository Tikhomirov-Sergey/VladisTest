import { userData, newsData, profileData } from './data'

class Api {

  static singIn(email, password) {

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        if (Api.isRandomError())
          reject(Api.errorServer)

        const user = userData.users.filter(user => email === user.email && password === user.password)

        if (user.length === 1) {
          resolve(user[0].answer)
        }
        else {
          resolve(userData.error)
        }
      }, 1000)
    })

    return promise
  }

  static checkAccessToken(accessToken) {

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        const user = userData.users.filter(user => accessToken === user.accessToken)

        if (user.length === 1) {
          resolve(user[0].answer)
        }
        else {
          resolve(userData.error)
        }
      }, 1000)
    })

    return promise
  }

  static getNews() {

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        if (Api.isRandomError())
          reject(Api.errorServer)

        resolve(newsData.answer)

      }, 1000)
    })

    return promise
  }

  static getProfile(id) {

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {

        if (Api.isRandomError())
          reject(Api.errorServer)

        const profile = profileData.filter(profile => Number.parseInt(id) === Number.parseInt(profile.userId))

        if (profile.length === 1) {
          resolve(profile[0].answer)
        }
        else {
          resolve({status:'ok', data:null})
        }
      }, 1000)
    })

    return promise
  }

  static isRandomError() {
    return (~~(Math.random() * 10)) === 1
  }

  static errorServer = { status: 500, message: 'Сервер недоступен' }

}

export default Api