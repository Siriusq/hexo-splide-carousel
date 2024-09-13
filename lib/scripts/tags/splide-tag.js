// 生成html结构
module.exports = hexo => function (args, content) {
  // 从Hexo配置中获取全局默认设置
  const globalSplideOptions = hexo.config.splide.options || {};
  // 解析标签中的局部设置，比如 {% splide type:'loop' autoplay:true %}
  const splideSettings = args.reduce((acc, arg) => {
    const [key, value] = arg.split(':');
    acc[key] = value;
    return acc;
  }, {});
  // 合并全局设置与标签中的设置，标签中的设置优先
  const splideOptions = { ...globalSplideOptions, ...splideSettings };
  // Markdown 中的每行图片
  const lines = content.trim().split('\n');
  //生成图片简介元素的id
  const uniqueId = 'carousel-caption-' + Math.random().toString(36).substr(2, 9);
  // 检查是否有图片含有简介
  let hasCaption = false;
  // 检测 lazyLoad 状态
  const isLazyLoad = splideOptions.lazyLoad !== false;
  // 生成图片的html
  const images = lines.map(line => {
    const matches = line.match(/!\[(.*?)\]\((.*?)\)/);
    if (matches) {
      const alt = matches[1];
      const src = matches[2];
      if (alt) hasCaption = true; // 只要有一张图片有简介，标记为 true
      // 根据 lazyLoad 状态生成图片结构
      const imgTag = isLazyLoad
        ? `<img data-splide-lazy="${src}" alt="${alt}" class="zoomable">`
        : `<img src="${src}" alt="${alt}" class="zoomable">`;
      return `<li class="splide__slide" data-caption="${alt}">${imgTag}</li>`;
    }
    return '';
  }).join('');

  // 生成最终 HTML，如果至少有一张图片有简介，才生成简介部分以及id
  return `
    <div class="carousel-container">
      <div class="splide" data-splide='${JSON.stringify(splideOptions)}' ${hasCaption ? `data-caption-id="${uniqueId}"` : ''}>
        <div class="splide__track">
          <ul class="splide__list">${images}</ul>
        </div>
      </div>
      ${hasCaption ? `<div id="${uniqueId}" class="carousel-caption">${args[0] || ' '}</div>` : ''}
    </div>
  `;
};