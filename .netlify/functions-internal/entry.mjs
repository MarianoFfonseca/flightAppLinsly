import * as adapter from '@astrojs/netlify/netlify-functions.js';
import { renderers } from './renderers.mjs';
import { manifest } from './manifest_669eac26.mjs';

const _page0  = () => import('./chunks/generic_9438b809.mjs');
const _page1  = () => import('./chunks/index_9f215697.mjs');
const _page2  = () => import('./chunks/flights_a7be4075.mjs');
const _page3  = () => import('./chunks/success_9e9fb3a3.mjs');const pageMap = new Map([["node_modules/astro/dist/assets/endpoint/generic.js", _page0],["src/pages/index.astro", _page1],["src/pages/flights.astro", _page2],["src/pages/success.astro", _page3]]);
const _manifest = Object.assign(manifest, {
	pageMap,
	renderers,
});
const _args = {};

const _exports = adapter.createExports(_manifest, _args);
const handler = _exports['handler'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { handler, pageMap };
