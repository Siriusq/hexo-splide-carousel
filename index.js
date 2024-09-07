// 注册 Hexo 自定义标签
hexo.extend.tag.register(
  "splide",
  function (args, content) {
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
  },
  { ends: true },
);

// 在 'after_render:html' 过滤器中添加 CDN 引入的内容
hexo.extend.filter.register('after_render:html', function (content) {
  const splideStyles = hexo.config.splide.styles || {};
  const cdn = hexo.config.splide.cdn || 'jsdelivr';
  const darkMode = hexo.config.splide['dark-mode'] || 'auto';

  let splideJsUrl, splideCssUrl, mediumZoomJsUrl;
  switch (cdn) {
    case 'unpkg':
      splideJsUrl = "https://unpkg.com/@splidejs/splide/dist/js/splide.min.js";
      splideCssUrl = "https://unpkg.com/@splidejs/splide/dist/css/splide.min.css";
      mediumZoomJsUrl = "https://unpkg.com/medium-zoom/dist/medium-zoom.min.js";
      break;
    case 'cdnjs':
      splideJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/Splide/3.6.9/splide.min.js";
      splideCssUrl = "https://cdnjs.cloudflare.com/ajax/libs/Splide/3.6.9/splide.min.css";
      mediumZoomJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/medium-zoom/1.0.6/medium-zoom.min.js";
      break;
    case 'jsdelivr':
    default:
      splideJsUrl = "https://cdn.jsdelivr.net/npm/@splidejs/splide/dist/js/splide.min.js";
      splideCssUrl = "https://cdn.jsdelivr.net/npm/@splidejs/splide/dist/css/splide.min.css";
      mediumZoomJsUrl = "https://cdn.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js";
      break;
  }

  const script = `
      <script src="${splideJsUrl}"></script>
      <link href="${splideCssUrl}" rel="stylesheet">
      <script src="${mediumZoomJsUrl}"></script>
      <link href="/css/splide-custom.css" rel="stylesheet">
      <script>
        window.splideStyles = ${JSON.stringify(splideStyles)};
        window.splideDarkMode = '${darkMode}';
      </script>
      <script src="/js/splide-init.js"></script>
    `;

  return content.replace('</body>', script + '</body>');
});