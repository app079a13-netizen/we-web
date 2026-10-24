import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import wewebCssLayerPlugin from './weweb-postcss-layer-plugin.cjs';
import path from 'path';
import fs from 'fs';
import { parseEnv } from 'node:util';
import handlebars from 'handlebars';
import { createSsrPageComponentLoadersPlugin } from './vitePlugins/ssrPageComponentLoaders.ts';

const pages = {"0dd52af1-1bc3-4e85-989d-df27895314a4-en":{"outputDir":"./admin","lang":"en","title":"لوحة تحكم الأدمن | نون دبي Noon Dubai","cacheVersion":"19","meta":[{"name":"title","content":"لوحة تحكم الأدمن | نون دبي Noon Dubai"},{"name":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"keywords","content":"آيفون 18, خصم نون, نون الإمارات, نون دبي, iPhone 18 Pro Max, توصيل دبي, عرض 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"لوحة تحكم الأدمن | نون دبي Noon Dubai"},{"itemprop":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"لوحة تحكم الأدمن | نون دبي Noon Dubai"},{"name":"twitter:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"لوحة تحكم الأدمن | نون دبي Noon Dubai"},{"property":"og:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/admin/"},{"rel":"alternate","hreflang":"en","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/admin/"}]},"56c6756c-3da8-418b-85b2-527d2369ddc9-en":{"outputDir":"./","lang":"en","title":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات","cacheVersion":"19","meta":[{"name":"title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"keywords","content":"آيفون 18, خصم نون, نون الإمارات, نون دبي, iPhone 18 Pro Max, توصيل دبي, عرض 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"itemprop":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"خصم 10% على آيفون 18 | نون الإمارات"},{"name":"twitter:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"خصم 10% على آيفون 18 | نون الإمارات"},{"property":"og:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"structuredData":{"url":"https://noondubai.manus.space/","name":"خصم 10% على آيفون 18","@type":"Offer","image":"https://noondubai.manus.space/campaign-burgundy.webp","price":"4949.10","seller":{"name":"نون دبي","@type":"Organization"},"@context":"https://schema.org","description":"خصم 10% ليوم واحد على جميع هواتف آيفون 18 من نون الإمارات، بمناسبة مرور 9 سنوات على افتتاح نون في الإمارات.","availability":"https://schema.org/InStock","priceCurrency":"AED"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/"},{"rel":"alternate","hreflang":"en","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/"}]},"11102cd6-d2da-463d-a705-97d8aa801699-en":{"outputDir":"./paymant","lang":"en","title":"إتمام الطلب | نون دبي","cacheVersion":"19","meta":[{"name":"title","content":"إتمام الطلب | نون دبي"},{"name":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"keywords","content":"آيفون 18, خصم نون, نون الإمارات, نون دبي, iPhone 18 Pro Max, توصيل دبي, عرض 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"إتمام الطلب | نون دبي"},{"itemprop":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"إتمام الطلب | نون دبي"},{"name":"twitter:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"إتمام الطلب | نون دبي"},{"property":"og:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/paymant/"},{"rel":"alternate","hreflang":"en","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/paymant/"}]},"ec9a8873-31ad-45aa-b076-58bb009e3a97-en":{"outputDir":"./404","lang":"en","title":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات","cacheVersion":"19","meta":[{"name":"title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"keywords","content":"آيفون 18, خصم نون, نون الإمارات, نون دبي, iPhone 18 Pro Max, توصيل دبي, عرض 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"itemprop":"description","content":"خصم 10% ليوم واحد على كل هواتف آيفون 18 من نون الإمارات. كل الألوان والسعات، توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"خصم 10% على آيفون 18 | نون الإمارات"},{"name":"twitter:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"خصم 10% على آيفون 18 | نون الإمارات"},{"property":"og:description","content":"احتفال 9 سنوات نون في الإمارات: خصم 10% ليوم واحد على كل إصدارات آيفون 18. توصيل خلال ساعة في دبي، والسعر بعد الخصم يبدأ من 4,949.10 د.إ."},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/404/"},{"rel":"alternate","hreflang":"en","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/404/"}]}};

function generatePageHtmlFiles() {
    const template = fs.readFileSync(path.resolve(__dirname, 'template.html'), 'utf-8');
    const compiledTemplate = handlebars.compile(template);

    for (const pageConfig of Object.values(pages)) {
        const html = compiledTemplate({
            title: pageConfig.title,
            lang: pageConfig.lang,
            meta: pageConfig.meta,
            structuredData: pageConfig.structuredData || null,
            scripts: {
                head: pageConfig.scripts.head,
                body: pageConfig.scripts.body,
            },
            alternateLinks: pageConfig.alternateLinks,
            cacheVersion: pageConfig.cacheVersion,
            baseTag: pageConfig.baseTag,
            encodedAssetBase: encodeURIComponent("/"),
        });

        if (!fs.existsSync(pageConfig.outputDir)) {
            fs.mkdirSync(pageConfig.outputDir, { recursive: true });
        }
        fs.writeFileSync(`${pageConfig.outputDir}/index.html`, html);
    }
}

const clientInputs = {};
for (const pageName in pages) {
    clientInputs[pageName] = path.resolve(__dirname, pages[pageName].outputDir, 'index.html');
}

function getFrontEnvironmentValues(root, mode) {
    const filePath = path.resolve(root, `.env.${mode}`);
    if (!fs.existsSync(filePath)) {
        return {};
    }

    return Object.fromEntries(
        Object.entries(parseEnv(fs.readFileSync(filePath, 'utf8'))).filter(([key]) => !key.startsWith('VITE_'))
    );
}

const onwarn = (entry, next) => {
    if (entry.loc?.file && /js$/.test(entry.loc.file) && /Use of eval in/.test(entry.message)) return;
    if (/Use of direct `eval`/.test(entry.message)) return;
    return next(entry);
};

export default defineConfig(({ mode, isSsrBuild }) => {
    if (!isSsrBuild) {
        generatePageHtmlFiles();
    }

    const build = {
        chunkSizeWarningLimit: 10000,
        ...(!isSsrBuild ? { manifest: '.ww-client-manifest.json' } : {}),
        rolldownOptions: {
            ...(!isSsrBuild ? { input: clientInputs } : {}),
            onwarn,
        },
    };

    if (isSsrBuild) {
        build.outDir = 'dist-ssr';
    }

    return {
        plugins: [createSsrPageComponentLoadersPlugin(), vue()],
        base: "/",
        define: {
            global: 'globalThis',
            __VUE_PROD_DEVTOOLS__: mode === 'development',
            __VUE_PROD_HYDRATION_MISMATCH_DETAILS__:
                mode === 'development' || !!process.env.WW_BACK_URL?.includes('weweb-preprod.io'),
            __WW_FRONT_ENV_VARIABLES__: JSON.stringify({
                staging: getFrontEnvironmentValues(__dirname, 'staging'),
                production: getFrontEnvironmentValues(__dirname, 'production'),
            }),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, './src'),
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler',
                },
            },
            postcss: {
                plugins: [wewebCssLayerPlugin({ include: [/[/\\]src[/\\]extensions[/\\]/, /[/\\]node_modules[/\\]/] }), autoprefixer],
            },
        },
        ssr: {
            noExternal: true,
        },
        server: {
            port: 8080,
        },
        build,
    };
});
