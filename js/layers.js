addLayer("SM", {
    name: "Stereo Madness", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SM", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
		effboost: new Decimal(10),
		formulag: new Decimal(1),
        effectb: new Decimal(1200),
		upgpoint: new Decimal(22),
		best: new Decimal(0),
		total: new Decimal(0),
		auto: false,
    }},
    color: "lightblue",
	automate() {},
	autoUpgrade() { return (hasMilestone("BAB", 12) && player.SM.auto)},
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Stereo Madness",
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("SM", 21)) mult = mult.mul(1.5)
			if (hasMilestone("SM", 12)) mult = mult.mul(400)
				if (hasMilestone("SM", 14)) mult = mult.mul(2)
			if (hasUpgrade("BT", 21)) mult = mult.mul(upgradeEffect("BT", 21))
				if (hasUpgrade("SM", 31) && (hasUpgrade("PG", 21))) mult = mult.mul(upgradeEffect("SM", 31))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "SM") return "main-display"},
            "prestige-button",
			"blank",
			"player.SM.points",
            function() {if (player.tab == "SM") return "resource-display"},
            "blank",
            "upgrades",
            ]
        },
		        "Milestones": {
        content:[
            function() {if (player.tab == "SM") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "SM") return "resource-display"},
            "blank",
            "milestones"
            ],
			unlocked() {return (hasUpgrade("BT", 33))},
        },
		},
	upgrades: {
		11: {
			title: "Complete 5%",
			description: "Gain 1 Stars/s.",
			cost: new Decimal(1),
			unlocked() {return true},
		},
		12: {
						title() { if (hasUpgrade("PG", 21)) return "<h1>★</h1>Complete 15%"
			else return "Complete 15%"},
			description() { if (hasUpgrade("PG", 21)) return "Stars Gain multiplied by Stereo Madness amount, but the hardcap goes  100x later"
else return "Stars Gain multiplied by Stereo Madness amount"},
			cost: new Decimal(3),
			unlocked() {return true},
			effect() { if (hasMilestone("SM", 16)) return player[this.layer].points.div(player.SM.points.div(2)).plus(1).pow(1.4)
			if (hasUpgrade("PG", 21)) return player.SM.effboost.times(100)
				if (inChallenge("BT", 11)) return player.SM.effboost.times(2)
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
			title() { if (hasUpgrade("PG", 21)) return "<h1>★</h1>Complete 75%"
			else return "Complete 75%"},
			description() { if (hasUpgrade("PG", 21)) return "Stars gain is multiplied by log10(x^4), where x is 600(ULTRA)"
			if (hasUpgrade("BT", 31)) return "Stars gain is multiplied by log(x^2), where x is 400(MAXED)" 
			if (hasUpgrade("SM", 23)) return "Stars gain is multiplied by log(x^2), where x is 100(boosted)" 
			else return "Stars gain is multiplied by log(x^2), where x is 25"
			},
			cost: new Decimal(1800),
			unlocked() {return true},
			effect() { if (hasUpgrade("PG", 21)) return player.SM.formulag.times(25.59)
			if (hasUpgrade("BT", 31)) return player.SM.formulag.times(11.98)
			if (hasUpgrade("SM", 23)) return player.SM.formulag.times(9.21)
			else return player.SM.formulag.times(5.77)
			},
		},
								23: {
			title: "Complete level",
			description: "Multiplies x from formula of <b>75% Complete</b> by 4.00x",
			cost: new Decimal(2600),
			unlocked() {return true},
		},
										31: {
			title() {if (hasMilestone("SM", 12)) return "<h1>✵</h1>Claim 1 coin"
				if (hasUpgrade("PG", 21)) return "<h1>★</h1>Claim 1 coin"
			else return "Claim 1 coin"},
			description() { if (hasUpgrade("PG", 21)) return "Multiplies Stars and SM Gain by number of buyed upgrades(only SM, BT and PG)"
			else return "Multiplies Stars Gain by number of completed Achievements" 
			},
			cost: new Decimal(1000000),
			unlocked() {return (hasUpgrade("BT", 33))},
			effect() { if (hasMilestone("SM", 13)) return player.SM.upgpoint.times(2)
			if (hasUpgrade("PG", 21)) return player.SM.upgpoint
      else return player.ac.achievements.length
			},
		},
												32: {
			title: "Claim 2 coins",
			description: "Just 20.00x Stars Gain... No more!",
			cost: new Decimal(1e16),
			unlocked() {return (hasUpgrade("BT", 33))},
		},
														33: {
			title: "Claim 3 coins",
			description: "5.00x Stars Gain",
			cost() { if (player.DO.buyables[23].gte(2)) return new Decimal(1e24).div(12)
				else return new Decimal(1e24) },
			unlocked() {return (hasUpgrade("BT", 33))},
		},
	},
	milestones: {
		11: {
			        requirementDescription() { if (hasMilestone("BAB", 12)) return "1 Stereo Madness"
					else return "0.5e9 Stereo Madness" },
        effectDescription: "Gain 100% of Stereo Madness per/s",
        done() { if (hasMilestone("BAB", 12)) return player.points.gte(1)
		else return player.SM.points.gte(0.5e9) },
		},
			12: {
			        requirementDescription: "1.48e12 Stereo Madness",
        effectDescription: "SM gain is buffed by 400.00x",
        done() { return player.SM.points.gte(1.48e12) },
		},
				13: {
			        requirementDescription: "7.89e14 Stereo Madness",
        effectDescription: "Doubles <b>Claim 1 coin</b> effect",
        done() { return player.SM.points.gte(7.89e14) },
		},
						14: {
			        requirementDescription: "5.66e15 Stereo Madness",
        effectDescription: "Doubles Second SM Milestone effect",
        done() { return player.SM.points.gte(5.65e15) },
		},
								15: {
			        requirementDescription: "3.24e11 Stars",
        effectDescription: "Just another 4.00x stars gain...",
        done() { return player.points.gte(3.24e11) },
		},
										16: {
			        requirementDescription: "7.89e32 Stereo Madness",
        effectDescription: "12 SM upgrade will have a better formula",
        done() { return player.SM.points.gte(200) },
		},
	},
			passiveGeneration() {			
					if (hasMilestone("SM", 11)) return (hasMilestone("SM", 11)?1:0)
						else if (hasUpgrade("BT", 12)) return (hasUpgrade("BT", 12)?0.1:0)
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
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		total: new Decimal(0),
		auto: false,
    }},
    color: "darkcyan",
    requires: new Decimal(150), // Can be a function that takes requirement increases into account
    resource: "Back On Track",
	branches: ["SM"],
    baseResource: "Stereo Madness",	// Name of resource prestige is based on
    baseAmount() {return player.SM.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("PG", 12)) mult = mult.mul(2)
        return mult
    },
	tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "BT") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "BT") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Challenges": {
            content:[
                function() {if (player.tab == "BT") return "main-display"},
            function() {if (player.tab == "BT") return "resource-display"},
            "prestige-button",
            "blank",
                "challenges"
            ],
			unlocked() {return (hasUpgrade("BT", 22))},
        },
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
			title() { if (hasUpgrade("PG", 21)) return "<h1>★</h1>30% Completed"
else return "30% Completed"},
			description() { if (hasUpgrade("PG", 21)) return "Multiplies SM gain by (X*4)/Y, where x - best BT and Y - amount of BT right now"
				else return "Better formula: (X*2)/Y, where x - best BT & Y - BT right now"
				},
			cost: new Decimal(15),
			effect() { if (hasUpgrade("PG", 21)) return player.BT.best.times(4).div(player.BT.points.add(1))
			if (inChallenge("BT", 11)) return (upgradeEffect("BT", 21)).div(upgradeEffect("BT", 21))
				if (player.BT.points.lt(5)) return player.BT.best.times(2).div(player.BT.points.add(1)).times(0.4)
					else return player.BT.best.times(2).div(player.BT.points)
			},
		},
		22: {
			title: "40% Completed",
			description: "Unlock a challenge",
			cost: new Decimal(20),
		},
				23: {
			title: "60% Completed",
			description: "Does nothing...",
			cost: new Decimal(40),
			unlocked() { return (hasChallenge("BT", 11))},
		},
						31: {
			title: "75% Completed",
			description: "Scales up <b>Speedrun</b> goal but multiplies x from <b>Complete 75% SM</b> by 4.00x",
			cost: new Decimal(60),
			unlocked() { return (hasChallenge("BT", 11))},
		},
						32: {
			title: "85% Completed",
			description: "Doubles Stars gain",
			cost: new Decimal(100),
			unlocked() { return (hasChallenge("BT", 11))},
		},
								33: {
			title: "Complete Level",
			description: "Unlock a new row of SM upgrades",
			cost: new Decimal(850),
			unlocked() { return (hasChallenge("BT", 11))},
		},
	},
	challenges: {
		11: {
				name: "Speedrun",
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
if (challengeCompletions("BT", 11) == 2) return new Decimal(120000)
if (challengeCompletions("BT", 11) == 1) return new Decimal(80000)	
if (challengeCompletions("BT", 11) == 0) return new Decimal(60000)	
},
				currencyDisplayName: "points",
				currencyInternalName: "points",
				rewardDescription() { let boost = Decimal.mul(challengeCompletions("BT", 11))
if (challengeCompletions("BT", 11) == 3) return "1 Completion: ✓<br> 2 Completions: ✓ <br> 3 Completions: ✓"
if (challengeCompletions("BT", 11) == 2) return "1 Completion: ✓<br> 2 Completions: ✓ <br> 3 Completions: <b>Unlock new Layer</b>"
				if (challengeCompletions("BT", 11) == 1) return "1 Completion: ✓<br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"
if (challengeCompletions("BT", 11) == 0) return "1 Completion: <b>Unlock new BT upgrades</b><br> 2 Completions: <b>Gain 3.00x multiplier to the Stars Gain</b> <br> 3 Completions: <b>Unlock new Layer</b>"	},
},
	},
	layerShown(){return (player.SM.points.gte(99) || player[this.layer].unlocked)}
})

