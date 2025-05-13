import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

export default function DbfViewer() {
  const { name } = useParams();               // /dbf-viewer/:name
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(`/dbf/${name}`)
      .then(res => setData(res.data))
      .catch(() => setData([]));
  }, [name]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">DBF: {name.toUpperCase()}</h2>
      <pre className="mt-2 overflow-auto bg-gray-100 p-2">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
