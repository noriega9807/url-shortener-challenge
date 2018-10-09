const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');

const UrlModel = require('../../app/url/schema');

const {
    urls,
    populateUrl
} = require('./seed/seed');

beforeEach(populateUrl);

describe('POST /', () => {
    it('should create a new url shortener', (done) => {
        var url = 'https://github.com/noriega9807/url-shortener-challenge';

        request(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
                url
            })
            .expect(200)
            .expect((res) => {
                expect(res.body.url).toBe(url);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                UrlModel.find({
                    url
                }).then(() => {
                    done();
                }).catch((e) => done(e));
            });

    });

    it('should not create a new url shortener', (done) => {
        var url = ' ';

        request(app)
            .post('/')
            .set('Content-Type', "application/json")
            .send({
                url
            })
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                UrlModel.find().then((urls) => {
                    expect(urls.length).toBe(3);
                    done();
                }).catch((e) => done(e));
            });

    });
});

describe('GET /:hash', () => {
    it('should get url and redirect', (done) => {
        request(app)
            .get(`/${urls[0].hash}`)
            .expect(302)
            .end(done);
    });

    it('should not get url and return error', (done) => {
        request(app)
            .get(`/${urls[0].hash}sdm`)
            .expect(404)
            .expect((res) => {
                expect(res.body.code).toBe(404);
            })
            .end(done);
    });
});

describe('DELETE /:hash/remove/:removeToken', () => {
    it('should change url active field to false', (done) => {
        request(app)
            .delete(`/${urls[0].hash}/remove/${urls[0].removeToken}`)
            .expect(200)
            .end(done);
    });

    it('should not change active field to false', (done) => {
        request(app)
            .delete(`/${urls[0].hash}/remove/${urls[0].removeToken}ffv`)
            .expect(400)
            .end(done);
    });
});