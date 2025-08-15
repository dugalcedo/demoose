import { Schema, model, Types } from "mongoose";
import { createCollectionName } from "./util.js";

interface _CommentInterface {
    body: string
    author: Types.ObjectId
    date: Date
    timestamp: number
}

const CommentSubdoc = new Schema<_CommentInterface>({
    body: {
        type: String,
        length: [1, 300],
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    timestamp: {
        type: Number,
        min: 0,
        max: 60*60*1000,
        required: true
    }
})

interface _DemoInterface {
    name: string
    date: Date
    comments: _CommentInterface[]
}

const DemoSubdoc = new Schema<_DemoInterface>({
    name: {
        type: String,
        length: [1, 100],
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    },
    comments: {
        type: [CommentSubdoc],
        required: true,
        default: []
    }
})

interface _TrackInterface {
    name: string
    demos: _DemoInterface[]
}

const TrackSubdoc = new Schema<_TrackInterface>({
    name: {
        type: String,
        length: [1, 100],
        required: true
    },
    demos: {
        type: [DemoSubdoc],
        required: true,
        default: []
    }
})

interface _ProjectInterface {
    name: string
    tracks: _TrackInterface[]
}

const ProjectSubdoc = new Schema<_ProjectInterface>({
    name: {
        type: String,
        length: [1, 100],
        required: true
    },
    tracks: {
        type: [TrackSubdoc],
        required: true,
        default: []
    }
})

export interface _TeamInterface {
    name: string
    creator: Types.ObjectId
    owner: Types.ObjectId
    mods: Types.ObjectId[]
    members: Types.ObjectId[]
    projects: _ProjectInterface[]
}

const TeamSchema = new Schema<_TeamInterface>({
    name: {
        type: String,
        length: [1, 100],
        required: true,
        unique: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    mods: {
        type: [Schema.Types.ObjectId],
        ref: 'user',
        required: true,
        default: [],
        validate: {
            validator(v: any[]) {
                return v.length >= 1
            },
            message: "A team must have at least one mod."
        }
    },
    members: {
        type: [Schema.Types.ObjectId],
        ref: 'user',
        required: true,
        default: [],
        validate: {
            validator(v: any[]) {
                return v.length >= 1
            },
            message: "A team must have at least one member."
        }
    },
    projects: {
        type: [ProjectSubdoc],
        required: true,
        default: []
    }
})


const _TeamModel = model('team', TeamSchema, createCollectionName('teams'))

export default _TeamModel
