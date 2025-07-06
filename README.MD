# 🎭 Playwright Automation Framework

This repository contains a Playwright test automation framework for both end-to-end (UI) and API testing of the [ParaBank demo application](https://parabank.parasoft.com/).

---

## 🧩 Project Structure
```
├── tests/ # UI and API test specs
├── pages/ # Page Object Models for UI
├── helper/ # Test data generators 
├── .github/workflows/ # GitHub Actions CI workflow
├── allure-results/ # Raw results for Allure
├── allure-report/ # Generated HTML report from Allure
└── playwright.config.ts # Playwright configuration
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright install --with-deps
npm install -D allure-commandline
```

### 2. Run Tests

```bash
npx playwright test
```

### 3. Generate Allure Report

```bash
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report
```

