import React from 'react';
import { shallow } from 'enzyme';

import Empty from '../index';

describe('Empty', () => {
    it('renders correctly', () => {
        const wrapper = shallow(<Empty />);
        expect(wrapper).toMatchSnapshot();
    });
});
