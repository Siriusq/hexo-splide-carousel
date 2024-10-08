# hexo-splide-carousel
<p align="center">
    <a href="https://github.com/Siriusq/hexo-splide-carousel/blob/master/ReadmeAssets/CNREADME.md"><img src="https://img.shields.io/badge/简体中文_README-4285F4?style=for-the-badge&logo=googletranslate&logoColor=ffffff"/></a>
    <a href="https://siriusq.top/en/splide-demo.html"><img src="https://img.shields.io/badge/Live%20Demo-%23fac03d?style=for-the-badge&logo=github&logoColor=%23222222"/></a>
    <a href="https://github.com/Siriusq/hexo-splide-carousel/blob/master/LICENSE"><img src="https://img.shields.io/badge/License-MIT-%23e3eb98?style=for-the-badge"/></a>
    <a href="https://hexo.io/plugins/"><img src="https://img.shields.io/badge/HEXO-7.3.0-%230E83CD?style=for-the-badge&logo=hexo"/></a>
    <a href="https://www.npmjs.com/package/hexo-splide-carousel"><img src="https://img.shields.io/badge/NPM-10.8.2-%23CB3837?style=for-the-badge&logo=npm&logoColor=%23CB3837"/></a>
</p>

![preview.webp](https://s2.loli.net/2024/09/11/NoGmOD7g2uz6KEB.webp)

A package for **Hexo** blogs using the **NexT** theme, provides image carousel and zoom functionality using **Splide.js** and **medium-zoom** libraries.

## Features
- Integrates [Splide.js](https://splidejs.com/) to create responsive, customizable image carousels.
- Provides [medium-zoom](https://medium-zoom.francoischalifour.com/) functionality for zooming images with a smooth and clean effect.
- Provides a variety of custom style options, support dark mode settings.
- More splide options can be added to the configuration file, but they are not guaranteed to work properly.
- Compatible with theme NexT's pjax functions.
- The carousel component will occupy a fixed height. When NexT theme's lazyload function is enabled, clicking on the TOC will jump to the position accurately.

## Installation
1. Install the package via npm:
    ```bash
    npm install hexo-splide-carousel
    ```
2. Add the following configuration options to your Hexo `_config.yml` file:
   ```yaml
   # Image carousel and zoom
   splide:
     cdn: unpkg  # Options: unpkg, cdnjs, jsdelivr
     options:
       heightRatio: 0.618        # Aspect ratio
       lazyLoad: false           # Lazy loading, options: false, 'nearby', 'sequential'
       type: 'slide'             # Type, options: 'loop', 'slide'
       autoplay: false           # Autoplay
       interval: 3000            # Autoplay interval in milliseconds
       pauseOnHover: true        # Pause autoplay when hovering

     styles:
       arrowColor: '#fc8d5d'             # Arrow color for navigation buttons
       arrowHoverColor: '#fc6423'        # Arrow color on hover
       paginationColor: '#fc8d5d'        # Pagination button color when inactive
       paginationActiveColor: '#fc6423'  # Pagination button color when active
       paginationHoverColor: '#fc6423'   # Pagination button color on hover
       borderRadius: 1px                 # Border radius
       borderColor:
         light: "#eee"  # Border color for light theme
         dark: "#444"   # Border color for dark theme
       shadowColor:
         light: "rgba(0, 0, 0, 0.1)"  # Shadow color for light theme
         dark: "rgba(0, 0, 0, 0.3)"   # Shadow color for dark theme

     dark_mode: auto  # Dark mode, options: auto, true, false. auto will follow the theme of the browser.
     enable_medium_zoom: false  # Enable medium zoom, do not enable together with the theme's medium zoom option
   ```

## Usage
To create image carousels using **Splide.js**, wrap your images inside the `{% splide %}` or `{% sc %}` tags, e.g.:
```
{% splide %}
![alt1](xxx.png)
![alt2](xxx.png)
![alt3](xxx.png)
{% endsplide %}
```
or
```
{% sc %}
![alt1](xxx.png)
![alt2](xxx.png)
![alt3](xxx.png)
{% endsc %}
```
For more usage instructions, please visit [Hexo Splide Carousel Live Demo](https://theme-next.js.org/docs/tag-plugins/group-pictures).

## Configuration
### Splide
In the `options` section of `_config.yml`, you can define global default settings for Splide. These settings will apply to all carousels. You can add more [Splide options](https://splidejs.com/guides/options/#options) here, but not all options are guaranteed to work properly.
```yaml
splide:
  options:
    heightRatio: 0.618        # Aspect ratio
    lazyLoad: false           # Lazy loading, options: false, 'nearby', 'sequential'
    type: 'slide'             # Type, options: 'loop', 'slide'
    autoplay: false           # Autoplay
    interval: 3000            # Autoplay interval in milliseconds
    pauseOnHover: true        # Pause autoplay when hovering
    # More Splide options can be added here
```

You can also add local settings directly inside the `{% splide %}` tag in the markdown file. Separate the options with spaces. Local settings will only apply to the specific carousel defined by the tag, and they will override the global default settings. For example, the following configuration enables looping and autoplay for the current carousel:
```
{% splide type:'loop' autoplay:true %}
![Caption 1](xxx.png)
![Caption 2](xxx.png)
![Caption 3](xxx.png)
{% endsplide %}
```

### medium-zoom
- The `medium_zoom.enabled` option in the `_config.yml` file allows you to control whether to use the medium-zoom library.
- The zoom function is always available whether the image is wrapped in the `{% splide %}` tag or not.
- Please do not enable medium-zoom or fancybox function in your theme's config file at the same time when enable this.

## Dependency
- [Splide @4.1.4](https://github.com/Splidejs/splide)
- [medium-zoom @1.1.0](https://github.com/francoischalifour/medium-zoom)

## Known Issues
- When medium-zoom is enabled, there is a chance that some images may not zoom correctly. For more details, see [images in a row with hardcoded height, look bad when zoomed in #147](https://github.com/francoischalifour/medium-zoom/issues/147).
- Currently, the carousel component’s dark and light themes are adjusted based on the browser’s theme settings. It does not support some themes' built-in light/dark toggle features, as each theme handles dark mode differently, making it impossible to accommodate every theme.
- The NexT and Butterfly themes have been tested and work as expected. Other themes are not guaranteed to function properly. Additionally, due to my limited front-end knowledge, the carousel component is fully compatible only with the NexT theme.
- Images smaller than the carousel container will be enlarged to fill the carousel container.
- Do not enable the theme's built-in medium-zoom feature, as it may cause image aspect ratios to be distorted within the carousel during zoom. If you need image zoom functionality, please use the medium-zoom adapted in this package or the fancybox provided by the theme.
- The lazyload feature provided by Splide conflicts with the theme's fancybox. When both are enabled, fancybox cannot retrieve the image path. If you need to use fancybox, please set Splide's lazyLoad to false.
- It is not compatible with the lazyload feature built into the Butterfly theme.
- When Splide's lazyload feature is enabled, the first image in the carousel will always be loaded, regardless of whether the NexT theme's lazyload is enabled.
- "To resolve conflicts, the placeFocusBack feature of Fancybox is disabled on pages containing carousel components, meaning that after closing the Fancybox zoom window, the page will not jump to the position of the image that was displayed before closing."

## Version Update Log

### 1.1.0
- Added a carousel tag `{% sc %}` for use in markdown files.

### 1.2.0
- Adjusted Splide's lazy load feature to be compatible with the NexT theme's built-in Fancybox zoom functionality.

### 1.2.1
- Resolved the issue where Fancybox's `placeFocusBack` feature caused pagination confusion in carousel components.
- Fixed the problem where Fancybox added cloned images created by Splide for looped carousel components.
- Increased the clickable area of pagination buttons.

## License
This project is licensed under the MIT License.