import { NextResponse } from "next/server"
import bcrypt from "bcryptjs"

export async function POST(req: Request){

const { name,email,password } = await req.json()

// hash password
const hashedPassword = await bcrypt.hash(password,10)

// save user in database
const user = {
name,
email,
password: hashedPassword
}

console.log(user)

return NextResponse.json({
message:"User registered"
})

}