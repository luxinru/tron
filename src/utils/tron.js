export default function checkTrans(addr,pk,cb) {
	const options = {
		method: 'GET',
		headers: {
			'Accept': 'application/json',
			'TRON-PRO-API-KEY': pk
		},
	};
	
	let times = new Date().getTime()
	times = (times - 3600)

	fetch('https://api.trongrid.io/v1/accounts/' + addr + '/transactions?only_confirmed=true&only_to=true', options)
		.then(response => (response.json()))
		.then(response => cb(response))
		.catch(err => (err));
}

