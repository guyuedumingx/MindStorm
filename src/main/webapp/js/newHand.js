var w4 = getDom('.w4').children;
for (var i = 0; i < w4.length; i++) {
    if (i & 1) {
        w4[i].style.flexFlow = 'row-reverse nowrap';
    } else {
        w4[i].style.flexFlow = 'row nowrap';
    }
}