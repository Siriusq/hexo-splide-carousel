const fs = require('fs');
const path = require('path');

// 注册 Hexo 自定义标签
hexo.extend.tag.register(
  "splide",
  require('./lib/scripts/tags/splide-tag')(hexo),
  { ends: true },
);

// 加载 lib 中的文件
const splideInit = fs.readFileSync(path.resolve(__dirname, "./lib/scripts/splide-init.js"), { encoding: "utf8" });
const customStyle = fs.readFileSync(path.resolve(__dirname, "./lib/assets/splide-custom.css"), { encoding: "utf8" });

// 读取 Hexo _config.yml 中的配置
const splideStyles = hexo.config.splide.styles || {};
const darkMode = hexo.config.splide['dark_mode'];
const mediumZoomEnabled = hexo.config.splide.enable_medium_zoom || false;
const cdn = hexo.config.splide.cdn || 'unpkg';

// CDN 切换
let splideJsUrl, splideCssUrl, mediumZoomJsUrl;
switch (cdn) {
  case 'jsdelivr':
    splideJsUrl = "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js";
    splideCssUrl = "https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css";
    mediumZoomJsUrl = "https://cdn.jsdelivr.net/npm/medium-zoom@1.1.0/dist/medium-zoom.min.js";
    break;
  case 'cdnjs':
    splideJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/splidejs/4.1.4/js/splide.min.js";
    splideCssUrl = "https://cdnjs.cloudflare.com/ajax/libs/splidejs/4.1.4/css/splide.min.css";
    mediumZoomJsUrl = "https://cdnjs.cloudflare.com/ajax/libs/medium-zoom/1.1.0/medium-zoom.min.js";
    break;
  case 'unpkg':
  default:
    splideJsUrl = "https://unpkg.com/@splidejs/splide@4.1.4/dist/js/splide.min.js";
    splideCssUrl = "https://unpkg.com/@splidejs/splide@4.1.4/dist/css/splide.min.css";
    mediumZoomJsUrl = "https://unpkg.com/medium-zoom@1.1.0/dist/medium-zoom.min.js";
    break;
}

// 注入 Splide.js，设置全局变量
hexo.extend.injector.register(
  'body_end', // 注入到 body 标签结束前
  () => {
    return `
      <script src="${splideJsUrl}"></script>
      <script>
        window.splideStyles = ${JSON.stringify(splideStyles)};
        window.splideDarkMode = '${darkMode}';
        window.mediumZoomEnabled = ${mediumZoomEnabled};
      </script>
      <script type="text/javascript">${splideInit}</script>      
    `;
  },
  'default'
);

// 若启用则注入 medium-zoom.js
if (mediumZoomEnabled) {
  hexo.extend.injector.register(
    'body_end', // 注入到 body 标签结束前
    () => {
      return `
        <script src="${mediumZoomJsUrl}"></script>   
      `;
    },
    'default'
  );
}

// 注入自定义样式
hexo.extend.injector.register(
  "head_begin",
  () => {
    return `
      <link href="${splideCssUrl}" rel="stylesheet">
      <style type="text/css">${customStyle}</style>
      `;
  },
  "default"
);
