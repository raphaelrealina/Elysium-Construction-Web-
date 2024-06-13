	
	! function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (!d.getElementById(id)) {
			js = d.createElement(s);
			js.id = id;
			js.src = 'https://weatherwidget.io/js/widget.min.js';
			fjs.parentNode.insertBefore(js, fjs);
		}
	}(document, 'script', 'weatherwidget-io-js');
	// 
	const earlsticker = document.querySelector('#trains')
	const eastboundcl = document.querySelector('.eastbound')
	const westboundcl = document.querySelector(".westbound")
	const weststicker = document.querySelector('#trains')
	const eastboundcl1 = document.querySelector('.eastbound1')
	const westboundcl1 = document.querySelector(".westbound1")
	const train1sch = document.querySelector(".train1")
	const train2sch = document.querySelector(".train2")
	const train3sch = document.querySelector(".train3")
	const train4sch = document.querySelector(".train4")
	const elysiumvideo = document.querySelector("#elysium-media")
	const financials = document.querySelector("#financials")
	const currencydv1 = document.querySelector(".currency1")
	const currencydv2 = document.querySelector(".currency2")
	const currencydv3 = document.querySelector(".currency3")
	const eurdv = document.querySelector(".eur")
	const gbpdv = document.querySelector(".gbp")
	const usddv = document.querySelector(".usd")
	const newstickerdv = document.querySelector('.ticker-move')

	unmuted.addEventListener('click', function() {
		myvideo.muted = false
	})
		
	function togglefun() {
		train1sch.classList.toggle('hidesnip')
		train2sch.classList.toggle('hidesnip')
		train3sch.classList.toggle('hidesnip')
		train4sch.classList.toggle('hidesnip')
	}	

	

	function convertglasscolor(mins) {
		if (mins >= 15) {
			return "green"
		} else if (mins > 5 && mins < 15) {
			return "amber"
		} else {
			return "red"
		}
	}

	function changepriceindicator(price) {

		if (price.includes("+")) {
			return "green"
		} else {
			return "red"
		}
	}

	function chooseflag(flag) {
		if (flag === "EUR/ALL") {
			return "al"
		} else if (flag === "EUR/GBP") {
			return "gb"
		} else if (flag === "EUR/JPY") {
			return "jp"
		} else if (flag === "EUR/USD") {
			return "us"
		} else if (flag === "GBP/ALL") {
			return "al"
		} else if (flag === "GBP/EUR") {
			return "eu"
		} else if (flag === "GBP/JPY") {
			return "jp"
		} else if (flag === "GBP/USD") {
			return "us"
		} else if (flag === "USD/ALL") {
			return "al"
		} else if (flag === "USD/EUR") {
			return "eu"
		} else if (flag === "USD/GBP") {
			return "gb"
		} else if (flag === "USD/JPY") {
			return "jp"
		}

	}

async function trainid(station, key, platformA, platformB) {
		const resolve = await fetch(key)
		const data = await resolve.json()
		const dataFormat = data.map(train => {
			return {
				destination: train.destinationName.replace("Underground Station", " "),
				platform: train.platformName.slice(-1),
				arrival: new Date(train.expectedArrival).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
				timetostation: Math.floor(train.timeToStation / 60),
				direction: (train.direction === "outbound") ? "E" : "W",
			}
		})
		const eastboundar = dataFormat.filter(train => train.platform === platformA && train.timetostation < 16)
		const westboundar = dataFormat.filter(train => train.platform === platformB && train.timetostation < 16)

		const eastboundhtml = eastboundar.map((train) =>

			`<div>
		<div class="timings">
			<div class="destinationname"><h2>${train.destination}</h2></div>
			<div class="platform"><img src="./img/platform.svg" width="25" height="25"><h2>${train.platform}</h2></div>
			<div class="traindirection"><img src="./img/directarr.svg" width="29" height="29"><h2>${train.direction}</h2></div>
		<div class="expectedarrival"><img src="./img/trainpng.png" width="29" height="29"><h3>${train.arrival}</h3></div>
		<div class="timetostation"><img src="./img/stopwatch.svg" width="27" height="27"><h3 class="${convertglasscolor(train.timetostation)}">${train.timetostation} min</h3></div>
		</div>
	</div>
	`
		)

		const westboundhtml = westboundar.map((train) =>
			`<div>
		<div class="timings">
			<div class="destinationname"><h2>${train.destination}</h2></div>
			<div class="platform"><img src="./img/platform.svg" width="25" height="25"><h2>${train.platform}</h2></div>
			<div class="traindirection"><img src="./img/directarr.svg" width="29" height="29"><h2>${train.direction}</h2></div>
		<div class="expectedarrival"><img src="./img/trainpng.png" width="29" height="29"><h3>${train.arrival}</h3></div>
		<div class="timetostation"><img src="./img/stopwatch.svg" width="27" height="27"><h3 class="${convertglasscolor(train.timetostation)}">${train.timetostation} min</h3></div>
		</div>
	</div>
	`
		)

		if (station === "earlsCourt") {
			eastboundcl.innerHTML = eastboundhtml.join("")
			westboundcl.innerHTML = westboundhtml.join("")
		}

		else if (station === "westKen") {
			eastboundcl1.innerHTML = eastboundhtml.join("")
			westboundcl1.innerHTML = westboundhtml.join("")
		}
}
	
