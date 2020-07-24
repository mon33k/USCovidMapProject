import React, { Component } from 'react';
import "./map-stylesheet.css"
import 'leaflet/dist/leaflet.css';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class MapComponent extends Component {
    constructor() {
        super()
        this.state = { 
            lat: 39.381266,
            lng: -97.922211,
            zoom: 4
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng]
        const newyork = [40.730610, -73.935242];

        const map = (
            <Map center={position} zoom={this.state.zoom}>
                <TileLayer
                    url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={newyork}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
                </Marker>
            </Map>
        )
        return (
            <div>Map Component
                    {map}
            </div>
        )
    }
}

export default MapComponent;