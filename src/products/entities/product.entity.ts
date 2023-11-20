import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  productId: number;

  @Column()
  productName: string;

  @Column({ length: 1000 })
  productDetail: string;

  @Column()
  price: number;

  @Column({ default: true })
  isInStock: boolean;

  @Column({ default: 0 })
  like: number;

  @Column({ nullable: true })
  imgUrl: string;
}
