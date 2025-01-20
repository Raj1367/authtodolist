
const backendUrl = "https://authtodolist.onrender.com"

export const backendApi = {
    signUp: {
        url: `${backendUrl}/api/signup`,
        method: "post"
    },

    login: {
        url: `${backendUrl}/api/login`,
        method: "post"
    },

    checkAuth: {
        url: `${backendUrl}/api/check-auth`,
        method: "get"
    },

    logout: {
        url: `${backendUrl}/api/logout`,
        method: "get"
    },

}

export default backendApi


