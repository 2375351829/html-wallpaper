$(document).ready(function() {
    initCarousel();
    initModal();
    initLazyLoad();
    initBackToTop();
    initSmoothScroll();
    initSearch();
    initFilter();
    initToast();
    initMobileMenu();
});

function initCarousel() {
    const $carousel = $('.carousel');
    const $items = $('.carousel-item');
    const $indicators = $('.carousel-indicator');
    let currentIndex = 0;
    let interval;

    function showSlide(index) {
        $items.removeClass('active');
        $indicators.removeClass('active');
        $items.eq(index).addClass('active');
        $indicators.eq(index).addClass('active');
        currentIndex = index;
    }

    function nextSlide() {
        let nextIndex = (currentIndex + 1) % $items.length;
        showSlide(nextIndex);
    }

    function prevSlide() {
        let prevIndex = (currentIndex - 1 + $items.length) % $items.length;
        showSlide(prevIndex);
    }

    function startAutoPlay() {
        interval = setInterval(nextSlide, 5000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    $carousel.on('click', '.carousel-control.next', function() {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    $carousel.on('click', '.carousel-control.prev', function() {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    $carousel.on('click', '.carousel-indicator', function() {
        let index = $(this).index();
        showSlide(index);
        stopAutoPlay();
        startAutoPlay();
    });

    $carousel.on('mouseenter', function() {
        stopAutoPlay();
    });

    $carousel.on('mouseleave', function() {
        startAutoPlay();
    });

    startAutoPlay();
}

function initModal() {
    const $modal = $('.modal');
    const $modalContent = $modal.find('.modal-content img');
    const $modalInfo = $modal.find('.modal-info');
    let currentWallpapers = [];
    let currentIndex = 0;

    function openModal(imageSrc, title, resolution, size, downloads) {
        $modalContent.attr('src', imageSrc);
        $modalInfo.find('h3').text(title);
        $modalInfo.find('.resolution').text('分辨率: ' + resolution);
        $modalInfo.find('.size').text('大小: ' + size);
        $modalInfo.find('.downloads').text('下载: ' + downloads + '次');
        $modal.addClass('active');
        $('body').css('overflow', 'hidden');
    }

    function closeModal() {
        $modal.removeClass('active');
        $('body').css('overflow', '');
    }

    function showNext() {
        currentIndex = (currentIndex + 1) % currentWallpapers.length;
        const wallpaper = currentWallpapers[currentIndex];
        openModal(wallpaper.src, wallpaper.title, wallpaper.resolution, wallpaper.size, wallpaper.downloads);
    }

    function showPrev() {
        currentIndex = (currentIndex - 1 + currentWallpapers.length) % currentWallpapers.length;
        const wallpaper = currentWallpapers[currentIndex];
        openModal(wallpaper.src, wallpaper.title, wallpaper.resolution, wallpaper.size, wallpaper.downloads);
    }

    $(document).on('click', '.preview-btn', function() {
        const $card = $(this).closest('.wallpaper-card');
        const imageSrc = $card.find('img').attr('src');
        const title = $card.find('h4').text();
        const resolution = $card.find('.resolution').text();
        const size = $card.find('.size').text();
        const downloads = $card.find('.downloads').text();

        currentWallpapers = [];
        currentIndex = 0;

        $('.wallpaper-card').each(function(index) {
            currentWallpapers.push({
                src: $(this).find('img').attr('src'),
                title: $(this).find('h4').text(),
                resolution: $(this).find('.resolution').text(),
                size: $(this).find('.size').text(),
                downloads: $(this).find('.downloads').text()
            });

            if ($(this).find('img').attr('src') === imageSrc) {
                currentIndex = index;
            }
        });

        openModal(imageSrc, title, resolution, size, downloads);
    });

    $modal.on('click', '.modal-close', closeModal);
    $modal.on('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    $modal.on('click', '.modal-nav.next', showNext);
    $modal.on('click', '.modal-nav.prev', showPrev);

    $(document).on('keydown', function(e) {
        if ($modal.hasClass('active')) {
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowRight') {
                showNext();
            } else if (e.key === 'ArrowLeft') {
                showPrev();
            }
        }
    });
}

function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    }, {
        rootMargin: '200px 0px'
    });

    images.forEach(img => {
        imageObserver.observe(img);
    });
}

function initBackToTop() {
    const $backToTop = $('.back-to-top');

    $(window).on('scroll', function() {
        if ($(this).scrollTop() > 300) {
            $backToTop.addClass('visible');
        } else {
            $backToTop.removeClass('visible');
        }
    });

    $backToTop.on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 500);
    });
}

function initSmoothScroll() {
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 500);
        }
    });
}

