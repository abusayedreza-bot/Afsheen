
import { Experience, Stat } from './types';

export const SEOUL_SPOTS: Experience[] = [
  {
    id: 501,
    title: 'Gyeongbokgung Palace',
    tagline: 'The Heart of the Joseon Dynasty',
    description: 'The largest and most iconic of the Five Grand Palaces built during the Joseon Dynasty.',
    history: 'Built in 1395, Gyeongbokgung served as the main royal palace. It was destroyed during the Imjin War and meticulously restored in the 19th century to its former glory.',
    discover: ['Gyeonghoeru Pavilion', 'Hyangwonjeong Pond', 'The Royal Guard Changing Ceremony'],
    entryFee: '3,000 KRW (Adults) / Free if wearing Hanbok',
    requirements: 'Recommended to arrive before 10:00 AM for the guard ceremony.',
    restrictions: 'No smoking, no pets, no professional commercial filming without permit.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    score: 9.9,
    tags: ['History', 'Palace', 'Must-Visit'],
    category: 'Seoul'
  },
  {
    id: 502,
    title: 'N Seoul Tower',
    tagline: 'Seoul’s Romantic Skyline',
    description: 'A communication and observation tower located on Namsan Mountain, offering panoramic city views.',
    history: 'Opened to the public in 1980, the tower has become a symbol of Seoul. It stands 236 meters tall and is famous for the "Love Locks" left by couples.',
    discover: ['Digital Observatory', 'Roof Terrace Love Locks', 'Namsan Cable Car Ride'],
    entryFee: '21,000 KRW (Observatory Pass)',
    requirements: 'Best visited at sunset to see both day and night views.',
    restrictions: 'Large luggage not allowed in the observatory.',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&q=80&w=1200',
    score: 9.8,
    tags: ['View', 'Landmark', 'Romantic'],
    category: 'Seoul'
  },
  {
    id: 503,
    title: 'Bukchon Hanok Village',
    tagline: 'A Living Museum of Tradition',
    description: 'A traditional village with a history of 600 years, home to hundreds of hanoks (traditional houses).',
    history: 'Historically, Bukchon was the residential quarter for high-ranking government officials and nobility during the Joseon period.',
    discover: ['Eight Scenic Views of Bukchon', 'Traditional Tea Houses', 'Craft Workshops'],
    entryFee: 'Free (Individual workshops may charge)',
    requirements: 'Respectful silence as it is a residential neighborhood.',
    restrictions: 'No loud noise, no littering, photography limited in private areas.',
    image: 'https://images.unsplash.com/photo-1621360341399-633041699967?auto=format&fit=crop&q=80&w=1200',
    score: 9.7,
    tags: ['Hanok', 'Heritage', 'Photography'],
    category: 'Seoul'
  }
];

