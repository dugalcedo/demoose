export type Comment = {
    
}

export type Demo = {
    name: string
    comments: Comment[]
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
    teams: Team[]
}

export type Params = {
    teamId?: string
    projectName?: string
    trackName?: string
    demoName?: string
}

export type Data = {
    userData: UserData | undefined
    params: Params
    team?: Team
    project?: Project
    track?: Track
    demo?: Demo
    isTeamOwner?: boolean
}

export type AdditonalData = {
    team?: Team
    project?: Project
    track?: Track
    demo?: Demo
}