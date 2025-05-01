require('dotenv').config();
const mongoose = require('mongoose');
const Itinerary = require('./models/Itinerary');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(async () => {
    console.log('🌱 Seeding MongoDB...');
    await Itinerary.deleteMany();

    await Itinerary.insertMany([
      {
        name: 'Phuket Getaway - 2 Nights',
        region: 'Phuket',
        duration: 2,
        days: [
          {
            dayNumber: 1,
            hotel: { name: 'Patong Bay Hill Resort', location: 'Patong' },
            transfers: [{ from: 'Phuket Airport', to: 'Hotel' }],
            activities: [{ name: 'Patong Beach', description: 'Sunset walk and street food' }]
          },
          {
            dayNumber: 2,
            hotel: { name: 'Patong Bay Hill Resort', location: 'Patong' },
            transfers: [{ from: 'Hotel', to: 'Phi Phi Islands' }],
            activities: [{ name: 'Island Tour', description: 'Snorkeling, Monkey Beach, Maya Bay' }]
          }
        ]
      },
      {
        name: 'Krabi Explorer - 3 Nights',
        region: 'Krabi',
        duration: 3,
        days: [
          {
            dayNumber: 1,
            hotel: { name: 'BlueSotel Smart', location: 'Ao Nang' },
            transfers: [{ from: 'Krabi Airport', to: 'Hotel' }],
            activities: [{ name: 'Sunset Cruise', description: 'Dinner cruise around Ao Nang' }]
          },
          {
            dayNumber: 2,
            hotel: { name: 'BlueSotel Smart', location: 'Ao Nang' },
            transfers: [],
            activities: [{ name: '4 Island Tour', description: 'Tup, Chicken, Poda, Phra Nang Cave' }]
          },
          {
            dayNumber: 3,
            hotel: { name: 'BlueSotel Smart', location: 'Ao Nang' },
            transfers: [{ from: 'Hotel', to: 'Airport' }],
            activities: [{ name: 'Market Walk', description: 'Shopping and lunch' }]
          }
        ]
      },
      {
        name: 'Phuket Highlights - 4 Nights',
        region: 'Phuket',
        duration: 4,
        days: [
          {
            dayNumber: 1,
            hotel: { name: 'The Marina Phuket Hotel', location: 'Patong' },
            transfers: [{ from: 'Phuket Airport', to: 'Hotel' }],
            activities: [{ name: 'Bangla Road', description: 'Nightlife experience' }]
          },
          {
            dayNumber: 2,
            hotel: { name: 'The Marina Phuket Hotel', location: 'Patong' },
            transfers: [],
            activities: [{ name: 'Elephant Jungle Sanctuary', description: 'Morning half-day ethical experience' }]
          },
          {
            dayNumber: 3,
            hotel: { name: 'The Marina Phuket Hotel', location: 'Patong' },
            transfers: [{ from: 'Hotel', to: 'James Bond Island' }],
            activities: [{ name: 'Kayaking Tour', description: 'Explore Phang Nga Bay caves' }]
          },
          {
            dayNumber: 4,
            hotel: { name: 'The Marina Phuket Hotel', location: 'Patong' },
            transfers: [],
            activities: [{ name: 'Chalong Temple', description: 'Cultural visit before flight' }]
          }
        ]
      },
      {
        name: 'Krabi Adventure - 5 Nights',
        region: 'Krabi',
        duration: 5,
        days: [
          {
            dayNumber: 1,
            hotel: { name: 'Dusit Thani Krabi', location: 'Klong Muang' },
            transfers: [{ from: 'Airport', to: 'Hotel' }],
            activities: [{ name: 'Relax at beach', description: 'Arrival day relaxation' }]
          },
          {
            dayNumber: 2,
            hotel: { name: 'Dusit Thani Krabi', location: 'Klong Muang' },
            transfers: [],
            activities: [{ name: 'Kayaking Mangroves', description: 'Explore Ao Thalane' }]
          },
          {
            dayNumber: 3,
            hotel: { name: 'Dusit Thani Krabi', location: 'Klong Muang' },
            transfers: [],
            activities: [{ name: 'Emerald Pool & Hot Springs', description: 'Full day excursion' }]
          },
          {
            dayNumber: 4,
            hotel: { name: 'Dusit Thani Krabi', location: 'Klong Muang' },
            transfers: [],
            activities: [{ name: 'Rock Climbing', description: 'Half day in Railay Beach' }]
          },
          {
            dayNumber: 5,
            hotel: { name: 'Dusit Thani Krabi', location: 'Klong Muang' },
            transfers: [{ from: 'Hotel', to: 'Airport' }],
            activities: []
          }
        ]
      },
      {
        name: 'Thailand Duo - 6 Nights (Phuket + Krabi)',
        region: 'Phuket/Krabi',
        duration: 6,
        days: [
          { dayNumber: 1, hotel: { name: 'Patong Resort', location: 'Phuket' }, transfers: [{ from: 'Airport', to: 'Hotel' }], activities: [{ name: 'Beach Day', description: 'Patong & Freedom Beach' }] },
          { dayNumber: 2, hotel: { name: 'Patong Resort', location: 'Phuket' }, transfers: [], activities: [{ name: 'Old Town Tour', description: 'Cultural sites & night market' }] },
          { dayNumber: 3, hotel: { name: 'Aonang Cliff Resort', location: 'Krabi' }, transfers: [{ from: 'Phuket Hotel', to: 'Krabi Hotel' }], activities: [{ name: 'Ao Nang Night', description: 'Dinner & walk' }] },
          { dayNumber: 4, hotel: { name: 'Aonang Cliff Resort', location: 'Krabi' }, transfers: [], activities: [{ name: 'Kayaking', description: 'Ao Thalane Mangroves' }] },
          { dayNumber: 5, hotel: { name: 'Aonang Cliff Resort', location: 'Krabi' }, transfers: [], activities: [{ name: 'Railay Beach', description: 'Rock climbing & sunbathing' }] },
          { dayNumber: 6, hotel: { name: 'Aonang Cliff Resort', location: 'Krabi' }, transfers: [{ from: 'Hotel', to: 'Airport' }], activities: [] }
        ]
      },
      {
        name: 'Thailand Discovery - 7 Nights',
        region: 'Phuket/Krabi',
        duration: 7,
        days: [
          { dayNumber: 1, hotel: { name: 'Holiday Inn', location: 'Phuket' }, transfers: [{ from: 'Airport', to: 'Hotel' }], activities: [{ name: 'Beach Chill', description: 'Relax on Karon Beach' }] },
          { dayNumber: 2, hotel: { name: 'Holiday Inn', location: 'Phuket' }, transfers: [], activities: [{ name: 'Phuket Town', description: 'Museum & cafes' }] },
          { dayNumber: 3, hotel: { name: 'Holiday Inn', location: 'Phuket' }, transfers: [], activities: [{ name: 'Phi Phi Tour', description: 'Speedboat tour with lunch' }] },
          { dayNumber: 4, hotel: { name: 'Aonang Princeville', location: 'Krabi' }, transfers: [{ from: 'Phuket Hotel', to: 'Krabi Hotel' }], activities: [{ name: 'Check-in & Rest', description: 'Sunset stroll' }] },
          { dayNumber: 5, hotel: { name: 'Aonang Princeville', location: 'Krabi' }, transfers: [], activities: [{ name: 'Island Hopping', description: 'Hong Islands day tour' }] },
          { dayNumber: 6, hotel: { name: 'Aonang Princeville', location: 'Krabi' }, transfers: [], activities: [{ name: 'Local Market', description: 'Food and shopping' }] },
          { dayNumber: 7, hotel: { name: 'Aonang Princeville', location: 'Krabi' }, transfers: [{ from: 'Hotel', to: 'Airport' }], activities: [] }
        ]
      },
      {
        name: 'Grand Thailand - 8 Nights',
        region: 'Phuket/Krabi/Bangkok',
        duration: 8,
        days: [
          { dayNumber: 1, hotel: { name: 'Andaman Embrace', location: 'Phuket' }, transfers: [{ from: 'Airport', to: 'Hotel' }], activities: [{ name: 'Arrival Relax', description: 'Pool & spa' }] },
          { dayNumber: 2, hotel: { name: 'Andaman Embrace', location: 'Phuket' }, transfers: [], activities: [{ name: 'Phuket Zoo', description: 'Animal shows' }] },
          { dayNumber: 3, hotel: { name: 'Andaman Embrace', location: 'Phuket' }, transfers: [], activities: [{ name: 'James Bond Island', description: 'Speedboat trip' }] },
          { dayNumber: 4, hotel: { name: 'Centara Grand Beach', location: 'Krabi' }, transfers: [{ from: 'Phuket', to: 'Krabi' }], activities: [] },
          { dayNumber: 5, hotel: { name: 'Centara Grand Beach', location: 'Krabi' }, transfers: [], activities: [{ name: 'Tiger Cave Temple', description: '1,237 steps climb!' }] },
          { dayNumber: 6, hotel: { name: 'Centara Grand Beach', location: 'Krabi' }, transfers: [], activities: [{ name: 'Beach picnic', description: 'Private beach with lunch' }] },
          { dayNumber: 7, hotel: { name: 'Avani Atrium', location: 'Bangkok' }, transfers: [{ from: 'Krabi', to: 'Bangkok' }], activities: [{ name: 'Asiatique Riverfront', description: 'Night market + Ferris wheel' }] },
          { dayNumber: 8, hotel: { name: 'Avani Atrium', location: 'Bangkok' }, transfers: [{ from: 'Hotel', to: 'Airport' }], activities: [] }
        ]
      }
    ]);

    console.log('✅ Successfully seeded 2–8 night itineraries.');
    mongoose.disconnect();
  })
  .catch((err) => console.error('❌ Seeding error:', err));
