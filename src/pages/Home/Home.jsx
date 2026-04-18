import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiStar,
  FiShield,
  FiClock,
  FiCheckCircle,
} from "react-icons/fi";
import {
  MdPlumbing,
  MdElectricBolt,
  MdCleaningServices,
  MdAcUnit,
  MdFormatPaint,
  MdBuild,
} from "react-icons/md";

// ── Data ──────────────────────────────────────────

const categories = [
  {
    icon: MdPlumbing,
    label: "Plumbing",
    color: "bg-blue-50 text-blue-600",
    count: "48 providers",
  },
  {
    icon: MdElectricBolt,
    label: "Electrical",
    color: "bg-yellow-50 text-yellow-600",
    count: "35 providers",
  },
  {
    icon: MdCleaningServices,
    label: "Cleaning",
    color: "bg-green-50 text-green-600",
    count: "62 providers",
  },
  {
    icon: MdAcUnit,
    label: "AC Repair",
    color: "bg-cyan-50 text-cyan-600",
    count: "29 providers",
  },
  {
    icon: MdFormatPaint,
    label: "Painting",
    color: "bg-orange-50 text-orange-600",
    count: "41 providers",
  },
  {
    icon: MdBuild,
    label: "Carpentry",
    color: "bg-rose-50 text-rose-600",
    count: "33 providers",
  },
];

const steps = [
  {
    step: "01",
    title: "Choose a Service",
    desc: "Browse through our wide range of home services and pick what you need.",
    color: "bg-blue-600",
  },
  {
    step: "02",
    title: "Book a Provider",
    desc: "Select a trusted provider based on ratings, reviews, and availability.",
    color: "bg-orange-500",
  },
  {
    step: "03",
    title: "Get It Done",
    desc: "Your provider arrives on time and completes the job to your satisfaction.",
    color: "bg-green-500",
  },
];

const testimonials = [
  {
    name: "Samira Khan",
    role: "Homeowner",
    review:
      "Absolutely fantastic service! The plumber arrived within 2 hours and fixed everything perfectly.",
    rating: 5,
    avatar: "SJ",
    color: "bg-purple-500",
  },
  {
    name: "Ahmed Rahman",
    role: "Office Manager",
    review:
      "Used HomeService for AC maintenance. Professional, on-time, and reasonably priced.",
    rating: 5,
    avatar: "AR",
    color: "bg-blue-500",
  },
  {
    name: "Priya Saha",
    role: "Homeowner",
    review:
      "The cleaning team did an outstanding job. My house has never looked this clean before!",
    rating: 5,
    avatar: "PS",
    color: "bg-rose-500",
  },
];

const stats = [
  { value: "10,000+", label: "Happy Customers" },
  { value: "500+", label: "Verified Providers" },
  { value: "25+", label: "Service Categories" },
  { value: "4.9★", label: "Average Rating" },
];

// ── Component ──────────────────────────────────────

const Home = () => {
  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-700 via-blue-600 to-blue-500 overflow-hidden">
        {/* Decorations */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/4" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/5 rounded-full" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm px-4 py-1.5 rounded-full mb-6 border border-white/20">
              <FiStar size={13} className="text-yellow-300" />
              Trusted by 10,000+ homeowners
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
              Home Services,
              <br />
              <span className="text-yellow-300">Done Right.</span>
            </h1>

            <p className="text-blue-100 text-lg md:text-xl leading-relaxed mb-10 max-w-xl">
              Connect with verified, professional service providers for all your
              home repair and maintenance needs — fast, easy, and reliable.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg shadow-blue-800/30 text-sm"
              >
                Explore Services
                <FiArrowRight size={16} />
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-sm"
              >
                Become a Provider
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-5 mt-10">
              {[
                { icon: FiShield, text: "Verified Providers" },
                { icon: FiClock, text: "24/7 Support" },
                { icon: FiCheckCircle, text: "Satisfaction Guaranteed" },
              ].map(({ icon: Icon, text }) => (
                <div
                  key={text}
                  className="flex items-center gap-2 text-blue-100 text-sm"
                >
                  <Icon size={15} className="text-yellow-300" />
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <p className="text-3xl font-bold text-white">{value}</p>
                <p className="text-gray-400 text-sm mt-1">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Service Categories ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
            What We Offer
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Popular Services
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            From plumbing to painting — we have verified professionals for every
            home service you need.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ icon: Icon, label, color, count }) => (
            <Link
              key={label}
              to={`/services?category=${label.toLowerCase()}`}
              className="group flex flex-col items-center gap-3 p-5 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-50 transition-all duration-300 bg-white"
            >
              <div
                className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
              >
                <Icon size={26} />
              </div>
              <p className="font-semibold text-gray-800 text-sm">{label}</p>
              <p className="text-gray-400 text-xs">{count}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-xl hover:bg-blue-600 hover:text-white transition-all text-sm"
          >
            View All Services
            <FiArrowRight size={15} />
          </Link>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section id="how-it-works" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
              Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              How It Works
            </h2>
            <p className="text-gray-500 mt-3 max-w-xl mx-auto">
              Getting home services has never been easier. Just 3 simple steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map(({ step, title, desc, color }, i) => (
              <div key={step} className="relative">
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-full h-0.5 bg-gray-200 z-0" />
                )}
                <div className="relative z-10 bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div
                    className={`w-14 h-14 ${color} rounded-2xl flex items-center justify-center mb-5`}
                  >
                    <span className="text-white font-bold text-lg">{step}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-blue-600 text-sm font-semibold uppercase tracking-wider mb-2">
            Customer Reviews
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            What Our Customers Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, review, rating, avatar, color }) => (
            <div
              key={name}
              className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(rating)].map((_, i) => (
                  <FiStar
                    key={i}
                    size={14}
                    className="text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                "{review}"
              </p>
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 ${color} rounded-full flex items-center justify-center`}
                >
                  <span className="text-white text-sm font-bold">{avatar}</span>
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{name}</p>
                  <p className="text-gray-400 text-xs">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-blue-700 to-blue-500 py-20">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-blue-100 text-lg mb-8">
            Join thousands of happy homeowners who trust HomeService for their
            home needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all shadow-lg text-sm"
            >
              Create Free Account
            </Link>
            <Link
              to="/services"
              className="px-8 py-4 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-all border border-white/30 text-sm"
            >
              Browse Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
