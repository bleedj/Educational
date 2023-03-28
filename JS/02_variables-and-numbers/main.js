function f1() {
  console.log('Задание №1')
  let x1=8;
  let x2=5;
  let y1=1;
  let y2=1;
  return(Math.abs(x1 - x2) * Math.abs(y1 - y2))
}
function f2() {
  console.log('Задание №2')
  let a = 13.123456789;
  let b = 2.123;
  let n = 5;
  let normal_a = Math.trunc(a % 1 * Math.pow(10, n));
  let normal_b = Math.trunc(b % 1 * Math.pow(10, n));
  console.log(normal_a, normal_b);
  console.log(normal_a === normal_b, normal_a < normal_b, normal_a <= b, normal_a > normal_b, normal_a >= normal_b, normal_a != normal_b);
  return 'Done'
}
function f3() {
  console.log('Задание №3')
  let m = 101;
  let n = -12;
  let min = Math.min(n,m);
  let max = Math.max(n,m) - 1;
  let range = max - min;
  let randomDigit = Math.round(Math.random() * (range) + min);
  let targetDigit = randomDigit + Math.abs((randomDigit+1) % 2)
  return targetDigit
}
console.log(f1())
console.log(f2())
console.log(f3())
