import { type AdditonalData, type Data } from "./types.js"

export const loadAdditionalData = (data: Data): AdditonalData => {
    const ad: AdditonalData = {}
    if (!data.userData) return ad;
    if (!data.params.teamId) return ad;
    ad.team = data.userData.teams.find(t => t._id === data.params.teamId);
    if (!ad.team) return ad;
    if (!data.params.projectName) return ad;
    ad.project = ad.team.projects.find(p => p.name.toLowerCase() === data.params.projectName?.toLowerCase())
    if (!ad.project) return ad;
    if (!data.params.trackName) return ad;
    ad.track = ad.project.tracks.find(t => t.name.toLowerCase() === data.params.trackName?.toLowerCase())
    if (!ad.track) return ad;
    if (!data.params.demoName) return ad;
    ad.demo = ad.track.demos.find(d => d.name.toLowerCase() === data.params.demoName?.toLowerCase())
    return ad
}