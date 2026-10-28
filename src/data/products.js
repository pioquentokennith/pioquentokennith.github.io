export const productFilters = [
  { value: 'all', label: 'All' }, { value: 'him', label: 'For Him' },
  { value: 'her', label: 'For Her' }, { value: 'unisex', label: 'Unisex' },
];
export const genderLabel = (gender) => productFilters.find((item) => item.value === gender)?.label || gender;

export const products = [
  {
    id: 1, name: 'Versace Eros Inspired', shortName: 'Eros', price: '₱220', gender: 'him', category: 'Fresh • Aromatic • Masculine',
    image: 'Assets/Perfume Photo inspired&orig/Eros2.png', poster: 'Assets/Perfume Photo Poster/EROS1.png',
    description: 'A confident, energetic scent profile inspired by fresh citrus, aromatic herbs, and a warm masculine base.',
    topNotes: 'Mint, green apple, lemon', heartNotes: 'Tonka bean, geranium, ambroxan', baseNotes: 'Vanilla, cedar, vetiver',
  },
  {
    id: 2, name: 'Lacoste Red Inspired', shortName: 'Lacoste Red', price: '₱220', gender: 'him', category: 'Fresh • Fruity • Woody',
    image: 'Assets/Perfume Photo inspired&orig/LacosteRed2.png', poster: 'Assets/Perfume Photo Poster/LACOSTE RED1.png',
    description: 'A sporty and fresh fragrance profile with bright fruit notes and an easy-to-wear woody finish.',
    topNotes: 'Green apple, citrus', heartNotes: 'Pine, aromatic notes', baseNotes: 'Cedarwood, patchouli',
  },
  {
    id: 3, name: 'Ultra Male Inspired', shortName: 'Ultra Male', price: '₱220', gender: 'him', category: 'Sweet • Spicy • Masculine',
    image: 'Assets/Perfume Photo inspired&orig/Ultramale2.png', poster: 'Assets/Perfume Photo Poster/Ultra male jpg1.png',
    description: 'A bold sweet-spicy scent made for confident evenings, balancing bright fruit with warm vanilla depth.',
    topNotes: 'Pear, bergamot, lavender', heartNotes: 'Cinnamon, clary sage', baseNotes: 'Vanilla, amber, woods',
  },
  {
    id: 4, name: 'YSL Y EDP Inspired', shortName: 'YSL Y', price: '₱220', gender: 'him', category: 'Fresh • Aromatic • Woody',
    image: 'Assets/Perfume Photo inspired&orig/YSL2.png', poster: 'Assets/Perfume Photo Poster/YSL1.png',
    description: 'A clean modern scent profile combining crisp freshness, aromatic spice, and a smooth woody trail.',
    topNotes: 'Apple, ginger, bergamot', heartNotes: 'Sage, juniper, geranium', baseNotes: 'Amberwood, tonka, cedar',
  },
  {
    id: 5, name: 'Hugo Boss Man Inspired', shortName: 'Hugo Boss', price: '₱220', gender: 'him', category: 'Fresh • Green • Woody',
    image: 'Assets/Perfume Photo inspired&orig/Hugo Boss2.png', poster: 'Assets/Perfume Photo Poster/Hugo Boss1.png',
    description: 'A versatile green and woody fragrance profile designed for a clean, confident everyday impression.',
    topNotes: 'Green apple, mint, citrus', heartNotes: 'Lavender, sage, geranium', baseNotes: 'Cedar, fir, sandalwood',
  },
  {
    id: 6, name: 'LV Imagination Inspired', shortName: 'LV Imagination', price: '₱220', gender: 'him', category: 'Citrus • Fresh • Amber',
    image: 'Assets/Perfume Photo inspired&orig/Lvimaganation2.png', poster: 'Assets/Perfume Photo Poster/LV imaganation1.png',
    description: 'A bright, polished citrus fragrance profile with airy spice and refined amber warmth.',
    topNotes: 'Citron, bergamot, orange', heartNotes: 'Ginger, neroli, cinnamon', baseNotes: 'Black tea, ambrox, guaiac wood',
  },
  {
    id: 7, name: 'Ariana Grande Cloud Inspired', shortName: 'Cloud', price: '₱220', gender: 'her', category: 'Sweet • Creamy • Feminine',
    image: 'Assets/Perfume Photo inspired&orig/Cloud2.png', poster: 'Assets/Perfume Photo Poster/CLOUD1.png',
    description: 'A soft, dreamy scent profile with airy sweetness, creamy warmth, and a smooth musky finish.',
    topNotes: 'Lavender, pear, bergamot', heartNotes: 'Coconut, praline, vanilla orchid', baseNotes: 'Musk, woods, creamy notes',
  },
  {
    id: 8, name: 'Sweet Like Candy Inspired', shortName: 'Sweet Like Candy', price: '₱220', gender: 'her', category: 'Fruity • Sweet • Gourmand',
    image: 'Assets/Perfume Photo inspired&orig/Sweetlikecandy2.png', poster: 'Assets/Perfume Photo Poster/SweetLikeAcandy1.png',
    description: 'A playful fruity-gourmand profile with soft berries, whipped sweetness, and vanilla warmth.',
    topNotes: 'Blackberry, pear, bergamot', heartNotes: 'Whipped cream, marshmallow, jasmine', baseNotes: 'Vanilla, cashmere wood',
  },
  {
    id: 9, name: 'Velvet Petals Inspired', shortName: 'Velvet Petals', price: '₱220', gender: 'her', category: 'Floral • Sweet • Warm',
    image: 'Assets/Perfume Photo inspired&orig/Velvet2.png', poster: 'Assets/Perfume Photo Poster/VELVET PETALS1.png',
    description: 'A warm floral profile with soft petals, creamy sweetness, and a cozy finish suited for everyday wear.',
    topNotes: 'Floral accords, soft fruit', heartNotes: 'Almond glaze, lush petals', baseNotes: 'Warm woods, musk',
  },
  {
    id: 10, name: 'Baccarat Rouge 540 Inspired', shortName: 'Baccarat Rouge', price: '₱220', gender: 'unisex', category: 'Amber • Woody • Unisex',
    image: 'Assets/Perfume Photo inspired&orig/Bacarat2.png', poster: 'Assets/Perfume Photo Poster/Bacarat Rouge1.png',
    description: 'A luminous amber-woody profile with airy sweetness and a sophisticated, long-lasting character.',
    topNotes: 'Saffron, jasmine', heartNotes: 'Amberwood, ambergris', baseNotes: 'Fir resin, cedar',
  },
];