export const KOREA_SPOTS: Experience[] = [
  {
    id: 601,
    title: 'Seongsan Ilchulbong',
    tagline: 'Sunrise Peak of Jeju',
    description: 'A breathtaking tuff cone crater formed by hydrovolcanic eruptions about 5,000 years ago.',
    history: 'Recognized as a UNESCO World Natural Heritage site, this "Fortress Mountain" rises 182 meters above sea level and is a symbol of Jeju Island’s geological diversity.',
    discover: ['Morning Sunrise View', 'Haenyeo Diver Performance', 'Crater Edge Trail'],
    entryFee: '5,000 KRW (Adults)',
    requirements: 'Hiking boots recommended for the steep ascent.',
    restrictions: 'No drone photography without permit. Protected area.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    score: 9.9,
    tags: ['Nature', 'Jeju', 'UNESCO'],
    category: 'Korea'
  },
  {
    id: 602,
    title: 'Bulguksa Temple',
    tagline: 'The Pinnacle of Buddhist Art',
    description: 'The golden age of Buddhist art in the Silla Kingdom is encapsulated in this magnificent temple complex in Gyeongju.',
    history: 'Constructed in 751 under the reign of King Gyeongdeok, the temple represents the Buddhist utopia on earth. It houses seven national treasures of South Korea.',
    discover: ['Dabotap Pagoda', 'Seokgatap Pagoda', 'Jahamun Gate'],
    entryFee: '6,000 KRW (Adults)',
    requirements: 'Dress modestly; this is a highly sacred active place of worship.',
    restrictions: 'No food or drink inside the temple buildings. Silent area.',
    image: 'https://images.unsplash.com/photo-1534001265532-393289eb8ed3?auto=format&fit=crop&q=80&w=1200',
    score: 9.8,
    tags: ['Spirituality', 'Gyeongju', 'History'],
    category: 'Korea'
  },
  {
    id: 603,
    title: 'Seoraksan National Park',
    tagline: 'The Backbone of Korea',
    description: 'Famous for its autumn foliage, jagged peaks, and the giant bronze Buddha statue.',
    history: 'Designated as a national park in 1970, Seoraksan is part of the Baekdudaegan mountain range. It was the first Korean area to be designated as a Biosphere Reserve by UNESCO in 1982.',
    discover: ['Ulsanbawi Rock', 'Sinheungsa Temple', 'Seorak Cable Car'],
    entryFee: 'Free (Parking and Cable Car fees apply)',
    requirements: 'Hiking permits required for specific overnight trails. Check weather forecasts before ascent.',
    restrictions: 'Strictly no camping outside designated areas. Cooking prohibited on trails.',
    image: 'https://images.unsplash.com/photo-1596402184320-417d7178b2cd?auto=format&fit=crop&q=80&w=1200',
    score: 9.7,
    tags: ['Mountain', 'Hiking', 'UNESCO'],
    category: 'Korea'
  },
  {
    id: 604,
    title: 'Haedong Yonggungsa Temple',
    tagline: 'The Temple by the Sea',
    description: 'A rare seaside Buddhist temple in Busan, known for its stunning ocean views and spiritual atmosphere.',
    history: 'Originally built in 1376 by the great teacher Naong during the Goryeo Dynasty. It was rebuilt in 1970 with a focus on restoring its traditional coastal architecture.',
    discover: ['108 Stairs of Longevity', 'Golden Buddha Statue', 'Sunrise Observation Point'],
    entryFee: 'Free entry',
    requirements: 'Extremely crowded during Buddha\'s birthday and New Year\'s Day.',
    restrictions: 'Maintain silence. No photography inside the main prayer hall.',
    image: 'https://images.unsplash.com/photo-1548115184-bc6544d06a58?auto=format&fit=crop&q=80&w=1200',
    score: 9.6,
    tags: ['Ocean', 'Temple', 'Busan'],
    category: 'Korea'
  }
];

