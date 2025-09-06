import React from "react";
import ContactSection from "../components/ContactSection";

export default function TailwindDemoPage() {
  return (
    <div className="min-h-screen bg-olive">
      {/* Hero Section - Demonstrating Responsive Design */}
      <section className="py-20 bg-gradient-to-br from-olive-dark via-olive to-olive-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-bold text-accent font-mono mb-6">
              Tailwind CSS
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-brown to-accent">
                Transformation Demo
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Watch how unstyled HTML transforms into beautiful, responsive
              components using Tailwind's utility-first approach.
            </p>
          </div>
        </div>
      </section>

      {/* Before & After Comparison */}
      <section className="py-20 bg-olive-dark/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent font-mono text-center mb-16">
            Before vs After Transformation
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* BEFORE - Unstyled HTML */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-accent mb-6">
                ❌ Before: Unstyled HTML
              </h3>

              {/* Unstyled Card Example */}
              <div className="bg-gray-100 p-6 rounded border">
                <div
                  style={{
                    border: "1px solid #ccc",
                    padding: "16px",
                    margin: "8px",
                    backgroundColor: "#f9f9f9",
                  }}
                >
                  <h3 style={{ fontSize: "18px", marginBottom: "8px" }}>
                    Product Card
                  </h3>
                  <img
                    src="/api/placeholder/200/150"
                    alt="Product"
                    style={{ width: "100%", height: "auto" }}
                  />
                  <p
                    style={{
                      color: "#666",
                      fontSize: "14px",
                      marginBottom: "8px",
                    }}
                  >
                    This is a basic product description without any styling.
                  </p>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontWeight: "bold", color: "#333" }}>
                      $99.99
                    </span>
                    <button
                      style={{
                        padding: "8px 16px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>

              {/* Code Example */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`<div style="border: 1px solid #ccc; padding: 16px;">
  <h3 style="font-size: 18px;">Product Card</h3>
  <img src="product.jpg" style="width: 100%;" />
  <p style="color: #666; font-size: 14px;">
    Basic product description...
  </p>
  <div style="display: flex; justify-content: space-between;">
    <span style="font-weight: bold;">$99.99</span>
    <button style="padding: 8px 16px; background: #007bff;">
      Add to Cart
    </button>
  </div>
</div>`}
                </pre>
              </div>
            </div>

            {/* AFTER - Tailwind Styled */}
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-accent mb-6">
                ✅ After: Tailwind CSS
              </h3>

              {/* Styled Card Example */}
              <div className="group bg-olive-dark/80 backdrop-blur-sm rounded-2xl border border-accent/20 p-6 hover:border-accent/40 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20">
                <div className="relative overflow-hidden rounded-xl mb-6">
                  <div className="w-full h-48 bg-gradient-to-br from-accent/20 to-brown/20 rounded-xl flex items-center justify-center">
                    <span className="text-accent text-4xl">📱</span>
                  </div>
                  <div className="absolute top-4 right-4 px-3 py-1 bg-accent text-olive rounded-full text-sm font-bold">
                    New
                  </div>
                </div>

                <h3 className="text-xl font-bold text-accent mb-3 group-hover:text-accent/90 transition-colors duration-200">
                  Premium Product
                </h3>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Beautiful, responsive product card with hover effects,
                  gradients, and professional typography.
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-accent">$99.99</span>
                  <button className="group/btn px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300">
                    <span className="flex items-center">
                      Add to Cart
                      <svg
                        className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              {/* Tailwind Code Example */}
              <div className="bg-gray-900 p-4 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`<div className="group bg-olive-dark/80 backdrop-blur-sm 
                rounded-2xl border border-accent/20 p-6 
                hover:border-accent/40 transition-all duration-300 
                hover:transform hover:-translate-y-2 
                hover:shadow-2xl hover:shadow-accent/20">
  <h3 className="text-xl font-bold text-accent mb-3 
                 group-hover:text-accent/90 transition-colors">
    Premium Product
  </h3>
  <!-- More Tailwind classes... -->
</div>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Tailwind Concepts */}
      <section className="py-20 bg-gradient-to-b from-olive via-olive-dark to-olive">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent font-mono text-center mb-16">
            Core Tailwind CSS Concepts
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Utility-First */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                Utility-First Approach
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Instead of writing custom CSS, compose designs using small,
                single-purpose utility classes.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  className="p-4 bg-blue-500 text-white rounded-lg"
                </code>
              </div>
            </div>

            {/* Responsive Design */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                Responsive Design
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Use responsive prefixes to apply styles at different breakpoints
                effortlessly.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  className="text-sm md:text-lg lg:text-xl"
                </code>
              </div>
            </div>

            {/* State Variants */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                State Variants
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Style elements based on hover, focus, active states, and more
                using variant prefixes.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  className="bg-blue-500 hover:bg-blue-600 focus:ring-2"
                </code>
              </div>
            </div>

            {/* Design System */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">🎨</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                Design System
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Built-in design system with consistent spacing, colors, and
                typography scales.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  className="p-4 text-gray-700 bg-gray-100 rounded-lg"
                </code>
              </div>
            </div>

            {/* Performance */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                Performance
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Automatic purging removes unused CSS, resulting in tiny
                production builds.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  Final CSS: ~10KB instead of 100KB+
                </code>
              </div>
            </div>

            {/* Customization */}
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10 hover:border-accent/30 transition-all duration-300">
              <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mb-6">
                <span className="text-accent text-2xl">⚙️</span>
              </div>
              <h3 className="text-xl font-bold text-accent mb-4">
                Customization
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4">
                Easily customize the design system through the configuration
                file.
              </p>
              <div className="bg-gray-900 p-3 rounded-lg">
                <code className="text-green-400 text-sm">
                  colors: &#123; brand: '#39FF14' &#125;
                </code>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="py-20 bg-olive-dark/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent font-mono text-center mb-16">
            Practical Transformation Examples
          </h2>

          <div className="space-y-16">
            {/* Button Transformations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Button Transformations
                </h3>

                {/* Basic Button */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-gray-300">
                    Before:
                  </h4>
                  <button
                    style={{
                      padding: "8px 16px",
                      backgroundColor: "#007bff",
                      color: "white",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    Basic Button
                  </button>
                </div>

                {/* Enhanced Buttons */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-300">
                    After:
                  </h4>
                  <div className="flex flex-wrap gap-4">
                    <button className="px-6 py-3 bg-accent text-olive rounded-xl font-bold hover:bg-accent/90 transition-colors duration-300">
                      Primary Button
                    </button>
                    <button className="px-6 py-3 bg-olive-dark border-2 border-accent text-accent rounded-xl font-bold hover:bg-accent hover:text-olive transition-all duration-300">
                      Secondary Button
                    </button>
                    <button className="group px-6 py-3 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 hover:scale-105 transition-all duration-300">
                      <span className="flex items-center">
                        Gradient Button
                        <svg
                          className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                          />
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`/* Before: Inline Styles */
style={{
  padding: '8px 16px',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  borderRadius: '4px'
}}

/* After: Tailwind Classes */
className="px-6 py-3 bg-accent text-olive 
           rounded-xl font-bold 
           hover:bg-accent/90 
           transition-colors duration-300"

/* Advanced: Gradient with Animations */
className="group px-6 py-3 
           bg-gradient-to-r from-accent to-accent/80 
           text-olive rounded-xl font-bold 
           hover:shadow-lg hover:shadow-accent/30 
           hover:scale-105 transition-all duration-300"`}
                </pre>
              </div>
            </div>

            {/* Form Transformations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div>
                <h3 className="text-2xl font-bold text-accent mb-6">
                  Form Transformations
                </h3>

                {/* Basic Form */}
                <div className="space-y-4 mb-8">
                  <h4 className="text-lg font-semibold text-gray-300">
                    Before:
                  </h4>
                  <form
                    style={{
                      border: "1px solid #ddd",
                      padding: "16px",
                      borderRadius: "4px",
                      backgroundColor: "#f9f9f9",
                    }}
                  >
                    <div style={{ marginBottom: "12px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        Email:
                      </label>
                      <input
                        type="email"
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                        }}
                      />
                    </div>
                    <div style={{ marginBottom: "12px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "4px",
                          fontWeight: "bold",
                        }}
                      >
                        Message:
                      </label>
                      <textarea
                        style={{
                          width: "100%",
                          padding: "8px",
                          border: "1px solid #ccc",
                          borderRadius: "4px",
                          minHeight: "100px",
                        }}
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      style={{
                        padding: "10px 20px",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                      }}
                    >
                      Submit
                    </button>
                  </form>
                </div>

                {/* Enhanced Form */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-300">
                    After:
                  </h4>
                  <form className="bg-olive-dark/80 backdrop-blur-sm border border-accent/20 rounded-2xl p-8 space-y-6">
                    <div>
                      <label className="block text-accent font-bold mb-3 text-lg">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-olive border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div>
                      <label className="block text-accent font-bold mb-3 text-lg">
                        Message
                      </label>
                      <textarea
                        className="w-full px-4 py-3 bg-olive border border-accent/20 rounded-xl text-gray-300 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 min-h-[120px] resize-none"
                        placeholder="Your message here..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full px-6 py-4 bg-gradient-to-r from-accent to-accent/80 text-olive rounded-xl font-bold hover:shadow-lg hover:shadow-accent/30 hover:scale-[1.02] transition-all duration-300"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              <div className="bg-gray-900 p-6 rounded-lg">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  {`/* Enhanced Form with Tailwind */
<form className="bg-olive-dark/80 backdrop-blur-sm 
                 border border-accent/20 rounded-2xl 
                 p-8 space-y-6">
  <div>
    <label className="block text-accent font-bold 
                      mb-3 text-lg">
      Email Address
    </label>
    <input className="w-full px-4 py-3 bg-olive 
                      border border-accent/20 rounded-xl 
                      text-gray-300 placeholder-gray-400 
                      focus:outline-none focus:ring-2 
                      focus:ring-accent/50 focus:border-accent 
                      transition-all duration-300" />
  </div>
  <!-- More enhanced form elements -->
</form>`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-gradient-to-t from-olive-dark to-olive">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-accent font-mono mb-8">
            Why Tailwind CSS Transforms Development
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10">
              <h3 className="text-xl font-bold text-accent mb-4">
                Before Tailwind
              </h3>
              <ul className="text-gray-300 space-y-3 text-left">
                <li>• Writing custom CSS for every component</li>
                <li>• Inconsistent spacing and colors</li>
                <li>• Large CSS bundles with unused styles</li>
                <li>• Difficult responsive design</li>
                <li>• Time-consuming hover/focus states</li>
              </ul>
            </div>

            <div className="bg-olive-dark/60 backdrop-blur-sm rounded-2xl p-8 border border-accent/10">
              <h3 className="text-xl font-bold text-accent mb-4">
                After Tailwind
              </h3>
              <ul className="text-gray-300 space-y-3 text-left">
                <li>• Utility-first approach with predefined classes</li>
                <li>• Consistent design system out of the box</li>
                <li>• Tiny production bundles (only used styles)</li>
                <li>• Mobile-first responsive design</li>
                <li>• Built-in state variants and animations</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 p-8 bg-accent/10 backdrop-blur-sm rounded-2xl border border-accent/20">
            <p className="text-xl text-accent font-bold mb-4">
              🚀 Result: 10x Faster Development
            </p>
            <p className="text-gray-300 leading-relaxed">
              Transform hours of CSS writing into minutes of class composition,
              while maintaining consistent, professional designs across your
              entire application.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection variant="compact" />
    </div>
  );
}
