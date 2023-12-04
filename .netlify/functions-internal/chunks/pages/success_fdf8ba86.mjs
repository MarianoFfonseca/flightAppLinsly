/* empty css                             */import { e as createAstro, f as createComponent, r as renderTemplate, j as renderComponent, m as maybeRenderHead } from '../astro_dd0a6483.mjs';
import 'html-escaper';
import 'clsx';
import { $ as $$Layout } from './flights_d538f3f7.mjs';

const $$Astro = createAstro();
const $$Success = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Success;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank you!" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div id="alert-additional-content-3" class="p-4 mt-6 mx-4 mb-4 text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert"> <div class="flex items-center"> <svg class="flex-shrink-0 w-4 h-4 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"> <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"></path> </svg> <span class="sr-only">Info</span> <h3 class="text-lg font-medium">Thank you for your submition</h3> </div> <div class="mt-2 mb-4 text-sm">
Congratulations! Your form has been successfully submitted. Thank you for providing the necessary information. This success page is here to confirm that your data has been received and processed. If you have any further questions or need assistance, feel free to reach out to the team on duty.
</div> <div class="mt-2 mb-4 text-lg underline">
You can close this tab
</div> </div> ` })}`;
}, "D:/astro/flightLislyApp/src/pages/success.astro", void 0);

const $$file = "D:/astro/flightLislyApp/src/pages/success.astro";
const $$url = "/success";

export { $$Success as default, $$file as file, $$url as url };
