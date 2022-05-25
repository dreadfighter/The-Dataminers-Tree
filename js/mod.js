let modInfo = {
	name: "The Chemistry Lab",
	id: "atom",
	author: "Seder3214",
	pointsName: "Atoms",
	modFiles: ["layers.js", "tree.js"],
	endgame: new Decimal("1e388"),

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.1b",
	name: "The Chemistry LabBeta",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0</h3><br>
		- Added things.<br>
		- Added stuff.`

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

	let gain = new Decimal(1)
	if (player.He.unlocked) gain = gain.plus(player.He.points.pow(1).plus(1))
			if (player.Be.unlocked) gain = gain.times(player.Be.points.plus(2))
if (hasUpgrade("H", 11)) gain = gain.times(1.2);
if (hasUpgrade("H", 12)) gain = gain.pow(1.1).times(1.5);
if (hasUpgrade("H", 21)) gain = gain.times(upgradeEffect("H", 21));
if (hasUpgrade("H", 33)) gain = gain.times(2);
if (hasUpgrade("H", 23)) gain = gain.pow(1.01);
if (hasUpgrade("H", 31)) gain = gain.pow(1.01);
if (hasUpgrade("He", 11)) gain = gain.plus(player.He.points.pow(0.4).plus(0.2));
if (hasUpgrade("He", 12)) gain = gain.pow(1.01);
if (hasUpgrade("He", 21)) gain = gain.pow(1.02);		
if (hasUpgrade("Li", 11)) gain = gain.pow(1.000001);
if (hasUpgrade("Li", 12)) gain = gain.pow(1.000001);
if (hasUpgrade("Li", 21)) gain = gain.pow(1.05);
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