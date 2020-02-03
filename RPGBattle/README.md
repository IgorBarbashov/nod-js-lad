## RPG баттл

Боевой маг Евстафий сражается с лютым монстром. Монстр описывается таким объектом:

    const monster = {
    	maxHealth: 10,
    	name: "Лютый",
    	moves: [
    		{
    			"name": "Удар когтистой лапой",
    			"physicalDmg": 3, // физический урон
    			"magicDmg": 0,    // магический урон
    			"physicArmorPercents": 20, // физическая броня
    			"magicArmorPercents": 20,  // магическая броня
    			"cooldown": 0     // ходов на восстановление
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

Боевой маг Евстафий способен на следующее:

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

Бой идет по ходам. Каждый ход компьютер (Лютый) случайно выбирает одно из доступных действий и сообщает, что он собирается делать. В ответ на это игрок (Евстафий) должен выбрать свое действие.

После происходит взаимное нанесение урона. Магическая броня блокирует магический урон, физическая броня блокирует физический урон.

После совершения действия, оно не может быть повторно выбрано в течение *cooldown* ходов

Бой идет до победы одного из противников.

Перед началом боя игрок выбирает сложность (начальное здоровье Евстафия)