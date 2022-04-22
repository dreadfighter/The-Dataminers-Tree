addLayer("D", {
    name: "P", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#4BDC13",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "prestige points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
	  mult = mult.times((hasUpgrade("D", 1)) ? upgradeEffect("D", 11) : new Decimal(1));
		
		mult = mult.pow((hasUpgrade("D", 11)) ? upgradeEffect("D", 11) : new Decimal(1));;
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
description: "Multiplies your income by points/100 + 1.2.",
cost: new Decimal(3), // The upgrade is only visible when this is true     
tooltip: "",
}
	}
    layerShown(){return true},
	
})
