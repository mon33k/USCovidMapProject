import axios from 'axios'
import React, { Component } from 'react';
import geodata from '../../data/usmap.json'
import "./map-stylesheet.css"
import 'leaflet/dist/leaflet.css'; 
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css'; // Re-uses images from ~leaflet package
import * as L from 'leaflet';
import 'leaflet-defaulticon-compatibility';
import {Button} from "react-bootstrap"
import { Map, Marker, Popup, TileLayer, MapControl, GeoJSON } from 'react-leaflet'


class MapComponent extends Component {
    constructor() {
        super()
        this.state = { 
            // Map Coordinates
            lat: 39.381266,
            lng: -97.922211,
            zoom: 4,

            // Map settings 
            recenterClicked: {},//resets to lat and long default

            //CovidData
            data: []
        }
        this.handleOnClickReCenter = this.handleOnClickReCenter.bind(this);
        this.handleZoomEnd = this.handleZoomEnd(this);
        this.handleZoomStart = this.handleZoomStart(this);

    }


    componentDidMount() {
        this.getCovidData()
    }

    getCovidData() {
        const {data} = this.state
        axios.get('https://api.covidtracking.com/v1/states/current.json').then(res => {
            // console.log('res.state', res.data)
            res.data.forEach(ele => {
                // console.log("each state", ele.state)
            });
            //this.setState(
                // data: [...data, {'id': res.fips, 'coors': res.}]
            //)
        })
    }
 
    handleOnClickReCenter = () => { 
        // e.preventDefault()
        this.setState({
             // Map Coordinates
            lat: 39.381266,
            lng: -97.922211,
            zoom: 4,
        })
    }

    handleZoomEnd = (e) => {
        // console.log("this.map.leafletElement.getZoom()", this.map.leafletElement.getZoom())
        console.log("e.target END", e.target)
        // return this.state.zoom
    }
    handleZoomStart = (e) => {
        // console.log("this.map.leafletElement.getZoom()", this.map.leafletElement.getZoom())
        console.log("e.target START", e.target)
        // return this.state.zoom
    }

    showAllMarkers () {
        const newyork = [40.730610, -73.935242];
        console.log("STUSPS10", geodata.features)

        let positionInfo = function() {
            for(let state in geodata.features) {
                let dataObj = {}
                console.log("each state", geodata.features[state].properties.STUSPS10)
            }
        }
      

        // const newarr = geodata.features.map(e => {
        //     console.log("STUSPS10", e.properties.STUSPS10)
        // })
        // console.log("geodata marker to state", newarr)
        return (
            <Marker position={newyork}>
                    <Popup>
                        A pretty CSS3 popup. <br/> Easily customizable.
                    </Popup>
            </Marker>
        )
    }

    render() {
        const {lat, lng, zoom, recenterClicked} = this.state
        // const position = [lat, lng]
        console.log("recenter Clicked", lat, lng)

        return (
            <div>
                <Button variant="primary" size="lg" onClick={this.handleOnClickReCenter}>Re-center Map</Button>
                <Map 
                    center={[lat, lng]} zoom={zoom} 
                    onzoomstart={this.handleZoomStart}
                    onzoomend={this.handleZoomEnd}
                >
                    <GeoJSON
                        data={geodata.features}
                        style={() => ({
                            color: '#4a83ec',
                            weight: 0.5,
                            fillColor: "#1a1d62",
                            fillOpacity: 1,
                        })}
                        // onEachFeature={}
                    />
                    {s}
            </Map>
            </div>
        )
    }
}

export default MapComponent;