import emitter from 'tiny-emitter/instance';
import services from './services/index.js';
import { useIconsStore } from '@/pinia/icons';

 /* wwFront:start */
// eslint-disable-next-line no-undef
;
// The token maps of the newer types: `typeof` keeps an empty map when a publisher older than this code leaves the
// placeholder in place.
// eslint-disable-next-line no-undef
const LIBRARY_RADIUS = typeof {"f3d5c360-8a0b-4d5f-8814-68bba2913b13":"16px","c4e4b7cd-2c3c-43b1-944a-18f17105b1b1":"12px","c8a01bcb-9f76-4ff7-af2d-ac5d04bd3f94":"6px","957b55df-074f-4324-86c9-558a79204ad1":"999px"} === 'undefined' ? {} : {"f3d5c360-8a0b-4d5f-8814-68bba2913b13":"16px","c4e4b7cd-2c3c-43b1-944a-18f17105b1b1":"12px","c8a01bcb-9f76-4ff7-af2d-ac5d04bd3f94":"6px","957b55df-074f-4324-86c9-558a79204ad1":"999px"};
// eslint-disable-next-line no-undef
const LIBRARY_SHADOWS = typeof {"359b49c1-587a-416a-b5d6-e5a72b4bfaf2":"0 2px 10px var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #0000000F)","97d162d6-d783-4938-a804-887a271ee9ec":"0 12px 28px var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #0000001F)"} === 'undefined' ? {} : {"359b49c1-587a-416a-b5d6-e5a72b4bfaf2":"0 2px 10px var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #0000000F)","97d162d6-d783-4938-a804-887a271ee9ec":"0 12px 28px var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #0000001F)"};
// eslint-disable-next-line no-undef
const LIBRARY_BORDERS = typeof {"5e609adb-cef2-496b-ba4a-e6730b0b8619":"1px solid var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #E4E4E7)","ca10978c-dc73-45d7-a620-fc1ddb17cda9":"2px solid var(--a2ab84e2-bb84-4e7f-b5d2-5b6ac67d4c12, #FEEE00)","8a6f5b47-0de2-4b9b-b12d-bea061b525fa":"1px solid var(--d4a6549b-ff71-4462-9afc-e00038517bc2, #3866DF)"} === 'undefined' ? {} : {"5e609adb-cef2-496b-ba4a-e6730b0b8619":"1px solid var(--0df479b5-4104-4c31-8be9-5604cd6f509f, #E4E4E7)","ca10978c-dc73-45d7-a620-fc1ddb17cda9":"2px solid var(--a2ab84e2-bb84-4e7f-b5d2-5b6ac67d4c12, #FEEE00)","8a6f5b47-0de2-4b9b-b12d-bea061b525fa":"1px solid var(--d4a6549b-ff71-4462-9afc-e00038517bc2, #3866DF)"};
/* wwFront:end */

import { computed, reactive } from 'vue';
import { useBackTableViewsStore } from '@/pinia/backTableViews.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useEnvVariablesStore } from '@/pinia/envVariables.js';
import { createEnvironmentVariablesContext } from './services/environmentVariables';

let runtimeActivationError;

