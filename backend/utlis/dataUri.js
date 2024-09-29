import DataURiParser from "datauri/parser.js"
import path from "path"

const getDataUri = (file)=>{
    const parser = new DataURiParser();
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName,file.buffer)
   

}

export default getDataUri;


// import DatauriParser from 'datauri/parser';
// import path from 'path';

// // Middleware to convert file to Data URI
// const dataUri = (req) => {
//     const parser = new DatauriParser();
//     return parser.format(path.extname(req.file.originalname).toString(), req.file.buffer);
// };
