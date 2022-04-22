addLayer("D", {
    name: "D", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "D", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#AFEEEE",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Data", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
            11: {
title: "Generator of Genericness",
description: "Gain 1 Point every second.",
cost: new Decimal(3),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
tooltip: "+2/s",
            },
			12: {
title: "Generator of Genericness",
description: "Gain bonus based on Prestige Points amount.",
cost: new Decimal(5),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
tooltip: "+3/s",      
			effect() {
				return player[this.layer].points.add(0.8).pow(0.37)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			},
	},
	layerShown(){return true},
})

addLayer("SD", {
    name: "SD", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 10, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#AFEEEE",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "DeepData", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal",	
	branches: ["D"],// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.4, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return true},
})





