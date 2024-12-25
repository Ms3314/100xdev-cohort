import { NextResponse } from "next/server";

export function GET() {
    return NextResponse.json({
        user : "Samiuddin",
        email : "sami@gmail.com"
    })
}

export function POST () {
    return NextResponse.json({
        user : "Samiuddin",
        email : "sami@gmail.com"
    })
}