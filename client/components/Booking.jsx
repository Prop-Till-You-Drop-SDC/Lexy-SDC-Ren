import React from 'react';

import DateTextInput from './Calander/DateTextInput.jsx';

import GuestPanel from './Guests/GuestPanel.jsx';

import SVGZoo from './SVGZoo.jsx';
import axios from 'axios';


import Styles from './topStyles/Booking.module.css';

import moment from 'moment'




class Booking extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      type: this.props.type,
      value: '',
      firstMoment: null,
      lastMoment: null,
      firstTextValue: "",
      lastTextValue: "",
      totalGuests: 0,
      Adults: 0,
      Children: 0,
      Infants: 0,
      calanderVisable: false,
      guestVisable: false,

    }

    this.handleTextInput = this.handleTextInput.bind(this);
    this.raiseDate = this.raiseDate.bind(this);
    this.toggleCalanderVisable = this.toggleCalanderVisable.bind(this);
    this.toggleGuestsVisable = this.toggleGuestsVisable.bind(this);
    this.incGuests = this.incGuests.bind(this);
    this.computeLineItems = this.computeLineItems.bind(this);


  }






  handleTextInput (type, date) {
    console.log(`In Handle Text Input ${type} ${date}`);


    /// Test if in format of valud date
    if (date.match(/^\d{1,2}\/\d{1,2}\/\d{2}$/)) {
      console.log('It\'s Date');

      var date = moment(new Date(date));

      this.raiseDate(type, date);


    }

  } // End handleTextInput

  raiseDate (type, date) {
    /**
    * Sets the date in the calanders from the text inputs or clicking on the calander
    *
    * @param {string}   type Either  checkIn-book_it or
    * @param {date object}   [date] a moment object if a date exsists or '' to clear it out;
    * @return {void}
    *
    * @sideEffect Set the state of the cmponet by updating either firstmoment or LastMoment
    */

    var dateDate = date === '' ? null : date;
    var dateText = date === '' ? '' : date.format('MM/DD/YYYY');

    if (type === 'checkIn-book_it') {
      this.setState({
        firstMoment: dateDate,
        firstTextValue: dateText
      });
    } else {
      this.setState({
        lastMoment: dateDate,
        lastTextValue: dateText,
        // calanderVisable: closeCalender /// Remove the calnder from view if a parameter is passed
      });
    }

  } // End raiseDate

  toggleCalanderVisable (visible) {
    // debugger;
    this.setState({
      calanderVisable: visible
    })
  }

  toggleGuestsVisable (visible) {
    this.setState({
      guestVisable: visible
    })
  }

  incGuests (type, number) {
    console.log('in Ince Guests ');

    if ((this.state[type] === 0 && number > 0) || this.state[type] > 0) {
      var guestType = this.state[type] + number;

      var totalGuests = this.state.totalGuests + number;

      this.setState({
        totalGuests: totalGuests,
        [type] : guestType
      })

    }

  }

  computeLineItems () {
    var nights = this.state.firstMoment && this.state.lastMoment ? this.state.lastMoment.diff(this.state.firstMoment, 'days') : 0;
    var total = this.props.lodge.price * nights;


    var finalTotal = total + this.props.cleaningFee + this.props.serviceFee + this.props.taxesFees;

    return {nights, total, finalTotal}
  }

  reserve() {
    var lodgeID = Math.floor(Math.random() * 9999999)
    // console.log(lodgeID)
    axios.post(`/reserve/${lodgeID}`)
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }



  render () {

    var lineItems = this.computeLineItems();

    return(

      <div className={Styles["BookingContainer"]}>

        {/* Header  */}
      <div className={Styles['booking-header']}>
        <div className={Styles['header-box']}>
          <div className={Styles['cost-box']}>
            <div className={Styles['old-cost']}>${this.props.oldPrice}</div>
            <div className={Styles['new-cost']}>${this.props.lodge.price}</div>
            <div className={Styles['new-cost-label']}>/night</div>
          </div>
          <div className={Styles['review']}>
          <span className={Styles['review-star']}>★ </span>
            4.88</div>
        </div>
      </div>



      {/* <!-- Reservation Input --> */}
      <div className={Styles['res-detail-input']}>


        <div className={Styles['date-input']}>


          {/* <!-- Hiddend Calander Div  --> */}
          <div className={Styles['hidden-calander-container']}>
            <div className={Styles['hidden-calander-div']}>

              <div className={Styles['hidden-nights-sum']}>
                <div className={Styles['number-nights']}>5 nights</div>
                <div className={Styles['dates-of-nights']}>Apr 28, 2021 - May 3, 2021</div>
              </div>

              <div className={Styles['hidden-date-input']}>
                <div className={Styles['check-in']}>
                  <div className={Styles['date-label']}> Check In </div>
                  <div className={Styles['date-value']}>01/01/2021</div>
                </div>


                <div className={Styles['check-out']}>
                  <div className={Styles['date-label']}>Check Out</div>
                  <div className={Styles['date-value']}>01/30/2021</div>
                </div>
              </div>

              <div className={Styles["hidden-close-button"]}>
                <button className={Styles["clear-dates"]}>Clear Dates</button>
                <button className={Styles["close-button"]}>Close</button>
              </div>

              </div>

          </div>
          {/* <!-- End Hiddend Calander Div  --> */}



          <DateTextInput raiseDate={this.raiseDate}
          firstMoment={this.state.firstMoment}
          lastMoment={this.state.lastMoment}
          calanderVisable={this.state.calanderVisable}
          toggleCalanderVisable={this.toggleCalanderVisable}
          handleTextInput = {this.handleTextInput}/>

        </div>

        {/* // <!-- Guests Selection  --> */}

        <div className={Styles['guests-psudo-boarder']}></div>
        <div className={Styles['guests']} onClick={() => {this.state.guestVisable ? this.toggleGuestsVisable(false) : this.toggleGuestsVisable(true)}} >

          <div>
          <div className={Styles['guests-label']}>Guests</div>
          <div className={Styles['guests-value']}>{this.state.totalGuests} guests</div>
          </div>

          <div className={Styles['select-guests']} >
            <SVGZoo name='arrowdown'/>
          </div>

        </div>
    </div>


    <GuestPanel guestVisable={this.state.guestVisable}
    Adults={this.state.Adults}
    Children={this.state.Children}
    Infants={this.state.Infants}
    incGuests={this.incGuests}
    toggleGuestsVisable={this.toggleGuestsVisable}
    />


        <div className={Styles['reservation-button']} onClick={this.reserve}>
        <div className={Styles["res-button"]}>
          <h3>Reserve</h3>
        </div>
        <div className={Styles['disclaimer']}>
          You Wont be Charged Yet
        </div>
    </div>


      {/* Cost Breakdown  */}
    <div className={Styles['cost-breakdown']}>
      <div className={Styles['line-item']}>${this.props.lodge.price} x {lineItems.nights} nights</div>
      <div>${lineItems.total}</div>
      <div className={Styles['line-item']}>Cleaning fee</div>
      <div>${this.props.cleaningFee}</div>
      <div className={Styles['line-item']}>Service fee</div>
      <div>${this.props.serviceFee}</div>
      <div className={Styles['line-item']}>Taxes and Fees</div>
      <div>${this.props.taxesFees}</div>
    </div>

    <div className={Styles['total']}>
        <div className={Styles['total-psudo-boarder']}></div>
        <div className={Styles['total-box']}>
          <div className={Styles['total-label']}>Total</div>
          <div className={Styles['total-amount']}>${lineItems.finalTotal}</div>
        </div>
      </div>



      </div>)
  }
}

 export default Booking;