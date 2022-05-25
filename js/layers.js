addLayer("H", {
    name: "Hydrogen", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "H¹", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "#02C0F2",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Hydrogen", // Name of prestige currency
    baseResource: "Atoms", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
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
		rows: 3,
		cols: 3,
		11: {
title: "Unmetal Qualities",
description: "20% Hydrogen effective",
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
description: "Hydrogen boost Atoms income by ",
cost: new Decimal(8),
unlocked() { return true}, // The upgrade is only visible when this is true
effect() {
	return player.H.points.add(1).pow(0.2)
},
effectDisplay() {
	if (hasUpgrade("H", 33)) return format(upgradeEffect(this.layer, this.id)) + "+" + format(upgradeEffect("H", 33)) + "(33 upg)" + "x"
	else return format(upgradeEffect(this.layer, this.id)) + "x"
},
	},
	22: {
title: "New Element",
description: "Opens Lithium²",
cost: new Decimal(10),
	},
unlocked() { return true}, // The upgrade is only visible when this is true
	23: {
title: "Hydrogen Bonds",
description: "Exponents point boost by ^1.01",
cost: new Decimal(100),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	31: {
title: "Holy Molecule",
description: "Exponents point boost by ^1.01",
cost: new Decimal(150),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	32: {
title: "Generator of Helium",
description: "Generates 20% of Helium Resettable amount",
cost: new Decimal(1500),
unlocked() { return true}, // The upgrade is only visible when this is true
	},
	33: {
title: "Upgrader Mega Z-1",
description: "Doubles 21 upg. effect",
cost: new Decimal(2000),
unlocked() { return true}, // The upgrade is only visible when this is true
	 effect() {
                return player.H.points.add(1).pow(0.2)
            },
			effectDisplay() {
	return format(upgradeEffect(this.layer, this.id)) + "x"
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
    baseResource: "Hydrogen", // Name of resource prestige is based on
    baseAmount() {return player.H.points},
effectDescription(){return "adding "+format(player.He.points.plus(1).pow(1))+" to base point gain."},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
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
		rows: 2,
		cols: 2,
		11: {
title: "Second Element",
description: "100% Helium effective",
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Two Atoms",
description: "300% Helium effective",
cost: new Decimal(2),
unlocked() { return (hasUpgrade("He", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Helium Boost I",
description: "150% Helium effective",
cost: new Decimal(15),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Helium Boost II",
description: "Unlock Lithium³",
cost: new Decimal(20),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true     
            }
	},
			passiveGeneration() {
 return (hasUpgrade("H", 32)?0.2:0)
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
    requires: new Decimal(1000000), // Can be a function that takes requirement increases into account
    resource: "Beryllium",
branches: ["Li"],	// Name of prestige currency
    baseResource: "Lithium", // Name of resource prestige is based on
    baseAmount() {return player.Li.points},
effectDescription(){return "adding <b>x</b>"+format(player.Be.points.times(2))+" to base point gain."},	// Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
		if (hasUpgrade("Be", 22)) mult = mult.times(2)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 2, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "L: Reset for Lithium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
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
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            }
	},
	passiveGeneration() {
 return (hasUpgrade("Be", 22)?0.15:0)
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
    requires: new Decimal(20000), // Can be a function that takes requirement increases into account
    resource: "Lithium",
branches: ["He"],	// Name of prestige currency
    baseResource: "Hydrogen",	// Name of resource prestige is based on
    baseAmount() {return player.H.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 1, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "L: Reset for Lithium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 2,
		cols: 2,
		11: {
title: "Third Element",
description: "200% Lithium effective",
cost: new Decimal(100),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Three Atoms",
description: "100% Lithium effective",
cost: new Decimal(500),
unlocked() { return (hasUpgrade("Li", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Boost I",
description: "50% Lithium effective",
cost: new Decimal(6800),
unlocked() { return (hasUpgrade("Li", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Boost II",
description: "Unlock Berillium",
cost: new Decimal(40500),
unlocked() { return (hasUpgrade("Li", 12))}, // The upgrade is only visible when this is true     
            }
	},
	layerShown(){return (hasUpgrade("He", 22) || player[this.layer].unlocked )}
})
addLayer("B", {
    name: "Boron", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "B5", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 2, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#F4D5D2",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "Boron",
branches: ["Be"],	// Name of prestige currency
    baseResource: "Beryllium", // Name of resource prestige is based on
    baseAmount() {return player.Be.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "L: Reset for Lithium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 2,
		cols: 2,
		11: {
title: "Fifth Element",
description: "50% Lithium effective",
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Five Atoms",
description: "70% Lithium effective",
cost: new Decimal(3),
unlocked() { return (hasUpgrade("B", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Boost I",
description: "30% Lithium effective",
cost: new Decimal(5),
unlocked() { return (hasUpgrade("B", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Boost II",
description: "Unlock Carbon",
cost: new Decimal(7),
unlocked() { return (hasUpgrade("B", 21))}, // The upgrade is only visible when this is true     
            }
	},
	layerShown(){return (hasUpgrade("Be", 22) || player[this.layer].unlocked )}
})
addLayer("C", {
    name: "Carbon", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "C6", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 3, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: false,
		points: new Decimal(0),
    }},
    color: "#F4D5D2",
    requires: new Decimal(100), // Can be a function that takes requirement increases into account
    resource: "Carbon",
branches: ["Be"],	// Name of prestige currency
    baseResource: "Beryllium", // Name of resource prestige is based on
    baseAmount() {return player.Be.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.95, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        mult = new Decimal(1)
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 3, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "L", description: "L: Reset for Lithium", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
	upgrades : {
		rows: 2,
		cols: 2,
		11: {
title: "Third Element",
description: "200% Lithium effective",
cost: new Decimal(1),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Three Atoms",
description: "100% Lithium effective",
cost: new Decimal(5),
unlocked() { return (hasUpgrade("C", 11))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Boost I",
description: "50% Lithium effective",
cost: new Decimal(10),
unlocked() { return (hasUpgrade("C", 12))}, // The upgrade is only visible when this is true     
            },
			22: {
title: "Boost II",
description: "Unlock Berillium",
cost: new Decimal(15),
unlocked() { return (hasUpgrade("C", 12))}, // The upgrade is only visible when this is true     
            }
	},
	layerShown(){return (hasUpgrade("B", 22) || player[this.layer].unlocked )}
})