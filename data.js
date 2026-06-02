// Blue Frequency — Ocean Region Data
// Each region includes real-world approximated values for
// temperature, pH, pollution index, and overall health score.

const REGIONS = {
  pacific: {
    name: "Pacific Ocean",
    desc: "The world's largest ocean shows mixed health signals. Surface temperatures are rising due to climate change, but deep cold currents maintain relatively stable chemistry in many zones.",
    temp: 17.2,
    ph: 8.08,
    pollution: 28,
    health: 72,
    baseColor: [4, 44, 83],      // deep navy blue
    waveAmp: 18,
    waveSpeed: 0.6
  },
  atlantic: {
    name: "Atlantic Ocean",
    desc: "The Atlantic faces significant pressure from coastal development and shipping traffic. Acidification is accelerating, particularly in the North Atlantic, impacting shellfish and coral ecosystems.",
    temp: 19.8,
    ph: 8.03,
    pollution: 47,
    health: 54,
    baseColor: [24, 95, 165],    // medium blue
    waveAmp: 22,
    waveSpeed: 0.8
  },
  arctic: {
    name: "Arctic Ocean",
    desc: "The fastest-warming ocean on Earth. Sea ice loss is dramatically altering light penetration and salinity, disrupting ecosystems that depend on predictable seasonal cycles.",
    temp: -1.2,
    ph: 7.98,
    pollution: 19,
    health: 41,
    baseColor: [133, 183, 235],  // pale icy blue
    waveAmp: 10,
    waveSpeed: 0.3
  },
  coral: {
    name: "Coral Triangle",
    desc: "Home to 76% of the world's coral species, this region is under severe thermal stress. Repeated bleaching events have damaged reef structures that took thousands of years to build.",
    temp: 29.1,
    ph: 8.01,
    pollution: 61,
    health: 35,
    baseColor: [55, 138, 221],   // stressed mid-blue
    waveAmp: 14,
    waveSpeed: 1.1
  },
  deep: {
    name: "Deep Sea",
    desc: "Below 200m, darkness and cold have preserved ancient ecosystems largely untouched for millennia. However, deep-sea mining proposals and microplastic accumulation now threaten these remote zones.",
    temp: 2.1,
    ph: 8.12,
    pollution: 12,
    health: 88,
    baseColor: [2, 14, 40],      // near-black deep ocean
    waveAmp: 6,
    waveSpeed: 0.2
  }
};
