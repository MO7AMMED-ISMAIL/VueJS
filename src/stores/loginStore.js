import { defineStore } from 'pinia'

export const useLoginStore = defineStore('auth', {
    state: () => {
        return { 
            isLogin: false,  
        }
    },
    actions: {
        userLogin() {
        this.isLogin = true;
        },
    },
})