async function currencies() {
		const response = await fetch("https://fcsapi.com/api-v3/forex/latest?symbol=GBP/EUR,GBP/USD,GBP/ALL,GBP/JPY,USD/GBP,USD/EUR,USD/ALL,USD/JPY,EUR/GBP,EUR/USD,EUR/ALL,EUR/JPY&access_key=CEWUMUqWTNsY6kYZ4B4Gzbsr")
		const data = await response.json()
		const dataunwrap = data.response
		const sortunwrap = dataunwrap.sort((a, b) => (a.s > b.s) ? 1 : -1)

		const formatunwrap = sortunwrap.map(curr => {
			return {
				currency: curr.s.slice(0, 3),
				pair: curr.s,
				price: curr.c,
				change: curr.cp,
			}
		})

		const currencyeur = formatunwrap.filter(curr => curr.currency === "EUR")
		const currencygpb = formatunwrap.filter(curr => curr.currency === "GBP")
		const currencyusd = formatunwrap.filter(curr => curr.currency === "USD")
		const currencyeurhtml = currencyeur.map((curr) =>

			`
	<div class="flag"><img src="./img/${chooseflag(curr.pair)}.svg" width="40" alt="European Flag"><div class="indicators"><div class="cp">${curr.price}</div><div class="ch ${changepriceindicator(curr.change)}">${curr.change}</div></div></div>`
		)

		const currencygbphtml = currencygpb.map((curr) =>

			`
	<div class="flag"><img src="./img/${chooseflag(curr.pair)}.svg" width="40" alt="European Flag"><div class="indicators"><div class="cp">${curr.price}</div><div class="ch ${changepriceindicator(curr.change)}">${curr.change}</div></div></div>`

		)

		const currencyusdhtml = currencyusd.map((curr) =>

			`
	<div class="flag"><img src="./img/${chooseflag(curr.pair)}.svg" width="40" alt="European Flag"><div class="indicators"><div class="cp">${curr.price}</div><div class="ch ${changepriceindicator(curr.change)}">${curr.change}</div></div></div>`
		)

		eurdv.innerHTML = currencyeurhtml.join("")
		gbpdv.innerHTML = currencygbphtml.join("")
		usddv.innerHTML = currencyusdhtml.join("")

	}


	async function newsfeed() {
		let newscontent = []
		const response = await fetch("https://newsdata.io/api/1/news?apikey=pub_12567c05d7998c4d889d45706c6fa853f8b97&&domain=bbc&country=gb")
		const data = await response.json()
		const dataunwrap = data.results
		const filteredData = dataunwrap.filter(newsitem => newsitem.language === 'english')
		const dataformat = filteredData.forEach(newsitem => {


			newscontent.push(`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${newsitem.source_id.toUpperCase()}\u00A0 |\u00A0 ${newsitem.title}`)
		}) 

		newstickerdv.innerHTML = `<div class="ticker-item">${newscontent.join(" ")}</div>`
		const addani = document.querySelector('.ticker-item').classList.add('ticker-item-ani')

	}

	function calendar() {
		document.addEventListener('DOMContentLoaded', function() {
			var calendarEl = document.getElementById('calendar');
		
			var calendar = new FullCalendar.Calendar(calendarEl, {
				plugins: [ 'dayGrid' ]
			});
		
			calendar.render();
		});
	}
	

	async function isVideoExists(videoName) {
		try {
			const response = await fetch(videoName, {
				method: 'HEAD'
			});
			return response.ok; // true if the video exists, false otherwise
		} catch (error) {
			console.error('Error checking video existence:', error);
			return false; // assume the video doesn't exist if there's an error
		}
	}

	async function createVideoList(maxVideos = 100) {
		let videos = [];
		let videoIndex = 1;

		while(videoIndex <= maxVideos) {
			let videoName = "videos/v" + videoIndex + ".mp4";
			if(await isVideoExists(videoName)) {
				videos.push(videoName);
				videoIndex++;
			} else {
				break;
			}
		}

		return videos;
	}

	createVideoList().then(videos => console.log(videos)).catch(error => console.error('Error fetching video list:', error));




	var player = document.getElementById('myvideo');
	var mp4Vid = document.getElementById('mp4source');

	player.addEventListener('ended', myHandler, false);

	function myHandler(e) {
		// No need to change the source if the same video should loop
		player.load();
		player.play();
}
	
	const earlsKey = "https://api.tfl.gov.uk/Line/Piccadilly/Arrivals/940GZZLUECT?direction=all&api_key=3b3cc88192f14ae08640d3b15e4b5ffb"
	const westKey = "https://api.tfl.gov.uk/Line/district/Arrivals/940GZZLUWKN?direction=all&api_key=3b3cc88192f14ae08640d3b15e4b5ffb"

	newsfeed()
	trainid("earlsCourt", earlsKey, "5", "6")
	trainid("WestKen", westKey, "1", "2")
	currencies()
		
	setInterval(async () => {
	newsfeed()
	}, 900000)
	
	setInterval(async () => {
	trainid("earlsCourt", earlsKey, "5", "6")
	trainid("westKen", westKey, "1", "2")
		}, 10000) 
		
	setInterval(async () => {	
	currencies()
		}, 28800000)
		
	setInterval(() => {
		togglefun()
	}, 15000)


