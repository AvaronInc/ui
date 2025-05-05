
import { useState, useEffect } from 'react';

export interface APTGroup {
  id: string;
  name: string;
  aliases: string[];
  description: string;
  origin: string;
  targetedSectors: string[];
  threatLevel: 'low' | 'medium' | 'high' | 'critical';
  firstObserved: string;
  isActive: boolean;
  associatedMalware?: string[];
}

export const useAPTData = () => {
  const [aptGroups, setAptGroups] = useState<APTGroup[]>([
    {
      id: 'apt28',
      name: 'APT28',
      aliases: ['Fancy Bear', 'Sofacy', 'Sednit', 'STRONTIUM'],
      description: 'A sophisticated threat group attributed to Russia\'s military intelligence service. Known for targeting government, military, and security organizations.',
      origin: 'Russia',
      targetedSectors: ['Government', 'Defense', 'Political Organizations', 'Think Tanks'],
      threatLevel: 'critical',
      firstObserved: '2004',
      isActive: true,
      associatedMalware: ['X-Tunnel', 'X-Agent', 'Zebrocy', 'CHOPSTICK']
    },
    {
      id: 'apt29',
      name: 'APT29',
      aliases: ['Cozy Bear', 'The Dukes', 'CozyDuke'],
      description: 'A threat group attributed to Russia\'s foreign intelligence service. Known for its stealth, persistence, and sophisticated tradecraft.',
      origin: 'Russia',
      targetedSectors: ['Government', 'Diplomacy', 'Think Tanks', 'Healthcare'],
      threatLevel: 'critical',
      firstObserved: '2008',
      isActive: true,
      associatedMalware: ['MiniDuke', 'CosmicDuke', 'OnionDuke', 'SUNBURST']
    },
    {
      id: 'apt33',
      name: 'APT33',
      aliases: ['Elfin', 'Holmium', 'Refined Kitten'],
      description: 'A threat group with suspected ties to Iran, targeting organizations in the aerospace and energy sectors.',
      origin: 'Iran',
      targetedSectors: ['Aviation', 'Energy', 'Government', 'Defense'],
      threatLevel: 'high',
      firstObserved: '2013',
      isActive: true,
      associatedMalware: ['SHAPESHIFT', 'TURNEDUP', 'DROPSHOT']
    },
    {
      id: 'apt34',
      name: 'APT34',
      aliases: ['OilRig', 'Helix Kitten', 'Crambus'],
      description: 'An Iranian threat group targeting Middle Eastern and international organizations across various industries.',
      origin: 'Iran',
      targetedSectors: ['Financial', 'Government', 'Energy', 'Chemical', 'Telecommunications'],
      threatLevel: 'high',
      firstObserved: '2014',
      isActive: true,
      associatedMalware: ['POORWEB', 'POWRUNER', 'BONDUPDATER']
    },
    {
      id: 'apt38',
      name: 'APT38',
      aliases: ['Lazarus Group', 'Hidden Cobra', 'Nickel Academy'],
      description: 'A financially-motivated threat group with ties to North Korea, known for targeting financial institutions globally.',
      origin: 'North Korea',
      targetedSectors: ['Financial', 'Cryptocurrency', 'Defense'],
      threatLevel: 'critical',
      firstObserved: '2014',
      isActive: true,
      associatedMalware: ['DYEPACK', 'VertexEGG', 'BLINDINGCAN', 'COPPERHEDGE']
    },
    {
      id: 'apt41',
      name: 'APT41',
      aliases: ['Double Dragon', 'Wicked Panda', 'Barium'],
      description: 'A Chinese threat group that conducts state-sponsored espionage while also conducting financially motivated activity.',
      origin: 'China',
      targetedSectors: ['Healthcare', 'Telecom', 'Technology', 'Video Games', 'Pharmaceuticals'],
      threatLevel: 'critical',
      firstObserved: '2012',
      isActive: true,
      associatedMalware: ['POISONPLUG', 'HIGHNOON', 'DEADEYE', 'BLACKCOFFEE']
    },
    {
      id: 'apt10',
      name: 'APT10',
      aliases: ['Stone Panda', 'MenuPass', 'Red Apollo'],
      description: 'A Chinese threat group that targets organizations globally, focusing on theft of intellectual property and sensitive data.',
      origin: 'China',
      targetedSectors: ['Aerospace', 'Defense', 'Government', 'Manufacturing', 'Mining'],
      threatLevel: 'high',
      firstObserved: '2009',
      isActive: true,
      associatedMalware: ['HAYMAKER', 'SNUGRIDE', 'ChChes']
    },
    {
      id: 'apt19',
      name: 'APT19',
      aliases: ['Codoso Team', 'C0d0so', 'Deep Panda'],
      description: 'A Chinese threat group known for targeting legal and investment entities globally.',
      origin: 'China',
      targetedSectors: ['Legal', 'Investment', 'Government', 'Technology'],
      threatLevel: 'medium',
      firstObserved: '2013',
      isActive: false
    },
    {
      id: 'apt32',
      name: 'APT32',
      aliases: ['OceanLotus', 'SeaLotus', 'APT-C-00'],
      description: 'A threat group with suspected ties to Vietnam, targeting foreign corporations with interests in Vietnamese sectors.',
      origin: 'Vietnam',
      targetedSectors: ['Media', 'Research', 'Corporate', 'Government'],
      threatLevel: 'medium',
      firstObserved: '2014',
      isActive: true,
      associatedMalware: ['SOUNDBITE', 'WINDSHIELD', 'BEACON', 'Cobalt Strike']
    },
    {
      id: 'apt3',
      name: 'APT3',
      aliases: ['Gothic Panda', 'UPS Team', 'Buckeye'],
      description: 'A Chinese threat group that targets organizations in the defense, technology, and telecommunications sectors.',
      origin: 'China',
      targetedSectors: ['Defense', 'Technology', 'Telecommunications'],
      threatLevel: 'high',
      firstObserved: '2010',
      isActive: false,
      associatedMalware: ['Pirpi', 'CookieCutter', 'BladeDagger']
    },
    {
      id: 'muddywater',
      name: 'MuddyWater',
      aliases: ['Static Kitten', 'Mercury', 'TEMP.Zagros'],
      description: 'An Iranian threat group targeting government, defense, and telecommunications organizations in the Middle East.',
      origin: 'Iran',
      targetedSectors: ['Government', 'Defense', 'Telecommunications', 'Oil'],
      threatLevel: 'medium',
      firstObserved: '2017',
      isActive: true,
      associatedMalware: ['POWERSTATS', 'FORELORD', 'PRB-Backdoor']
    },
    {
      id: 'dragonfly',
      name: 'Dragonfly',
      aliases: ['Energetic Bear', 'Crouching Yeti', 'DYMALLOY'],
      description: 'A threat group targeting energy and industrial sectors, focusing on cyber espionage and potentially disruptive attacks.',
      origin: 'Russia',
      targetedSectors: ['Energy', 'Industrial Control Systems', 'Critical Infrastructure'],
      threatLevel: 'high',
      firstObserved: '2011',
      isActive: true,
      associatedMalware: ['Havex', 'Karagany', 'Dorshel']
    }
  ]);
  
  // Get unique regions
  const regions = [...new Set(aptGroups.map(group => group.origin))].sort();
  
  // Get unique sectors
  const sectors = [...new Set(aptGroups.flatMap(group => group.targetedSectors))].sort();
  
  // Simulate fetching data
  useEffect(() => {
    // In a real implementation, we'd fetch data from an API
    // For this sample, we're using static data
    console.log('Fetched APT data');
  }, []);
  
  return { aptGroups, regions, sectors };
};
