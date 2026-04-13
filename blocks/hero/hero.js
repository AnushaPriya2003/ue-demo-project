export default function decorate(block) {
    // 1. Label MUST be 'Hero' to match component-definition.json
    block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero');
    block.setAttribute('data-aue-type', 'component');
    block.setAttribute('data-aue-label', 'Hero'); 

    // 2. Prop MUST be 'text' to match component-models.json
    const title = block.querySelector('h1');
    if (title) {
        title.setAttribute('data-aue-prop', 'text'); 
        title.setAttribute('data-aue-type', 'richtext');
        title.setAttribute('data-aue-label', 'Headline');
    }

    // 3. Prop MUST be 'image' to match component-models.json
    const img = block.querySelector('img');
    if (img) {
        img.setAttribute('data-aue-prop', 'image');
        img.setAttribute('data-aue-type', 'media');
        img.setAttribute('data-aue-label', 'Background Image');
    }
}