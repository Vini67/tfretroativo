const request = require('supertest');
const { app, server, db } = require('../index');

afterAll((done) => {
  server.close(() => {
    db.end(() => {
      done();
    });
  });
});

describe('Testes na rota GET /clientes', () => {
  it('Deve retornar status 200 e um array', async () => {
    const res = await request(app).get('/clientes');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

