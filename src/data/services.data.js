export const DUMMY_SERVICES = [
  {
    _id: "1",
    title: "Professional Plumbing Repair",
    category: "Plumbing",
    price: 500,

    // ─── ছবি change করতে চাইলে এই line ───
    image:
      "https://plus.unsplash.com/premium_photo-1663045495725-89f23b57cfc5?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    // Unsplash থেকে যেকোনো ছবির link দাও
    // অথবা নিজের ছবি: '/images/plumbing.jpg'

    providerName: "Rahim Plumbing Co.",
    providerPhone: "+880 1700 000001",
    rating: 4.8,
    reviewCount: 124,
    location: "Dhaka",
    duration: "1-2 hours",
    isAvailable: true,

    // ─── description change করতে চাইলে এই line ───
    description: "Expert plumbing services for all your home needs...",

    // ─── features change করতে চাইলে এই array ───
    features: [
      "Licensed & certified plumbers",
      "Same-day service available",
      "Warranty on all repairs",
      "Eco-friendly materials used",
      "Free inspection included",
    ],
  },
  {
    _id: "2",
    title: "Home Electrical Wiring & Repair",
    category: "Electrical",
    price: 800,
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&q=80",
    providerName: "Karim Electric",
    providerPhone: "+880 1700 000002",
    rating: 4.9,
    reviewCount: 89,
    location: "Dhaka",
    duration: "2-3 hours",
    isAvailable: true,
    description:
      "Safe and certified electrical services for residential and commercial properties.",
    features: [
      "Certified electricians",
      "Safety inspection included",
      "1-year workmanship warranty",
      "Emergency service available",
      "Transparent pricing",
    ],
  },
  {
    _id: "3",
    title: "Deep Home Cleaning Service",
    category: "Cleaning",
    price: 1200,
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&q=80",
    providerName: "CleanPro BD",
    providerPhone: "+880 1700 000003",
    rating: 4.7,
    reviewCount: 210,
    location: "Chittagong",
    duration: "3-4 hours",
    isAvailable: true,
    description:
      "Thorough deep cleaning service for your entire home using eco-friendly products.",
    features: [
      "Eco-friendly products",
      "Trained cleaning staff",
      "All equipment provided",
      "Satisfaction guaranteed",
      "Flexible scheduling",
    ],
  },
  {
    _id: "4",
    title: "AC Installation & Servicing",
    category: "AC Repair",
    price: 1500,
    image:
      "https://plus.unsplash.com/premium_photo-1682126012378-859ca7a9f4cf?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    providerName: "Cool Air Services",
    providerPhone: "+880 1700 000004",
    rating: 4.6,
    reviewCount: 67,
    location: "Dhaka",
    duration: "2-3 hours",
    isAvailable: false,
    description:
      "Professional AC installation, servicing, and repair for all major brands.",
    features: [
      "All AC brands supported",
      "Gas refilling available",
      "Annual maintenance plans",
      "Emergency repair service",
      "Genuine spare parts",
    ],
  },
  {
    _id: "5",
    title: "Interior & Exterior Painting",
    category: "Painting",
    price: 3000,
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=400&q=80",
    providerName: "Color Masters",
    providerPhone: "+880 1700 000005",
    rating: 4.8,
    reviewCount: 145,
    location: "Sylhet",
    duration: "1-2 days",
    isAvailable: true,
    description:
      "Premium quality painting service with best materials and skilled painters.",
    features: [
      "Premium quality paints",
      "Color consultation free",
      "Clean worksite guaranteed",
      "Experienced painters",
      "2-year paint warranty",
    ],
  },
  {
    _id: "6",
    title: "Custom Furniture & Carpentry",
    category: "Carpentry",
    price: 2500,
    image:
      "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&q=80",
    providerName: "Wood Works BD",
    providerPhone: "+880 1700 000006",
    rating: 4.5,
    reviewCount: 43,
    location: "Dhaka",
    duration: "1-3 days",
    isAvailable: true,
    description:
      "Custom furniture design and carpentry work for homes and offices.",
    features: [
      "Custom design available",
      "Quality wood materials",
      "Free home measurement",
      "On-time delivery",
      "1-year warranty",
    ],
  },
  {
    _id: "7",
    title: "Bathroom Plumbing & Fitting",
    category: "Plumbing",
    price: 700,
    image:
      "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&q=80",
    providerName: "Hasan Plumbers",
    providerPhone: "+880 1700 000007",
    rating: 4.4,
    reviewCount: 58,
    location: "Rajshahi",
    duration: "2-3 hours",
    isAvailable: true,
    description:
      "Complete bathroom plumbing solutions including fitting, repair and installation.",
    features: [
      "All brands supported",
      "Leak-proof guarantee",
      "Same-day service",
      "Clean installation",
      "Affordable pricing",
    ],
  },
  {
    _id: "8",
    title: "Office Cleaning & Sanitization",
    category: "Cleaning",
    price: 2000,
    image:
      "https://plus.unsplash.com/premium_photo-1663047022624-2e573ccd0682?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    providerName: "Office Clean Pro",
    providerPhone: "+880 1700 000008",
    rating: 4.9,
    reviewCount: 178,
    location: "Dhaka",
    duration: "3-5 hours",
    isAvailable: true,
    description:
      "Professional office cleaning and sanitization services for a healthy workplace.",
    features: [
      "COVID-safe sanitization",
      "After-hours service",
      "Regular contracts available",
      "Trained professionals",
      "All equipment included",
    ],
  },
];
