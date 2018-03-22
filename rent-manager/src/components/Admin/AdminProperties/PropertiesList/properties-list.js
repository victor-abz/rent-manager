import React, { Component } from 'react';
import ReactDOM from 'react';
import { NavLink } from 'react-router-dom'
import { Maximize2, User } from 'react-feather'
import './properties-list.css';
import rentManagerApi from '../../../../api/api-client'

class PropertiesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            properties: []

        }
    }

    componentDidMount = () => {
        rentManagerApi.getProperties().then(properties => {
            this.setState({ properties })
        })
    }

    showDot = (status) => {
        switch (status) {
            case 'free':
                return <div className="green-dot" />
                break;
            case 'busy':
                return <div className="red-dot" />
                break;
            case 'booked':
                return <div className="yellow-dot" />
                break;
        }
    }

    componentWillReceiveProps = (nextProps) => {

        console.log(nextProps)

        if (nextProps != this.props) {
            rentManagerApi.getPropertiesByFilter(nextProps.status, nextProps.hood)
                .then(properties => {
                    this.setState({properties})

                    if(nextProps.query) {
                        rentManagerApi.getPropertySearch(nextProps.status, nextProps.hood, nextProps.query)
                            .then(filteredProperties => {
                                console.log(filteredProperties)
                                this.setState({properties: filteredProperties})
                            })
                    }
            })            
        }        
    }

    render() {
        return (
            <div className="card-columns">
                {this.state.properties.map(property => {
                    return <div className="card p-0" key={property.reference}>
                        <img className="card-img-top p-0" src={property.picture} alt="Card image cap" />
                        <div className="info-card">
                            <div className="card-body">
                                <h5 className="card-title">{property.reference} {this.showDot(property.status)}</h5>
                                <div className="card-text">
                                    <div className="container-fluid">
                                        <div className="row mb-3 mt-2">
                                            <div className="col-12 p-0 mt-2">{property.address}</div>
                                            <div className="col-12 p-0 mt-2">{property.neighbourhood}</div>
                                            <div className="col-12 p-0 mt-2">{property.price} €</div>
                                            <div className="col-6 p-0 mt-2"><Maximize2 />{property.sqm} m2</div>
                                            <div className="col-6 p-0"><User />{property.rooms} rooms</div>
                                            </div>
                                        </div>
                                    </div>
                                <div className="d-flex justify-content-around">
                                    <a href="#" className="btn btn-warning">Edit</a>
                                    <a href="#" className="btn btn-danger">Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                })}                
            </div>




        )
    }
}


export default PropertiesList