export type Language = 'en' | 'ne';

export interface Translations {
  nav: {
    home: string;
    about: string;
    rooms: string;
    interior: string;
    dining: string;
    events: string;
    attractions: string;
    gallery: string;
    contact: string;
    inquireStay: string;
    staffPortal: string;
  };
  hero: {
    location: string;
    titleMain: string;
    titleItalic: string;
    subTitle: string;
    badge1: string;
    badge2: string;
    badge3: string;
    badge4: string;
    exploreRooms: string;
    contactUs: string;
    welcomingText: string;
  };
  about: {
    kicker: string;
    title: string;
    titleHighlight: string;
    p1: string;
    p2: string;
    feature1Title: string;
    feature1Desc: string;
    feature2Title: string;
    feature2Desc: string;
    ctaButton: string;
    galleryLink: string;
    interiorTitle: string;
    interiorDesc: string;
  };
  rooms: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    roomTitle: string;
    roomDesc: string;
    feature1: string;
    feature2: string;
    feature3: string;
    feature4: string;
    inquiryButton: string;
    note: string;
    clickToEnlarge: string;
    verifiedBadge: string;
  };
  interior: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    description: string;
  };
  dining: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    cardTitle: string;
    cardDesc: string;
    bullet1: string;
    bullet2: string;
    bullet3: string;
    inquireMeals: string;
    placeholderBadge: string;
    placeholderTitle: string;
    placeholderSub: string;
    placeholderDesc: string;
    ownerNoteTitle: string;
    ownerNoteDesc: string;
  };
  events: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    hallTitle: string;
    hallDesc: string;
    supportTitle: string;
    supportDesc: string;
    inquireButton: string;
    badgeTitle: string;
    badgeLocation: string;
    verifiedTag: string;
  };
  attractions: {
    kicker: string;
    title: string;
    subTitle: string;
    getDirections: string;
    distanceLabel: string;
    approxDuration: string;
    rockGardenTitle: string;
    rockGardenDesc: string;
    rockGardenDist: string;
    supaDeuraliTitle: string;
    supaDeuraliDesc: string;
    supaDeuraliDist: string;
    arghaDurbarTitle: string;
    arghaDurbarDesc: string;
    arghaDurbarDist: string;
  };
  map: {
    kicker: string;
    title: string;
    subTitle: string;
    viewInGoogleMaps: string;
    startingPoint: string;
    landmarksHeader: string;
  };
  gallery: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    all: string;
    exterior: string;
    interior: string;
    rooms: string;
    events: string;
    reception: string;
    viewFull: string;
  };
  contact: {
    kicker: string;
    title: string;
    titleHighlight: string;
    subTitle: string;
    locationHeading: string;
    phoneHeading: string;
    hoursHeading: string;
    hoursDesc: string;
    formTitle: string;
    formSubtitle: string;
    nameLabel: string;
    phoneLabel: string;
    emailLabel: string;
    typeLabel: string;
    checkInLabel: string;
    checkOutLabel: string;
    guestsLabel: string;
    roomTypeLabel: string;
    messageLabel: string;
    submitButton: string;
    submitting: string;
    privacyNote: string;
    successTitle: string;
    successMessage: string;
    successContact: string;
    successStatus: string;
    sendAnother: string;
  };
  footer: {
    tagline: string;
    replayIntro: string;
    quickLinks: string;
    locationInquiries: string;
    rightsReserved: string;
    demoNote: string;
  };
}

