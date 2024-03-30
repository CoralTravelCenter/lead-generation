export function debounce(callee, timeoutMs) {
	return function perform(...args) {
		let previousCall = this.lastCall
		this.lastCall = Date.now()
		if (previousCall && this.lastCall - previousCall <= timeoutMs) {
			clearTimeout(this.lastCallTimer)
		}
		this.lastCallTimer = setTimeout(() => callee(...args), timeoutMs)
	}
}

export function jentelDeleteWhiteSpace(str) {
	return str.replace(/^s+|s+$/g, '');
}

export function deleteAllWhiteSpace(str) {
	return str.replaceAll(' ', '');
}