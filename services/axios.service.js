const axios = require('axios').default;
let data = new Array();
function parseData(response){
	data.push(response[0]);//USD
	data.push(response[1]);//THB
	data.push(response[2]);//IDR
	data.push(response[3]);//SGD
	data.push(response[4]);//EUR
	return(data);
}
class axiePromise {
	async getForexUpdates(url, n) {
		try {
			const nodes = await axios.get(url).then(function(response){
				var hash = parseData(Object.values(response.data));
				//console.log(response.data);
				//console.log([].map.call(hash,x => x));
				return [].map.call(hash,x => x);
			}).catch(function (error){
				console.log(error);
			}).finally(function(){
				//
			});
			//console.log(nodes);
			return nodes.slice(0, 5);
		}catch(error){
			console.log('Error', error);
			process.exit();
		}
	}
}
const axioService = new axiePromise();
module.exports = axioService;