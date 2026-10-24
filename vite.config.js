import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import autoprefixer from 'autoprefixer';
import wewebCssLayerPlugin from './weweb-postcss-layer-plugin.cjs';
import path from 'path';
import fs from 'fs';
import { parseEnv } from 'node:util';
import handlebars from 'handlebars';
import { createSsrPageComponentLoadersPlugin } from './vitePlugins/ssrPageComponentLoaders.ts';

const pages = {"56c6756c-3da8-418b-85b2-527d2369ddc9-ar":{"outputDir":"./","lang":"ar","title":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات","cacheVersion":"29","meta":[{"name":"title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"index, follow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/"},{"rel":"alternate","hreflang":"ar","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/"}]},"0dd52af1-1bc3-4e85-989d-df27895314a4-ar":{"outputDir":"./admin","lang":"ar","title":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات","cacheVersion":"29","meta":[{"name":"title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"itemprop":"name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"itemprop":"image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"name":"twitter:card","content":"summary"},{"name":"twitter:title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"name":"twitter:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:title","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:image","content":"https://noondubai.manus.space/campaign-burgundy.webp"},{"property":"og:site_name","content":"نون الإمارات | خصم 10% على آيفون 18 — 9 سنوات"},{"property":"og:type","content":"website"},{"name":"robots","content":"noindex, nofollow"}],"scripts":{"head":"\n","body":"\n"},"baseTag":{"href":"/","target":"_self"},"alternateLinks":[{"rel":"alternate","hreflang":"x-default","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/admin/"},{"rel":"alternate","hreflang":"ar","href":"https://339cc152-8d4b-4688-b987-bc962ad9923d.weweb-preview.io/admin/"}]}};

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
