import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="navbar-logo" style={{ fontSize: '1.6rem' }}>🍔 FoodRush</div>
            <p>Bringing the best food from your favourite restaurants right to your doorstep — fast, fresh and delicious.</p>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Press</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>For You</h4>
            <ul>
              <li><Link to="/restaurants">Restaurants</Link></li>
              <li><a href="#">Offers</a></li>
              <li><Link to="/orders">My Orders</Link></li>
              <li><a href="#">Help Centre</a></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Partner</h4>
            <ul>
              <li><a href="#">Add Your Restaurant</a></li>
              <li><a href="#">Delivery Partner</a></li>
              <li><a href="#">Advertise</a></li>
              <li><a href="#">Terms & Privacy</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} FoodRush. All rights reserved.</span>
          <span>Made with ❤️ for DevOps learners</span>
        </div>
      </div>
    </footer>
  );
}
