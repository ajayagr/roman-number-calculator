import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Button from './Button';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

//Component renders?
describe("Button component", () => {
    test("renders", () => {
        const wrapper = shallow(<Button />);

        expect(wrapper.exists()).toBe(true);
    });
});
