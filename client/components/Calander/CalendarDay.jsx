import React from "react";

import styles from './calander.css';


class CalendarDay extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      classes: "cal-day",
      reserved: this.props.reserved,
      selected: this.props.selected,
      bwselected: this.props.bwselected,
    }



    this.onClick = this.props.clickHandler.bind(this);
    this.dayClickHandler = this.dayClickHandler.bind(this);

  }

  dayClickHandler() {

    this.onClick(this.props.day, this.props.month);

  }



  render () {
    console.log(`in Day Render: ${this.props.selected}`);

    let classStr = this.state.classes;
    let specialStr = '';
    if (this.props.selected) {
      console.log('----------------------------In Selected');
      specialStr += "selected";
    } else if (this.props.bwselected) {
      console.log('In BW Selected');
      specialStr += "bwselected";
    }

    if (this.state.reserved) {
      specialStr += "reserved";
    }

    console.log(styles)

    return (
      <td className={styles[specialStr]} onClick={this.dayClickHandler}>{
        this.props.day}
      </td>
    )
  }

}

export default CalendarDay;


// Resource https://programmingwithmosh.com/react/build-a-react-calendar-component-from-scratch/