import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const data = await req.json() 
    console.log(data)
    return NextResponse.json({
        //getting the request 
        message :"You have been Signed Up"
    })
}