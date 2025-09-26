// import { useEffect, useState } from "react";

// export default function Report() {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${import.meta.env.VITE_API_URL}/api/report`)
//       .then((res) => res.json())
//       .then((data) => {
//         setRows(data.rows || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error(err);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
//       <h1 className="text-xl font-bold mb-4">Campaign Report</h1>
//       {loading ? (
//         <p>Loading...</p>
//       ) : rows.length === 0 ? (
//         <p>No data yet.</p>
//       ) : (
//         <div className="space-y-6">
//           {rows.map((campaign) => (
//             <div key={campaign._id} className="border rounded-lg">
//               <div className="bg-gray-100 p-3 font-semibold">
//                 📢 {campaign.campaign_name}
//               </div>
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="bg-gray-50 text-left">
//                     <th className="p-2 border">Campaigner</th>
//                     <th className="p-2 border">Unique Visitors</th>
//                     <th className="p-2 border">Total Clicks</th>
//                     <th className="p-2 border">Link</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {campaign.utm_source.map((src, idx) => {
//                     const link = `${window.location.origin}?ref=${campaign.link_code}-${src.utm_source}`;
//                     return (
//                       <tr key={idx} className="hover:bg-gray-50">
//                         <td className="p-2 border">{src.utm_source}</td>
//                         <td className="p-2 border">{src.unique_clicks}</td>
//                         <td className="p-2 border">{src.total_clicks}</td>
//                         <td className="p-2 border text-blue-600 underline">
//                           <a href={link} target="_blank" rel="noreferrer">
//                             {link}
//                           </a>
//                         </td>
//                       </tr>
//                     );
//                   })}
//                 </tbody>
//               </table>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";

export default function Report() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/report`)
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
    <div className="max-w-4xl mx-auto bg-white shadow rounded-lg p-6">
      <h1 className="text-xl font-bold mb-4">Campaign Report</h1>
      {loading ? (
        <p>Loading...</p>
      ) : rows.length === 0 ? (
        <p>No data yet.</p>
      ) : (
        <div className="space-y-6">
          {rows.map((campaign) => (
            <div key={campaign._id} className="border rounded-lg">
              <div className="bg-gray-100 p-3 font-semibold">
                📢 {campaign.campaign_name}
              </div>
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
                  {campaign.utm_source.map((src, idx) => {
                    // ✅ use per-campaigner link_code
                    const link = `${window.location.origin}?ref=${src.link_code}`;
                    return (
                      <tr key={idx} className="hover:bg-gray-50">
                        <td className="p-2 border">{src.utm_source}</td>
                        <td className="p-2 border">{src.unique_clicks}</td>
                        <td className="p-2 border">{src.total_clicks}</td>
                        <td className="p-2 border text-blue-600 underline">
                          <a href={link} target="_blank" rel="noreferrer">
                            {link}
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
