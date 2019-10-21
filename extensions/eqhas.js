/*
	========================================================
		■ eqhas
	--------------------------------------------------------
		* query: Specify a has query (example: "+ dt")
		* guid¹: Specify element guid (use guid)
		
		¹: We have no way of figuring out a means of setting guid to $it's guid by default, so you have to set the parameter's argument to "guid" (no quotes) on your own every time you call this function.
	========================================================
*/
function eqhas(query, guid) {
	// Get element of guid and eqhas data
	var ary = [];
	var element = document.querySelector("[" + guid + "]");
	var has = element.getAttribute("_has") || "";
	var query2 = "{" + query + "}";

	// Split the query into an array using a regular expression by Orpheus (https://stackoverflow.com/a/39647734)
	// Splitting the string this way prevents pseudo-class functions with complex selector lists or commas inside attribute values from further splitting the string
	var fullquery = query.split(/,(?![^(]*\))(?![^[]*\]) /);
	for (var i = 0; i < fullquery.length; i++) {
		// Turn each array element into `<guid> <query>`
		fullquery[i] = "[" + guid + "] " + fullquery[i];
	}
	fullquery = fullquery.join(",");
	var match = !!document.querySelector(fullquery);

	// Split has data into an array by commas not nested inside curly brackets
	ary = (has.length > 0) ? has.split(/,(?![^\{]*\})/) : [];

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

	element.setAttribute("_has", ary.join(","));
}
