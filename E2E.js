const CR7 = 7;//key secret
const M10 = 10;//key secret

const KEY_SYSTEM = 300;//common key 
const CR7_KEY_PUBLIC = CR7 + KEY_SYSTEM;
const M10_KEY_PUBLIC = M10 + KEY_SYSTEM;

const CR7_KEY_COMMON = M10_KEY_PUBLIC + CR7;
console.log(`CR7_KEY_COMMON is : ${CR7_KEY_COMMON}`);
const M10_KEY_COMMON = CR7_KEY_PUBLIC + M10;
console.log(`M10_KEY_COMMON is : ${M10_KEY_COMMON}`);

console.log(M10_KEY_COMMON === CR7_KEY_COMMON)
//what ever the KEY_SYSTEM is the M10_KEY_COMMON always equal CR7_KEY_COMMON