addLayer("PG", {
    name: "Polargeist", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "PG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		auto: false,
    }},
    color: "green",
    requires: new Decimal(120), // Can be a function that takes requirement increases into account
    resource: "Polargeist",
	branches: ["BT", "DO"],
    baseResource: "Back On Track",	// Name of resource prestige is based on
    baseAmount() {return player.BT.points},	// Get the current amount of baseResource
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
		title: "25% Completed",
		description: "Multiplies Stars Gain by ((x+5)^y/5), where x - Total BT and Y - Best PG",
		cost: new Decimal(1),
		unlocked() {return true},
		effect() { if (hasUpgrade("PG", 13)) return (upgradeEffect("PG", 11)).div(upgradeEffect("PG", 11))
			return player.BT.total.add(5).pow(player.PG.best.div(5))
		},
		effectDescription() {
			return "Currently: " + format(upgradeEffect("PG", 11)) + "x"
		},
	},
		12: {
		title: "50% Completed",
		description: "Multiplies BT gain by 2.00x",
		cost: new Decimal(2),
		unlocked() {return true},
	},
			13: {
		title: "75% Completed",
		description: "Multiplies Stars Gain by 11.00x",
		cost: new Decimal(3),
		unlocked() {return true},
	},
				21: {
		title: "Level Completed",
		description: "Boosts all formula based upgrades of every layers(without PG)",
		cost: new Decimal(12),
		unlocked() {return true},
	},
	},
	challenges: {
},
			doReset(resettingLayer) {
			let keep = [];
			layerDataReset("BT")
			},
	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasChallenge("BT", 11) || player[this.layer].unlocked)}
})

