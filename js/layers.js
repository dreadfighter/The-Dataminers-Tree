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
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.8, // Prestige currency exponent
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
		rows: 5,
		cols: 5,
            11: {
title: "1.1: Universal Memory Card",
description: "100% Data effective",
cost: new Decimal(2),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
			12: {
title: "1.2: Generator of Genericness",
description: "70% Data effective",
cost: new Decimal(45),
currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
unlocked() { return hasUpgrade("D", 11) }, // The upgrade is only visible when this is true         
			},
			13: {
				title: "1.3: Data Miner",
				description: "200% Data effective",
				cost: new Decimal(8),
				unlocked() { return hasUpgrade("D", 12) },
			},
			14: {
				title: "1.4: Initialization New System",
				description: "150% Data effective",
				cost: new Decimal(12),	
unlocked() { return hasUpgrade("D", 13) },				
			},
			21: {
				title: "2.1: Reloading System",
				description: "100% Data effective",
				cost: new Decimal(417),	
unlocked() { return player.t1.unlocked },				
			},
			22: {
				title: "2.2: Reinverting System",
				description: "100% Data effective",
				cost: new Decimal(710),	
unlocked() { return hasUpgrade("D", 21) 
},
			},	
        23: {
				title: "2.3: Starting System",
				description: "50% Data effective",
				cost: new Decimal(1000),	
unlocked() { return hasUpgrade("D", 22) },			
			},
			15: {
				title: "1.5: 1TB Card",
				description: "225% Data effective",
				cost: new Decimal(20),	
				unlocked() { return hasUpgrade("D", 14) },
			},	
         31: {
				title: "3.1: Miners Upgraded",
				description: "40% Data effective",
				cost: new Decimal(12000),	
unlocked() { return hasUpgrade("t1", 13) },			
			},
32: {
				title: "3.2: Neurone Boost I",
				description: "60% Data effective",
				cost: new Decimal(24600),	
unlocked() { return hasUpgrade("D", 31) },			
			},
41: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "4.1: Neurone Boost III",
				description: "175% Data effective",
				cost: new Decimal(560000000),	
unlocked() { return hasUpgrade("t11", 32) },			
			},
51: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "5.1: Neurone Boost IV",
				description: "55% Data effective",
				cost: new Decimal(1e11),	
unlocked() { return hasUpgrade("S", 14) },			
			},
52: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "5.1: Neurone Boost V",
				description: "50% Data effective",
				cost: new Decimal(4e11),	
unlocked() { return hasUpgrade("D", 51) },			
			},
53: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "5.1: Neurone Boost VI",
				description: "25% Data effective",
				cost: new Decimal(8e11),	
unlocked() { return hasUpgrade("D", 52) },			
			},
54: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "5.1: Neurone Boost VII",
				description: "40% Data effective",
				cost: new Decimal(1e12),	
unlocked() { return hasUpgrade("D", 53) },			
			},
55: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
				title: "5.1: Neurone Boost VIII",
				description: "25% Data effective",
				cost: new Decimal(2e12),	
