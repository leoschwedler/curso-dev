const url = "http://localhost:3000";

test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch(url + "/api/v1/status");
  expect(response.status).toBe(200);
});
