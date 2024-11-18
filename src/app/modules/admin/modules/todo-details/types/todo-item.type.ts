export type IBucketItem = {
  id: number;
  bucketId?: number;
  parentId?: number;
  content: string;
  done: boolean;
  createdAt: string;
  updatedAt?: string;
};