export const DOMESTIC_SPOTS: Experience[] = [
  {
    id: 701,
    title: 'Suncheonman Bay Wetland',
    tagline: 'Authentic Nature Ecosystem',
    description: 'One of the world\'s top coastal wetlands, famous for its vast reed fields and ecological significance.',
    history: 'Suncheonman Bay is the first Korean coastal wetland to be registered on the Ramsar list. It has been preserved as a critical habitat for migratory birds like the hooded crane.',
    discover: ['Yongsan Observatory Sunset', 'Reed Field Trail', 'Ecological Boat Tour'],
    entryFee: '8,000 KRW (Adults)',
    requirements: 'Late autumn is the peak season for reed blooms and bird watching.',
    restrictions: 'Stay on designated trails. No loud noises. Protected ecological zone.',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=1200',
    score: 9.9,
    tags: ['Eco-Tourism', 'Nature', 'Suncheon'],
    category: 'Domestic'
  },
  {
    id: 702,
    title: 'Jeonju Hanok Village',
    tagline: 'The Soul of Korean Slow City',
    description: 'A preserved residential cluster of over 800 traditional houses in the heart of the modern city.',
    history: 'Unlike other hanok villages, Jeonju’s village is unique for being located in the city center. It has served as a cultural hub for calligraphy, traditional music, and gastronomy for centuries.',
    discover: ['Gyeonggijeon Shrine', 'Jeondong Cathedral', 'Authentic Jeonju Bibimbap'],
    entryFee: 'Free entry to village / Specific attractions vary',
    requirements: 'Try the Hanbok rental for a fully immersive historical experience.',
    restrictions: 'Bicycles and scooters are restricted during peak weekends for pedestrian safety.',
    image: 'https://images.unsplash.com/photo-1533050487297-09b450131914?auto=format&fit=crop&q=80&w=1200',
    score: 9.8,
    tags: ['Culture', 'Jeonju', 'Gastronomy'],
    category: 'Domestic'
  },
  {
    id: 703,
    title: 'Boseong Green Tea Fields',
    tagline: 'The Emerald Waves of the South',
    description: 'The largest and oldest tea plantation in Korea, featuring stunning terraced fields.',
    history: 'Daehan Dawon in Boseong was established in 1939. It has since become a landmark of the southern coast, famous for its cinematic landscapes and high-quality green tea.',
    discover: ['Cedar Tree Forest Trail', 'Ocean View Observatory', 'Green Tea Ice Cream'],
    entryFee: '4,000 KRW (Adults)',
    requirements: 'A 20-minute uphill hike is required for the best ocean views.',
    restrictions: 'Do not step into the actual tea plants. No tripod use on narrow stairs.',
    image: 'https://images.unsplash.com/photo-1534001265532-393289eb8ed3?auto=format&fit=crop&q=80&w=1200',
    score: 9.7,
    tags: ['Scenery', 'Relaxation', 'Boseong'],
    category: 'Domestic'
  },
  {
    id: 704,
    title: 'Hwaseong Fortress',
    tagline: 'Suwon’s Architectural Wonder',
    description: 'A late-Joseon era fortress surrounding the center of Suwon, the capital of Gyeonggi-do.',
    history: 'Built between 1794 and 1796 by King Jeongjo to honor his father and move the capital. It combined Western and Eastern military architecture and is a UNESCO World Heritage site.',
    discover: ['Hwaseong Haenggung Palace', 'Balloon Flying Over Suwon', 'Archery Experience'],
    entryFee: '1,000 KRW (Adults)',
    requirements: 'The full perimeter walk takes about 2-3 hours.',
    restrictions: 'No vehicles allowed on the fortress walls. Respect private property within the fortress walls.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1200',
    score: 9.6,
    tags: ['History', 'UNESCO', 'Gyeonggi'],
    category: 'Domestic'
  },
  {
    id: 705,
    title: 'Hahoe Folk Village',
    tagline: 'Andong’s Timeless Heritage',
    description: 'A traditional village from the Joseon Dynasty that has preserved its architecture and folk traditions for over 600 years.',
    history: 'The Ryu family of Pungsan has lived here for generations. It is famous for the Hahoe Mask Dance Drama and was visited by Queen Elizabeth II in 1999.',
    discover: ['Byeolsingut Talnori Mask Dance', 'Buyongdae Cliff View', 'Traditional Soy Sauce Jars'],
    entryFee: '5,000 KRW (Adults)',
    requirements: 'Check performance times for the mask dance (usually weekend afternoons).',
    restrictions: 'Many homes are still private residences; do not enter without permission.',
    image: 'https://images.unsplash.com/photo-1564344517635-2fca2d19b525?auto=format&fit=crop&q=80&w=1200',
    score: 9.5,
    tags: ['Tradition', 'UNESCO', 'Andong'],
    category: 'Domestic'
  },
  {
    id: 706,
    title: 'Manjanggul Cave',
    tagline: 'Jeju’s Subterranean Majesty',
    description: 'One of the finest lava tunnels in the world, featuring massive stalactites and lava columns.',
    history: 'Part of the Jeju Volcanic Island and Lava Tubes UNESCO World Heritage site. It was formed about 200,000 to 300,000 years ago during a massive volcanic eruption.',
    discover: ['Lava Column (7.6m tall)', 'Turtle Rock', 'Lava Wing-shaped Wall'],
    entryFee: '4,000 KRW (Adults)',
    requirements: 'Temperature inside is cold (11-15°C); bring a light jacket. Floor is slippery.',
    restrictions: 'No food or drink allowed inside. Touching the cave walls is prohibited.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    score: 9.4,
    tags: ['Geology', 'UNESCO', 'Jeju'],
    category: 'Domestic'
  }
];

