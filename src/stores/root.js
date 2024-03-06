import { defineStore } from "pinia";
import axios from "axios";
import { COMMENTS_URL, POSTS_URL } from "../constants";

export const useSharedStore = defineStore("shared", {
  state: () => ({
    isPostsLoaded: false,
  }),
  actions: {
    setPostsLoaded(loaded) {
      this.isPostsLoaded = loaded;
    },
  },
});

export const useRootStore = defineStore("root", {
  state: () => ({
    posts: [],
    comments: [],
  }),
  actions: {
    async getPosts() {
      const data = await axios.get(POSTS_URL);
      this.posts = data?.data;
    },
    async getComments(postId) {
      try {
        const commentsUrl = `${COMMENTS_URL}?postId=${postId}`;
        const response = await axios.get(commentsUrl);
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async removePost(postId) {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
    async getPostById(postId) {
      try {
        const postUrl = `${POSTS_URL}/${postId}`;
        const response = await axios.get(postUrl);
        return response.data;
      } catch (error) {
        console.error("Error fetching post by ID:", error);
        return null;
      }
    },
    async updatePost(postId, updatedData) {
      try {
        const postUrl = `${POSTS_URL}/${postId}`;
        const response = await axios.put(postUrl, updatedData);
        const updatedPost = response.data;

        const index = this.posts.findIndex(post => post.id === postId);
        if (index !== -1) {
          this.posts.splice(index, 1, updatedPost);
        }

        return updatedPost;
      } catch (error) {
        console.error("Error updating post:", error);
        return null;
      }
    },
    async addPost(newPostData) {
      try {
        const response = await axios.post(POSTS_URL, newPostData);
        const newPost = response.data;

        this.posts.unshift(newPost);

        return newPost;
      } catch (error) {
        console.error("Error adding post:", error);
        return null;
      }
    },
  }
});
