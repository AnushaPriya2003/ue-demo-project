import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  // --- Universal Editor instrumentation ---
  const path = window.location.pathname === '/' ? '/index' : window.location.pathname;
  block.setAttribute('data-aue-resource', `urn:aemconnection:${path}/jcr:content/root/footer`);
  block.setAttribute('data-aue-type', 'component');
  block.setAttribute('data-aue-model', 'footer');
  block.setAttribute('data-aue-label', 'Footer');

  // load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
