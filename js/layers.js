addLayer("H", {
    name: "Hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H¹", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		auto: false,
    }},
    color: "#02C0F2",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hydrogen",
effectDescription(){
if (hasUpgrade("He", 22)) return "<h5>The Cost was scaled up by <strong>35%.</strong></h5>"
	},	// Name of prestige currency
	canReset() { if (hasUpgrade("He", 22)) return player.points.gte(15.74)
else return player.points.gte(tmp.H.requires) },
automate() {},
    baseResource: "Atoms",	// Name of resource prestige is based on
    baseAmount() {return player.points},
autoUpgrade() { return (hasChallenge("Li", 21) || inChallenge("C", 11) && player.H.auto)},
autoPrestige() { return (hasChallenge("Li", 21) && player.H.auto)},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("He", 22)) mult = mult.times(0.65)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "h", description: "H: Reset for Hydrohen", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 4,
		cols: 4,
		11: {
title: "Unmetal Qualities",
description: "120% Hydrogen effective",
cost: new Decimal(2),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Сovalent Bond",
description: "Gains point boost by (^1.1 * 1.5)",
cost: new Decimal(4),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
				21: {
title: "First Element",
description: "Boosts second Hydrogen Upgrade",
cost: new Decimal(8),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	22: {
title: "New Element",
description: "Opens Helium²",
cost: new Decimal(10),
	},
unlocked() { return true}, // The upgrade is only visible when this is true
	23: {
title: "Hydrogen Bonds",
description: "Exponents point boost by ^1.1",
cost: new Decimal(100),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	31: {
title: "Holy Molecule",
description: "Exponents point boost by ^1.15",
cost: new Decimal(150),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	32: {
title: "Generator of Hydrogen",
description: "Generates 20% of Hydrogen Resettable amount",
cost: new Decimal(300),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	41: {
		title: "Mega Super Ultra Upgrade",
description: "Get <b>A lot more Atoms!</b>",
cost: new Decimal(25000),
unlocked() { return (hasChallenge("Li", 11) || inChallenge("C", 11))},
	},
	42: {
		title: "I said <b>MORE</b>",
description: "<b>...</b>",
cost: new Decimal(75000),
unlocked() { return (hasChallenge("Li", 11) || inChallenge("C", 11))},
	},
	43: {
		title: "Challenge Effect I",
		description: "Hydrogen amount = Atoms gain /stonks/",
		cost: new Decimal(1000000),
		unlocked() { return (inChallenge("Li", 21))},
		effect() {
return player.H.points.add(1).pow(0.35)
},
effectDisplay() {
	return format(upgradeEffect("H", 43)) + "x"
},
	},
},
		milestones: {
    0: {
        requirementDescription: "2500 Hydrogen",
        effectDescription: "Keep Hydrogen Upgrades on reset",
        done() { return player.H.points.gte(2500) },
    },
},
			passiveGeneration() {
 return (hasUpgrade("H", 32)?0.2:0)
  },
	layerShown(){return true}
}),
addLayer("He", {
    name: "Helium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "He²", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#04G0B2",
    requires: new Decimal(20), // Can be a function that takes requirement increases into account
    resource: "Helium",
branches: ["H"],	// Name of prestige currency
    baseResource: "Hydrogen",	//Name of resource prestige is based on
    baseAmount() {return player.H.points},
canReset() { return player.He.points.lt(99) && player.H.points.gte(tmp.He.requires)},
effectDescription(){
		if (player.He.points.gte(99)) return "adding "+format(player.He.points.plus(1).pow(0.5)) + "(+" + format(player.He.points.plus(1).pow(0.5)) + " 13 upg) to base point gain." + "<p><h4>[The Helium gain was hardcapped]</h4></p>"
	if (hasUpgrade("He", 13)) return "adding "+format(player.He.points.plus(1).pow(0.5)) + "(+" + format(player.He.points.plus(1).pow(0.5)) + " 13 upg) to base point gain."
	else return "adding "+format(player.He.points.plus(1).pow(0.5))+" to base point gain."
	},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "1", description: "1: Reset for Helium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 3,
		cols: 3,
		11: {
title: "Second Element",
description: "Multiplies Atoms gain by <strong>x2.5</strong>",
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Two Atoms",
description: "Multiplies Atoms gain by <strong>x2</strong>",
cost: new Decimal(2),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			13: {
title: "Booster",
description: "Doubles Helium effect",
cost: new Decimal(5),
unlocked() { return true},
effect() {
	return player.He.points.plus(1).pow(0.5)
}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Helium Boost I",
description: "Multiplies Atoms gain by <strong>x1.3</strong>",
cost: new Decimal(7),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Helium Boost II",
description: "Unlock Lithium³ / After gettin' more than 99 Helium you cannot get any Helium :)",
cost: new Decimal(11),
unlocked() { return true}, // The upgrade is only visible when this is true     
            }
	},
			milestones: {
    0: {
        requirementDescription: "2500 Hydrogen",
        effectDescription: "Keep Hydrogen Upgrades on reset",
        done() { return player.H.points.gte(2500) },
    },
},
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("H", keep)
				if (hasMilestone("He", 0) && resettingLayer=="He") keep.push("upgrades");
			layerDataReset("H")
		},
	layerShown(){return (hasUpgrade("H", 22) || player[this.layer].unlocked )}
})

addLayer("Be", {
    name: "Beryllium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Be⁴", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#DC5F22",
    requires: new Decimal(18000000), // Can be a function that takes requirement increases into account
    resource: "Beryllium",
	canReset() { if (hasUpgrade("Be", 22)) return player.Be.points.lt(190) && player.points.gte(tmp.Be.requires)
		else return player.points.gte(tmp.Be.requires)},
branches: ["Li"],	// Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points},
effectDescription(){ if (inChallenge("Li", 21)) return "adding <b>x</b>"+format(player.Be.points.plus(2).div(1.5))+" to base point gain."
	else return "adding <b>x</b>"+format(player.Be.points.plus(2))+" to base point gain."
},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "/", description: "/: Reset for Beryllium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 2,
		cols: 2,
		11: {
title: "Third Element",
description: "100% Lithium effective",
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Three Atoms",
description: "70% Lithium effective",
cost: new Decimal(5),
unlocked() { return (hasUpgrade("Be", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Boost I",
description: "50% Lithium effective",
cost: new Decimal(10),
unlocked() { return (hasUpgrade("Be", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Boost II",
description: "Unlock Boron",
cost: new Decimal(20),
unlocked() { return (hasUpgrade("Be", 21))}, // The upgrade is only visible when this is true     
            },
	},
  		milestones: {
    0: {
        requirementDescription: "2500 Hydrogen",
        effectDescription: "Keep Hydrogen Upgrades on reset",
        done() { return player.H.points.gte(2500) },
    },
},
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("H", keep)
			if (hasMilestone("Be", 0) && resettingLayer=="Be") keep.push("upgrades");
		if (hasChallenge("Li", 11) && resettingLayer=="Li") keep.push("challenges");
		},
	layerShown(){return (hasUpgrade("Li", 22) || player[this.layer].unlocked )}
})
addLayer("Li", {
    name: "Lithium", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "Li³", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#D2D5B2",
	canReset() {if (hasUpgrade("Li", 22)) return player.Li.points.lt(500) && player.H.points.gte(4375)
		else return player.H.points.gte(tmp.Li.requires)
	},
    requires: new Decimal(2500), // Can be a function that takes requirement increases into account
    resource: "Lithium",
	effectDescription(){
    if (inChallenge("Li", 21)) return "Lithium amount adding " + format(player.Li.points.plus(0.2).pow(0.2).div(1.5)) + "x to point gain <p>[Divided]</p>"
	if (player.Be.unlocked) return "<p>The Cost was scaled up by <strong>100%.</strong></p>" + "Lithium amount adding " + format(player.Li.points.plus(0.2).pow(0.2)) + "x to point gain"
	if (hasUpgrade("Li", 22)) return "<p>The Cost was scaled up by <strong>75%.</strong></p>" + "Lithium amount adding " + format(player.Li.points.plus(0.2).pow(0.2)) + "x to point gain"
	else return "Lithium amount adding " + format(player.Li.points.plus(0.2).pow(0.2)) + "x to point gain"
	},
branches: ["He"],	// Name of prestige currency
    baseResource: "Hydrogen",	// Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.65, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
			if (player.Be.unlocked) mult = mult.times(0.75)
				if (hasUpgrade("Li", 22)) mult = mult.times(0.25)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "l", description: "L: Reset for Lithium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 2,
		cols: 2,
		11: {
title: "Third Element",
description: "10% Lithium effective",
cost: new Decimal(10),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Three Atoms",
description: "10% Lithium effective",
cost: new Decimal(30),
unlocked() { return (hasUpgrade("Li", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Boost I",
description: "50% Lithium effective",
cost: new Decimal(50),
unlocked() { return (hasUpgrade("Li", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Boost II",
description: "Unlock Berillium",
cost: new Decimal(100),
unlocked() { return (hasUpgrade("Li", 12))}, // The upgrade is only visible when this is true     
            },
	},
			milestones: {
    0: {
        requirementDescription: "250 Lithium",
        effectDescription: "Automate Hydrogen Upgrades",
        done() { return player.Li.points.gte(250) },
		toggles: [["H", "auto"]]
    },
},
	challenges: {
			rows: 4,
			cols: 2,
			11: {
				name: "Upgrade Desert",
				completionLimit: 1,
				challengeDescription: "Atoms gain is 2x more effective",
				unlocked() { return player.H.unlocked },
				goal() { return new Decimal(player.current=="H"?"120000":"120000") },
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription: "Unlock More Hydrogen Upgrades. Doubles Atoms gain",
},
12: {
				name: "Griiiindy",
				completionLimit: 1,
				challengeDescription: "Atoms gain is divided by 5",
				unlocked() { return player.Be.unlocked },
				goal() { return new Decimal(player.current=="H"?"70000000":"70000000") },
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription: "Unlock Boron upgrades",
},
21: {
				name: "Ah Shit Here We go Again",
				completionLimit: 1,
				challengeDescription: "Beryllium and Lithium effects are divided by 1.5. Gains effect based on Hydrogen amount",
				unlocked() { return (hasChallenge("Li", 12)) },
				goal() { return new Decimal(player.current=="H"?"1e14":"1e14") },
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription: "Exponent the Atoms gain by ^1.05. Automate Hydrogen upgrades.",
},
	},
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("H", keep)
				if (inChallenge("D", 11) && resettingLayer=="Li") keep.push("upgrades");
		},
	layerShown(){return (hasUpgrade("He", 22) || player[this.layer].unlocked )}
})
addLayer("B", {
    name: "Boron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B⁵", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#F52C56",
    requires: new Decimal(1e10), // Can be a function that takes requirement increases into account
    resource: "Boron",
	canReset() {if (hasUpgrade("B", 22)) return player.H.points.gte(3.2e11)
		else return player.H.points.gte(tmp.Li.requires)
	},
branches: ["He"],	// Name of prestige currency
    baseResource: "Atoms",	// Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.2, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("B", 22)) mult = mult.mul(0.5)    
			return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "B: Reset for Boron", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
		buyables: {

    11: {
				 title: "Mega Buyable",
				 purchaseLimit: new Decimal(30),
        cost(x) { return new Decimal(1).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Boron amount boost atoms gain.<p></p>" +
		"Cost: " + format(data.cost) + " Boron.<p></p>" +
        "Currently effect: " +format(data.effect) + "x."
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
	let eff = x.add(1).times(3).pow(2).sqrt(2).plus(x.add(1).plus(4)).pow(buyableEffect("B", 13).div(2));
	return eff;
},
effectDisplay(x) {
	return format(x.add(1).times(3).pow(2).sqrt(2)) + "x"
},
    },
	    12: {
				 title: "Another one",
				 purchaseLimit() { if (inChallenge("C", 11) || (hasChallenge("C", 11))) return new Decimal(20)
				 else return new Decimal(10) },
        cost(x) { return new Decimal(5).mul(x)	},
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Increases effect of all Boron buyables<p></p>" +
		"Cost: " + format(data.cost) + " Boron.<p></p>" +
        "Currently effect: " +format(data.effect) + "x."
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
	let eff = x.add(1).plus(4);
	return eff;
},
effectDisplay(x) {
	return format(x.add(1).plus(4)) + "x"
},
    },
		    13: {
				 title: "Just Buy It...",
				 purchaseLimit() { if (inChallenge("C", 11) || (hasChallenge("C", 11))) return new Decimal(12)
				 else return new Decimal(10) },
        cost(x) { return new Decimal(10).mul(x)	},
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Increases effect of all Boron buyables<p></p>" +
		"Cost: " + format(data.cost) + " Boron.<p></p>" +
        "Currently effect: ^" +format(data.effect) + "."
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		effect(x) {
	let eff = x.add(1).pow(0.9).plus(buyableEffect("B", 12).div(100));
	return eff;
},
effectDisplay(x) {
	return format(x.pow(1.02)) + "x"
},
    },
		},
		upgrades: {
			rows: 4,
			cols: 4,
			11: {
			title: "Boron Boost I",
			description: "Dubles all buyables effects",
			cost: new Decimal(50),
			unlocked() {return (hasChallenge("Li", 12)) },
			},
						21: {
title: "Challenge Boost I",
description: "---Recover---",
cost: new Decimal(200),
unlocked() { return (inChallenge("C", 11))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Challenge Boost II",
description: "---Recover---",
cost: new Decimal(400),
unlocked() { return (inChallenge("C", 11))}, // The upgrade is only visible when this is true     
            },
		},
		  		milestones: {
    0: {
        requirementDescription: "2500 Hydrogen",
        effectDescription: "Keep Hydrogen Upgrades on reset",
        done() { return player.H.points.gte(2500) },
    },
},
layerShown(){return (hasUpgrade("Be", 22) || player[this.layer].unlocked )}
})
addLayer("C", {
    name: "Carbon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C⁶", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#F72C36",
    requires: new Decimal(1e21), // Can be a function that takes requirement increases into account
    resource: "Carbon",
		canReset() { if (hasChallenge("C", 11)) return player.points.gte(1.7e21)
		else return player.points.gte(tmp.C.requires)},
branches: ["Be"],	// Name of prestige currency
    baseResource: "Atoms",	// Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasChallenge("C", 11)) mult = mult.mul(0.3)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "B", description: "c: Reset for Carbon", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
			challenges: {
			11: {
				name: "Carbon I",
				completionLimit: 2,
				challengeDescription: "Boron buyables effects are divided by 4, but you have 2 upgrades that gain x4 bonus and Powered Limit on 2nd and 3rd buyable (20, 12)",
				unlocked() { return player.C.unlocked },
				goal() { return new Decimal(player.current=="H"?"1e24":"1e24") },
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription: "Unlock next challenge and 2 Carbon Upgrades",
},
		},
layerShown(){return (hasUpgrade("B", 11) || player[this.layer].unlocked )},
})