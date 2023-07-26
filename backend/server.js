require("dotenv").config();

const express = require("express");
const cors = require("cors");
const upload = require("./utils/uploadImage");
const fs = require("fs");

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${file}`;
        files.push(name);
    }
    return files;
}

const PORT = 3001;
const app = express();
app.use(cors("*"));
app.use(express.json());

app.get("/", (req, res) => {
    res.setHeader("Content-Type", "image/png");
});

app.post("/upload", upload.single("fileUpload"), (req, res) => {
    console.log(req.file);
    res.json({
        message: "success",
    });
});

app.use(express.static("public"));

app.get("/files", (req, res) => {
    const files = getFiles("public");
    res.json({
        message: "success",
        data: files,
    });
});

app.listen(PORT, () => {
    console.log(`Server is listening at PORT ${PORT}`);
});
