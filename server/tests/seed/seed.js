const UrlModel = require('../../../app/url/schema');

const urls = [{
    // _id: 123,
    url: 'https://www.amazon.com.mx',
    protocol: 'https:',
    domain: '"www.amazon.com.mx',
    path: '/',
    hash: '123',
    isCustom: false,
    removeToken: '123remove',
    active: true
}, {
    // _id: 456,
    url: 'https://www.google.com',
    protocol: 'https:',
    domain: '"www.google.com',
    path: '/',
    hash: '456',
    isCustom: false,
    removeToken: '456remove',
    active: true
},
{
    // _id: 789,
    url: 'https://www.facebook.com',
    protocol: 'https:',
    domain: '"www.facebook.com',
    path: '/',
    hash: '789',
    isCustom: false,
    removeToken: '789remove',
    active: false
}];

const populateUrl = (done) => {
    UrlModel.remove({}).then(() => {
        return UrlModel.insertMany(urls);
    }).then(() => done());
};

module.exports = {
    urls,
    populateUrl
};
