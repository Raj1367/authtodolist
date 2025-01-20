import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import axios from "axios";
import backendApi from "../Common/BackendApi";

axios.defaults.withCredentials = true;

type UserState = {
    user: any;
    isAuthenticated: boolean;
    isCheckingAuth: boolean;
    loading: boolean;
    signup: (input:any) => Promise<void>;
    login: (input:any) => Promise<void>;
    checkAuthentication: () => Promise<void>;
    logout: () => Promise<void>;
}


export const useUserStore = create<UserState>()(persist((set) => ({
    user: null,
    isAuthenticated: false,
    isCheckingAuth: true,
    loading: false,
    // signup api implementation

    signup: async (input:any) => {

        try {
            set({ loading: true });
            const response = await axios.post(
                backendApi.signUp.url,
                input, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.data.success) {
                alert(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: false });
            }
        } catch (error: any) {
            alert(error.response.data.message);
            set({ loading: false });
        }
    },

    login: async (input:any) => {
        try {
            set({ loading: true });
            const response = await axios.post(backendApi.login.url,
                input,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            if (response.data.success) {
               alert(response.data.message);
                set({ loading: false, user: response.data.user, isAuthenticated: true });
            }
        } catch (error: any) {
            alert(error.response.data.message);
            set({ loading: false });
        }
    },
    
    checkAuthentication: async () => {
        try {
            set({ isCheckingAuth: true });
            const response = await axios.get(backendApi.checkAuth.url);
            if (response.data.success) {
                set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false });
            }
        } catch (error) {
            set({ isAuthenticated: false, isCheckingAuth: false });
        }
    },

    logout: async () => {
        try {
            set({ loading: true });
            const response = await axios.get(backendApi.logout.url);
            if (response.data.success) {
                set({ loading: false, user: null, isAuthenticated: false })
            }
        } catch (error: any) {
            set({ loading: false });
        }
    },
     
}),
    {
        name: 'user-name',
        storage: createJSONStorage(() => localStorage),
    }
))