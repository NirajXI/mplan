const config = require('config.json');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getUsers,
    getSingleUser,
    getById,
    create,
    update,
    delete: _delete
};


async function getAll() {
    const  allsubs = await db.Subscriber.findAll();
    const subscribers = await getUsers(allsubs);
    return subscribers;
}

async function getById(id) {
    const  allsubs = await getSubscriber(id);
    const subscribers = await getSingleUser(allsubs);
    return subscribers;
}

async function getUsers(subscribers) {
    await Promise.all(subscribers.map(async item=> {
        let user = await getUser(item.user_id);
        item.dataValues.userinfo = user.dataValues;
    }))
    return subscribers;
}

async function getSingleUser(subscribers) {
    let user = await getUser(subscribers.user_id);
    subscribers.dataValues.userinfo = user.dataValues;
    return subscribers;
}

async function create(params) {
    const user = await getUser(params.user_id);
    await db.Subscriber.create(params);
}

async function update(id, params) {
    const subscriber = await getSubscriber(id);
    const user = await getUser(params.user_id);
    // copy params to user and save
    Object.assign(subscriber, params);
    await subscriber.save();

    return getById(id);
}

async function _delete(id,params) {
    const subscriber = await getSubscriber(id);
    Object.assign(subscriber, params);
    await subscriber.save();
}

// helper functions

async function getSubscriber(id) {
    const subscriber = await db.Subscriber.findByPk(id);
    if (!subscriber) throw 'Subscriber not found';
    return subscriber;
}

async function getUser(id) {
    const user = await db.User.findByPk(id);
    if (!user) throw 'User not found';
    return user;
}