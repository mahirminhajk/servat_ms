import { Document, model, Schema, Types } from "mongoose";

export interface IService{
    provider: number;
    name: string;
    description: string;
    image: string[];
    minPrice: number;
    maxPrice: number;
    duration: number;
    category: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    version?: number;
};

export interface IServiceDocument extends IService, Document {
    id: string;
    createdAt: string;
    updatedAt: string;
    version: number;
};


const ServiceSchema = new Schema<IServiceDocument>({
    provider: {
        type: Number,
        ref: 'Provider',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    image: {
        type: [String],
        default: []
    },
    minPrice: {
        type: Number,
        required: true,
        default: 0
    },
    maxPrice: {
        type: Number,
        required: true,
        default: 1,
    },
    duration: {
        type: Number,
        required: true,
        default: 1
    },
    category: {
        type: String,
        required: true,
        default: 'Other'
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

const Service = model<IServiceDocument>("Service", ServiceSchema);

export default Service;