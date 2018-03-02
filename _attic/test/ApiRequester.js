import chai from 'chai'
import ApiReq from '../js/scripts/ApiRequester.js';


let expect = chai.expect
let should = chai.should()

//hardcoded for now
let creds = {
    url: 'https://demo-ade.openasset.com',
    user: 'restapi',
    pass: 'restapi'
};

describe('ApiRequester.authenticate() with credentials', function () {
    it('should return 2 when given 1 and 1 via expect()', function () {
        expect(ApiReq.authenticate(false, creds.url, creds.user, creds.pass)).to.be.equal(2);
    })
})
