import { defineStore } from 'pinia';
import { Token } from 'src/components/models';

export const useUserStore = defineStore('userToken', {
    state: () => ({
        token: JSON.parse(localStorage.getItem('t')),
    }),
    getters: {
        getToken: (state) => {
            if (state.token)
                return state.token
            return JSON.parse(localStorage.getItem('t'))
        },
    },
    actions: {
        setToken(token: Token) {
            // this.counter++;
            localStorage.setItem('t', JSON.stringify(token))
            this.token = token
        },
        setTokenRefresh(newToken: string) {
            const token = this.getToken
            token.access = newToken
            this.setToken(token)

        },
        removeToken() {
            localStorage.removeItem('t')
            this.token = null
        }

    },
});
