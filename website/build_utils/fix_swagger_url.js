const fs = require('fs');
const path = require('path');
const process = require('process');
const defaultSwaggerUrl = "https://petstore.swagger.io/v2/swagger.json"
const rookOutSwaggerUrl = "https://app.rookout.com/api/v1/rookout.yaml"

const filePath = path.join(process.cwd(), "build","docs", "api", `index.html`)
let swaggerHtmlFile = fs.readFileSync(filePath, {encoding: 'utf-8'})
swaggerHtmlFile = swaggerHtmlFile.replace(defaultSwaggerUrl, rookOutSwaggerUrl)
fs.writeFileSync(filePath, swaggerHtmlFile)

