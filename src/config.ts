import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'
import { z } from 'zod'

switch(process.env.NODE_ENV) {
  case "development":
    console.log("Environment is 'development'")
    configDotenv({
      path: resolve(__dirname, "../.env.development")
    })
    break
  case "local":
    configDotenv({
      path: resolve(__dirname, "../.env.local")
    })
    break
  case "production":
    configDotenv({
      path: resolve(__dirname, "../.env.production")
    })
    break
  case "staging":
    configDotenv({
      path: resolve(__dirname, "../.env.staging")
    })
    break
  default:
    throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}

const envVariables = z.object({
    JWT_SECRET: z.string(),
    PORT: z.string(),
    NODE_ENV: z.string()
})
  
envVariables.parse(process.env)

declare global {
namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envVariables> { }
}
}
