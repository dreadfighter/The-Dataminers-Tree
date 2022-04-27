["D", "blank", "SD"]
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
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
            11: {
title: "Universal Memory Card",
description: "Doubles points income",
cost: new Decimal(3),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
			12: {
title: "Generator of Genericness",
description: "Gain bonus based on Data amount.",
cost: new Decimal(5),
unlocked() { return hasUpgrade("D", 11) }, // The upgrade is only visible when this is true          
			effect() {
				return player[this.layer].points.add(0.8).pow(0.37)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			},
			13: {
				title: "Data Miner",
				description: "Mines for you. Gains income bonus based on points amount",
				cost: new Decimal(20),
				unlocked() { return hasUpgrade("D", 12) },
				effect() {
					return player.points.add(player.points.div(100).add(0.2)).pow(0.25)
				},
				effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
			},
			14: {
				title: "Initialization New System",
				description: "Triples your points income",
				cost: new Decimal(40),	
unlocked() { return hasUpgrade("D", 13) },				
			},
			16: {
				title: "Reloading System",
				description: "10x your points income",
				cost: new Decimal(10),	
unlocked() { return hasUpgrade("t1", 13) },				
			},
			17: {
				title: "Reinverting System",
				description: "10x your points income",
				cost: new Decimal(10),	
unlocked() { return hasUpgrade("D", 16) 
},
			},	
        18: {
				title: "Starting System",
				description: "10x your points income",
				cost: new Decimal(10),	
unlocked() { return hasUpgrade("D", 17) },			
			},
			15: {
				title: "1TB Card",
				description: "Gains income based on Simulation Data amount",
				cost: new Decimal(80),	
				unlocked() { return hasUpgrade("D", 14) },
				effect() {
return player.SD.points.add(player.SD.points.div(10).add(0.2)).pow(0.4)	
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x"},
			},			
			},
	layerShown(){return true},
	doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("t11", 0) && resettingLayer=="t11") keep.push("upgrades");
			if (hasMilestone("t2", 0) && resettingLayer=="t2") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("D", 0) && resettingLayer=="D") keep.push("upgrades");
			if (hasMilestone("SD", 0) && resettingLayer=="SD") keep.push("upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep);
		},
}),
addLayer("SD", {
    name: "SD", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
   startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#6B8E23",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Simulation Data", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
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
        {key: "S", description: "S: Reset for Simulated Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	11: {
title: "Simulated Tree",
description: "DQuintiples points income",
cost: new Decimal(10),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
	12: {
title: "Upgraded Simulated Tree",
description: "Doubles points income",
cost: new Decimal(20),
unlocked() { return hasUpgrade("SD", 11) }, // The upgrade is only visible when this is true     
            },
			13: {
title: "Mega Simulated Tree",
description: "Zero points income",
cost: new Decimal(40),
unlocked() { return hasUpgrade("SD", 12) }, // The upgrade is only visible when this is true     
            },
	},
	layerShown(){return (hasUpgrade("D", 12) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 waffles",
        effectDescription: "blah",
        done() { return player.SD.points.gte(10) },
    },
}
}),

addLayer("DD", {
    name: "DD", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "DD", // This appears on the layer's node. Default is the id with the first letter capitalized
   position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF1493",
    requires: new Decimal(1000000), // Can be a function that takes requirement increases into account
    resource: "Deep Data", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static",	
	branches: ["D"],// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.3, // Prestige currency exponent
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
        {key: "k", description: "k: Reset for Deep Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

	upgrades: {
		11: {
			title: "Planetary Miners",
			description: "3x points income",
			cost: new Decimal(1),
		},
				12: {
			title: "Planetary Memory",
			description: "4x points income",
			cost: new Decimal(1),
		},
	},
	milestones: {
    0: {
        requirementDescription: "10 waffles",
        effectDescription: "blah",
        done() { return player.DD.points.gte(10) },
    },
},

	layerShown(){return (hasUpgrade("D", 15) || player[this.layer].unlocked )},
	doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep)
				if (hasMilestone("V", 0) && resettingLayer=="V") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("milestones");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("milestones");
		if (hasMilestone("V", 0) && resettingLayer=="V") keep.push("milestones");
		},
}),





addLayer("t1", {
    name: "t1", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t1", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF4500",
    requires: new Decimal(1), // Can be a function that takes requirement increases into account
    resource: "Tier 1 Data", // Name of prestige currency
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
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Start Again",
			description: "Gains +0.1 points per/sec",
			cost: new Decimal(0.5),
		},
		12: {
title: "Generator of Genericness",
description: "Gain bonus based on Tier 1 Data amount.",
cost: new Decimal(5),
unlocked() { return hasUpgrade("t1", 11) }, // The upgrade is only visible when this is true          
			effect() {
				return player[this.layer].points.add(0.2).pow(0.1)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			},
			13: {
				title: "First Big Upgrade",
				description: "Multiplies points income by 10",
				cost: new Decimal(20),
			},
			
	},
	layerShown(){return (hasUpgrade("SD", 13) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 Tier 1 Data",
        effectDescription: "Upgrades wont reset",
        done() { return player.t1.points.gte(10) },
    },
},
}),