addLayer("DO", {
    name: "Dry Out", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DO", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		total: new Decimal(1),
		pseudoUpgs: [],
		auto: false,
    }},
    color: "darkgreen",
    requires: new Decimal(1e12), // Can be a function that takes requirement increases into account
    resource: "Dry Out",
	branches: ["SM"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.43, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasMilestone("BAB", 11)) mult = mult.mul(2)
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
			title: "Complete 1%",
			description: "Unlock a new buyable and double stars gain",
			cost: new Decimal(1),
		},
			12: {
			title: "Complete 30%",
			description: "Divides costs of every buyable by 1.5",
			cost: new Decimal(4),
		},
	},
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "DO") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "DO") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "DO") return "main-display"},
            function() {if (player.tab == "DO") return "resource-display"},
            "prestige-button",
            "blank",
                "buyables"
            ],
        },
		        "Milestones": {
            content:[
                function() {if (player.tab == "DO") return "main-display"},
            function() {if (player.tab == "DO") return "resource-display"},
            "prestige-button",
            "blank",
                "milestones"
            ],
        },
    },
buyables: {
	11: {
				 title: "Complete 15%",
				 purchaseLimit() {if (player.DO.buyables[21].gte(2)) return new Decimal(20)
					 else return new Decimal(15) },
        cost(x) { if (hasUpgrade("DO", 12)) return new Decimal(1).mul(x).div(buyableEffect("DO", 12)).div(1.5)
		else return new Decimal(1).mul(x).div(buyableEffect("DO", 12)) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Multiplies Stars gain <p></p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>" +
        "Currently effect: " +format(data.effect) + "x."
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },

		effect(x) { if (hasMilestone("DO", 11)) return eff = x.times(2).pow(buyableEffect("DO", 13)).times(1.46)
 else return eff = x.times(2).pow(buyableEffect("DO", 13));
},
			unlocked() {return (hasUpgrade("DO", 11))},
	},
		12: {
				 title: "Complete 25%",
				 purchaseLimit() { if (player.DO.buyables[21].gte(2)) return new Decimal(10)
				 else return new Decimal(7) },
        cost(x) { if (hasUpgrade("DO", 12)) return new Decimal(2).mul(x).div(1.5)
			else return new Decimal(2).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Exponents the <b>Complete 15%</b> cost <p></p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>" +
        "Currently effect: ^" +format(data.effect)
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
					unlocked() {return (hasUpgrade("DO", 11))},
		effect(x) {if (hasMilestone("DO", 11)) return eff = x.pow(1.25).pow(buyableEffect("DO", 13))
	else return eff = x.pow(1.25).pow(buyableEffect("DO", 13));
},
	},
			13: {
				 title: "Complete 55%",
				 purchaseLimit() { if (player.DO.buyables[21].gte(2)) return new Decimal(5)
					 else return new Decimal(3) },
        cost(x) { if (hasUpgrade("DO", 12)) return new Decimal(10).mul(x).div(1.5)
			else return new Decimal(10).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Exponents <b>all buyables</b> effect <p></p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>" +
        "Currently effect: ^" +format(data.effect)
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
					unlocked() {return (hasUpgrade("DO", 11))},
		effect(x) { if (hasMilestone("DO", 11)) return eff = x.pow(0.4).times(1.29)
	else return eff = x.pow(0.4);
},
	},
				21: {
				 title: "Complete 75%",
				 purchaseLimit: new Decimal(2),
        cost(x) { if (hasUpgrade("DO", 12)) return new Decimal(10).mul(x)
			else return new Decimal(20).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Scales up limits of <b>prev. buyables</b><p></p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>"
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
				unlocked() {return (hasMilestone("DO", 12))},
	},
					22: {
				 title: "Complete Level",
				 purchaseLimit: new Decimal(2),
        cost(x) {return new Decimal(200).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Multiplies Stars Gain by <b>25.00x</b><p></p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>"
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return (hasMilestone("DO", 13))},
	},
						23: {
				 title: "Complete Level 2.0",
				 purchaseLimit: new Decimal(2),
        cost(x) {return new Decimal(400).mul(x) },
        display() { let data = tmp[this.layer].buyables[this.id]
			return "Level: " + formatWhole(player[this.layer].buyables[this.id]) + "<p></p>" +
		"Divides <b>Claim 3 coins</b> cost by<p>12.00x</p>" +
		"Cost: " + format(data.cost) + " Dry Out<p></p>"
		},
        canAfford() { return player[this.layer].points.gte(this.cost()) },
        buy() {
			cost = tmp[this.layer].buyables[this.id].cost
            player[this.layer].points = player[this.layer].points.sub(this.cost())
            setBuyableAmount(this.layer, this.id, getBuyableAmount(this.layer, this.id).add(1))
        },
		unlocked() {return (hasMilestone("DO", 13))},
},
		doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("SM", keep)
				if (hasMilestone("BAB", 11) && resettingLayer=="DO") keep.push("buyables", "milestones");
		},
},
milestones: {
		11: {
			        requirementDescription: "50 Total Dry Out",
        effectDescription: "Boosts <b>Complete 15%</b><br> Currently: 1.46x, and 1.29x",
        done() { return player.DO.total.gte(50) },
		},
				12: {
			        requirementDescription: "120 Total Dry Out",
        effectDescription: "Unlocks a new buyable",
        done() { return player.DO.total.gte(120) },
		},
						13: {
			        requirementDescription: "200 Total Dry Out",
        effectDescription: "Unlocks last buyables",
        done() { return player.DO.total.gte(200) },
		},
},
	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasChallenge("BT", 11) || player[this.layer].unlocked)
		},
})