export default {
    ...services,
     $on(event, fn) {
        emitter.on(event, fn);
    },
    $once(event, fn) {
        emitter.once(event, fn);
    },
    $emit(event, ...args) {
        if (!event) {
            return;
        }
        emitter.emit(event, ...args);
    },
    $off(event, fn) {
        emitter.off(event, fn);
    },
     front: {},
    $focus: null,
    env: process.env.NODE_ENV,
    runtimeActivated: false,
    async initFront({ router, store, staticRendering = false }) {
 
        this.front.router = router;
        /* wwFront:start */
        this.$store = store;
        /* wwFront:end */

        //Init services
        this.wwLog.init();

 
        await this.wwWebsiteData.init();
        this.wwLang.init(router);

        /* wwFront:start */
        // eslint-disable-next-line no-undef
        ;
        /* wwFront:end */

 
        if (!staticRendering) this.activateRuntime();
    },
    activateRuntime() {
        if (this.runtimeActivated) return;
        if (runtimeActivationError) throw runtimeActivationError;

        try {
            void this.wwPluginHelper.activatePlugins();
            services.scrollStore.start();
            services.keyboardEventStore.start();
            services.pwaStore.start();
            this.runtimeActivated = true;
        } catch (error) {
            runtimeActivationError = error;
            throw error;
        }
    },
     // TODO: Verify with Alexis, still uses wwImageMultiLang
    getResponsiveStyleProp({ store, style, uid, states = [], prop }) {
        store = store || wwLib.getFrontWindow().wwLib.$store;
        if (!style && uid) {
            const wwObject = this.$store.getters['websiteData/getWwObjects'][uid];
            if (!wwObject) return '';
            style = (wwObject._state || {}).style || {};
        }

        const screenSizes = store.getters['front/getScreenSizes'];
        const screenSize = store.getters['front/getScreenSize'];

        let value = '';

        for (const media in screenSizes) {
            if (style[media] && typeof style[media][prop] !== 'undefined') {
                value = style[media][prop];
            }
            if (media === screenSize) {
                break;
            }
        }
        for (const state of states) {
            for (const media in screenSizes) {
                if (style[`${state}_${media}`] && style[`${state}_${media}`][prop]) {
                    value = style[`${state}_${media}`][prop];
                }
                if (media === screenSize) {
                    break;
                }
            }
        }

        return value;
    },
    globalContext: reactive({
        auth: computed(() => {
            const backAuthStore = useBackAuthStore(wwLib.$pinia);
            return {
                user: backAuthStore.user,
                session: backAuthStore.session,
                isAuthenticated: backAuthStore.isAuthenticated,
            };
        }),
        env: computed(() => {
            const envVariablesStore = useEnvVariablesStore(wwLib.$pinia);
            let env = wwLib.getEnvironment();
            if (env === 'preview') env = 'production';
            return createEnvironmentVariablesContext(Object.values(envVariablesStore.values), env);
        }),
        tableViews: computed(() => {
            const backTableViewsStore = useBackTableViewsStore(wwLib.$pinia);
            return backTableViewsStore?.data;
        }),
        page: computed(() => {
            const page = wwLib.$store.getters['websiteData/getPage'];
            if (!page) return {};
            else if (!page.cmsDataSetPath) return { ...pageSanitizer(page) };
            return { ...pageSanitizer(page), data: wwLib.$store.getters['data/getPageCollectionData'] };
        }),
        pageParameters: computed(() => {
            const pageParameters = Object.values(wwLib.$store.getters['data/getPageParameterVariables']);
            const pageParametersValueMap = {};
            for (const pageParameter of pageParameters) pageParametersValueMap[pageParameter.id] = pageParameter.value;
            return pageParametersValueMap;
        }),
        pages: computed(() => {
            const pages = wwLib.$store.getters['websiteData/getPages'];
            const pagesValueMap = {};
            for (const page of pages) pagesValueMap[page.id] = pageSanitizer(page);
            return pagesValueMap;
        }),
        colors: computed(() => {
            const theme = wwLib.$store.getters['front/getTheme'];
             /* wwFront:start */
            // eslint-disable-next-line no-unreachable, no-undef
            return theme === 'dark' ? {"1d083bfb-9aaf-49d4-998c-960f800b2bdd":"#E02020","afbb56dc-48bc-464f-aa89-785b259a9a18":"#18181B","d8675101-e2c4-442e-92b0-5ac4aef7b86b":"#A1A1AA","724c4c51-5f69-4e58-911e-ecf7100f5fc1":"#FAFAFA","17fbb7b9-1910-4150-88cd-361b938ef734":"#09090B","6542502c-40a2-46e5-9c43-313aa4f0acad":"#18181B","0df479b5-4104-4c31-8be9-5604cd6f509f":"#27272A","8aa95fe3-80d1-4b85-b3e7-5c2be0291f6e":"#FAFAFA","b81e21e8-1afc-4b5c-a63a-4d4f0e7693b7":"#E4E4E7","9a52fe28-59c9-4cab-a7d2-c2d221b7b04c":"#111827","06c865dd-94bb-4bd9-bb7d-5a78903bbe27":"#27272A","a2ab84e2-bb84-4e7f-b5d2-5b6ac67d4c12":"#FEEE00","7f873a5d-e6c2-4392-bfbc-57d27b447ed2":"#E5D600","d4a6549b-ff71-4462-9afc-e00038517bc2":"#3866DF","b2ee0a36-8531-42d3-a87e-dbd2f751cc39":"#2C52B8","2321805d-043d-430b-b07a-1cd5d10f2030":"#38AE04","5452c1a2-841b-4897-afc0-798e1ec78ee5":"#09090B","a93895f4-bf17-456b-848b-4388e0d400d7":"#333000","850d4d56-5bd7-44b1-bbe0-51e37f869956":"#0B2E13"} : {"1d083bfb-9aaf-49d4-998c-960f800b2bdd":"#E02020","afbb56dc-48bc-464f-aa89-785b259a9a18":"#FFFFFF","d8675101-e2c4-442e-92b0-5ac4aef7b86b":"#71717A","724c4c51-5f69-4e58-911e-ecf7100f5fc1":"#18181B","17fbb7b9-1910-4150-88cd-361b938ef734":"#FFFFFF","6542502c-40a2-46e5-9c43-313aa4f0acad":"#FAFAFA","0df479b5-4104-4c31-8be9-5604cd6f509f":"#E4E4E7","8aa95fe3-80d1-4b85-b3e7-5c2be0291f6e":"#09090B","b81e21e8-1afc-4b5c-a63a-4d4f0e7693b7":"#3F3F46","9a52fe28-59c9-4cab-a7d2-c2d221b7b04c":"#20232A","06c865dd-94bb-4bd9-bb7d-5a78903bbe27":"#F3F4F8","a2ab84e2-bb84-4e7f-b5d2-5b6ac67d4c12":"#FEEE00","7f873a5d-e6c2-4392-bfbc-57d27b447ed2":"#E5D600","d4a6549b-ff71-4462-9afc-e00038517bc2":"#3866DF","b2ee0a36-8531-42d3-a87e-dbd2f751cc39":"#2C52B8","2321805d-043d-430b-b07a-1cd5d10f2030":"#38AE04","5452c1a2-841b-4897-afc0-798e1ec78ee5":"#F7F7FA","a93895f4-bf17-456b-848b-4388e0d400d7":"#FFFDE6","850d4d56-5bd7-44b1-bbe0-51e37f869956":"#EBF9E6"};
            /* wwFront:end */
        }),
        spacings:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"03d80b1d-f9d7-4191-bf33-a85301bf5b73":"32px","831be6e3-971d-4b08-a069-ddf62c0ae0a3":"10px","ec6e3a5c-45c5-4b88-86fc-7ae44ed12de6":"9999px","4ef98fa8-c2fb-4614-821e-5b6e86e8a318":"4px","728817fb-e686-496a-b010-e3e6c4f41235":"24px","c458ff4c-145f-4c13-ac69-beb8f979099e":"16px","3341d08c-12d3-4a3d-9aa5-aa8ffccf106c":"8px","d76a4263-a05e-45c4-98d9-fb63ec982a51":"48px"},
        /* wwFront:end */
        typographies:
         /* wwFront:start */
        // eslint-disable-next-line no-unreachable, no-undef
        {"a0d9f050-d50e-412d-a6b1-f6a32b9f59c9":"500 15px/1.6 Cairo, sans-serif","b443f625-5b53-49f2-9c61-6417c428d670":"700 32px/1.25 var(--ww-default-font-family, sans-serif)","d8a2903d-1adb-453e-9b49-03368673ac0e":"400 14px/1.5 var(--ww-default-font-family, sans-serif)","76da9747-7c84-470b-9787-d8d33d17f4da":"600 12px/1.4 var(--ww-default-font-family, sans-serif)","d3756e5a-5176-4dc4-9c9d-0e7fca87d619":"900 40px/1.25 Cairo, sans-serif","bff4bd8a-4736-482f-8a09-c9814c04568e":"700 16px/1.45 Cairo, sans-serif","197aece8-ae48-4ffd-a567-ae4190c6a6b7":"700 14px/1.4 Cairo, sans-serif","10dcb9f1-d9bc-4bdd-8c91-5b27e3f7a77f":"800 24px/1.35 Cairo, sans-serif","37db3516-9c43-4bdb-8c4b-f87f6bb17533":"900 24px/1.2 Cairo, sans-serif","02ee8dab-9fde-42d0-8293-dafd0d71b02c":"600 12px/1.4 Cairo, sans-serif"},
        /* wwFront:end */
        // The newer token types (see LIBRARY_RADIUS). Shadows and borders keep their var(--color): the CSS resolves it.
        radius:
         /* wwFront:start */
        LIBRARY_RADIUS,
        /* wwFront:end */
        shadows:
         /* wwFront:start */
        LIBRARY_SHADOWS,
        /* wwFront:end */
        borders:
         /* wwFront:start */
        LIBRARY_BORDERS,
        /* wwFront:end */
        browser: computed(() => {
            const router = wwLib.manager ? wwLib.getEditorRouter() : wwLib.getFrontRouter();
            const currentRoute = router.currentRoute.value;
            let currentQueries = currentRoute.query;
             return {
                url: window.location.origin + currentRoute.fullPath,
                path: currentRoute.path,
                // verify if auth plugin
                 /* wwFront:start */
                // eslint-disable-next-line no-dupe-keys
                source: currentQueries._source,
                /* wwFront:end */
                query: currentQueries,
                domain: window.location.hostname,
                baseUrl: window.location.origin,
                breakpoint: wwLib.$store.getters['front/getScreenSize'],
                environment: wwLib.getEnvironment(),
                theme: wwLib.$store.getters['front/getTheme'],
            };
        }),
        pwa: services.pwaStore.pwa,
        screen: services.scrollStore.screen,
        componentPositionInfo: services.scrollStore.componentPositionInfo,
    }),

    pageData: computed(() => {
        const lang = wwLib.$store.getters['front/getLang'];
        const cmsDataSetPath = wwLib.$store.getters['websiteData/getPage'].cmsDataSetPath;
        if (!cmsDataSetPath) {
            return { lang };
        }

        return { lang, data: wwLib.$store.getters['data/getPageCollectionData'] };
    }),

    getEnvironment() {
        return getRuntimeEnvironment();
    },

    useBaseTag() {
        return (
            wwLib.getEnvironment() === 'production' &&
            window.wwg_designInfo.baseTag &&
            window.wwg_designInfo.baseTag.href
        );
    },

    getBaseTag() {
        let baseTag = window.wwg_designInfo.baseTag?.href || '';
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return baseTag;
    },

    /**
     * @PUBLIC_API
     */
    getFrontWindow() {
        // This is called for every compiled CSS declaration and Vue timing measurement.
        // In the canvas document there is no nested editor iframe: a class selector would
        // scan the entire rendered page on every call. The editor iframe has a fixed ID.
        return document.getElementById('ww-manager-iframe')?.contentWindow || window;
    },

    /**
     * @PUBLIC_API
     */
    getFrontDocument() {
        return this.getFrontWindow().document;
    },

    /**
     * @PUBLIC_API
     */
    getFrontRouter() {
        return this.front.router;
    },

    /**
     * @PUBLIC_API
     */
    getEditorWindow() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorDocument() {
         // eslint-disable-next-line no-unreachable
        return null;
    },

    /**
     * @PUBLIC_API
     */
    getEditorRouter() {
        return this.editor.router;
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwApp.goTo
     */
    goTo(...args) {
        wwLib.wwLog.warn('wwLib.goTo is DEPRECATED, use wwLib.wwApp.goTo instead');
        wwLib.wwApp.goTo(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getStyleFromToken
     */
    getStyleFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getStyleFromToken is DEPRECATED, use wwLib.wwUtils.getStyleFromToken instead');
        return wwLib.wwUtils.getStyleFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.getTypoFromToken
     */
    getTypoFromToken(...args) {
        // wwLib.wwLog.warn('wwLib.getTypoFromToken is DEPRECATED, use wwLib.wwUtils.getTypoFromToken instead');
        return wwLib.wwUtils.getTypoFromToken(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED
     */
    element(value) {
        wwLib.wwLog.warn('wwLib.element is DEPRECATED');
        if (typeof value === 'object') {
            return { isWwObject: true, ...value };
        } else {
            return { isWwObject: true, type: value };
        }
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwUtils.resolveObjectPropertyPath
     */
    resolveObjectPropertyPath(...args) {
        // wwLib.wwLog.warn(
        //     'wwLib.resolveObjectPropertyPath is DEPRECATED, use wwLib.wwUtils.resolveObjectPropertyPath instead'
        // );
        return wwLib.wwUtils.resolveObjectPropertyPath(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwWorkflow.executeGlobal
     */
    async executeWorkflow(...args) {
        wwLib.wwLog.warn('wwLib.executeWorkflow is DEPRECATED, use wwLib.wwWorkflow.executeGlobal instead');
        return wwLib.wwWorkflow.executeGlobal(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.findParentUidByFlag
     */
    findParentUidByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.findParentUidByFlag is DEPRECATED, use wwLib.findParentUidByFlag instead');
        return wwLib.wwEditor.findParentUidByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @EDITOR
     * @DEPRECATED wwLib.wwEditor.selectParentByFlag
     */
    selectParentByFlag(...args) {
        wwLib.wwLog.warn('wwLib.wwEditor.selectParentByFlag is DEPRECATED, use wwLib.selectParentByFlag instead');
        return wwLib.wwEditor.selectParentByFlag(...args);
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useCreate
     */
    useCreateElement() {
        wwLib.wwLog.warn('wwLib.useCreateElement is DEPRECATED, use wwLib.wwElement.useCreate instead');
        return this.wwElement.useCreate();
    },

    /**
     * @PUBLIC_API
     * @DEPRECATED wwLib.wwElement.useLayoutStyle
     */
    useLayoutStyle() {
        wwLib.wwLog.warn('wwLib.useLayoutStyle is DEPRECATED, use wwLib.wwElement.useLayoutStyle instead');
        return wwLib.wwElement.useLayoutStyle();
    },

    /**
     * @PUBLIC_API
     */
    useIcons() {
        const store = useIconsStore();
        return {
            getIcon: store.getIcon,
        };
    },
};

 
function pageSanitizer(page) {
    const keysToInclude = [
        'id',
        'name',
        'folder',
        'metaImage',
        'pageLoaded',
        'paths',
        'langs',
        'meta',
        'title',
        'sections',
        'pageUserGroups',
    ];

    const _page = {};
    keysToInclude.forEach(key => {
        _page[key] = page[key];
    });

    _page.meta && delete _page.meta.__typename;
    for (const section of _page.sections || []) {
        delete section.__typename;
    }

    const lang = wwLib.$store.getters['front/getLang'];
    if (_page.paths) _page.path = _page.paths[lang] || _page.paths.default;
    else _page.path = null;

    _page.lang = lang;

    return _page;
}
