import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string;

    @Column()
    email: string;

    @OneToOne(type => UserMetadata)
    @JoinColumn()
    metadata: UserMetadata;
}

@Entity() 
export class UserMetadata {
    //@PrimaryGeneratedColumn()
    id: number;

    @Column() 
    created: Date;

    @Column()
    stringData: string;
}