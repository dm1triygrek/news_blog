import { shallowMount } from '@vue/test-utils';
import EditInput from '../src/components/EditInput.vue';
import { ElInput } from 'element-plus';

describe('EditInput.vue', () => {
  it('Рендерится ввод с правильными пропсами', () => {
    const modelValue = 'Initial value';
    const placeholder = 'Enter text here';
    const wrapper = shallowMount(EditInput, {
      props: { modelValue, placeholder },
      global: {
        components: {
          ElInput
        }
      }
    });

    const elInput = wrapper.findComponent(ElInput);
    expect(elInput.exists()).toBe(true);
    expect(elInput.props('modelValue')).toBe(modelValue);
    expect(elInput.props('placeholder')).toBe(placeholder);
    expect(elInput.props('type')).toBe('textarea');
  });

  it('Передача пропса в ElInput', () => {
    const placeholderText = 'Enter text here';
  
    const wrapper = shallowMount(EditInput, {
      props: { placeholder: placeholderText },
      global: {
        components: {
          ElInput
        }
      }
    });
    const elInput = wrapper.findComponent(ElInput);
    expect(elInput.props('placeholder')).toBe(placeholderText);
  });
  
  
});