import { shallowMount } from '@vue/test-utils';
import AddInput from '../src/components/AddInput.vue';
import { ElInput } from 'element-plus';

describe('AddInput.vue', () => {
  it('Рендерится правильная заглушка', () => {
    const placeholder = 'Enter your text here';
    const wrapper = shallowMount(AddInput, {
      props: {
        placeholder: placeholder
      },
      global: {
        components: {
          ElInput
        }
      }
    });

    expect(wrapper.findComponent(ElInput).attributes('placeholder')).toBe(placeholder);
  });
  
  
});
