let modInfo = {
	name: "Color Tree",
	id: "points",
	author: "Seder3214",
	pointsName: "Stars",
	modFiles: ["layers.js", "tree.js"],
	endgame: new Decimal("e1e15"),

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1.5",
	name: "Color Tree",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1.5</h3><br>
		<p>- Just a beta
		                        <p><b><br>+Seder3214+</br></b></p>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

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

	let gain = new Decimal(0)
if (hasUpgrade("R", 11)) gain = gain.plus(1)
if (hasUpgrade("R", 12)) gain = gain.times(2.35)
if (hasUpgrade("R", 13)) gain = gain.times(upgradeEffect("R", 13))
if (hasUpgrade("R", 14)) gain = gain.times(25)
if (player.op.points.gte(0)) gain = gain.times(player.o.points.plus(1).add(1.5).pow(player.op.points.add(0.2).plus(0.15)))
if (challengeCompletions("y", 11) == 3) gain = gain.times(2.45)
if (challengeCompletions("y", 11) == 2) gain = gain.times(1.89)
if (challengeCompletions("y", 11) == 1) gain = gain.times(1.3)
else if (player.o.points.gte(0)) gain = gain.times(player.o.points.plus(1).add(1.5))
if (hasUpgrade("o", 11)) gain = gain.times(upgradeEffect("o", 11))
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