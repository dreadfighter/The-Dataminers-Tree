let modInfo = {
	name: "The Challenge Tree",
	id: "particles",
	author: "Seder3214",
	pointsName: "Particles",
	modFiles: ["layers.js", "tree.js"],
	endgame: new Decimal("1e15000"),

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.75",
	name: "The Challenge Tree: Big Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.51</h3><br>
		- USing TMT Forum (No one uses this thing...)`
		
		

let winText = `Congratulations! You have competed all the challenges up to 128th!`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)
		let gain = new Decimal(1000)	
if (inChallenge("cp", 11)) gain = gain.times(1.6)
	if (hasUpgrade("cp", 11)) gain = gain.div(20)
			if (hasUpgrade("e", 11)) gain = gain.div(100)
							if (hasUpgrade("cm", 11)) gain = gain.div(300)
								if (hasChallenge("mg", 13)) gain = gain.times(420)
if (hasChallenge("mg", 13)) gain = gain.times(player.cm.points.pow(0.78).add(1))
if (hasChallenge("cp", 11)) gain = gain.times(20.15)
	if (inChallenge("mf", 11) && player.mf.matter.gte(5)) gain = gain.times(player.mf.matter.pow(0.24))
if (inChallenge("cp", 12)) gain = gain.div(player.cp.points.div(12))	
if (hasChallenge("cp", 12)) gain = gain.times(player.points.pow(0.24)).add(1)
	if (hasChallenge("cp", 12) && (challengeCompletions("e", 12) >= 3)) gain = gain.times(9.09)
if (inChallenge("cp", 13)) gain = gain.div(2)
	if (inChallenge("dr", 12)) gain = gain.div(1.27)
	if (player.dr.unlocked) gain = gain.times(player.dr.power.pow(0.15))
		if (hasChallenge("dr", 12)) gain = gain.times(2.15)
					if (hasChallenge("dr", 11) && player.cp.points.gte(1) || player.E.unlocked) gain = gain.times(player.cp.points.pow(0.05).add(1))
				if (inChallenge("dr", 13)) gain = gain.div(1.34)
			if (inChallenge("E", 12)) gain = gain.times(5)
					if (inChallenge("E", 12) && (challengeCompletions("E", 12) >= 2)) gain = gain.times(1.35)
				if (challengeCompletions("E", 12) >= 1) gain = gain.plus(11)
				if (challengeCompletions("E", 12) >= 2) gain = gain.times(13.45) 
if (challengeCompletions("E", 12) >= 4) gain = gain.times(player.dr.power.pow(0.35).times(6).add(50))	
if (inChallenge('cm', 11)) gain = gain.times(15)	
	if (inChallenge('cp', 21)) gain = gain.pow(0.65)
			if (hasChallenge('cp', 21)) gain = gain.pow(1.2)
					if (inChallenge('cp', 22)) gain = gain.pow(0.325)
				if (inChallenge('cp', 22)) gain = gain.times(0.4)
				if (inChallenge('cp', 23)) gain = gain.pow(0.0325)
				if (inChallenge('cp', 23)) gain = gain.times(0.04)
								if (hasChallenge('cp', 22)) gain = gain.times(2)
				if (hasChallenge('cp', 23)) gain = gain.pow(1.08)
			if (inChallenge('mg', 11)) gain = gain.times(100)
							if (inChallenge('cp', 31)) gain = gain.times(5000)
if (hasChallenge('cp', 31)) gain = gain.times(1e18)
	if (inChallenge('cp', 32)) gain = gain.times(player.cp.points.pow(0.45).div(50))
			if (inChallenge('cp', 33)) gain = gain.times(12)
	return gain
}
// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(modInfo.endgame)
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}