function initSplideAndZoom() {
    const splideElements = document.querySelectorAll('.splide');

    splideElements.forEach(splideEl => {
        const options = JSON.parse(splideEl.getAttribute('data-splide'));

        const slideCount = splideEl.querySelectorAll('.splide__slide').length;
        if (slideCount <= 1) {
            options.arrows = false;
        }

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

    // Medium Zoom 初始化
    const zoom = mediumZoom('.zoomable', {
        background: 'rgba(0, 0, 0, 0.8)',
        margin: 24,
        container: 'splide',
        onOpen: (zoom) => {
            const img = zoom.target; // 获取正在缩放的图片

            // 如果图片在缩放过程中需要调整宽高比，可以考虑用 CSS 控制，而不是直接改动 style
            img.classList.add('zooming'); // 添加一个缩放时的 class

            // 不再手动调整宽高，medium-zoom 本身会按比例放大图片
            // img.style.width = 'auto';
            // img.style.height = 'auto';
            // img.style.maxWidth = '90vw';
            // img.style.maxHeight = '90vh';
            // img.style.objectFit = 'contain';
        },
        onClose: (zoom) => {
            const img = zoom.target; // 获取缩放的图片
            img.classList.remove('zooming'); // 移除缩放时的 class

            // 无需手动恢复宽高，回归轮播组件的默认样式
            // img.style.width = '100%';
            // img.style.height = '100%';
        }
    });

    zoom.on('open', () => {
        // 隐藏箭头和分页按钮
        document.querySelectorAll('.splide__arrow, .splide__pagination').forEach(el => {
            el.style.display = 'none';
        });
    });

    zoom.on('close', () => {
        // 重新显示箭头和分页按钮
        document.querySelectorAll('.splide__arrow, .splide__pagination').forEach(el => {
            el.style.display = '';
        });
    });

    // 动态应用主题样式
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

// Splid加载处理
function handleSplideLoad() {
    // 检查页面是否含有轮播图片
    const splideEl = document.querySelector('.splide');
    if (!splideEl) {
        return; // 如果不存在轮播，则不执行初始化
    }

    const isMotionEnabled = CONFIG.motion && CONFIG.motion.enable;
    if (isMotionEnabled) {
        // Motion 开启时延迟加载轮播组件，等待动画完成
        setTimeout(function () {
            // 初始化轮播组件
            initSplideAndZoom();
        }, 500);  // 延迟 500ms，确保动画完成后再初始化
    } else {
        // Motion 关闭时立即初始化
        initSplideAndZoom();
    }
}

// 初始页面加载时执行
document.addEventListener('page:loaded', function () {
    handleSplideLoad();
});