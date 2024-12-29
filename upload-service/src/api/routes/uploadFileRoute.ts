import { NextFunction, Request, Response, Router } from "express";
import { upload } from "../../utils/multer.util";
import { minio } from "../../config";


const router = Router();

router.post("/", upload.single('file'), async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.file) {
            res.status(400).json({ message: "No file uploaded.", ok: false });
            return;
        }

        let fileName = `${Date.now()}-${req.file.originalname}`;
        fileName = await minio.uploadFile(req.file, fileName);

        const MINIO_URL = 'http://minio.km12.dev'

        const data = {
            filename: fileName,
            fileurl: `${MINIO_URL}/${process.env.MINIO_BUCKET}/${fileName}`
        }
        res.status(200).json({ message: "File uploaded successfully.", ok: true, data });

    } catch (error) {
        next(error);
    }
});

export default router;