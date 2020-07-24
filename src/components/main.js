import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import LandingPage from './landing-page';
import MapComponent from './USCovidMap/map-component';
import NewsComponent from './USCovidNews/news-component';

class Main extends React.Component {

    render() {
        return (
            <div>
                <Route path="/home" component={LandingPage}></Route>
                <Route path="/us-covid-map" component={MapComponent}></Route>
                <Route path="/us-covid-news" component={NewsComponent}></Route>
            </div>
        )
    }
}

export default Main;