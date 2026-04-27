import { expect, test } from '@playwright/test'

const LANDING_KEY = 'corethink-strategy-os-landing-dismissed'

async function openPlan(page: import('@playwright/test').Page) {
  await page.addInitScript((key) => {
    window.localStorage.setItem(key, '1')
  }, LANDING_KEY)
  await page.goto('/#/')
}

test.describe('CoreThink strategy (static data in UI)', () => {
  test('brand SVG is served and decodes', async ({ request }) => {
    const res = await request.get('/corethink-Bh1OL6oM.svg')
    expect(res.ok()).toBeTruthy()
    const text = await res.text()
    expect(text).toContain('<svg')
  })

  test('home shows strategy thesis and key numbers', async ({ page }) => {
    await openPlan(page)
    await expect(page.getByRole('heading', { name: /CoreThink 12-month plan/i })).toBeVisible()
    await expect(page.getByText('Use local models for routine work', { exact: false })).toBeVisible()
    await expect(page.getByText('$250,000', { exact: false })).toBeVisible()
    await expect(page.getByText('$510,000', { exact: false })).toBeVisible()
    await expect(page.getByText('Paying customers by month 12', { exact: false })).toBeVisible()
  })

  test('strategy page shows pillars from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/strategy')
    await expect(page.getByText('Domain-specific languages', { exact: false })).toBeVisible()
    await expect(page.getByText('Improved cybersecurity', { exact: false })).toBeVisible()
  })

  test('pricing page shows tiers from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/pricing')
    await expect(page.getByText('Community Entry', { exact: false })).toBeVisible()
    await expect(page.getByText('Design-Partner Pilot', { exact: false })).toBeVisible()
  })

  test('acquisition page shows channel from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/acquisition')
    await expect(page.getByText('Technical documentation and tutorials', { exact: false })).toBeVisible()
  })

  test('growth page shows quarterly projection from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/growth')
    await expect(
      page.getByRole('cell', { name: /Foundation, first integrations, first design partners/ }),
    ).toBeVisible()
    await expect(page.getByText('Q1', { exact: false }).first()).toBeVisible()
  })

  test('metrics page shows metric definitions from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/metrics')
    await expect(page.getByRole('heading', { name: 'docs shipped' })).toBeVisible()
    await expect(page.getByText('Published technical docs', { exact: false })).toBeVisible()
  })

  test('budget page shows line items from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/budget')
    await expect(page.getByText('Dylan salary', { exact: false })).toBeVisible()
    await expect(page.getByText('Tooling, CRM, analytics, and systems', { exact: false })).toBeVisible()
  })

  test('entities page shows entity from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/entities')
    await expect(page.getByText('CoreThink Hybrid Strategy', { exact: false }).first()).toBeVisible()
    await expect(page.getByText('OpenClaw Integration', { exact: false })).toBeVisible()
  })

  test('system tree shows root and branches from data', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/system-tree')
    await expect(page.getByText('This page summarizes how the proposal fits together', { exact: false })).toBeVisible()
    await expect(page.getByRole('heading', { name: 'Customer Acquisition' })).toBeVisible()
  })

  test('search indexes roadmap and entities', async ({ page }) => {
    await openPlan(page)
    await page.goto('/#/search')
    await page.getByPlaceholder(/Search titles/).fill('Foundation and first design-partner proof')
    await expect(page.getByRole('heading', { name: 'Q1 Roadmap' })).toBeVisible()
    const result = page.locator('.search-result').filter({ hasText: 'Q1 Roadmap' })
    await expect(result.getByText('Execution plan')).toBeVisible()
    await expect(result.locator('.search-pill-type', { hasText: 'roadmap' })).toBeVisible()
  })

  test('landing shows logo and can enter the plan', async ({ page }) => {
    await page.addInitScript((key) => {
      window.localStorage.removeItem(key)
    }, LANDING_KEY)
    await page.goto('/#/')
    await expect(page.getByRole('img', { name: 'CoreThink' })).toBeVisible()
    await page.getByRole('button', { name: 'View Plan' }).click()
    await expect(page.getByRole('navigation')).toContainText('Home')
    await expect(page.getByRole('link', { name: 'Strategy' })).toBeVisible()
  })
})
