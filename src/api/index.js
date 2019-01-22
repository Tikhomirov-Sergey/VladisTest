let user = { email:1, password:1 }

export const singInApi = (email, password) => {

    const promise = new Promise((resolve, reject) => {
        debugger;
        setTimeout(() => {
          resolve({user})
        }, 1000)
      
      });

      return promise
}

