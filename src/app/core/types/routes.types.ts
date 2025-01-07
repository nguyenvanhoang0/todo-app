import { IconNameTypes } from '../../shared/components/icon/icon.types';

export const MAIN_ROUTES: IRoute[] = [
  {
    route: ['me'],
    icon: 'user',
    title: 'MY_PROFILE',
  },
  {
    title: 'TODO',
    icon: 'calendar',
    route: ['todo'],
  },
  {
    title: 'Components',
    icon: 'tags',
    route: ['components'],
    children: [
      {
        title: 'Button component',
        icon: 'tag',
        route: ['components/button-variants'],
      },
      {
        title: 'input component',
        icon: 'tag',
        route: ['components/input-component'],
      },
      {
        title: 'count down',
        icon: 'tag',
        route: ['components/count-down'],
      },
      {
        title: 'Calendar',
        icon: 'calendar',
        route: ['components/calendar'],
      },
    ],
  },
  {
    title: 'Directives',
    icon: 'tags',
    route: ['directives'],
    children: [
      {
        title: 'Button directive',
        icon: 'tag',
        route: ['directives/button-directive'],
      },
    ],
  },
];

export type IRoute = {
  route?: string | string[];
  title: string;
  icon?: IconNameTypes;
  children?: IRoute[];
  level?: number;
  opened?: boolean;
  activated?: boolean;
};
