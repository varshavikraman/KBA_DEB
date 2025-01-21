const p = require('lodash')

const sum=require('./addition.js')
console.log('Hello World');
let a='Node JS';
console.log(`Hello ${a}`);
if(a=='Node JS'){
    console.log("JS is running on Node Js Environment")
}
for(i=0;i<10;i++)
    {
      b=i+1
      console.log(b)
    }
let c=[1,2,3,4,5];
console.log(p.reverse(c)); 
console.log(p.capitalize('hello world'));
console.log(sum.add(3,5));
