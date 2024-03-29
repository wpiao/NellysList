import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
// This import gets rid of mapbox css warnings
import 'mapbox-gl/dist/mapbox-gl.css';
import './Map.css';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export const Map = ({ coordinates }) => {
  const mapContainerRef = useRef(null);
  const [zoom, setZoom] = useState(12);

  // Initialize map when component mounts
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [coordinates.lng, coordinates.lat],
      zoom: zoom,
    });

    map.on('move', () => {
      setZoom(map.getZoom().toFixed(2));
    });

    // Clean up on unmount
    return () => map.remove();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <div className="sidebarStyle">
        <div>Zoom: {zoom}</div>
      </div>
      <div className="map-container" ref={mapContainerRef} />
    </div>
  );
};
