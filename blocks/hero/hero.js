export default function decorate(block) {
    // 1. Tell UE this entire block is the "Hero" component
    // The resource path should match your content path in Google Drive/AEM
    block.dataset.aueResource = 'urn:aemconnection:/content/ue-demo/en/home/jcr:content/root/hero';
    block.dataset.aueType = 'component';
    block.dataset.aueLabel = 'Hero Banner';

    // 2. Find the Heading (h1) and make it editable
    const title = block.querySelector('h1');
    if (title) {
        title.dataset.aueProp = 'title';
        title.dataset.aueType = 'text';
        title.dataset.aueLabel = 'Headline';
    }

    // 3. Find the Image and make it editable
    const img = block.querySelector('img');
    if (img) {
        img.dataset.aueProp = 'image';
        img.dataset.aueType = 'media';
        img.dataset.aueLabel = 'Background Image';
    }
}
