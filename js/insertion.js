function addAfter(existingEl, newEl) {
	existingEl.parentNode.insertBefore(newEl, existingEl.nextSibling);
}

function addBefore(existingEl, newEl) {
	existingEl.parentNode.insertBefore(newEl, existingEl);
}
