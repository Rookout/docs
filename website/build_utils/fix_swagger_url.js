const fs = require('fs');
const path = require('path');
const process = require('process');
const defaultSwaggerUrl = "url: \"https://petstore.swagger.io/v2/swagger.json\","

const RookoutSwaggerDef = `
      urls: [{
          url: "https://app.rookout.com/api/v1/rookout.yaml",
          name: 'RookoutV1'
        }, {
          url: "https://app.rookout.com/api/v2/rookout.yaml",
          name: 'RookoutV2'
        }],
          "urls.primaryName": "RookoutV1",

`

const filePath = path.join(process.cwd(), "build","docs", "api", `index.html`)
let swaggerHtmlFile = fs.readFileSync(filePath, {encoding: 'utf-8'})
swaggerHtmlFile = swaggerHtmlFile.replace(defaultSwaggerUrl, RookoutSwaggerDef)
fs.writeFileSync(filePath, swaggerHtmlFile)


