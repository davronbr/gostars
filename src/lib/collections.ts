export interface NftCollectionItem {
  id: string;
  name: string;
  collection: string;
  imageUrl?: string;
  lottieUrl?: string;
  imageHint: string;
  price: string;
  date?: string;
  model: { value: string; rarity: string; };
  symbol: { value: string; rarity: string; };
  backdrop: { value: string; rarity: string; };
  floorPrice: string;
  offerPrice: string;
}

export const nftCollections: NftCollectionItem[] = [
  { 
    id: '#54522', 
    name: 'Santa hat', 
    collection: 'Christmas Gifts',
    lottieUrl: 'https://nft.fragment.com/gift/SantaHat-54522.lottie.json',
    price: '65 000 UZS',
    imageHint: 'santa hat',
    model: { value: 'Festive', rarity: '5%' },
    symbol: { value: 'Snowflake', rarity: '1.2%' },
    backdrop: { value: 'Winter Night', rarity: '3%' },
    floorPrice: '45 000 UZS',
    offerPrice: '60 000 UZS'
  },
  { 
    id: '#54523', 
    name: 'Reindeer Antlers', 
    collection: 'Christmas Gifts',
    imageUrl: 'https://picsum.photos/seed/reindeer/400/400',
    price: '55 000 UZS',
    imageHint: 'reindeer antlers',
    model: { value: 'Festive', rarity: '5%' },
    symbol: { value: 'Star', rarity: '3.2%' },
    backdrop: { value: 'Daylight Snow', rarity: '4%' },
    floorPrice: '40 000 UZS',
    offerPrice: '50 000 UZS'
  },
  { 
    id: '#10311', 
    name: 'Spooky Ghost', 
    collection: 'Halloween Specials',
    imageUrl: 'https://picsum.photos/seed/ghost/400/400',
    price: '70 000 UZS',
    imageHint: 'spooky ghost',
    model: { value: 'Ethereal', rarity: '2%' },
    symbol: { value: 'Moon', rarity: '1.8%' },
    backdrop: { value: 'Haunted Forest', rarity: '2.5%' },
    floorPrice: '65 000 UZS',
    offerPrice: '68 000 UZS'
  },
];
