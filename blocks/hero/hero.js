export default function decorate(block) {
  // Universal Editor instrumentation — block must be 'container' so
  // UE can surface child field editors in the right rail.
  const path = window.location.pathname === '/' ? '/index' : window.location.pathname;
  block.setAttribute('data-aue-resource', `urn:aemconnection:${path}/jcr:content/root/hero`);
  block.setAttribute('data-aue-type', 'container'); // MUST be 'container', not 'component'
  block.setAttribute('data-aue-model', 'hero');     // Links to component-models.json id="hero"
  block.setAttribute('data-aue-label', 'Hero Banner');

  // Headline — prop name must exactly match "name": "text" in component-models.json
  const title = block.querySelector('h1, h2');
  if (title) {
    title.setAttribute('data-aue-prop', 'text');
    title.setAttribute('data-aue-type', 'richtext');
    title.setAttribute('data-aue-label', 'Headline');
  }

  // Image — prop name must exactly match "name": "image" in component-models.json
  const img = block.querySelector('img');
  if (img) {
    img.setAttribute('data-aue-prop', 'image');
    img.setAttribute('data-aue-type', 'media');
    img.setAttribute('data-aue-label', 'Background Image');
  }
}