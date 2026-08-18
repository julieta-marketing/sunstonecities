export interface NewsItem {
  id: string
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
  category: string
}

export interface EventItem {
  id: string
  title: string
  date: string
  time: string
  timeZone?: 'PT'
  location: string
  excerpt: string
  image: string
  /** Direct link to the event's registration page (falls back to the calendar URL when absent). */
  registerUrl?: string
}

export interface TeamMember {
  id: string
  name: string
  title: string
  photo: string
  bio: string
  linkedin: string
  email: string
  /** object-position anchor for the crop, e.g. '50% 18%'. Defaults to '50% 20%'. */
  focus?: string
  /** Extra zoom applied on top of object-cover to normalize face size. Defaults to 1. */
  zoom?: number
}

export interface SubService {
  id: string
  title: string
  description: string
  deliverables: string[]
  extras?: { label: string; items: string[] }[]
  onePager: string
  image?: string
}

export interface CaseStudy {
  id: string
  client: string
  title: string
  metric: string
  metricLabel: string
}

export interface FeaturedCaseStudy {
  id: string
  number: string
  label: string
  headline: string
  description: string
  image: string
  link: string
  location?: string
  services?: string
  summary?: string
  challenge?: string
  solution?: string
  outcomes?: {
    value: string
    label: string
  }[]
  outcomeHighlights?: string[]
  showViewMore?: boolean
  inlineNumberTitle?: boolean
}

export interface Project {
  id: string
  name: string
  category: string
  location: string
  image: string
  value: string
  year: string
  blurb: string
}

export interface Stat {
  value: number
  prefix?: string
  suffix?: string
  decimals?: number
  label: string
}

export const projects: Project[] = [
  {
    id: 'p1',
    name: 'Riverside Transit Corridor',
    category: 'Infrastructure Financing',
    location: 'Tri-Metro Region',
    image: '/project-transit.png',
    value: '$220M',
    year: '2025',
    blurb:
      'A multi-jurisdiction transit spine connecting three growing metros, structured from framework to funding.',
  },
  {
    id: 'p2',
    name: 'Downtown Innovation District',
    category: 'Public-Private Partnership',
    location: 'Cedar Falls',
    image: '/project-district.png',
    value: '40 acres',
    year: '2025',
    blurb:
      'A stalled redevelopment brought back to life with private capital and a new P3 delivery model.',
  },
  {
    id: 'p3',
    name: 'Harbor Waterfront Revival',
    category: 'District Redevelopment',
    location: 'Harbor District',
    image: '/project-waterfront.png',
    value: '87% approval',
    year: '2024',
    blurb:
      'A community-backed waterfront plan turning underused shoreline into a civic destination.',
  },
  {
    id: 'p4',
    name: 'Solstice Clean-Energy Campus',
    category: 'Economic Strategy',
    location: 'Northgate',
    image: '/project-energy.png',
    value: '$180M',
    year: '2024',
    blurb:
      'A target-industry play that landed an advanced clean-energy campus and its supply chain.',
  },
  {
    id: 'p5',
    name: 'Summit Water Authority',
    category: 'Value-Capture Financing',
    location: 'Summit County',
    image: '/project-water.png',
    value: 'AA– rated',
    year: '2024',
    blurb:
      'Utility expansion funded without raising general taxes through a value-capture district.',
  },
  {
    id: 'p6',
    name: 'Smart Mobility Network',
    category: 'Infrastructure Planning',
    location: 'Gateway Region',
    image: '/project-mobility.png',
    value: '$95M',
    year: '2023',
    blurb:
      'A phased, fundable roadmap for a connected regional mobility and interchange program.',
  },
]

export const impactStats: Stat[] = [
  { value: 3.2, prefix: '$', suffix: 'B+', decimals: 1, label: 'Capital structured' },
  { value: 60, suffix: '+', label: 'Communities served' },
  { value: 14, suffix: '', label: 'States active' },
  { value: 92, suffix: '%', label: 'Projects delivered on plan' },
]

