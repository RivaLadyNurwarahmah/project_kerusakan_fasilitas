import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import { networkInterfaces } from "node:os"
import morgan from "morgan"
import testRouter from "./routes/test.routes"
import userRouter from "./routes/user.routes"
import reportRouter from "./routes/report.routes"
import facilitiesRouter from "./routes/facilities.route"
import authRoute from "./routes/auth.route"
import authRouter from "./routes/auth.route"
import path from "node:path"

dotenv.config()
const app = express()
const PORT: number = parseInt(process.env.PORT || "2003", 10)

app.use(express.json())
app.use(morgan("dev"))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/api", testRouter)

app.use("/user", userRouter)

app.use("/report", reportRouter)

app.use("/facilities", facilitiesRouter)

app.use("/auth", authRouter)

app.use("/uploads", express.static(path.join(__dirname, '..', 'uploads')));

function getNetworkAdresses(): string[] {
    const nets = networkInterfaces();
    const results: string[] = []

    for (const name of Object.keys(nets)) {
        const netsInterface = nets[name]!;
        for (const net of netsInterface) {
            if (net.family === "IPv4" && !net.internal) {
                results.push(net.address)
            }
        }
    }
    return results
}

function startServer(port: number) {
    const server = app.listen(port, () => {
        console.log(`• Server running on:`);
        console.log(`   Local:   http://localhost:${port}`);

        const addrs = getNetworkAdresses();
        if (addrs.length) {
            for (const addr of addrs) {
                console.log(`   Network: http://${addr}:${port}`);
            }
        }
    })

    server.on("error", (err: NodeJS.ErrnoException) => {
        if (err.code === "EADDRINUSE") {
            console.warn(`Port ${port} in use, trying ${port + 1}…`);
            startServer(port + 1)
        } else {
            console.error("Server error:", err);
        }
    })
}

startServer(PORT)
