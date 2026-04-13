/* eslint-disable no-console */
/* eslint-disable no-cond-assign */
/* eslint-disable import/prefer-default-export */

// group editable texts in single wrappers if applicable.
// this script should execute after script.js but before the the universal editor cors script
// and any block being loaded

export function decorateRichtext(container = document) {
  function deleteInstrumentation(element) {
    delete element.dataset.richtextResource;
    delete element.dataset.richtextProp;
    delete element.dataset.richtextFilter;
    delete element.dataset.richtextLabel;
  }

  // Auto-detect and instrument text components that don't have richtext attributes
  container.querySelectorAll('p, div, span, h1, h2, h3, h4, h5, h6').forEach((el) => {
    const hasText = el.textContent.trim().length > 0;
    const hasRichtextAttr = el.hasAttribute('data-richtext-prop');
    const isAlreadyInstrumented = el.hasAttribute('data-aue-resource') || el.closest('[data-aue-resource]');
    
    if (hasText && !hasRichtextAttr && !isAlreadyInstrumented && !el.querySelector('[data-aue-resource]')) {
      const parentSection = el.closest('.section');
      if (parentSection) {
        const path = window.location.pathname === '/' ? '/index' : window.location.pathname;
        const sectionId = parentSection.querySelector('[data-aue-resource]')?.getAttribute('data-aue-resource') 
          || `urn:aemconnection:${path}/jcr:content/root/${Date.now()}`;
        
        el.dataset.richtextResource = sectionId;
        el.dataset.richtextProp = 'text';
        el.dataset.richtextLabel = 'Text';
      }
    }
  });

  let element;
  while (element = container.querySelector('[data-richtext-prop]:not(div)')) {
    const {
      richtextResource,
      richtextProp,
      richtextFilter,
      richtextLabel,
    } = element.dataset;
    deleteInstrumentation(element);
    const siblings = [];
    let sibling = element;
    while (sibling = sibling.nextElementSibling) {
      if (sibling.dataset.richtextResource === richtextResource
        && sibling.dataset.richtextProp === richtextProp) {
        deleteInstrumentation(sibling);
        siblings.push(sibling);
      } else break;
    }

    let orphanElements;
    if (richtextResource && richtextProp) {
      orphanElements = document.querySelectorAll(`[data-richtext-id="${richtextResource}"][data-richtext-prop="${richtextProp}"]`);
    } else {
      const editable = element.closest('[data-aue-resource]');
      if (editable) {
        orphanElements = editable.querySelectorAll(`:scope > :not([data-aue-resource]) [data-richtext-prop="${richtextProp}"]`);
      } else {
        console.warn(`Editable parent not found or richtext property ${richtextProp}`);
        return;
      }
    }

    if (orphanElements.length) {
      console.warn('Found orphan elements of a richtext, that were not consecutive siblings of '
        + 'the first paragraph', orphanElements);
      orphanElements.forEach((orphanElement) => deleteInstrumentation(orphanElement));
    } else {
      const group = document.createElement('div');
      if (richtextResource) {
        group.dataset.aueResource = richtextResource;
        group.dataset.aueBehavior = 'component';
      }
      if (richtextProp) group.dataset.aueProp = richtextProp;
      if (richtextLabel) group.dataset.aueLabel = richtextLabel;
      if (richtextFilter) group.dataset.aueFilter = richtextFilter;
      group.dataset.aueType = 'richtext';
      element.replaceWith(group);
      group.append(element, ...siblings);
    }
  }
}
