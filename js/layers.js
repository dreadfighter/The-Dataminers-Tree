addLayer("R", {
    name: "Red", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "R", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		effboost: new Decimal(10),
		formulag: new Decimal(1),
        effectb: new Decimal(1200),
		x: new Decimal(50),
		best: new Decimal(0),
		total: new Decimal(0),
		auto: false,
    }},
    color: "red",
	automate() {},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Red",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "R") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "R") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
	upgrades: {
		11: {
			title: "Start a colourful journey",
			description: "Gain 1 Stars/s.",
			cost: new Decimal(1),
			unlocked() {return true},
		},
		12: {
						title: "1.1",
			description: "2.35x to points gain",
			cost: new Decimal(2),
			unlocked() {return true},
		},
				13: {
						title() { if (player.RP.unlocked) return "1.2 - Boosted by RP effect"
else return "1.2"						},
			description: "Multiplies stars gain by Red amount",
			cost: new Decimal(10),
			unlocked() {return true},
			effect() {  if (player.RP.unlocked) return player.R.x.times(player.RP.points.add(1))
			 else if (upgradeEffect("R", 13).gte(50)) return player.R.x
				return player.R.points.add(1).pow(0.70)
			},
			effectDescription() {
				return format(upgradeEffect("R", 13)) + " x"
			},
		},
				14: {
						title: "1.3",
			description: "25.00x to points gain",
			cost: new Decimal(120),
			unlocked() {return true},
		},
	},
			passiveGeneration() {			
  },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Reset for Red", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return true}
})
addLayer("RP", {
    name: "Red Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		effboost: new Decimal(10),
		formulag: new Decimal(1),
        effectb: new Decimal(1200),
		upgpoint: new Decimal(22),
		best: new Decimal(0),
		total: new Decimal(0),
		auto: false,
    }},
    color: "darkred",
	automate() {},
	effectDescription() { return " which is gaining " +format(player.RP.points.add(1)) + " x to red upgrades"},
	branches: ["R"],
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Red Prestige",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { if (player.RP.points.gte(0)) return player.RP.points.pow(1.0002)
		else return 3}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "RP") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "RP") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
			passiveGeneration() {			
  },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "r", description: "r: Reset for Red", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return true}
})
addLayer("o", {
    name: "Orange", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "O", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		effboost: new Decimal(10),
		formulag: new Decimal(1),
        effectb: new Decimal(1200),
		upgpoint: new Decimal(22),
		best: new Decimal(0),
		total: new Decimal(0),
		auto: false,
    }},
    color: "orange",
	automate() {},
	effectDescription() { return " which is gaining " +format(player.o.points.add(1.5)) + " x to points gain"},
    requires: new Decimal(1700000), // Can be a function that takes requirement increases into account
    resource: "Orange",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "o") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "o") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "o: Reset for Orange", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return (player.RP.points.gte(2) || player[this.layer].unlocked)},
})
addLayer("ac", {
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "white",
    row: "side",
    layerShown() {
        return true
    },
    tooltip() {
        return ("Achievements")
    },
    achievements: {
        11: {
            name: "Start a journey",
            done() {
                return player.points.gt(0)
				},
						doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	 tooltip: "Gain your first Star",
	},
	},
	    tabFormat: 
		["blank", ["display-text", function() {
        return "Achievements: " + player.ac.achievements.length + "/" + (Object.keys(tmp.ac.achievements).length - 2)
    },
    ], "blank", "blank", "achievements", ],
})
            
  						
addLayer("HP", {
    startData() {
        return {
            unlocked: true,
        }
    },
    color: "white",
    row: "side",
    layerShown() {
        return true
    },
    tooltip() {
        return ("Help")
    },	
tabFormat: {
	"Help": {
		content: [
		["display-text",
	],
	"blank",
		["infobox", "upg"],
				["infobox", "mil"],
			["infobox", "chal"],
			["infobox", "buy"],
	["infobox", "one"],
		["infobox", "two"],
		["infobox", "three"]
	],
	},
	},	
				infoboxes: {
    one: {
        title: "Стерео Маднесс",
        body() { return "Как только вы зашли в игру, вас ожидает первый слой (первый уровень гд). В начале игры убедитесь, что приобрели все апгрейды до 2х последних...<br>" },
    },
	    two: {
        title: "Бэк он трек",
        body() { return "После покупки первого апгрейда этого слоя (2-ой уровень гд), вам необходимо купить все вплоть до 5-ого, после чего для вас откроется первое испытание... Описание испытания: 2-ое улучшение Стерео Маднесса будет уменьшено вдвое и 4-ое улучшение Бэк Он Трека будет выключено... Постарайтесь выполнить испытание дважды для комфортного прохождения." },
		unlocked() { return (player.BT.unlocked)
		},
    },
	    three: {
        title: "Поларгэйст",
        	unlocked() { return (player.PG.unlocked)
		},
		body() { return "Этот слой самый важный в прохождении на данный момент. Постарайтесь получать как можно больше Поларгэйста (минимум по 2 после 1-ого сброса), чтобы добиться максимальной скорости развития. После получения последнего улучшения данного слоя, все улучшения, имеющие какую-либо формулу будут увеличены крайне сильно." },
    },
		    upg: {
        title: "Апгрейды",
		body() { return "<i>Бесполезно...</i>Основной способ прокачки. Представляется в виде кнопки с описанием. Пользоваться достаточно просто: Собираешь нужное кол-во валюты и нажимаешь на сам апгрейд." },
    },
			    mil: {
        title: "Майлстоуны",
		body() { return "<i>Бесполезно...</i>Просто какая-то цель. Просто ЧЕРТОВА жирная полоска с тесктом цели и эффекта... Автоматически выполняется. <b>Просто ДОСТИГАЕШЬ</b> цели и <b>ЗАБИРАЕШЬ</b> награду... " },
    },
				    buy: {
        title: "Покупалки",
		body() { return "<i>Бесполезно...</i>Просто та же кнопка и описание того что она делает и ее стоимость. Просто НАЖИМАЕШЬ и получаешь какой-либо эффект... <b>БЕСИТ</b>" },
    },
	        chal: { title: "Испытания",
		body() { return "<i>Снова бесполезная инфа...</i>Просто испытание. Имеет информацию цели(Goal), описания(под кнопкой), кол-во выполнений(Completions) и эффект выполнения испытания(под всем). Представляется в виде огромного квадрата с кнопкой, которая запускает испытание. Пользоваться просто: Нажимаешь на кнопку и достигаешь цели.. <b>ВСЕ</b>" },
    },
},
})