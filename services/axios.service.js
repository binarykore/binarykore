const axios = require('axios').default;
let data = [];
function axie(item, index){
	data[index] = item;
}
class axiePromise{
	async parseData(response) {
		response.forEach(axie);
		return JSON.parse(data);
	}
	async getForexUpdates(url, n) {
		try {
			axios.get(url).then(function(response){
				const nodes = await this.parseData(response);
				console.log(nodes);
			}).catch(function (error){
				console.log(error);
			}).finally(function(){
				//
			});
			return nodes.slice(0, 4);
		}catch(error){
			console.log('Error', error);
			process.exit();
		}
	}
}

const axioService = new axiePromise();

module.exports = axioService;