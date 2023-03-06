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




const setNoOrgMessage = () => {
  $('.rookout-org-info').html('Log in to app.rookout.com to see your organization token.')
};

const replaceTokenPlaceholders = (token, orgName) => {
  $("code:contains('[Your Rookout Token]')").each(function () {
    const elem = $(this);
    elem.addClass('_lr-hide'); // hide token from LogRocket
    elem.html(elem.html().replace(/\[Your Rookout Token]/g, token));
  });
  $('.rookout-org-info').html(`Showing token for <b>${orgName}</b>. Keep your token private.`);
};

const initLogrocket = (userName, userEmail) => {
  if (!window.LogRocket) {
    return;
  }
    window.LogRocket.identify(userEmail, {
      name: userName,
      email: userEmail,
    });
};

const setLoginRequiredText = () => {
  $('.rookout-org-info').html('Log in to <a href="https://app.rookout.com" target="_blank">app.rookout.com</a> to see your organization token');
};

const replacePlaceholderOnUrlChange = (token, orgName) => {
  let currentUrl = window.location.href;
  setInterval(() => {
    const newUrl = window.location.href;
    if (newUrl === currentUrl) {
      return;
    }

    replaceTokenPlaceholders(token, orgName);
    currentUrl = newUrl;
  }, 2500);
};

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

    if (data.currentUserInfo.info) {
      const { fullname: name, email } = data.currentUserInfo.info;
      initLogrocket(name, email);
      initGA(email);
    }

    const orgInfo = data.currentUserInfo.orgs.find(org => org.name !== 'Sandbox' && org.isOrganicOrgMember);
    if (!orgInfo) {
      setNoOrgMessage();
      return;
    }
    replaceTokenPlaceholders(orgInfo.token, orgInfo.name);
    replacePlaceholderOnUrlChange(orgInfo.token, orgInfo.name);
  }).fail((err) => {
    setLoginRequiredText();
    initGA(null);
  });
}


// TODO: FIX
function loadTabsForOS() {
  const page_tabs = $('[id^="page-tab"]');
  page_tabs.on("load change", function(e) {
    const osToTab = {
      'default': '1',
      'linux': '1',
      'osx': '1',
      'windows': '2',
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
