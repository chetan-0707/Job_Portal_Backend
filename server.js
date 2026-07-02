import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";
import path from "path";
import serverless from "serverless-http";

dotenv.config({});

const app = express();
const serverless = require("serverless-http");

const _dirname = path.resolve();

connectDB();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:5173',
    credentials:true
}

app.use(cors(corsOptions));

// const PORT = process.env.PORT || 3000;


// api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

app.use(express.static(path.join(_dirname,"/frontend/dist")));
app.get('*',(_,res)=>{
      res.sendFile(path.resolve(_dirname,"frontend","dist","index.html"));
})
// // "http://localhost:8000/api/v1/user/register"

// app.listen(PORT,()=>{
//     connectDB();
//     console.log(`Server running at port ${PORT}`);
// })


module.exports = app;
module.exports.handler = serverless(app);



// import express from "express";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import serverless from "serverless-http";
// import path from "path";

// import connectDB from "./utils/db.js";
// import userRoute from "./routes/user.route.js";
// import companyRoute from "./routes/company.route.js";
// import jobRoute from "./routes/job.route.js";
// import applicationRoute from "./routes/application.route.js";

// dotenv.config();

// const app = express();

// const __dirname = path.resolve();

// // Connect DB once
// connectDB();

// // Middleware
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());

// const corsOptions = {
//     origin: process.env.CLIENT_URL || "https://your-frontend.vercel.app",
//     credentials: true,
// };

// app.use(cors(corsOptions));

// // API Routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/company", companyRoute);
// app.use("/api/v1/job", jobRoute);
// app.use("/api/v1/application", applicationRoute);

// // Frontend static files
// app.use(express.static(path.join(__dirname, "frontend/dist")));

// app.get("*", (req, res) => {
//     res.sendFile(
//         path.resolve(__dirname, "frontend", "dist", "index.html")
//     );
// });

// // DO NOT USE app.listen() ON VERCEL

// export const handler = serverless(app);
// export default app;