const url = "http://localhost:3000";

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(url + "/api/v1/status");
  expect(response.status).toBe(200);
});

test("GET to /api/v1/status should return updatedAt", async () => {
  const response = await fetch(url + "/api/v1/status");
  // Pegando o body do resultado
  const responseBody = await response.json();
  // Validando se chega a proriedade updatedAt
  expect(responseBody.updatedAt).toBeDefined();
  // Se der errado o teste, recebeu um null da response e nao conseguiu fazer o Parse
  const parsedUpdatedAt = new Date(responseBody.updatedAt).toISOString();
  expect(responseBody.updatedAt).toEqual(parsedUpdatedAt);
  // TDD PRIMEIRO PROGRAMA O TESTE PARA QUEBRAR E DEPOIS ARRUMA
  expect(responseBody.dependencies.database.version).toEqual("16.0");
  // TESTANDO O NUMERO DE CONEXOES
  expect(responseBody.dependencies.database.max_connections).toEqual(100);
  // TESTANDO O NUMERO DE CONEXOES NO BANCO DE OUTRO MODO
  expect(responseBody.dependencies.database.dataBaseOpenConnections).toEqual(1);
});

// test("Test SQL INJECTION to endpoint STATUS", async () => {
//   const response = await fetch(
//     url + "/api/v1/status?leozinhoParameter=aquiSotemGay",
//   );
// });