export const marqueeItems: string[] = [
  'Economic Development',
  'Staff Augmentation',
  'Project Financing',
  'Public Infrastructure Financing',
  'Strategic Planning',
  'Business Attraction',
  'Stakeholder Engagement',
  'Public-Private Partnerships',
  'Alternative Financing',
  'Grant Support',
  'Infrastructure Delivery',
  'Community Growth',
]

export const news: NewsItem[] = []

export const newsArchive: NewsItem[] = [
  {
    id: 'n4',
    slug: 'senior-advisors',
    title: 'Sunstone Cities Welcomes Three New Senior Advisors',
    date: 'April 24, 2026',
    category: 'Firm News',
    excerpt:
      'Our growing team adds decades of combined experience across capital markets, infrastructure planning, and community engagement.',
    image: '/news-team-announcement.png',
  },
  {
    id: 'n5',
    slug: 'value-capture-utility-district',
    title: 'How Value-Capture Financing Funded a New Utility District',
    date: 'April 8, 2026',
    category: 'Project Financing',
    excerpt:
      'A closer look at the structure that let a fast-growing district fund utility expansion without raising general taxes.',
    image: '/news-utility-district.png',
  },
  {
    id: 'n6',
    slug: 'questions-before-p3',
    title: 'Five Questions Every City Should Ask Before a P3',
    date: 'March 19, 2026',
    category: 'Insights',
    excerpt:
      'Practical guidance for public leaders evaluating whether a public-private partnership is the right delivery model.',
    image: '/news-p3-guide.png',
  },
]

// Note: there is no static `events` array here on purpose. The homepage
// events section (components/upcoming-events.tsx) fetches the live
// upcoming event straight from Luma (see lib/luma.ts) and renders an
// empty state — not a hardcoded event — when Luma has nothing to show or
// the fetch fails, so a stale event can never get stuck on the site.

