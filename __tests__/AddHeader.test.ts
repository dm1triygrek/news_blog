import { shallowMount, RouterLinkStub } from '@vue/test-utils';
import AddHeader from '../src/components/AddHeader.vue';
import { ElButton, ElIcon } from 'element-plus';

const Back = {
  template: '<div>Back component</div>',
};

describe('AddHeader.vue', () => {
  it('Рендерится правильный заголовок', () => {
    const title = 'Test Title';
    const wrapper = shallowMount(AddHeader, {
      props: { title },
      global: {
        components: {
            ElButton,
            ElIcon
        },
        stubs: {
          RouterLink: RouterLinkStub,
          Back: Back,
        },
      },
    });

    expect(wrapper.find('.news_header').text()).toBe(title);
  });

  it('Когда кнопка назад нажата, переход на главную страницу', async () => {
    const wrapper = shallowMount(AddHeader, {
      props: { title: 'Test Title' },
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          ElButton,
          ElIcon,
          Back: Back,
        },
      },
    });

    await wrapper.findComponent(RouterLinkStub).trigger('click');

    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe('/');
  });
});
