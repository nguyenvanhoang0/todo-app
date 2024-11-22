export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  authEndpoint: {
    login: 'sign-in',
    register: 'sign-up',
    getUserInfo: 'me',
    update: 'me/update',
  },
  bucketsEndpoint:{
    getBuckets: 'buckets',
    createBucket: 'buckets',
    getBucketById: 'buckets/',
    updateBucket: 'buckets',
    delete: 'buckets/{id}',
  },
  bucketitemsEndpoint:{
    createBucketItem: '/items',
    getBucketItem: '/items',
    updateBucket: '/items/{id}',
    delete: '/items/{id}',
  },
};
