import React from 'react';
// eslint-disable-next-line import/no-unresolved
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

const SupportEmail = () => {
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;
  const { supportEmail, supportType } = customFields || {};

  switch (supportType) {
    case 'mailto':
      return <a href={`mailto:${supportEmail}`} target={"_blank"}>{supportEmail}</a>;
    case 'href':
      return <a href={supportEmail} target={"_blank"}>{supportEmail}</a>;
    default:
      return '';
  }
};
export default SupportEmail;
