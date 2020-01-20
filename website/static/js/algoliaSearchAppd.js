function activateAlgoliaDocSearch() {
  docsearch({
    apiKey: 'bd9a57e3fd2c1d61e44b4ab7dd8a438a',
    indexName: 'rookout_dci',
    inputSelector: '#rookout-search',
    debug: window.location.hostname === 'localhost'
  });

  $('#rookout-search-icon').toggle();
}


$(function () {
  customizeSearchInput(activateAlgoliaDocSearch);
});
