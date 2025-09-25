import { useState } from "react";

export default function CreateCampaign() {
  const [campaignName, setCampaignName] = useState("");
  const [campaigners, setCampaigners] = useState("");
  const [links, setLinks] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8086/api/campaign/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          campaignName,
          campaigner: campaigners,
        }),
      });
      const data = await res.json();
      setLinks(data.links || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Create Campaign</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Campaign Name</label>
          <input
            value={campaignName}
            onChange={(e) => setCampaignName(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        <div>
          <label className="block font-medium">Campaigners (comma-separated)</label>
          <input
            value={campaigners}
            onChange={(e) => setCampaigners(e.target.value)}
            className="w-full border rounded p-2 mt-1"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create"}
        </button>
      </form>

      {links.length > 0 && (
        <div className="mt-6">
          <h2 className="font-semibold mb-2">Generated Links</h2>
          <ul className="space-y-1">
            {links.map((l, idx) => (
              <li key={idx} className="border rounded p-2 bg-gray-50">
                <span className="font-medium">{l.name}:</span>{" "}
                <a href={l.link} target="_blank" className="text-blue-600 underline">{l.link}</a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
