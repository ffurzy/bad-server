import { NextFunction, Request, Response } from 'express'
import fs from 'fs'
import path from 'path'

export default function serveStatic(baseDir: string) {
    const normalizedBaseDir = path.resolve(baseDir)

    return (req: Request, res: Response, next: NextFunction) => {
        let decodedPath = ''
        try {
            decodedPath = decodeURIComponent(req.path)
        } catch {
            return res.status(400).json({ message: 'Некорректный путь' })
        }

        const safeRelativePath = decodedPath.startsWith('/')
            ? `.${decodedPath}`
            : decodedPath
        const filePath = path.resolve(normalizedBaseDir, safeRelativePath)

        if (
            filePath !== normalizedBaseDir &&
            !filePath.startsWith(`${normalizedBaseDir}${path.sep}`)
        ) {
            return res.status(403).json({ message: 'Доступ запрещен' })
        }

        fs.stat(filePath, (err, stats) => {
            if (err || !stats.isFile()) {
                return next()
            }

            return res.sendFile(filePath, (sendFileErr) => {
                if (sendFileErr) {
                    next(sendFileErr)
                }
            })
        })
    }
}
