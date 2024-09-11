// 页面加载事件监听
document.addEventListener('DOMContentLoaded', function () {
    splideLoadingHandler();
    initGlobalMediumZoom();
});

document.addEventListener('pjax:success', function () {
    splideLoadingHandler();
    initGlobalMediumZoom();
});

// Splid 加载处理
function splideLoadingHandler() {
    // 检查页面是否含有轮播图片
    const splideEl = document.querySelector('.splide');
    if (!splideEl) {
        return; // 如果不存在轮播，则不执行初始化
    }

    // 检查是否开启Next主题的动画
    const isMotionEnabled = typeof CONFIG !== 'undefined' && CONFIG && CONFIG.motion && CONFIG.motion.enable;
    if (isMotionEnabled) {
        // Motion 开启时延迟加载轮播组件，等待动画完成。把组件加入动画有bug，一直搞不定，只能曲线救国
        setTimeout(function () {
            // 初始化轮播组件
            initSplide();
        }, 500);  // 延迟 500ms，确保动画完成后再初始化
    } else {
        // Motion 关闭时立即初始化
        initSplide();
    }

    // 初始化轮播组件中的 Medium Zoom
    if (mediumZoomEnabled) {
        initCarouselMediumZoom();
    }

    // 应用主题样式
    applySplideStyle();
}

// 初始化 Splide
function initSplide() {
    const splideElements = document.querySelectorAll('.splide');
    splideElements.forEach(splideEl => {
        const options = JSON.parse(splideEl.getAttribute('data-splide'));
        // 如果轮播组件中只有一张图片，则隐藏箭头
        const slideCount = splideEl.querySelectorAll('.splide__slide').length;
        if (slideCount <= 1) {
            options.arrows = false;
        }
        // 简介设置
        const splide = new Splide(splideEl, options);
        splide.on('mounted move', function () {
            const activeSlide = splide.Components.Slides.getAt(splide.index);
            const caption = activeSlide.slide.dataset.caption;
            const captionId = splideEl.getAttribute('data-caption-id');

            const captionElement = document.getElementById(captionId);
            if (captionElement) {
                captionElement.innerText = caption || '';  // 如果没有简介，设置为空字符串
            }
        });
        splide.mount();        
    });
}

// 应用主题明暗样式
function applySplideStyle() {
    const applyThemeStyles = (theme, splideStyles) => {
        const borderColor = theme === 'dark' ? splideStyles.borderColor.dark : splideStyles.borderColor.light;
        const shadowColor = theme === 'dark' ? splideStyles.shadowColor.dark : splideStyles.shadowColor.light;
        document.documentElement.style.setProperty('--carousel-border-color', borderColor);
        document.documentElement.style.setProperty('--carousel-shadow-color', shadowColor);
        document.documentElement.style.setProperty('--carousel-border-radius', splideStyles.borderRadius);
        document.documentElement.style.setProperty('--carousel-arrow-color', splideStyles.arrowColor);
        document.documentElement.style.setProperty('--carousel-arrow-hover-color', splideStyles.arrowHoverColor);
        document.documentElement.style.setProperty('--carousel-pagination-color', splideStyles.paginationColor);
        document.documentElement.style.setProperty('--carousel-pagination-active-color', splideStyles.paginationActiveColor);
        document.documentElement.style.setProperty('--carousel-pagination-hover-color', splideStyles.paginationHoverColor);
    };

    let theme = 'light';
    if (window.splideDarkMode === 'auto') {
        theme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } else if (window.splideDarkMode === 'true') {
        theme = 'dark';
    }
    applyThemeStyles(theme, window.splideStyles);

    if (window.splideDarkMode === 'auto') {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            applyThemeStyles(e.matches ? 'dark' : 'light', window.splideStyles);
        });
    }
}

// 初始化非轮播图片的 Medium Zoom
function initGlobalMediumZoom() {
    // 检查是否启用 medium-zoom
    if (!mediumZoomEnabled) {
        return;
    }
    const zoomOutsideCarousel = mediumZoom('img:not(.splide .zoomable)', {
        background: 'rgba(0, 0, 0, 0.8)',
        margin: 24
    });
}

// 初始化轮播组件中的 Medium Zoom
function initCarouselMediumZoom() {
    const zoomCarousel = mediumZoom('.zoomable', {
        background: 'rgba(0, 0, 0, 0.8)',
        margin: 24,
        onOpen: (zoom) => {
            const img = zoom.target; // 获取正在缩放的图片
            img.classList.add('zooming'); // 添加一个缩放时的 class
        },
        onClose: (zoom) => {
            const img = zoom.target; // 获取缩放的图片
            img.classList.remove('zooming'); // 移除缩放时的 class
        }
    });

    zoomCarousel.on('open', () => {
        // 隐藏箭头和分页按钮
        document.querySelectorAll('.splide__arrow, .splide__pagination').forEach(el => {
            el.style.display = 'none';
        });
    });

    zoomCarousel.on('close', () => {
        // 重新显示箭头和分页按钮
        document.querySelectorAll('.splide__arrow, .splide__pagination').forEach(el => {
            el.style.display = '';
        });
    });
}