(function(){
	document.addEventListener('DOMContentLoaded', () => {
		let skillTitles = document.querySelectorAll('.skills-item h2')
		let skillDescriptions = document.querySelectorAll('.skills-item .description')

		if (!skillTitles) {
			return
		}

		Array.from(skillTitles).forEach((title) => {
			title.addEventListener('click', (e) => {
				let description = title.parentNode.getElementsByClassName('description')[0]
				if (!description) {
					return
				}
				if (description.classList.contains('active')) {
					description.classList.remove('active')
				} else {
					Array.from(skillDescriptions).forEach((d) => {
						d.classList.remove('active')
					})
					description.classList.add('active')
				}
			})
		})
	})
})()