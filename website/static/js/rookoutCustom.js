/* Global site tag (gtag.js) - Google Analytics */
if (document.getElementById) {
  document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-104510371-3"></script>');
}


$(function () {
  initGA();
  initLogRocket();
  customizeSearchInput();
  changeLogoLink();
  loadRookoutToken();
  enableTabs();
  setTimeout(loadTabsForOS, 1000);
});

function enableTabs() {
  $('.nav-tabs a').on('click', function (e) {
    e.preventDefault();
    $(this).tab('show');
  })
}

function changeLogoLink() {
  $('header a[href="/"]').attr('href', 'https://www.rookout.com');
}


function initLogRocket() {
  window.LogRocket && window.LogRocket.init("fzkqiz/rookout");
}


function initGA() {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'UA-104510371-3');
}


function customizeSearchInput() {
  const originalSearchContainer = $("ul.nav-site > .navSearchWrapper.reactNavSearchWrapper");

  if (originalSearchContainer.length > 0) {
    originalSearchContainer.remove();
  }

  const docNavbarElem = $("section.navWrapper.wrapper");

  if (docNavbarElem.length > 0) {
    const searchContainer = $(document.createElement('div'));
    searchContainer.addClass('rook-searchBar').addClass('rook-docNav');

    const searchBarInput = $(document.createElement('input'));
    searchBarInput.attr('type', 'text');
    searchBarInput.attr('placeholder', 'Search...');
    searchBarInput.attr('id', 'rookout-search');

    const searchBarIcon = $(document.createElement('img'));
    searchBarIcon.attr('src', '/img/icons/search.svg');
    searchBarIcon.attr('id', 'rookout-search-icon')
    searchBarIcon.toggle();

    searchContainer.append(searchBarInput);
    searchContainer.append(searchBarIcon);

    docNavbarElem.prepend(searchContainer);
  }

  setTimeout(activateAlgoliaDocSearch, 1000);
}


function activateAlgoliaDocSearch() {
  docsearch({
    apiKey: 'c4a6a6e1d94fba2757ec2969d13ac547',
    indexName: 'rookout',
    inputSelector: '#rookout-search',
    debug: window.location.hostname == 'localhost'
  });

  $('#rookout-search-icon').toggle();
}


function loadRookoutToken() {
  const ROOKOUT_TOKEN_URL = 'https://app.rookout.com/rest/v1/org/token';

  $.get({
    url: ROOKOUT_TOKEN_URL,
    method: 'GET',
    xhrFields: {
      withCredentials: true
   }
  }, (data) => {
    setRookoutTokenInPage(data);
  })
  .fail(() => {
    setRookoutTokenInPage(null);
  });
}


function setRookoutTokenInPage(data) {
  const body = $('body');
  let error = false;

  if (data) {
    const token = data['token'];
    const org_name = data['org_name'] || 'unknown';
    let current_user = data['current_user'] || null;

    if (token) {
    	$("span:contains('[Your Rookout Token]')").addClass('_lr-hide'); // hide token from LogRocket
      body.html(body.html().replace(/\[Your Rookout Token\]/g, token));
      $('.rookout-org-info').html(`Showing token for <b>${org_name}</b>. Keep your token private.`);
      if (current_user) {
        window.LogRocket.identify(current_user.email, {
          name: current_user.name,
          email: current_user.email
        });
      }
    } else {
      error = true;
    }
  } else {
    error = true;
  }

  if (error) {
    $('.rookout-org-info').html('Login to <a href="https://app.rookout.com" target="_blank">app.rookout.com</a> to see your organization token')
  }
}

// TODO: FIX
function loadTabsForOS() {
  const page_tabs = $('[id^="page-tab"]');
  page_tabs.on("load change", function(e) {
    const osToTab = {
      'default': '1',
      'linux': '1',
      'osx': '1',
      'windows': '2'
    };

    const lang = $(e.target).data('lang');
    const userAgent = navigator.userAgent.toLowerCase();

    let os = 'default';
    if (userAgent.includes('win')) {
      os = 'windows';
    } else if (userAgent.includes('mac os x')) {
      os = 'osx';
    } else if (userAgent.includes('linux')) {
      os = 'linux';
    }

    $(`[id="${lang}-tab${osToTab[os]}"]`).prop('checked', true); // Checks radio button to load the right tab
  });
}

