import { Document, model, Schema, } from "mongoose";

export interface IProvider {

    name: string;
    phone: string;
    shopName?: string;
    address?: string;
    image?: string;

    _id: number;
    createdAt?: string;
    updatedAt?: string;
    version: number;
};

export interface IProviderDocument extends IProvider, Document {
    _id: number;
    createdAt: string;
    updatedAt: string;
    version: number;
};


const providerSchema = new Schema<IProviderDocument>({
    _id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    shopName: {
        type: String,
    },
    address: {
        type: String,
    },
    image: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: 'version',
    toJSON: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
    toObject: {
        virtuals: true,
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
        }
    },
});

const Provider = model<IProviderDocument>("Provider", providerSchema);

export default Provider;