addLayer("BAB", {
    name: "Base After Base", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "BAB", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		total: new Decimal(0),
		energy: new Decimal(0),
		one: new Decimal(10),
		auto: false,
		pseudoUpgs: [],
    }},
    color: "yellow",
    requires: new Decimal(5.34e18), // Can be a function that takes requirement increases into account
    resource: "Base After Base",
	branches: ["BT", "DO"],
	effectDescription() {
		return "You have " + format(player.BAB.energy) + " Base Energy."
	},
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
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
			title: "Complete 10%",
			description: "Soon...",
			cost: new Decimal(3),
			unlocked() {
 return player[this.layer].pseudoUpgs.includes(Number(this.id))
		},
		            pseudoUnl() {
                return (hasMilestone("BAB", 13))
            },
            pseudoReq: "Req: 100 Base Energy",
            pseudoCan() {
                return player.BAB.energy.gte(100)
            },
	},
			12: {
			title: "Complete 20%",
			description: "Soon...",
			cost: new Decimal(5),
			unlocked() {
 return player[this.layer].pseudoUpgs.includes(Number(this.id))
		},
		            pseudoUnl() {
                return (hasMilestone("BAB", 13))
            },
            pseudoReq: "Req: 10000 Base Energy",
            pseudoCan() {
                return player.BAB.energy.gte(10000)
            },
	},
				13: {
			title: "Complete 40%",
			description: "Soon...",
			cost: new Decimal(7),
			unlocked() {
 return player[this.layer].pseudoUpgs.includes(Number(this.id))
		},
		            pseudoUnl() {
                return (hasMilestone("BAB", 13))
            },
            pseudoReq: "Req: 200000 Base Energy",
            pseudoCan() {
                return player.BAB.energy.gte(200000)
            },
	},
					14: {
			title: "Complete 40%",
			description: "Soon...",
			cost: new Decimal(10),
			unlocked() {
 return player[this.layer].pseudoUpgs.includes(Number(this.id))
		},
		            pseudoUnl() {
                return (hasMilestone("BAB", 13))
            },
            pseudoReq: "Req: 1000000 Base Energy",
            pseudoCan() {
                return player.BAB.energy.gte(1000000)
            },
	},
	},
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "BAB") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "BAB") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Milestones": {
            content:[
                function() {if (player.tab == "BAB") return "main-display"},
            function() {if (player.tab == "BAB") return "resource-display"},
            "prestige-button",
            "blank",
                "milestones"
            ],
        },
		        "Upgrades": {
            content:[
                function() {if (player.tab == "BAB") return "main-display"},
            function() {if (player.tab == "BAB") return "resource-display"},
            "prestige-button",
            "blank",
                "upgrades"
            ],
        },
    },
	milestones: {
		11: {
			        requirementDescription: "1 Base After Base",
        effectDescription: "Keep BT/DO upgrades on reset and 2.00x DO gain",
        done() { return player.BAB.points.gte(1) },
	},
			12: {
			        requirementDescription: "2 Base After Base",
        effectDescription: "Automate SM upgrades",
        done() { return player.BAB.points.gte(2) },
				toggles: [["SM", "auto"]]
	},
				13: {
			        requirementDescription: "3 Base After Base",
        effectDescription: "Unlock a row of upgrades",
        done() { return player.BAB.points.gte(3) },
	},
	},	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasChallenge("BT", 11) || player[this.layer].unlocked)
		},
		update(diff) {
			if (hasUpgrade("BAB", 12)) return player.BAB.energy = player.BAB.energy.plus(player.BAB.points.times(25))
				else return player.BAB.energy = player.BAB.energy.plus(player.BAB.points)
		},
					doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("SM", keep)
				if (hasMilestone("BAB", 11) && resettingLayer=="BT") keep.push("upgrades");
							if (hasMilestone("BAB", 11) && resettingLayer=="DO") keep.push("upgrades");
		},
})
addLayer("CLG", {
    name: "Cant Let Go", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "CLG", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		total: new Decimal(1),
		auto: false,
    }},
    color: "darkyellow",
    requires: new Decimal(2.74e23), // Can be a function that takes requirement increases into account
    resource: "Base After Base",
	branches: ["BT"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
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
        {key: "c", description: "c: Reset for CLG", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	},
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "CLG") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "CLG") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "CLG") return "main-display"},
            function() {if (player.tab == "CLG") return "resource-display"},
            "prestige-button",
            "blank",
                "buyables"
            ],
        },
		        "Milestones": {
            content:[
                function() {if (player.tab == "CLG") return "main-display"},
            function() {if (player.tab == "CLG") return "resource-display"},
            "prestige-button",
            "blank",
                "milestones"
            ],
        },
    },
	milestones: {
	},	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasMilestone("BAB", 11) || player[this.layer].unlocked)
		},
})
addLayer("JMP", {
    name: "Jumper", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "JMP", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
		best: new Decimal(0),
		megaeff: new Decimal(1),
		total: new Decimal(1),
		auto: false,
    }},
    color: "darkyellow",
    requires: new Decimal(3.89e40), // Can be a function that takes requirement increases into account
    resource: "Base After Base",
	branches: ["DO"],
    baseResource: "Stars",	// Name of resource prestige is based on
    baseAmount() {return player.points},	// Get the current amount of baseResource
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
        {key: "c", description: "c: Reset for CLG", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	},
		tabFormat: {
        "Main": {
        content:[
            function() {if (player.tab == "JMP") return "main-display"},
            "prestige-button",
            function() {if (player.tab == "JMP") return "resource-display"},
            "blank",
            "upgrades"
            ]
        },
        "Buyables": {
            content:[
                function() {if (player.tab == "JMP") return "main-display"},
            function() {if (player.tab == "JMP") return "resource-display"},
            "prestige-button",
            "blank",
                "buyables"
            ],
        },
		        "Milestones": {
            content:[
                function() {if (player.tab == "JMP") return "main-display"},
            function() {if (player.tab == "JMP") return "resource-display"},
            "prestige-button",
            "blank",
                "milestones"
            ],
        },
    },
	milestones: {
	},	layerShown(){ let boost = Decimal.mul(challengeCompletions("BT", 11))
		return (hasMilestone("BAB", 11) || player[this.layer].unlocked)
		},
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
				return player.SM.points.gt(99)
			},
				 tooltip: "Gain 100 Stereo Madness Reward: Unlock new level",
		},
		13: {
			name: "We'll be right back!",
			done() {
				return (hasUpgrade("BT", 21))
			},
			tooltip: "Complete 30% of Back On Track"
		},
		14: {
			name: "That was TOO LONG...",
			done() {return (challengeCompletions("BT", 11) == 2)
			},
			tooltip: "Complete <b>Speedrun</b> 2 times"
		},
				15: {
			name: "Useless? I don't think so... ",
			done() {return (hasUpgrade("BT", 23))
			},
			tooltip: "Buy <b>60% Completed</b> Reward: Stars gain is 20% faster",
			image: "achicons/15.jpg"
		},
						16: {
			name: "More Difficult? No...",
			done() {return (player.PG.unlocked)
			},
			tooltip: "Unlock Poltergeist",
			image: "achicons/16.jpg"
		},
			17: {
			name: "Here's a shiny quarter!",
			done() {return (hasUpgrade("SM", 31))
			},
			tooltip: "Buy <b>Claim 1 coin SM</b>",
			image: "achicons/17.jpg",
		},
					18: {
			name: "Craziness begins!!!",
			done() {return (hasUpgrade("PG", 21))
			},
			tooltip: "Complete <b>PG</b>",
		},
									19: {
			name: "MILESTONES time!!!",
			done() {return (hasMilestone("SM", 11))
			},
			tooltip: "Gain your first milestone in this game...",
		},
							21: {
			name: "Waiting for a new layer? It'll be soon",
			done() {return (hasMilestone("SM", 14))
			},
			tooltip: "Complete <b>last SM</b> milestone ",
			image: "achicons/21.jpg"
		},
					22: {
			name: "Another quarter!",
			done() {return (hasUpgrade("SM", 32))
			},
			tooltip: "Buy <b>Claim 2 coin SM</b>",
			image: "achicons/17.jpg",
		},
									23: {
			name: "Here you are! New Layer!",
			done() {return (player.DO.unlocked)
			},
			tooltip: "Unlock Dry Out",
		},
	},
	    tabFormat: 
		["blank", ["display-text", function() {
        return "Achievements: " + player.ac.achievements.length + "/" + (Object.keys(tmp.ac.achievements).length - 2)
    }
    ], "blank", "blank", "achievements", ],
})
            
