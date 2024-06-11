import multer from "multer";
import path from "path";
import { db } from "../db/database_mysql.js";

// 저장소 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// 파일 필터링
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
    return cb(new Error("Only images are allowed"), false);
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).fields([
  { name: "uploadImage", maxCount: 1 },
  { name: "info", maxCount: 1 },
]);

export const uploadImage = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const { title, price, period } = req.body;
    const uploadImagePath = req.files.uploadImage[0].path;
    const infoImagePath = req.files.info[0].path;

    try {
      const [result] = await db.execute(
        "INSERT INTO ever_product (ptitle, price, period, image, info_image) VALUES (?, ?, ?, ?, ?)",
        [title, price, period, uploadImagePath, infoImagePath]
      );

      res.status(200).json({
        success: true,
        uploadImagePath,
        infoImagePath,
        productId: result.insertId,
      });
    } catch (dbError) {
      console.error(dbError);
      res.status(500).json({ success: false, message: "Database error" });
    }
  });
};
