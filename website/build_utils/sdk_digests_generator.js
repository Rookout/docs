const fs = require('fs');
const path = require('path');
const process = require('process');



function loadSdkDigests() {
    for (let lang of ["python", "node", "java", "dotnet", "agent"]) {
        setDigestInfoForLang(lang);
    }
}


function setDigestInfoForLang(lang) {
    const digestData = JSON.parse(fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk_digests", `digests-${lang}.json`)));

    const divLangStringToReplace = `<div id="${lang}-digests"></div>`;


    let startTable =    '<table>\n' +
        '<thead>\n' +
        '<tr>\n' +
        '<th>Version</th>\n' +
        '<th>Algorithm</th>\n' +
        '<th>Digest</th>\n';
    if (lang !== 'agent') {
        startTable +=     '<th>AWS Lambda Layer ARN</th>\n';
    }
    startTable +=       '</tr>\n' +
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
        } else if (lang === 'dotnet') {
            digestsRows += `<td><a href="https://www.nuget.org/packages/Rookout/${version}" target="_blank">${version}</a></td>`;
        } else if (lang === 'agent') {
            digestsRows += `<td>${version}</td>`;
        }
        digestsRows += `<td>SHA1</td>`;
        digestsRows += `<td>${digestData[version]['digests']['sha1']}</td>`;
        if (lang !== 'agent') {
            let arn = digestData[version]['digests']['arn'] || 'N/A';
            arn = arn.replace(/</gi, '&lt;')
            arn = arn.replace(/>/gi, '&gt;')
            digestsRows += `<td>${arn}</td>`;
        }
        digestsRows += `</tr>`;
    }

    const fullTable = startTable + digestsRows + endTable;
    let baseMd = fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.mdx"), {"encoding": "utf-8"});
    baseMd = baseMd.replace(divLangStringToReplace, `<div id="${lang}-digests">${fullTable}</div>`);
    fs.writeFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.mdx"), baseMd);
}

function copyToDocsDir() {
    const digests = fs.readFileSync(path.join(process.cwd(), "build_utils", "sdk-digests-base.mdx"), {"encoding": "utf-8"});
    fs.writeFileSync(path.join(process.cwd(), "..", "docs", "sdk-digests.mdx"), digests);
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
