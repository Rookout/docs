const {
  describe, expect, test, beforeEach,
} = require("@jest/globals");
const fs = require("fs");
const path = require("path");
const process = require("process");

describe('Build includes all required files', () => {
  describe('Main  docusarus files', () => {
    test("should find main index.html", () => {
      const filePath = path.join(process.cwd(), "build", `index.html`);
      const file = fs.readFileSync(filePath, { encoding: 'utf-8' });
      expect(file).toBeTruthy();
    });
  });


  describe('Swagger Files ', () => {
    test('should include swagger html file', () => {
      const swaggerHtmlFileLocation = path.join(process.cwd(), "build", "api", `index.html`);
      const swaggerHtmlFile = fs.readFileSync(swaggerHtmlFileLocation);
      expect(swaggerHtmlFile).toBeTruthy();
    });

    test('should include swagger js file', () => {
      const swaggerJsFileLocation = path.join(process.cwd(), "build", "api", `swagger-ui.js`);
      const swaggerJsFile = fs.readFileSync(swaggerJsFileLocation);
      expect(swaggerJsFile).toBeTruthy();
    });
  });


  describe("Docs files", () => {
    test("should have doc files", () => {
      const docsFileLocation = path.join(process.cwd(), "build", "docs");
      const dirFiles = fs.readdirSync(docsFileLocation);
      expect(dirFiles.length).toBeTruthy();
    });
    test("should include homepage", () => {
      const welcomeHtmlFilePath = path.join(process.cwd(), "build", "docs", "welcome", "index.html");
      const file = fs.readFileSync(welcomeHtmlFilePath, { encoding: "utf-8" });

      expect(file).toBeTruthy();
      expect(file).toContain("welcome to Rookout!");
    });

    test("should have sdk-digests", () => {
      const sdkDigestPath = path.join(process.cwd(), "build", "docs", "sdk-digests", "index.html");
      const file = fs.readFileSync(sdkDigestPath, { encoding: "utf-8" });
      expect(file).toBeTruthy();
    });
  });


  describe("JS Files", () => {
    test("should include rookoutCustom.js file", () => {
      const jsPath = path.join(process.cwd(), "build", "js", "rookoutCustom.js");
      const file = fs.readFileSync(jsPath, { encoding: "utf-8" });
      expect(file).toBeTruthy();
      expect(file).toContain("loadRookoutToken");
    });
  });

  describe("CSS Files", () => {
    test("should include rookoutCustom.js file", () => {
      const cssPath = path.join(process.cwd(), "build", "css", "custom.css");
      const file = fs.readFileSync(cssPath, { encoding: "utf-8" });
      expect(file).toBeTruthy();
    });
  });
});

