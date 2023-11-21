import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

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
