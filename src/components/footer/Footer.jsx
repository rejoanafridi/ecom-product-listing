import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow py-4 text-center">
      <p className="text-sm text-indigo-600">
        &copy; {currentYear} Rejoan Islam. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
