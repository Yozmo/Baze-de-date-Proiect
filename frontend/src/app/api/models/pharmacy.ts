/* tslint:disable */
export interface Pharmacy {
  id?: number;
  name?: string;
  pharmacyType?: 'COMMUNITY' | 'NATURIST';
  supplierIds?: Array<number>;
}