export const team: TeamMember[] = [
  {
    id: 't1',
    name: 'John Keisler',
    title: 'Chief Executive Officer & Managing Member',
    photo: '/team-headshots/John-Keisler-unified-gray.jpg',
    focus: '50% 28%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/jpkeisler/',
    email: 'John.Keisler@SunstoneCities.com',
    bio: "John Keisler is an experienced economic development leader with two decades of public and private sector leadership, and now leads Sunstone Cities' mission to advance inclusive economic growth through strategic investment and public-private partnerships.",
  },
  {
    id: 't2',
    name: 'Jayro Sandoval',
    title: 'Economic Development Manager & Managing Member',
    photo: '/team-headshots/Jayro-Sandoval-unified-gray.jpg',
    focus: '50% 24%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/jayrosandoval/',
    email: 'Jayro.Sandoval@SunstoneCities.com',
    bio: 'Jayro Sandoval brings deep experience leading public and nonprofit initiatives across Southern California focused on racial justice, arts equity, and economic inclusion.',
  },
  {
    id: 't3',
    name: 'Ryan Phong',
    title: 'Project Manager & Managing Member',
    photo: '/team-headshots/Ryan-Phong-unified-gray.jpg',
    focus: '50% 26%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/ryanphong/',
    email: 'Ryan.Phong@SunstoneCities.com',
    bio: 'Ryan Phong manages consulting projects and public-sector partnerships that advance economic development and infrastructure financing, while also serving as program advisor for the annual USC Economic Development Challenge.',
  },
  {
    id: 't4',
    name: 'Jennifer Huang',
    title: 'Director of Marketing, Communications & Community Engagement',
    photo: '/team-headshots/Jennifer-Huang-unified-gray.jpg',
    focus: '50% 24%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/jenniferehuang/',
    email: 'Jennifer.Huang@SunstoneInvestment.com',
    bio: 'Jennifer Huang leads Sunstone Cities\u2019 branding, messaging, and public-private community partnerships, bringing over a decade of experience that includes launching the Long Beach Accelerator and the inaugural Irvine Tech Day.',
  },
  {
    id: 't5',
    name: 'Harry Saltzgaver',
    title: 'Managing Editor',
    photo: '/team-headshots/Harry-Saltzgaver-unified-gray.jpg',
    focus: '50% 21%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/harry-saltzgaver-442498268/',
    email: 'Harry.Saltzgaver@SunstoneInvestment.com',
    bio: 'Harry Saltzgaver is a veteran journalist with over 45 years of experience, who now crafts feature stories, public narratives, and op-eds for Sunstone Cities.',
  },
  {
    id: 't6',
    name: 'Julie Ta',
    title: 'Marketing Associate',
    photo: '/team-headshots/Julie-Ta-unified-gray.jpg',
    focus: '50% 25%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/julieta02/',
    email: 'Julie.Ta@SunstoneInvestment.com',
    bio: 'Julie Ta is a versatile marketer skilled in social media, web design, and content creation, who elevates Sunstone Cities\u2019 presence by showcasing key projects and initiatives.',
  },
  {
    id: 't7',
    name: 'Giselle Melendez-Cruz',
    title: 'Research & Management Analyst',
    photo: '/team-headshots/Giselle-Melendez-Cruz-unified-gray.jpg',
    focus: '50% 28%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/giselle-melendez/',
    email: 'Giselle.Melendez-Cruz@SunstoneCities.com',
    bio: 'Giselle Melendez-Cruz brings hands-on experience coordinating nonprofit operations and housing/economic stability initiatives across Los Angeles County.',
  },
  {
    id: 't8',
    name: 'Hannah Cruz',
    title: 'Research & Management Analyst',
    photo: '/team-headshots/Hannah-Cruz-unified-gray.jpg',
    focus: '50% 24%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/hannahacruz/',
    email: 'Hannah.Cruz@SunstoneCities.com',
    bio: 'Hannah Cruz holds a Master of Public Administration from USC and brings cross-sector nonprofit and private-sector experience to develop data-informed, strategic solutions for cities and nonprofits.',
  },
  {
    id: 't9',
    name: 'Jade Le',
    title: 'Project Financing Analyst',
    photo: '/team-headshots/Jade-Le-unified-gray.jpg',
    focus: '50% 25%',
    zoom: 1,
    linkedin: 'https://www.linkedin.com/in/jade-le-6401431a2/',
    email: 'Jade.Le@Sunstonecities.com',
    bio: 'Jade Le holds a Master of Public Policy from the University of California, Riverside, with a concentration in business and environmental policy, and brings experience leading public- and private-sector initiatives to Sunstone Cities’ Project Financing team, where she will coordinate public infrastructure projects and private financing transactions from initial opportunity through financial close.',
  },
]

export const consultingServices: SubService[] = [
  {
    id: 'c1',
    title: 'Staff Augmentation',
    description:
      'Experienced advisors embedded in your team to add capacity and specialized expertise when needed.',
    deliverables: [
      'Interim economic development directors and project managers',
      'Grant writing and administration support',
      'Capital program and budget coordination',
      'Council and board presentation materials',
    ],
    onePager: '#',
    image: '/service-staff-augmentation.jpg',
  },
  {
    id: 'c2',
    title: 'Economic Development Strategies',
    description:
      'Data-driven strategies that turn local advantages into actionable plans for investment and job growth.',
    deliverables: [
      'Target-industry and site-readiness analysis',
      'Incentive policy design and benchmarking',
      'Workforce and infrastructure gap assessments',
      'Multi-year implementation roadmap',
    ],
    onePager: '#',
    image: '/service-economic-development-strategies.jpg',
  },
  {
    id: 'c3',
    title: 'Marketing & Communications',
    description:
      'Strategic communications and engagement that build public support and investor confidence.',
    deliverables: [
      'Community engagement and outreach strategy',
      'Investor and prospect-facing collateral',
      'Brand and project identity systems',
      'Public information and media toolkits',
    ],
    onePager: '#',
    image: '/service-marketing-communications.jpg',
  },
]

