const a = []

function genArray() {
  for (let i = 0; i < 570023; i++ ){
    a.push(i);
  }
}

genArray();

const o = {}

function genObject() {
  for (let i = 0; i < 570023; i++) {
    o[i] = true;
  }
}

genObject();


function testA() {
  return !a.includes(77778);
}

function testB() {
  return !o[77778]
}

let t0 = performance.now()
iT();
let t1 = performance.now()
console.log(t1-t0)

let ta = performance.now()
iC();
let tb = performance.now()
console.log(tb-ta)


function iT() {
  return document.body.innerText
}

function iC() {
  return document.body.textContent
}