addLayer("ST", {
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
        return ("Statistics")
    },
	    tabFormat: 
		["blank", ["display-text", function() {
			if (player.DO.unlocked) return "<h1>Layer Statistics</h1><br>Stereo Madness:  " + format(player.SM.total) + "<br> Back On Track: " + format(player.BT.total) + "<br> Polargeist: " + format(player.PG.best) + "Dry Out:  " + format(player.DO.best)
					else if (player.PG.unlocked) return "<h1>Layer Statistics</h1><br>Stereo Madness:  " + format(player.SM.total) + "<br> Back On Track: " + format(player.BT.total) + "<br> Polargeist: " + format(player.PG.total) + "<br> ??? ???:  " + " ????"
					else if (player.BT.unlocked) return "<h1>Layer Statistics</h1><br>Stereo Madness:" + " " + " " + " " + " " + " " + format(player.SM.total) + "<br> Back On Track:      " + format(player.BT.total) + "<br> ??????????:  " + " ????" + "<br> ??? ???:  " + " ????"
		else if (player.SM.unlocked) return "<h1>Layer Statistics</h1><br>Stereo Madness:  " + format(player.SM.points) + "<br> ???? ?? ?????:" + "           ????" + "<br> ??????????:   " + "    ????" + "<br> ??? ???:  " + " ????"
		}
    ]],
})
  			