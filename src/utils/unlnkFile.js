import * as fs from "fs"

export const unlinkFile = (path) => {
    try {
        fs.unlinkSync(path)
    } catch (er) {
        console.error(er)
    }
}