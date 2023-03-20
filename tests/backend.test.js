// The above code uses the chai-http library to test the status of the API search page.
// The describe function is used to define a test suite, and the it function is used to define a single test case.
// In this case, the test case checks that the status code returned by a GET request to the /api/search endpoint is 200.
// The chai.request function is used to make the HTTP request, and the end function is used to check the response.
// Finally, the done function is called to signal the end of the test case.
// If the response status code is not 200, the test will fail.
// This test is important because it ensures that the API is available and responding as expected.

const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('api search page status', function(){
    it('status', function(done){
        chai.request('http://localhost:3001')
            .get('/api/search')
            .end(function (err, res) {
                expect(res).to.have.status(200);
                done();
            });
    });
});
