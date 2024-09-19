import React from "react";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-5 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              POPULAR LOCATIONS
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>Kolkata</li>
              <li>Mumbai</li>
              <li>Chennai</li>
              <li>Pune</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              TRENDING LOCATIONS
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>Bhubaneshwar</li>
              <li>Hyderabad</li>
              <li>Chandigarh</li>
              <li>Nashik</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              ABOUT US
            </h3>
            <ul className="space-y-2 text-gray-500">
              <li>Tech@OLX</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">OLX</h3>
            <ul className="space-y-2 text-gray-500">
              <li>Blog</li>
              <li>Help</li>
              <li>Sitemap</li>
              <li>Legal & Privacy information</li>
              <li>Vulnerability Disclosure Program</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              FOLLOW US
            </h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" aria-label="Facebook" className="text-gray-500">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="#" aria-label="Instagram" className="text-gray-500">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" aria-label="Twitter" className="text-gray-500">
                <i className="fab fa-twitter"></i>
              </a>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="w-32">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Google Play Store"
                  className="h-12 w-32 object-contain"
                />
              </a>
              <a href="#" className="w-32">
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Apple Store"
                  className="h-12 w-32 object-contain"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