unlocked() { return hasUpgrade("D", 54) },			
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
    baseResource: "miners", // Name of resource prestige is based on
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
		rows: 2,
		cols: 2,
	11: {
title: "1.1: Simulated Tree",
description: "100% Simulation Data effective",
cost: new Decimal(10),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
	12: {
title: "1.2: Upgraded Simulated Tree",
description: "80% Simulation Data effective",
cost: new Decimal(20),
unlocked() { return hasUpgrade("SD", 11) }, // The upgrade is only visible when this is true     
            },
			21: {
title: "2.1: Mega Simulated Tree",
description: "70% Simulation Data effective",
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
    requires: new Decimal(10000000), // Can be a function that takes requirement increases into account
    resource: "Deep Data", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "static",	
	branches: ["D"],// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
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
        {key: "k", description: "k: Reset for Deep Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],

	upgrades: {
		11: {
			title: "1.1: Planetary Miners",
			description: "100% Deep Data effective",
			cost: new Decimal(1),
		},
				12: {
			title: "1.2: Planetary Memory",
			description: "150% Deep Data effective",
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
    requires: new Decimal(10000), // Can be a function that takes requirement increases into account
    resource: "Tier 1 Data", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
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
		rows: 3,
		cols: 3,
		11: {
			title: "1.1: Start Again",
			description: "200% Tier 1 Data effective",
			cost: new Decimal(10),
		},	
12: {
	currencyDisplayName: "miners",
            currencyInternalName: "points",
            currencyLayer: "",
			title: "1.2: Initialization of Data",
			description: "75% Tier 1 Data effective",
			cost: new Decimal(300000),
			unlocked() { return hasUpgrade("t1", 11) },
		},
13: {
	title: "1.3: Keygen",
	description: "Opens a new row of Data Upgrades",
	cost: new Decimal(20),
	unlocked() { return hasUpgrade("t1", 12) },
},	
21: {
	title: "2.1: Technical Boost I",
	description: "30% Tier 1 Data effective",
	cost: new Decimal(1200),
	unlocked() { return hasUpgrade("t2", 31) },
},
22: {
	title: "2.2: Technical Boost II",
	description: "60% Tier 1 Data effective",
	cost: new Decimal(6450),
	unlocked() { return hasUpgrade("t1", 21) },
},
23: {
	title: "2.3: Technical Boost III",
	description: "90% Tier 1 Data effective",
	cost: new Decimal(8900),
	unlocked() { return hasUpgrade("t1", 22) },
},
	},
	layerShown(){return (hasUpgrade("SD", 21) || player[this.layer].unlocked )},
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
    baseResource: "miners", // Name of resource prestige is based on
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
		rows: 3,
		cols: 2,
		11: {
			title: "1.1: AntiData Miners",
			description: "85% Tier 1+ Data effective",
			cost: new Decimal(10),
			
		},
			12: {
				title: "1.2: AntiData Memory",
				description: "70% Tier 1+ Data effective",
				cost: new Decimal(20),
					unlocked() { return hasUpgrade("t11", 11) },
			},
			21: {
				title: "2.1: Singularity Boost I",
				description: "100% Tier 1+ Data effective",
				cost: new Decimal(50),
					unlocked() { return hasUpgrade("t11", 12) },
			},
			31: {
				title: "3.1: System Information",
				description: "Unlocks Tier 2 Data layer",
				cost: new Decimal(70),
					unlocked() { return hasUpgrade("t11", 21) },
			},
			32: {
				title: "4.1: Neurone Boost II",
				description: "300% Tier 1+ Data effective",
				cost: new Decimal(100),
					unlocked() { return hasUpgrade("t11", 31) },
			},
			},
	layerShown(){return (hasUpgrade("t1", 13) || player[this.layer].unlocked )},
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
    baseResource: "miners", // Name of resource prestige is based on
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
		rows: 3,
		cols: 3,
		11: {
			title: "1.1: Void Data Invention",
			description: "200% Tier 2 Data effective",
			cost: new Decimal(1),
		},
		13: {
				title: "1.2: Creating Void Memory",
				description: "125% Tier 2 Data effective",
				cost: new Decimal(3),
			},
			21: {
				title: "2.1: Mega Boost I",
				description: "50% Tier 2 Data effective",
				cost: new Decimal(12),
				unlocked() { return hasUpgrade("t2", 13) },
			},
			22: {
				title: "2.2: Mega Boost II",
				description: "75% Tier 2 Data effective",
				cost: new Decimal(18),
				unlocked() { return hasUpgrade("t2", 21) },
			},
			31: {
				title: "3.1: Mega System",
				description: "Unlock a new row of Tier 1 Data upgrades",
				cost: new Decimal(26),
				unlocked() { return hasUpgrade("t2", 22) },
			},
	},
	layerShown(){return (hasUpgrade("t11", 31) || player[this.layer].unlocked )},
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
    baseResource: "miners", // Name of resource prestige is based on
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
			title: "0.1: Finishing First Emulation",
			description: "40% Tier 2+ Data effective",
			cost: new Decimal(1),
		},
		12: {
			title: "0.2: Starting Second Emulation",
			description: "50% Tier 2+ Data effective",
			cost: new Decimal(1),
		},
	},
	
	milestones: {
    0: {
        requirementDescription: "10 T2 Data",
        effectDescription: "Unlocks Planetary Data",
        done() { return player.t22.points.gte(10) },
    },
	1: {
        requirementDescription: "20 T2 Data",
        effectDescription: "Upgrades wont reset",
        done() { return player.t22.points.gte(20) },
    },
	2: {
        requirementDescription: "40 T2 Data",
        effectDescription: "Doubles points income",
        done() { return player.t22.points.gte(40) },
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
    requires: new Decimal(2e14), // Can be a function that takes requirement increases into account
    resource: "T1 Mega Data", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
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
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("milestones");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("milestones");
			if (hasMilestone("T1M", 0) && resettingLayer=="T1M") keep.push("upgrades");
			return keep;
		},
		upgrades: {
			rows: 2,
			cols: 3,
	11: {
title: "Third Simulation",
description: "30% Tier 1 Mega Data effective",
cost: new Decimal(2),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
			12: {
title: "Recompiling Code of Miners",
description: "10% Tier 1 Mega Data effective",
cost: new Decimal(3),
unlocked() { return (hasUpgrade("T1M", 11)) }, // The upgrade is only visible when this is true     
            },
			13: {
title: "Saving Data of prev. simulation",
description: "10% Tier 1 Mega Data effective",
cost: new Decimal(4),
unlocked() { return (hasUpgrade("T1M", 12)) }, // The upgrade is only visible when this is true     
            },
			21: {
title: "Mega Boost I",
description: "20% Tier 1 Mega Data effective",
cost: new Decimal(4),
unlocked() { return (hasUpgrade("T1M", 13)) }, // The upgrade is only visible when this is true     
            },
			22: {
title: "Mega Boost II",
description: "15% Tier 1 Mega Data effective",
cost: new Decimal(4),
unlocked() { return (hasUpgrade("T1M", 21)) }, // The upgrade is only visible when this is true     
            },
			23: {
title: "Mega Boost III",
description: "20% Tier 1 Mega Data effective",
cost: new Decimal(4),
unlocked() { return (hasUpgrade("T1M", 22)) }, // The upgrade is only visible when this is true     
            },
		},
		milestones: {
    0: {
        requirementDescription: "2 Tier 1 Mega Data",
        effectDescription: "Unlocks Planetary Data",
        done() { return player.T1M.points.gte(2) },
    },
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
    requires: new Decimal(1e11), // Can be a function that takes requirement increases into account
    resource: "Planetary Data", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal",	
	branches: ["D"],// normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.6, // Prestige currency exponent
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
title: "Universe Boost I",
description: "60% Planetary Data effective",
cost: new Decimal(1),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
	12: {
title: "Universe Boost II",
description: "40% Planetary Data effective",
cost: new Decimal(3),
unlocked() { return hasUpgrade("P", 11) }, // The upgrade is only visible when this is true     
            },
			13: {
title: "Universe Boost III",
description: "50% Planetary Data effective",
cost: new Decimal(4),
unlocked() { return hasUpgrade("P", 12) }, // The upgrade is only visible when this is true     
            },
	},
	layerShown(){return (hasMilestone("t22", 0) || player[this.layer].unlocked )},
	milestones: {
    0: {
        requirementDescription: "10 Planetary Data",
        effectDescription: "Upgrades wont reset",
        done() { return player.P.points.gte(10) },
    },
},
	doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("DD", 0) && resettingLayer=="DD") keep.push("upgrades");
			if (hasMilestone("t11", 0) && resettingLayer=="t11") keep.push("upgrades");
			if (hasMilestone("t2", 0) && resettingLayer=="t2") keep.push("upgrades");
			if (hasMilestone("t22", 1) && resettingLayer=="t22") keep.push("upgrades");
			if (hasMilestone("SD", 0) && resettingLayer=="SD") keep.push("upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep);
		},
})
addLayer("S", {
    name: "S", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "S", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
   startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#6A5ACD",
    requires: new Decimal(2e11), // Can be a function that takes requirement increases into account
    resource: "Singularity", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal",	
    exponent: 0.6, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 4, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Simulated Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades: {
	11: {
title: "Singularity Boost I",
description: "100% All Data effective",
cost: new Decimal(1),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
	12: {
title: "Singularity Boost II",
description: "100% All Data effective",
cost: new Decimal(2),
unlocked() { return hasUpgrade("S", 11) }, // The upgrade is only visible when this is true     
            },
			13: {
title: "Singularity Boost III",
description: "100% All Data effective",
cost: new Decimal(3),
unlocked() { return hasUpgrade("S", 12) }, // The upgrade is only visible when this is true     
            },
			14: {
title: "Singularity Boost IV",
description: "Unlocks a new row of Data Upgrades",
cost: new Decimal(4),
unlocked() { return hasUpgrade("S", 13) }, // The upgrade is only visible when this is true     
            },
	15: {
title: "Singularity Boost V",
description: "1000% Planetary Data effective",
cost: new Decimal(10),
unlocked() { return hasUpgrade("S", 14) }, // The upgrade is only visible when this is true   
	},
	21: {
title: "Singularity Boost VI",
description: "Unlock Galaxy Data",
cost: new Decimal(200),
unlocked() { return hasUpgrade("S", 15) }, // The upgrade is only visible when this is true 
style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#77bf5f',
                    'border-color': '#00353F',
                    'height': '200px',
                    'width': '200px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id))  return {
                            'height': '200px',
                            'width':  '200px',
                        }
                    return {
                            'background-color': '#bf8f8f', 
                            'border-color': '#1a9cb2',
                            'height': '200px',
                            'width':  '200px',
		        }
	          }, 
	},
	},
	layerShown(){return true},
	doReset(resettingLayer) {
			let keep = [];
			layerDataReset("D");
			layerDataReset("SD");
			layerDataReset("DD");
			layerDataReset("t1");
			layerDataReset("t11");
			layerDataReset("t2");
			layerDataReset("t22");
			layerDataReset("P");
			layerDataReset("T1M");
			layerDataReset("T2M");
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep);
		},
})
addLayer("G", {
    name: "G", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "G", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 1, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
   startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
	branches: ["S"],
    color: "#483D8B",
    requires: new Decimal(1.5e15), // Can be a function that takes requirement increases into account
    resource: "Galaxy Data", // Name of prestige currency
    baseResource: "miners", // Name of resource prestige is based on
    baseAmount() { return player.points }, // Get the current amount of baseResource
    type: "normal",	
    exponent: 1, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        let exp = new Decimal(1)
		return exp;
    },
    row: 5, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "S", description: "S: Reset for Simulated Data", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	layerShown(){return (hasUpgrade("S", 21) || player[this.layer].unlocked )},
	upgrades: {
		rows: 2,
		cols: 2,
	11: {
title: "The Milky Way",
description: "100% Galaxy Data effective",
cost: new Decimal(1),
unlocked() { return player[this.layer].unlocked }, // The upgrade is only visible when this is true     
            },
			12: {
title: "Two Galaxies",
description: "100% Galaxy Data effective",
cost: new Decimal(3),
unlocked() { return (hasUpgrade("S", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "A couple of galaxies",
description: "200% Galaxy Data effective. Unlocks Black Hole Data",
cost: new Decimal(10),
unlocked() { return hasUpgrade("G", 12) }, // The upgrade is only visible when this is true 
style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#77bf5f',
                    'border-color': '#00353F',
                    'height': '200px',
                    'width': '200px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id))  return {
                            'height': '200px',
                            'width':  '200px',
                        }
                    return {
                            'background-color': '#bf8f8f', 
                            'border-color': '#1a9cb2',
                            'height': '200px',
                            'width':  '200px',
		        }
	          }, 
	},
	22: {
title: "Galaxy System",
description: "200% Galaxy Data effective. Unlocks Black Hole Data",
cost: new Decimal(10),
unlocked() { return hasUpgrade("G", 21) }, // The upgrade is only visible when this is true 
style() {
                if (hasUpgrade(this.layer, this.id)) return {
                    'background-color': '#77bf5f',
                    'border-color': '#00353F',
                    'height': '200px',
                    'width': '200px',
                    }
                    else if (!canAffordUpgrade(this.layer, this.id))  return {
                            'height': '200px',
                            'width':  '200px',
                        }
                    return {
                            'background-color': '#bf8f8f', 
                            'border-color': '#1a9cb2',
                            'height': '200px',
                            'width':  '200px',
		        }
	          }, 
	},
	},
	doReset(resettingLayer) {
			let keep = [];
			if (hasMilestone("T1M", 0) && resettingLayer=="T1M") keep.push("upgrades");
			if (layers[resettingLayer].row > this.row) layerDataReset("D", keep);
			return keep;
		},
})