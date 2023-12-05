/* empty css                             */import { e as createAstro, f as createComponent, r as renderTemplate, g as addAttribute, h as renderHead, i as renderSlot, j as renderComponent, m as maybeRenderHead } from '../astro_dd0a6483.mjs';
import 'html-escaper';
import 'clsx';
import { createClient } from '@libsql/client/web';
import { useState } from 'preact/hooks';
import { jsxs, Fragment, jsx } from 'preact/jsx-runtime';

const $$Astro$1 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body> ${renderSlot($$result, $$slots["default"])} </body></html>`;
}, "D:/astro/flightLislyApp/src/layouts/Layout.astro", void 0);

const client = createClient({
  url: "libsql://linslyflights-marianoffonseca.turso.io",
  authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTAzVDIwOjUxOjEwLjcwNDAzMjEwMVoiLCJpZCI6IjVlOGFkMjgzLTkyMWQtMTFlZS05MTVhLWFlYThhMTZhYzhkZCJ9.AzYMHWIG57pir-4bmv0DI5hlEFFwztxbcS9yrtyyVRCtzmKZcwptEYaJ3ApLUYP4NoSNneXkf-DrJ16mr5NUDQ"
});

function sortByTime(array, sortBy, sortOrder) {
  // Sort the array based on the specified criteria
  const sortedArray = array.sort((a, b) => {
    const dateA = sortBy === "departure" ? a.dayLeaving : a.dayCommingBack;
    const timeA = sortBy === "departure" ? `${a.hourLeaving}:${a.minuteLeaving}` : `${a.hourCommingBack}:${a.minuteCommingBack}`;
    const dateB = sortBy === "departure" ? b.dayLeaving : b.dayCommingBack;
    const timeB = sortBy === "departure" ? `${b.hourLeaving}:${b.minuteLeaving}` : `${b.hourCommingBack}:${b.minuteCommingBack}`;
    const dateTimeA = new Date(`${dateA} ${timeA}`);
    const dateTimeB = new Date(`${dateB} ${timeB}`);
    return sortOrder === "earliest" ? dateTimeA - dateTimeB : dateTimeB - dateTimeA;
  });
  return sortedArray;
}

function Results({
  allFlights
}) {
  const [filtredFlights, setFiltredFlights] = useState(allFlights);
  const handleChangeSerchByName = (e) => {
    const value = e.target.value;
    const filtred = allFlights.rows.filter((flight) => flight.first_name.toLowerCase().includes(value.toLowerCase()));
    setFiltredFlights({
      rows: filtred
    });
  };
  const handleClickNeedsTransportation = (e) => {
    const value = e.target.checked;
    const filtred = allFlights.rows.filter((flight) => {
      if (value) {
        return flight.needTransportation === "on";
      } else {
        return flight;
      }
    });
    setFiltredFlights({
      rows: filtred
    });
  };
  const handleChangeFilterByLeaving = (e) => {
    const value = e.target.value;
    const sortedByDeparture = sortByTime(filtredFlights.rows, "departure", value);
    setFiltredFlights({
      rows: sortedByDeparture
    });
  };
  const handleChangeFilterByReturn = (e) => {
    const value = e.target.value;
    const sortedByReturning = sortByTime(filtredFlights.rows, "Return", value);
    setFiltredFlights({
      rows: sortedByReturning
    });
  };
  console.log(filtredFlights.rows);
  return jsxs(Fragment, {
    children: [jsxs("div", {
      class: "pb-4 bg-white dark:bg-gray-900",
      children: [jsx("label", {
        for: "table-search",
        class: "sr-only",
        children: "Search"
      }), jsxs("div", {
        class: "relative mt-1",
        children: [jsx("div", {
          class: "absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none",
          children: jsx("svg", {
            class: "w-4 h-4 text-gray-500 dark:text-gray-400",
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "none",
            viewBox: "0 0 20 20",
            children: jsx("path", {
              stroke: "currentColor",
              "stroke-linecap": "round",
              "stroke-linejoin": "round",
              "stroke-width": "2",
              d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            })
          })
        }), jsx("input", {
          type: "text",
          onChange: handleChangeSerchByName,
          id: "table-search",
          class: "block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
          placeholder: "Search by student name"
        })]
      })]
    }), jsxs("ul", {
      class: "grid max-w-3xl mb-6 items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white",
      children: [jsx("li", {
        class: "w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600",
        children: jsxs("div", {
          class: "flex items-center ps-3",
          children: [jsx("input", {
            id: "vue-checkbox-list",
            type: "checkbox",
            onClick: handleClickNeedsTransportation,
            value: "",
            class: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
          }), jsx("label", {
            for: "vue-checkbox-list",
            class: "w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300",
            children: "Needs Transportation"
          })]
        })
      }), jsx("li", {
        class: "w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600",
        children: jsx("div", {
          class: "flex items-center ps-3",
          children: jsxs("select", {
            id: "leaving",
            onChange: handleChangeFilterByLeaving,
            class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            children: [jsx("option", {
              selected: true,
              children: "Filter by leaving"
            }), jsx("option", {
              value: "leatest",
              children: "Leaving leatest"
            }), jsx("option", {
              value: "earliest",
              children: "Leaving earliest"
            })]
          })
        })
      }), jsx("li", {
        class: "w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600",
        children: jsx("div", {
          class: "flex items-center ps-3",
          children: jsxs("select", {
            id: "returning",
            onChange: handleChangeFilterByReturn,
            class: "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
            children: [jsx("option", {
              selected: true,
              children: "Filter by return"
            }), jsx("option", {
              value: "leatest",
              children: "Returning latter"
            }), jsx("option", {
              value: "earliest",
              children: "Returning sooner"
            })]
          })
        })
      })]
    }), jsxs("table", {
      class: " mx-4 md:mx-12 w-full max-w-7xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400",
      children: [jsx("thead", {
        class: "text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",
        children: jsxs("tr", {
          children: [jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Student name"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Needs Transportation"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Time leaving"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Time comming back"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Flight Number"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Student email"
          }), jsx("th", {
            scope: "col",
            class: "px-6 py-3",
            children: "Student phone"
          })]
        })
      }), jsx("tbody", {
        children: filtredFlights.rows.length !== 0 ? filtredFlights.rows.map((flight) => jsxs("tr", {
          class: "bg-white border-b dark:bg-gray-800 dark:border-gray-700",
          children: [jsxs("th", {
            scope: "row",
            class: "px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white",
            children: [flight.first_name, " ", flight.last_name]
          }), jsx("th", {
            class: "px-6 py-4",
            children: flight.needTransportation === "undefined" ? "No" : "Yes"
          }), jsxs("td", {
            class: "px-6 py-4 w-fit",
            children: [flight.dayLeaving, " ", flight.hourLeaving, ":", flight.minuteLeaving]
          }), jsxs("td", {
            class: "px-6 py-4 w-fit",
            children: [flight.dayCommingBack, " ", flight.hourCommingBack, ":", flight.minuteCommingBack]
          }), jsxs("td", {
            class: "px-6 py-4",
            children: ["#", flight.flightNumber]
          }), jsx("td", {
            class: "px-6 py-4",
            children: flight.email
          }), jsx("td", {
            class: "px-6 py-4",
            children: flight.phone
          })]
        })) : jsx("p", {
          className: "text-gray-400 text-center w-full mt-6",
          children: "No results for that serch!"
        })
      })]
    })]
  });
}

const $$Astro = createAstro();
const $$Flights = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Flights;
  const allFlights = await client.execute("SELECT * FROM flightInformation");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Students flights" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mt-16 grid justify-items-center relative overflow-x-auto"> ${renderComponent($$result2, "Results", Results, { "allFlights": allFlights, "client:visible": true, "client:component-hydration": "visible", "client:component-path": "D:/astro/flightLislyApp/src/components/Results", "client:component-export": "default" })} </div> ` })}`;
}, "D:/astro/flightLislyApp/src/pages/flights.astro", void 0);

const $$file = "D:/astro/flightLislyApp/src/pages/flights.astro";
const $$url = "/flights";

const flights = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Flights,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$Layout as $, flights as f };
