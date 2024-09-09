# hexo-splide-carousel
A package for **Hexo** blogs using the **NexT** theme, provides image carousel and zoom functionality using **Splide.js** and **medium-zoom** libraries.

## Features
- Integrates **Splide.js** to create responsive, customizable image carousels.
- Provides **medium-zoom** functionality for zooming images with a smooth and clean effect.
- Provides a variety of custom style options, support theme light and dark settings.
- More splide options can be added to the configuration file, but they are not guaranteed to work properly.
- Compatible with NexT's lazy loading and pjax functions.

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
        lazyLoad: 'nearby'        # Lazy loading, options: false, 'nearby', 'sequential'
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

    dark_mode: auto  # Dark mode, options: auto, true, false
    enable_medium_zoom: true  # Enable medium zoom, do not enable together with the theme's medium zoom option
    ```

## Usage
To create image carousels using **Splide.js**, wrap your images inside the `{% splide %}` tags, e.g.:
```
{% splide %}
![alt1](xxx.png)
![alt2](xxx.png)
![alt3](xxx.png)
{% endsplide %}
```

## Configuration
### Splide
[More splide options](https://splidejs.com/guides/options/#options) can be added to options section in the `_config.yml`, but they are not guaranteed to work properly. 
```yaml
 splide:
    options:
        heightRatio: 0.618        # Aspect ratio
        lazyLoad: 'nearby'        # Lazy loading, options: false, 'nearby', 'sequential'
        type: 'slide'             # Type, options: 'loop', 'slide'
        autoplay: false           # Autoplay
        interval: 3000            # Autoplay interval in milliseconds
        pauseOnHover: true        # Pause autoplay when hovering
        # More splide options can be added here.
```

### medium-zoom
- The `medium_zoom.enabled` option in the `_config.yml` file allows you to control whether to use the medium-zoom library.
- The zoom function is always available whether the image is wrapped in the `{% splide %}` tag or not.
- Please do not enable medium-zoom or fancybox function in `_config.next.yml` at the same time.

## Dependency
- [Splide @4.1.4](https://github.com/Splidejs/splide)
- [medium-zoom @1.1.0](https://github.com/francoischalifour/medium-zoom)

## License
This project is licensed under the MIT License.