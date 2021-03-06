import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
class googleMap extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    position: { lat: 15.87, lng: 100.9925 },
    center: { lat: 15.87, lng: 100.9925 },
  };
  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  onMapClicked = (mapProps, map, clickEvent) => {
    //if (this.state.showingInfoWindow) {
    this.setState({
      showingInfoWindow: false,
      activeMarker: null,
      position: {
        lat: clickEvent.latLng.lat(),
        lng: clickEvent.latLng.lng(),
      },
    });
    document.getElementById(
      "Customer_Latitude"
    ).value = clickEvent.latLng.lat();
    this.props.handleMap(document.getElementById("Customer_Latitude"));
    document.getElementById(
      "Customer_Longtitude"
    ).value = clickEvent.latLng.lng();
    this.props.handleMap(document.getElementById("Customer_Longtitude"));
  };
  render() {
    return (
      <div
        className="position-relative"
        style={{ height: "600px", border: "1px solid gray" }}
      >
        <input
          type="hidden"
          id="Customer_Latitude"
          name="Customer_Latitude"
          value=""
        />
        <input
          type="hidden"
          id="Customer_Longtitude"
          name="Customer_Longtitude"
          value=""
        />
        <Map
          google={this.props.google}
          initialCenter={this.state.center}
          onClick={this.onMapClicked}
        >
          <Marker
            onClick={this.onMarkerClick}
            name={"คุณ"}
            position={this.state.position}
          />

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
}
export default GoogleApiWrapper({
  apiKey: "AIzaSyCFU_U1T37xH_Xm4-FJ-EJslB8gTUyMizQ",
  language: "TH",
})(googleMap);
