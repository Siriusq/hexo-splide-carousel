// 生成html结构
module.exports = hexo => function (args, content) {
    const splideOptions = hexo.config.splide.options || {};
    const lines = content.trim().split('\n');
    const uniqueId = 'carousel-caption-' + Math.random().toString(36).substr(2, 9);

    // 检查是否有图片含有简介
    let hasCaption = false;

    const images = lines.map(line => {
        const matches = line.match(/!\[(.*?)\]\((.*?)\)/);
        if (matches) {
            const alt = matches[1];
            const src = matches[2];
            if (alt) hasCaption = true; // 只要有一张图片有简介，标记为 true
            return `<li class="splide__slide" data-caption="${alt}">
                <img data-splide-lazy="${src}" alt="${alt}" class="zoomable">
              </li>`;
        }
        return '';
    }).join('');

    // 如果至少有一张图片有简介，才生成简介部分
    // 根据是否有简介返回不同的 HTML 结构
    if (hasCaption) {
        return `
      <div class="carousel-container">
        <div class="splide" data-splide='${JSON.stringify(splideOptions)}' data-caption-id="${uniqueId}">
          <div class="splide__track">
            <ul class="splide__list">
              ${images}
            </ul>
          </div>
        </div>
        <div id="${uniqueId}" class="carousel-caption">
          ${args[0] || ' '}
        </div>
      </div>
    `;
    } else {
        return `
      <div class="carousel-container">
        <div class="splide" data-splide='${JSON.stringify(splideOptions)}'>
          <div class="splide__track">
            <ul class="splide__list">
              ${images}
            </ul>
          </div>
        </div>
      </div>
    `;
    }
};