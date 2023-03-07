import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = ({ threshold = 0.2 }) => {
  const footerElementRef = useRef(null);

  useEffect(() => {
    const footer = footerElementRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        footer.classList.toggle("animate-fade-in", entry.isIntersecting);
      },
      { threshold }
    );

    observer.observe(footer);

    return () => {
      observer.unobserve(footer);
    };
  }, [threshold]);
  return (
    <footer ref={footerElementRef} className="bg-[#262c2b] mt-auto">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-[40%] p-4 md:mb-0">
            <Link to="/about">
              <h2 className="text-lg font-bold text-white mb-4">About Us</h2>
            </Link>
            <p className="text-gray-400 text-sm leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
              euismod sapien a felis ornare consequat. Sed porttitor, lacus vel
              imperdiet tincidunt, sapien mauris pretium tellus, vel tincidunt
              ipsum sapien in velit.
            </p>
          </div>
          <div className="w-full md:w-[30%] mb-16 md:mb-0 p-4">
            <Link to="/contact">
              <h2 className="text-lg font-bold text-white mb-4">Contact Us</h2>
            </Link>
            <ul className="text-gray-400 text-sm leading-loose">
              <li>1234 Main St.</li>
              <li>San Francisco, CA 94111</li>
              <li>(555) 555-5555</li>
              <li>info@sizzleslice.com</li>
            </ul>
          </div>
          <div className="w-full md:w-[30%] p-4">
            <h2 className="text-lg font-bold text-white mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-start">
              <a href="https://www.facebook.com/" className="mr-4">
                <FontAwesomeIcon
                  icon={faFacebookF}
                  className="text-white text-2xl hover:text-gray-400 transition-colors duration-300"
                />
              </a>
              <a href="https://twitter.com/" className="mr-4">
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-white text-2xl hover:text-gray-400 transition-colors duration-300"
                />
              </a>
              <a href="https://www.instagram.com/">
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-white text-2xl hover:text-gray-400 transition-colors duration-300"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-teal-500">
        <div className="container mx-auto py-4 px-4 flex justify-center items-center flex-col">
          <p className="text-gray-800 text-sm text-center animate-fade-in">
            &copy;{new Date().getFullYear()} SizzleSlice. All Rights Reserved.
            Developed by Bojan Dimoski
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;