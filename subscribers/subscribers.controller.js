const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const subscriberService = require('./subscriber.service');

// routes
router.post('/register', authorize(),registerSchema, register);
router.get('/', authorize(),getAll);
router.get('/:id', authorize(),getById);
router.put('/:id', authorize(),updateSchema, update);
router.delete('/:id',authorize(), _delete);

module.exports = router;

function registerSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        name: Joi.string().required(),
        apikey: Joi.string().required(),
        is_active: Joi.boolean().required(),
    });
    validateRequest(req, next, schema);
}

function register(req, res, next) {
    subscriberService.create(req.body)
        .then(() => res.json({ message: 'Subscriber created successful'}))
        .catch(next);
}

function getAll(req, res, next) {
    subscriberService.getAll()
        .then(subscribers => res.json(subscribers))
        .catch(next);
}

function getById(req, res, next) {
    subscriberService.getById(req.params.id)
        .then(subscriber => res.json(subscriber))
        .catch(next);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        user_id: Joi.number().integer().required(),
        name: Joi.string().required(),
        apikey: Joi.string().required(),
        is_active: Joi.boolean().required(),
    });
    validateRequest(req, next, schema);
}

function update(req, res, next) {
    subscriberService.update(req.params.id, req.body)
        .then(subscriber => res.json(subscriber))
        .catch(next);
}

function _delete(req, res, next) {
    subscriberService.delete(req.params.id,req.body)
        .then(() => res.json({ message: 'Subscriber status changed successfully' }))
        .catch(next);
}