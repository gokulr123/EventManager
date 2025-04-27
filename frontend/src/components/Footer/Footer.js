import React from 'react';
import './Footer.css'; // You can style it in a separate CSS file

const Footer = () => {
  return (
    <section class="footer">
      <div className="box-container">
        <div className="box">
          <h3> EventLoop <i className="fas fa-cocktail"></i> </h3>
          <p>Easily participate in birthdays, trips, or casual meetups and stay connected with your circle!</p>
          <div className="share">
            <a href="" className="fab fa-facebook-f"></a>
            <a href="" className="fab fa-twitter"></a>
            <a href="" className="fab fa-instagram"></a>
            <a href="" className="fab fa-linkedin"></a>
          </div>
        </div>

        <div className="box">
          <h3>contact info</h3>
          <a href="" className="links"> <i className="fas fa-phone"></i> 7356749899 </a>
          <a href="" className="links"> <i className="fas fa-envelope"></i> gokulrajan007tvm@gmail.com </a>
          <a href="" className="links"> <i className="fas fa-map-marker-alt"></i> trivandrum , india -695006 </a>
        </div>

        <div className="box">
          <h3>quick links</h3>
          <a href="" className="links"> <i className="fas fa-arrow-right"></i> home </a>
          <a href="" className="links"> <i className="fas fa-arrow-right"></i> live event </a>
          <a href="" className="links"> <i className="fas fa-arrow-right"></i> upcoming event </a>
   
        </div>

       
      </div>
    </section>
  );
};

export default Footer;
