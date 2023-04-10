const axios = require('axios').default;
let data = new Array();
function parseData(response){
	data.push(response.USD);
	data.push(response.THB);
	data.push(response.IDR);
	data.push(response.SGD);
	data.push(response.EUR);
	return(data);
}
class axiePromise {
	async getForexUpdates(url, n) {
		try {
			const nodes = await axios.get(url).then(function(response){
				var hash = parseData(response.data);
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