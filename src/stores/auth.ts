import { defineStore } from 'pinia'
import api from '@/api/axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as null | { id: number; name: string; email: string },
  }),
  actions: {
    async login(email: string, password: string) {
      const res = await api.post('/auth/login', { email, password })
      this.token = res.data.token
      localStorage.setItem('token', this.token)
      await this.fetchUser()
    },
    async register(name: string, email: string, password: string) {
      await api.post('/auth/register', { name, email, password })
      await this.login(email, password)
    },
    async fetchUser() {
      const res = await api.get('/users/me')
      this.user = res.data
    },
    logout() {
      this.token = ''
      this.user = null
      localStorage.removeItem('token')
    },
  },
})
