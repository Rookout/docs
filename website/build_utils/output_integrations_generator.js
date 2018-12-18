const request = require('request-promise-native');
const fs = require('fs');
const path = require('path');
const process = require('process');

const headers = {
  'User-Agent': 'RookoutDocs/1.0'
};

if (process.env.GITHUB_TOKEN) {
  headers['Authorization'] = `token ${process.env.GITHUB_TOKEN}`;
}

request({url: 'https://api.github.com/repos/Rookout/output-integrations/contents/', headers: headers}, async function (error, response, body) {
  if (error) {
    console.error('error:', error);
    throw error;
  }

  const dirs = filterData(JSON.parse(body));
  const generatedContent = await buildMarkdown(dirs);
  updateMarkdownFile(generatedContent);
});

const filterData = (data) => {
  return data.filter(content => content.type === 'dir');
};

const getMetadata = async (integration) => {
  const res = await request({
    url: `https://raw.githubusercontent.com/Rookout/output-integrations/master/${integration.name}/docs_metadata/metadata.json`,
    headers: headers
  });
  return JSON.parse(res);
};

const buildMarkdown = async (data) => {
  let md = '';

  md += `---
id: integrations
title: Integrations
---\n\n
Full examples for getting Rookout's output to your preferred platform is [available on our GitHub](https://github.com/Rookout/output-integrations)

You will be able to find detailed procedures for all the following :`;

  md += `<div class="integrations-table">`;

  for (let integration of data) {
    const metadata = await getMetadata(integration);

    md += `
<div class="integrations-item">
    <div class="integrations-logo">
        <a href="${metadata.website}" target="_blank"><img src="https://raw.githubusercontent.com/Rookout/output-integrations/master/${integration.name}/docs_metadata/${metadata.logo_filename}"/></a>
    </div>
    <div class="integrations-title">
        ${ucFirstAllWords(integration.name)} Integration
    </div>
    <div class="integrations-link">
        <a href="https://github.com/Rookout/output-integrations/tree/master/${integration.name}" target="_blank">Our Tutorial</a>
    </div>
    <div class="integrations-description">
        ${metadata.summary}
    </div>
</div>`;
  }

  md += `</div>`;

  return md;
};

const updateMarkdownFile = (content) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), '..', 'docs', 'integrations.md'), content);
  } catch (err) {
    console.error(`Could not write to file: ${err}`);
    throw err;
  }
};

const ucFirstAllWords = (str) => {
  const pieces = str.split(" ");
  for (let i = 0; i < pieces.length; i++)
  {
    const j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1).toLowerCase();
  }
  return pieces.join(" ");
};
