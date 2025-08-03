
const form = document.getElementById("violationForm");
const tableBody = document.querySelector("#dataTable tbody");
const searchInput = document.getElementById("search");

let dataPelanggaran = JSON.parse(localStorage.getItem("dataPelanggaran")) || [];

function getPoin(kategori) {
    if (kategori === "Ringan") return 5;
    if (kategori === "Sedang") return 15;
    if (kategori === "Berat") return 30;
    return 0;
}

function saveData() {
    localStorage.setItem("dataPelanggaran", JSON.stringify(dataPelanggaran));
}

function renderTable() {
    tableBody.innerHTML = "";
    dataPelanggaran.forEach((data, index) => {
        const row = document.createElement("tr");
        row.innerHTML = \`
            <td>\${data.nama}</td>
            <td>\${data.kelas}</td>
            <td>\${data.tanggal}</td>
            <td>\${data.jenis}</td>
            <td>\${data.kategori}</td>
            <td>\${data.poin}</td>
            <td>\${data.tindakan}</td>
        \`;
        tableBody.appendChild(row);
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();
    const nama = document.getElementById("nama").value;
    const kelas = document.getElementById("kelas").value;
    const tanggal = document.getElementById("tanggal").value;
    const jenis = document.getElementById("jenis").value;
    const kategori = document.getElementById("kategori").value;
    const tindakan = document.getElementById("tindakan").value;
    const poin = getPoin(kategori);

    dataPelanggaran.push({ nama, kelas, tanggal, jenis, kategori, poin, tindakan });
    saveData();
    renderTable();
    form.reset();

    const totalPelanggaran = dataPelanggaran.filter(d => d.nama === nama && (d.kategori === "Sedang" || d.kategori === "Berat")).length;
    if (totalPelanggaran >= 3) {
        alert("Siswa " + nama + " sudah melakukan 3x pelanggaran sedang/berat. Panggil orang tua!");
    }
});

searchInput.addEventListener("input", function() {
    const keyword = this.value.toLowerCase();
    const rows = tableBody.querySelectorAll("tr");
    rows.forEach(row => {
        const nama = row.children[0].textContent.toLowerCase();
        row.style.display = nama.includes(keyword) ? "" : "none";
    });
});

function printReport() {
    window.print();
}

renderTable();
