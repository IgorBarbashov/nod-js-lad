const read = require('read');

const monster = {
    maxHealth: 10,
    name: "Лютый",
    moves: [
        {
            "name": "Удар когтистой лапой",
            "physicalDmg": 3,
            "magicDmg": 0,
            "physicArmorPercents": 20,
            "magicArmorPercents": 20,
            "cooldown": 0
        },
        {
            "name": "Огненное дыхание",
            "physicalDmg": 0,
            "magicDmg": 4,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Удар хвостом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 50,
            "magicArmorPercents": 0,
            "cooldown": 2
        },
    ]
}

const eastfy = {
    maxHealth: 0,
    name: "Естафий",
    moves: [
        {
            "name": "Удар боевым кадилом",
            "physicalDmg": 2,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 50,
            "cooldown": 0
        },
        {
            "name": "Вертушка левой пяткой",
            "physicalDmg": 4,
            "magicDmg": 0,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 4
        },
        {
            "name": "Каноничный фаербол",
            "physicalDmg": 0,
            "magicDmg": 5,
            "physicArmorPercents": 0,
            "magicArmorPercents": 0,
            "cooldown": 3
        },
        {
            "name": "Магический блок",
            "physicalDmg": 0,
            "magicDmg": 0,
            "physicArmorPercents": 100,
            "magicArmorPercents": 100,
            "cooldown": 4
        },
    ]
};

function random(start, end) {
    return start + Math.floor(Math.random() * (end - start + 1));
};

monster.moves.forEach(el => el.haveToWait = 0);
monster.realHealt = monster.maxHealth;
eastfy.moves.forEach(el => el.haveToWait = 0);

function decreaseAllWait() {
  function decr(arr) {
      arr.forEach(el => el.haveToWait = el.haveToWait === 0 ? 0 : el.haveToWait - 1);
  }
  decr(monster.moves);
  decr(eastfy.moves);
};

function askMove(possible) {
    return new Promise(resolve => {
        const message = possible.reduce((acc, el, i) => `${acc}\n---> ${i} - ${el}`, '');
        console.log('---> Ваши возможные ходы:', message);
        function ask() {
            read({ prompt: 'Как будем врага мочить?:' }, (err, data) => {
                const step = Number.parseInt(data);
                if (err || Number.isNaN(step) || step >= possible.length) {
                    console.log('Не умею я этим оружием махать... Давай другое выберем.');
                    ask();
                } else {
                    resolve(data);
                }
            });
        };
        ask();
    });
};

function getPossibleMovies() {
    const monsterMovies = monster.moves.filter(el => el.haveToWait === 0).map(el => el.name);
    const estafMovies = eastfy.moves.filter(el => el.haveToWait === 0).map(el => el.name);
    return [monsterMovies, estafMovies];
};

function setHaveToWait(active, activeBeat) {
    active.moves.forEach(el => {
        if (el.name === activeBeat) {
            el.haveToWait = el.cooldown;
        }
    });
};

function calculateDamage(active, activeBeat, target, targetBeat) {
    console.log(`\nУдар '${activeBeat}' от ${active.name} по ${target.name} (${target.realHealt})`);
    const activeMove = active.moves.filter(el => el.name === activeBeat)[0];
    const targetMove = target.moves.filter(el => el.name === targetBeat)[0];
    const magicDamage = activeMove.magicDmg * (1 - targetMove.magicArmorPercents / 100);
    console.log('>> Повреждения от магического удара:', magicDamage);
    const physDamage = activeMove.physicalDmg * (1 - targetMove.physicArmorPercents / 100);
    console.log('>> Повреждения от физического удара:', physDamage);
    target.realHealt = target.realHealt - magicDamage - physDamage;
    console.log(`>> У ${target.name} осталось ${target.realHealt} здоровья.`);
};

async function theGame() {
    console.log('\nДа начнется битва!!!');

    while (monster.realHealt > 0 && eastfy.realHealt > 0) {
        const [monsterMovies, estafMovies] = getPossibleMovies();
        const monsterStep = monsterMovies[random(0, monsterMovies.length - 1)];
        console.log('\nРазведка донесла, что Лютый Монстр на этот раз выбрал:', monsterStep);
        
        let estafStep;
        try {
            estafStep = estafMovies[await askMove(estafMovies)];
        } catch {
            estafStep = estafMovies[await askMove(estafMovies)];
        }
        decreaseAllWait();
        calculateDamage(monster, monsterStep, eastfy, estafStep);
        setHaveToWait(monster, monsterStep);
        calculateDamage(eastfy, estafStep, monster, monsterStep);
        setHaveToWait(eastfy, estafStep);
    }

    console.log('---------------------------');
    if (monster.realHealt <= 0 && eastfy.realHealt <= 0) {
        console.log('Богатый урожай собрала сегодня Смерть...');
        console.log('Эти два товарища угрохали друг друга(');
    } else if (monster.realHealt <= 0) {
        console.log('Не зря запасал магические пузырьки маг Естафий...');
        console.log('Подлый монстр был уничтожен!!!');
    } else {
        console.log('Плачьте, рыдайте, ибо горе землю наше постигло!!!');
        console.log('Боевой маг Евстафий погиб от лап лютого Монстра((');
        setTimeout(() => console.log('Но это не точно....'), 2000);
    }
};

function welcome() {
    read({ prompt: 'Насколько здоровый мужик Естафий:' }, (err, data) => {
        if (err || Number.isNaN(Number.parseInt(data))) {
            console.log('Что-то он дохляк совсем... Давай попробуем еще раз)');
            welcome();
        } else {
            eastfy.maxHealth = data;
            eastfy.realHealt = data;
            theGame();
        }
    });
};

welcome();