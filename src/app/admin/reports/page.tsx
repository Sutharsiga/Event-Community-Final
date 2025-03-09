"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver"; // Import saveAs from file-saver

const eventData = [
  { name: "Jan", events: 20, users: 150 },
  { name: "Feb", events: 25, users: 180 },
  { name: "Mar", events: 30, users: 200 },
  { name: "Apr", events: 35, users: 220 },
];

export default function Reports() {
  // Export to Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(eventData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "report.xlsx"); // Trigger download
  };

  // Export to PDF (Simple Text Export)
  const exportToPDF = () => {
    const pdfText = eventData.map((item) => `Month: ${item.name}, Events: ${item.events}, Users: ${item.users}`).join("\n");
    const blob = new Blob([pdfText], { type: "application/pdf;charset=utf-8" }); // Set PDF MIME type correctly
    saveAs(blob, "report.pdf"); // Trigger download
  };

  return (
    <>
      <div className="p-5 mx-auto bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Reports & Analytics</h1>

        {/* Charts */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Event & User Analytics</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={eventData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="events" fill="#3182CE" name="Events" />
              <Bar dataKey="users" fill="#63B3ED" name="User Engagement" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Export Options */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Export Reports</h2>
          <div className="flex items-end justify-end gap-4">
            <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={exportToExcel}>
              Export to Excel
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={exportToPDF}>
              Export to PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
