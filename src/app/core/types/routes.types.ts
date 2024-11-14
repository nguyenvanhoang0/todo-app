import { IconNameTypes } from "../../shared/components/icon/icon.types";

export const MAIN_ROUTES: IRoute[] = [
  {
    route: ['me'],
    icon: 'user',
    title: 'My Profile'
  },
  {
    title: 'todo',
    icon: 'calendar',
    route: ['todo'],
  },
  {
    title: 'User',
    icon: 'project',
    route: ['user'],
  },
  {
    title: 'library',
    icon: 'tag',
    route: ['library'],
  }
];


export type IRoute = {
  route?: string | string[];
  title: string;
  icon?: IconNameTypes;
  children?: IRoute[];
  level?: number;
  opened?: boolean;
  activated?: boolean;
}
