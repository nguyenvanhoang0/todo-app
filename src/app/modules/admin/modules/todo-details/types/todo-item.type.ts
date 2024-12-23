export type IBucketItem = {
  id: number;
  bucketId?: number;
  parentId?: number;
  content: string;
  done: boolean;
  createdAt: Date;
  updatedAt?: Date;
  deadline?: string;
};

export type IExtendBucketItem = IBucketItem & {
  status?: 'warning' | 'danger' | 'missed-deadline';
  selected?: boolean;
};
