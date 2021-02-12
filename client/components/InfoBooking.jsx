import React from 'react';
import axios from 'axios';

import LodgingDetails from './LodgingDetails.jsx';
import LodgingDescription from './LodgingDescription.jsx';

import Booking from './Booking.jsx';

import Styles from './topStyles/InfoBooking.module.css';

class InfoBooking extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPrice: 87,
      cleaningFee: 30,
      serviceFee: 53,
      taxesFees: 64,
      lodgeDetails: {
        hostName: '',
        price: 0,
        guests: 0,
        bedrooms: 0,
        beds: 0,
        baths: 0
      }
    }

    this.getLodgingData = this.getLodgingData.bind(this);
  }

  getLodgingData (id, cb) {
    axios.get(`/lodge/${id}`)
    .then(function (response) {
      cb(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentDidMount () {

    this.getLodgingData(9999990, (data) => {
      data = data[0];
      console.log(data)
      var details = {
        price: data.lodgingDetails.price,
        hostName: data.host.name,
        guests: data.lodgingDetails.guests,
        bedrooms: data.lodgingDetails.bedrooms,
        beds: data.lodgingDetails.beds,
        baths: data.lodgingDetails.baths,
      }
      this.setState({
        lodgeDetails: details
      })
    });
  }

  render() {
    return (

      <div className={Styles['infomation']}>
        {/* Spacer  */}
        <div className={Styles['booking-info-spacer']}></div>

        {/* Info */}

        <div className={Styles['info']}>
        <LodgingDetails lodge={this.state.lodgeDetails}/>

        </div>

        {/* Booking */}

        <div className={Styles['booking']}>
        <Booking
          oldPrice ={this.state.oldPrice}
          cleaningFee ={this.state.cleaningFee}
          serviceFee ={this.state.serviceFee}
          taxesFees ={this.state.taxesFees}
          lodge={this.state.lodgeDetails}
          />
        </div>
        <div>
        {/* <LodgingDescription /> */}
        </div>

      </div>

    )
  }
}

export default InfoBooking;
