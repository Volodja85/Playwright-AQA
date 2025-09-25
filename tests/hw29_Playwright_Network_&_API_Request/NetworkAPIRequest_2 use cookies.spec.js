import { test, expect, request } from "@playwright/test";
import fs from "fs";

test.describe("API тести створення машин", () => {
  let apiContext;

  test.beforeAll(async () => {
    // Зчитуємо SID з файлу
    const sidPath = "src/storage/sid.json";

    const sidJson = JSON.parse(fs.readFileSync(sidPath, "utf-8"));
    const sid = sidJson.sid;

    const decodedSid = decodeURIComponent(sid);
    console.log("SID зчитано:", decodedSid);

    // Створюємо контекст із baseURL і кукою
    apiContext = await request.newContext({
      baseURL: "https://qauto.forstudy.space/api",
      extraHTTPHeaders: {
        Cookie: `sid=${decodedSid}`,
      },
    });
  });

  test.afterAll(async () => {
    if (apiContext) await apiContext.dispose();
  });

  test("Позитивний сценарій: створення машини з валідними даними", async () => {
    const response = await apiContext.post(
      "https://qauto.forstudy.space/api/cars",
      {
        data: {
          carBrandId: 1,
          carModelId: 1,
          mileage: 122,
        },
      }
    );

    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body.status).toBe("ok");
    expect(body.data).toHaveProperty("id");
    expect(body.data.brand).toBe("Audi");
    expect(body.data.model).toBe("TT");
  });

  test.describe("Негативні сценарії", () => {
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
  });
});
