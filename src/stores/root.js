import { defineStore } from 'pinia'
import axios from 'axios'
import { COMMENTS_URL, POSTS_URL } from '../constants'

export const useRootStore = defineStore('root', {
  state: () => ({
    posts: [],
    comments: [],
  }),
  actions: {
    async getPosts() {
      const data = await axios.get(POSTS_URL)
      this.posts = data?.data
    },
    async getComments() {
      const data = await axios.get(COMMENTS_URL)
      this.comments = data?.data
    }
  }
})