export const JOURNEYS: Experience[] = [
  {
    id: 101,
    title: 'Volcanic Heritage Exploration',
    tagline: 'UNESCO World Heritage',
    description: 'A private guided trek and aerial tour of Jeju’s iconic basalt coastlines and dormant volcanic cones.',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&q=80&w=1200',
    score: 9.9,
    tags: ['Nature', 'UNESCO'],
    category: 'Journey'
  }
];

export const TRUSTED_PLATFORMS = [
  {
    name: 'VisitKorea',
    description: 'The official national tourism platform. Your primary source for validated travel data, safety protocols, and country-wide attractions.',
    icon: 'public'
  },
  {
    name: '대한민국 구석구석',
    description: 'The definitive domestic travel guide. Explore every corner of the peninsula with deep-dive local insights and seasonal hidden spots.',
    icon: 'map'
  },
  {
    name: 'Visit Seoul',
    description: 'The official Seoul city guide. Master the cosmopolitan heart of Korea with curated neighborhood walks and real-time event updates.',
    icon: 'location_city'
  },
  {
    name: 'Community Inspiration',
    description: 'Unfiltered local wisdom. Connect with community-vetted tips, secret cafes, and authentic experiences away from the tourist path.',
    icon: 'forum'
  }
];

export const APP_BENEFITS = [
  {
    title: 'Ready-made Itineraries',
    description: 'Skip the planning. Access expertly curated routes that balance major landmarks with peaceful hidden gems.',
    icon: 'auto_awesome'
  },
  {
    title: 'Smart Transportation',
    description: 'Navigate with confidence. Real-time guidance for Koreas world-class public transit and private transport options.',
    icon: 'directions_subway'
  }
];

export const STATS_DATA: Record<string, Stat[]> = {
  journeys: [{ value: '100%', label: 'Safety Rating' }, { value: '24h', label: 'Concierge' }],
  gourmet: [{ value: '45', label: 'Michelin Partners' }, { value: 'Top 5', label: 'Global Cuisine' }],
  culture: [{ value: '5k yrs', label: 'History' }, { value: 'Global', label: 'K-Pop Hub' }],
  stays: [{ value: 'Elite', label: 'Selection' }, { value: 'Smart', label: 'Booking' }],
  seoul: [{ value: '25m+', label: 'Metro Pop' }, { value: '24/7', label: 'City Life' }, { value: 'Global', label: 'Fashion Hub' }],
  korea: [{ value: '8', label: 'Provinces' }, { value: '15', label: 'UNESCO Sites' }, { value: 'Top 10', label: 'Safety Index' }],
  domestic: [{ value: '162', label: 'Local Cities' }, { value: '98%', label: 'Local Authenticity' }, { value: 'Exclusive', label: 'Insights' }]
};

export const GOURMET: Experience[] = [
  {
    id: 201,
    title: 'Seoul Gastronomy Tour',
    tagline: 'Michelin Excellence',
    description: 'Private access to three-star Michelin kitchens and the stories behind Korea’s modern culinary revolution.',
    image: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=1200',
    score: 9.8,
    tags: ['Gourmet', 'Elite'],
    category: 'Gourmet'
  }
];

export const CULTURE: Experience[] = [
  {
    id: 301,
    title: 'The Art of Hanji',
    tagline: 'Traditional Craft',
    description: 'Hands-on immersion with a designated national master in the art of traditional Korean paper making.',
    image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?auto=format&fit=crop&q=80&w=1200',
    score: 9.5,
    tags: ['Art', 'Workshop'],
    category: 'Culture'
  }
];

export const STAYS: Experience[] = [
  {
    id: 401,
    title: 'The Signiel Horizon',
    tagline: 'Urban Sanctuary',
    description: 'Luxury living at the highest point in Seoul, offering unparalleled views and refined hospitality.',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=1200',
    score: 9.9,
    tags: ['Modern', 'Skyline'],
    category: 'Accommodation'
  }
];
