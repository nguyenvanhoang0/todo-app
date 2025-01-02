import { Ivariant } from 'src/app/shared/directive/button.type';

type IbuttonVariants = {
  variant: Ivariant;
  label: string;
  disabled: boolean;
  loading: boolean;
};

type VariantGroup = IbuttonVariants[];
type VariantWithDisabledGroup = IbuttonVariants[];
type VariantWithLoadingGroup = IbuttonVariants[];
type VariantWithDisabledAndLoadingGroup = IbuttonVariants[];
export type ButtonGroups = {
  variantGroup: VariantGroup;
  variantWithDisabledGroup: VariantWithDisabledGroup;
  variantWithLoadingGroup: VariantWithLoadingGroup;
  variantWithDisabledAndLoadingGroup: VariantWithDisabledAndLoadingGroup;
};
