import { test, expect, request } from "@playwright/test";

let apiContext;

test.beforeAll(async () => {
  const tempContext = await request.newContext();

  const loginResponse = await tempContext.post(
    "https://qauto.forstudy.space/api/auth/signin",
    {
      data: {
        email: "v.zemela@gmail.com",
        password: "Password123",
      },
    }
  );

  expect(loginResponse.ok()).toBeTruthy();

  const storageState = await tempContext.storageState();

  apiContext = await request.newContext({
    storageState,
  });
});

test("Перевірка сесії — отримати список машин", async () => {
  const response = await apiContext.get(
    "https://qauto.forstudy.space/api/cars"
  );
  expect(response.ok()).toBeTruthy();

  const body = await response.json();
  console.log(body);
});

test("Провірка доступності API та створення машини", async () => {
  const carsGet = await apiContext.get("https://qauto.forstudy.space/api/cars");
  console.log("GET /api/cars статус:", carsGet.status());

  expect(carsGet.status()).toBe(200);
});

test("Позитивний тест - cтворення машини", async () => {
  const response = await apiContext.post(
    "https://qauto.forstudy.space/api/cars",
    {
      data: {
        //carBrandId — ID бренду (наприклад, Audi = 1)
        //carModelId — ID моделі в межах бренду (наприклад, TT = 1)
        //mileage — початковий пробіг
        carBrandId: 1,
        carModelId: 1,
        mileage: 123654,
      },
    }
  );

  expect(response.status()).toBe(201);
  const body = await response.json();

  expect(body.status).toBe("ok");
  expect(body.data).toHaveProperty("id");
  console.log("Створено машину з ID:", body.data.id);
});

test("Негативний тест — відсутнє поле carBrandId", async () => {
  const response = await apiContext.post(
    "https://qauto.forstudy.space/api/cars",
    {
      data: {
        carModelId: 1,
        mileage: 10000,
      },
    }
  );

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.status).toBe("error");
  expect(body.message).toContain("Car brand id is required");
});

test("Негативний тест — некоректний тип поля mileage", async () => {
  const response = await apiContext.post(
    "https://qauto.forstudy.space/api/cars",
    {
      data: {
        carBrandId: 1,
        carModelId: 1,
        mileage: "one hundred",
      },
    }
  );

  expect(response.status()).toBe(400);

  const body = await response.json();
  expect(body.status).toBe("error");
  expect(body.message).toContain("mileage");
});
