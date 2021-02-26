import React, { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
function googleMap(props) {
  let markPosition = { lat: 37.778519, lng: -122.40564 };
  const onMarkerClick = (mapProps, map, clickEvent) => {
    console.log(props);
    markPosition.lat = clickEvent.latLng.lat();
    markPosition.lng = clickEvent.latLng.lng();
  };

  return (
    <div>
      <Map
        style={{ width: "100%" }}
        google={props.google}
        zoom={14}
        onClick={onMarkerClick}
        initialCenter={{
          lat: 37.769,
          lng: -122.446,
        }}
      >
        <Marker name={"Current location"} position={markPosition} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow>
      </Map>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCFU_U1T37xH_Xm4-FJ-EJslB8gTUyMizQ",
  language: "TH",
})(googleMap);
