export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';

const page = () => import('./pages/flights_42659d2c.mjs').then(n => n.f);

export { page };