addLayer("t11", {
    name: "t1+", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t1+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#FF4500",
	branches: ["t1"],
    requires: new Decimal(100000), // Can be a function that takes requirement increases into account
    resource: "Tier 1+ Data", // Name of prestige currency
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
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "AntiData Miners",
			description: "Doubles point income",
			cost: new Decimal(10),
			
		},
			13: {
				title: "AntiData Memory",
				description: "Gains multiplier bonus based on amount of Tier 1+ Data",
				cost: new Decimal(20),
				effect() {
				return player[this.layer].points.add(0.5).pow(0.1)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			},
			},
	layerShown(){return (hasUpgrade("SD", 13) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 Tier 1+ Data",
        effectDescription: "Upgrades wont reset",
        done() { return player.t11.points.gte(10) },
    },
	},
}),

addLayer("t2", {
    name: "t2", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t2", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#808080",
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "Tier 2 Data", // Name of prestige currency
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
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Void Data Invention",
			description: "Doubles points income",
			cost: new Decimal(1),
		},
		13: {
				title: "Creating Void Memory",
				description: "Gains multiplier bonus based on amount of Tier 2 Data",
				cost: new Decimal(3),
				effect() {
				return player[this.layer].points.add(0.6).pow(0.12)
			},
			effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
			},
	},
	layerShown(){return (hasUpgrade("t11", 13) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 waffles",
        effectDescription: "blah",
        done() { return player.t2.points.gte(10) },
    },
},
}),

addLayer("t22", {
    name: "t2+", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "t2+", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 4, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#808080",
	branches: ["t2"],
    requires: new Decimal(10e9), // Can be a function that takes requirement increases into account
    resource: "Tier 2+ Data", // Name of prestige currency
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
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
		11: {
			title: "Finishing First Emulation",
			description: "Unlocks Void Data. 10x points income",
			cost: new Decimal(1),
		},
		12: {
			title: "Starting Second Emulation",
			description: "Enter Void Data. 10x points income",
			cost: new Decimal(1),
		},
	},
	
	milestones: {
    0: {
        requirementDescription: "10 T2 Data",
        effectDescription: "Unlocks Void Data",
        done() { return player.t22.points.gte(10) },
    },
	1: {
        requirementDescription: "20 T2 Data",
        effectDescription: "Upgrades wont reset",
        done() { return player.t22.points.gte(20) },
    },
	2: {
        requirementDescription: "200 T2 Data",
        effectDescription: "Doubles points income",
        done() { return player.t22.points.gte(200) },
    },
},
	layerShown(){return (hasUpgrade("t2", 13) || player[this.layer].unlocked )},
	doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("V", keep)
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("milestones");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("milestones");
		},
}),
addLayer("SeD", {
    name: "SeD", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "SeD", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#696969",
	branches: ["SD"],
    requires: new Decimal(1e9), // Can be a function that takes requirement increases into account
    resource: "Secret Data", // Name of prestige currency
    baseResource: "Simulation Data", // Name of resource prestige is based on
    baseAmount() {return player.SD.points}, // Get the current amount of baseResource
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
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return (hasMilestone("DD", 0) || player[this.layer].unlocked )},
	doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("SD", 0)) keep.push("upgrades")
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep)
			if (hasMilestone("V", 0) && resettingLayer=="V") keep.push("upgrades");
				layerDataReset("SD")
		},
})
addLayer("T1M", {
    name: "T1M", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T1M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: -5, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#0000CD",
	branches: ["t11", "t1"],
    requires: new Decimal(1e29), // Can be a function that takes requirement increases into account
    resource: "T1 Mega Data", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return (hasUpgrade("t22", 12) || player[this.layer].unlocked )},
	doReset(resettingLayer) {
			let keep = [];
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep)
				if (hasMilestone("V", 0) && resettingLayer=="V") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("milestones");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("milestones");
		if (hasMilestone("V", 0) && resettingLayer=="V") keep.push("milestones");
		},
}),
addLayer("T2M", {
    name: "T2M", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "T2M", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 50, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#000080",
	branches: ["t22", "t2"],
    requires: new Decimal(1e35), // Can be a function that takes requirement increases into account
    resource: "T2 Mega Data", // Name of prestige currency
    baseResource: "Points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.7, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "D", description: "D: Reset for Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return (player.T1M.unlocked || player[this.layer].unlocked )},
})


addLayer("P", {
    name: "P", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "P", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
   startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#696969",
    requires: new Decimal(50), // Can be a function that takes requirement increases into account
    resource: "Planetary Data", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
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
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Simulated Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	11: {
title: "Simulated Tree",
description: "DQuintiples points income",
cost: new Decimal(10),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
	12: {
title: "Upgraded Simulated Tree",
description: "Doubles points income",
cost: new Decimal(20),
unlocked() { return hasUpgrade("SD", 11) }, // The upgrade is only visible when this is true     
            },
			13: {
title: "Mega Simulated Tree",
description: "Zero points income",
cost: new Decimal(40),
unlocked() { return hasUpgrade("SD", 12) }, // The upgrade is only visible when this is true     
            },
	},
	layerShown(){return (hasUpgrade("t22", 12) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 waffles",
        effectDescription: "blah",
        done() { return player.P.points.gte(10) },
    },
},
upgrades: {
	11: {
		
	}
}
})