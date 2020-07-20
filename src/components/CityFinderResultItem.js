import React, { Component } from 'react'

class CityFinderResultItem extends Component {
    handleEnterPressed = (e) => {
        let code = e.keyCode || e.which;
        if (code === 13) {
            this.props.citySelectHandler(this.props.listing.gid)
        }
    };

    render() {
        return (
            <a key={this.props.id}
                tabIndex={0}
                className={'searched-city--item'}
                onKeyPress={(e) => this.handleEnterPressed(e)}
                onClick={() => {this.props.citySelectHandler(this.props.listing.gid)}}>
            <div className={'searched-city-item--city'}>
            {this.props.listing.cityName},
            {this.props.listing.regionName},
            {this.props.listing.countryName}
            </div>
            </a>
        );
    }
}

export default CityFinderResultItem;
