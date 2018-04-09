/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');

const siteConfig = require(process.cwd() + '/siteConfig.js');

function imgUrl(img) {
  return siteConfig.baseUrl + 'img/' + img;
}

function docUrl(doc, language) {
  return siteConfig.baseUrl + 'docs/' + (language ? language + '/' : '') + doc;
}

function pageUrl(page, language) {
  return siteConfig.baseUrl + (language ? language + '/' : '') + page;
}

class Button extends React.Component {
  render() {
    return (
      <div className="pluginWrapper buttonWrapper">
        <a className="button" href={this.props.href} target={this.props.target}>
          {this.props.children}
        </a>
      </div>
    );
  }
}

Button.defaultProps = {
  target: '_self',
};

const SplashContainer = props => (
  <div className="homeContainer">
    <div className="homeSplashFade">
      <div className="wrapper homeWrapper">{props.children}</div>
    </div>
  </div>
);

const Logo = props => (
  <div className="rook-projectLogo">
    <img src={props.img_src} />
  </div>
);

const ProjectTitle = props => (
  <h2 className="projectTitle">
    <Logo img_src={imgUrl('logos/rookout_logo_horizontal.svg')} />
    <small>{siteConfig.tagline}</small>
  </h2>
);

const PromoSection = props => (
  <div className="section promoSection">
    <div className="promoRow">
      <div className="pluginRowBlock">{props.children}</div>
    </div>
  </div>
);

const HomeSplash = () => (
  <SplashContainer>
    <div className="inner rook-paddingBottomHalf">
      <ProjectTitle />
      <PromoSection>
        <p>
            With just a few clicks, you can choose and define various rules to collect any data you want,
            by setting non-breaking “breakpoints” in the code. You can then send the data anywhere –
            your analytics, storage or alerting tools or just examine it in our IDE.
        </p>
      </PromoSection>
    </div>
  </SplashContainer>
);

const Block = props => (
  <div className="rook-categories rook-paddingBottom rook-paddingTopTwoThird">
      {props.children.map(child => {
          return (
            <div key={child.title}>
              <div className="blockImage">
                <a href={child.link}>
                  <img src={child.image} />
                </a>
              </div>
              <div className="rook-blockContent">
                <a href={child.link}>
                  <h2>
                    {child.title}
                  </h2>
                </a>
              </div>
            </div>
          )
      })}
  </div>
);

const Categories = () => (
  <Block>
    {[
        {
            link: docUrl('getting-started.html'),
            image: imgUrl('categories/egg.png'),
            title: 'Getting Started',
        },
        {
            link: docUrl('installation.html'),
            image: imgUrl('categories/servers.png'),
            title: 'Installation',
        },
        {
            link: docUrl('integration.html'),
            image: imgUrl('categories/puzzle.png'),
            title: 'Integration',
        },
        {
            link: docUrl('reference.html'),
            image: imgUrl('categories/doc.png'),
            title: 'Reference',
        },
        {
            link: pageUrl('troubleshooting.html'),
            image: imgUrl('categories/troubleshooting.png'),
            title: 'Troubleshooting',
        }
    ]}
  </Block>
);

const SearchBar = () => (
  <div className="rook-searchContainer">
    <div className="rook-searchTitle">
      <h2>How can we help?</h2>
    </div>
    <div className="rook-searchBar">
      <input type="text" />
      <img src={imgUrl('icons/search.svg')} />
    </div>
  </div>
);


class Index extends React.Component {
  render() {
    return (
      <div>
        <HomeSplash />
        <div className="rook-homeMainContainer">
          <SearchBar />
          <Categories />
        </div>
      </div>
    );
  }
}

module.exports = Index;
