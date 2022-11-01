const {Sequelize, DataTypes, Model} = require('sequelize');
import sequelize from '../connection/db';

interface UserAttributes {
    fullName: string;
    userName: string;
    email: string;
    pno: number;
    password: string;
    confirmPassword: string;
    profile: string;
    role: string;
}

export class User extends Model<UserAttributes> {}

User.init(
    {
        fullName: {
            type: DataTypes.STRING,
            trim: true,
            allowNull: false,
        },

        userName: {
            type: DataTypes.STRING,
            trim: true,
            unique: true,
            allowNull: false,
        },
         
        pno: {
            type: DataTypes.BIGINT,
            allowNull: false,
            unique: true,
            validate: {
                len: [10],
                isNumeric: true,
            },
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {args: true, msg: 'email format is not correct'},
                notNull: {args: true, msg: "email can't be empty"},
                notEmpty: {args: true, msg: "email can't be empty string"},
            },
        },
        
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {args: true, message: "password can't be empty"},
                len: [8, 1000],
            },
        },
        confirmPassword: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {args: true, message: "password can't be empty"},
                len: [8, 1000],
            },
        },
        profile: {
            type: DataTypes.STRING,
            defaultValue:
                'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'User',
        },
    },
    {
        // Other model options go here
        tableName: 'users',
        sequelize: sequelize, 
        timeStamp:true// We need to pass the connection instance
    },
);

// `sequelize.define` also returns the model
console.log(User === sequelize.models.User); // true
export default User;