function initSearch() {
    $('.search-box button').on('click', function() {
        const query = $('.search-box input').val().trim();
        if (query) {
            showToast('搜索功能开发中...', 'warning');
        }
    });

    $('.search-box input').on('keypress', function(e) {
        if (e.which === 13) {
            const query = $(this).val().trim();
            if (query) {
                showToast('搜索功能开发中...', 'warning');
            }
        }
    });
}

function initFilter() {
    $('select[name="sort"]').on('change', function() {
        const sortBy = $(this).val();
        showToast('排序方式: ' + $(this).find('option:selected').text(), 'success');
    });

    $('select[name="view"]').on('change', function() {
        const view = $(this).val();
        const $grid = $('.wallpaper-grid');

        if (view === 'list') {
            $grid.css({
                'grid-template-columns': '1fr',
                'gap': '15px'
            });
            $('.wallpaper-card').css({
                'display': 'flex',
                'flex-direction': 'row'
            });
            $('.wallpaper-card img').css({
                'width': '200px',
                'height': '150px'
            });
        } else {
            $grid.css({
                'grid-template-columns': 'repeat(4, 1fr)',
                'gap': '20px'
            });
            $('.wallpaper-card').css({
                'display': 'block'
            });
            $('.wallpaper-card img').css({
                'width': '100%',
                'height': '200px'
            });
        }
    });
}

function initToast() {
    window.showToast = function(message, type = 'success') {
        const $toast = $(`<div class="toast ${type}">
            <span>${message}</span>
        </div>`);

        $('body').append($toast);

        setTimeout(function() {
            $toast.addClass('show');
        }, 100);

        setTimeout(function() {
            $toast.removeClass('show');
            setTimeout(function() {
                $toast.remove();
            }, 300);
        }, 3000);
    };
}

function initMobileMenu() {
    const $navbarToggler = $('.navbar-toggler');
    const $navbarCollapse = $('.navbar-collapse');
    const $navbarNav = $('.navbar-nav');
    
    if ($navbarToggler.length === 0 || $navbarCollapse.length === 0) {
        console.warn('导航栏组件未找到，跳过移动菜单初始化');
        return;
    }
    
    $navbarToggler.on('click', function(e) {
        e.preventDefault();
        const isExpanded = $(this).attr('aria-expanded') === 'true';
        $(this).attr('aria-expanded', !isExpanded);
        $navbarCollapse.toggleClass('show');
        
        if ($navbarCollapse.hasClass('show')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', '');
        }
    });
    
    $navbarCollapse.on('click', 'a', function(e) {
        const windowWidth = $(window).width();
        if (windowWidth <= 991.98) {
            $navbarToggler.attr('aria-expanded', 'false');
            $navbarCollapse.removeClass('show');
            $('body').css('overflow', '');
        }
    });
    
    $(window).on('resize', function() {
        const windowWidth = $(window).width();
        if (windowWidth > 991.98) {
            $navbarToggler.attr('aria-expanded', 'false');
            $navbarCollapse.removeClass('show');
            $navbarCollapse.css('display', '');
            $('body').css('overflow', '');
        } else if (!$navbarCollapse.hasClass('show')) {
            $navbarCollapse.css('display', 'none');
        }
    });
    
    $(document).on('click', function(e) {
        if ($navbarCollapse.hasClass('show')) {
            if (!$(e.target).closest('.navbar-collapse').length && 
                !$(e.target).closest('.navbar-toggler').length) {
                $navbarToggler.attr('aria-expanded', 'false');
                $navbarCollapse.removeClass('show');
                $('body').css('overflow', '');
            }
        }
    });
    
    try {
        const firstNavLink = $navbarNav.find('.nav-link:first');
        if (firstNavLink.length > 0) {
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            $navbarNav.find('.nav-link').each(function() {
                const href = $(this).attr('href');
                if (href === currentPage) {
                    $(this).addClass('active');
                } else if (currentPage === '' && href === 'index.html') {
                    $(this).addClass('active');
                }
            });
        }
    } catch (error) {
        console.warn('导航链接激活状态设置失败:', error);
    }
}

function downloadImage(src, filename) {
    const link = document.createElement('a');
    link.href = src;
    link.download = filename || 'wallpaper.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('下载成功！', 'success');
}

$(document).on('click', '.download-btn', function(e) {
    e.preventDefault();
    const $card = $(this).closest('.wallpaper-card');
    const imageSrc = $card.find('img').attr('src');
    const title = $card.find('h4').text();
    const filename = title + '.jpg';
    downloadImage(imageSrc, filename);
});

$(document).on('click', '.like-btn', function(e) {
    e.preventDefault();
    $(this).toggleClass('liked');
    if ($(this).hasClass('liked')) {
        showToast('已收藏！', 'success');
    } else {
        showToast('已取消收藏', 'warning');
    }
});

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                $(entry.target).addClass('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    $('.wallpaper-card, .category-card').each(function() {
        observer.observe(this);
    });
}

$(document).ready(function() {
    initScrollAnimations();
});
