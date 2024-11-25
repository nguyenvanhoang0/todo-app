export const environment = {
  production: false,
  apiUrl: 'https://elysia.monthlyparty.com/',
  authEndpoint: {
    login: 'sign-in',
    register: 'sign-up',
    getUserInfo: 'me',
    update: 'me/update',
    avatar: 'me/avatar',
  },
  bucketsEndpoint: {
    getBuckets: 'buckets',
    createBucket: 'buckets',
    getBucketById: 'buckets/',
    updateBucket: 'buckets',
    delete: 'buckets/{id}',
  },
  bucketitemsEndpoint: {
    createBucketItem: '/items',
    getBucketItem: '/items',
    updateBucket: '/items/{id}',
    delete: '/items/{id}',
  },
};
