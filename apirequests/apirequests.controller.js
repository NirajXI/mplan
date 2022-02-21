const express = require('express');
const router = express.Router();
const Joi = require('joi');
const validateRequest = require('_middleware/validate-request');
const authorize = require('_middleware/authorize')
const apiRequestService = require('./apirequest.service');
const config = require('config.json');
const e = require('express');
var result = "";

// routes
router.post('/dthplans',dthSchema, dthplans);
router.post('/dthinfo',dthInfoSchema, dthinfo);
router.post('/dthheavyrefresh',dthHeavyRefreshSchema, dthheavyrefresh);
router.get('/',authorize(),getAll);

module.exports = router;

function dthSchema(req, res, next) {
    const schema = Joi.object({
        operator: Joi.string().required(),
        apikey: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function dthInfoSchema(req, res, next) {
    const schema = Joi.object({
        operator: Joi.string().required(),
        apikey: Joi.string().required(),
        vcnumber:Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function dthHeavyRefreshSchema(req, res, next) {
    const schema = Joi.object({
        operator: Joi.string().required(),
        apikey: Joi.string().required(),
        vcnumber:Joi.string().required(),
    });
    validateRequest(req, next, schema);
}


function apiKeyResolve(value) {
    if (isEmpty(value)) {
        return false;
    } else {
        return value;
    }
}

function apiRequestResolve(value) {
    return value;
}

function saveRequest(value) {
    return value;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

function dthplans(req, res, next) {

    const verifyapikey = apiRequestService.verifyApiKey(req.body).then(apiKeyResolve);

    verifyapikey.then(function(value){
       if(value === false){
            res.json({ message: 'Invalid Api Key'})
        }else{
            var subscribervalues = "";
            subscribervalues = value[0].dataValues;
            const requestcounts = apiRequestService.verifyRequestCounts(value[0].dataValues.user_id).then(apiRequestResolve);
            requestcounts.then(function(requestvalue){
                if(requestvalue === false){
               
                    res.json({ message: 'Invalid Request Count'})
               
                }else{

                    const requested = apiRequestService.getDTHPlans(req.body)
                    .then(saveRequest)
                    .catch(next);

                    requested.then(function(reqvalue){
                        var currentdate = new Date(); 
                        var today = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate()+" "+currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();

                        var parameterscreate = {};

                        parameterscreate.subscriber_id = subscribervalues.id;
                        parameterscreate.user_id = subscribervalues.user_id;
                        parameterscreate.apikey = subscribervalues.apikey;
                        parameterscreate.apitype = "dthplans";
                        parameterscreate.result = reqvalue.data;
                        parameterscreate.status = reqvalue.data.status;
                        parameterscreate.requestdate = today;
                        
                        apiRequestService.saveRequests(parameterscreate);

                        res.json({ message: reqvalue.data})
                    });
                
                }
            });
        }
    });

}

function getAll(req, res, next) {
    apiRequestService.getAll()
        .then(apirequests => res.json(apirequests))
        .catch(next);
}

function dthinfo(req, res, next) {

    const verifyapikey = apiRequestService.verifyApiKey(req.body).then(apiKeyResolve);

    verifyapikey.then(function(value){
       if(value === false){
            res.json({ message: 'Invalid Api Key'})
        }else{
            var subscribervalues = "";
            subscribervalues = value[0].dataValues;
            const requestcounts = apiRequestService.verifyRequestCounts(value[0].dataValues.user_id).then(apiRequestResolve);
            requestcounts.then(function(requestvalue){
                if(requestvalue === false){
               
                    res.json({ message: 'Invalid Request Count'})
               
                }else{

                    const requested = apiRequestService.getDTHInfo(req.body)
                    .then(saveRequest)
                    .catch(next);

                    requested.then(function(reqvalue){
                        var currentdate = new Date(); 
                        var today = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate()+" "+currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();

                        var parameterscreate = {};

                        parameterscreate.subscriber_id = subscribervalues.id;
                        parameterscreate.user_id = subscribervalues.user_id;
                        parameterscreate.apikey = subscribervalues.apikey;
                        parameterscreate.apitype = "dthinfo";
                        parameterscreate.result = reqvalue.data;
                        parameterscreate.status = reqvalue.data.status;
                        parameterscreate.requestdate = today;
                        
                        apiRequestService.saveRequests(parameterscreate);

                        res.json({ message: reqvalue.data})
                    });
                
                }
            });
        }
    });

}

function dthheavyrefresh(req, res, next) {

    const verifyapikey = apiRequestService.verifyApiKey(req.body).then(apiKeyResolve);

    verifyapikey.then(function(value){
       if(value === false){
            res.json({ message: 'Invalid Api Key'})
        }else{
            var subscribervalues = "";
            subscribervalues = value[0].dataValues;
            const requestcounts = apiRequestService.verifyRequestCounts(value[0].dataValues.user_id).then(apiRequestResolve);
            requestcounts.then(function(requestvalue){
                if(requestvalue === false){
               
                    res.json({ message: 'Invalid Request Count'})
               
                }else{

                    const requested = apiRequestService.getDTHRefresh(req.body)
                    .then(saveRequest)
                    .catch(next);

                    requested.then(function(reqvalue){
                        var currentdate = new Date(); 
                        var today = currentdate.getFullYear() + "-" + (currentdate.getMonth()+1) + "-" + currentdate.getDate()+" "+currentdate.getHours() + ":"  
                                        + currentdate.getMinutes() + ":" 
                                        + currentdate.getSeconds();

                        var parameterscreate = {};

                        parameterscreate.subscriber_id = subscribervalues.id;
                        parameterscreate.user_id = subscribervalues.user_id;
                        parameterscreate.apikey = subscribervalues.apikey;
                        parameterscreate.apitype = "dthheavyrefresh";
                        parameterscreate.result = reqvalue.data;
                        parameterscreate.status = reqvalue.data.status;
                        parameterscreate.requestdate = today;
                        
                        apiRequestService.saveRequests(parameterscreate);

                        res.json({ message: reqvalue.data})
                    });
                
                }
            });
        }
    });

}