const API = async () => {
  const URL = 'http:127.0.0.1:3000/api/v1/tours';

  const createTour = async (body) =>
    await fetch(URL, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
  const body = {
    startLocation: {
      description: 'California, USA',
      type: 'Point',
      coordinates: [-122.29286, 38.294065],
      address: '560 Jefferson St, Napa, CA 94559, USA',
    },
    ratingsAverage: 4.4,
    ratingsQuantity: 7,
    images: ['tour-7-1.jpg', 'tour-7-2.jpg', 'tour-7-3.jpg'],
    startDates: [
      '2021-02-12T10:00:00.000Z',
      '2021-04-14T09:00:00.000Z',
      '2021-09-01T09:00:00.000Z',
    ],
    name: 'The sss Taster',
    duration: 5,
    maxGroupSize: 8,
    difficulty: 'easy',
    guides: ['63ce82d621ce7beb905cb2f9', '63cd7a280048fe4565ed5d4b'],
    price: 1997,
    summary:
      'Exquisite wines, scenic views, exclusive barrel tastings,  and much more',
    description:
      'Consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\nIrure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    imageCover: 'tour-7-cover.jpg',
    locations: [
      {
        _id: '5c88fa8cf4afda39709c296f',
        description: 'Beringer Vineyards',
        type: 'Point',
        coordinates: [-122.479887, 38.510312],
        day: 1,
      },
      {
        _id: '5c88fa8cf4afda39709c296e',
        description: 'Clos Pegase Winery & Tasting Room',
        type: 'Point',
        coordinates: [-122.582948, 38.585707],
        day: 3,
      },
      {
        _id: '5c88fa8cf4afda39709c296d',
        description: 'Raymond Vineyard and Cellar',
        type: 'Point',
        coordinates: [-122.434697, 38.482181],
        day: 5,
      },
    ],
  };

  const post = await createTour(body);
  console.log(post);
};
API();