export const financingServices: SubService[] = [
  {
    id: 'f1',
    title: 'Public Infrastructure Financing Solutions (PIFS)',
    description:
      'Innovative financing that advances critical public infrastructure while protecting municipal capacity.',
    deliverables: [
      'Capital stack design and feasibility analysis',
      'Special district and value-capture structuring',
      'Grant and federal funding alignment',
      'Debt capacity and affordability modeling',
    ],
    onePager: '#',
    image: '/service-public-infrastructure-financing.jpg',
  },
  {
    id: 'f2',
    title: 'Bridge to Bond',
    description:
      'Interim capital that lets infrastructure projects begin while permanent bond financing is secured.',
    deliverables: [
      'Interim liquidity and bridge facility structuring',
      'Bond readiness and rating strategy',
      'Refinancing and takeout planning',
      'Cash-flow and timeline modeling',
    ],
    onePager: '#',
    image: '/service-bridge-to-bond.jpg',
  },
  {
    id: 'f3',
    title: 'Growth Capital',
    description:
      'Flexible capital for growing businesses and economic development projects.',
    deliverables: [
      'Capital sourcing and lender introductions',
      'Term sheet review and negotiation support',
      'Covenant and structure advisory',
    ],
    extras: [
      {
        label: 'Loan Types',
        items: [
          'Term loans',
          'Revolving facilities',
          'Mezzanine capital',
          'Tax-exempt financing',
        ],
      },
      {
        label: 'Project Types',
        items: [
          'Utility expansion',
          'Mixed-use redevelopment',
          'Civic & community facilities',
          'Industrial & logistics sites',
        ],
      },
    ],
    onePager: '#',
    image: '/service-growth-capital.jpg',
  },
]

export const consultingCaseStudies: CaseStudy[] = [
  {
    id: 'cc1',
    client: 'City of Cedar Falls',
    title: 'Downtown revitalization strategy and incentive redesign',
    metric: '1,200+',
    metricLabel: 'new jobs projected',
  },
  {
    id: 'cc2',
    client: 'Marion County',
    title: 'Target-industry study for advanced manufacturing',
    metric: '$180M',
    metricLabel: 'in new investment',
  },
  {
    id: 'cc3',
    client: 'Town of Riverbend',
    title: 'Interim economic development leadership',
    metric: '9 mo.',
    metricLabel: 'embedded engagement',
  },
  {
    id: 'cc4',
    client: 'Harbor District Authority',
    title: 'Community engagement for waterfront plan',
    metric: '87%',
    metricLabel: 'public approval',
  },
  {
    id: 'cc5',
    client: 'City of Northgate',
    title: 'Grant strategy and federal funding alignment',
    metric: '$24M',
    metricLabel: 'grants secured',
  },
]

export const financingCaseStudies: CaseStudy[] = [
  {
    id: 'fc1',
    client: 'Regional Transit Alliance',
    title: 'Transit corridor financing framework',
    metric: '$220M',
    metricLabel: 'program financed',
  },
  {
    id: 'fc2',
    client: 'City of Lakeshore',
    title: 'Bridge to bond for utility expansion',
    metric: '14 mo.',
    metricLabel: 'accelerated start',
  },
  {
    id: 'fc3',
    client: 'Summit Water District',
    title: 'Value-capture district structuring',
    metric: '0.6%',
    metricLabel: 'lower cost of capital',
  },
  {
    id: 'fc4',
    client: 'Gateway Redevelopment Corp.',
    title: 'Growth capital for mixed-use district',
    metric: '$95M',
    metricLabel: 'capital raised',
  },
  {
    id: 'fc5',
    client: 'County of Fairview',
    title: 'Public infrastructure capital stack',
    metric: 'AA–',
    metricLabel: 'rating achieved',
  },
]

