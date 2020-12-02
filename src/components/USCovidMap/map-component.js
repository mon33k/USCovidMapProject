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

            // locationData:  [],
            // //CovidData
            // covidData: [],

            //Change tile color when clicked
            clickedState: false
        }
        this.handleOnClickReCenter = this.handleOnClickReCenter.bind(this);
        this.handleZoomEnd = this.handleZoomEnd(this);
        this.handleZoomStart = this.handleZoomStart(this);

    }


    componentDidMount() {
        // this.getCovidData()
        // this.showAllMarkers()
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
        // console.log("e.target END", e.target)
        // return this.state.zoom
    }
    handleZoomStart = (e) => {
        // console.log("this.map.leafletElement.getZoom()", this.map.leafletElement.getZoom())
        // console.log("e.target START", e.target)
        // return this.state.zoom
    }

    /**
     * 
     * 
     *  recovered: 7161
        score: 0
        state: "AK"
        total: 844666
        positive: 21812
        negative: 822854
        lastUpdateEt: "11/12/2020 03:59"
        hospitalizedCurrently: 113
        deathConfirmed: 96

    */
    // Set locationData and covidData state here
    showAllMarkers () {
        let locationDataArr= [] // geoData for now
        const info = []

        axios.get('https://api.covidtracking.com/v1/states/current.json')
                .then(res => {
            try {
                    res.data.forEach(ele => {
                        let dataObj = {}
                    
                        if(ele.state) {
                            dataObj['recovered'] = ele.recovered
                            dataObj['score'] = ele.score
                            dataObj['state'] = ele.state
                            dataObj['total'] = ele.total
                            dataObj['positive'] = ele.positive
                            dataObj['negative'] = ele.negative
                            dataObj['lastUpdateEt'] = ele.lastUpdateEt
                            dataObj['hospitalizedCurrently'] = ele.hospitalizedCurrently
                            dataObj['deathConfirmed'] = ele.deathConfirmed
                            info.push(dataObj)
                        }
                }) 
                this.setState({
                    covidData: info
                })
            } catch(err) {
                console.log('err', err)
            }
        })

            for(let state in geodata.features) {
                let dataObj = {}
                    dataObj['state'] = geodata.features[state].properties.STUSPS10
                    dataObj['position'] = [parseFloat(geodata.features[state].properties.INTPTLAT10), parseFloat(geodata.features[state].properties.INTPTLON10)]
                    locationDataArr.push(dataObj)
            }
            this.setState({
                locationData: locationDataArr
            })
    }

    clickEachState = (region, layer) => { 
        const {locationData, covidData} = this.state
        const regionName = region.properties.STUSPS10

            console.log("covidData", covidData)

        // if(locationData) {
            locationData.forEach(stateLocation => {
                if(regionName === stateLocation.state) {
                    // layer.bindPopup()
                    // console.log("region", regionName)

                }

            })
        // }
        layer.bindPopup(regionName)
        layer.on({
            click: (event => {
                event.target.setStyle({
                    color: "green",
                    fillColor: "yellow"
                })
            }) 
        });
    }

    render() {
        const {lat, lng, zoom, recenterClicked} = this.state
        // console.log("covidData", covidData)
        // console.log("locationData", locationData)
        // const position = [lat, lng]
        // console.log("recenter Clicked", lat, lng)
        const newyork = [40.730610, -73.935242];

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
                        // onEachFeature={this.clickEachState}
                    />
                    {/* {covidData.length > 0 ? locationData.map((elem, i) => {
                            return (
                                <Marker position={elem.position} key={i}>
                                    <Popup position={elem.position}>
                                        <ul>
                                            <li key={i}>Recovered: {covidData[i].recovered}</li>
                                        </ul>
                                    </Popup>
                                </Marker>
                                )                        
                    })
                    : ""} */}
            </Map>
            </div>
        )
    }
}

export default MapComponent;