import { getNewsArticleMeta } from '@/lib/news-index'

export interface NewsArticleSection {
  heading: string
  paragraphs?: string[]
  bullets?: string[]
}

export interface NewsArticle {
  slug: string
  title: string
  date: string
  category: string
  deck: string
  image: string
  imageCaption?: string
  sections: NewsArticleSection[]
  footnotes?: string[]
  newsBriefs?: string[]
  upcomingEvents?: string[]
  about?: string[]
}

export const newsArticles: NewsArticle[] = [
  {
    ...getNewsArticleMeta('long-beach-civic-center-p3'),
    imageCaption: 'Image source: Long Beach Civic Center - SOM',
    sections: [
      {
        heading: 'Feature',
        paragraphs: [
          `Jeff Fullerton and Pat West worked together to complete what is believed to be the largest municipal infrastructure public-private partnership on the West Coast, the Long Beach Civic Center, and they came to the Sunstone Stage recently to explain how it worked as part of the Sunstone P3 Education Series.`,
          `West was the Long Beach city manager from 2007 to his retirement in 2019. Fullerton was the project director for Plenary-Edgemoor during the Long Beach Civic Center project from 2014 to its opening in July 2019. The project cost $520 million, including construction of a new City Hall, a new Main Library, a new Lincoln Park and HVAC infrastructure for the entire complex. A complementary port headquarters building was constructed at the same time, but is in addition to the $520 million price tag because the Port of Long Beach purchased the building when it was complete.`,
          `Fullerton has been part of $6 billion worth of public-private partnerships and now is principal of his own consulting company, Fullerton Partners LLC. West also has a consulting business, Pat West LLC.`,
          `Earlier this year, Fullerton and Sunstone Cities CEO John Keisler formed P3 Partners LLC. A separate consulting company, it maintains a relationship with Sunstone Cities.`,
          `"Our challenge was the city asked us to find a cost-neutral equation," Fullerton said. "They wanted to find a way to build a new City Hall for no more than what they were paying to maintain the old city hall."`,
          `Long Beach's budget was already strained, West said. But the City Hall and the main library had been deemed hazardous if a major earthquake hit, and needed to be replaced.`,
          `"Our elected officials had no taste for a bond issue at that time," West told the audience. "We had to find a way to build without raising taxes or going to the ballot."`,
          `Fullerton said Plenary-Edgemoor found a way to raise private money for the construction, partially by taking the property where the old city hall sat in exchange, and partially by agreeing to a 40-year commitment to maintain the new buildings.`,
          `"It was essentially a DBFOM, Design-Build-Finance-Operate-Maintain, deal," West said. "That made it possible, and transferred a lot of the risk from the city."`,
          `Fullerton explained that there is a "risk continuum" for public-private projects that allows a public entity certainty while providing private investors with a fair return. In the Long Beach Civic Center case, Plenary Edgemoor agreed to maintain the buildings and return them to the city in at least 85% of new condition after the 40-year lease agreement was completed.`,
          `Other facets of the agreement included allowing the city to move only once, with the new buildings completed before the old buildings closed, and contingencies in case there was significant damage.`,
          `The Civic Center is six years old now, and both sides remain satisfied with the agreement, officials say. It could not have happened without the P3 concept, West and Fullerton agreed.`,
          `The entire session was captured on video, which will be available soon.`,
          `This session is the second in the P3 Strategy Series being presented by Sunstone Cities every other Friday at the Sunstone Stage in Irvine. The next speaker is Irvine Chamber President & CEO Dave Coffaro. Coffaro will appear at 1 p.m. Friday, June 27.`,
          `To find out more about this and other events, check out our calendar for upcoming events. Also be sure to sign up for the Sunstone Cities newsletter, and follow us on LinkedIn for more updates.`,
        ],
      },
    ],
    newsBriefs: [
      `The City of Menifee is actively exploring the use of the P3 model to redevelop municipal facilities, signaling a push for innovative collaboration with private partners to upgrade public infrastructure.`,
      `The California Heat Pump Partnership supports the state's 2025 building energy code prioritizing heat pumps in new construction and commercial retrofits with the goal of scaling heat pump adoption and reducing building emissions.`,
      `The University of California is set to lead a new initiative in response to the Department of Energy's efforts to develop a fusion P3 scheme, highlighting the role of P3s in advancing high-tech and energy infrastructure.`,
      `Oakland University has released a request for proposals on a major data center P3 project. Private partners are being sought to develop a new facility on the university's Rochester, Michigan campus.`,
    ],
    upcomingEvents: [
      `Aug. 8 - P3 Strategy Series, Tara Lynn Gray, Sunstone Presentation Stage, 1 p.m.`,
      `Aug. 15 - 2025-26 Sunstone Economic Development Challenge @ USC Price Client City Information Session.`,
      `Aug. 29 - P3 Strategy Series, Vivian Shimoyama, Sunstone Presentation Stage, 1 p.m.`,
      `Sept. 24 - CSU DEMO Day, Queen Mary, 8 a.m.-5 p.m.`,
    ],
  },
  {
    ...getNewsArticleMeta('long-beach-accelerator-ppe'),
    sections: [
      {
        heading: 'Case Study #2',
        paragraphs: [
          `John Shen was already well-known for pushing the envelope when he began discussions that would lead to the Long Beach Accelerator.`,
          `Shen had founded American Lending Center, Sunstone Management and other companies in Long Beach, becoming known as a parallel entrepreneur. He would become a member of the Long Beach Economic Development Commission, and was advocating for small businesses as job creators.`,
          `"I have long believed that a tech accelerator is the most efficient program to foster the growth of early-stage startups," Shen wrote in his 2023 book Crossing the Swamp. "It also serves as an effective investment tool for investors to target and select disruptive companies that have the best potential to experience explosive valuation growth in the future."`,
          `Accelerators, where startup entrepreneurs get help with business formation and growth strategies as well as initial investment, had been around for some time sponsored by large investment groups. Y Combinator on the West Coast and Techstars are among the most prominent.`,
          `Shen began exploring opportunities for venture capital investment in Southern California. An accelerator seemed the logical path, but it did not seem to make sense to take it on by himself. More resources were needed. That could only be done through a partnership.`,
        ],
      },
      {
        heading: 'In the Beginning',
        paragraphs: [
          `John Keisler was the director of Long Beach's Economic Development Department in 2015, guiding the first Blueprint for Economic Development to completion and approval by the City Council.`,
          `One of the Blueprint recommendations was to partner with a private capital investment firm to create an accelerator to attract new technology companies.`,
          `"One day John Shen came into my office and asked me if I could help him find some technology startups in Long Beach because he was offering to have his clients invest in them," Keisler said. "Our meeting was synergistic, with perfect timing. We agreed to work together to fulfill both our goals."`,
          `"I told John that we needed to involve an academic partner to provide the educational support and mentoring for startups. I introduced him to Dr. Wade Martin, Director of the Institute for Innovation & Entrepreneurship at California State University, Long Beach."`,
          `Dr. Martin taught economics at CSULB, and used the Institute for Innovation & Entrepreneurship as an incubator to help students hone their business concepts, including potential business plans. He said he knew they needed to take the next step if their dreams were going to become reality, but that there were not resources at the time.`,
          `"It is not an overstatement to say that the Long Beach Accelerator would not exist without the vision and commitment of John Shen," Dr. Martin said. "It is easy to say, 'wouldn't it be nice if...' but if you don't have someone with the willingness to commit the necessary resources and understand that there will be bumps in the path, the vision isn't going to happen."`,
          `These men provided the foundation of the Long Beach Accelerator. By 2019, a nonprofit had been incorporated, a board selected, and staff hired.`,
          `The concept took the public-private partnership model a step further, likely for the first time in the country. Now it was a public-private-education partnership leveraging the power of all three parties to provide community support and operational resources.`,
        ],
      },
      {
        heading: 'Ramping Up',
        paragraphs: [
          `In 2020, the COVID-19 pandemic stalled the LBA's momentum along with most of the rest of the economy. It might have been a blessing in disguise. By the time they were ready to recruit the first cohort of startup entrepreneurs, the training program had been completed, mentors brought on board and a package of direct and in-kind support completed.`,
          `That training was packed into a 12-week schedule. The first three months involved workshops and mentoring to determine market fit, business strategy and development, and sales and marketing. The program's last month focused on developing an exit strategy and preparing for a demonstration day designed to attract additional seed funding.`,
          `On Feb. 15, 2021, the first cohort of startup entrepreneurs walked through the LBA doors. There were seven businesses, with most led by a team of founders. Three of the seven, Evolectric, Ocra and Ownors AI, have grown over the last four years and have continued to raise money. A fourth, Storybolt, remains active as well.`,
          `Dr. Martin, the first board chair for LBA, has followed the cohort members to see how they fare in the real world. He said successful founders understand their customers, pivot when markets change and remain coachable through mentors and networks.`,
          `John Shen's involvement through Sunstone provided initial investments to cohort members. Sunstone has continued to help those businesses still in their portfolios with everything from networking to connections for technical assistance.`,
          `"LBA companies are early-stage technology companies with seed investment from our investment partner, Sunstone Management," said Vivian Shimoyama, current Long Beach Accelerator CEO. "For most of our companies, the Sunstone investment is the first investor."`,
        ],
      },
      {
        heading: 'Mechanics of the Partnership',
        paragraphs: [
          `When the Long Beach Accelerator was incorporated in 2019, John Shen committed to invest up to $100,000 per year into LBA cohort companies through Sunstone. The City of Long Beach committed $25,000 a year, primarily for office and class space. The CSULB Institute for Innovation & Entrepreneurship contributed expertise as well as acting as a pipeline for startup founders.`,
          `The Sunstone seed money typically has been the first investment for most LBA cohort companies, barring family and friends support. Once the cohort has completed training, a Demo Day takes place to showcase the companies to potential investors. Sunstone has the option to increase its investment in return for a small percentage stake in the company's equity.`,
          `Sessions consist of lectures and workshops with sector experts, scholars, and specialists to determine market fit, business strategy, sales and marketing. Mentors work one-on-one with founders on everything from the basic business concept to growth and exit strategies.`,
          `For the first six cohorts, startups spanned the gamut of service and product verticals, from EVOlectric's conversion of gas and diesel trucks to electric vehicles to Ocra, a centralized real-time channel management system for parking operators and owners.`,
          `After completion of the sixth cohort in November 2023, it was decided to pause training. Many of the LBA companies were working through the trough of the J Curve business path, where there is an initial period of decline or losses. Investors are watching carefully to see which companies will come out of the trough to profitability and growth.`,
        ],
      },
      {
        heading: 'Moving Forward',
        paragraphs: [
          `While Sunstone, the Long Beach Accelerator and the Institute for Innovation & Entrepreneurship all continue to support the startups that have gone through LBA, the accelerator's board is refining plans for the future.`,
          `"With two of the largest ports in the world, more than 30 aerospace and space companies, and a strong healthcare services system, the LBA looks to focus on the verticals of transportation/logistics/supply chain, aerospace/space, healthcare services, energy and clean tech, and creative tech services," Shimoyama said.`,
          `Keisler said that Sunstone Management will continue to be a strong partner, and may look at creating a parallel fund specializing in the proposed verticals at LBA. He noted that goods movement and clean energy generation are expected to be prime areas for advancement in Long Beach and Southern California.`,
          `That means fields ripe for startup companies and entrepreneurs, with help from the Long Beach Accelerator.`,
        ],
      },
    ],
    footnotes: [
      `John Shen, Crossing the Swamp. Page 15`,
      `https://altar.io/best-startup-accelerators-usa/`,
      `Shen, Swamp. Page 142`,
      `Shen, Swamp. Page 15`,
      `https://www.lbaccelerator.org/`,
      `Shen, Swamp. Page 143`,
    ],
    about: [
      `About Public-Private Partnerships LLC: Public Private Partners LLC was founded on the belief that public-private partnerships are the key to unlocking transformative projects. Government can jumpstart economic development, job creation, and community growth when paired with the innovation and capital of the private sector.`,
      `Cofounders John Keisler and Jeff Fullerton, who has helped deliver more than $6 billion in successful P3 projects, work directly with economic development firm Sunstone Cities to turn big ideas into reality.`,
    ],
    newsBriefs: [
      `One of the largest solar and battery power plants in the U.S. is now providing 7% of the electricity for the city of Los Angeles through a partnership between LADWP and Arevon Energy.`,
      `AlphaStruxure, a partnership of Schneider Electric and Carlyle, is constructing a 10.5 MW microgrid to power the New Terminal One at JFK International Airport.`,
      `The USDA and Sierra Pacific Industries launched a $75 million wildfire mitigation P3 project constructing and maintaining 400 miles of fuel breaks in California national forests.`,
      `In 2026, California has more than 20 major P3 projects in planning or procurement in areas including water, transportation, energy, affordable housing and more.`,
    ],
    upcomingEvents: [
      `September 3 - P3 Strategy Series, Glendale Tech Week.`,
      `September 19 - P3 Strategy Series with Bahram Solhjou, principal project manager at LA County Internal Services Department.`,
      `September 24 - CSU Demo Day, Queen Mary, 9 a.m.-5 p.m.`,
      `September 24-26 - Association of California Healthcare Districts Annual Conference, Sheraton San Diego Resort.`,
    ],
  },
  {
    ...getNewsArticleMeta('japan-p3-opportunity'),
    sections: [
      {
        heading: 'Case Study #3',
        paragraphs: [
          `California and Japan share many things, including nearly equal economic size, a passion for modernization through technology and a concern for sustainable development to meet climate goals.`,
          `Public-private partnerships and private finance incentives are playing a greater role in infrastructure projects in both Japan and California. In 2022, the Japanese government set a goal of 30 trillion Yen's worth of P3/PFI projects in the next 10 years.`,
          `Enter Sunstone Cities and its affiliate, Public-Private Partners LLC. Those firms have the expertise to make P3 projects work, and the contacts to connect California financing and Japanese needs.`,
        ],
      },
      {
        heading: 'Making Connections',
        paragraphs: [
          `Sunstone Cities CEO and P3 Partners LLC partner John Keisler joined the California+Japan Trade Mission 2025 at the end of September and beginning of October. The CalAsian Foundation organized the trip, with support from the New California Coalition, the Los Angeles County Business Federation and World Trade Center Los Angeles.`,
          `Considering the emphasis Japanese leaders are putting on upgrading the country's aging infrastructure, financing, particularly financing that lessens government risk and cost, was a major topic in the meeting rooms.`,
          `Sunstone Cities and Sunstone Management are very involved in clean energy expansions. Companies involved in everything from open ocean electricity generation to conversion of cargo trucks to electric power trains get support from Sunstone.`,
          `Japan established its Clean Energy and Energy Security Initiative in 2022 to provide high-level coordination of clean technologies including offshore wind, hydrogen, nuclear and grid modernization. Study of an 800-mile LNG pipeline project between Japan and Alaska began last month.`,
        ],
      },
      {
        heading: 'Needs In Japan',
        paragraphs: [
          `Japan's energy self-sufficiency rate was 15.2% in 2023, importing 90% of its total energy needs. Fossil fuels still account for 88% of Japan's energy consumption, and almost all oil, LNG and coal is imported.`,
          `Renewable energy development is a priority. The government recently established the Floating Offshore Wind Realization Association specifically to create 45GW of offshore wind generation by 2040. Development of another 150 GW of solar generation also is a priority.`,
          `Energy is only one area of need. Municipal and national infrastructure, including buildings and transportation, is aging. A 2022 amendment of Japan's 1999 PFI Act expanded eligible projects to include sports facilities and assembly venues.`,
          `Smart city development is another priority, with the government allocating $225 million this fiscal year specifically for advanced smart city technologies. Earlier this year, Tokyo completed Phase 1 of the $10.1 billion Woven City project.`,
        ],
      },
      {
        heading: 'Working Example',
        paragraphs: [
          `A relatively new concept in airport modernization has been privatization through a concession model. The Kansai and Osaka international airports were both privatized with a 44-year concession to the ORIX-VINCI consortium, establishing a template. Other government-owned airports are preparing similar arrangements.`,
          `In the United States, AlphaStruxure, a partnership of Schneider Electric and Carlyle, is constructing a 10.5 MW microgrid to power the New Terminal One at JFK International Airport. It will be the largest rooftop solar array in New York City and the largest clean-energy microgrid at any U.S. airport. Construction is expected to be completed in early 2026.`,
          `Schneider Electric and Sunstone Cities are in talks to find ways to work together.`,
        ],
      },
      {
        heading: 'Opportunities Both Ways',
        paragraphs: [
          `As part of recent trade negotiations between the United States and Japan, an agreement was made for $550 billion in Japanese investment in the U.S. That type of investment represents an optimal environment for public-private partnerships.`,
          `Primary areas for Japanese investment are expected to include energy infrastructure, semiconductor manufacturing, critical minerals and advanced fuels. By using a P3 approach, the Japanese investment can be multiplied to complete more needed energy generation projects along with other infrastructure.`,
          `As demonstrated by the trade mission, the structure for potential partnerships between Japanese and American firms is largely already in place. The CalAsian Foundation is critical for cooperation, as is the New California Coalition.`,
          `Across the Pacific, Japan and the United States have a combined 25.5% voting share in the Asian Development Bank. The Japan International Cooperation Agency has a Private Sector Investment Finance program that offers equity and debt financing for projects facing commercial viability challenges, and the Japan Bank for International Cooperation typically provides senior debt at favorable rates.`,
        ],
      },
      {
        heading: 'Conclusion',
        paragraphs: [
          `High-tech solutions to systemic problems like clean energy are a priority in Japan and the United States. Providing financial high-tech like P3 partnerships would streamline the path to project completion.`,
          `Efforts including the latest California+Japan Trade Mission are the exact place these partnerships can begin to take place. Sunstone is honored and pleased to be a part of that partnership.`,
        ],
      },
    ],
    footnotes: [
      `https://www.kwm.com/global/en/insights/latest-thinking/Public-PrivatePartnerships20250311.html`,
      `https://www.pipeline-journal.net/news/japan-weighs-trump-backed-44-billion-alaska-gas-pipeline-project-hires-consultant`,
      `https://www.climatebonds.net/news-events/blog/turning-point-japans-green-transformation`,
      `https://www.reuters.com/sustainability/climate-energy/japan-start-planning-floating-wind-test-centre-next-year-industry-official-says-2025-09-10/`,
      `https://onestepbeyond.co.jp/blogs/the-rise-of-smart-cities-in-japan-business-and-tech-investment/`,
      `https://onestepbeyond.co.jp/blogs/public-private-partnerships-in-japan-how-foreign-companies-can-get-involved/`,
    ],
    about: [
      `About Public-Private Partnerships LLC: Public Private Partners LLC was founded on the belief that public-private partnerships are the key to unlocking transformative projects. Government can jumpstart economic development, job creation, and community growth when paired with the innovation and capital of the private sector.`,
    ],
    newsBriefs: [
      `A public-private project to create the Snug Harbor Surf Park in Newport Beach, California, is nearing the end of the municipal approval process.`,
      `The National Oceanic and Atmospheric Administration is offering financial assistance to support aquaculture and traditional fishing industries through its Fisheries Finance Program.`,
      `A new P3 student housing facility opened this fall at the University of Hawaii at Manoa with two residential towers, 558 beds, a childcare center and more.`,
      `Alexandria, Virginia, will soon launch an affordable housing project through a P3 agreement to deliver 373 new residential units and surrounding community support buildings.`,
      `In San Diego, the Metropolitan Transit System is launching a major P3 effort to expand its network, including a goal of transitioning to a 100% zero-emission bus fleet.`,
    ],
    upcomingEvents: [
      `October 3 - P3 Strategy Series with Andy Nakahata, Executive Director, California Infrastructure and Economic Development Bank.`,
      `October 8-10 - League of California Cities Annual Conference and Expo, Long Beach Convention Center.`,
      `October 17 - P3 Strategy Series with Scott Taylor, Director, California State University, Fullerton, Conrey Center for Entrepreneurship.`,
    ],
  },
  {
    ...getNewsArticleMeta('space-beach-p3-economic-development'),
    sections: [
      {
        heading: 'Case Study #4',
        paragraphs: [
          `Public-private partnerships do not need to be limited to single projects. The concept can be central to an entire economic development approach, such as the Long Beach cluster development of Space Beach.`,
          `That was the topic of a panel at the recent 88 Cities Fall Summit in Long Beach. The Los Angeles County Economic Development Corporation organized the summit.`,
          `The "Scaling Public-Private Partnerships" panel was moderated by Studio One Eleven partner Michael Bohn and included Sunstone Cities CEO John Keisler, City of Long Beach Economic Development Director Bo Martinez, Long Beach Economic Partnership Board Chair Weston LaBar and Advocacy Chiefs LLC CEO Benjamin Cadranel.`,
          `The panel's subtitle was "From funding resilience to industry cluster development," and the panelists agreed that the transition from the end of commercial airplane manufacturing to a large and successful group of outer space-oriented companies is a shining example of that approach.`,
        ],
      },
      {
        heading: 'Historic Ending',
        paragraphs: [
          `Long Beach had been building airplanes for 74 years when Boeing delivered its last C-17 in November 2025. The aerospace legacy stretched back to before World War II when Douglas Aircraft settled in the city next to the municipal airport.`,
          `Manufacturing of commercial jets had stopped several years before the U.S. government announced it would not order any more of the giant cargo planes known as C-17s. When Boeing shut the line down, approximately 1,410 jobs were lost directly and regional losses were estimated at 5,191 jobs. For perspective, Douglas Aircraft employed 50,000 people during World War II.`,
          `The giant C-17 construction plant was only part of the Boeing manufacturing property that now was surplus. An earlier master plan called Douglas Park transformed former Boeing facilities into an area of retail, open space and headquarters for Virgin Galactic.`,
          `Virgin Galactic and its Launcher One arrived as Boeing was closing its C-17 hangar doors in 2015. By 2018 Virgin, later called Virgin Orbit, employed about 450 people. The venture eventually folded, but it was the pioneer that started Space Beach.`,
        ],
      },
      {
        heading: 'Government Support',
        paragraphs: [
          `With Boeing's early warning in 2013 that it would close the C-17 plant in 2015, Long Beach officials went to work. In September 2015, the U.S. Department of Defense's Office of Economic Adjustment awarded Long Beach a $3,995,609 grant as part of a $4.4 million comprehensive economic transition program tied to the end of the C-17 program.`,
          `It was the first big piece of public participation in the P3 project of Space Beach.`,
          `Keisler was the director of the city's Economic Development Department at the time. As he recalled during the panel discussion, the city used the grant for economic development, land use and infrastructure planning, along with assistance to impacted defense suppliers.`,
          `Building on the Douglas Park Planned Development, the city created a Globemaster Corridor Specific Plan that provided a comprehensive framework for developing 437 acres in the north-central portion of Long Beach. The development districts did not include any residential component, focusing instead on industrial, commercial and airport-related development.`,
          `That plan was approved by the City Council in 2021, but it had been in the works since 2014, after Boeing announced its manufacturing closure. Planning was key, but the business-friendly approach of Long Beach's government representatives to attracting companies and making their move to Space Beach as easy as possible also was important.`,
        ],
      },
      {
        heading: 'More Public Partners',
        paragraphs: [
          `While available land and both financial and bureaucratic assistance were critical to the space companies looking to join Space Beach, a key factor was, and is, a qualified workforce. While the legacy of aviation provided a base, cutting-edge approaches require cutting-edge training and education.`,
          `As Boeing manufacturing wound down, the Pacific Gateway Workforce Innovation Network stepped in. They connected displaced Boeing workers with new opportunities, found and supported training programs, and provided high-quality career services.`,
          `Many of the new jobs created by these space companies involved aerospace engineering. California State University, Long Beach, ranked #4 nationally among public universities for aerospace engineering, has built one of the largest aerospace programs in the state. CSULB recently received a $15 million federal grant to upgrade its engineering facilities.`,
          `Continued workforce development will be key for the cutting-edge companies of Space Beach to continue growing. The partnership is synergistic: students find valuable internships at these companies, some of which also support the school financially for things like the Beach Rocket Lab.`,
        ],
      },
      {
        heading: 'P3 Works',
        paragraphs: [
          `The success of this public-private-education partnership can be seen in the roster of major companies calling Long Beach home.`,
        ],
        bullets: [
          `Relativity Space is leasing the entire 1-million-square-foot former Boeing C-17 facility for its headquarters and launch vehicle manufacturing center.`,
          `SpinLaunch moved its headquarters from Sunnyvale to Long Beach.`,
          `Rocket Lab came to Long Beach to consolidate its corporate headquarters, production complex and mission control center.`,
          `Vast Space moved into the northern portion of the Globemaster Corridor and has plans to launch Haven-1 in mid-2026.`,
          `SpaceX has a booster recovery facility at the Port of Long Beach.`,
        ],
      },
      {
        heading: 'Economic Development',
        paragraphs: [
          `Numerous smaller companies focusing on specific segments of the space and aviation industry have joined Space Beach to be part of the ecosystem. Other advanced technology firms are part of the Space Beach area around the Long Beach Airport, including Mercedes Benz, Nikon Advanced Manufacturing Technology Center and Ford's Electric Vehicle Development Center.`,
          `In every case, the P3 approach had a hand in companies locating in and near Space Beach. In many cases, an argument could be made that the additional jobs would not have come to Long Beach without P3.`,
          `And jobs have come. It is estimated that 6,000 workers are directly employed by aerospace today, up from 2,800 aerospace jobs in 2018. That's economic development.`,
        ],
      },
    ],
    footnotes: [
      `https://lbbusinessjournal.com/business/news/the-storied-history-of-douglas-park/`,
      `https://www.latimes.com/business/la-fi-boeing-long-beach-20130919-story.html`,
      `https://www.latimes.com/business/la-fi-virgin-long-beach-20150213-story.html`,
      `https://mynewsla.com/government/2015/09/28/u-s-department-of-defense-awards-long-beach-3-9m-to-find-ways-to-repurpose-old-boeing-site/`,
      `https://longbeach.legistar.com/LegislationDetail.aspx?ID=4942567&GUID=9BC204CB-2B93-470C-9134-BC7396FAC30C&G=C4C9EF84-1F4F-4970-B63A-E2A64495FA07&FullText=1`,
      `https://www.csulb.edu/space-beach-initiative`,
    ],
    about: [
      `About Public-Private Partnerships LLC: Public Private Partners LLC was founded on the belief that public-private partnerships are the key to unlocking transformative projects.`,
    ],
    newsBriefs: [
      `The University of California, San Francisco began construction in August 2025 on a major public-private project for an advanced oncology and life sciences laboratory facility.`,
      `Garden Grove is delivering a new civic center, including a police headquarters, parking garage and park, through a progressive P3 model.`,
      `A 20-acre housing P3 near the College of San Mateo will build approximately 100 affordable units.`,
      `The P3 Summit in New York convened more than 80 global CEOs and senior government leaders to reshape public-private partnerships.`,
      `In San Diego, the Metropolitan Transit System is launching a major P3 effort to expand its network.`,
    ],
    upcomingEvents: [
      `November 7 - P3 Strategy Series with Jacob Collins, Assistant Planner, City of Carson.`,
      `November 14 - California Water and a Changing Federal Partnership by Public Policy Institute of California, Sacramento.`,
      `November 21 - P3 Strategy Series with Jeff Kugel, Community Development Director, City of Glendora.`,
      `December 5 - P3 Strategy Series with Sean Crumby, Interim City Manager, City of Irvine.`,
    ],
  },
  {
    ...getNewsArticleMeta('wildfire-recovery-public-private-partnerships'),
    imageCaption: 'Image source: 35912-HeroImg.jpeg',
    sections: [
      {
        heading: 'Case Study #5',
        paragraphs: [
          `January's devastating Eaton and Palisades wildfires showed just how quickly even the second-largest city in the country can be overwhelmed by both immediate and long-term recovery needs.`,
          `While immediate needs still are at the forefront of efforts 10 months later, groundwork is being laid for the future. Much like when wildfire allows Sequoia pinecones to open and distribute their seeds onto newly fertile ground, opportunities for new growth are sprouting.`,
        ],
      },
      {
        heading: 'Disaster Strikes',
        paragraphs: [
          `In the months since those tragedies, where 27 people died and more than 16,000 homes were lost, cleanup and recovery have relied heavily on public-private partnerships. Private companies mobilized to clear debris, nonprofits geared up to provide immediate relief to victims and governments worked hard to make sure regulatory hurdles were lowered without eliminating future safety.`,
          `Four communities in Los Angeles were particularly hard-hit: Altadena and Pasadena in the Eaton Fire and Pacific Palisades and Malibu in the Palisades Fire. The challenges were great. Public officials turned to the private sector for help.`,
          `The experiences from these communities reveal that P3s function most effectively when they combine clear governance structures, sustained financing, community engagement and commitment to equity with the private sector's speed, innovation and specialized capabilities.`,
        ],
      },
      {
        heading: 'Immediate Response',
        paragraphs: [
          `As the fires were extinguished in mid-January, literally thousands of displaced people looked for help. While local, county, state and federal governments provided what assistance they could, nonprofits including Red Cross, the Salvation Army and others stepped up with immediate aid. Without the nonprofit P3 partnership, far more human suffering would have resulted.`,
          `For disaster recovery specifically, these partnerships enable rapid mobilization of specialized expertise in logistics, construction management, materials procurement and workforce deployment that government agencies may lack internally.`,
          `Construction companies mobilized to help remove hazardous debris from the fires in partnership with governments clearing the regulatory way for proper disposal. The governments' own infrastructure was severely damaged, requiring specialists from the private sector to make a rapid recovery.`,
          `For example, the Los Angeles Department of Water and Power faces overwhelming challenges maintaining 739,000 service connections providing 163 billion gallons annually. P3 arrangements could rapidly restore safe drinking water while incorporating advanced treatment technologies, replacing aging pipes with fire-resistant materials and implementing smart monitoring systems.`,
          `Public-private partnerships provide structured frameworks for mobilizing private sector capital, expertise and efficiency to rebuild essential infrastructure faster and more effectively than traditional government procurement, while ensuring long-term operational performance through integrated design-build-operate-maintain contracts.`,
        ],
      },
      {
        heading: 'Re-creating Community',
        paragraphs: [
          `In the immediate aftermath of the fires, governments understandably focused on short-term needs: food, shelter and how residents could rebuild their homes.`,
          `But residents were also determined to maintain their communities and help each other recover. Once again, the private sector stepped up.`,
          `Rick Caruso created the nonprofit Steadfast LA to help with recovery efforts. He recruited JJ Redick's LA Strong Sports group to partner with him to quickly rebuild the Palisades Recreation Center. The partnership is funding the project entirely, eliminating the need for immediate municipal bond issuance or budget appropriations that might have delayed or prevented the project.`,
          `A new playground is already onsite, and construction is slated to begin in January 2026.`,
        ],
      },
      {
        heading: 'Build Back Stronger',
        paragraphs: [
          `While disasters like these wildfires are devastating in the short term, there is an opportunity in the long term if the necessary resources are available.`,
          `California's Giant Sequoias offer a useful example. It takes the high heat of a wildfire to open the Sequoia cones, where seeds can remain dormant for up to 20 years. The same wildfire clears undergrowth, preparing the ground for new seedlings. The sense of community has survived in wildfire-impacted towns as well.`,
          `Perhaps the most visible benefit of P3s is their ability to mobilize private capital to supplement constrained public budgets, spreading costs over the asset's lifetime rather than requiring large upfront government expenditures.`,
          `One of the positives of P3 projects is the coordination possible, particularly when the design-build-finance-operate-maintain model is used. Traditional government projects typically separate each phase into different contract and procurement phases, extending timelines and limiting coordination.`,
        ],
      },
      {
        heading: 'Restoring Economy',
        paragraphs: [
          `In addition to the more than 16,000 homes destroyed, the two wildfires torched more than 12 million square feet of commercial real estate, including 7 million square feet of office space, 4.5 million square feet of retail space and over 7,000 multifamily units. Economies in the cities directly impacted were gutted.`,
          `Infrastructure restoration creates necessary conditions for economic recovery but is insufficient by itself. Businesses must reopen, commercial corridors must regain vitality, workers must find employment and communities must reestablish their economic identities.`,
          `Business Improvement Districts are one form of P3 structure. Tax Increment Financing zones, also known as Opportunity Zones, are another tool for economic development and recovery.`,
          `When creating a TIF zone, cities designate fire-affected commercial corridors as TIF districts, project future tax revenue based on anticipated property value increases as reconstruction proceeds and use those projections to secure bonds financing immediate infrastructure improvements.`,
        ],
      },
      {
        heading: 'Next In Malibu',
        paragraphs: [
          `City leaders in Malibu have recognized the heavy losses being felt after the Palisades fire. A city that relies on tourism as a primary source of revenue, Malibu estimates a loss of $3 million to $5 million from Transient Occupancy Tax alone. Sales tax revenue is expected to drop by 50% this coming year.`,
          `Sunstone Cities is partnering with Malibu to create a recovery plan based on building for the future, not just recovering what was there. While initial needs studies have just begun, it already is clear that P3 strategies will be part of Malibu's future.`,
          `City leaders have identified support for small businesses and entrepreneurs as a key goal. There will be opportunities for the public to help develop the plan as well.`,
          `This planning process should provide a template for other cities recovering from disaster. Partnerships will, as always, be the key to success.`,
        ],
      },
    ],
    footnotes: [
      `https://www.federaltimes.com/opinions/2024/06/11/public-private-partnerships-can-revitalize-us-infrastructure/`,
      `https://www.brookings.edu/articles/the-los-angeles-fires-and-americas-overwhelmed-water-infrastructure/`,
      `https://www.federaltimes.com/opinions/2024/06/11/public-private-partnerships-can-revitalize-us-infrastructure/`,
      `Ibid.`,
      `https://catalog.results4america.org/strategies/commercial-corridor-revitalization`,
      `https://drexel.edu/nowak-lab/publications/newsletters/2022/regenerating-commercial-corridors-a-proposal-for-states/`,
    ],
    about: [
      `About Public-Private Partnerships LLC: Public Private Partners LLC was founded on the belief that public-private partnerships are the key to unlocking transformative projects.`,
    ],
    newsBriefs: [
      `Santa Barbara County is seeking partners to design, build, finance, operate and maintain a workforce housing development.`,
      `Brailsford & Dunlavey is partnering with Western Kentucky University and the Student Life Foundation to explore transforming the university's residence life program through a P3 model.`,
      `The U.S. has launched one of the world's largest transportation P3 contracts: the $2.3 billion Calcasieu River Bridge replacement in Louisiana.`,
    ],
    upcomingEvents: [
      `December 5 - P3 Strategy Series with Sean Crumby, Interim City Manager, City of Irvine.`,
      `December 8-9 - California Housing Conference & Expo, Los Angeles, JW Marriott.`,
      `December 10-11 - California Infrastructure Development Conference & Expo, Los Angeles, JW Marriott.`,
      `January 22, 2026 - CALED Rural Economic Development Exchange Meeting, Citizen Hotel, Sacramento.`,
    ],
  },
]

export function getNewsArticle(slug: string) {
  return newsArticles.find((article) => article.slug === slug)
}
