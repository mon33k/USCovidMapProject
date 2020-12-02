import React from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './landing-page';
import MapComponent from './USCovidMap/map-component';
import NewsComponent from './USCovidNews/news-component';
import geodata from '../data/usmap.json'
import axios from 'axios'


class Main extends React.Component {
    constructor() { 
        super()
        this.state = {
            locationData:  [],
            //CovidData
            covidData: [],
        }
    }

    componentDidMount() {
        this.showAllMarkers()
    }

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

    infoToMapComponent() {
        // const {locationData, covidData} = this.state
        // console.log('locationData', locationData)
        // console.log('covidData', covidData)
        return (
            <MapComponent/>
        )
    }

    render() {
        const {locationData, covidData} = this.state
        console.log('locationData', locationData)
        console.log('covidData', covidData)

        return (
            <div>
                <Route path="/home" component={LandingPage}></Route>
                <Route path="/us-covid-map" component={this.infoToMapComponent}></Route>
                <Route path="/us-covid-news" component={NewsComponent}></Route>
            </div>
        )
    }
}

export default Main;