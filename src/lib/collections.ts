export interface NftCollectionItem {
  id: string;
  name: string;
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
    lottieUrl: 'https://nft.fragment.com/gift/SantaHat-54522.lottie.json',
    price: '65 000 UZS',
    imageHint: 'santa hat',
    model: { value: 'Festive', rarity: '5%' },
    symbol: { value: 'Snowflake', rarity: '1.2%' },
    backdrop: { value: 'Winter Night', rarity: '3%' },
    floorPrice: '45 000 UZS',
    offerPrice: '60 000 UZS'
  },
];
