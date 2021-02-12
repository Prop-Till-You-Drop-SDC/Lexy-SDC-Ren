import React from 'react';

import Styles from './topStyles/LodgingDetails.module.css';

import SVGZoo from './SVGZoo.jsx';


function LodgingDetails(props) {

  return (
    <div className={Styles['LodgingDetailsContainer']}>

      <div className={Styles['info-header']}>

      <div className={Styles["lodging-header"]}>
        Entire apartment hosted by {props.lodge.hostName}
      </div>

      <div className={Styles["loging-breakdown"]}>
        {props.lodge.guests} guests · {props.lodge.bedrooms} bedroom · {props.lodge.beds} bed · {props.lodge.baths} bath
      </div>

      <div className={Styles["lodging-header-psudo-boarder"]}></div>

    </div>

    {/* <!-- Info Section  --> */}
    <div className={Styles['lodging-feature']}>
      <div className={Styles["lodging-feature-icon"]}>
        <SVGZoo name={'house'}/>
      </div>
      <div className={Styles['lodging-feature-name']}>Entire home</div>
      <div className={Styles['lodging-feature-extra']}>You’ll have the apartment to yourself.</div>
    </div>


    <div className={Styles['lodging-feature']}>
      <div className={Styles["lodging-feature-icon"]}>
        <SVGZoo name={'sparkle'}/>
      </div>


      <div className={Styles['lodging-feature-name']}>Enhanced Clean</div>
      <div className={Styles['lodging-feature-extra']}>This host committed to Airbnb's 5-step enhanced cleaning process.</div>
    </div>


    <div className={Styles['lodging-feature']}>
      <div className={Styles["lodging-feature-icon"]}>
        <SVGZoo name={'door'}/>
      </div>
      <div className={Styles['lodging-feature-name']}>Self check-in</div>
      <div className={Styles['lodging-feature-extra']}>Check yourself in with the lockbox.</div>
    </div>


    <div className={Styles['lodging-feature']}>
      <div className={Styles["lodging-feature-icon"]}>
        <SVGZoo name={'rules'}/>
      </div>
      <div className={Styles['lodging-feature-name']}>House rules</div>
      <div className={Styles['lodging-feature-extra']}>This place isn’t suitable for children under 12 and the host doesn’t allow pets, parties, or smoking.</div>
    </div>

  </div>

  )

  }
 export default LodgingDetails;