export const featuredCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 'feat1',
    number: '01',
    label: 'Transit Corridor',
    headline: '$220M Regional Transit Corridor',
    description:
      'We structured the financing framework and multi-jurisdiction stakeholder plan for a transit spine connecting three growing metros. The program moved from concept to a fundable, phased delivery model without over-leveraging any single partner.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pasadena%20Colorado%20street%20bridge-5th5gKr01bYavh4CDkgkDJKSkKGPij.jpg',
    link: '#news',
  },
  {
    id: 'feat2',
    number: '02',
    label: 'Downtown P3',
    headline: 'Downtown Innovation District Revived',
    description:
      'A stalled 40-acre redevelopment came back to life through a new public-private partnership model that brought private capital to the table while preserving public accountability and long-term community benefit.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Long%20Beach%201-7Gotg7Dq8KgL8a251U971PKjZnqqTf.jpg',
    link: '#news',
  },
  {
    id: 'feat3',
    number: '03',
    label: 'Utility District',
    headline: 'Value-Capture Utility Expansion',
    description:
      'A fast-growing district funded major utility expansion without raising general taxes. Our value-capture structuring lowered the cost of capital and helped the authority achieve an AA– rating on the financing.',
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/UAB%20Medical%20West%20Hospital-DJF2DfpGFIIsHx5soBLgzaTTPFPuzv.jpg',
    link: '#news',
  },
]

export const featuredConsultingCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 'cons1',
    number: '01',
    label: 'Staff Augmentation',
    headline: 'City of Anaheim',
    description:
      'Sunstone Cities developed a BID framework with governance and implementation guidance for Little Arabia.',
    services: 'Staff Augmentation, Economic Development Strategies',
    summary:
      'Little Arabia needed a formal structure for business coordination and long-term district investment, so Sunstone Cities developed a BID framework with governance and implementation guidance.',
    outcomes: [
      {
        value: 'Scalable BID',
        label: 'governance model',
      },
      {
        value: 'Stronger',
        label: 'business coordination and alignment',
      },
      {
        value: 'Investment',
        label: 'resources for long-term district growth',
      },
      {
        value: 'Sustainable',
        label: 'economic growth positioning',
      },
    ],
    image: '/case-studies/project-consulting/anaheim-convention-center.jpg',
    link: '/services/project-consulting#case-cons1',
  },
  {
    id: 'cons2',
    number: '02',
    label: 'Strategic Plan',
    headline: 'City of Lakewood',
    description:
      "Sunstone Cities led Lakewood's five-year Economic Development Strategic Plan through stakeholder engagement.",
    services:
      'Staff Augmentation, Economic Development Strategies, Marketing & Communications',
    summary:
      "Lakewood needed a roadmap to guide investment, business attraction, and long-term growth, so Sunstone Cities led the city's five-year Economic Development Strategic Plan through stakeholder engagement.",
    outcomes: [
      {
        value: 'Clear',
        label: 'economic development priorities',
      },
      {
        value: 'Ready',
        label: 'implementation-ready initiatives',
      },
      {
        value: '5-Year',
        label: 'strategic roadmap',
      },
      {
        value: 'Aligned',
        label: 'public, private, and community partners',
      },
    ],
    image: '/case-studies/project-consulting/lakewood-city-hall.png',
    link: '/services/project-consulting#case-cons2',
  },
  {
    id: 'cons3',
    number: '03',
    label: 'EDO Framework',
    headline: 'City of Pasadena',
    description:
      'Sunstone Cities designed a Public-Private EDO framework with clear governance, roles, and sustainable funding.',
    services: 'Economic Development Strategies',
    summary:
      'Pasadena needed a modern framework to coordinate public-private economic development, so Sunstone Cities designed a Public-Private EDO framework with clear governance, roles, and sustainable funding.',
    outcomes: [
      {
        value: 'Formalized',
        label: 'public-private collaboration',
      },
      {
        value: 'Increased',
        label: 'capacity for economic initiatives',
      },
      {
        value: 'Clear',
        label: 'governance and funding structures',
      },
      {
        value: 'Competitive',
        label: 'long-term positioning',
      },
    ],
    image: '/case-studies/project-consulting/pasadena-city-hall.jpg',
    link: '/services/project-consulting#case-cons3',
  },
  {
    id: 'cons4',
    number: '04',
    label: 'Impact Evaluation',
    headline: "Mayor's Fund for Long Beach",
    description:
      "Sunstone Cities evaluated the Early Learning Hub's economic impact using modeling and surveys.",
    services: 'Economic Research & Analysis',
    summary:
      "Leaders needed to understand the Early Learning Hub's economic impact on workforce participation, so Sunstone Cities conducted an Economic Impact Evaluation using modeling and surveys.",
    outcomes: [
      {
        value: 'Data-Driven',
        label: 'performance insights',
      },
      {
        value: 'Quantified',
        label: 'economic and workforce impacts',
      },
      {
        value: 'Transparent',
        label: 'accountability for decision-makers',
      },
      {
        value: 'Funding',
        label: 'case strengthened for continued support',
      },
    ],
    image: '',
    link: '/services/project-consulting#case-cons4',
  },
  {
    id: 'cons5',
    number: '05',
    label: 'Public-Sector Growth',
    headline: 'Opt Health',
    description:
      'Sunstone Cities supported public-sector adoption through outreach, procurement strategy, and partnerships.',
    services: 'Staff Augmentation, Marketing & Communications',
    summary:
      'Opt Health sought to expand adoption among public-sector employers and safety agencies, so Sunstone Cities provided marketing support including outreach, procurement strategy, and partnerships.',
    outcomes: [
      {
        value: 'Expanded',
        label: 'public-sector decision-maker engagement',
      },
      {
        value: 'Visible',
        label: 'among government agencies',
      },
      {
        value: 'Stronger',
        label: 'strategic partnerships',
      },
      {
        value: 'Growth',
        label: 'customer acquisition efforts supported',
      },
    ],
    image: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/OptHealth%202.png-C9FEiq402YHgFx7xDoxSkodHSXfHIQ.jpeg',
    link: '/services/project-consulting#case-cons5',
  },
]

