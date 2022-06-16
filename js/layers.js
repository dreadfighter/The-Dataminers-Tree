addLayer("SM", {
    name: "Stereo Madness", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		effboost: new Decimal(10),
		formulag: new Decimal(1),
        effectb: new Decimal(25),
		auto: false,
    }},
    color: "lightblue",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stereo Madness",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("SM", 21)) mult = mult.mul(1.5)
			if (hasUpgrade("BT", 21)) mult = mult.mul(upgradeEffect("BT", 21))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
	upgrades: {
		11: {
			title: "Complete 5%",
			description: "Gain 1 Stars/s.",
			cost: new Decimal(1),
			unlocked() {return true},
		},
		12: {
			title: "Complete 15%",
			description: "Stars Gain multiplied by Stereo Madness amount",
			cost: new Decimal(3),
			unlocked() {return true},
			effect() {if (inChallenge("BT", 11)) return player.SM.effboost.times(2)
				if (hasUpgrade("BT", 13)) return player.SM.effboost.times(4)
		if (hasUpgrade("SM", 13)) return player.SM.effboost.times(2)
			if (upgradeEffect("SM", 12).gte(9) && (hasUpgrade("SM", 12))) return player.SM.effboost
				else return player[this.layer].points.plus(1).pow(1.4)
			},
			effectDescription() {return format(upgradeEffect("SM", 11)) + "x"}
		},
				13: {
			title: "Complete 25%",
			description: "Hardcap of <b>15% Completed</b> goes later is doubled.",
			cost: new Decimal(12),
			unlocked() {return true},
		},
						21: {
			title: "Complete 50%",
			description: "Stereo Madness gain is now x1.5 cheaper",
			cost: new Decimal(60),
			unlocked() {return true},
		},
								22: {
			title: "Complete 75%",
			description() { if (hasUpgrade("SM", 23)) return "Stars gain is multiplied by log(x^2), where x is 100(boosted)" 
			else return "Stars gain is multiplied by log(x^2), where x is 25"},
			cost: new Decimal(1800),
			unlocked() {return true},
			effect() { if (hasUpgrade("SM", 23)) return player.SM.formulag.times(9.21)
			else return player.SM.formulag.times(5.77)
			},
		},
								23: {
			title: "Complete level",
			description: "Multiplies x from formula of <b>75% Complete</b> by 4.00x",
			cost: new Decimal(2600),
			unlocked() {return true},
		},
	},
			passiveGeneration() {
				return (hasUpgrade("BT", 12)?0.1:0)
  },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "s", description: "s: Reset for SM", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return true}
})

addLayer("BT", {
    name: "Back On Track", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BT", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		auto: false,
    }},
    color: "darkcyan",
    requires: new Decimal(150), // Can be a function that takes requirement increases into account
    resource: "Back On Track",
	branches: ["SM"],
    baseResource: "Stereo Madness",	// Name of resource prestige is based on
    baseAmount() {return player.SM.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.43, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for BT", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Next Level",
			description: "Gains 4.00x boost to Stars gain",
			cost: new Decimal(1),
		},
		12: {
			title: "10% Completed",
			description: "Get a 10% passive Stereo Madness Generation(boostable)",
			cost: new Decimal(2),
		},
				13: {
			title: "20% Completed",
			description: "Hardcap of <b>15% Completed SM</b> is going later again <br> Currently: 2.00x later",
			cost: new Decimal(7),
		},
						21: {
			title: "30% Completed",
			description: "Multiplies SM gain by (X*2)/Y, where x - best BT and Y - amount of BT right now",
			cost: new Decimal(15),
			effect() { if (inChallenge("BT", 11)) return (upgradeEffect("BT", 21)).div(upgradeEffect("BT", 21))
				if (player.BT.points.lt(5)) return player.BT.best.times(2).div(player.BT.points.add(1).times(8))
					else return player.BT.best.times(2).div(player.BT.points.add(1))
			},
		},
		22: {
			title: "40% Completed",
			description: "Unlock a challenge",
			cost: new Decimal(20),
		},
				23: {
			title: "40% Completed",
			description: "Unlock a challenge",
			cost: new Decimal(20),
			unlocked() { let boost = Decimal.mul(challengeCompletions("BT", 11))
			return (boost.gt(0))
			},
		},
	},
	challenges: {
		11: {
				name: "Upgrade Desert",
				completionLimit: 3,
				challengeDescription() { 
				let lim = this.completionLimit;
				return "<b>15% Completed SM</b> hardcap is powered by 2 and <b>30% Completed BT</b> is off <br> Completions: " + format(challengeCompletions("BT", 11)) + " / " + format(lim)
				},
				  scalePower() {
                let power = new Decimal(1);
                return power;
            },
				unlocked() { return (hasUpgrade("BT", 22)) },
				goal() { let comps = Decimal.mul(challengeCompletions("BT", 11))
				return new Decimal(60000)
if (comps.gt(0)) return new Decimal(80000)			
if (comps.gt(1)) return new Decimal(120000)	
				if (comps.gt(2)) return new Decimal(140000)},
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription() { let boost = Decimal.mul(challengeCompletions("BT", 11))
				if (boost.gt(0)) return "1 Completion: ✓<br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"
else return "1 Completion: <b>Unlock new BT upgrades ✓</b><br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"
if (boost.gt(1)) return "1 Completion: ✓<br> 2 Completions: ✓ <br> 3 Completions: <b>Unlock new Layer</b>"
else return "1 Completion: ✓</b><br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"
if (boost.gt(2)) return "1 Completion: ✓<br> 2 Completions: ✓ <br> 3 Completions: ✓"
else return "1 Completion: ✓</b><br> 2 Completions: ✓ <br> 3 Completions: <b>Unlock new Layer</b>"	},
},
	},
	layerShown(){return (player.SM.points.gte(99) || player[this.layer].unlocked)}
})

