import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ProductImage } from "./product-image.entity";
import { User } from "src/auth/entities/auth.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: 'products' })
export class Product {

    @ApiProperty({
        example: '4abeaf8e-eac1-439f-a3fb-06716504ce7b',
        description: 'Product ID',
        uniqueItems: true
    })
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ApiProperty({
        example: 'T-Shirt Teslo',
        description: 'Product title',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    title: string;

    @ApiProperty({
        example: 0,
        description: 'Product price',
    })
    @Column('float', {
        default: 0
    })
    price: number;

    @ApiProperty({
        example: 'Pariatur aliqua ea aute nostrud Lorem esse elit nisi.',
        description: 'Product description',
    })
    @Column({
        type: 'text',
        nullable: true,
        default: ''
    })
    description: string;

    @ApiProperty({
        example: 't-shirt-teslo',
        description: 'Product slug',
        uniqueItems: true
    })
    @Column('text', {
        unique: true,
    })
    slug: string

    @ApiProperty({
        example: 5,
        description: 'Product stock',
    })
    @Column('int', {
        default: 0,
    })
    stock: number;

    @ApiProperty({
        example: ['M', 'S', 'XXL', 'L'],
        description: 'Product SIZES',
    })
    @Column('text', {
        array: true
    })
    sizes: string[]

    @ApiProperty({
        example: 'men',
        description: 'Product gender',
    })
    @Column('text')
    gender: string;

    @ApiProperty()
    @Column('text', {
        array: true,
        default: []
    })
    tags: string[]

    @OneToMany(
        () => ProductImage,
        (productImage) => productImage.product,
        { cascade: true, eager: true }
    )
    images?: ProductImage[]

    @ManyToOne(
        () => User,
        (user) => user.product,
        { eager: true }
    )
    user: User

    @BeforeInsert()
    checkSlugInsert() {
        if (!this.slug) {
            this.slug = this.title
        }
        this.slug = this.title
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }

    @BeforeUpdate()
    checkSlugUpdate() {
        this.slug = this.slug
            .toLocaleLowerCase()
            .replaceAll(' ', '_')
            .replaceAll("'", '')
    }
}
