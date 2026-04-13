export default function decorate(block) {
    // 1. Component Level Attributes
    block.setAttribute('data-aue-resource', 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero');
    block.setAttribute('data-aue-type', 'component');
    block.setAttribute('data-aue-label', 'Hero Banner');

    // 2. Headline (Changed 'title' to 'text' and 'text' to 'richtext' to match your JSON)
    const title = block.querySelector('h1');
    if (title) {
        title.setAttribute('data-aue-prop', 'text'); 
        title.setAttribute('data-aue-type', 'richtext');
        title.setAttribute('data-aue-label', 'Headline');
    }

    // 3. Image
    const img = block.querySelector('img');
    if (img) {
        img.setAttribute('data-aue-prop', 'image');
        img.setAttribute('data-aue-type', 'media');
        img.setAttribute('data-aue-label', 'Background Image');
        
        // Add this to make the 'Alt' field in your JSON work
        img.setAttribute('data-aue-prop', 'imageAlt');
    }
}