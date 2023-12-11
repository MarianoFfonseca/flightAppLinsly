import { useState } from "preact/hooks";
import { client } from "../lib/tursoDb";
function ButtonRemoveData({ id }) {
  const [sureToDelete, setSureToDelete] = useState(false);
  function deleteStudentPlans(plansId) {
    if (sureToDelete === true) {
      try {
        client.execute({
          sql: "DELETE FROM flightInformation WHERE id = :id",
          args: { id: plansId },
        });
        alert(
          "Flight information deleted, wait a second and refresh the page to see the changes"
        );
        window.location.reload();
      } catch (error) {
        alert(
          "There was an error deleting the flight information, try again in a minute"
        );
        console.log(error);
      }
    } else {
      setSureToDelete(true);
    }
  }
  return (
    <td
      onClick={() => deleteStudentPlans(id)}
      class="px-6 py-4 text-red-800 underline cursor-pointer"
    >
      {sureToDelete ? "Sure?" : "Delete"}
    </td>
  );
}

export default ButtonRemoveData;
