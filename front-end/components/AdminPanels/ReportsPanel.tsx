"use client";

import React, { useEffect, useState } from 'react';

export default function ReportsPanel() {
  const [reports, setReports] = useState<any[]>([]);
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/admin/reports');
      const data = await res.json();
      setReports(data);
    })();
  }, []);

  return (
    <div>
      <h3 className="font-semibold mb-2">Reports</h3>
      <div className="space-y-2">
        {reports.map(r => (
          <div key={r.id} className="p-2 bg-white dark:bg-gray-800 rounded">
            <div className="font-medium">{r.type} #{r.targetId}</div>
            <div className="text-sm text-gray-500">Reason: {r.reason}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
