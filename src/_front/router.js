import { createMemoryHistory, createRouter, createWebHistory } from 'vue-router';

import wwPage from './views/wwPage.vue';

import {
    initializeData,
    initializePlugins,
    initializeIntegrationInstances,
    onPageUnload,
} from '@/_common/helpers/data';
import { convertPathToRouterFormat } from '@/_common/helpers/urlParametersParsing';
import { getRuntimeEnvironment } from '@/helpers/frontEnv.js';
import { useBackAuthStore } from '@/pinia/backAuth.js';
/* wwFront:start */
import { isStaticRenderingActive } from '@/_front/rendering/staticRenderingContext';
/* wwFront:end */

/**
 * @typedef {import('vue-router').Router} Router
 * @typedef {import('vue-router').RouteRecordRaw} RouteRecordRaw
 * @typedef {import('vue-router').RouterOptions} RouterOptions
 * @typedef {import('vue-router').RouterScrollBehavior} RouterScrollBehavior
 */

/**
 * @typedef {Object} Lang
 * @property {string} lang
 * @property {boolean} [default]
 * @property {boolean} [isDefaultPath]
 */

/**
 * @typedef {Object} PageSecurity
 * @property {'authenticated' | string} [accessRule]
 * @property {string[]} [accessRoles]
 * @property {'AND' | 'OR'} [accessRolesCondition]
 */

/**
 * @typedef {Object} Page
 * @property {string} id
 * @property {Record<string, string> & { default: string }} paths
 * @property {string[]} langs
 * @property {PageSecurity} [security]
 * @property {{ userGroup: string }[]} [pageUserGroups]
 */

/**
 * @typedef {Object} DesignInfo
 * @property {string} homePageId
 * @property {Page[]} pages
 * @property {Lang[]} langs
 * @property {unknown} [auth]
 * @property {{ href?: string }} [baseTag]
 */

/** @type {Router} */
let router;
/** @type {RouteRecordRaw[]} */
const routes = [];

/** @type {RouterScrollBehavior} */
const scrollBehavior = to => {
    if (to.hash) {
        return {
            el: to.hash,
            behavior: 'smooth',
        };
    } else {
        return { top: 0 };
    }
};

 
/* wwFront:start */
import pluginsSettings from '../../plugins-settings.json';

