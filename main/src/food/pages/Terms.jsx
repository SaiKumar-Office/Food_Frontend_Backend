/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import TopBar from '../components/TopBar';
import Footer from '../components/Footer';

const Terms = () => {
  const containerStyle = {
    padding: '20px',
    maxWidth: '1200px',
    margin: '80px auto',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
  };

  const headingStyle = {
    fontSize: '32px',
    color: '#1A3636',
    textAlign: 'center',
    borderBottom: '2px solid #1A3636',
    paddingBottom: '10px',
    marginBottom: '30px',
  };
  const headingStyle1 = {
    fontSize: '32px',
    color: '#1A3636',
    textAlign: 'center',
    borderTop: '2px solid #1A3636',
    paddingBottom: '10px',
    marginBottom: '30px',
  };

  const sectionHeadingStyle = {
    fontSize: '24px',
    color: '#1A3636',
    marginBottom: '10px',
    marginTop: '30px',
  };

  const linkStyle = {
    display: 'inline-block',
    // marginTop: '10px',
    // left:"20px",
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#1A3636',
    border: 'none',
    borderRadius: '4px',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  };

  const linkHoverStyle = {
    backgroundColor: '#154545',
  };

  return (
    <>
        <div style={containerStyle}>
        <TopBar />
      <h1 style={headingStyle}>Terms and Conditions</h1>

      <div>
        <p>Last updated: 18/09/2024</p>

        <h2 style={sectionHeadingStyle}>1. Introduction</h2>
        <p>
          Quick Bites is a platform that connects users Customers with restaurants and vendors to order food and beverages for delivery or pick-up. These terms govern your use of the App, including any orders placed through it.
        </p>

        <h2 style={sectionHeadingStyle}>2. Eligibility</h2>
        <p>
          To use the Quick Bites App, you must:
          <ul>
            <li>Be at least 18 years of age or have the consent of a parent or legal guardian.</li>
            <li>Provide accurate and complete information when creating an account or placing an order.</li>
          </ul>
        </p>

        <h2 style={sectionHeadingStyle}>3. Account Registration</h2>
        <p>
          Users are required to create an account to use the App services. You agree to provide accurate and complete information and to keep this information up to date. Quick Bites reserves the right to terminate accounts or cancel orders at its discretion.
        </p>

        <h2 style={sectionHeadingStyle}>4. Ordering Process</h2>
        <p>
          All orders placed through the App are subject to acceptance by the participating restaurants or vendors. Prices and availability of menu items may change without notice.
        </p>

        <h2 style={sectionHeadingStyle}>5. Payments and Refunds</h2>
        <p>
          Payment for orders can be made through the payment methods provided within the App. Refunds will only be processed under specific circumstances, such as missing or incorrect items, subject to review.
        </p>

        <h2 style={sectionHeadingStyle}>6. Delivery and Pick-up</h2>
        <p>
          Delivery times provided by the App are estimates and may vary due to traffic, weather, or other unforeseen circumstances.
        </p>

        <h2 style={sectionHeadingStyle}>7. User Conduct</h2>
        <p>
          You agree to use the App in a lawful manner and not to engage in any conduct that may harm Quick Bites, the restaurants, or other users. Any misuse of the platform will result in account termination.
        </p>

        <h2 style={sectionHeadingStyle}>8. Restaurant/Vendor Responsibilities</h2>
        <p>
          Restaurants and vendors are responsible for ensuring that the food is prepared in compliance with health and safety regulations. Quick Bites does not take responsibility for the quality of food provided by restaurants or vendors.
        </p>

        <h2 style={sectionHeadingStyle}>9. Limitation of Liability</h2>
        <p>
          Quick Bites provides the App on an basis and makes no warranties regarding the availability or reliability of the App or services provided by the restaurants and vendors.
        </p>

        <h2 style={sectionHeadingStyle}>10. Intellectual Property</h2>
        <p>
          All content, including but not limited to text, graphics, logos, and software, is the property of Quick Bites or its licensors. You may not use, reproduce, or distribute any content from the App without prior written consent.
        </p>

        <h2 style={headingStyle}>Privacy Policy</h2>
        <p>
          Your use of the App is also governed by our Privacy Policy, which explains how we collect, use, and protect your personal information.
        </p>

        <h2 style={sectionHeadingStyle}>1. Modification of Terms</h2>
        <p>
          Quick Bites reserves the right to modify these terms and conditions at any time. Any changes will be posted on the App and will take effect immediately.
        </p>

        <h2 style={sectionHeadingStyle}>2. Termination</h2>
        <p>
          Quick Bites may terminate or suspend your account without notice if you violate these terms.
        </p>

        <h2 style={sectionHeadingStyle}>3. Governing Law</h2>
        <p>
          These terms and conditions are governed by the laws of [Insert Jurisdiction].
        </p>

        <h2 style={sectionHeadingStyle}>4. Contact Information</h2>
        <p>
          If you have any questions or concerns regarding these terms and conditions, please contact us at:
          <br />
          <div>
          
          <h2 style={headingStyle1} >Quick Bites</h2>
          
          </div>
          
          
        </p>

        <Link
          to="/"
          style={{
            ...linkStyle,
            // marginRight: '10px',
            // marginLeft: '520px',

          }}
        >
          Back to Home
        </Link>
      </div>
      
    </div>
    <Footer />
    </>
  );
};

export default Terms;
