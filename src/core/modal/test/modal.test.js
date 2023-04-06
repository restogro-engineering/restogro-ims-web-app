import React from 'react';
import { shallow } from 'enzyme';
import SixtModal from '../index';

describe('SixtModal Component', () => {
  it('should render SixtModal component', () => {
    const component = shallow(<SixtModal />);
    expect(component.exists()).toBe(true);
  });

  it('should render initial layout', () => {
    const component = shallow(<SixtModal />);
    expect(component.getElements()).toMatchSnapshot();
  });
});
