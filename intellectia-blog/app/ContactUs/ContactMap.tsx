// 'use client';

// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LatLngExpression } from 'leaflet';
// import L from 'leaflet';
// import { DefaultIcon } from '@/utils/leaf-icon';

// L.Marker.prototype.options.icon = DefaultIcon;

// const position: LatLngExpression = [12.961518, 77.59513];

// const Map = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   return (
//     <MapContainer
//       center={position}
//       zoom={16}
//       scrollWheelZoom={false}
//       attributionControl={false}
//       style={{ height: '250px', width: '75%' }}
//     >
//       <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
//       <Marker
//         position={position}
//         eventHandlers={{
//           click: () => {
//             window.open(
//               'https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297!16s%2Fg%2F1tdxj98p',
//               '_blank'
//             );
//           },
//         }}
//       />
//     </MapContainer>
//   );
// };

// export default Map;
// 'use client';

// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Marker } from 'react-leaflet';
// import 'leaflet/dist/leaflet.css';
// import { LatLngExpression } from 'leaflet';
// import L from 'leaflet';
// import { DefaultIcon } from '@/utils/leaf-icon';

// L.Marker.prototype.options.icon = DefaultIcon;

// const position: LatLngExpression = [12.961518, 77.59513];

// const Map = () => {
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   return (
//     <MapContainer
//       key={`${position[0]}-${position[1]}`}  // ✅ ensures clean re-mount
//       center={position}
//       zoom={16}
//       scrollWheelZoom={false}
//       attributionControl={false}
//       style={{ height: '250px', width: '75%' }}
//     >
//       <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
//       <Marker
//         position={position}
//         eventHandlers={{
//           click: () => {
//             window.open(
//               'https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297!16s%2Fg%2F1tdxj98p',
//               '_blank'
//             );
//           },
//         }}
//       />
//     </MapContainer>
//   );
// };

// export default Map;

// Map.tsx
"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import { DefaultIcon } from "@/utils/leaf-icon";

L.Marker.prototype.options.icon = DefaultIcon;

const position: LatLngExpression = [12.961518, 77.59513];

const Map = () => {
  return (
    <MapContainer
      center={position}
      zoom={16}
      scrollWheelZoom={false}
      attributionControl={false}
      style={{ height: "250px", width: "75%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <Marker
        position={position}
        eventHandlers={{
          click: () => {
            window.open(
              "https://www.google.com/maps/place/Intelectia+Legal+Firm/@12.961518,77.5925548,17z/data=!3m1!4b1!4m6!3m5!1s0x3bae15d13a793489:0xe5f93f75c0c87a66!8m2!3d12.961518!4d77.5951297!16s%2Fg%2F1tdxj98p",
              "_blank"
            );
          },
        }}
      />
    </MapContainer>
  );
};

export default Map;
