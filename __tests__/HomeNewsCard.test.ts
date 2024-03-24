import { shallowMount } from '@vue/test-utils';
import HomeNewsCard from '../src/components/HomeNewsCard.vue';
import { RouterLinkStub } from '@vue/test-utils';
import axios from 'axios';
import { setActivePinia, createPinia } from "pinia";
import { ElIcon, ElButton, ElCard} from 'element-plus';
import { POSTS_URL } from '../src/constants'

jest.mock('axios');

const Edit = {
    template: '<div>Edit component</div>',
  };

const Delete = {
    template: '<div>Delete component</div>',
  };

describe('HomeNewsCard.vue', () => {
  let wrapper;

  const post = {
    id: 1,
    title: 'Test Post',
    body: 'This is a test post body',
  };

  beforeEach(() => {
    setActivePinia(createPinia());
    wrapper = shallowMount(HomeNewsCard, {
      props: {
        post: post,
      },
      global: {
        mocks: {
          $router: {
            push: jest.fn(),
          },
          $route: {
            params: {},
          },
        },
        stubs: {
          RouterLink: RouterLinkStub,
          'el-icon': ElIcon,
          'el-button': ElButton,
          'el-card': ElCard,
          Edit: Edit,
          Delete: Delete,
        },
      },
    });
  });

  it('Рендерится заголовок поста', () => {
    expect(wrapper.find('.news_title span').text()).toBe(post.title);
  });

  it('Рендерится тело поста', () => {
    expect(wrapper.find('.news_body').text()).toBe(post.body);
  });

  it('После нажатия кнопки удалить, вызывается метод deletePost', async () => {
    const deleteButton = wrapper.find('.delete_button');
    axios.delete = jest.fn().mockResolvedValue(undefined);
    await deleteButton.trigger('click');
    expect(axios.delete).toHaveBeenCalledWith(`${POSTS_URL}/${post.id}`);
  });

  it('Вывод ошибки при неудачном удалении', async () => {
    const error = new Error('Delete failed');
    const consoleSpy = jest.spyOn(console, 'error');
    const deleteButton = wrapper.find('.delete_button');
    axios.delete = jest.fn().mockRejectedValue(error);
    await deleteButton.trigger('click');
    expect(consoleSpy).toHaveBeenCalledWith('Error deleting post:', error);
  });
});
