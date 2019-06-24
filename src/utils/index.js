export const isSmallScreen = () => false;

export const getTamilWordArr = (str) => {
  console.log('str = ', str);
  let arr = str.split('');
  arr = arr.map(val => val.trim());
  str = arr.join('');
  let len = 0;
  const wordArr = [];
  let isPrevLetter = false;
  for (let i = 0; i < str.length; i++) {
    const char = str
      .charCodeAt(i)
      .toString(16)
      .toUpperCase();
    if (str.charAt(i) === ' ') {
      console.log('if if if if');
      len++;
      isPrevLetter = false;
      wordArr.push(str.charAt(i));
    } else if (vowels.indexOf(char) != -1) {
      len++;
      wordArr.push(str.charAt(i));
      isPrevLetter = false;
    } else if (letters.indexOf(char) != -1) {
      len++;
      wordArr.push(str.charAt(i));
      isPrevLetter = true;
    } else if (subLetters.indexOf(char) != -1) {
      if (isPrevLetter) {
        isPrevLetter = false;
        const lastIndex = wordArr.length - 1;
        wordArr[lastIndex] = wordArr[lastIndex] + str.charAt(i);
      } else {
        return false;
      }
    } else {
      // return false;
      throw 'invalid';
    }
  }
  return wordArr;
};

export function secondsTohhmmss(totalSeconds) {
  let hours = Math.floor(totalSeconds / 3600);
  let minutes = Math.floor((totalSeconds - hours * 3600) / 60);
  let seconds = Math.floor(totalSeconds - hours * 3600 - minutes * 60);

  // round seconds
  //seconds = Math.round(seconds * 100) / 100

  let result = '';
  if (hours > 0) {
    result += (hours < 10 ? '0' + hours : hours) + ':';
  }

  result += minutes < 10 ? '0' + minutes : minutes;
  result += ':' + (seconds < 10 ? '0' + seconds : seconds);
  return result;
}