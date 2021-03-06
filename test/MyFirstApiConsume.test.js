const agent = require('superagent-promise')(require('superagent'), Promise);
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('First Api Tests', () => {
  it('Consume GET Service', () => agent.get('https://httpbin.org/ip').then((response) => {
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('origin');
  }));

  it('Consume GET Service with query parameters', () => {
    const query = {
      name: 'John',
      age: '31',
      city: 'New York'
    };
    return agent.get('https://httpbin.org/get')
      .query(query)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.args).to.eql(query);
      });
  });

  it('Consume POST Service', () => {
    const body = {
      name: 'John',
      age: 31,
      city: 'New York'
    };
    return agent
      .post('https://httpbin.org/post')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume PATCH Service', () => {
    const data = 'DataTestPatch';
    return agent
      .patch('https://httpbin.org/patch')
      .send(data)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.data).to.equal(response.data);
      });
  });

  it('Consume HEAD Service', () => agent
    .head('https://httpbin.org/headers').then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.length).to.equal(undefined);
    }));

  it('Consume PUT Service', () => {
    const body = {
      name: 'John',
      age: 32,
      city: 'New York'
    };
    return agent
      .put('https://httpbin.org/put')
      .send(body)
      .then((response) => {
        expect(response.status).to.equal(statusCode.OK);
        expect(response.body.json).to.eql(body);
      });
  });

  it('Consume DELETE Service', () => agent
    .del('https://httpbin.org/delete').then((response) => {
      expect(response.status).to.equal(statusCode.OK);
      expect(response.body.json).to.equal(null);
    }));
});
