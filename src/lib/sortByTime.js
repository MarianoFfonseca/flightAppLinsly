export function sortByTime(array, sortBy, sortOrder) {
  // Sort the array based on the specified criteria
  const sortedArray = array.sort((a, b) => {
    const dateA = sortBy === "departure" ? a.dayLeaving : a.dayCommingBack;
    const timeA =
      sortBy === "departure"
        ? `${a.hourLeaving}:${a.minuteLeaving}`
        : `${a.hourCommingBack}:${a.minuteCommingBack}`;

    const dateB = sortBy === "departure" ? b.dayLeaving : b.dayCommingBack;
    const timeB =
      sortBy === "departure"
        ? `${b.hourLeaving}:${b.minuteLeaving}`
        : `${b.hourCommingBack}:${b.minuteCommingBack}`;

    const dateTimeA = new Date(`${dateA} ${timeA}`);
    const dateTimeB = new Date(`${dateB} ${timeB}`);
    return sortOrder === "earliest"
      ? dateTimeA - dateTimeB
      : dateTimeB - dateTimeA;
  });
  return sortedArray;
}
