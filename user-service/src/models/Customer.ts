import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface ICustomer {
    id?: number;
    name: string;
    phone: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
};

class User extends Model<ICustomer> implements ICustomer {
    public id!: number;
    public name!: string;
    public phone!: string;
    public password!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public version!: number;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            is: {
                args: /^91\d{10}$/,
                msg: "Please enter a valid phone number."
            }
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: "customer",
    timestamps: true,
    version: true
});

export default User;