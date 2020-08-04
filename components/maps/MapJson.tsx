import { useState, useEffect } from 'react';
import { json } from 'd3';

const jsonUrl = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson';

export const useUsaJson = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    json(jsonUrl).then(function(data) { setData(data); });
  }, []);

  return data;
};