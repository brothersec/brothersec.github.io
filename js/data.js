/**
 * BEC (BROTHER’S ENGINEERING & CONSTRUCTION) — CORE DATA ARCHITECTURE
 * Established: 2019 · Location: Chattogram, Bangladesh
 * CEO: Engr. Md. Shahidul Islam (Milad) · B.Sc. Engg. (Civil), FIEB
 *
 * Structured data registry for brand positioning, company facts, services,
 * design-to-build workflows, process milestones, client profiles, trust pillars,
 * verified projects, and verified contact coordinates.
 */

const BDM_DATA = {
  brand: {
    name: "Brother’s Engineering & Construction",
    shortName: "BEC",
    bengaliName: "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন",
    established: "2019",
    tagline: "DESIGN WITH PURPOSE. BUILD WITH CONFIDENCE.",
    bengaliTagline: "উদ্দেশ্যপূর্ণ নকশা। আস্থার সাথে নির্মাণ।",
    subline: "Engineering, design and construction solutions — from concept to completion.",
    bengaliSubline: "প্রকৌশল, নকশা এবং নির্মাণ সমাধান — পরিকল্পনা থেকে সমাপ্তি।",
    eyebrow: "ENGINEERING & CONSTRUCTION",
    bengaliEyebrow: "প্রকৌশল ও নির্মাণ",
    headline: "YOUR VISION.<br>OUR ENGINEERING.<br><span class=\"gold-gradient-text\">BUILT TO LAST.</span>",
    bengaliHeadline: "আপনার স্বপ্ন।<br>আমাদের প্রকৌশল।<br><span class=\"gold-gradient-text\">দীর্ঘস্থায়ী নির্মাণ।</span>",
    heroDesc: "Architectural design, structural engineering, interior design and construction solutions in Chattogram — from concept to completion.",
    bengaliHeroDesc: "চট্টগ্রামে স্থাপত্য নকশা, স্ট্রাকচারাল ইঞ্জিনিয়ারিং, ইন্টেরিয়র ও ভবন নির্মাণ সমাধান — পরিকল্পনা থেকে সমাপ্তি।",
    credibilityStatement: "Established in 2019, serving clients in Chattogram.",
    bengaliCredibilityStatement: "স্থাপিত ২০১৯, চট্টগ্রামে ক্লায়েন্টদের বিশ্বস্ত সেবায় নিয়োজিত।",
    storySummary: "Established in 2019. Built on practical experience. Now bringing its capabilities online.",
    bengaliStorySummary: "স্থাপিত ২০১৯। বাস্তব কাজের অভিজ্ঞতায় গড়ে ওঠা। এখন অনলাইনে সেবার বিস্তার।",
    leadership: {
      name: "Engr. Md. Shahidul Islam (Milad)",
      bengaliName: "প্রকো. মো. শহিদুল ইসলাম (মিলাদ)",
      title: "Chief Executive Officer (CEO)",
      bengaliTitle: "প্রধান নির্বাহী কর্মকর্তা (সিইও)",
      credentials: "B.Sc. Engg. (Civil) · FIEB",
      bengaliCredentials: "বি.এসসি. ইঞ্জি. (সিভিল) · এফআইইবি"
    },
    industry: "Engineering, Architectural Design & Construction",
    territory: "Chattogram, Bangladesh",
    logoUrl: "assets/logo-white.png",
    heroImage: "assets/projects/shopnaloy-hero.jpg"
  },

  hotlines: [
    { label: "Direct Phone & WhatsApp", number: "01828-178962", raw: "+8801828178962", whatsapp: true },
    { label: "Office Phone", number: "01715-065577", raw: "+8801715065577", whatsapp: false },
    { label: "Email Consultation", number: "mail.brotherseng@gmail.com", raw: "mailto:mail.brotherseng@gmail.com", email: true }
  ],

  offices: [
    {
      id: "eidgah",
      title: "Brother’s Engineering & Construction Office",
      bengaliTitle: "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন কার্যালয়",
      address: "2813/C, Al-Helal Bhaban, Ground Floor, Halishahar Road, Eidgah Kacha Rastar Matha, Pahartali, Chattogram",
      bengaliAddress: "২৮১৩/সি, আল-হেলাল ভবন, নিচতলা, হালিশহর রোড, ঈদগাহ কাঁচা রাস্তার মাথা, পাহাড়তলী, চট্টগ্রাম",
      phone: "01828-178962 / 01715-065577",
      email: "mail.brotherseng@gmail.com",
      coords: "22.3491° N, 91.8029° E",
      category: "Engineering Coordination & Project Planning"
    }
  ],

  facts: [
    {
      val: "2019",
      label: "Established",
      bengaliLabel: "প্রতিষ্ঠা সাল",
      desc: "Our beginning as Brother’s Engineering & Construction.",
      bengaliDesc: "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন হিসেবে আমাদের শুরু।"
    },
    {
      val: "Chattogram",
      label: "Local Presence",
      bengaliLabel: "স্থানীয় উপস্থিতি",
      desc: "Serving the local market from our Chattogram office.",
      bengaliDesc: "চট্টগ্রাম কার্যালয় থেকে স্থানীয় মার্কেটে সেবা প্রদান।"
    },
    {
      val: "Engineering-Led",
      label: "Our Approach",
      bengaliLabel: "প্রকৌশল-ভিত্তিক দৃষ্টিভঙ্গি",
      desc: "Building projects informed by civil engineering knowledge and practical considerations.",
      bengaliDesc: "সিভিল ইঞ্জিনিয়ারিং জ্ঞান ও বাস্তব বিবেচনার আলোকে প্রকল্প পরিচালনা।"
    },
    {
      val: "End-to-End",
      label: "Service Ambition",
      bengaliLabel: "পূর্ণাঙ্গ সেবা পরিধি",
      desc: "Design, consultancy, construction and interior solutions coordinated around project needs.",
      bengaliDesc: "প্রকল্পের চাহিদা অনুযায়ী সমন্বিত নকশা, পরামর্শ, নির্মাণ ও অভ্যন্তরীণ সজ্জা।"
    }
  ],

  services: [
    {
      number: "01",
      title: "ARCHITECTURAL DESIGN",
      bengaliTitle: "স্থাপত্য নকশা",
      icon: "architecture",
      hook: "Good buildings begin with good design.",
      bengaliHook: "ভালো ভবনের শুরু ভালো নকশা দিয়ে।",
      desc: "We help translate client requirements into architectural concepts and layouts that consider functionality, space planning, appearance, site conditions and intended use.",
      bengaliDesc: "ক্লায়েন্টের চাহিদা, কার্যকারিতা, স্পেস প্ল্যানিং, বাহ্যিক রূপ, সাইটের অবস্থা ও ব্যবহারের কথা বিবেচনা করে আমরা বাস্তবসম্মত স্থাপত্য নকশা প্রণয়ন করি।",
      scope: "Spatial planning, conceptual drawings, exterior facades and 3D visual presentation.",
      bengaliScope: "স্পেস প্ল্যানিং, কনসেপচুয়াল ড্রয়িং, বাহ্যিক ফাসাদ ও থ্রিডি ভিজ্যুয়ালাইজেশন।"
    },
    {
      number: "02",
      title: "STRUCTURAL DESIGN & ENGINEERING",
      bengaliTitle: "কাঠামোগত নকশা ও প্রকৌশল",
      icon: "engineering",
      hook: "Strength begins with sound engineering.",
      bengaliHook: "স্থায়িত্বের মূল ভিত্তি নির্ভুল প্রকৌশল।",
      desc: "We provide structural design and engineering services appropriate to project requirements, with attention to structural systems, safety considerations, durability and applicable technical requirements.",
      bengaliDesc: "কাঠামোগত সিস্টেম, নিরাপত্তা, দীর্ঘস্থায়িত্ব এবং বিএনবিসি কারিগরি মানদণ্ড অনুযায়ী আমরা স্ট্রাকচারাল ডিজাইন ও ইঞ্জিনিয়ারিং সেবা প্রদান করি।",
      scope: "Structural analysis, RCC frame design, load assessments and BNBC technical standards.",
      bengaliScope: "স্ট্রাকচারাল অ্যানালাইসিস, আরসিসি ফ্রেম ডিজাইন, লোড মূল্যায়ন ও বিএনবিসি মানদণ্ড।"
    },
    {
      number: "03",
      title: "INTERIOR DESIGN",
      bengaliTitle: "অভ্যন্তরীণ নকশা ও পরিকল্পনা",
      icon: "chair",
      hook: "Make every space work beautifully.",
      bengaliHook: "প্রতিটি পরিসরকে সুন্দর ও ব্যবহারযোগ্য করে তুলুন।",
      desc: "We help plan and design interior spaces with attention to layout, lighting, materials, finishes, usability and the character of the space.",
      bengaliDesc: "লেআউট, লাইটিং, উপাদান, ফিনিশিং, ব্যবহারিক সুবিধা এবং স্থানের বৈশিষ্ট্যের সমন্বয়ে আমরা ইন্টেরিয়র পরিকল্পনা ও ডিজাইন করি।",
      scope: "Residential homes, corporate office workspaces, retail shops and custom joinery detailing.",
      bengaliScope: "আবাসিক বাড়ি, করপোরেট অফিস, শোরুম ও কাস্টম ক্যাবিনেট্রি ডিজাইন।"
    },
    {
      number: "04",
      title: "CONSTRUCTION WORK",
      bengaliTitle: "ভবন নির্মাণকাজ",
      icon: "apartment",
      hook: "From plans to the built environment.",
      bengaliHook: "পরিকল্পনা থেকে বাস্তব স্থাপনা।",
      desc: "We undertake building construction work for suitable residential and commercial projects, with an emphasis on coordination, workmanship, materials and execution.",
      bengaliDesc: "সমন্বয়, কারিগরি দক্ষতা, মানসম্পন্ন নির্মাণসামগ্রী এবং শৃঙ্খলার সাথে আমরা উপযুক্ত আবাসিক ও বাণিজ্যিক ভবন নির্মাণকাজ পরিচালনা করি।",
      scope: "Substructure, superstructure, civil masonry, on-site supervision and execution monitoring.",
      bengaliScope: "সাবস্ট্রাকচার, সুপারস্ট্রাকচার, সিভিল গাঁথুনি, সাইট সুপারভিশন ও মান নিয়ন্ত্রণ।"
    },
    {
      number: "05",
      title: "ENGINEERING CONSULTANCY",
      bengaliTitle: "প্রকৌশল পরামর্শ সেবা",
      icon: "assignment_turned_in",
      hook: "Better decisions start with the right guidance.",
      bengaliHook: "সঠিক সিদ্ধান্তের শুরু সঠিক পরামর্শ দিয়ে।",
      desc: "We provide engineering and project-related consultancy to help clients understand requirements, evaluate options and plan the next steps of their construction projects.",
      bengaliDesc: "ক্লায়েন্টদের প্রয়োজনীয়তা বোঝা, বিভিন্ন বিকল্প মূল্যায়ন এবং পরবর্তী পদক্ষেপ সঠিকভাবে নির্ধারণে আমরা প্রকৌশল পরামর্শ সেবা দিই।",
      scope: "Site inspections, technical feasibility, project scope definition and construction reviews.",
      bengaliScope: "সাইট পরিদর্শন, কারিগরি সম্ভাব্যতা যাচাই, কাজের পরিধি নির্ধারণ ও নকশা পর্যালোচনা।"
    },
    {
      number: "06",
      title: "RENOVATION & REMODELING",
      bengaliTitle: "সংস্কার ও আধুনিকায়ন",
      icon: "construction",
      hook: "Improve what exists. Transform what is possible.",
      bengaliHook: "বিদ্যমান কাঠামোর মানোন্নয়ন ও আধুনিকায়ন।",
      desc: "We can support suitable renovation and remodeling projects that modernize existing spaces, improve functionality and respond to changing requirements.",
      bengaliDesc: "বর্তমান স্থানের উপযোগিতা বৃদ্ধি, নতুন চাহিদা পূরণ এবং কাঠামোগত নিরাপত্তা বজায় রেখে আমরা উপযুক্ত সংস্কার কাজ পরিচালনা করি।",
      scope: "Spatial alterations, facade upgrades, structural retrofitting and modern interior renewals.",
      bengaliScope: "স্পেস রূপান্তর, ফাসাদ আধুনিকায়ন, কাঠামোগত মেরামত ও অভ্যন্তরীণ নবায়ন।"
    },
    {
      number: "07",
      title: "DESIGN-TO-BUILD SOLUTIONS",
      bengaliTitle: "ডিজাইন-টু-বিল্ড সমন্বিত সমাধান",
      icon: "handshake",
      hook: "A more connected journey from idea to completion.",
      bengaliHook: "ধারণা থেকে সমাপ্তি পর্যন্ত একটি সমন্বিত পথচলা।",
      desc: "For suitable projects, BEC can coordinate design and construction services to reduce fragmentation between planning and execution and help maintain a coherent project direction.",
      bengaliDesc: "উপযুক্ত প্রকল্পে পরিকল্পনা ও বাস্তবায়নের মধ্যকার দূরত্ব কমাতে এবং কাজের সার্বিক দিক ঠিক রাখতে বিইসি ডিজাইন ও নির্মাণ সেবা সমন্বয় করে।",
      scope: "Single accountable team, seamless drawing-to-site translation and coordinated management.",
      bengaliScope: "একক দায়বদ্ধ দল, ড্রয়িং থেকে সাইটে নির্ভুল অনুবাদ এবং সমন্বিত ব্যবস্থাপনা।"
    },
    {
      number: "08",
      title: "RESIDENTIAL & COMMERCIAL PROJECTS",
      bengaliTitle: "আবাসিক ও বাণিজ্যিক প্রকল্প",
      icon: "domain",
      hook: "Solutions for the way people live and work.",
      bengaliHook: "মানুষের বসবাস ও কাজের বাস্তব সমাধান।",
      desc: "From individual houses and residential buildings to offices, shops and other commercial spaces, we work to understand each project's purpose and requirements before recommending an appropriate approach.",
      bengaliDesc: "ব্যক্তিমালিকানাধীন বাড়ি ও আবাসিক ভবন থেকে শুরু করে অফিস, দোকান ও অন্যান্য বাণিজ্যিক পরিসরের উদ্দেশ্য বুঝে আমরা সঠিক পদক্ষেপ সুপারিশ করি।",
      scope: "Individual homes, multi-family residences, commercial buildings, retail spaces and offices.",
      bengaliScope: "ব্যক্তিগত বাড়ি, বহুমুখী আবাসিক ভবন, বাণিজ্যিক ভবন, রিটেইল দোকান ও অফিস।"
    }
  ],

  designToBuildSteps: [
    {
      step: "01",
      name: "DISCOVER",
      bengaliName: "অনুসন্ধান",
      desc: "Understand the client's goals, site, requirements and budget.",
      bengaliDesc: "ক্লায়েন্টের লক্ষ্য, সাইট, প্রয়োজনীয়তা এবং বাজেট অনুধাবন।"
    },
    {
      step: "02",
      name: "DESIGN",
      bengaliName: "নকশা প্রণয়ন",
      desc: "Develop the architectural and interior direction according to the project brief.",
      bengaliDesc: "প্রকল্পের ব্রিফ অনুযায়ী স্থাপত্য ও ইন্টেরিয়র পরিকল্পনা প্রণয়ন।"
    },
    {
      step: "03",
      name: "ENGINEER",
      bengaliName: "প্রকৌশল যাচাই",
      desc: "Address structural and other relevant technical requirements.",
      bengaliDesc: "কাঠামোগত স্থায়িত্ব ও প্রয়োজনীয় কারিগরি মানদণ্ড নিশ্চিতকরণ।"
    },
    {
      step: "04",
      name: "PLAN",
      bengaliName: "সমন্বিত পরিকল্পনা",
      desc: "Coordinate the scope of work, resources, costs and execution schedule.",
      bengaliDesc: "কাজের পরিধি, প্রয়োজনীয় সম্পদ, ব্যয় ও বাস্তবায়ন সময়সূচি সমন্বয়।"
    },
    {
      step: "05",
      name: "CONSTRUCT",
      bengaliName: "নির্মাণ সম্পাদন",
      desc: "Carry out the agreed construction work with attention to site coordination and workmanship.",
      bengaliDesc: "সাইট সমন্বয় ও কাজের দক্ষতার ওপর গুরুত্ব দিয়ে চুক্তিমাফিক নির্মাণ সম্পাদন।"
    },
    {
      step: "06",
      name: "FINISH",
      bengaliName: "ফিনিশিং ও সজ্জা",
      desc: "Complete the relevant finishing and interior work.",
      bengaliDesc: "প্রাসঙ্গিক ফিনিশিং এবং অভ্যন্তরীণ সজ্জা ও সাজসজ্জার কাজ সম্পন্নকরণ।"
    },
    {
      step: "07",
      name: "HANDOVER",
      bengaliName: "চূড়ান্ত সমাপ্তি",
      desc: "Review the completed scope and bring the agreed project work to completion.",
      bengaliDesc: "সম্পন্ন হওয়া কাজের পর্যালোচনা এবং আনুষ্ঠানিকভাবে প্রকল্প কাজ সমাপ্তি।"
    }
  ],

  whoWeWorkWith: [
    {
      icon: "home",
      title: "Homeowners Planning a New House",
      bengaliTitle: "নতুন বাড়ি নির্মাণ করতে ইচ্ছুক গৃহমালিক",
      desc: "Guiding you through functional floor planning, engineering safety, and disciplined construction for your family residence."
    },
    {
      icon: "terrain",
      title: "Landowners Exploring a Building Project",
      bengaliTitle: "জমি মালিক যারা নির্মাণের কথা ভাবছেন",
      desc: "Assessing plot orientation, site constraints, and feasibility to realize your land's best architectural potential."
    },
    {
      icon: "family_restroom",
      title: "Families Planning Construction or Renovation",
      bengaliTitle: "আবাসিক নির্মাণ বা সংস্কার প্রত্যাশী পরিবার",
      desc: "Modernizing, expanding, or improving existing living spaces while preserving structural safety and comfort."
    },
    {
      icon: "storefront",
      title: "Businesses Developing Offices, Shops or Spaces",
      bengaliTitle: "অফিস, দোকান বা বাণিজ্যিক পরিসর তৈরিকারী প্রতিষ্ঠান",
      desc: "Delivering practical layouts, functional fit-outs, and durable finishes tailored to commercial daily operations."
    },
    {
      icon: "palette",
      title: "Property Owners Looking for Interior Design",
      bengaliTitle: "ইন্টেরিয়র ডিজাইন ও বাস্তবায়ন প্রত্যাশী",
      desc: "Thoughtful interior planning, custom joinery, ergonomic lighting, and turnkey finish execution under one roof."
    },
    {
      icon: "support_agent",
      title: "Clients Seeking Engineering Consultancy",
      bengaliTitle: "প্রকৌশল ও কারিগরি পরামর্শ প্রত্যাশী",
      desc: "Sound engineering advice, structural assessments, and technical clarity before making major construction investments."
    },
    {
      icon: "handshake",
      title: "Developers Seeking Design & Build Partners",
      bengaliTitle: "নির্মাণ ও নকশা সহযোগী খোঁজা ডেভেলপার",
      desc: "Reliable engineering collaboration, architectural coordination, and attentive site execution across Chattogram."
    }
  ],

  whyChooseBec: [
    {
      num: "01",
      title: "PRACTICAL ENGINEERING PERSPECTIVE",
      bengaliTitle: "বাস্তবসম্মত প্রকৌশল দৃষ্টিভঙ্গি",
      desc: "An engineering-led approach to evaluating project requirements and technical considerations.",
      bengaliDesc: "প্রকল্পের প্রয়োজনীয়তা ও কারিগরি বিষয়াবলি মূল্যায়নে একটি প্রকৌশল-নেতৃত্বাধীন বাস্তবসম্মত দৃষ্টিভঙ্গি।"
    },
    {
      num: "02",
      title: "CONNECTED SERVICES",
      bengaliTitle: "সমন্বিত সেবা পরিধি",
      desc: "Architectural design, structural design, consultancy, construction and interiors available according to project scope.",
      bengaliDesc: "প্রকল্পের পরিধি অনুযায়ী স্থাপত্য নকশা, কাঠামোগত নকশা, পরামর্শ, সিভিল নির্মাণ ও ইন্টেরিয়র সেবা উপলব্ধ।"
    },
    {
      num: "03",
      title: "LOCAL UNDERSTANDING",
      bengaliTitle: "চট্টগ্রামের স্থানীয় বাস্তবতা",
      desc: "A business established in Chattogram with a focus on the needs of the local market.",
      bengaliDesc: "২০১৯ সালে চট্টগ্রামে প্রতিষ্ঠিত প্রতিষ্ঠান—স্থানীয় নির্মাণ সংস্কৃতি, মাটি ও পরিবেশের বাস্তব অভিজ্ঞতায় ঋদ্ধ।"
    },
    {
      num: "04",
      title: "PROJECT-SPECIFIC SOLUTIONS",
      bengaliTitle: "প্রকল্পভিত্তিক সঠিক সমাধান",
      desc: "Recommendations shaped around each project's purpose, site, requirements and budget.",
      bengaliDesc: "প্রতিটি প্রকল্পের নিজস্ব উদ্দেশ্য, সাইটের বাস্তবতা, ক্লায়েন্টের চাহিদা এবং বাজেটের সাথে সামঞ্জস্যপূর্ণ সমাধান।"
    },
    {
      num: "05",
      title: "CLEAR COMMUNICATION",
      bengaliTitle: "স্বচ্ছ ও স্পষ্ট যোগাযোগ",
      desc: "A commitment to helping clients understand the scope of work, project stages and important decisions.",
      bengaliDesc: "কাজের পরিধি, প্রকল্পের পর্যায়সমূহ এবং গুরুত্বপূর্ণ সিদ্ধান্ত গ্রহণে ক্লায়েন্টকে সুস্পষ্ট তথ্য দিয়ে সহায়তা।"
    },
    {
      num: "06",
      title: "RESPONSIBLE EXECUTION",
      bengaliTitle: "দায়িত্বশীল সাইট বাস্তবায়ন",
      desc: "Attention to workmanship, coordination and the agreed requirements of each project.",
      bengaliDesc: "কাজের কারিগরি মান, সাইটের শৃঙ্খলা এবং প্রতিটি প্রকল্পের চুক্তি অনুযায়ী দায়িত্বশীল সম্পাদনে অটল।"
    }
  ],

  projects: [
    {
      id: "bdm-shopnaloy",
      index: "01",
      name: "BEC Shopnaloy",
      bengaliName: "বিইসি স্বপ্নালয়",
      status: "Active Construction",
      bengaliStatus: "সক্রিয় নির্মাণকাজ",
      statusBadge: "ACTIVE CIVIL CONSTRUCTION · SUBSTRUCTURE & FRAMEWORK",
      category: "RESIDENTIAL",
      categoryLabel: "Residential Construction & Structural Engineering",
      location: "Plot 727 · Road 14 · Agrabad CDA · Chattogram",
      bengaliLocation: "প্লট ৭২৭ · রোড ১৪ · আগ্রাবাদ সিডিএ · চট্টগ্রাম",
      heroImage: "assets/projects/shopnaloy-hero.jpg",
      twilightImage: "assets/projects/shopnaloy-twilight.jpg",
      floorPlanImage: "assets/projects/shopnaloy-plan.jpg",
      planType: "3D Isometric Unit Cutaway",
      unitSize: "1,375 Sq. Ft.",
      landSize: "3.75 Katha",
      roadWidth: "40 Feet Frontage",
      floors: "G + 8 Storeys (9 Levels)",
      totalUnits: "15 Residences (2 Units / Floor)",
      configuration: "3 Bed · 3 Bath · 3 Balconies",
      scopeDetails: "Architectural planning, structural engineering, and civil execution",
      bookingShare: "Direct Consultation with BEC Office",
      features: [
        "Architectural space planning maximizing natural lighting and natural airflow",
        "Engineered structural frame adhering to BNBC seismic and wind criteria",
        "Two residential units per floor for privacy and ventilation",
        "Dedicated covered ground-level parking bays and generator room",
        "Standard batch cylinder testing for concrete mix durability",
        "Direct engineering supervision during casting and reinforcement placement"
      ],
      description: "A residential building project in Agrabad CDA demonstrating BEC's commitment to practical architectural planning, disciplined civil engineering, and attentive on-site execution."
    },
    {
      id: "bdm-shopno-nebash",
      index: "02",
      name: "BEC Shopno Nebash",
      bengaliName: "বিইসি স্বপ্ন নিবাস",
      status: "Ongoing Development",
      bengaliStatus: "চলমান উন্নয়ন",
      statusBadge: "ONGOING PROJECT · CIVIL FRAMEWORKS & ARCHITECTURE",
      category: "RESIDENTIAL",
      categoryLabel: "Residential Architecture & Civil Construction",
      location: "Plot 445 · Road 11 · Agrabad CDA · Chattogram",
      bengaliLocation: "প্লট ৪৪৫ · রোড ১১ · আগ্রাবাদ সিডিএ · চট্টগ্রাম",
      heroImage: "assets/projects/shopnonebash-hero.jpg",
      twilightImage: "assets/projects/shopnonebash-twilight.jpg",
      floorPlanImage: "assets/projects/shopnonebash-plan.jpg",
      planType: "Architectural Blueprint Schematic",
      unitSize: "1,750 Sq. Ft.",
      landSize: "5.00 Katha Rectangular Parcel",
      roadWidth: "30 Feet Frontage",
      floors: "G + 9 Storeys (10 Levels)",
      totalUnits: "18 Residences (2 Units / Floor)",
      configuration: "4 Bed · 4 Bath · 3 Balconies",
      scopeDetails: "Structural engineering and construction coordination",
      bookingShare: "Direct Consultation with BEC Office",
      features: [
        "Optimal North-South residential layout orientation for energy efficiency",
        "Spacious 4-bedroom executive units designed with family privacy in mind",
        "Dual egress stairwells compliant with building safety standards",
        "Cross-ventilated kitchen and utility zones with service verandas",
        "Reinforced concrete structural design for long-term durability",
        "Coordinated civil execution with ongoing technical supervision"
      ],
      description: "A multi-family residential building on Road 11 in Agrabad CDA, planned with generous family living spaces, cross-ventilation, and engineering-led execution."
    },
    {
      id: "bdm-future-parcel",
      index: "03",
      name: "Agrabad Signature Parcel III",
      bengaliName: "আগ্রাবাদ সিগনেচার পার্সেল ৩",
      status: "Design & Planning Phase",
      bengaliStatus: "নকশা ও পরিকল্পনা পর্যায়",
      statusBadge: "DESIGN & ENGINEERING PLANNING PHASE",
      category: "ARCHITECTURAL DESIGN",
      categoryLabel: "Architectural Design & Structural Feasibility",
      location: "Agrabad CDA Residential Area · Chattogram",
      bengaliLocation: "আগ্রাবাদ সিডিএ আ/এ · চট্টগ্রাম",
      heroImage: "assets/projects/parcel-site.jpg",
      twilightImage: "assets/projects/parcel-site.jpg",
      floorPlanImage: "assets/projects/shopnonebash-plan.jpg",
      planType: "Site Planning Schematic",
      unitSize: "Custom Functional Allocations",
      landSize: "6.00+ Katha Parcel",
      roadWidth: "40 Feet Road Frontage",
      floors: "Planned G + 9",
      totalUnits: "Multi-Storey Residential Scope",
      configuration: "Residential & Mixed Use",
      scopeDetails: "Architectural concept design and structural feasibility study",
      features: [
        "Initial site assessment and soil mechanics evaluation",
        "Architectural massing and preliminary spatial zoning",
        "Structural design alignment with BNBC 2020 standards",
        "Turnkey design-to-build feasibility for prospective property owners"
      ],
      description: "An upcoming design and engineering planning project in Agrabad CDA, reflecting our concept-to-completion capabilities from early feasibility to detailed design."
    }
  ]
};

// Freeze data to guarantee immutability
Object.freeze(BDM_DATA);
const BEC_DATA = BDM_DATA;
