import { useEffect, useState } from "react";

export default function Report() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL_PROD}/api/report`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data.rows || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-3xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Campaign Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-2 border">Campaign</th>
              <th className="p-2 border">Campaigner</th>
              <th className="p-2 border">Unique Visitors</th>
              <th className="p-2 border">Total Clicks</th>
              <th className="p-2 border">Link</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r._id} className="hover:bg-gray-50">
                <td className="p-2 border">{r.campaignName}</td>
                <td className="p-2 border">{r.campaignerName}</td>
                <td className="p-2 border">{r.uniqueCount}</td>
                <td className="p-2 border">{r.totalClicks}</td>
                <td className="p-2 border text-blue-600 underline">
                  <a href={r.link} target="_blank">{r.link}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
