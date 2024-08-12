import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div>
  <footer className="footer">
    <div className="container">
      <div className="row w-100 d-flex justify-content-between ">
        <div className="col-lg-4 col-md-12 mb-4 mb-lg-0">
          <h5>Company Name</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque vestibulum nisi vitae magna dictum, et vehicula erat sollicitudin.</p>
        </div>
        
        <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
          <h5>Quick Links</h5>
          <ul className="list-unstyled">
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-12 mb-4 mb-lg-0">
          <h5>Support</h5>
          <ul className="list-unstyled">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        <div className="col-lg-2 col-md-12">
          <h5>Follow Us</h5>
          <div className="social-icons">
            <a href="#" className="text-white"><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-white"><i className="fab fa-twitter"></i></a>
            <a href="#" className="text-white"><i className="fab fa-instagram"></i></a>
            <a href="#" className="text-white"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <hr className="my-4"/>
      <div className="text-center">
        <p className="mb-0">&copy; 2024 Company Name. All Rights Reserved.</p>
      </div>
    </div>
  </footer>
    </div>
  )
}

export default Footer