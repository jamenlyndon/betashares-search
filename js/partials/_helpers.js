/* Helper functions
---------------------------------------------------------------------------------------------------- */
/* Add a class
-------------------------------------------------- */
function helper_addClass(className, element) {
	if (!element?.classList.contains(className)) {
		element?.classList.add(className);
	}
}


/* Remove a class
-------------------------------------------------- */
function helper_removeClass(className, element) {
	if (element?.classList.contains(className)) {
		element?.classList.remove(className);
	}
}


/* Make the first letter uppercase
-------------------------------------------------- */
function helper_ucFirst(str) {
	return str && String(str[0]).toUpperCase() + String(str).slice(1);
}



/* Export
---------------------------------------------------------------------------------------------------- */
export {
	helper_addClass,
	helper_removeClass,
	helper_ucFirst
};
