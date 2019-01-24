import { userData } from './data'

class Api {

  singInApi(email, password) {

    const promise = new Promise((resolve, reject) => {

      setTimeout(() => {
        debugger
        const user = userData.users.filter(user => email === user.email && password === user.password)

        if(user.length === 1) {
          resolve(user[0].answer)
        } 
        else {
          resolve(userData.error)
        }
      }, 1000)
    })

    return promise
  }
}

export default Api