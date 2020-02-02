const read = require('read');
const minNumberLength = 3;
const maxNumberLength = 6;
const minAttemptNumber = 5;
const maxAttemptNumber = 10;

function random(start, end) {
    return start + Math.floor(Math.random() * (end - start + 1));
};

function getNewNumber() {
    const dictionary = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const len = random(minNumberLength, maxNumberLength);
    const [result] = new Array(len).fill(0).reduce((acc, _ ,i) => {
        const [result, dict] = acc;
        const index = random(0, dict.length - 1);
        const sum = result + dict[index] * (10 ** i);
        dict.splice(index, 1);
        return [sum, dict];
    }, [0, dictionary]);
    return String(result);
};

function isDigitsUniq(number) {
    const numberAsString = String(number);
    const numberAsArray = numberAsString.split('');
    return numberAsArray.filter(el => numberAsString.indexOf(el) !== numberAsString.lastIndexOf(el)).length === 0;
};

const guessedNumber = getNewNumber();
const guessedNumberInArray = guessedNumber.split('');
const guessedNumberLength = guessedNumber.length;
const attemptNumber = random(minAttemptNumber, maxAttemptNumber);
console.log(`Загадано число из ${guessedNumberLength} символов (${guessedNumber}).`);
console.log(`У вас ${attemptNumber} попыток.`);

let attemptCounter = 1;
let isGuessed = false;

function isGameEnded() {
    if (isGuessed) {
        console.log('Поздравляю, вы угадали число!!!!');
        return true;
    } else if (attemptCounter > attemptNumber) {
        console.log('Увы, у вас закончились попытки, а число так и не отгадано(');
        return true;
    }
    return false;
};

function checkAnswer(current) {
    const currentInArray = current.split('');
    let onPlace = 0;
    let outOfPlace = 0;
    currentInArray.forEach((el, i) => {
        if (guessedNumberInArray.includes(el)) {
            if (i === guessedNumberInArray.indexOf(el)) {
                onPlace++;
            } else {
                outOfPlace++;
            }
        }
    });
    console.log(`Совпавших цифр не на своих местах- ${outOfPlace}, цифр на своих местах - ${onPlace}`);
};

function readNumber() {
    read({ prompt: `Попытка ${attemptCounter} - введите число:` }, (err, data) => {
        if (err || Number.isNaN(Number.parseInt(data)) || data.length !== guessedNumberLength || !isDigitsUniq(data)) {
            console.log('Введено некорректное число. Попробуем еще раз)');
            attemptCounter--;
            readNumber();
        } else {
            if (data === guessedNumber) {
                isGuessed = true;
            }
            if (!isGameEnded()) {
                checkAnswer(data);
                readNumber();
            }
        }
    });
    attemptCounter++;
};

readNumber();