window.wwg_designInfo = {"id":"339cc152-8d4b-4688-b987-bc962ad9923d","homePageId":"56c6756c-3da8-418b-85b2-527d2369ddc9","authPluginId":null,"baseTag":null,"defaultTheme":"light","langs":[{"lang":"en","default":true}],"background":{},"workflows":[{"id":"06658dd4-99cb-40d5-9c8b-d22c5c3feff7","name":"Track Real Active Visitor On Page Load","folder":null,"actions":{"__ENSURE_SESSION_ID__":{"id":"__ENSURE_SESSION_ID__","name":"Ensure Visitor Session ID","next":"__SET_REFRESHING_TRUE__","type":"update-variable","varId":"1b789880-b7c7-4ba6-a1be-e85632639bc0","varValue":{"code":"const existing = String(variables['1b789880-b7c7-4ba6-a1be-e85632639bc0'] || '').trim();\nif (existing) return existing;\nreturn 'vis_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9);","__wwtype":"js"},"__wwdescription":"إنشاء أو استرجاع معرف جلسة فريد للزائر الحالي في المتصفح"},"__TRY_TRACK_VISITOR__":{"id":"__TRY_TRACK_VISITOR__","name":"Try Track Visitor In Database","next":null,"type":"trycatch","catch":true,"finally":true,"branches":[{"id":"__CALL_TRACK_VISITOR_API__","value":"try"},{"id":null,"value":"catch"},{"id":"__SET_REFRESHING_FALSE__","value":"finally"}],"__wwdescription":"تسجيل حضور الزائر في قاعدة البيانات وجلب العدد الحقيقي للمتواجدين وإعدادات رابط التوجيه"},"__SET_REFRESHING_TRUE__":{"id":"__SET_REFRESHING_TRUE__","name":"Set Refreshing True","next":"__TRY_TRACK_VISITOR__","type":"update-variable","varId":"07a062f9-d3eb-4d0e-b38f-e27dd6062882","varValue":true,"__wwdescription":"تفعيل حالة التحديث أثناء الاتصال بالسيرفر"},"__SET_REFRESHING_FALSE__":{"id":"__SET_REFRESHING_FALSE__","name":"Set Refreshing False","next":null,"type":"update-variable","varId":"07a062f9-d3eb-4d0e-b38f-e27dd6062882","varValue":false,"__wwdescription":"إيقاف حالة التحميل بعد اكتمال التحديث"},"__CALL_TRACK_VISITOR_API__":{"id":"__CALL_TRACK_VISITOR_API__","args":{"headers":{},"__wwstream":false},"name":"Call Track Active Visitor Endpoint","next":"__UPDATE_ACTIVE_COUNT_VAR__","type":"execute-backend-workflow:86ef29b4-0b81-4470-b9a1-e85ec7f144db","parameters":{"session_id":{"code":"variables['1b789880-b7c7-4ba6-a1be-e85632639bc0']","__wwtype":"f"},"current_page":{"code":"globalContext.browser?.['path'] ?? 'home'","__wwtype":"f"}},"__wwdescription":"إرسال نبضة تواجد الزائر إلى قاعدة البيانات واستلام العدد الفعلي"},"__UPDATE_ACTIVE_COUNT_VAR__":{"id":"__UPDATE_ACTIVE_COUNT_VAR__","name":"Update Real Active Visitors Count","next":"__FETCH_ACTIVE_VISITORS_VIEW__","type":"update-variable","varId":"c8c8ddf7-6e04-4fcf-9f17-efe674c99264","varValue":{"code":"context.workflow['__CALL_TRACK_VISITOR_API__']?.result?.activeCount ?? 1","__wwtype":"f"},"__wwdescription":"تحديث متغير عدد الزوار بالرقم الفعلي القادم من قاعدة البيانات"},"__SYNC_REDIRECT_VAR_ON_LOAD__":{"id":"__SYNC_REDIRECT_VAR_ON_LOAD__","name":"Sync Redirect URL Variable From DB","next":null,"type":"update-variable","varId":"889e4b46-df40-4bfa-8bc1-77f259339e23","varValue":{"code":"const dbUrl = globalContext.tableViews['90116aa6-a945-433d-88c0-26f0f288a708']?.data?.[0]?.redirect_url;\nif (dbUrl !== undefined && dbUrl !== null && String(dbUrl).trim() !== '') {\n  return String(dbUrl).trim();\n}\nreturn variables['889e4b46-df40-4bfa-8bc1-77f259339e23'] || '';","__wwtype":"js"},"__wwdescription":"مزامنة متغير رابط التوجيه مع الرابط المحفوظ في السيرفر"},"__FETCH_ACTIVE_VISITORS_VIEW__":{"id":"__FETCH_ACTIVE_VISITORS_VIEW__","name":"Fetch Active Visitors Table View","next":"__FETCH_SITE_SETTINGS_ON_APP_LOAD__","type":"fetch-table-view","tableViewId":"550c9389-25f4-4c51-9687-b70418876bdd","__wwdescription":"تحديث عرض الزوار المتواجدين حالياً من قاعدة البيانات"},"__FETCH_SITE_SETTINGS_ON_APP_LOAD__":{"id":"__FETCH_SITE_SETTINGS_ON_APP_LOAD__","name":"Fetch Site Settings View On App Load","next":"__SYNC_REDIRECT_VAR_ON_LOAD__","type":"fetch-table-view","tableViewId":"90116aa6-a945-433d-88c0-26f0f288a708","__wwdescription":"جلب رابط التوجيه المحفوظ في قاعدة البيانات"}},"trigger":"onload","description":"تتبع الزائر الحقيقي تلقائياً عند فتح أي صفحة في الموقع وجلب رابط التوجيه المحفوظ من قاعدة البيانات","firstAction":"__ENSURE_SESSION_ID__"}],"back":{"isServerSetup":{"staging":true,"production":true}},"auth":{"integration":"weweb-auth","connectionId":null,"unauthenticatedPageId":null,"unauthorizedPageId":null},"pages":[{"id":"0dd52af1-1bc3-4e85-989d-df27895314a4","linkId":"0dd52af1-1bc3-4e85-989d-df27895314a4","name":"admin","folder":null,"paths":{"en":"admin","default":"admin"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"cd32bea6-1f4e-4e4b-9f8a-b0fc3f85ec37","sectionTitle":"Admin Login Section","linkId":"df784a67-9304-4d68-9868-f8200df5c88e"},{"uid":"70a7d29e-1453-4002-b6fb-17d6a5a47d3e","sectionTitle":"Admin Dashboard Control Panel Section","linkId":"5bbafee1-bf02-4410-9b5c-687ce6c7d73c"},{"uid":"f21e4068-5fa9-49ef-800b-b6fc21e96afa","sectionTitle":"Noon Dubai Footer Section","linkId":"0ff1a056-a0c3-4189-9b35-9b1dc20ae5f3"}],"pageUserGroups":[],"title":{"en":"لوحة تحكم الأدمن | نون دبي Noon Dubai"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"56c6756c-3da8-418b-85b2-527d2369ddc9","linkId":"56c6756c-3da8-418b-85b2-527d2369ddc9","name":"Home","folder":null,"paths":{"en":"home","default":"home"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"801cf5d6-13cc-4f75-b909-e8ecf1a09016","sectionTitle":"Noon Dubai Header Section","linkId":"d58c115a-9f1d-4b31-842b-4778affa9817"},{"uid":"6fbfed74-64f5-485f-a92f-ab824e810693","sectionTitle":"iPhone 18 Hero Banner Section","linkId":"df2afac2-3591-4285-b709-e5fcc53a358d"},{"uid":"bebf19f1-1d7b-411e-837f-acece79b3a0d","sectionTitle":"iPhone 18 Catalog Section","linkId":"ff2f87fa-9816-4b10-ab8a-6712c9782579"},{"uid":"3ad07247-0296-4bb1-ac12-b4edc33e0c6a","sectionTitle":"Noon Dubai Features And Comparison Section","linkId":"5b5275ba-6990-44d8-beac-13f277d5b9ba"},{"uid":"f21e4068-5fa9-49ef-800b-b6fc21e96afa","sectionTitle":"Noon Dubai Footer Section","linkId":"0ff1a056-a0c3-4189-9b35-9b1dc20ae5f3"}],"pageUserGroups":[],"title":{"ar":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات","en":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},"meta":{"desc":{"en":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},"keywords":{"en":"آيفون 18, خصم نون, نون الإمارات, نون دبي, iPhone 18 Pro Max, توصيل دبي, عرض 9 سنوات"},"socialDesc":{"en":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},"socialTitle":{"en":"خصم 10% على آيفون 18 | نون الإمارات"},"structuredData":{"en":{"url":"https://noondubai.manus.space/","name":"خصم 10% على آيفون 18","@type":"Offer","image":"https://noondubai.manus.space/campaign-burgundy.webp","price":"4949.10","seller":{"name":"نون دبي","@type":"Organization"},"@context":"https://schema.org","description":"خصم 10% ليوم واحد على جميع هواتف آيفون 18 من نون الإمارات، بمناسبة مرور 9 سنوات على افتتاح نون في الإمارات.","availability":"https://schema.org/InStock","priceCurrency":"AED"}}},"metaImage":"https://noondubai.manus.space/campaign-burgundy.webp","security":{}},{"id":"11102cd6-d2da-463d-a705-97d8aa801699","linkId":"11102cd6-d2da-463d-a705-97d8aa801699","name":"الدفع ","folder":null,"paths":{"en":"paymant","default":"paymant"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"801cf5d6-13cc-4f75-b909-e8ecf1a09016","sectionTitle":"Noon Dubai Header Section","linkId":"d58c115a-9f1d-4b31-842b-4778affa9817"},{"uid":"d1821c48-928e-4838-808e-60b091453b82","sectionTitle":"Checkout And Payment Section","linkId":"06414a16-ea92-493f-8dbd-9d3010512f14"},{"uid":"f21e4068-5fa9-49ef-800b-b6fc21e96afa","sectionTitle":"Noon Dubai Footer Section","linkId":"0ff1a056-a0c3-4189-9b35-9b1dc20ae5f3"}],"pageUserGroups":[],"title":{"en":"إتمام الطلب | نون دبي"},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}},{"id":"ec9a8873-31ad-45aa-b076-58bb009e3a97","linkId":"ec9a8873-31ad-45aa-b076-58bb009e3a97","name":"404","folder":null,"paths":{"en":"404","default":"404"},"langs":["en"],"cmsDataSetPath":null,"sections":[{"uid":"0909631e-5e95-4731-b9f1-2512fe941e79","sectionTitle":"404 Section","linkId":"096fd5e2-8237-4f5e-b89c-2377aef01a14"}],"pageUserGroups":[],"title":{},"meta":{"desc":{},"keywords":{},"socialDesc":{},"socialTitle":{},"structuredData":{}},"metaImage":"","security":{}}],"plugins":[]};
window.wwg_cacheVersion = 18;
window.wwg_pluginsSettings = pluginsSettings;
window.wwg_disableManifest = true;

/** @type {Lang} */
const defaultLang = window.wwg_designInfo.langs.find(({ default: isDefault }) => isDefault) || {
    lang: 'en',
    default: true,
};
const isServerRendering = import.meta.env.SSR;

/**
 * @param {Page} page
 * @param {Lang} lang
 * @param {string} [forcedPath]
 */
const registerRoute = (page, lang, forcedPath) => {
    const langSlug = !lang.default || lang.isDefaultPath ? `/${lang.lang}` : '';
    let path =
        forcedPath ||
        (page.id === window.wwg_designInfo.homePageId ? '/' : `/${page.paths[lang.lang] || page.paths.default}`);

    path = convertPathToRouterFormat(path);

    routes.push({
        path: langSlug + path,
        component: wwPage,
        name: `page-${page.id}-${lang.lang}`,
        meta: {
            pageId: page.id,
            lang,
            isPrivate: !!page.pageUserGroups?.length,
        },
        async beforeEnter(to, from) {
            if (to.name === from.name) return;
            //Set page lang
            wwLib.wwLang.defaultLang = defaultLang.lang;
            wwLib.$store.dispatch('front/setLang', lang.lang);

            if (!isStaticRenderingActive()) {
                const canContinue = await initializePageRuntime(page, to);
                if (!canContinue) return null;
            }

            try {
                const { default: registerPageComponents } = await import(`@/pages/${page.id.split('_')[0]}.js`);
                await registerPageComponents(window.vm);
                await wwLib.wwWebsiteData.fetchPage(page.id);

                //Scroll to section or on top after page change
                if (isStaticRenderingActive()) {
                    return;
                } else if (to.hash) {
                    const targetElement = document.getElementById(to.hash.replace('#', ''));
                    if (targetElement) targetElement.scrollIntoView();
                } else {
                    document.body.scrollTop = document.documentElement.scrollTop = 0;
                }

                return;
            } catch (err) {
                wwLib.$store.dispatch('front/showPageLoadProgress', false);
                if (isStaticRenderingActive()) throw err;

                if (err.redirectUrl) {
                    return { path: err.redirectUrl || '404' };
                } else {
                    //Any other error: go to target page using window.location
                    window.location = to.fullPath;
                }
            }
        },
    });
};

for (const page of window.wwg_designInfo.pages) {
    for (const lang of window.wwg_designInfo.langs) {
        if (!page.langs.includes(lang.lang)) continue;
        registerRoute(page, lang);
    }
}

const page404 = window.wwg_designInfo.pages.find(page => page.paths.default === '404');
if (page404) {
    for (const lang of window.wwg_designInfo.langs) {
        // Create routes /:lang/:pathMatch(.*)* etc for all langs of the 404 page
        if (!page404.langs.includes(lang.lang)) continue;
        registerRoute(
            page404,
            {
                default: false,
                lang: lang.lang,
            },
            '/:pathMatch(.*)*'
        );
    }
    // Create route /:pathMatch(.*)* using default project lang
    registerRoute(page404, { default: true, isDefaultPath: false, lang: defaultLang.lang }, '/:pathMatch(.*)*');
} else {
    routes.push({
        path: '/:pathMatch(.*)*',
        redirect: null,
        async beforeEnter() {
            window.location.href = '/404';
        },
    });
}

const isProd = getRuntimeEnvironment() === 'production';

async function initializePageRuntime(page, route) {
    const backAuthStore = useBackAuthStore(wwLib.$pinia);
    if (!wwLib.wwAuth.plugin && !backAuthStore.projectAuth && window.wwg_designInfo.auth) {
        backAuthStore.setProjectAuth(window.wwg_designInfo.auth);
    }

    await initializePlugins();
    await initializeIntegrationInstances();

    if (!wwLib.wwAuth.plugin) {
        await backAuthStore.refresh();
        const projectAuth = backAuthStore.projectAuth || {};

        if (page.security?.accessRule !== 'authenticated') return true;
        if (!backAuthStore.isAuthenticated) {
            window.location.href = `${wwLib.wwPageHelper.getPagePath(
                projectAuth.unauthenticatedPageId
            )}?_source=${route.path}`;
            return false;
        }
        if (!page.security.accessRoles?.length) return true;

        const hasAccess =
            page.security.accessRolesCondition === 'AND'
                ? backAuthStore.matchAllRoles(page.security.accessRoles)
                : backAuthStore.matchAnyRoles(page.security.accessRoles);
        if (hasAccess) return true;

        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            projectAuth.unauthorizedPageId
        )}?_source=${route.path}`;
        return false;
    }

    if (!page.pageUserGroups?.length) return true;
    await wwLib.wwAuth.init();

    if (!wwLib.wwAuth.getIsAuthenticated()) {
        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            wwLib.wwAuth.getUnauthenticatedPageId()
        )}?_source=${route.path}`;
        return false;
    }

    if (
        page.pageUserGroups.length > 1 &&
        !wwLib.wwAuth.matchUserGroups(page.pageUserGroups.map(({ userGroup }) => userGroup))
    ) {
        window.location.href = `${wwLib.wwPageHelper.getPagePath(
            wwLib.wwAuth.getUnauthorizedPageId()
        )}?_source=${route.path}`;
        return false;
    }

    return true;
}

/**
 * Initializes the current route's traditional runtime dependencies after Vue has
 * hydrated the static projection. Static rendering remains active until this resolves,
 * so client islands and dynamic bindings cannot run against a partial runtime.
 */
export async function initializeCurrentRouteRuntime() {
    const route = router.currentRoute.value;
    const page = window.wwg_designInfo.pages.find(candidate => candidate.id === route.meta.pageId);
    if (!page) throw new Error(`Unable to initialize runtime for route ${route.fullPath}: page is unavailable.`);

    const canContinue = await initializePageRuntime(page, route);
    if (!canContinue) return { status: 'redirected' };
    return { status: 'ready', route };
}

/**
 * Starts the data phase without delaying the mounted lifecycle, matching normal
 * navigation where collections and workflows may initialize after the first render.
 */
export function startCurrentRouteDataInitialization(route) {
    return initializeData(route);
}

function createFrontHistory(serverRendering) {
    if (serverRendering) return createMemoryHistory();

    if (isProd && window.wwg_designInfo.baseTag?.href) {
        let baseTag = window.wwg_designInfo.baseTag.href;
        if (!baseTag.startsWith('/')) {
            baseTag = '/' + baseTag;
        }
        if (!baseTag.endsWith('/')) {
            baseTag += '/';
        }
        return createWebHistory(baseTag);
    }

    return createWebHistory();
}

export function createFrontRouter({ serverRendering = false } = {}) {
    const frontRouter = createRouter({
        history: createFrontHistory(serverRendering),
        routes,
        scrollBehavior,
    });

    //Trigger on page unload
    let isFirstNavigation = true;
    frontRouter.beforeEach(async (to, from) => {
        if (to.name === from.name) return;
        if (!isFirstNavigation && !serverRendering) await onPageUnload();
        isFirstNavigation = false;
        wwLib.globalVariables._navigationId++;
        return;
    });

    //Init page
    frontRouter.afterEach((to, from, failure) => {
        wwLib.$store.dispatch('front/showPageLoadProgress', false);
        let fromPath = from.path;
        let toPath = to.path;
        if (!fromPath.endsWith('/')) fromPath = fromPath + '/';
        if (!toPath.endsWith('/')) toPath = toPath + '/';
        if (failure || (from.name && toPath === fromPath) || serverRendering || isStaticRenderingActive()) return;
        void initializeData(to);
    });

    return frontRouter;
}

router = createFrontRouter({ serverRendering: isServerRendering });
/* wwFront:end */

export default router;
