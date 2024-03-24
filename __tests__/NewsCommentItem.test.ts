import { shallowMount } from '@vue/test-utils';
import NewsCommentItem from '../src/components/NewsCommentItem.vue';
import { ElCard} from 'element-plus';

describe('NewsCommentItem.vue', () => {

  it('Рендерится правильное имя и почта', () => {
    const comment = {
      id: 1,
      postId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      body: 'This is a test comment body',
    };

    const wrapper = shallowMount(NewsCommentItem, {
        props: {
          comment: comment,
        },
        global: {
          components: {
            'comment-card': ElCard,
          },
        },
      });

    expect(wrapper.find('.comment-name').text()).toBe(comment.name);
    expect(wrapper.find('.comment-email').text()).toBe(comment.email);
  });

  it('Рендерится правильный комментарий', () => {
    const comment = {
      id: 1,
      postId: 1,
      name: 'John Doe',
      email: 'john@example.com',
      body: 'This is a test comment body',
    };

    const wrapper = shallowMount(NewsCommentItem, {
        props: {
          comment: comment,
        },
        global: {
          components: {
            'comment-card': ElCard,
          },
        },
      });

    expect(wrapper.find('.comment-text').text()).toBe(comment.body);
  });

});
