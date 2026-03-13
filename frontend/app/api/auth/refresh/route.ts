import { NextResponse } from "next/server"
import jwt from "jsonwebtoken"

export async function POST(req: Request){

const refreshToken = req.cookies.get("refreshToken")?.value

if(!refreshToken){
return NextResponse.json({error:"Unauthorized"},{status:401})
}

const decoded:any = jwt.verify(refreshToken,process.env.JWT_SECRET!)

const newAccessToken = jwt.sign(
{ userId:decoded.userId },
process.env.JWT_SECRET!,
{ expiresIn:"15m" }
)

return NextResponse.json({
accessToken:newAccessToken
})

}