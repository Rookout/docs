const request = require('request');
const fs = require('fs');
const path = require('path');

const options = {
  url: 'https://api.github.com/repos/Rookout/deployment-examples/contents/',
  headers: {
    'User-Agent': 'RookoutDocs/1.0'
  }
};

request(options, function (error, response, body) {
  if (error) {
    console.error('error:', error);
    throw error;
  }

  const dirs = filterData(JSON.parse(body));
  const generatedContent = buildMarkdown(dirs);
  updateMarkdownFile(generatedContent);
});

const filterData = (data) => {
  const dirs =  data.filter(content => content.type === 'dir');
  let dataPerLang = {};

  for (let dir of dirs) {
    const lang = dir.name.split('-')[0];
    if (!(lang in dataPerLang)) {
      dataPerLang[lang] = [];
    }
    dataPerLang[lang].push(dir);
  }

  return dataPerLang;
};

const buildMarkdown = (data) => {
  let md = '';

  md += `---
id: deployment-examples
title: Deployment Examples
sidebar_label: Deployment Examples
---\n\n`;

  for (let language in data) {
    md += `### ${ucFirstAllWords(language)}\n\n`;
    for (let example of data[language]) {
      let exampleName = example.name;
      exampleName = exampleName.split('-');
      exampleName.shift();
      exampleName = ucFirstAllWords(exampleName.join(' '));
      md += `[${exampleName}](${example.html_url})\n\n`;
    }
  }

  return md;
};

const updateMarkdownFile = (content) => {
  try {
    fs.writeFileSync(path.join(process.cwd(), '..', 'docs', 'deployment-examples.md'), content);
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
