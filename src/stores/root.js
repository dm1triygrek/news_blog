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
    async getComments(postId) {
      try {
        const commentsUrl = `${COMMENTS_URL}?postId=${postId}`;
        const response = await axios.get(commentsUrl);
        this.comments = response.data;
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    },
    async removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    }
  }
})
