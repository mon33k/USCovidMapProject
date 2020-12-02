import React from 'react'
import {Navbar, Nav} from 'react-bootstrap';


class Header extends React.Component {

    render() {
        return (
            <Navbar expand="lg" variant="light" bg="light">
                <Nav.Link href="/home">Home</Nav.Link>
                <Nav.Link href="/us-covid-map">US Map Cases</Nav.Link>
                <Nav.Link href="/us-covid-news">US News </Nav.Link>
            </Navbar>
        )
    }
}

export default Header;