export const featuredFinancingCaseStudies: FeaturedCaseStudy[] = [
  {
    id: 'fin1',
    number: '01',
    label: 'Healthcare Infrastructure',
    headline: 'UAB Medical West Hospital',
    description:
      'A complex financing structure supported the delivery of a new hospital campus and expanded access to care for rural communities.',
    location: 'Alabama',
    services: 'Public Infrastructure Financing Solutions',
    summary:
      'Financing for a new 200-bed hospital, medical office building, and parking structure — replacing an aging facility and expanding rural healthcare access — combined EB-5 capital, bank financing, and federal loan guarantees.',
    outcomes: [
      {
        value: '$425M+',
        label: 'Healthcare infrastructure project supported',
      },
      {
        value: '$8.8M',
        label: 'EB-5 financing facilitated',
      },
      {
        value: '497',
        label: 'Permanent jobs created',
      },
      {
        value: 'Rural Access',
        label: 'Expanded healthcare access for rural communities',
      },
    ],
    image:
      '/case-studies/project-financing/uab-medical-west-hospital.jpg',
    link: '/services/project-financing#case-fin1',
  },
  {
    id: 'fin2',
    number: '02',
    label: 'Hospitality Reuse',
    headline: "Gold’s Hampton Inn",
    description:
      'Project financing supported the adaptive reuse of a historic downtown building into a modern hospitality destination.',
    location: 'Nebraska',
    services: 'Public Infrastructure Financing Solutions',
    summary:
      "Financed adaptive reuse of Lincoln's historic Gold's Building into a 115-room Hampton Inn, preserving a downtown asset and expanding visitor amenities.",
    outcomes: [
      {
        value: '115 Rooms',
        label: 'Historic building redeveloped into a Hampton Inn',
      },
      {
        value: 'Downtown Lodging',
        label: 'Expanded visitor and business accommodations',
      },
      {
        value: 'Tourism',
        label: 'Supported local economic activity',
      },
      {
        value: 'Revitalized',
        label: 'Underutilized downtown property brought back into use',
      },
    ],
    image: '/case-studies/project-financing/golds-hampton-inn.jpg',
    link: '/services/project-financing#case-fin2',
  },
  {
    id: 'fin3',
    number: '03',
    label: 'Resort Development',
    headline: 'Marcella Landing at Deer Valley',
    description:
      'A combined construction and C-PACE financing package advanced a mixed-use resort condominium community.',
    location: 'Utah',
    services: 'Infrastructure Financing Solutions',
    summary:
      'Senior construction financing and C-PACE funding supported a 118-unit resort condominium community, infrastructure improvements, and energy-efficient construction.',
    outcomes: [
      {
        value: '$115.4M',
        label: 'Financing package closed',
      },
      {
        value: '118 Units',
        label: 'Resort condominium community supported',
      },
      {
        value: 'Infrastructure',
        label: 'Vertical construction and site improvements funded',
      },
      {
        value: 'Efficiency',
        label: 'Energy-efficient building improvements advanced',
      },
    ],
    image:
      '/case-studies/project-financing/marcella-landing-deer-valley.png',
    link: '/services/project-financing#case-fin3',
  },
]

