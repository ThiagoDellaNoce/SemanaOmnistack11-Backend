const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database/connection");

describe("ONG", () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it("should be able to create a new ONG", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      });

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toHaveLength(8);

    // expect(2).toBe(2);
  });

  it("Should return array of ONGs", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      });

    const id = response.body.id;

    const expected = [
      {
        id: id,
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      }
    ];

    const response2 = await request(app).get("/ongs");

    expect(response2.body).toEqual(expect.objectContaining(expected));

    // expect(2).toBe(2);
  });

  it("should be able to create a new INCIDENT", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      });

    const response2 = await request(app)
      .post("/incidents")
      .set("authorization", response.body.id)
      .send({
        title: "Caso 4",
        description: "Detalhes do caso",
        value: 120
      });

    const expected = { id: 1 };

    expect(response2.body).toEqual(expect.objectContaining(expected));

    // expect(2).toBe(2);
  });

  it("should return array of INCIDENT", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      });

    const response2 = await request(app)
      .post("/incidents")
      .set("authorization", response.body.id)
      .send({
        title: "Caso 4",
        description: "Detalhes do caso",
        value: 120
      });

    const response3 = await request(app)
      .get("/incidents")
      .set("authorization", response.body.id);

    const expected = [
      {
        id: 1,
        title: "Caso 4",
        description: "Detalhes do caso",
        value: 120,
        ong_id: response.body.id,
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      }
    ];

    expect(response3.body).toEqual(expect.objectContaining(expected));

    // expect(2).toBe(2);
  });

  it("should delete an INCIDENT", async () => {
    const response = await request(app)
      .post("/ongs")
      .send({
        name: "Thiago",
        email: "apad@email.com",
        whatsapp: "34991431940",
        city: "Rio do Sul",
        uf: "SC"
      });

    const response2 = await request(app)
      .post("/incidents")
      .set("authorization", response.body.id)
      .send({
        title: "Caso 4",
        description: "Detalhes do caso",
        value: 120
      });

    const response3 = await request(app)
      .get("/incidents")
      .set("authorization", response.body.id);

    const response4 = await request(app)
      .delete("/incidents/1")
      .set("authorization", response.body.id);

    const expected = {};
    
    expect(response4.body).toEqual({});

    // expect(2).toBe(2);
  });
});
