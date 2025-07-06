# 🎭 Playwright Automation Framework

This repository contains a modular Playwright test automation framework for both end-to-end (UI) and API testing of the [ParaBank demo application](https://parabank.parasoft.com/).

---

## 🧩 Project Structure

├── tests/ # UI and API test specs
├── pages/ # Page Object Models for UI
├── utils/ # Utility and setup functions
├── helper/ # Test data helpers
├── .github/workflows/ # GitHub Actions CI workflow
├── allure-results/ # Allure test results (raw)
├── allure-report/ # Generated Allure HTML report
└── playwright.config.ts # Playwright configuration


---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright install --with-deps
npm install -D allure-commandline

2. Run tests
npx playwright test

3. Generate Allure Report
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

