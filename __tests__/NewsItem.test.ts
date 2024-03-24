import { shallowMount } from '@vue/test-utils';
import NewsItem from '../src/components/NewsItem.vue';

describe('NewsItem.vue', () => {
  it('Рендерится правильное имя поста', () => {
    const post = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post body',
    };
    const wrapper = shallowMount(NewsItem, {
      props: {
        post: post,
      },
    });
    expect(wrapper.find('.news-card-header span').text()).toBe(post.title);
  });

  it('Рендерится правильно тело поста', () => {
    const post = {
      id: 1,
      title: 'Test Post',
      body: 'This is a test post body',
    };
    const wrapper = shallowMount(NewsItem, {
      props: {
        post: post,
      },
    });
    expect(wrapper.find('.news-card p').text()).toBe(post.body);
  });
});
