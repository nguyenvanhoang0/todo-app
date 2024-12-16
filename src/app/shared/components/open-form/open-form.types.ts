import { IBucketItemSimple } from './types/bucket-item.type';
import { IBucketSimple } from './types/bucket.type';

export type formNameTypes =
  | 'add bucket'
  | 'add bucket items'
  | 'edit bucket'
  | 'edit bucket items'
  | 'delete';
export type buttonType = 'success' | 'warning' | 'danger' | 'default' | 'text';
export type deleteType = 'deleteBucket' | 'deleteBucketItem' | '';
export type contentForm = {
  BucketItem?: IBucketItemSimple;
  Bucket?: IBucketSimple;
};
