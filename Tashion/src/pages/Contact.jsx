import React, { useState } from "react";

const Contact = () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto px-4 py-16 text-gray-800">
            <div className="flex flex-col md:flex-row items-center mb-12 gap-10">
                {/* Left: Image */}
                <div className="md:w-1/2 w-full flex justify-center">
                    <img
                        src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
                        alt="Contact Tashion"
                        className="rounded-xl shadow-lg w-full max-w-sm object-cover"
                    />
                </div>
                {/* Right: Contact Form and Info */}
                <div className="md:w-1/2 w-full">
                    <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
                    <p className="mb-6 text-lg">
                        Have a question, feedback, or partnership opportunity? Reach out to Tashion! Our team in Dhaka will respond as soon as possible.
                    </p>
                    <form onSubmit={handleSubmit} className="bg-gray-100 rounded-xl p-5 shadow flex flex-col gap-4">
                        <input
                            className="border rounded px-3 py-2"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Your Name"
                            required
                        />
                        <input
                            className="border rounded px-3 py-2"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            placeholder="Your Email"
                            required
                        />
                        <textarea
                            className="border rounded px-3 py-2 min-h-[100px]"
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            placeholder="Your Message"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white py-2 rounded font-semibold hover:bg-gray-900 transition"
                        >
                            Send Message
                        </button>
                        {submitted && (
                            <div className="text-green-600 font-semibold text-center mt-2">
                                Thank you! We'll be in touch soon.
                            </div>
                        )}
                    </form>
                    <div className="mt-8 text-center md:text-left text-sm text-gray-700">
                        <div>
                            <span className="font-bold">Email:</span> support@tashion.com
                        </div>
                        <div>
                            <span className="font-bold">Phone:</span> +880 1XXXXXXXXX
                        </div>
                        <div>
                            <span className="font-bold">Address:</span> 12/A Gulshan Avenue, Gulshan, Dhaka, Bangladesh
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
