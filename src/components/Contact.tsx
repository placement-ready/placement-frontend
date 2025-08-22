"use client";
import React, { useState } from "react";

const Contact: React.FC = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// const handleSubmit = (e: React.FormEvent) => {
	//   e.preventDefault();
	//   console.log('Form submitted:', formData);
	//   // Handle form submission here
	// };

	return (
		<section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 min-h-screen">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="text-center mb-16">
					<div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl flex items-center justify-center mx-auto mb-8">
						<svg
							className="w-8 h-8 text-white"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</div>

					<h1 className="text-4xl sm:text-5xl font-black text-gray-900 mb-6">
						Get in{" "}
						<span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
							Touch
						</span>
					</h1>

					<p className="text-gray-600 text-lg max-w-2xl mx-auto">
						Have questions about our interview preparation platform? We&apos;d love to hear from
						you.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
					{/* Contact Form */}
					<div className="lg:col-span-2">
						<div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-200">
							<h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h3>

							<div className="space-y-6">
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
									<div>
										<label
											htmlFor="name"
											className="block text-sm font-semibold text-gray-700 mb-2"
										>
											Full Name
										</label>
										<input
											type="text"
											id="name"
											name="name"
											value={formData.name}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
											placeholder="Enter your full name"
											required
										/>
									</div>

									<div>
										<label
											htmlFor="email"
											className="block text-sm font-semibold text-gray-700 mb-2"
										>
											Email Address
										</label>
										<input
											type="email"
											id="email"
											name="email"
											value={formData.email}
											onChange={handleChange}
											className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
											placeholder="Enter your email"
											required
										/>
									</div>
								</div>

								<div>
									<label
										htmlFor="subject"
										className="block text-sm font-semibold text-gray-700 mb-2"
									>
										Subject
									</label>
									<select
										id="subject"
										name="subject"
										value={formData.subject}
										onChange={handleChange}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200"
										required
									>
										<option value="">Select a subject</option>
										<option value="general">General Inquiry</option>
										<option value="support">Technical Support</option>
										<option value="billing">Billing & Pricing</option>
										<option value="partnership">Partnership</option>
										<option value="feedback">Feedback</option>
									</select>
								</div>

								<div>
									<label
										htmlFor="message"
										className="block text-sm font-semibold text-gray-700 mb-2"
									>
										Message
									</label>
									<textarea
										id="message"
										name="message"
										value={formData.message}
										onChange={handleChange}
										rows={6}
										className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 resize-none"
										placeholder="Tell us how we can help you..."
										required
									></textarea>
								</div>

								<button
									type="submit"
									className="w-full bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold py-4 px-8 rounded-xl hover:from-emerald-600 hover:to-green-600 transition-all duration-200 hover:scale-105 shadow-lg"
								>
									Send Message
								</button>
							</div>
						</div>
					</div>

					{/* Contact Information */}
					<div className="space-y-8">
						{/* Contact Details */}
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
							<h4 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h4>

							<div className="space-y-4">
								<div className="flex items-start">
									<div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
										<svg
											className="w-5 h-5 text-emerald-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-semibold text-gray-900">Email</p>
										<p className="text-gray-600">support@hiremind.com</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
										<svg
											className="w-5 h-5 text-emerald-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-semibold text-gray-900">Phone</p>
										<p className="text-gray-600">+1 (555) 123-4567</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
										<svg
											className="w-5 h-5 text-emerald-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
											/>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-semibold text-gray-900">Address</p>
										<p className="text-gray-600">
											123 Tech Street
											<br />
											San Francisco, CA 94105
										</p>
									</div>
								</div>

								<div className="flex items-start">
									<div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
										<svg
											className="w-5 h-5 text-emerald-600"
											fill="none"
											viewBox="0 0 24 24"
											stroke="currentColor"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth={2}
												d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
											/>
										</svg>
									</div>
									<div>
										<p className="font-semibold text-gray-900">Business Hours</p>
										<p className="text-gray-600">Mon-Fri: 9AM - 6PM PST</p>
									</div>
								</div>
							</div>
						</div>

						{/* FAQ */}
						<div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
							<h4 className="text-xl font-bold text-gray-900 mb-4">Quick Help</h4>
							<div className="space-y-3">
								<div>
									<p className="font-semibold text-gray-900 text-sm">Need immediate help?</p>
									<p className="text-gray-600 text-sm">Check our FAQ section for quick answers.</p>
								</div>
								<div>
									<p className="font-semibold text-gray-900 text-sm">Technical issues?</p>
									<p className="text-gray-600 text-sm">
										Visit our Help Center for troubleshooting guides.
									</p>
								</div>
								<div>
									<p className="font-semibold text-gray-900 text-sm">Feature requests?</p>
									<p className="text-gray-600 text-sm">We&apos;d love to hear your suggestions!</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Contact;
