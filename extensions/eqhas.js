/*
	========================================================
		■ eqhas
	--------------------------------------------------------
		* query: 		Specify a has query. (example: "+ dt")
		* guid¹: 		Specify element guid. (use guid)
		* prefix²: 	Query block prefix
		* suffix²: 	Query block suffix
		
		¹: We have no way of figuring out a means of setting guid to $it's guid by default, so you have to set the parameter's argument to "guid" (no quotes) on your own every time you call this function.
		²: Although these arguments are blank by default, it's recommended to set "{" as the prefix and "}" as the suffix. While this may make your css slightly difficult to read, it is used to help prevent the wildcard attribute selector [attr*="value"] from making an unintentional match. 
	========================================================
*/
function eqhas(query, guid, prefix = '', suffix = '') {
	// A function to generate junk text to use to split strings and join arrays by
	function generateJunk() {
		var party = "🎉🎈🎊🥳🎆🎇";
		var garbage = Math.random().toString(36).replace(/[^a-zA-Z0-9]+/g, '').substr(0, 5);
		party = party.substr(parseInt(Math.floor((Math.random() * (party.length / 2))) * 2, 10), 2);
		return party + "eqhas_" + garbage + party;
	}
	
	// Get element of guid and eqhas data
	var ary				= [];
	var element		=	document.querySelector("[" + guid + "]");
	var has				=	element.getAttribute("_has") || "";
	var query2		=	"" + prefix + query + suffix;
	
	// Get junk, maybe set junk
	var junk 			=	element.getAttribute("_has-junk") || "";
	if (!junk.length > 0) {
		junk = generateJunk();
		element.setAttribute("_has-junk", junk);
	}
	
	// Split the query into an array using a regular expression by Orpheus (https://stackoverflow.com/a/39647734)
	// Splitting the string this way prevents pseudo-class functions with complex selector lists or commas inside attribute values from further splitting the string 
	var fullquery	= query.split(/,(?![^(]*\))(?![^[]*\]) /);
	for (var i = 0; i < fullquery.length; i++) {
		// Turn each array element into `<guid> <query>`
		fullquery[i] = "[" + guid + "] " + fullquery[i];
	}
	fullquery			= fullquery.join(",");
	console.log(fullquery);
	var match			=	!!document.querySelector(fullquery);
	
	// Split has data into an array
	ary = (has.length > 0) ? has.split(junk) : [];
	
	// Is there a match?
	if (match) {
		// If there is, and if the query isn't already in a list of has items, include it in the list
		if (ary.indexOf(query2) === -1) {
			ary.push(query2);
		}
	} else {
		// If there isn't a match...
		// Is the query included in a list of has items?
		if (ary.indexOf(query2) > -1) {
			// Remove it from the list
			ary.splice(ary.indexOf(query2), 1);
		}
	}
	
	element.setAttribute("_has", ary.join(junk));
}
