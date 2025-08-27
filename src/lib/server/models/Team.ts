import { Schema, model, Types, type HydratedDocument } from "mongoose";
import { createCollectionName } from "./util.js";
import validator from "validator";

export interface _InspirationInterface {
    url?: string
    description: string
    _id: Types.ObjectId
}

const InspirationSubdoc = new Schema<_InspirationInterface>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true,
        default: new Types.ObjectId()
    },
    url: {
        type: String,
        validate: [
            {
                message: "Must be a URL",
                validator(v: string) {
                    return !v || validator.isURL(v)
                }
            }
        ]
    },
    description: {
        type: String,
        length: [10, 300],
        required: true
    }
})

export interface _CommentInterface {
    _id: Types.ObjectId
    body: string
    author: Types.ObjectId
    date: Date
    timestamp: number
}

const CommentSubdoc = new Schema<_CommentInterface>({
    _id: {
        type: Schema.Types.ObjectId,
        required: true
    },
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

export interface _DemoInterface {
    name: string
    date: Date
    comments: _CommentInterface[]
    inspirations: _InspirationInterface[]
    audio_url?: string
    project_url?: string
    has_upload?: boolean
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
    },
    inspirations: {
        type: [InspirationSubdoc],
        required: true,
        default: []
    },
    audio_url: {
        type: String,
        validate: [
            {
                message: "Must be a URL",
                validator(v: string) {
                    return validator.isURL(v)
                }
            }
        ]
    },
    project_url: {
        type: String,
        validate: [
            {
                message: "Must be a URL",
                validator(v: string) {
                    return validator.isURL(v)
                }
            }
        ]
    },
    has_upload: {
        type: Boolean
    },
})

export interface _TrackInterface {
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

export interface _ProjectInterface {
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

TeamSchema.pre('save', function() {
    this.name = this.name.toLowerCase().replaceAll(/\s+/gm, " ")
})

const _TeamModel = model<_TeamInterface>('team', TeamSchema, createCollectionName('teams'))

export type _TeamType = HydratedDocument<_TeamInterface>

export default _TeamModel
