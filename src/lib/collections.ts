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
  purchaseReward: number;
  cashback: number;
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
    purchaseReward: 878,
    cashback: 0,
    offerPrice: '60 000 UZS'
  },
];
