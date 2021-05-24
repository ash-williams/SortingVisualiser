// export const mergeSort = array => {
//     if(array.length === 1) return array;

//     const middleIndex = Math.floor(array.length / 2);
//     const firstHalf = mergeSort(array.slice(0, middleIndex));
//     const secondHalf = mergeSort(array.slice(middleIndex));
//     const sortedArray = [];
//     let i = 0;
//     let j = 0;

//     while(i < firstHalf.length && j < secondHalf.length){
//         if(firstHalf[i] < secondHalf[j]){
//             sortedArray.push(firstHalf[i++]);
//         }else{
//             sortedArray.push(secondHalf[j++]);
//         }
//     }

//     while(i < firstHalf.length) sortedArray.push(firstHalf[i++]);
//     while(j < secondHalf.length) sortedArray.push(secondHalf[j++]);
//     return sortedArray;
// };

export const mergeSort = array => {
    const animations = [];
    if(array.length <= 1) return array;
    const auxArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxArray, animations);
    return animations;
}

const mergeSortHelper = (mainArray, startIndex, endIndex, auxArray, animations) => {
    if(startIndex === endIndex) return;
    const middleIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSortHelper(auxArray, startIndex, middleIndex, mainArray, animations);
    mergeSortHelper(auxArray, middleIndex + 1, endIndex, mainArray, animations);
    doMerge(mainArray, startIndex, middleIndex, endIndex, auxArray, animations);
}

const doMerge = (mainArray, startIndex, middleIndex, endIndex, auxArray, animations) => {
    let k = startIndex;
    let i = startIndex;
    let j = middleIndex + 1;
    while(i <= middleIndex && j <= endIndex){
        //Push values we're comparing to change color
        animations.push([i, j]);
        //Push values again to change colour back
        animations.push([i, j]);

        if(auxArray[i] <= auxArray[j]){
            animations.push([k, auxArray[i]]);
            mainArray[k++] = auxArray[i++];
        }else{
            animations.push([k, auxArray[j]]);
            mainArray[k++] = auxArray[j++];
        }
    }
    
    while(i <= middleIndex){
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxArray[i]]);
        mainArray[k++] = auxArray[i++];
    }
    while(j <= endIndex){
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxArray[j]]);
        mainArray[k++] = auxArray[j++];
    }
}