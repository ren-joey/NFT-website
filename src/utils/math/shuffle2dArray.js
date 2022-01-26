import { getRandomNumber } from './getRandomNumber';

const shuffle2DArray = (arr) => {
    const maxArr = arr.map(each => each.length);
    const newArr = [];

    for (let i = 0; i < arr.length; i += 1) {
        while (arr[i].length > 0) {
            const target = arr[i].splice(0, 1)[0];
            let randomRow = getRandomNumber(0, maxArr.length - 1);

            if (!newArr[randomRow]) newArr[randomRow] = [];
            while (
                newArr[randomRow].filter(cols => cols !== undefined).length >= maxArr[randomRow]
            ) {
                randomRow = (randomRow + 1) % maxArr.length;
                if (!newArr[randomRow]) newArr[randomRow] = [];
            }

            let randomCol = getRandomNumber(0, maxArr[randomRow] - 1);
            while (newArr[randomRow][randomCol] !== undefined) {
                randomCol = (randomCol + 1) % maxArr[randomRow];
            }

            newArr[randomRow][randomCol] = target;
        }
    }

    return newArr;
};

const shuffle2DArrayWithPos = (arr, selectedRowPos, selectedColPos, matchRowPos, matchColPos) => {
    const cloneArr = JSON.parse(JSON.stringify(arr));
    const maxArr = cloneArr.map(each => each.length);
    const newArr = [];

    const targetValue = cloneArr[matchRowPos].splice(matchColPos, 1)[0];
    newArr[selectedRowPos] = [];
    newArr[selectedRowPos][selectedColPos] = targetValue;

    for (let i = 0; i < cloneArr.length; i += 1) {
        while (cloneArr[i].length > 0) {
            const target = cloneArr[i].splice(0, 1)[0];
            let randomRow = getRandomNumber(0, maxArr.length - 1);

            if (!newArr[randomRow]) newArr[randomRow] = [];
            while (
                newArr[randomRow].filter(cols => cols !== undefined).length >= maxArr[randomRow]
            ) {
                randomRow = (randomRow + 1) % maxArr.length;
                if (!newArr[randomRow]) newArr[randomRow] = [];
            }

            let randomCol = getRandomNumber(0, maxArr[randomRow] - 1);
            while (newArr[randomRow][randomCol] !== undefined) {
                randomCol = (randomCol + 1) % maxArr[randomRow];
            }

            newArr[randomRow][randomCol] = target;
        }
    }

    return newArr;
};

export { shuffle2DArray as default };
export { shuffle2DArray, shuffle2DArrayWithPos };
