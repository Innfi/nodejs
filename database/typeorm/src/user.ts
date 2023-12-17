import { Entity, PrimaryGeneratedColumn, Column, 
    OneToOne, JoinColumn } from 'typeorm';


@Entity({ database: 'ormTest', name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    name: string;

    @Column()
    email: string;    
}

@Entity({ database: 'ormTest', name: 'user_metadata'}) 
export class UserMetadata {
    @PrimaryGeneratedColumn()
    id: number;

    @Column() 
    created: Date;

    @Column()
    stringData: string;

    @OneToOne(() => User, { eager: true })
    @JoinColumn()
    userdata: User;
}