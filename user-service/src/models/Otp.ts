import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/database";

export interface IOtp {
    id?: number;

    code: string;
    userId: number;
    userType: string;
    expiresAt: Date;
    retryCount: number;
    resentCount: number;
    done: boolean;

    createdAt?: Date;
};

class Otp extends Model<IOtp> implements IOtp {
    public id!: number;

    public code!: string;
    public userId!: number;
    public userType!: string;
    public expiresAt!: Date;
    public retryCount!: number;
    public resentCount!: number;
    public done!: boolean;

    public readonly createdAt!: Date;
}

Otp.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM("customer", "provider", "admin"),
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    retryCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    resentCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    done: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}, {
    sequelize,
    modelName: "otp",
    timestamps: true,
    updatedAt: false,
    indexes: [
        {
            fields: ["userId", "userType"]
        },
    ],
    defaultScope: {
        where: {
            done: false
        },
    }
});

export default Otp;