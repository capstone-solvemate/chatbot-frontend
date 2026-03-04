import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.static(path.join(process.cwd())))


let PORT = parseInt(process.env.PORT || "")
if(isNaN(PORT)) {
  PORT = 2000
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})