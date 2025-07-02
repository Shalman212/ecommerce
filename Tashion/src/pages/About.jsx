import React from "react";

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
      {/* Top: Image Left, Text Right */}
      <div className="flex flex-col md:flex-row items-center mb-12 gap-10">
        {/* Left: Image */}
        <div className="md:w-1/2 w-full flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
            alt="About Tashion"
            className="rounded-xl shadow-lg w-full max-w-sm object-cover"
          />
        </div>
        {/* Right: Text */}
        <div className="md:w-1/2 w-full">
          <h1 className="text-4xl font-bold mb-4">About Tashion</h1>
          <p className="text-lg mb-4">
            Tashion is an online fashion destination built for trendsetters, minimalists, and those who value both style and substance.
          </p>
          <div className="bg-gray-100 rounded-xl p-5 shadow">
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p>
              To inspire confidence by making fashion accessible, sustainable, and enjoyable for everyone. We carefully curate collections that blend comfort with the latest styles, ensuring our customers always look and feel their best.
            </p>
          </div>
        </div>
      </div>
      {/* Why Choose Us */}
      <div>
        <h2 className="text-2xl font-bold text-center mb-8">WHY CHOOSE US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <span className="text-lg font-semibold mb-2">Quality Assurance</span>
            <p>
              We meticulously select and vet each product to ensure it meets our stringent quality standards.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <span className="text-lg font-semibold mb-2">Convenience</span>
            <p>
              With our user-friendly interface and hassle-free ordering process, shopping has never been easier.
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center text-center">
            <span className="text-lg font-semibold mb-2">Exceptional Customer Service</span>
            <p>
              Our team of dedicated professionals is here to assist you the way, ensuring your satisfaction is our top priority.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
