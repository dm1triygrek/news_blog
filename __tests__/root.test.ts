import axios from "axios";
import { useRootStore } from "../src/stores/root";
import { useSharedStore } from "../src/stores/root";
import { setActivePinia, createPinia } from "pinia";

jest.mock("axios");

describe("Root Store", () => {
  let errorSpy: jest.SpyInstance;

  beforeEach(() => {
    setActivePinia(createPinia());
    jest.clearAllMocks();
    errorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    errorSpy.mockRestore();
  });

  it("Получение новостей", async () => {
    const store = useRootStore();
    const testData = [{ id: 1, title: "Test Title", body: "Test Body" }];
    
    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: testData });

    await store.getPosts();
    expect(store.posts).toEqual(testData);
  });

  it("Ошибка при получении новостей", async () => {
    const store = useRootStore();

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error("Failed to fetch"));

    await store.getPosts();
    expect(store.posts).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it("Получение комментариев", async () => {
    const store = useRootStore();
    const postId = 1;
    const testData = [{ id: 1, postId: 1, name: "Test Name", email: "test@example.com", body: "Test Body" }];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: testData });

    await store.getComments(postId);
    expect(store.comments).toEqual(testData);
  });

  it("Ошибка при получении комментариев", async () => {
    const store = useRootStore();
    const postId = 1;

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error("Failed to fetch"));

    await store.getComments(postId);
    expect(store.comments).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });

  it("Удаление новости", async () => {
    const store = useRootStore();
    store.posts = [{ id: 1, title: "Test Title", body: "Test Body" }];

    await store.removePost(1);
    expect(store.posts.length).toBe(0);
  });

  it("Получение новости по id", async () => {
    const store = useRootStore();
    const postId = 1;
    const testData = { id: postId, title: "Test Title", body: "Test Body" };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({ data: testData });

    const post = await store.getPostById(postId);
    expect(post).toEqual(testData);
  });

  it("Ошибка при получении новости по id", async () => {
    const store = useRootStore();
    const postId = 1;

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce(new Error("Failed to fetch post"));

    const post = await store.getPostById(postId);

    expect(post).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it("Обновление новости", async () => {
    const store = useRootStore();
    store.posts = [{ id: 1, title: "Old Title", body: "Old Body" }];
    const updatedData = { title: "New Title" };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({ data: { ...store.posts[0], ...updatedData } });

    const updatedPost = await store.updatePost(1, updatedData);
    expect(updatedPost?.title).toBe("New Title");
  });

  it("Ошибка при обновлении новости", async () => {
    const store = useRootStore();
    const postId = 1;
    const updatedData = { title: "Updated Title" };

    (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValueOnce(new Error("Failed to update post"));

    const updatedPost = await store.updatePost(postId, updatedData);

    expect(updatedPost).toBeNull();
    expect(console.error).toHaveBeenCalled();
  });

  it("Добавление новости", async () => {
    const store = useRootStore();
    const newPostData = { title: "New Post Title", body: "New Post Body" };
    const responseData = { id: 2, ...newPostData };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockResolvedValueOnce({ data: responseData });

    const newPost = await store.addPost(newPostData);
    expect(store.posts[0]).toEqual(responseData);
  });

  it("Ошибка при добавлении новости", async () => {
    const store = useRootStore();
    const newPostData = { title: "New Post Title", body: "New Post Body" };

    (axios.post as jest.MockedFunction<typeof axios.post>).mockRejectedValueOnce(new Error("Failed to add post"));

    const newPost = await store.addPost(newPostData);
    expect(newPost).toBeNull();
  });

});

describe("Shared Store", () => {
  it("Посты были загружены", () => {
    const store = useSharedStore();
    expect(store.isPostsLoaded).toBe(false);

    store.setPostsLoaded(true);

    expect(store.isPostsLoaded).toBe(true);
  });
});
