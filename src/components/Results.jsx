import { useState } from "preact/hooks";
import { sortByTime } from "../lib/sortByTime";
import { client } from "../lib/tursoDb";
import ButtonRemoveData from "./ButtonRemoveData";
function Results({ allFlights }) {
  const [filtredFlights, setFiltredFlights] = useState(allFlights);
  const [sureToDelete, setSureToDelete] = useState(false);

  const handleChangeSerchByName = (e) => {
    const value = e.target.value;
    const filtred = allFlights.rows.filter((flight) =>
      flight.first_name.toLowerCase().includes(value.toLowerCase())
    );
    setFiltredFlights({ rows: filtred });
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
    setFiltredFlights({ rows: filtred });
  };

  const handleChangeFilterByLeaving = (e) => {
    const value = e.target.value;
    const sortedByDeparture = sortByTime(
      filtredFlights.rows,
      "departure",
      value
    );
    setFiltredFlights({ rows: sortedByDeparture });
  };
  const handleChangeFilterByReturn = (e) => {
    const value = e.target.value;
    const sortedByReturning = sortByTime(filtredFlights.rows, "Return", value);
    setFiltredFlights({ rows: sortedByReturning });
  };
  function deleteStudentPlans(plansId) {
    if (sureToDelete === true) {
      client.execute({
        sql: "DELETE FROM flightInformation WHERE id = :id",
        args: { id: plansId },
      });
      window.location.reload();
    } else {
      setSureToDelete(true);
    }
  }

  return (
    <div
      class={
        "grid justify-items-start md:justify-items-center relative ml-4 md:ml-0 mb-10"
      }
    >
      <div class="pb-4">
        <label for="table-search" class="sr-only">
          Search
        </label>
        <div class="relative mt-1">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              class="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="text"
            onChange={handleChangeSerchByName}
            id="table-search"
            class="block py-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search by student name"
          />
        </div>
      </div>
      <ul class="grid bg-gray-50 max-w-3xl mb-6 items-center w-full text-sm font-medium text-gray-900  border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
        <li class=" pl-3 w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ">
            <input
              id="vue-checkbox-list"
              type="checkbox"
              onClick={handleClickNeedsTransportation}
              value=""
              class="w-4 h-4 text-blue-600 bg-gray-50 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
            />
            <label
              for="vue-checkbox-list"
              class="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Needs Transportation
            </label>
          </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ">
            <select
              id="leaving"
              onChange={handleChangeFilterByLeaving}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Filter by departure</option>
              <option value="leatest">Leaving leatest</option>
              <option value="earliest">Leaving earliest</option>
            </select>
          </div>
        </li>
        <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
          <div class="flex items-center ">
            <select
              id="returning"
              onChange={handleChangeFilterByReturn}
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>Filter by return</option>
              <option value="leatest">Returning latter</option>
              <option value="earliest">Returning sooner</option>
            </select>
          </div>
        </li>
      </ul>
      <table class="md:mx-12 w-full max-w-7xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Student name
            </th>
            <th scope="col" class="px-6 py-3">
              Needs Transportation
            </th>
            <th scope="col" class="px-6 py-3">
              Time leaving
            </th>
            <th scope="col" class="px-6 py-3">
              Time comming back
            </th>
            <th scope="col" class="px-6 py-3">
              Flight Number
            </th>
            <th scope="col" class="px-6 py-3">
              Student email
            </th>
            <th scope="col" class="px-6 py-3">
              Student phone
            </th>
            <th scope="col" class="px-6 py-3">
              Done?
            </th>
          </tr>
        </thead>
        <tbody>
          {filtredFlights.rows.length !== 0 ? (
            filtredFlights.rows.map((flight) => (
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {flight.first_name} {flight.last_name}
                </th>
                <th class="px-6 py-4">
                  {flight.needTransportation === "undefined" ? "No" : "Yes"}
                </th>
                <td class="px-6 py-4 w-fit">
                  {flight.dayLeaving} {flight.hourLeaving}:
                  {flight.minuteLeaving}
                </td>
                <td class="px-6 py-4 w-fit">
                  {flight.dayCommingBack} {flight.hourCommingBack}:
                  {flight.minuteCommingBack}
                </td>
                <td class="px-6 py-4">#{flight.flightNumber}</td>
                <td class="px-6 py-4">{flight.email}</td>

                <td class="px-6 py-4">{flight.phone}</td>
                <ButtonRemoveData id={flight.id} />
                {/* <td
                  onClick={() => deleteStudentPlans(flight.id)}
                  class="px-6 py-4 text-red-800 underline cursor-pointer"
                >
                  {sureToDelete ? "Sure?" : "Delete"}
                </td> */}
              </tr>
            ))
          ) : (
            <p className="text-gray-400 text-center w-full mt-6">
              No results for that serch!
            </p>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Results;
