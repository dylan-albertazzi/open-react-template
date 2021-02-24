import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { SectionProps } from '../../utils/SectionProps';
import ButtonGroup from '../elements/ButtonGroup';
import Button from '../elements/Button';
import Image from '../elements/Image';
import Modal from '../elements/Modal';
import rocketDoge from '../../assets/images/doge-rocket.jpeg';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsExports from '../../aws-exports';

import { updateDoge } from '../../graphql/mutations'
import { getDoge } from '../../graphql/queries'
Amplify.configure(awsExports);

const propTypes = {
  ...SectionProps.types
}

const defaultProps = {
  ...SectionProps.defaults
}

const Hero = ({
  className,
  topOuterDivider,
  bottomOuterDivider,
  topDivider,
  bottomDivider,
  hasBgColor,
  invertColor,
  ...props
}) => {

  useEffect(() => {
    fetchDogePrice()
  }, [])

  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  }

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  }   
  const [dogePrice, setDogePrice] = useState(0);

  async function fetchDogePrice() {
    try {
      console.log("in doge price")
      const dogeData = await API.graphql(graphqlOperation(getDoge))
      const dogePrice = dogeData.data.getDoge.price
      console.log("==Dogeprice: ", dogePrice)
      setDogePrice(dogePrice)

    } catch (err) {
      console.log('error fetching todos')
      console.log(err)
    }
  }

  async function updateDogePrice() {
    try {
      console.log("in doge price")
      const dogeData = await API.graphql(graphqlOperation(getDoge))
      const dogePrice = dogeData.data.getDoge.price + 0.1
      console.log("==Dogeprice: ", dogePrice)
      // const dogeObject = { id: "1", price: dogePrice }
      const updatedDogePrice = await API.graphql(graphqlOperation(updateDoge, { input: dogePrice }))
      console.log("==Dogeprice: ", updatedDogePrice)
      setDogePrice(updatedDogePrice.data.updateDoge.price)
      // var snd = new Audio("../../assets/images/cash.mp3"); // buffers automatically when created
      // snd.play();
      const audioEl = document.getElementsByClassName("audio-element")[0]
      audioEl.play()

    } catch (err) {
      console.log('error fetching todos')
      console.log(err)
    }
  }


  const outerClasses = classNames(
    'hero section center-content',
    topOuterDivider && 'has-top-divider',
    bottomOuterDivider && 'has-bottom-divider',
    hasBgColor && 'has-bg-color',
    invertColor && 'invert-color',
    className
  );

  const innerClasses = classNames(
    'hero-inner section-inner',
    topDivider && 'has-top-divider',
    bottomDivider && 'has-bottom-divider'
  );

  return (
    <section
      {...props}
      className={outerClasses}
    >
      <div className="container-sm">
        <div className={innerClasses}>
          <div className="hero-content">
            <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
              Dogecoin Price <span className="text-color-primary">Predictor</span>
            </h1>
            <div className="container-xs">
              <p className="m-0 mb-32 reveal-from-bottom" data-reveal-delay="400">
                One click = 10 cents
                </p>
              <div className="reveal-from-bottom" data-reveal-delay="600">
                <h1 className="mt-0 mb-16 reveal-from-bottom" data-reveal-delay="200">
               <span className="text-color-secondary">$ {dogePrice.toFixed(2)}</span>
               </h1>
                <ButtonGroup>
                  <Button tag="a" color="secondary" wideMobile onClick={updateDogePrice}>
                    Doge 🚀
                    </Button>
                  
                </ButtonGroup>
              </div>
            </div>
          </div>
          <div className="hero-figure reveal-from-bottom illustration-element-01" data-reveal-value="20px" data-reveal-delay="800">
            <a
              
              aria-controls="video-modal"
              onClick={openModal}
            >
              <Image
                className="has-shadow"
                src={rocketDoge}
                alt="Hero"
                width={896}
                height={504} />
            </a>
          </div>
          
        </div>
      </div>
      <audio className="audio-element">
        <source src={require("../../assets/images/cash.mp3")}></source>
      </audio>
    </section>
    
  );
}

Hero.propTypes = propTypes;
Hero.defaultProps = defaultProps;

export default Hero;