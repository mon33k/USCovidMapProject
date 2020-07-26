import React, { Component } from 'react';
import "./map-stylesheet.css"
import 'leaflet/dist/leaflet.css';
import {Button} from "react-bootstrap"

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'


class MapComponent extends Component {
    constructor() {
        super()
        this.state = { 
            // Map Coordinates
            lat: 39.381266,
            lng: -97.922211,
            zoom: 4,

            // Map settings 
            recenterClicked: 'active'// disabled : active
        }
        this.handleOnClickReCenter = this.handleOnClickReCenter.bind(this)
    }


    componentDidMount() {
    

    }

    handleOnClickReCenter() { 
        let clickToggle = this.state.recenterClicked;
            clickToggle === 'active' ? clickToggle = 'active' : clickToggle = 'disabled'
            this.setState({
                recenterClicked: clickToggle
            })
            return this.state.recenterClicked
            
    }

    render() {
        const {lat, lng, zoom, recenterClicked} = this.state
        const position = [lat, lng]
        const newyork = [40.730610, -73.935242];
        console.log("recenter Clicked", this.state.recenterClicked)

        const map = (
            <Map center={position} zoom={zoom}>
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
            <div>
                <Button variant="primary" size="lg" onClick={this.handleOnClickReCenter}>Re-center Map</Button>
                    {map}
            </div>
        )
    }
}

export default MapComponent;