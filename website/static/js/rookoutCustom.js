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
  loadSdkDigests();
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
  window.LogRocket && window.LogRocket.init("fzkqiz/rookout", {
	  network: {
		  requestSanitizer: filterOutTokenUrl,
		  responseSanitizer: filterOutTokenUrl
	  }
  });
}

function filterOutTokenUrl(requestOrResponse) {
	return requestOrResponse.url === 'https://app.rookout.com/rest/v1/org/token' ? null : requestOrResponse;
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
    	$("code:contains('[Your Rookout Token]')").addClass('_lr-hide'); // hide token from LogRocket
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


function loadSdkDigests() {
  if (!window.location.href.includes("sdk-digests")) return;

  for (let lang of ["python", "node", "java"]) {
    setDigestInfoForLang(lang);
  }
}


function setDigestInfoForLang(lang) {
  $.get({
    url: `https://get.rookout.com/digests-${lang}.json`,
    method: 'GET',
    dataType: 'json'
  }, (digestData) => {
    const box = $(`#${lang}-digests`);
    const table = $('<table>');
    const thead = $('<thead>');
    const tbody = $('<tbody>');
    const thead_tr = $('<tr>').append($('<th>').html("Version"))
      .append($('<th>').html("Digest"));

    let ordered = {};
    Object.keys(digestData).sort(function(a, b) {
      // Descending order
      return semverBigger(b, a);
    }).forEach(function(key) {
      ordered[key] = digestData[key];
    });

    for (let version in ordered) {
      let tr = $('<tr>');
      let td = $('<td>').html(version);
      tr.append(td);
      if (lang === 'python') {
        td = $('<td>').html(`[SHA256] ${digestData[version]['digests'][`rook-${version}.tar.gz`]['sha256']}`);
      } else if (lang === 'node') {
        td = $('<td>').html(`[SHA512] ${digestData[version]['digests']['integrity']}`);
      } else if (lang === 'java') {
        td = $('<td>').html(`[SHA1] ${digestData[version]['digests']['sha1']}`);
      }
      tr.append(td);
      tbody.append(tr);
    }


    thead.append(thead_tr);
    table.append(thead);
    table.append(tbody);
    box.append(table);
  });
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
