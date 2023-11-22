import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export enum ProductCategory {
  Chip = '과자',
  Beverage = '음료',
  IceCream = '아이스크림',
  ProcessedFood = '가공식품',
  Etc = '기타',
}

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column({ default: ProductCategory.Etc })
  category: ProductCategory;

  @Column({ length: 1000 })
  productDetail: string;

  @Column({ type: 'decimal' })
  productPrice: number;

  @Column({ default: false })
  isInStock: boolean;

  @Column({ default: 0 })
  like: number;

  @Column({ nullable: true, default: '기본 이미지 URL' })
  imgUrl: string;
}
