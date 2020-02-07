import React from 'react';
import Enzyme, {shallow, mount} from 'enzyme';
import Calculator from './Calculator';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter: new Adapter()});

//Component renders
describe("Calculator component", () => {
    test("renders", () => {
        const wrapper = shallow(<Calculator />);

        expect(wrapper.exists()).toBe(true);
    });
});

//Test intToRoman Method
describe("testing 'intToRoman' method from Calculator instance", () => {
    const wrapper = shallow(<Calculator />);
    const instance = wrapper.instance();
    //Negative test cases
    test('return "Number can\'t be converted to Roman Format" on invalid input', () => {
        expect(instance.intToRoman(0)).toBe("Number can't be converted to Roman Format");
        expect(instance.intToRoman("123")).toBe("Number can't be converted to Roman Format");
        expect(instance.intToRoman(123.45)).toBe("Number can't be converted to Roman Format");
        expect(instance.intToRoman(-86)).toBe("Number can't be converted to Roman Format");
        expect(instance.intToRoman(4000)).toBe("Number can't be converted to Roman Format");
    });

    //Positive test cases
    test('return correct Roman Output on valid input (input > 0 and input <= 9)', () => {
        expect(instance.intToRoman(1)).toBe("I");
        expect(instance.intToRoman(6)).toBe("VI");
        expect(instance.intToRoman(9)).toBe("IX");
    });

    test('return correct Roman Output on valid input (input >= 10 and input < 100)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.intToRoman(10)).toBe("X");
        expect(instance.intToRoman(24)).toBe("XXIV");
        expect(instance.intToRoman(50)).toBe("L");
        expect(instance.intToRoman(87)).toBe("LXXXVII");
        expect(instance.intToRoman(99)).toBe("XCIX");
    });

    test('return correct Roman Output on valid input (input >= 100 and input <= 999)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.intToRoman(100)).toBe("C");
        expect(instance.intToRoman(242)).toBe("CCXLII");
        expect(instance.intToRoman(500)).toBe("D");
        expect(instance.intToRoman(780)).toBe("DCCLXXX");
        expect(instance.intToRoman(999)).toBe("CMXCIX");
    });

    test('return correct Roman Output on valid input (input >= 1000 and input <= 3999)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.intToRoman(1000)).toBe("M");
        expect(instance.intToRoman(1876)).toBe("MDCCCLXXVI");
        expect(instance.intToRoman(2690)).toBe("MMDCXC");
        expect(instance.intToRoman(3300)).toBe("MMMCCC");
        expect(instance.intToRoman(3999)).toBe("MMMCMXCIX");
    });
});

//Test romanToInt Method
describe("testing 'romanToInt' method from Calculator instance", () => {
    //Negative test cases
    test('return false on invalid input (input = 1)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();

        expect(instance.romanToInt(0)).toBe(false); //Number
        expect(instance.romanToInt("123")).toBe(false); //Number as string
        expect(instance.romanToInt(123.45)).toBe(false); //Decimal number
        expect(instance.romanToInt(-86)).toBe(false);   //Negative number
        expect(instance.romanToInt("ABCD")).toBe(false);    //invalid roman numerals
        expect(instance.romanToInt("MMDA")).toBe(false);    //valid with invalid at end
        expect(instance.romanToInt("AMMD")).toBe(false);    //valid with invalid at start
        expect(instance.romanToInt("MMAD")).toBe(false);    //valid with invalid in middle
        expect(instance.romanToInt("MMMMD")).toBe(false);   //more than 3 of same kind in start
        expect(instance.romanToInt("MMDDDD")).toBe(false);  //more than 3 of same kind in end
        expect(instance.romanToInt("MMDDDDM")).toBe(false); //more than 3 of same kind in middle
        expect(instance.romanToInt("MMDDCCM")).toBe(false); //invalid position
        expect(instance.romanToInt("MMCDCD")).toBe(false);  //invalid pattern (more than 1)
    });

    //Positive test cases
    test('return correct integer output on valid input (input > 0 and input <= 9)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();

        expect(instance.romanToInt("")).toBe(0);
        expect(instance.romanToInt("I")).toBe(1);
        expect(instance.romanToInt("V")).toBe(5);
        expect(instance.romanToInt("IX")).toBe(9);
    });

    test('return correct integer output on valid input (input >= 10 and input < 100)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.romanToInt("XI")).toBe(11);
        expect(instance.romanToInt("XXV")).toBe(25);
        expect(instance.romanToInt("LX")).toBe(60);
        expect(instance.romanToInt("LXXII")).toBe(72);
        expect(instance.romanToInt("XCIX")).toBe(99);
    });

    test('rreturn correct integer output on valid input (input >= 100 and input <= 999)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.romanToInt("C")).toBe(100);
        expect(instance.romanToInt("CCCXL")).toBe(340);
        expect(instance.romanToInt("CDXII")).toBe(412);
        expect(instance.romanToInt("DCCXC")).toBe(790);
        expect(instance.romanToInt("CMXCIX")).toBe(999);
    });

    test('return correct integer output on valid input (input >= 1000 and input <= 3999)', () => {
        const wrapper = shallow(<Calculator />);
        const instance = wrapper.instance();


        expect(instance.romanToInt("M")).toBe(1000);
        expect(instance.romanToInt("MDCCLVI")).toBe(1756);
        expect(instance.romanToInt("MMDLXXXIV")).toBe(2584);
        expect(instance.romanToInt("MMMDCCCXLI")).toBe(3841);
        expect(instance.romanToInt("MMMCMXCIX")).toBe(3999);
    });
});