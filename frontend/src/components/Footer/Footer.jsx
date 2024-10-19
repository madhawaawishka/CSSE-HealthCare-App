import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { RiLinkedinFill } from "react-icons/ri";
import { AiFillYoutube, AiFillGithub, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="pt-10 pb-16">
      <div className="container">
        <div className="flex flex-col flex-wrap justify-between gap-10 md:flex-row">
          {/* Logo and description */}
          <div>
            <img src={logo} alt="Company Logo" className="mb-4" />
            <p className="text-[16px] leading-7 font-normal text-textColor">
              &copy; {year} Lorem ipsum dolor sit amet consectetur adipisicasi!
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <Link to="https://www.linkedin.com" className="text-headingColor">
              <RiLinkedinFill size={24} />
            </Link>
            <Link to="https://www.youtube.com" className="text-headingColor">
              <AiFillYoutube size={24} />
            </Link>
            <Link to="https://www.github.com" className="text-headingColor">
              <AiFillGithub size={24} />
            </Link>
            <Link to="https://www.instagram.com" className="text-headingColor">
              <AiOutlineInstagram size={24} />
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-[18px] font-semibold text-headingColor mb-4">Quick Links</h3>
            <Link to="/" className="text-[16px] text-textColor hover:text-primaryColor">Home</Link>
            <Link to="/about" className="text-[16px] text-textColor hover:text-primaryColor">About Us</Link>
            <Link to="/services" className="text-[16px] text-textColor hover:text-primaryColor">Services</Link>
            <Link to="/blog" className="text-[16px] text-textColor hover:text-primaryColor">Blog</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
