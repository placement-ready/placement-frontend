"use client";
import React from "react";

const pricingPlans = [
  {
    name: "Starter",
    description: "Best option for personal use & for your next project.",
    price: 29,
    period: "/month",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 1 developer",
      "Premium support: 6 months",
      "Free updates: 6 months"
    ],
    buttonText: "Get started",
    isPopular: false
  },
  {
    name: "Company",
    description: "Relevant for multiple users, extended & premium support.",
    price: 99,
    period: "/month",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 10 developers",
      "Premium support: 24 months",
      "Free updates: 24 months"
    ],
    buttonText: "Get started",
    isPopular: true
  },
  {
    name: "Enterprise",
    description: "Best for large scale uses and extended redistribution rights.",
    price: 499,
    period: "/month",
    features: [
      "Individual configuration",
      "No setup, or hidden fees",
      "Team size: 100+ developers",
      "Premium support: 36 months",
      "Free updates: 36 months"
    ],
    buttonText: "Get started",
    isPopular: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-gradient-to-br from-gray-50 via-white to-emerald-50/30 relative">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 rounded-full bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-700 font-medium text-sm tracking-wide">Choose Your Plan</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4">
            Simple, Transparent{" "}
            <span className="bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent">
              Pricing
            </span>
          </h2>

          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Choose the perfect plan for your needs. Upgrade or downgrade at any time.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative ${plan.isPopular ? 'lg:scale-105' : ''}`}
            >
              {/* Popular badge */}
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                    Most Popular
                  </div>
                </div>
              )}

              {/* Card */}
              <div 
                className={`bg-white rounded-2xl p-8 shadow-lg border transition-all duration-200 hover:shadow-xl hover:-translate-y-1 ${
                  plan.isPopular 
                    ? 'border-emerald-200 shadow-emerald-500/10' 
                    : 'border-gray-200 hover:border-emerald-200'
                }`}
              >
                {/* Plan name and description */}
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {plan.description}
                  </p>
                </div>

                {/* Price */}
                <div className="text-center mb-8">
                  <div className="flex items-baseline justify-center">
                    <span className="text-5xl font-black text-gray-900">
                      ${plan.price}
                    </span>
                    <span className="text-gray-600 text-lg ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-center">
                      <div className="flex-shrink-0 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center mr-3">
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Button */}
                <button 
                  className="w-full py-4 px-6 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-semibold rounded-xl transition-all duration-200 hover:scale-105 hover:from-emerald-600 hover:to-green-600 shadow-lg"
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom text */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing;