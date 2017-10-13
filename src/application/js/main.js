jQuery(document).ready(function () {
    const mainContent = $('.cd-main-content'),
        header = $('.cd-main-header'),
        sidebar = $('.cd-side-nav'),
        sidebarTrigger = $('.cd-nav-trigger'),
        topNavigation = $('.cd-top-nav');

    let resizing = false;
    moveNavigation();
    $(window).on('resize', function () {
        if (!resizing) {
            window.requestAnimationFrame
                ? window.requestAnimationFrame(moveNavigation) : setTimeout(moveNavigation, 300);
            resizing = true;
        }
    });

    checkScrollbarPosition();

    sidebarTrigger.on('click', function (event) {
        event.preventDefault();
        $([sidebar, sidebarTrigger]).toggleClass('nav-is-visible');
    });

    //on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
    sidebar.children('ul').menuAim({
        activate: row => $(row).addClass('hover'),
        deactivate: row => $(row).removeClass('hover'),
        exitMenu: () => {
            sidebar.find('.hover').removeClass('hover');
            return true;
        }
    });

    function checkMQ() {
        //check if mobile or desktop device
        return window
            .getComputedStyle(document.querySelector('.cd-main-content'), '::before')
            .getPropertyValue('content')
            .replace(/'/g, "")
            .replace(/"/g, "");
    }

    function moveNavigation() {
        const mq = checkMQ();

        if (mq === 'mobile' && topNavigation.parents('.cd-side-nav').length === 0) {
            detachElements();
            topNavigation.appendTo(sidebar);
        } else if (( mq === 'tablet' || mq === 'desktop') && topNavigation.parents('.cd-side-nav').length > 0) {
            detachElements();
            topNavigation.appendTo(header.find('.cd-nav'));
        }
        checkSelected(mq);
        resizing = false;
    }

    function detachElements() {
        topNavigation.detach();
    }

    function checkSelected(mq) {
        //on desktop, remove selected class from items selected on mobile/tablet version
        if (mq === 'desktop') {
            $('.has-children.selected').removeClass('selected');
        }
    }

    function checkScrollbarPosition() {
        const mq = checkMQ();

        if (mq !== 'mobile') {
            let sidebarHeight = sidebar.outerHeight(),
                windowHeight = $(window).height(),
                mainContentHeight = mainContent.outerHeight(),
                scrollTop = $(window).scrollTop();

            ((scrollTop + windowHeight > sidebarHeight) && (mainContentHeight - sidebarHeight !== 0))
                ? sidebar.addClass('is-fixed').css('bottom', 0) : sidebar.removeClass('is-fixed').attr('style', '');
        }
    }
});