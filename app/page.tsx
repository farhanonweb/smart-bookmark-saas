import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-white flex flex-col">

      <header className="flex items-center justify-between px-6 md:px-16 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center font-bold shadow-lg">
            SB
          </div>
          <span className="text-xl font-semibold tracking-wide">
            SmartBook
          </span>
        </div>

        <Link
          href="/login"
          className="bg-blue-600 hover:bg-blue-700 transition px-6 py-2 rounded-lg text-sm font-medium shadow-md"
        >
          Login
        </Link>
      </header>

      <section className="flex flex-col items-center text-center px-6 md:px-20 py-20 md:py-32">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl">
          Organize Your Digital World with
          <span className="text-blue-500"> SmartBook</span>
        </h1>

        <p className="text-gray-400 mt-6 max-w-2xl text-base md:text-lg">
          A modern bookmark management platform that helps you save,
          organize and access your important links securely — anytime,
          anywhere.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <Link
            href="/login"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-3 rounded-xl font-semibold transition shadow-lg"
          >
            Get Started Free
          </Link>

          <a
            href="#solution"
            className="border border-gray-700 hover:border-blue-500 px-8 py-3 rounded-xl transition"
          >
            Learn More
          </a>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 border-t border-gray-800 bg-gray-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          The Problem
        </h2>

        <div className="max-w-4xl mx-auto text-center text-gray-400 leading-relaxed">
          <p className="mb-6">
            Most people save bookmarks in browsers, notes apps, or messaging apps.
            Over time, links get lost, disorganized, or scattered across devices.
          </p>
          <p>
            There is no centralized, secure and clean system to manage
            important links efficiently.
          </p>
        </div>
      </section>

      <section id="solution" className="px-6 md:px-20 py-20 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Our Solution
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">📌 Centralized Storage</h3>
            <p className="text-gray-400 text-sm">
              Save all your bookmarks in one secure cloud-based dashboard.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">⚡ Realtime Updates</h3>
            <p className="text-gray-400 text-sm">
              Instant sync without page refresh using modern realtime technology.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-xl">
            <h3 className="text-xl font-semibold mb-4">🌍 Access Anywhere</h3>
            <p className="text-gray-400 text-sm">
              Use SmartBook seamlessly on mobile, tablet, or desktop.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 border-t border-gray-800 bg-gray-950">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Secure Authentication
        </h2>

        <div className="max-w-4xl mx-auto text-gray-400 leading-relaxed text-center">
          <p className="mb-6">
            SmartBook uses Google OAuth authentication for secure and
            trusted login experience.
          </p>

          <p className="mb-6">
            We never store your password. Authentication is handled securely
            through Google's official OAuth system.
          </p>

          <p>
            Your bookmarks are linked to your personal account and protected
            with database-level security policies.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-20 py-20 border-t border-gray-800">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Why Choose SmartBook?
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">✔ Clean & Modern UI</h3>
              <p className="text-gray-400 text-sm">
                A distraction-free dashboard focused on productivity.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Fast Performance</h3>
              <p className="text-gray-400 text-sm">
                Optimized frontend and backend for lightning speed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Secure Data Policies</h3>
              <p className="text-gray-400 text-sm">
                Database-level protection ensures only you access your data.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-lg">✔ Realtime Experience</h3>
              <p className="text-gray-400 text-sm">
                Add or delete bookmarks without refreshing the page.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Fully Responsive</h3>
              <p className="text-gray-400 text-sm">
                Works perfectly on mobile phones and large desktop screens.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">✔ Built for Scalability</h3>
              <p className="text-gray-400 text-sm">
                Designed with modern architecture for future growth.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-20 py-24 text-center border-t border-gray-800 bg-gray-950">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Ready to Organize Your Bookmarks?
        </h2>

        <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
          Join SmartBook and experience a better way to manage
          your important links securely and efficiently.
        </p>

        <Link
          href="/login"
          className="inline-block bg-blue-600 hover:bg-blue-700 px-10 py-4 rounded-xl font-semibold shadow-lg transition"
        >
          Go to Login
        </Link>
      </section>

      <footer className="mt-auto border-t border-gray-800 py-8 px-6 md:px-20 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} SmartBook — Developed by Farhan Gheri
      </footer>

    </div>
  );
}
