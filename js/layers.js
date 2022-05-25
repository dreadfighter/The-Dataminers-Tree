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
description: "70% Hydrogen effective",
cost: new Decimal(2),
unlocked() { return true}, // The upgrade is only visible when this is true     
            },
			12: {
title: "Сovalent Bond",
description: "85% Hydrogen effective",
cost: new Decimal(4),
unlocked() { return (hasUpgrade("H", 11))}, // The upgrade is only visible when this is true     
            },
				21: {
title: "First Element",
description: "60% Hydrogen effective",
cost: new Decimal(8),
unlocked() { return (hasUpgrade("H", 12))}, // The upgrade is only visible when this is true
	},
	22: {
title: "New Element",
description: "Opens Lithium²",
cost: new Decimal(10),
unlocked() { return (hasUpgrade("H", 21))}, // The upgrade is only visible when this is true
	},
	23: {
title: "Hydrogen Bonds",
description: "50% Hydrogen effective",
cost: new Decimal(100),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true
	},
	31: {
title: "Holy Molecule",
description: "70% Hydrogen effective",
cost: new Decimal(150),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true
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
description: "50% Helium effective",
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
	layerShown(){return (hasUpgrade("H", 22) || player[this.layer].unlocked )}
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
    requires: new Decimal(200), // Can be a function that takes requirement increases into account
    resource: "Lithium",
branches: ["He"],	// Name of prestige currency
    baseResource: "Hydrogen", // Name of resource prestige is based on
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
description: "50% Helium effective",
cost: new Decimal(15),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true     
            },
			21: {
title: "Helium Boost II",
description: "Unlock Lithium³",
cost: new Decimal(20),
unlocked() { return (hasUpgrade("He", 12))}, // The upgrade is only visible when this is true     
            }
	},
	layerShown(){return (hasUpgrade("He", 22) || player[this.layer].unlocked )}
})