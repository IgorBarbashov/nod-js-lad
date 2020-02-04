const fs = require('fs');
const readlineSync = require('readline-sync');

const quizPath = './data';

function random(start, end) {
    return start + Math.floor(Math.random() * (end - start + 1));
};

const files = fs.readdirSync(quizPath);
const questionsNumber = files.length >= 5 ? 5 : files.length;

let allRightAnswers = 0;

for (let i = 0; i < questionsNumber; i++) {
    const randomIndex = random(0, files.length - 1);
    const fileName = files[randomIndex];
    files.splice(randomIndex, 1);
    const content = fs.readFileSync(`${quizPath}/${fileName}`).toString().split('\r\n');
    const question = content[0];
    const rightAnswer = content[1];
    console.log(`\nСледующий вопрос:\n${question}`);
    content.slice(2).forEach((el, i) => console.log(`${i + 1} - ${el}`));
    const answer = readlineSync.prompt();
    allRightAnswers = answer === rightAnswer ? allRightAnswers + 1 : allRightAnswers;
}

console.log('\n!!! Па-пам !!!');
console.log('Всего правильных ответов:', allRightAnswers);
