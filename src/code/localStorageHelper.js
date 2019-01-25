import { appName } from '../config'

export default class {
    static setAccessTokenToStorage(token) {
        localStorage.setItem(`${appName}-AcessToken`, token)
    }

    static getAccessTokenFromStorage() {
        return localStorage.getItem(`${appName}-AcessToken`)
    }

    static clearAccessToken() {
        localStorage.setItem(`${appName}-AcessToken`, null)
    }
}