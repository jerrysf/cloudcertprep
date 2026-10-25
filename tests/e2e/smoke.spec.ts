import { expect, test } from "@playwright/test";

test("homepage renders positioning and CTAs", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Prepare for the AWS Solutions Architect Associate Exam",
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Start Free Practice" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore Study Guides" }),
  ).toBeVisible();
  // official domain weights are shown
  await expect(page.getByText("Design Secure Architectures")).toBeVisible();
});

test("practice session: answer, submit, see explanation", async ({ page }) => {
  await page.goto("/practice/iam-and-access-control");
  await expect(
    page.getByRole("heading", { name: "IAM & Access Control" }),
  ).toBeVisible();
  // select an answer — options are labelled A./B./etc.
  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Submit answer" }).click();
  // feedback + explanation appear
  await expect(page.getByRole("status")).toContainText(/Correct\.|Incorrect\./);
  await expect(page.getByText("Official AWS references")).toBeVisible();
  // navigate to next question
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await expect(page.getByText("Question 2 of")).toBeVisible();
});

test("mock exam: start, answer, persist across refresh, submit, see results", async ({
  page,
}) => {
  await page.goto("/mock-exam");
  await page.getByRole("button", { name: /10/ }).first().click(); // 10 questions
  await page.getByRole("button", { name: "Untimed" }).click();
  await page.getByRole("button", { name: /Start mock exam/ }).click();
  await page.waitForURL(/\/mock-exam\/.+/);

  await page.getByRole("radio").first().check();
  await page.getByRole("button", { name: "Flag for review" }).click();
  await page.getByRole("button", { name: "Next", exact: true }).click();
  await page.getByRole("radio").first().check();

  // refresh → answers persist
  await page.reload();
  await expect(page.getByText("2 answered")).toBeVisible();
  await expect(page.getByText("1 flagged")).toBeVisible();

  // jump to last question and submit
  await page.getByRole("button", { name: "Question 10" }).click();
  await page
    .getByRole("button", { name: "Submit exam", exact: true })
    .click();
  await page.waitForURL(/\/results\/.+/);
  await expect(
    page.getByRole("heading", { name: "Exam Results" }),
  ).toBeVisible();
  await expect(page.getByText("Estimated score")).toBeVisible();
  await expect(page.getByText("Performance by domain")).toBeVisible();
});
