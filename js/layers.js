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
						title: "F.1",
			description: "2.35x to points gain",
			cost: new Decimal(2),
			unlocked() {return true},
		},
				13: {
						title() { if (player.RP.unlocked) return "F.2 - Boosted by RP effect"
else return "1.2"						},
			description: "Multiplies stars gain by Red amount",
			cost: new Decimal(10),
			unlocked() {return true},
			effect() {  if (player.RSP.unlocked) return player.R.x.times(player.RP.points.add(1).add(player.RSP.points.add(3).plus(2)))
			if (player.RP.unlocked) return player.R.x.times(player.RP.points.add(1))
			 else if (upgradeEffect("R", 13).gte(50)) return player.R.x
				return player.R.points.add(1).pow(0.70)
			},
			effectDescription() {
				return format(upgradeEffect("R", 13)) + " x"
			},
		},
				14: {
						title: "F.3",
			description: "25.00x to points gain",
			cost: new Decimal(120),
			unlocked() {return true},
		},
						15: {
						title: "F.4",
			description: "3.50x to Orange gain",
			cost: new Decimal(10000000),
			currencyDisplayName: "points",
            currencyInternalName: "points",
            currencyLayer: "",
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
	effectDescription() { if (player.RSP.unlocked) return " which is gaining " +format(player.RP.points.add(1).plus(player.RSP.points.add(3).plus(2))) + " x to red upgrades"
		else return " which is gaining " +format(player.RP.points.add(1)) + " x to red upgrades"},
	branches: ["R"],
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Red Prestige",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { if (player.RP.unlocked) return player.RP.points.pow(1.0002)
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
addLayer("RSP", {
    name: "Red Super Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "RSP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
    color: "#800000",
	automate() {},
	effectDescription() { return " which adds " +format(player.RSP.points.add(3).plus(2)) + " x to the Red Prestige effect"},
	branches: ["RP"],
    requires: new Decimal(1e11), // Can be a function that takes requirement increases into account
    resource: "Red Super Prestige",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { if (player.RP.unlocked) return player.RP.points.pow(1.0002)
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
            function() {if (player.tab == "RSP") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "RSP") return "resource-display"},
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
	layerShown(){return (player.op.points.gte(2))}
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
	effectDescription() { 
	if (challengeCompletions("y", 11) == 3) return " which is gaining " +format(player.o.points.plus(1).add(1.5).pow(player.op.points.add(0.2).plus(0.15)).times(2.45)) + "x to points gain"
		else if (challengeCompletions("y", 11) == 2) return " which is gaining " +format(player.o.points.plus(1).add(1.5).pow(player.op.points.add(0.2).plus(0.15)).times(1.89)) + "x to points gain"
		else if (challengeCompletions("y", 11) == 1) return " which is gaining " +format(player.o.points.plus(1).add(1.5).pow(player.op.points.add(0.2).plus(0.15)).times(1.3)) + "x to points gain"
	else return " which is gaining " +format(player.o.points.plus(1).add(1.5)) + " x to points gain"},
    requires: new Decimal(1700000), // Can be a function that takes requirement increases into account
    resource: "Orange",
	branches: ["R"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("R", 15)) mult = mult.div(3.5)
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
		upgrades: {
					11: {
			title: "F.1",
			description: "Multiplies points gain by Red Prestige amount",
			cost: new Decimal(3),
			unlocked() {return true},
			effect() { if (inChallenge("y", 11)) return (upgradeEffect("o", 11)).div(upgradeEffect("o", 11))
				else return player.RP.points.add(1).plus(0.5).pow(3.5)
			},
		},
		},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "o", description: "o: Reset for Orange", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.RP.points.gte(2) || player[this.layer].unlocked)},
})
addLayer("op", {
    name: "Orange Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "OP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
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
    color: "darkorange",
	automate() {},
	effectDescription() { if (challengeCompletions("y", 11) == 3) return " which is exponents orange effect by ^" +format(player.op.points.add(0.2).plus(0.15).times(2.45))
	if (challengeCompletions("y", 11) == 2) return " which is exponents orange effect by ^" +format(player.op.points.add(0.2).plus(0.15).times(1.89))
	else if (challengeCompletions("y", 11) == 1) return " which is exponents orange effect by ^" +format(player.op.points.add(0.2).plus(0.15).times(1.3))
	else return " which is exponents orange effect by ^" +format(player.op.points.add(0.2).plus(0.15))},
    requires: new Decimal(10000000), // Can be a function that takes requirement increases into account
    resource: "Orange Prestige",
	branches: ["o"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 3, // Prestige currency exponent
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
            function() {if (player.tab == "op") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "op") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "2", description: "2: Reset for Orange Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.o.points.gte(1) || player[this.layer].unlocked)},
})
addLayer("y", {
    name: "Yellow", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Y", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "yellow",
	automate() {},
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "Yellow",
	branches: ["o"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
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
            function() {if (player.tab == "y") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "y") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		        "Challenges": {
            content:[
                function() {if (player.tab == "y") return "main-display"},
            function() {if (player.tab == "y") return "resource-display"},
            "prestige-button",
            "blank",
                "challenges"
            ],
        },
		},
			challenges: {
		11: {
				name: "Speedrun",
				completionLimit: 3,
				challengeDescription() { 
				let lim = this.completionLimit;
				return "<b>F.1 Orange effect is off</b> Completions: " + format(challengeCompletions("y", 11)) + " / " + format(lim)
				},
				  scalePower() {
                let power = new Decimal(1);
                return power;
            },
				unlocked() { return (player.y.unlocked) },
				goal() { let comps = Decimal.mul(challengeCompletions("y", 11))
if (challengeCompletions("y", 11) == 2) return new Decimal(2e11)
if (challengeCompletions("y", 11) == 1) return new Decimal(5e10)	
if (challengeCompletions("y", 11) == 0) return new Decimal(1e10)	
},
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription() {
					if (challengeCompletions("y", 11) == 3) return "Boost Orange Prestige Effect. Currently: 2.45x"
					if (challengeCompletions("y", 11) == 2) return "Boost Orange Prestige Effect. Currently: 1.89x"
					if (challengeCompletions("y", 11) == 1) return "Boost Orange Prestige Effect. Currently: 1.30x"	},
},
	},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "y", description: "y: Reset for Yellow", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.op.points.gte(2) || player[this.layer].unlocked)},
})
addLayer("g", {
    name: "Green", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "green",
	automate() {},
    requires: new Decimal(1e15), // Can be a function that takes requirement increases into account
    resource: "Green",
	branches: ["y"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 2, // Prestige currency exponent
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
            function() {if (player.tab == "g") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "g") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "g: Reset for Hreen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.y.unlocked || player[this.layer].unlocked)},
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
			tooltip: "Gain your first Star",
            done() {
                return player.points.gt(0)
				},
		},
	},
	    tabFormat: 
		["blank", ["display-text", function() {
        return "Achievements: " + player.ac.achievements.length + "/" + (Object.keys(tmp.ac.achievements).length - 2)
    },
    ], "blank", "blank", "achievements", ],
})
            