addLayer("PG", {
    name: "Poltergeist", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		auto: false,
    }},
    color: "green",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Poltergeist",
	branches: ["BT"],
    baseResource: "Back On Track",	// Name of resource prestige is based on
    baseAmount() {return player.SM.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.43, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "b", description: "b: Reset for BT", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Next Level",
			description: "Gains 4.00x boost to Stars gain",
			cost: new Decimal(1),
		},
		12: {
			title: "10% Completed",
			description: "Get a 10% passive Stereo Madness Generation(boostable)",
			cost: new Decimal(2),
		},
				13: {
			title: "20% Completed",
			description: "Hardcap of <b>15% Completed SM</b> is going later again <br> Currently: 2.00x later",
			cost: new Decimal(7),
		},
						21: {
			title: "30% Completed",
			description: "Multiplies SM gain by (X*2)/Y, where x - best Back On Track and Y - amount of Back On Track right now",
			cost: new Decimal(15),
			effect() { if (inChallenge("BT", 11)) return (upgradeEffect("BT", 21)).div(upgradeEffect("BT", 21))
				if (player.BT.points.lt(5)) return player.BT.best.add(player.BT.best).div(player.BT.points.add(1).times(12))
					else return player.BT.best.add(player.BT.best).div(player.BT.points.add(1))
			},
		},
		22: {
			title: "40% Completed",
			description: "Unlock a challenge",
			cost: new Decimal(20),
		},
				23: {
			title: "40% Completed",
			description: "Unlock a challenge",
			cost: new Decimal(20),
			unlocked() { let boost = Decimal.mul(challengeCompletions("BT", 11))
			return (hasChallenge("BT", 11))
			},
		},
	},
	challenges: {
		11: {
				name: "Upgrade Desert",
				completionLimit: 3,
				challengeDescription() { 
				let lim = this.completionLimit;
				return "<b>15% Completed SM</b> hardcap is powered by 2 and <b>30% Completed BT</b> is off <br> Completions: " + format(challengeCompletions("BT", 11)) + " / " + format(lim)
				},
				  scalePower() {
                let power = new Decimal(1);
                return power;
            },
				unlocked() { return (hasUpgrade("BT", 22)) },
				goal() { let comps = Decimal.mul(challengeCompletions("BT", 11))
				if (comps.gt(2)) return new Decimal(140000)
else return new Decimal(120000)
if (comps.gt(1)) return new Decimal(120000)
else return new Decimal(80000)
if (comps.gt(0)) return new Decimal(80000)
				else return new Decimal(60000)},
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription() { let boost = Decimal.mul(challengeCompletions("BT", 11))
				 return "1 Completion: <b>Unlock new BT upgrades</b><br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"
				},
},
	},
	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasChallenge("BT", 11))}
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
	 tooltip: "Gain your first Star",
		},
		12: {
			name: "This is great!",
			done() {
				return player.SM.points.gt(60)
			},
				 tooltip: "Gain 60 Stereo Madness",
		},
		13: {
			name: "We'll be right back!",
			done() {
				return (hasUpgrade("BT", 21))
			},
			tooltip: "Complete 30% of Back On Track"
		},
	},
	    tabFormat: ["blank", ["display-text", function() {
        return "Achievements: " + player.ac.achievements.length + "/" + (Object.keys(tmp.ac.achievements).length - 2)
    }
    ], "blank", "blank", "achievements", ],
})
            