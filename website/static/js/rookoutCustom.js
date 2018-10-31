<!-- Global site tag (gtag.js) - Google Analytics -->
if (document.getElementById) document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-104510371-3"></script>');


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-104510371-3');


$(function () {
  const originalSearchContainer = document.querySelector("ul.nav-site > .navSearchWrapper.reactNavSearchWrapper");

  if (originalSearchContainer !== null) {
    originalSearchContainer.parentElement.removeChild(originalSearchContainer);
  }

  const docNavbarElem = document.querySelector("section.navWrapper.wrapper");

  if (docNavbarElem !== null) {
    const searchContainer = document.createElement('div');
    searchContainer.classList.add('rook-searchBar', 'rook-docNav');

    const searchBarInput = document.createElement('input');
    searchBarInput.setAttribute('type', 'text');
    searchBarInput.setAttribute('placeholder', 'Search...');
    searchBarInput.setAttribute('id', 'rookout-search');

    const searchBarIcon = document.createElement('img');
    searchBarIcon.setAttribute('src', '/img/icons/search.svg');

    searchContainer.appendChild(searchBarInput);
    searchContainer.appendChild(searchBarIcon);

    docNavbarElem.insertBefore(searchContainer, docNavbarElem.children.item(0));
  }

  docsearch({
    apiKey: 'c4a6a6e1d94fba2757ec2969d13ac547',
    indexName: 'rookout',
    inputSelector: '#rookout-search'
  });

  loadRookoutToken();

  setTimeout(loadTabsForOS, 1000);
});


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

    if (token) {
      body.html(body.html().replace(/\[Your Rookout Token\]/g, token));
      $('.rookout-org-info').html(`Showing token for <b>${org_name}</b>. Keep your token private.`);
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


function copyToClipboard(element) {
  const textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';

  let textToCopy = element.parentElement.innerText;
  textToCopy = textToCopy.substr(4).trim();

  textArea.value = textToCopy;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand('copy');
    // const msg = successful ? 'successful' : 'unsuccessful';
    // console.log('Copying text command was ' + msg);
  } catch (err) {
    // console.log('Oops, unable to copy');
  }

  document.body.removeChild(textArea);
}


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
