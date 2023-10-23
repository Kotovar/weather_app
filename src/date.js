import format from "date-fns/format";

const currentDate = document.getElementById("currentDate");

export default function setDate() {
  const date = format(new Date(), "EEEE, dd MMMM yyyy, H.mm");
  currentDate.textContent = date;
}

setInterval(() => setDate(), 60000);
