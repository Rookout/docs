function activateAlgoliaDocSearch() {
  window.rookoutDocsearch = docsearch({
    apiKey: 'c4a6a6e1d94fba2757ec2969d13ac547',
    indexName: 'rookout',
    inputSelector: '#rookout-search',
    debug: window.location.hostname === 'localhost'
  });

  $('#rookout-search-icon').toggle();
}


$(function () {
  customizeSearchInput(activateAlgoliaDocSearch);
});
