import React from 'react';

const Contact = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-emerald-200 to-white h-auto w-auto p-5">
      {/* Added margin-top (mt-24) to prevent overlap with Navbar */}
      <h1 className="text-3xl font-bold mt-24 mb-4 text-gray-800">Contact Us</h1>
      <p className="text-lg text-gray-700 mb-6 text-center">
        Feel free to reach out to us for any inquiries or assistance.
      </p>

      {/* Contact Section with Image */}
      <div className="flex flex-col md:flex-row items-center bg-gradient-to-b from-emerald-200 to-white h-auto p-5 shadow-lg rounded-lg overflow-hidden max-w-4xl w-full">
        {/* Contact Image */}
        <div className="w-full md:w-1/2">
          <img
            src="https://lifencolors.in/cdn/shop/products/d4050a_d7fa06e7b9ac4f028cbdc32630b51429_mv2_f9397927-e4fa-4001-a4c1-c8c2ef555869.jpg?v=1693805664"
            alt="Contact Us"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Contact Details */}
        <div className="w-full md:w-1/2 p-6 text-center">
          <p className="text-lg font-semibold text-gray-800">📧 Email: contact@travelhogs.com</p>
          <p className="text-lg font-semibold mt-3 text-gray-800">📞 Phone: +91-456-7890</p>
          <p className="text-lg font-semibold mt-3 text-gray-800">📍 Address: 1234 Street Name, City, Country</p>

          
        </div>
      </div>
    </div>
  );
};

export default Contact;
