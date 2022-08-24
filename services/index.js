const freenomService = require('./freenom.service');
const freenom = await freenomService.login();
freenom();