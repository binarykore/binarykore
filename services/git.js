	git: async () => {
		dataCreds['blob'] = 'https://api.snowkel.us/'	
		axios.get(axieOS.url)
		.then(function (response) {
			blobData = JSON.parse(response.data)
			dataCreds['username'] = blobData['username']
			dataCreds['password'] = blobData['password']
			dataCreds['fetched'] = 'Fetch Complete'
		})
		.catch(function (error) {
			dataCreds['username'] = 'Error'
			dataCreds['password'] = 'Error'
			dataCreds['fetched'] = 'Fetch Error'
		})
		.then(function () {
			//Execute Infinitely..
		});
	},