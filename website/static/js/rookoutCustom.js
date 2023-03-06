$(function () {
  initLogRocket();
  changeLogoLink();
  loadRookoutToken(); // Also loads Google Analytics after we know if we are logged in
  setTimeout(loadTabsForOS, 1000);
  setTimeout(fixDocusaurusTabsOnLoad, 1500);
  setTimeout(addKeyCombo, 1000);
});

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

function initGA(userEmail) {
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  const config = userEmail ? { 'user_id': userEmail } : {};
  gtag('js', new Date());
  gtag('config', 'UA-104510371-3', config); // Docs Tracker
  gtag('config', 'UA-104510371-4', config); // Unified Tracker
}

function gqlRequest(query, callback) {
  const ROOKOUT_TOKEN_URL = 'https://app.rookout.com/graphql';
  return $.get({
    url: ROOKOUT_TOKEN_URL,
    method: 'POST',
    xhrFields: {
      withCredentials: true,
    },
    contentType: 'application/json',
    data: JSON.stringify({
      query
    })

  }, callback)
}

function loadRookoutToken() {
  gqlRequest(`  {
    currentUserInfo {
      info {
        id
        username
        fullname
        email
      }
      orgs {
        name
        token
        isOrganicOrgMember
      }
    }
  }`, ({ data, errors } = {}) => {
    if (!data || errors) {
      setNoOrgMessage();
      return;
    }

    const orgInfo = data.currentUserInfo.orgs.find(org => org.name !== 'Sandbox' && org.isOrganicOrgMember);
    if (!orgInfo) {
      setNoOrgMessage();
      return;
    }
    setRookoutTokenInPage({ current_user: data.currentUserInfo.info, ...orgInfo });
  }).fail((err) => {
        setRookoutTokenInPage(null);
      });
}


const setNoOrgMessage = () => {
  $('.rookout-org-info').html('Log in to app.rookout.com to see your organization token.')
}


function setRookoutTokenInPage(data) {
  let error = false;

  if (data) {
    const token = data.token;
    const org_name = data.name || 'unknown';
    let current_user = data.current_user || null;

    if (token) {
      $("code:contains('[Your Rookout Token]')").each(function () {
        const elem = $(this);
        elem.addClass('_lr-hide'); // hide token from LogRocket
        elem.html(elem.html().replace(/\[Your Rookout Token]/g, token));
      })
      $('.rookout-org-info').html(`Showing token for <b>${org_name}</b>. Keep your token private.`);
      if (current_user) {
        if (window.LogRocket) {
          window.LogRocket.identify(current_user.email, {
            name: current_user.name,
            email: current_user.email,
          });
        }
        initGA(current_user.email);
      }
    } else {
      error = true;
    }
  } else {
    error = true;
  }

  if (error) {
    $('.rookout-org-info').html('Log in to <a href="https://app.rookout.com" target="_blank">app.rookout.com</a> to see your organization token');
    initGA(null);
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

function fixDocusaurusTabsOnLoad() {
  // THE ORIGINAL EVENT IN `codetabs.js` IS NOT ALWAYS WORKING. THIS IS A WORKAROUND !
  $('.nav-link').on('click', function(e) {
    const target = $(e.target);
    const groupId = target.attr('data-group');
    $(`.nav-link[data-group=${groupId}]`).removeClass('active');
    $(`.tab-pane[data-group=${groupId}]`).removeClass('active');
    target.addClass('active');
    $(`#${target.attr('data-tab')}`).addClass('active');
  });
}


  // add event listener on CMD + K
  document.onkeydown = function (e) {
    if((e.altKey || e.metaKey)  &&  e.code === 'KeyK') {
      const search = document.querySelector('.aa-DetachedSearchButton');
      if(search) {
        search.click()
      }
    }
}

// add key combo divs to the search input
function addKeyCombo() {
    const searchInput = document.querySelector('.aa-DetachedSearchButton')
  if (searchInput) {
    const wrapper = document.createElement('div')
    wrapper.classList.add('key-code-wrapper')
    const key1 = document.createElement('span')
    key1.classList.add('keycode-icon')

    const isMac =  navigator.userAgent.includes('Mac OS')
    key1.innerText = isMac ?  '⌘' : 'Alt'

    const key2 = document.createElement('span')
    key2.classList.add('keycode-icon')
    key2.innerText = 'K'
    wrapper.append(key1, key2)
    searchInput.append(wrapper)
  }
}
