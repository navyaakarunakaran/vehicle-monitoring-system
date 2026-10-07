// Mock data only. This is a personal demo, not real or employer data.
const vehicles = [
  { plate: "KL 13 AB 1234", entry: "07:45", exit: "09:30", anpr: "Detected", txn: "Paid" },
  { plate: "KL 13 CD 5678", entry: "08:10", exit: null,    anpr: "Detected", txn: "Pending" },
  { plate: "KL 14 EF 9012", entry: "08:25", exit: null,    anpr: "Review",   txn: "Pending" },
  { plate: "KL 13 GH 3456", entry: "08:40", exit: "10:15", anpr: "Detected", txn: "Paid" },
  { plate: "KL 59 JK 7788", entry: "09:05", exit: "11:00", anpr: "Detected", txn: "Failed" },
  { plate: "KL 01 LM 4521", entry: "09:20", exit: null,    anpr: "Detected", txn: "Paid" },
  { plate: "KL 07 NP 3310", entry: "09:50", exit: "11:40", anpr: "Review",   txn: "Paid" },
  { plate: "KL 11 QR 9087", entry: "10:15", exit: null,    anpr: "Detected", txn: "Pending" },
  { plate: "KL 13 ST 2264", entry: "10:30", exit: "12:05", anpr: "Detected", txn: "Paid" },
  { plate: "KL 58 UV 6150", entry: "11:00", exit: null,    anpr: "Detected", txn: "Paid" }
];

const tbody = document.getElementById("vehicleTable");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const txnFilter = document.getElementById("txnFilter");
const emptyMsg = document.getElementById("emptyMsg");

const statusOf = v => (v.exit ? "Completed" : "Inside");

function badge(text) {
  return `<span class="badge ${text}">${text}</span>`;
}

function updateStats() {
  document.getElementById("statTotal").textContent = vehicles.length;
  document.getElementById("statInside").textContent =
    vehicles.filter(v => !v.exit).length;
  document.getElementById("statCompleted").textContent =
    vehicles.filter(v => v.exit).length;
  document.getElementById("statPending").textContent =
    vehicles.filter(v => v.txn === "Pending").length;
}

function render() {
  const q = searchInput.value.trim().toUpperCase();
  const s = statusFilter.value;
  const t = txnFilter.value;

  const rows = vehicles.filter(v =>
    v.plate.toUpperCase().includes(q) &&
    (s === "all" || statusOf(v) === s) &&
    (t === "all" || v.txn === t)
  );

  tbody.innerHTML = rows.map(v => `
    <tr>
      <td><strong>${v.plate}</strong></td>
      <td>${v.entry}</td>
      <td>${v.exit ?? "-"}</td>
      <td>${badge(v.anpr)}</td>
      <td>${badge(v.txn)}</td>
      <td>${badge(statusOf(v))}</td>
    </tr>
  `).join("");

  emptyMsg.hidden = rows.length > 0;
}

[searchInput, statusFilter, txnFilter].forEach(el =>
  el.addEventListener("input", render)
);

updateStats();
render();
