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
	num: "0.3.1",
	name: "The Challenge Tree: Emptiness Update",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.1</h3><br>
		- Added Challenge Points Layer<br>
		- Added some challenges<br>
			<h3>v0.1.5</h3><br>
		- Added Dimensional Rift Layer<br>
		- Added more challenges<br>
					<h3>v0.2</h3><br>
		- Added Emptiness Layer<br>
		- Added 2 challenges`
		
		

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
		let gain = new Decimal(1)	
if (inChallenge("cp", 11)) gain = gain.times(0.8)
if (hasChallenge("cp", 11)) gain = gain.times(20.15)
if (inChallenge("cp", 12)) gain = gain.div(player.cp.points.div(1.23))	
if (hasChallenge("cp", 12)) gain = gain.times(player.points.pow(0.24)).add(1)
if (inChallenge("cp", 13)) gain = gain.div(2)
	if (inChallenge("dr", 12)) gain = gain.div(1.27)
	if (player.dr.unlocked) gain = gain.times(player.dr.power.pow(0.15))
		if (hasChallenge("dr", 12)) gain = gain.times(2.15)
				if (inChallenge("dr", 13)) gain = gain.div(1.34)
			if (inChallenge("e", 12)) gain = gain.times(5)
				if (challengeCompletions("e", 12) >= 1) gain = gain.add(11) 
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