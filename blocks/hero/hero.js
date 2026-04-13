export default function decorate(block) {
    // 1. Component Level Attributes
    const path = window.location.pathname === '/' ? '/index' : window.location.pathname;
    block.setAttribute('data-aue-resource', `urn:aemconnection:${path}/jcr:content/root/hero`);
    block.setAttribute('data-aue-type', 'component');
    block.setAttribute('data-aue-model', 'hero');
    block.setAttribute('data-aue-label', 'Hero Banner');

    // Headline
    const title = block.querySelector('h1');
    if (title) {
        title.setAttribute('data-aue-prop', 'text'); // Must match "name": "text" in JSON
        title.setAttribute('data-aue-type', 'richtext');
        title.setAttribute('data-aue-label', 'Headline');
    }

    // 3. Image (MATCHING YOUR JSON)
    const img = block.querySelector('img');
    if (img) {
        img.setAttribute('data-aue-prop', 'image'); // Matches "name": "image" in your JSON
        img.setAttribute('data-aue-type', 'media');
        img.setAttribute('data-aue-label', 'Background Image');
    }
}