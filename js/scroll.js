(function(){
	document.addEventListener('DOMContentLoaded', () => {
		let main = document.getElementsByTagName('main')[0]
		let nav = document.getElementsByTagName('nav')[0]
		let navigationLinks = document.querySelectorAll('nav ul a')

		main.addEventListener('scroll', function() {
			if (nav.classList.contains("scrolling")) {
				return
			}

			let scrollPosition = main.scrollTop

			Array.from(navigationLinks).forEach((link) => {
				let currentLink = link
				let ref = currentLink.getAttribute('href')
				let anchor = document.getElementById(ref.slice(1))

				if (!anchor) {
					return
				}

				let extraOffset = 150
				let distanceBetweenSections = 60

				if (anchor.offsetTop - extraOffset <= scrollPosition && anchor.offsetTop + anchor.offsetHeight - extraOffset + distanceBetweenSections >= scrollPosition){
	                currentLink.classList.add("active")
	            } else {
	                currentLink.classList.remove("active")
	            }
			})
		})

		function scrollTo(element, area, duration){
			let easing = (t) => {
	        	return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t
	        }

	        let start = area.scrollTop
	        let startTime = Date.now()
	        let destination = element.offsetTop - 100

	        destination = destination > 0 ? destination : 0
	        
	        let scroll = () => {
	            nav.classList.add("scrolling");
	            var now = Date.now()
	            var time = Math.min(1,((now-startTime)/duration))
	            area.scrollTop = easing(time)*(destination-start) + start
	            if (area.scrollTop === destination){
	                nav.classList.remove("scrolling")
	                return
	            }
	            requestAnimationFrame(scroll)
	        }

	        scroll()
	    }

	    Array.from(navigationLinks).forEach(function(link){
	        link.addEventListener('click', function(e){
	        	e.preventDefault()
	        	if (link.classList.contains('active')) {
	        		return
	        	}
	        	let ref = link.getAttribute("href").slice(1)
	            scrollTo(document.getElementById(ref),main,2000)
	        })
	    })
	})
})()