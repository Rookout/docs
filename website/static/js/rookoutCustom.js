<!-- Global site tag (gtag.js) - Google Analytics -->
if (document.getElementById) document.write('<script async src="https://www.googletagmanager.com/gtag/js?id=UA-104510371-3"></script>');


window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());

gtag('config', 'UA-104510371-3');


window.addEventListener('load', async function () {
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

  await loadRookoutToken();
});


async function loadRookoutToken() {
  let isAdmin = false;

  const user = await getCurrentUser();
  console.log(user);

  if (user && user.orgs && user.orgs.length() > 0) {
    isAdmin = user.orgs[0].isAdmin;
  } else {
    return;
  }

  const orgId =  user.orgs[0].id;
  const orgToken = await getOrgToken(orgId, isAdmin);

  setRookoutTokenInPage(orgToken);
}


async function getCurrentUser() {
  const ROOKOUT_CURRENT_USER_URL = 'https://app.rookout.com/apiv1/current_user';
  let isAdmin = false;

  try {
    return await axios.get(ROOKOUT_CURRENT_USER_URL);
  } catch (err) {
    console.warn('Cannot extract organization token - not currently connected to app.rookout.com');
    return null;
  }
}


async function getOrgToken(orgId, isAdmin) {
  const ROOKOUT_TOKEN_URL_USER = 'https://app.rookout.com/apiv1/:org/token';
  const ROOKOUT_TOKEN_URL_ADMIN = 'https://app.rookout.com/apiv1/:org';

  let ROOKOUT_TOKEN_URL = isAdmin ? ROOKOUT_TOKEN_URL_ADMIN : ROOKOUT_TOKEN_URL_USER;
  ROOKOUT_TOKEN_URL = ROOKOUT_TOKEN_URL.replace(':org', orgId);

  try {
    const res = await axios.get(ROOKOUT_TOKEN_URL);
    if (!res) {
      return null;
    }

    return isAdmin ? res['agent_token'] : res['token'];
  } catch(err) {
    return null;
  }
}


function setRookoutTokenInPage(token) {
  const body = $('body');
  if (token) {
    body.innerHTML = body.innerHTML.replace('[Your Rookout Token]', token);
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
