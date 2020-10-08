var introduce = getDom('.mainBoxRight .introduce p');
var str = introduce.innerHTML;
console.log(str.length);
var s = '回答是开放\n八分饱发\n阿克a';
introduce.innerText = s;