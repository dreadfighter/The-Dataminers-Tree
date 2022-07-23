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
			effect() {  if (inChallenge("y", 12)) return player.R.x.times(player.RP.points.add(0.15).pow(2.35).add(player.RSP.points.add(3)))
			else if (player.RSP.unlocked) return player.R.x.times(player.RP.points.add(0.15).pow(2.35).add(player.RSP.points.add(3).plus(2)))
			if (player.RP.unlocked) return player.R.x.times(player.RP.points.add(0.15).pow(2.35).add(0.05))
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
								21: {
						title: "C.1",
			description: "1.76x to point gain",
			cost: new Decimal(9.62e15),
			unlocked() {return (player.yp.points.gte(1))},
		},
										22: {
						title: "C.2",
			description: "Boost point gain by Green amount",
			cost: new Decimal(2.13e16),
			unlocked() {return (player.yp.points.gte(1))},
			effect() {
				return player.g.points.add(1).times(1.87)
			},
		},
			23: {
						title: "C.3",
			description: "Unlock Green Prestige layer",
			cost: new Decimal(3.49e17),
			unlocked() {return (player.yp.points.gte(1))},
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
	effectDescription() { if (inChallenge("y", 12)) return " which is gaining " +format(player.RP.points.pow(2.35).plus(player.RSP.points.add(0.2))) + " x to red upgrades"
		else if (player.RSP.unlocked) return " which is gaining " +format(player.RP.points.pow(2.35).plus(player.RSP.points.add(3).plus(2))) + " x to red upgrades"
		else return " which is gaining " +format(player.RP.points.pow(2.35)) + " x to red upgrades"},
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
		if (hasMilestone("g", 12)) mult = mult.div(2e105)
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
    color: "#650000",
	automate() {},
	effectDescription() { if (inChallenge("y", 12)) return " which adds " +format(player.RSP.points.add(0.2)) + " x to the Red Prestige effect"
	else return " which adds " +format(player.RSP.points.add(3).plus(2)) + " x to the Red Prestige effect"},
	branches: ["RP"],
    requires: new Decimal(1e11), // Can be a function that takes requirement increases into account
    resource: "Red Super Prestige",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent() { if (player.RP.unlocked) return player.RSP.points.pow(0.8)
		else return 3}, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (challengeCompletions("y", 12) >= 2) mult = mult.div(2e18)
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
	if (challengeCompletions("y", 11) == 3) return " which is gaining " +format(player.o.points.add(1.5).pow(2.13).pow(player.op.points.add(0.2).plus(0.15)).times(2.45)) + "x to points gain"
		else if (challengeCompletions("y", 11) == 2) return " which is gaining " +format(player.o.points.add(1.5).pow(2.13).pow(player.op.points.add(0.2).plus(0.15)).times(1.89)) + "x to points gain"
		else if (challengeCompletions("y", 11) == 1) return " which is gaining " +format(player.o.points.add(1.5).pow(2.13).pow(player.op.points.add(0.2).plus(0.15)).times(1.3)) + "x to points gain"
	else return " which is gaining " +format(player.o.points.add(1.5).pow(2.13)) + " x to points gain"},
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
			effect() { if (inChallenge("y", 11)) return player.RP.points.add(1).plus(0.5).pow(3.5).div(2)
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
		if (challengeCompletions("y", 12) >= 1) mult = mult.div(4.67e13)
			if (hasMilestone("g", 11)) mult = mult.div(2e14)
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
		12: {
				name: "Red Time",
				completionLimit: 5,
				challengeDescription() { 
				let lim = this.completionLimit;
				return "<b>Red Super Prestige effect = 3.00x</b> Completions: " + format(challengeCompletions("y", 12)) + " / " + format(lim)
				},
				  scalePower() {
                let power = new Decimal(1);
                return power;
            },
				unlocked() { return (player.y.unlocked) },
				goal() { let comps = Decimal.mul(challengeCompletions("y", 12))
if (challengeCompletions("y", 12) == 4) return new Decimal(8.47e15)
if (challengeCompletions("y", 12) == 3) return new Decimal(4.72e15)
if (challengeCompletions("y", 12) == 2) return new Decimal(2.38e15)
if (challengeCompletions("y", 12) == 1) return new Decimal(5e14)	
if (challengeCompletions("y", 12) == 0) return new Decimal(7.62e13)	
},
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription() {
if (challengeCompletions("y", 12) == 4) return "Unlock a new upgrade, point gain multiplier, reduce RSP and OP cost. Currenlty: 4.67e13x, 2e18x, 3.46x"
if (challengeCompletions("y", 12) == 3) return "Point gain multiplier, reduce RSP and OP cost. Currenlty: 4.67e13x, 2e18x, 3.46x"
if (challengeCompletions("y", 12) == 2) return "Reduces cost of Red Super and Orange Prestige: Currently: 4.67e13x, 2e18x"
if (challengeCompletions("y", 12) == 1) return "Reduces cost of Orange Prestige: Currently: 4.67e13x"	},
},
			},
upgrades: {
	11: {
		title: "F.1",
		description: "Yellow amount boost point gain",
		cost: new Decimal(4),
		unlocked() {return (challengeCompletions("y", 12) >= 4)},
		effect() {
			return player.y.points.add(1).times(10.3)
		},
	},
},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "y", description: "y: Reset for Yellow", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.op.points.gte(2) || player[this.layer].unlocked)},
})
addLayer("yp", {
    name: "Yellow Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "YP", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "#CCCC00",
	automate() {},
effectDescription() {return " which unlocks " + format(player.yp.points) + " rows of red upgrades"},
    requires: new Decimal(1e17), // Can be a function that takes requirement increases into account
    resource: "Yellow Prestige",
	branches: ["y"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 7, // Prestige currency exponent
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
            function() {if (player.tab == "yp") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "yp") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "2", description: "3: Reset for Yellow Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.g.points.gte(1) || player[this.layer].unlocked)},
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
            "milestones"
            ]
        },
		},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "g", description: "g: Reset for Hreen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	milestones: {
		    11: {
        requirementDescription: "4 Green",
        effectDescription: "Reduces cost of Orange Prestige by 2e14x",
        done() { return player.g.points.gte(4) },
		unlocked() { return (player.gp.points.gte(1))},
    },
			    12: {
        requirementDescription: "5 Green",
        effectDescription: "Reduces cost of Red Prestige by 2e105x",
        done() { return player.g.points.gte(5) },
		unlocked() { return (player.gp.points.gte(2))},
    },
				    13: {
        requirementDescription: "6 Green",
        effectDescription: "Unlock a new layer and 35.00x to point gain",
        done() { return player.g.points.gte(6) },
		unlocked() { return (player.gp.points.gte(3))},
    },
	},
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.y.unlocked || player[this.layer].unlocked)},
})
addLayer("gp", {
    name: "Green Prestige", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GP", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "#004800",
	automate() {},
	effectDescription() {if (player.gp.points.gte(5)) return " which unlocks " +format(player.gp.points) + " (MAXED) Green milestones and gains 50.00x to point gain boost"
		else if (player.gp.points.gte(4)) return " which unlocks " +format(player.gp.points) + " Green milestones and gains 25.00x to point gain boost"
		else return " which unlocks " +format(player.gp.points) + " Green milestones"},
    requires: new Decimal(3e19), // Can be a function that takes requirement increases into account
    resource: "Green Prestige",
	branches: ["g"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 1.2, // Prestige currency exponent
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
            function() {if (player.tab == "gp") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "gp") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
		},
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "4", description: "4: Reset for Green Prestige", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (hasUpgrade("R", 23) || player[this.layer].unlocked)},
})
addLayer("c", {
    name: "Cyan", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "cyan",
	automate() {},
    requires: new Decimal(5e24), // Can be a function that takes requirement increases into account
    resource: "Cyan",
	branches: ["g"],
	effectDescription() {
		return "Just buy one to unlock Blue and Violet"
	},
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
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
            function() {if (player.tab == "c") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "c") return "resource-display"},
            "blank",
            "milestones"
            ]
        },
		},
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Cyan", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (hasMilestone("g", 13) || player[this.layer].unlocked)},
})
addLayer("b", {
    name: "Blue", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "blue",
	automate() {},
    requires: new Decimal(1e25), // Can be a function that takes requirement increases into account
    resource: "Blue",
	branches: ["c"],
	effectDescription() {
		return "Just buy one to unlock Violet"
	},
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 5, // Prestige currency exponent
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
            function() {if (player.tab == "c") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "c") return "resource-display"},
            "blank",
            "milestones"
            ]
        },
		},
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Cyan", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.c.points.gte(1) || player[this.layer].unlocked)},
})
addLayer("v", {
    name: "Violet", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "V", // This appears on the layer's node. Default is the id with the first letter capitalized
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
    color: "violet",
	automate() {},
    requires: new Decimal(1e25), // Can be a function that takes requirement increases into account
    resource: "Violet",
	branches: ["b"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "static", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 8, // Prestige currency exponent
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
            function() {if (player.tab == "c") return "main-display"},
            "prestige-button",
			"blank",
            function() {if (player.tab == "c") return "resource-display"},
            "blank",
            "milestones"
            ]
        },
		},
    row: 6, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "c", description: "c: Reset for Cyan", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
							doReset(resettingLayer) {
			let keep = [];
if (layers[resettingLayer].row > this.row) layerDataReset("R", keep)
if (player.R.unlocked && resettingLayer=="R") keep.push("upgrades")
if (player.RP.unlocked && resettingLayer=="RP") keep.push("upgrades")
		},
	layerShown(){return (player.c.points.gte(1) || player[this.layer].unlocked)},
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
            