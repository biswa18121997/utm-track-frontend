import { useEffect, useState } from "react";

export default function Report() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openCampaign, setOpenCampaign] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/report`)
      .then((res) => res.json())
      .then((data) => {
        setRows(data.rows || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching report:", err);
        setLoading(false);
      });
  }, []);

  const toggleCampaign = (id) => {
    setOpenCampaign(openCampaign === id ? null : id);
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-6">📊 Campaign Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No campaigns found.</p>
      ) : (
        <div className="space-y-4">
          {rows.map((campaign) => (
            <div
              key={campaign._id}
              className="border rounded-lg overflow-hidden shadow-sm"
            >
              {/* Campaign Header */}
              <div
                className="flex justify-between items-center bg-gray-100 px-4 py-3 cursor-pointer hover:bg-gray-200"
                onClick={() => toggleCampaign(campaign._id)}
              >
                <div>
                  <h2 className="font-semibold text-lg">
                    📢 {campaign.campaign_name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Created: {new Date(campaign.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-700">
                    Total Clicks: {campaign.totalClicks}
                  </p>
                  <p className="font-bold text-gray-700">
                    Unique Visitors: {campaign.totalUniques}
                  </p>
                </div>
              </div>

              {/* Campaigners Table */}
              {openCampaign === campaign._id && (
                <div className="p-4">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="p-2 border">Campaigner</th>
                        <th className="p-2 border">Unique Visitors</th>
                        <th className="p-2 border">Total Clicks</th>
                        <th className="p-2 border">Link</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaign.campaigners.map((c, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="p-2 border">{c.utm_source}</td>
                          <td className="p-2 border">{c.unique_clicks}</td>
                          <td className="p-2 border">{c.total_clicks}</td>
                          <td className="p-2 border text-blue-600 underline">
                            <a
                              href={c.link}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {c.link}
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