function worldClock() {
	var today = new Date();
	
	var londonTime = today.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/London' })
	var tiranaTime = today.toLocaleTimeString('en-AL', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Europe/Tirane' })
	var newYorkTime = today.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'America/New_York'})
	
	document.getElementById('london').getElementsByClassName('city-time')[0].innerHTML = londonTime
	document.getElementById('tirana').getElementsByClassName('city-time')[0].innerHTML = tiranaTime
	document.getElementById('new-york').getElementsByClassName('city-time')[0].innerHTML = newYorkTime
	
	//update flag images
	document.getElementById('london').getElementsByClassName('city-flag')[0].src = "img/gb.svg";
	document.getElementById('tirana').getElementsByClassName('city-flag')[0].src = "img/al.svg";
	document.getElementById('new-york').getElementsByClassName('city-flag')[0].src = "img/us.svg";

	
	var t = setTimeout(worldClock, 1000)

} 

function calendar() {
	document.addEventListener('DOMContentLoaded', function() {
		var calendarEl = document.getElementById('cal');
	
		var calendar = new FullCalendar.Calendar(calendarEl, {
			plugins: [ 'dayGrid' ]
		});
	
		calendar.render();
	});
}


calendar() 
worldClock()


function refreshAt(hours, minutes, seconds) {
		var now = new Date();
		var then = new Date();
	
		if(now.getHours() > hours ||
		   (now.getHours() == hours && now.getMinutes() > minutes) ||
			now.getHours() == hours && now.getMinutes() == minutes && now.getSeconds() >= seconds) {
			then.setDate(now.getDate() + 1);
		}
		then.setHours(hours);
		then.setMinutes(minutes);
		then.setSeconds(seconds);
	
		var timeout = (then.getTime() - now.getTime());
		setTimeout(function() { window.location.reload(true); }, timeout);
	}
	
	// refreshAt(23,59,0)

function refreshEvery(hours, minutes, seconds) {
		var toMilliseconds = (hours * 60 * 60 + minutes * 60 + seconds) * 1000;

		setInterval(function() {
			window.location.reload(true);
		}, toMilliseconds);
	}
	
	refreshEvery(3,0,0)

