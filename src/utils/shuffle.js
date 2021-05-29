export const shuffle = (arr) => {
    let i = arr.length, rand;
    while (i !== 0) {
      rand = Math.floor(Math.random() * i);
      i--;
      [arr[i],arr[rand]] = [arr[rand],arr[i]]
    }
    return arr;
}