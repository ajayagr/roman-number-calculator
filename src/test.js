function testRoman(input){
    const regex = /^(?<thousand>M{0,3})?(?<hundred>CM|DC{0,3}|CD|C{0,3})?(?<tens>XC|LX{0,3}|XL|X{0,3})?(?<ones>IX|VI{0,3}|IV|I{0,3})?$/;
    const result = input.match(regex);

    if (result.groups.thousand + result.groups.hundred + result.groups.tens + result.group.ones !== input){
        return false;
    }else
        return result;
    console.log(input.test(regex));
}

testRoman("MDC");