export const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      rooms: 'Rooms',
      interior: 'Interior',
      dining: 'Dining',
      events: 'Events',
      attractions: 'Attractions',
      gallery: 'Gallery',
      contact: 'Contact',
      inquireStay: 'Inquire Stay',
      staffPortal: 'Staff Portal',
    },
    hero: {
      location: 'Chutrabesi, Sandhikharka, Nepal',
      titleMain: 'A Stay Worth',
      titleItalic: 'Remembering',
      subTitle: 'Discover comfort, warmth and hospitality at Hotel Diamond.',
      badge1: 'Family Restaurant & Lodge',
      badge2: 'Guest Accommodation',
      badge3: 'Banquet & Event Space',
      badge4: 'Arghakhanchi District',
      exploreRooms: 'Explore Our Rooms',
      contactUs: 'Contact Us',
      welcomingText: 'Welcoming visitors, travelers & family celebrations',
    },
    about: {
      kicker: 'About Hotel Diamond',
      title: 'Your Comfort,',
      titleHighlight: 'Our Hospitality',
      p1: 'Hotel Diamond welcomes guests looking for a comfortable, welcoming, and memorable stay in Sandhikharka. Whether you are traveling through Arghakhanchi, visiting family, or organizing a local gathering, our doors are open with genuine warmth.',
      p2: 'Conveniently situated in Chutrabesi, our lodge and family restaurant provide a peaceful retreat with restful guest accommodations, dedicated dining, and an attentive team ready to assist your journey.',
      feature1Title: 'Warm Guest Reception',
      feature1Desc: 'Attentive front desk service to welcome and support every traveler.',
      feature2Title: 'Central Accessibility',
      feature2Desc: 'Located in Chutrabesi with direct road access and parking area.',
      ctaButton: 'Plan Your Stay',
      galleryLink: 'View Hotel Gallery →',
      interiorTitle: 'Comfortable Hotel Interior',
      interiorDesc: 'Spacious sitting spaces, reception desk, and welcoming lodge surroundings.',
    },
    rooms: {
      kicker: 'Guest Stay',
      title: 'Comfortable',
      titleHighlight: 'Accommodation',
      subTitle: 'Restful guest rooms designed for peace, cleanliness, and thoughtful hospitality in Sandhikharka.',
      roomTitle: 'Comfortable Guest Rooms',
      roomDesc: 'Carefully prepared to give travelers and families a restful experience. Every room is maintained with fresh linens, quiet surroundings, comfortable furnishings, and immediate access to our on-site team for any hospitality request.',
      feature1: 'Prepared comfortable beds with fresh bedsheets and clean blankets',
      feature2: 'Quiet, restful ambiance for tired travelers and pilgrims',
      feature3: 'Convenient room electrical points and bedside lighting',
      feature4: 'Central access to Chutrabesi market & transportation',
      inquiryButton: 'Contact for Room Inquiry',
      note: 'Direct inquiries receive fast confirmation and personal room preparation.',
      clickToEnlarge: 'Click to Enlarge ⤢',
      verifiedBadge: 'Verified Hotel Diamond Guest Bedroom',
    },
    interior: {
      kicker: 'Hospitality Spaces',
      title: 'Hotel',
      titleHighlight: 'Interior & Lounge',
      subTitle: 'Explore the welcoming interior spaces, guest reception, and peaceful lodge atmosphere.',
      description: 'Our guest lounge and interior areas are maintained with cleanliness and traditional Nepali warmth, welcoming travelers arriving from all districts.',
    },
    dining: {
      kicker: 'Culinary & Refreshments',
      title: 'Family Restaurant',
      titleHighlight: '& Dining',
      subTitle: 'Freshly prepared meals, warm tea, and wholesome hospitality for staying guests and travelers in Sandhikharka.',
      cardTitle: 'Authentic Family Dining',
      cardDesc: 'As reflected in our signboard, Hotel Diamond operates a dedicated Family Restaurant and Lodge in Chutrabesi. We take pride in serving hearty, fresh meals suited for long-distance highway travelers, families, and locals alike.',
      bullet1: 'Morning tea, breakfast & hot refreshments',
      bullet2: 'Comforting lunch & evening dinner service',
      bullet3: 'Private dining arrangements for group events',
      inquireMeals: 'Inquire About Group Meals',
      placeholderBadge: 'Curated Dining Showcase',
      placeholderTitle: 'Restaurant Menu & Dish Photography',
      placeholderSub: 'Coming Soon for Final Launch',
      placeholderDesc: 'In keeping with our promise of authentic representation, we present only real verified photography. The complete Hotel Diamond dining menu, authentic Nepali dishes, and freshly prepared kitchen photography are currently being scheduled for addition.',
      ownerNoteTitle: 'Note for Hotel Management',
      ownerNoteDesc: 'This section will beautifully display your signature thali, snacks, beverages, and pricing table once your final menu card is photographed.',
    },
    events: {
      kicker: 'Functions & Banquets',
      title: 'Celebrate Your',
      titleHighlight: 'Special Moments',
      subTitle: 'Hotel Diamond offers a dedicated event and function hall in Sandhikharka. Ideal for hosting family ceremonies, community gatherings, anniversary celebrations, and official meetings in a warm, welcoming setting.',
      hallTitle: 'Dedicated Function Hall',
      hallDesc: 'Spacious indoor venue with banquet seating, stage platform, and celebratory lighting.',
      supportTitle: 'Event Hospitality Support',
      supportDesc: 'Coordinated hospitality support for family gatherings and organizational events.',
      inquireButton: 'Contact for Event Inquiry',
      badgeTitle: 'Hotel Diamond Function Hall',
      badgeLocation: 'Sandhikharka, Arghakhanchi',
      verifiedTag: 'Verified Venue',
    },
    attractions: {
      kicker: 'Destination Guide',
      title: 'Discover the Beauty Around Hotel Diamond',
      subTitle: 'Explore the natural beauty, cultural heritage and sacred destinations of Arghakhanchi.',
      getDirections: 'Get Driving Directions',
      distanceLabel: 'Road Distance',
      approxDuration: 'Approx. Travel Time',
      rockGardenTitle: 'Arghakhanchi Rock Garden',
      rockGardenDesc: 'Discover the remarkable natural rock formations of Arghakhanchi Rock Garden. Enjoy beautiful scenery, peaceful surroundings and a refreshing escape into nature.',
      rockGardenDist: '~18 km via regional road (Approx. 45-50 mins)',
      supaDeuraliTitle: 'Supa Deurali Temple',
      supaDeuraliDesc: 'Visit one of Arghakhanchi\'s most respected religious destinations. Supa Deurali Temple is dedicated to Goddess Supadevi and is surrounded by the beautiful hills of the region.',
      supaDeuraliDist: '~22 km via Gorusinge-Sandhikharka Highway (Approx. 45-55 mins)',
      arghaDurbarTitle: 'Argha Durbar',
      arghaDurbarDesc: 'Explore the historic and cultural heritage of Argha Durbar, a destination associated with the traditional history and religious identity of Arghakhanchi.',
      arghaDurbarDist: '~6 km uphill drive from town center (Approx. 20-25 mins)',
    },
    map: {
      kicker: 'Interactive Map & Navigation',
      title: 'Location & Nearby Destinations',
      subTitle: 'Find Hotel Diamond in Chutrabesi, Sandhikharka and navigate directly to prime Arghakhanchi attractions.',
      viewInGoogleMaps: 'Open in Google Maps',
      startingPoint: 'Starting Point: Hotel Diamond, Chutrabesi',
      landmarksHeader: 'Arghakhanchi Landmarks',
    },
    gallery: {
      kicker: 'Verified Photography',
      title: 'Hotel Diamond',
      titleHighlight: 'Gallery',
      subTitle: 'Authentic views of our building, entrance, guest bedroom, interior, reception, and event hall in Sandhikharka.',
      all: 'All',
      exterior: 'Exterior',
      interior: 'Interior',
      rooms: 'Rooms',
      events: 'Events',
      reception: 'Reception',
      viewFull: 'View full size',
    },
    contact: {
      kicker: 'Reach Out',
      title: 'Contact',
      titleHighlight: 'Hotel Diamond',
      subTitle: 'Have questions about room availability, event hosting, or travel directions? Send your inquiry directly to our reception.',
      locationHeading: 'Location',
      phoneHeading: 'Direct Phone Inquiries',
      hoursHeading: 'Front Desk Assistance',
      hoursDesc: '7 Days a Week · Early morning to evening check-in reception',
      formTitle: 'Guest Booking & Inquiry Form',
      formSubtitle: 'Fill out your details and our team will get back to you promptly.',
      nameLabel: 'Your Full Name',
      phoneLabel: 'Phone Number',
      emailLabel: 'Email Address (Optional)',
      typeLabel: 'Inquiry Purpose',
      checkInLabel: 'Check-in Date',
      checkOutLabel: 'Check-out Date',
      guestsLabel: 'Number of Guests',
      roomTypeLabel: 'Preferred Room Type',
      messageLabel: 'Your Message or Special Request',
      submitButton: 'Submit Booking Inquiry',
      submitting: 'Submitting Inquiry...',
      privacyNote: 'We respect your privacy. No spam or marketing messages.',
      successTitle: 'Inquiry Received',
      successMessage: 'Thank you. Your booking inquiry has been recorded and submitted to our reception desk for review.',
      successContact: 'Contact Phone:',
      successStatus: 'Status: Pending Reception Confirmation',
      sendAnother: 'Send Another Inquiry',
    },
    footer: {
      tagline: 'Discover comfort, warmth and hospitality at Hotel Diamond. Family Restaurant & Lodge located in Chutrabesi, Sandhikharka, Nepal.',
      replayIntro: 'Replay Logo Reveal',
      quickLinks: 'Quick Links',
      locationInquiries: 'Location & Inquiries',
      rightsReserved: 'All rights reserved.',
      demoNote: 'Authentic Hospitality Website · Sandhikharka, Nepal',
    },
  },
  ne: {
    nav: {
      home: 'गृहपृष्ठ',
      about: 'हाम्रो बारेमा',
      rooms: 'कोठाहरू',
      interior: 'आन्तरिक कक्ष',
      dining: 'भोजनालय',
      events: 'कार्यक्रम हल',
      attractions: 'पर्यटकीय स्थल',
      gallery: 'ग्यालरी',
      contact: 'सम्पर्क',
      inquireStay: 'कोठा सोधपुछ',
      staffPortal: 'कर्मचारी पोर्टल',
    },
    hero: {
      location: 'चुत्राबेसी, सन्धिखर्क, नेपाल',
      titleMain: 'सधैं सम्झना योग्य',
      titleItalic: 'बसाइ',
      subTitle: 'होटेल डायमण्डमा आराम, न्यानोपन र आतिथ्यको अनुभव लिनुहोस्।',
      badge1: 'फेमिली रेस्टुरेन्ट एण्ड लज',
      badge2: 'आरामदायी आवास',
      badge3: 'बैंक्वेट तथा कार्यक्रम हल',
      badge4: 'अर्घाखाँची जिल्ला',
      exploreRooms: 'हाम्रा कोठाहरू हेर्नुहोस्',
      contactUs: 'सम्पर्क गर्नुहोस्',
      welcomingText: 'यात्रुहरू, परिवार तथा विशेष उत्सवहरूको हार्दिक स्वागत गर्दछौं',
    },
    about: {
      kicker: 'होटेल डायमण्डको बारेमा',
      title: 'तपाईंको आराम,',
      titleHighlight: 'हाम्रो आतिथ्यता',
      p1: 'होटेल डायमण्ड सन्धिखर्कमा आरामदायी र अविस्मरणीय बसाइको खोजीमा रहेका पाहुनाहरूलाई हार्दिक स्वागत गर्दछ। चाहे तपाईं अर्घाखाँचीको भ्रमणमा हुनुहुन्छ, परिवार भेट्न आउनुभएको होस् वा स्थानीय भेला आयोजना गर्दै हुनुहुन्छ, हाम्रो ढोका खुला छ।',
      p2: 'चुत्राबेसीमा अवस्थित हाम्रो लज र फेमिली रेस्टुरेन्टले शान्त वातावरण, सफा कोठाहरू, स्वादिष्ट भोजन र सहयोगी कर्मचारी टोली प्रदान गर्दछ।',
      feature1Title: 'न्यानो स्वागत',
      feature1Desc: 'प्रत्येक पाहुनालाई मद्दत गर्न तत्पर फ्रन्ट डेस्क सेवा।',
      feature2Title: 'सुलभ पहुँच',
      feature2Desc: 'चुत्राबेसी सडक छेउमा पार्किङ सुविधासहित अवस्थित।',
      ctaButton: 'बसाइ योजना गर्नुहोस्',
      galleryLink: 'होटेल ग्यालरी हेर्नुहोस् →',
      interiorTitle: 'होटेलको भित्री वातावरण',
      interiorDesc: 'खुल्ला बस्ने ठाउँ, स्वागत कक्ष र शान्त लजको वातावरण।',
    },
    rooms: {
      kicker: 'आवास सुविधा',
      title: 'आरामदायी',
      titleHighlight: 'कोठाहरू',
      subTitle: 'सन्धिखर्कमा शान्ति, सरसफाइ र आत्मीय आतिथ्यका लागि तयार गरिएका कोठाहरू।',
      roomTitle: 'आरामदायी पाहुना कोठा',
      roomDesc: 'यात्रु तथा परिवारलाई पूर्ण आराम दिन सफा ओछ्यान, शान्त वातावरण, राम्रो फर्निचर र निरन्तर सेवाको व्यवस्था गरिएको छ।',
      feature1: 'सफा तन्ना र न्यानो कम्बलसहित तयार गरिएका आरामदायी खाटहरू',
      feature2: 'लामो यात्रा र तीर्थयात्रीहरूका लागि शान्त विश्राम स्थल',
      feature3: 'मोबाइल तथा बत्तीका लागि उपयुक्त बिजुली पोइन्टहरू',
      feature4: 'चुत्राबेसी बजार र यातायातमा सहज पहुँच',
      inquiryButton: 'कोठा सोधपुछका लागि सम्पर्क गर्नुहोस्',
      note: 'प्रत्यक्ष सोधपुछमा तुरुन्तै कोठा व्यवस्थापन गरिन्छ।',
      clickToEnlarge: 'ठूलो फोटो हेर्नुहोस् ⤢',
      verifiedBadge: 'होटेल डायमण्ड वास्तविक पाहुना कोठा',
    },
    interior: {
      kicker: 'आतिथ्य कक्ष',
      title: 'होटेल',
      titleHighlight: 'भित्री कक्ष तथा लबी',
      subTitle: 'हाम्रो स्वागत कक्ष, लबी र शान्त आन्तरिक वातावरणको अवलोकन गर्नुहोस्।',
      description: 'हाम्रो लबी र भित्री वातावरण सफा र परम्परागत नेपाली आत्मीयताले भरिपूर्ण छ।',
    },
    dining: {
      kicker: 'खानपिन तथा चिया-नास्ता',
      title: 'फेमिली रेस्टुरेन्ट',
      titleHighlight: 'तथा भोजनालय',
      subTitle: 'सन्धिखर्कमा ताजा खाना, तातो चिया र पारिवारिक आतिथ्यता।',
      cardTitle: 'पारिवारिक खानपिन',
      cardDesc: 'हाम्रो साइनबोर्ड अनुसार होटेल डायमण्डले चुत्राबेसीमा फेमिली रेस्टुरेन्ट तथा लज सञ्चालन गर्दछ। राजमार्गका यात्रु, परिवार र स्थानीय ग्राहकहरूका लागि ताजा खाना प्रस्तुत गर्न पाउँदा हामीलाई गर्व छ।',
      bullet1: 'बिहानको चिया, नास्ता र ताजा परिकार',
      bullet2: 'दिउँसोको खाना र साँझको पारिवारिक डिनर',
      bullet3: 'समूह तथा विशेष कार्यक्रमका लागि भोजन व्यवस्था',
      inquireMeals: 'भोजन तथा समूह खाना सोधपुछ',
      placeholderBadge: 'भोजनालय परिकार झलक',
      placeholderTitle: 'मेनु र खानाको तस्बिरहरू',
      placeholderSub: 'चाँडै नै थपिनेछ',
      placeholderDesc: 'सत्य र यथार्थ प्रस्तुत गर्ने हाम्रो प्रतिवद्धता अनुसार वास्तविक तस्बिर मात्र राखिन्छ। होटेल डायमण्डको पूर्ण मेनु र भान्छाका तस्बिरहरू चाँडै नै यहाँ उपलब्ध हुनेछन्।',
      ownerNoteTitle: 'व्यवस्थापनका लागि जानकारी',
      ownerNoteDesc: 'तपाईंको अन्तिम मेनु कार्ड र खानाको फोटो खिचेपछि यहाँ आकर्षक रूपमा राखिनेछ।',
    },
    events: {
      kicker: 'उत्सव तथा सभा-समारोह',
      title: 'तपाईंका विशेष क्षणहरू',
      titleHighlight: 'उल्लासका साथ मनाउनुहोस्',
      subTitle: 'होटेल डायमण्डसँग सन्धिखर्कमा समर्पित कार्यक्रम हल छ। पारिवारिक उत्सव, पूजा-समारोह, गोष्ठी र बैठकहरू आयोजना गर्न उपयुक्त छ।',
      hallTitle: 'सुविधासम्पन्न कार्यक्रम हल',
      hallDesc: 'बैंक्वेट कुर्सी, स्टेज मञ्च र आकर्षक बत्तीसहितको विशाल भित्री हल।',
      supportTitle: 'कार्यक्रम आतिथ्य सेवा',
      supportDesc: 'पारिवारिक तथा सामाजिक भेलाहरूका लागि पूर्ण सहयोग।',
      inquireButton: 'हल सोधपुछका लागि सम्पर्क गर्नुहोस्',
      badgeTitle: 'होटेल डायमण्ड कार्यक्रम हल',
      badgeLocation: 'सन्धिखर्क, अर्घाखाँची',
      verifiedTag: 'प्रमाणित स्थल',
    },
    attractions: {
      kicker: 'आसपासका पर्यटकीय स्थलहरू',
      title: 'होटेल डायमण्ड वरिपरिको सौन्दर्य अवलोकन गर्नुहोस्',
      subTitle: 'अर्घाखाँचीको प्राकृतिक सौन्दर्य, सांस्कृतिक सम्पदा र पवित्र धार्मिक स्थलहरूको भ्रमण गर्नुहोस्।',
      getDirections: 'गुगल म्यापमा बाटो हेर्नुहोस्',
      distanceLabel: 'सडक दूरी',
      approxDuration: 'अनुमानित यात्रा समय',
      rockGardenTitle: 'अर्घाखाँची रक गार्डेन',
      rockGardenDesc: 'अर्घाखाँची रक गार्डेनका अनौठा प्राकृतिक ढुङ्गाका संरचनाहरू अवलोकन गर्नुहोस्। सुन्दर दृश्य, शान्त वातावरण र प्रकृतिको आनन्द लिनुहोस्।',
      rockGardenDist: 'सडक दूरी: करिब १८ कि.मि. (करिब ४५-५० मिनेट)',
      supaDeuraliTitle: 'सुपा देउराली मन्दिर',
      supaDeuraliDesc: 'अर्घाखाँचीको अत्यन्तै प्रसिद्ध तथा आस्थाको केन्द्र सुपा देउराली मन्दिरको दर्शन गर्नुहोस्। माता सुपादेवीको मन्दिर पहाडको रमणीय खोँचमा अवस्थित छ।',
      supaDeuraliDist: 'सडक दूरी: करिब २२ कि.मि. (करिब ४५-५५ मिनेट)',
      arghaDurbarTitle: 'अर्घौँ दरबार',
      arghaDurbarDesc: 'अर्घाखाँचीको ऐतिहासिक तथा धार्मिक पहिचान बोकेको अर्घौँ दरबार र भगवती मन्दिरको ऐतिहासिक सम्पदा अवलोकन गर्नुहोस्।',
      arghaDurbarDist: 'सडक दूरी: सन्धिखर्क बजारबाट करिब ६ कि.मि. उकालो (करिब २०-२५ मिनेट)',
    },
    map: {
      kicker: 'नक्सा तथा मार्ग निर्देशन',
      title: 'स्थान तथा पर्यटकीय गन्तव्यहरू',
      subTitle: 'चुत्राबेसी सन्धिखर्कमा रहेको होटेल डायमण्ड र अर्घाखाँचीका प्रमुख गन्तव्यहरूको नक्सा।',
      viewInGoogleMaps: 'गुगल म्यापमा खोल्नुहोस्',
      startingPoint: 'सुरुवात विन्दु: होटेल डायमण्ड, चुत्राबेसी',
      landmarksHeader: 'अर्घाखाँचीका प्रमुख स्थलहरू',
    },
    gallery: {
      kicker: 'प्रमाणित तस्बिरहरू',
      title: 'होटेल डायमण्ड',
      titleHighlight: 'ग्यालरी',
      subTitle: 'सन्धिखर्कस्थित हाम्रो भवन, प्रवेशद्वार, कोठा, आन्तरिक कक्ष, रिसेप्सन र कार्यक्रम हलका वास्तविक तस्बिरहरू।',
      all: 'सबै',
      exterior: 'बाहिरी भाग',
      interior: 'भित्री कक्ष',
      rooms: 'कोठाहरू',
      events: 'हल',
      reception: 'रिसेप्सन',
      viewFull: 'ठूलो आकारमा हेर्नुहोस्',
    },
    contact: {
      kicker: 'हामीलाई सम्पर्क गर्नुहोस्',
      title: 'होटेल डायमण्डसँग',
      titleHighlight: 'सम्पर्क',
      subTitle: 'कोठा उपलब्धता, कार्यक्रम आयोजना वा यात्रा सम्बन्धी कुनै पनि जिज्ञासा भएमा हाम्रो रिसेप्सनमा सिधै सम्पर्क गर्नुहोस्।',
      locationHeading: 'स्थान',
      phoneHeading: 'प्रत्यक्ष फोन सोधपुछ',
      hoursHeading: 'फ्रन्ट डेस्क सेवा',
      hoursDesc: 'हप्ताको ७ दिन · बिहानैदेखि साँझसम्म चेक-इन रिसेप्सन',
      formTitle: 'कोठा तथा कार्यक्रम सोधपुछ फारम',
      formSubtitle: 'आफ्नो विवरण भर्नुहोस्, हाम्रो टोलीले तुरुन्तै सम्पर्क गर्नेछ।',
      nameLabel: 'तपाईंको पूरा नाम',
      phoneLabel: 'सम्पर्क फोन नम्बर',
      emailLabel: 'इमेल (वैकल्पिक)',
      typeLabel: 'सोधपुछको उद्देश्य',
      checkInLabel: 'चेक-इन मिति',
      checkOutLabel: 'चेक-आउट मिति',
      guestsLabel: 'पाहुना संख्या',
      roomTypeLabel: 'रोजाइको कोठा',
      messageLabel: 'तपाईंको सन्देश वा विशेष अनुरोध',
      submitButton: 'सोधपुछ पठाउनुहोस्',
      submitting: 'फारम पठाउँदै...',
      privacyNote: 'तपाईंको व्यक्तिगत विवरण सुरक्षित रहन्छ। कुनै अनावश्यक सन्देश पठाइने छैन।',
      successTitle: 'सोधपुछ प्राप्त भयो',
      successMessage: 'धन्यवाद। तपाईंको सोधपुछ दर्ता भएको छ र हाम्रो फ्रन्ट डेस्कमा पठाइएको छ।',
      successContact: 'सम्पर्क फोन:',
      successStatus: 'स्थिति: रिसेप्सनबाट फोन आउने प्रतीक्षामा',
      sendAnother: 'अर्को सोधपुछ पठाउनुहोस्',
    },
    footer: {
      tagline: 'होटेल डायमण्डमा आराम, न्यानोपन र आतिथ्यको अनुभव लिनुहोस्। चुत्राबेसी, सन्धिखर्क, नेपालमा अवस्थित फेमिली रेस्टुरेन्ट एण्ड लज।',
      replayIntro: 'लोगो एनिमेसन पुनः हेर्नुहोस्',
      quickLinks: 'छिटो लिङ्कहरू',
      locationInquiries: 'स्थान तथा सोधपुछ',
      rightsReserved: 'सर्वाधिकार सुरक्षित।',
      demoNote: 'वास्तविक आतिथ्य वेबसाइट · सन्धिखर्क, नेपाल',
    },
  },
};
