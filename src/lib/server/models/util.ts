import dotenv from 'dotenv'
dotenv.config()

export const createCollectionName = (str: string): string => {
    if (!process.env.PROD) {
        str = "DEV_" + str
    }
    return str
}