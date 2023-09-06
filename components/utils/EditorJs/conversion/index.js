export const jsonToHtml = async (data, layout) => {
    const convertedHtml = await convertDataToHtml(data.blocks, layout)
    return convertedHtml;
};

const embed = async (data) => {
    switch (data.service) {
        case "vimeo":
            return `<iframe src="${data.embed}" height="${data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
        case "youtube":
            return `<iframe width="${data.width}" height="${data.height}" src="${data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
        default:
            throw new Error(
                "Only Youtube and Vime Embeds are supported right now."
            );
    }
}

async function convertDataToHtml(blocks, layout) {
    var convertedHtml = "";
    layout = layout.toString().toLowerCase().replace(" ", "_");
    convertedHtml += `<div class="${layout}_blog_posr_conatainer">`
    blocks.map(block => {

        switch (block.type) {
            case "header":
                convertedHtml += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`;
                break;
            case "embed":
                switch (block.data.service) {
                    case "vimeo":
                        convertedHtml += `<iframe src="${block.data.embed}" height="${block.data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    case "youtube":
                        convertedHtml += `<iframe width="${block.data.width}" height="${block.data.height}" src="${block.data.embed}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
                    case "codepen":
                        convertedHtml += `<iframe src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    case "instagram":
                        convertedHtml += `<iframe src="${block.data.embed}" width="${block.data.width}" height="${block.data.height}" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
                    // default:
                    //     throw new Error(
                    //         "Only Youtube and Vime Embeds are supported right now."
                    //     );
                }
                break;
            case "paragraph":
                convertedHtml += `<p class="${layout}_blog_post_paragraph">${block.data.text}</p>`;
                break;
            case "delimiter":
                convertedHtml += "<hr />";
                break;
            case "image":
                convertedHtml += `<img class="${layout}_blog_post_image" src="${block.data.file.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                break;
            case "simpleImage":
                convertedHtml += `<img class="${layout}_blog_post_image" src="${block.data.url}" title="${block.data.caption}" /><br /><em>${block.data.caption}</em>`;
                break;
            case "list":
                convertedHtml += "<ul>";
                block.data.items.forEach(function (li) {
                    convertedHtml += `<li>${li}</li>`;
                });
                convertedHtml += "</ul>";
                break;
            case "code":
                convertedHtml += `<pre><code>${block.data.code}</pre></code>`;
                break;
            case "AnyButton":
                convertedHtml += `<a class="${layout}_btn btn--gray" target="_blank" type="button" rel="nofollow noindex noreferrer" href="${block.data.link}">${block.data.text}</a>`;
                break;
            case "quote":
                // convertedHtml += `<blockquote>${block.data.text}</blockquote> - ${block.data.caption}`
                convertedHtml += `<q>${block.data.text}</q> - ${block.data.caption}`
                break;
            default:
                console.log("Unknown block type", block.type);
                break;
        }
    });

    convertedHtml += `</div>`
    return convertedHtml;
}

