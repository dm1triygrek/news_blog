import { defineStore } from "pinia";
import axios from "axios";
import { COMMENTS_URL, POSTS_URL } from "../constants";

export interface Post {
    id: number;
    title: string;
    body: string;
}

export interface Comment {
    id: number;
    postId: number;
    name: string;
    email: string;
    body: string;
}

export interface RootState {
  posts: Post[];
  comments: Comment[];
}

export const useSharedStore = defineStore("shared", {
  state: (): { isPostsLoaded: boolean } => ({
    isPostsLoaded: false,
  }),
  actions: {
    setPostsLoaded(loaded: boolean): void {
      this.isPostsLoaded = loaded;
    },
  },
});

export const useRootStore = defineStore("root", {
  state: (): RootState => ({
    posts: [],
    comments: [],
  }),
  actions: {
    async getPosts(): Promise<void> {
      try {
        const data = await axios.get<Post[]>(POSTS_URL);
        this.posts = data?.data;
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    },
    async getComments(postId: number): Promise<void> {
      try {
        const commentsUrl = `${COMMENTS_URL}?postId=${postId}`;
        const response = await axios.get<Comment[]>(commentsUrl);
        this.comments = response.data;
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    },
    async removePost(postId: number): Promise<void> {
      this.posts = this.posts.filter(post => post.id !== postId);
    },
    async getPostById(postId: number): Promise<Post | null> {
      try {
        const postUrl = `${POSTS_URL}/${postId}`;
        const response = await axios.get<Post>(postUrl);
        return response.data;
      } catch (error) {
        console.error("Error fetching post by ID:", error);
        return null;
      }
    },
    async updatePost(postId: number, updatedData: Partial<Post>): Promise<Post | null> {
      try {
        const postUrl = `${POSTS_URL}/${postId}`;
        const response = await axios.put<Post>(postUrl, updatedData);
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
    async addPost(newPostData: Partial<Post>): Promise<Post | null> {
      try {
        const response = await axios.post<Post>(POSTS_URL, newPostData);
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
