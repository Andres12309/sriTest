import React, { useState, useRef, useEffect } from 'react';
import { classNames } from 'primereact/utils';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';

import AppTopbar from './AppTopbar';
import AppFooter from './AppFooter';
import AppConfig from './AppConfig';
import AppMenu from './AppMenu';
import AppBreadcrumb from './AppBreadcrumb';
import AppInlineProfile from './AppInlineProfile';

import Dashboard from './components/Dashboard';
import Compania from './components/Compania';
import PuntoEmision from './components/PuntoEmision';

import PrimeReact from 'primereact/api';
import { Tooltip } from 'primereact/tooltip';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './App.scss';

const App = () => {
    const [menuActive, setMenuActive] = useState(false);
    const [menuMode, setMenuMode] = useState('static');
    const [darkMenu, setDarkMenu] = useState(true);
    const [overlayMenuActive, setOverlayMenuActive] = useState(false);
    const [topbarMenuActive, setTopbarMenuActive] = useState(false);
    const [staticMenuDesktopInactive, setStaticMenuDesktopInactive] = useState(false);
    const [staticMenuMobileActive, setStaticMenuMobileActive] = useState(false);
    const [activeTopbarItem, setActiveTopbarItem] = useState(null);
    const [inlineMenuActive, setInlineMenuActive] = useState(false);
    const [profileMode, setProfileMode] = useState('popup');
    const [configActive, setConfigActive] = useState(false);
    const [inputStyle, setInputStyle] = useState('outlined');
    const [ripple, setRipple] = useState(false);
    const copyTooltipRef = useRef();
    const location = useLocation();

    const navigate = useNavigate();

    let menuClick = false;
    let configClick = false;
    let topbarItemClick = false;
    let inlineMenuClick = false;

    const breadcrumb = [
        { path: '/', parent: 'Dashboard', label: 'Dashboard' },
        { path: '/menu', parent: 'Dashboard', label: 'Menu' },
        { path: '/menu/seat', parent: 'Dashboard', label: 'Menu' },
        { path: '/menu/payment', parent: 'Dashboard', label: 'Menu' },
        { path: '/menu/confirmation', parent: 'Dashboard', label: 'Menu' },
        { path: '/companias', parent: 'Administracion', label: 'Compañias' },
        { path: '/puntoEmision', parent: 'Administracion', label: 'Punto Emision' }
    ];

    const menu = [
        {
            label: 'Pagina Principal',
            icon: 'pi pi-fw pi-home',
            items: [
                { label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' },
                {
                    label: 'Administracion',
                    icon: 'pi pi-fw pi-server',
                    items: [
                        {
                            label: 'Informacion personal',
                            icon: 'pi pi-fw pi-wallet'

                        },
                        {
                            label: 'Compañias',
                            icon: 'pi pi-fw pi-building',
                            to:'/companias'
                        },
                        {
                            label: 'Punto Emisión',
                            icon: 'pi pi-fw pi-users',
                            to:'/puntoEmision'
                        },
                        {
                            label: 'Usuarios',
                            icon: 'pi pi-fw pi-users'
                        },
                        {
                            label: 'Perfiles',
                            icon: 'pi pi-fw pi-users'
                        },
                        {
                            label: 'Clientes',
                            icon: 'pi pi-fw pi-users'
                        },
                        {
                            label: 'Prod/Servicios',
                            icon: 'pi pi-fw pi-box'
                        },
                        {
                            label: 'Cod. Retencion',
                            icon: 'pi pi-fw pi-briefcase'
                        },
                    ]
                },
                {
                    label: 'Inventario',
                    icon: 'pi pi-fw pi-book',
                    items: [
                        {
                            label: 'Almacen',
                            icon: 'pi pi-fw pi-inbox'

                        },
                        {
                            label: 'Ingreso a Stock',
                            icon: 'pi pi-fw pi-inbox'
                        },
                        {
                            label: 'Stock de Producto',
                            icon: 'pi pi-fw pi-box'
                        },
                        {
                            label: 'Movimientos Inventario',
                            icon: 'pi pi-fw pi-book'
                        },
                        
                    ]
                },
                {
                    label: 'Recepción',
                    icon: 'pi pi-fw pi-stop',
                    items: [
                        {
                            label: 'Actualizar Doc. Recepción',
                            icon: 'pi pi-fw pi-tablet'

                        },
                        {
                            label: 'Reporte Recepción',
                            icon: 'pi pi-fw pi-book'
                        },
                        
                    ]
                },
                {
                    label: 'Emisión',
                    icon: 'pi pi-fw pi-eraser',
                    items: [
                        {
                            label: 'Factura',
                            icon: 'pi pi-fw pi-bookmark'

                        },
                        {
                            label: 'Nota Credito',
                            icon: 'pi pi-fw pi-credit-card'
                        },
                        {
                            label: 'Retención',
                            icon: 'pi pi-fw pi-stop'
                        },
                        {
                            label: 'Liq. Compra',
                            icon: 'pi pi-fw pi-money-bill'
                        },
                        
                    ]
                },
                {
                    label: 'Reportes',
                    icon: 'pi pi-fw pi-book',
                    items: [
                        {
                            label: 'Autorizaciones',
                            icon: 'pi pi-fw pi-copy'
                        },
                        
                    ]
                },
                {
                    label: 'Ejemplos',
                    icon: 'pi pi-fw pi-sitemap',
                    items: [
                        { label: 'Dashboard Template', icon: 'pi pi-fw pi-home', to: '/' },
                        { label: 'Promotion Page', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                        { label: 'Sample Page', icon: 'pi pi-fw pi-check-square', to: '/input' },
                        { label: 'Forms', icon: 'pi pi-fw pi-id-card', to: '/formlayout' },
                        { label: 'Data', icon: 'pi pi-fw pi-bookmark', to: '/floatlabel' },
                        { label: 'Panels', icon: 'pi pi-fw pi-tablet', to: '/panel' },
                        { label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlay' },
                        { label: 'Menu', icon: 'pi pi-fw pi-bars', to: '/menu' },
                        { label: 'Messages', icon: 'pi pi-fw pi-comment', to: '/messages' },
                        { label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/chart' },
                        { label: 'File', icon: 'pi pi-fw pi-file', to: '/file' },
                        { label: 'Misc', icon: 'pi pi-fw pi-circle-off', to: '/misc' },
                        { label: 'Empty', icon: 'pi pi-fw pi-circle-off', to: '/empty' },
                        { label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login' },
                        { label: 'Error', icon: 'pi pi-fw pi-times-circle', to: '/error' },
                        { label: '404', icon: 'pi pi-fw pi-exclamation-circle', to: '/notfound' },
                        { label: 'Access Denied', icon: 'pi pi-fw pi-lock', to: '/access' },
                        { label: 'Docs', icon: 'pi pi-fw pi-dollar', to: '/invoice' },
                    ]
                },
                
            ]
        }
    ];

    useEffect(() => {
        copyTooltipRef && copyTooltipRef.current && copyTooltipRef.current.updateTargetEvents();
    }, [location]);

    let meta = breadcrumb.find((obj) => {
        return obj.path === location.pathname;
    });

    const onInputStyleChange = (inputStyle) => {
        setInputStyle(inputStyle);
    };

    const onRippleChange = (e) => {
        PrimeReact.ripple = e.value;
        setRipple(e.value);
    };

    const onMenuModeChange = (e) => {
        setMenuMode(e.value);
        setStaticMenuDesktopInactive(false);
        setOverlayMenuActive(false);

        if (e.value === 'horizontal') {
            setProfileMode('popup');
        }
    };

    const onMenuColorChange = (e) => {
        setDarkMenu(e.value);
    };

    const onProfileChange = (e) => {
        setProfileMode(e.value);
    };

    const onDocumentClick = () => {
        if (!topbarItemClick) {
            setActiveTopbarItem(null);
            setTopbarMenuActive(false);
        }

        if (!menuClick) {
            if (isHorizontal() || isSlim()) {
                setMenuActive(false);
            }
            hideOverlayMenu();
        }

        if (!inlineMenuClick && profileMode === 'inline' && isSlim() && !isMobile()) {
            setInlineMenuActive(false);
        }

        if (configActive && !configClick) {
            setConfigActive(false);
        }

        inlineMenuClick = false;
        configClick = false;
        topbarItemClick = false;
        menuClick = false;
    };

    const onMenuitemClick = (event) => {
        if (!event.item.items) {
            hideOverlayMenu();

            if (isSlim() || isHorizontal()) {
                setMenuActive(false);
            }
        }
    };

    const onRootMenuitemClick = () => {
        setMenuActive((prevMenuActive) => !prevMenuActive);
    };

    const onMenuClick = () => {
        menuClick = true;

        if (inlineMenuActive && !inlineMenuClick) {
            setInlineMenuActive(false);
        }
    };

    const isMenuVisible = () => {
        if (isDesktop()) {
            if (menuMode === 'static') return !staticMenuDesktopInactive;
            else if (menuMode === 'overlay') return overlayMenuActive;
            else return true;
        } else {
            return true;
        }
    };

    const onMenuButtonClick = (event) => {
        menuClick = true;
        setTopbarMenuActive(false);

        if (isOverlay() && !isMobile()) {
            setOverlayMenuActive((prevOverlayMenuActive) => !prevOverlayMenuActive);
        } else {
            if (isDesktop()) {
                setStaticMenuDesktopInactive((prevStaticMenuDesktopInactive) => !prevStaticMenuDesktopInactive);
            } else {
                setStaticMenuMobileActive((prevStaticMenuMobileActive) => !prevStaticMenuMobileActive);
            }
        }

        event.preventDefault();
    };

    const onProfileButtonClick = (event) => {
        setInlineMenuActive((prevInlineMenuActive) => !prevInlineMenuActive);
        inlineMenuClick = true;

        if (isSlim() || isHorizontal()) {
            setMenuActive(false);
        }
    };

    const onTopbarMenuButtonClick = (event) => {
        topbarItemClick = true;
        setTopbarMenuActive((prevTopbarMenuActive) => !prevTopbarMenuActive);

        hideOverlayMenu();

        event.preventDefault();
    };

    const onTopbarItemClick = (event, item) => {
        topbarItemClick = true;

        if (activeTopbarItem === item) {
            setActiveTopbarItem(null);
        } else {
            setActiveTopbarItem(item);
        }

        event.preventDefault();
    };

    const onConfigClick = () => {
        configClick = true;
    };

    const onConfigButtonClick = () => {
        setConfigActive((prevConfigActive) => !prevConfigActive);
        configClick = true;
    };

    const hideOverlayMenu = () => {
        setOverlayMenuActive(false);
        setStaticMenuMobileActive(false);
    };

    const isDesktop = () => {
        return window.innerWidth > 896;
    };

    const isMobile = () => {
        return window.innerWidth <= 896;
    };

    const isOverlay = () => {
        return menuMode === 'overlay';
    };

    const isHorizontal = () => {
        return menuMode === 'horizontal';
    };

    const isSlim = () => {
        return menuMode === 'slim';
    };

    const isStatic = () => {
        return menuMode === 'static';
    };

    const hasInlineProfile = profileMode === 'inline' && !isHorizontal();

    const containerClassName = classNames('layout-wrapper', {
        'layout-static': isStatic(),
        'layout-overlay': isOverlay(),
        'layout-overlay-active': overlayMenuActive,
        'layout-horizontal': isHorizontal(),
        'layout-slim': isSlim(),
        'layout-static-inactive': staticMenuDesktopInactive,
        'layout-mobile-active': staticMenuMobileActive,
        'layout-menu-dark': darkMenu,
        'layout-menu-light': !darkMenu,
        'p-input-filled': inputStyle === 'filled',
        'p-ripple-disabled': !ripple
    });

    const menuContainerClassName = classNames('layout-menu-container', { 'layout-menu-container-inactive': !isMenuVisible() });

    return (
        <div className={containerClassName} onClick={onDocumentClick}>
            <Tooltip ref={copyTooltipRef} target=".block-action-copy" position="bottom" content="Copied to clipboard" event="focus" />

            <AppTopbar
                topbarMenuActive={topbarMenuActive}
                activeTopbarItem={activeTopbarItem}
                onMenuButtonClick={onMenuButtonClick}
                onTopbarMenuButtonClick={onTopbarMenuButtonClick}
                onTopbarItemClick={onTopbarItemClick}
                isHorizontal={isHorizontal()}
                profileMode={profileMode}
                isMobile={isMobile}
            />

            <div className={menuContainerClassName} onClick={onMenuClick}>
                <div className="layout-menu-logo">
                    <button className="p-link" onClick={() => navigate('/')}>
                        <img id="layout-menu-logo" src="assets/layout/images/logo-white.png" library="babylon-layout" alt="babylon-logo" />
                    </button>
                </div>
                <div className="layout-menu-wrapper">
                    <div className="menu-scroll-content">
                        {hasInlineProfile && <AppInlineProfile inlineMenuActive={inlineMenuActive} onProfileButtonClick={onProfileButtonClick} />}
                        <AppMenu model={menu} menuMode={menuMode} active={menuActive} onMenuitemClick={onMenuitemClick} onRootMenuitemClick={onRootMenuitemClick} />
                    </div>
                </div>
            </div>

            <div className="layout-main">
                <AppBreadcrumb meta={meta} />

                <div className="layout-content">
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path="/companias" element={<Compania />} />
                        <Route path="/puntoEmision" element={<PuntoEmision />} />
                    </Routes>
                </div>

                <AppFooter />
            </div>

            {staticMenuMobileActive && <div className="layout-mask"></div>}
        </div>
    );
};

export default App;
