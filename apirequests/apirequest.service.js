const config = require('config.json');
const jwt = require('jsonwebtoken');
const db = require('_helpers/db');
const axios = require('axios')
const { Op } = require("sequelize");

module.exports = {
    getDTHPlans,
    getDTHInfo,
    verifyApiKey,
    verifyRequestCounts,
    saveRequests,
    getUserByID,
    getSubscriberByID,
    getDTHRefresh,
    getAll
};

async function getAll() {
  const allreqs = await db.Apirequests.findAll();
  const userapirequests = await getUsers(allreqs);
  const apirequests = await getSubscribers(userapirequests);
  return apirequests;
}

async function getUsers(users) {
  await Promise.all(users.map(async item=> {
      let user = await getUser(item.user_id);
      item.dataValues.userinfo = user.dataValues;
  }))
  return users;
}

async function getSubscribers(subscribers) {
  await Promise.all(subscribers.map(async item=> {
      let subscriber = await getSubscriber(item.subscriber_id);
      item.dataValues.subscriberinfo = subscriber.dataValues;
  }))
  return subscribers;
}

async function verifyApiKey(params){
    const subscriber = await getSubscriber(params);
    return subscriber;
}

async function verifyRequestCounts(params){
    const subscriber = await getRequestCounts(params);
    return subscriber;
}

async function getSubscriber(params) {
    const subscriber = await db.Subscriber.findAll({
        where: {
          apikey: params.apikey
        }
      });
    if (!subscriber) throw 'Subscriber not found';
    return subscriber;
}

async function getRequestCounts(user_id) {

    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    const requests = await db.Apirequests.findAll({
        where: {
          user_id: user_id,
          createdAt: {
            [Op.lt]: lastDay,
            [Op.gt]: firstDay
        }
      },
    });

    const allowedrequests = await db.User.findAll({
      where: {
        id: user_id,
      },
    });

    if(allowedrequests[0].dataValues.allowed_requests >= requests.length){
      return true;
    }else{
      return false;
    };

}

async function saveRequests(parameterscreate) {
    await db.Apirequests.create({apitype: parameterscreate.apitype,subscriber_id: parameterscreate.subscriber_id,user_id:parameterscreate.user_id,apikey:parameterscreate.apikey,result: parameterscreate.result,status: parameterscreate.status,requestdate:parameterscreate.requestdate});
}

async function getDTHPlans(params) {
    return await axios.get("https://www.mplan.in/api/dthplans.php?apikey="+config.apikey+"&operator="+params.operator);
}

async function getDTHInfo(params) {
  return await axios.get("https://www.mplan.in/api/dthplans.php?apikey="+config.apikey+"&offer=roffer&tel="+params.vcnumber+"&operator="+params.operator);
}

async function getDTHRefresh(params) {
  return await axios.get("https://www.mplan.in/api/Dthheavy.php?apikey="+config.apikey+"&offer=roffer&tel="+params.vcnumber+"&operator="+params.operator);
}
  
async function getUserByID(id) {
  const user = await db.User.findByPk(id);
  if (!user) throw 'User not found';
  return user;
}

async function getSubscriberByID(id) {
  const subscriber = await db.Subscriber.findByPk(id);
  if (!subscriber) throw 'Subscriber not found';
  return subscriber;
}