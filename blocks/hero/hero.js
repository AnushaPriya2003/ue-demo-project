export default function decorate(block) {
    // Use setAttribute to ensure correct naming
    block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero');
    block.setAttribute('data-aue-type', 'component');
    block.setAttribute('data-aue-label', 'Hero Banner');

    const title = block.querySelector('h1');
    if (title) {
        title.setAttribute('data-aue-prop', 'title');
        title.setAttribute('data-aue-type', 'text');
        title.setAttribute('data-aue-label', 'Headline');
    }

    const img = block.querySelector('img');
    if (img) {
        img.setAttribute('data-aue-prop', 'image');
        img.setAttribute('data-aue-type', 'media');
        img.setAttribute('data-aue-label', 'Background Image');
    }
}
