import { auth } from "@clerk/nextjs";
import Axios from "axios";
import { NextResponse } from "next/server";

const api = Axios.create({
    baseURL: "http://localhost:5001",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});


export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    api.defaults.headers.userId = userId
    const campaign = await api.post('/api/campaign', body)

    return NextResponse.json(campaign.data);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}