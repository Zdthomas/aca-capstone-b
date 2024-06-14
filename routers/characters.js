
const express = require('express');
const charactersController = require('../controllers/characters');
const { checkJwt } = require('../middleware');
const router = express.Router();

router.post('/', checkJwt, charactersController.createCharacter);
router.delete('/', checkJwt, charactersController.deleteCharacter);
router.delete('/:id', charactersController.deleteCharacterById);

module.exports = router;
