import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  // --- Universal Editor instrumentation --
  block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/cards');
  block.setAttribute('data-aue-type', 'container');
  block.setAttribute('data-aue-filter', 'cards');
  block.setAttribute('data-aue-label', 'Cards');

  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);

    li.setAttribute('data-aue-type', 'component');
    li.setAttribute('data-aue-model', 'card');
    li.setAttribute('data-aue-label', 'Card');

    // Instrument list item as a Card if needed, though prompt implies fields
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
        div.setAttribute('data-aue-prop', 'text');
        div.setAttribute('data-aue-type', 'richtext');
        div.setAttribute('data-aue-label', 'Text');
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));

    const optImg = optimizedPic.querySelector('img');
    optImg.setAttribute('data-aue-prop', 'image');
    optImg.setAttribute('data-aue-type', 'media');
    optImg.setAttribute('data-aue-label', 'Image');

    img.closest('picture').replaceWith(optimizedPic);
  });
  block.replaceChildren(ul);
}
