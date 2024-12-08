import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";
//TODO: include profile management fields
export interface IProvider {
    id?: number;

    name: string;
    phone: string;
    image?: string;
    password?: string;

    verified?: boolean;
    blacklisted?: boolean;

    createdAt?: Date;
    updatedAt?: Date;
    version?: number;
};

class Provider extends Model<IProvider> implements IProvider {
    public id!: number;

    public name!: string;
    public phone!: string;
    public password!: string;
    public verified!: boolean;
    public blacklisted!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public version!: number;
}

Provider.init({
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
        allowNull: false,
    },
    verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
}, {
    sequelize,
    modelName: "provider",
    timestamps: true,
    version: true,
    indexes: [
        {
            fields: ["phone"]
        },
    ],
    defaultScope: {
        attributes: {
            exclude: ["password"],
        },
        where: {
            verified: true,
            blacklisted: false
        },
    }
});

export default Provider;