export type FaqAnswerPart = string | { label: string; href: string }

export const faqs: { q: string; a: FaqAnswerPart[] }[] = [
  {
    q: 'What types of clients does Sunstone Cities work with?',
    a: [
      'We partner primarily with cities, counties, special districts, and public authorities, as well as the economic development organizations and quasi-public entities that support them.',
    ],
  },
  {
    q: 'How is Sunstone Cities different from a traditional consulting firm?',
    a: [
      'We combine economic development strategy with hands-on project financing expertise. We do more than recommend a plan. We help structure the capital and partnerships needed to deliver it.',
    ],
  },
  {
    q: 'How is Sunstone Cities related to Sunstone Investment Group?',
    a: [
      'Sunstone Cities is the public-sector arm of the ',
      { label: 'Sunstone Investment Group', href: 'http://sunstoneinvestment.com' },
      '. For more about our partnership with Fullerton Consulting, visit ',
      { label: 'P3 LLC.', href: 'https://www.publicprivatepartnersllc.com/' },
    ],
  },
  {
    q: 'Do you help with both strategy and financing, or just one?',
    a: [
      'Both. Many clients engage us for strategy first and financing later, but our teams work together so the financial structure and the development strategy reinforce each other from day one.',
    ],
  },
  {
    q: 'What is a public-private partnership (P3), and when does it make sense?',
    a: [
      'A P3 is a long-term agreement where a private partner helps finance, build, or operate a public asset. It can make sense when a project needs capital, specialized delivery, or risk transfer that the public sector cannot easily provide alone.',
    ],
  },
  {
    q: 'How long does a typical engagement last?',
    a: [
      'Engagements range from focused several-week studies to multi-year advisory relationships that span a full project lifecycle. We scope each engagement to the outcome you need.',
    ],
  },
  {
    q: 'Can you augment our existing staff rather than replace them?',
    a: [
      'Yes. Our staff augmentation practice embeds senior advisors directly into your team to add capacity and expertise without adding permanent headcount.',
    ],
  },
  {
    q: 'What size projects do you take on?',
    a: [
      'We work across a wide range of project sizes, from targeted community initiatives to programs exceeding $200M. What matters most is a committed public partner and a project that strengthens the community.',
    ],
  },
  {
    q: 'How do we start a conversation with your team?',
    a: [
      'Use the contact form on this page or email our team directly. We will follow up to learn about your goals and outline how we can help move your project forward.',
    ],
  },
]
