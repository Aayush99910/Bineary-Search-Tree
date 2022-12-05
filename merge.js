let ARRAY = [1, 7, 4, 7];
mergeSort(ARRAY);

export default function mergeSort(arr) {
  let lengthOfArray = arr.length;

  if (lengthOfArray <= 1){
    return;
  }

  let middlePoint = lengthOfArray / 2;
  let leftHalf = [];
  let rightHalf = [];
    
  for (let i = 0; i < lengthOfArray; i++) {
    if (i < middlePoint) {
      leftHalf.push(arr[i]);
    } else if (i >= middlePoint) {
      rightHalf.push(arr[i]);
    }
  }
    
  mergeSort(leftHalf);
  mergeSort(rightHalf);
  merge(leftHalf, rightHalf, arr);
}


export function merge(leftHalfArray, rightHalfArray, array) {
  let leftHalfSize = leftHalfArray.length;
  let rightHalfSize = rightHalfArray.length;

  let l = 0;
  let r = 0;
  let i = 0;


  while (l < leftHalfSize && r < rightHalfSize) {
    if (leftHalfArray[l] < rightHalfArray[r]) {
      array[i] = leftHalfArray[l];
      i++;
      l++;
    } else if (rightHalfArray[r] < leftHalfArray[l]) {
      array[i] = rightHalfArray[r];
      i++;
      r++;
    } else if (leftHalfArray[l] === rightHalfArray[r]) {
      array[i] = leftHalfArray[l];
      l++;
      r++;
      i++;
    }
  }

  while (l < leftHalfSize) {
    array[i] = leftHalfArray[l];
    i++;
    l++;
  }

  while (r < rightHalfSize) {
    array[i] = rightHalfArray[r];
    i++;
    r++;
  }
}

