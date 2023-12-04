export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/flights_d538f3f7.mjs').then(n => n.f);

export { page };
