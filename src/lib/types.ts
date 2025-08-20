import { Types } from "mongoose"

export type Inspiration = {
    _id: Types.ObjectId
    description: string
    url?: string
}

export type Comment = {
    _id: Types.ObjectId
    body: string
    author: string
    date: string | Date
    timestamp: number
}

export type Demo = {
    name: string
    date: string | Date
    comments: Comment[]
    inspirations: Inspiration[]
    audio_url?: string
    project_url?: string
}

export type Track = {
    name: string
    demos: Demo[]
}

export type Project = {
    name: string
    tracks: Track[]
}

export type Team = {
    _id: string
    name: string
    members: string[]
    mods: string[]
    creator: string
    owner: string
    projects: Project[]
}

export type UserData = {
    _id: string
    email: string
    displayName: string
    verified: boolean
    tokenLastSent: Date
    teams: Team[]
}

export type Params = {
    teamId?: string
    projectName?: string
    trackName?: string
    demoName?: string
    verificationToken?: string
}

export type UnverifiedUserData = {
    _id: string
    displayName: string
    email: string
    tokenLastSent: Date
    msSinceLastEmail: number
}

export type Data = {
    userData: UserData | undefined
    params: Params
    team?: Team
    project?: Project
    track?: Track
    demo?: Demo
    isTeamOwner?: boolean
    unverifiedUserData?: UnverifiedUserData
}

export type AdditonalData = {
    team?: Team
    project?: Project
    track?: Track
    demo?: Demo
}