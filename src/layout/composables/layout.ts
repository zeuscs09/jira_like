import { ref, computed } from 'vue';

export const useLayout = () => {
    const layoutConfig = ref({
        ripple: false,
        darkTheme: false,
        inputStyle: 'outlined',
        menuMode: 'static',
        theme: 'lara-light-blue',
        scale: 14,
        activeMenuItem: null
    });

    const layoutState = ref({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        staticMenuMobileActive: false,
        menuHoverActive: false
    });

    const isOverlay = computed(() => {
        return layoutConfig.value.menuMode === 'overlay';
    });

    const isDesktop = computed(() => {
        return window.innerWidth > 991;
    });

    const containerClass = computed(() => {
        return {
            'layout-theme-light': !layoutConfig.value.darkTheme,
            'layout-theme-dark': layoutConfig.value.darkTheme,
            'layout-overlay': layoutConfig.value.menuMode === 'overlay',
            'layout-static': layoutConfig.value.menuMode === 'static',
            'layout-static-inactive': layoutState.value.staticMenuDesktopInactive && layoutConfig.value.menuMode === 'static',
            'layout-overlay-active': layoutState.value.overlayMenuActive,
            'layout-mobile-active': layoutState.value.staticMenuMobileActive,
            'p-input-filled': layoutConfig.value.inputStyle === 'filled',
            'p-ripple-disabled': !layoutConfig.value.ripple
        };
    });

    const toggleMenu = (event: Event) => {
        event.preventDefault();

        if (isDesktop.value) {
            if (layoutConfig.value.menuMode === 'overlay') {
                layoutState.value.overlayMenuActive = !layoutState.value.overlayMenuActive;
            } else if (layoutConfig.value.menuMode === 'static') {
                layoutState.value.staticMenuDesktopInactive = !layoutState.value.staticMenuDesktopInactive;
            }
        } else {
            layoutState.value.staticMenuMobileActive = !layoutState.value.staticMenuMobileActive;
        }
    };

    const onMenuToggle = () => {
        if (layoutConfig.value.menuMode === 'overlay') {
            layoutState.value.overlayMenuActive = !layoutState.value.overlayMenuActive;
        }
    };

    const onSidebarClick = () => {
        layoutState.value.menuHoverActive = true;
    };

    return {
        layoutConfig,
        layoutState,
        containerClass,
        isDesktop,
        isOverlay,
        toggleMenu,
        onMenuToggle,
        onSidebarClick
    };
};