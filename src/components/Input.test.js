import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Input from './Input';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

//Component renders
describe("Input component", () => {
    test("renders", () => {
        const wrapper = shallow(<Input />);

        expect(wrapper.exists()).toBe(true);
    });
});