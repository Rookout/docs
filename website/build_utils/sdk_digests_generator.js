const fs = require('fs');
const path = require('path');
const process = require('process');



function loadSdkDigests() {
  for (let lang of ["python", "node", "java", "agent"]) {
    setDigestInfoForLang(lang);
  }
}


function setDigestInfoForLang(lang) {
  const digestData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk_digests", `digests-${lang}.json`)));

  const divLangStringToReplace = `<div id="${lang}-digests"></div>`;

  const startTable =  '<table>\n' +
                      '<thead>\n' +
                      '<tr>\n' +
                      '<th>Version</th>\n' +
                      '<th>Algorithm</th>\n' +
                      '<th>Digest</th>\n' +
                      '<th>AWS Lambda Layer ARN</th>\n' +
                      '</tr>\n' +
                      '</thead>' +
                      '<tbody>';

  const endTable =    '</tbody></table>';

  let ordered = {};
  Object.keys(digestData).sort(function(a, b) {
    // Descending order
    return semverBigger(b, a);
  }).forEach(function(key) {
    ordered[key] = digestData[key];
  });

  let digestsRows = "";
  for (let version in ordered) {
    digestsRows += "<tr>";
    if (lang === 'python') {
      digestsRows += `<td><a href="https://pypi.org/project/rook/${version}" target="_blank">${version}</a></td>`;
    } else if (lang === 'node') {
      digestsRows += `<td><a href="https://www.npmjs.com/package/rookout/v/${version}" target="_blank">${version}</a></td>`;

    } else if (lang === 'java') {
      digestsRows += `<td><a href="https://mvnrepository.com/artifact/com.rookout/rook/${version}" target="_blank">${version}</a></td>`;
    } else if (lang === 'agent') {
      digestsRows += `<td>${version}</td>`;
    }
    digestsRows += `<td>SHA1</td>`;
    digestsRows += `<td>${digestData[version]['digests']['sha1']}</td>`;
    digestsRows += `<td>${digestData[version]['digests']['arn'] || 'N/A'}</td>`;
    digestsRows += `</tr>`;
  }

  const fullTable = startTable + digestsRows + endTable;
  let baseMd = fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.md"), {"encoding": "utf-8"});
  baseMd = baseMd.replace(divLangStringToReplace, `<div id="${lang}-digests">${fullTable}</div>`);
  fs.writeFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.md"), baseMd);
}

function copyToDocsDir() {
  const digests = fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.md"), {"encoding": "utf-8"});
  fs.writeFileSync(path.join(process.cwd(), "..", "docs", "sdk-digests.md"), digests);
}


function semverBigger (a, b) {
  var pa = a.split('.');
  var pb = b.split('.');
  for (var i = 0; i < 3; i++) {
    var na = Number(pa[i]);
    var nb = Number(pb[i]);
    if (na > nb) return 1;
    if (nb > na) return -1;
    if (!isNaN(na) && isNaN(nb)) return 1;
    if (isNaN(na) && !isNaN(nb)) return -1;
  }
  return 0;
}

loadSdkDigests();
copyToDocsDir();
