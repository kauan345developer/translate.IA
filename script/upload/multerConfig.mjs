import multer from "multer";
import path from "path"

const storage = multer.diskStorage({
  // dizer para o multer onde salvar o arquivos
  destination: (req, file, cb) =>{
    cb(null, path.resolve("uploads/video"))
  },
  // dizer para o multer como salvar/formatar o arquivo
  filename:(req, file, cb) =>{
    const time = new Date().getTime()
    cb(null, `${time}_${file.originalname}`)
  }
})

export default storage