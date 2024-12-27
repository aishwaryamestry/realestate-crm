import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "50%",
  height: "70vh",
    width: "20vw",
  height: "200px",
  /* you need to match the shadow color to your background or image border for the desired effect*/
  boxShadow: "0 0 8px 8px blue inset",
};

const center = {
  lat: 37.7749, // San Francisco, CA
  lng: -122.4194,
};

const MapView = () => {
  return (
    <>
      <div className="bg-gray-50 min-h-screen flex items-center justify-center px-16">
        <div className="relative w-full max-w-lg">
         
          {/* Center clear content */}
          <div className="relative z-10">
            <div className="bg-gray-[50px] p-8 rounded-lg border-transparent border-hidden">
              <LoadScript
                googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
              >
                <GoogleMap
                  mapContainerStyle={containerStyle}
                  center={center}
                  zoom={12}
                  className="bg-gray-[50px] p-8 rounded-lg border-transparent border-hidden"
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </>
    // {/* <div className="relative w-full h-screen">
    //   {/* Map Container */}
    //   <div className="absolute inset-0 z-0">
    //     <LoadScript
    //       googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    //     >
    //       <GoogleMap
    //         mapContainerStyle={containerStyle}
    //         center={center}
    //         zoom={12}
    //       >
    //         <Marker position={center} />
    //       </GoogleMap>
    //     </LoadScript>
    //   </div>

    //   {/* White Blurred Border */}
    //   <div className="relative inset-0 z-10 pointer-events-none">
    //     {/* Apply a white backdrop blur around the map */}
    //     <div className="absolute inset-0 bg-white/60 backdrop-blur-lg"></div>

    //     {/* Masking Clear Center */}
    //     <div className="absolute inset-0 flex justify-center items-center pointer-events-none">
    //       {/* The clear center mask */}
    //       <div className="w-4/5 h-4/5 bg-transparent rounded-lg">
    //         <div className="absolute inset-0 z-20">
    //           <LoadScript
    //             googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
    //           >
    //             <GoogleMap
    //               mapContainerStyle={containerStyle}
    //               center={center}
    //               zoom={12}
    //             >
    //               <Marker position={center} />
    //             </GoogleMap>
    //           </LoadScript>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // // </div> */}
  );
};

export default MapView;
