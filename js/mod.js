let modInfo = {
	name: "The Dataminers Tree",
	id: "dataminer",
	author: "Seder3214",
	pointsName: "miners",
	modFiles: ["layers.js", "tree.js"],
	endgame: new Decimal("1e388"),

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (0), // Used for hard resets and new players
	offlineLimit: 1,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.3b",
	name: "The Dataminers TreeBeta",
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
	// Data Upgrades (total: 15)
		if (hasUpgrade("D", 11)) gain = gain.times(2);
		if (hasUpgrade("D", 12)) gain = gain.times(1.7);
		if (hasUpgrade("D", 13)) gain = gain.times(3);
		if (hasUpgrade("D", 14)) gain = gain.times(2.5);
		if (hasUpgrade("D", 15)) gain = gain.times(3.25);

		 if (hasUpgrade("D", 21)) gain = gain.times(2);
		 if (hasUpgrade("D", 22)) gain = gain.times(2);
		 if (hasUpgrade("D", 23)) gain = gain.times(1.5);
		 if (hasUpgrade("D", 31)) gain = gain.times(1.4);
		 if (hasUpgrade("D", 32)) gain = gain.times(1.6);
		 if (hasUpgrade("D", 41)) gain = gain.times(2.75);
		 if (hasUpgrade("D", 51)) gain = gain.times(1.5);
		 if (hasUpgrade("D", 52)) gain = gain.times(1.25);
		 if (hasUpgrade("D", 53)) gain = gain.times(1.4);
		 if (hasUpgrade("D", 54)) gain = gain.times(1.25);
    // Singularity Data upgrades (total: 3)
		  if (hasUpgrade("SD", 12)) gain = gain.times(1.8);
		  if (hasUpgrade("SD", 21)) gain = gain.times(1.7);
	      if (hasUpgrade("SD", 11)) gain = gain.times(2);
    // Deep Data upgrades (total: 2)
		   if (hasUpgrade("DD", 11)) gain = gain.times(3);
           if (hasUpgrade("DD", 12)) gain = gain.times(4);
    // Tier 1 Data upgrades (total: 5)
		    if (hasUpgrade("t1", 11)) gain = gain.times(3);
			if (hasUpgrade("t1", 12)) gain = gain.times(1.75);
			if (hasUpgrade("t1", 21)) gain = gain.times(1.3);
			if (hasUpgrade("t1", 22)) gain = gain.times(1.6);
			if (hasUpgrade("t1", 23)) gain = gain.times(1.9);
    // Tier 1+ Data upgrades (total: 4)
			 if (hasUpgrade("t11", 11)) gain = gain.times(1.85);
			 if (hasUpgrade("t11", 12)) gain = gain.times(1.7);
			 if (hasUpgrade("t11", 21)) gain = gain.times(2);
			 if (hasUpgrade("t11", 32)) gain = gain.times(4);
    // Tier 2 Data upgrades (total: 4)
			  if (hasUpgrade("t2", 13)) gain = gain.times(2.25)	
              if (hasUpgrade("t2", 11)) gain = gain.times(3);
              if (hasUpgrade("t2", 21)) gain = gain.times(1.5);
               if (hasUpgrade("t2", 22)) gain = gain.times(1.7);			  
    // Tier 2+ Data upgrades (total: 3)		  
               if (hasUpgrade("t22", 11)) gain = gain.times(1.4);
               if (hasMilestone("t22", 2)) gain = gain.times(2);
               if (hasUpgrade("t22", 12)) gain = gain.times(1.5);
	// Planetary Data upgrades (total: 3)
	           if (hasUpgrade("P", 11)) gain = gain.times(1.6);
			   if (hasUpgrade("P", 12)) gain = gain.times(1.4);
			   if (hasUpgrade("P", 13)) gain = gain.times(1.5);
	// Singularity upgrades (total: 4)
	           if (hasUpgrade("S", 11)) gain = gain.times(2);
			   if (hasUpgrade("S", 12)) gain = gain.times(2);
			   if (hasUpgrade("S", 13)) gain = gain.times(2);
			   if (hasUpgrade("S", 15)) gain = gain.times(11);
    // Tier 1 Mega upgrades (total: 1)
	           if (hasUpgrade("T1M", 11)) gain = gain.times(1.3);
			   if (hasUpgrade("T1M", 12)) gain = gain.times(1.1);
			   if (hasUpgrade("T1M", 13)) gain = gain.times(1.1);
			   if (hasUpgrade("T1M", 21)) gain = gain.times(1.2);
			   if (hasUpgrade("T1M", 22)) gain = gain.times(1.15);
			   if (hasUpgrade("T1M", 23)) gain = gain.times(1.15);
	// Galaxy Data upgrades (total: 1)
	           if (hasUpgrade("G", 11)) gain = gain.times(2);	
               if (hasUpgrade("G", 12)) gain = gain.times(2);			   
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