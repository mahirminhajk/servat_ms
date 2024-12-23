import { Document, model, Schema, } from "mongoose";

export interface IProvider {

    name: string;
    phone: string;
    shopName: string;
    address: string;
    image: string;

    id?: string;
    createdAt?: string;
    updatedAt?: string;
    version?: number;
};

export interface IProviderDocument extends IProvider, Document {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
};


const providerSchema = new Schema<IProviderDocument>({
    _id: {
        type: Number,
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
        required: true
    },
    address: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
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