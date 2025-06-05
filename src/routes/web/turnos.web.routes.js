const { Router } = require('express');
const turnosWebController = require('../../controllers/web/turnos.web.controller.js');

const rutasTurnosWeb = Router();
rutasTurnosWeb.get('/', turnosWebController.listTurnos);
rutasTurnosWeb.get('/nuevo', turnosWebController.showNuevoTurnoForm);
rutasTurnosWeb.get('/:idTurno/editar', turnosWebController.showEditarTurnoForm);
rutasTurnosWeb.post('/:idTurno/editar', turnosWebController.editarTurno);
rutasTurnosWeb.post('/nuevo', turnosWebController.crearTurno);
rutasTurnosWeb.post('/:idTurno/cancelar', turnosWebController.cancelarTurno);

module.exports = rutasTurnosWeb;