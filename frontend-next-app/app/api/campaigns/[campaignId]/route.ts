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

export async function GET(
  req: Request,
  { params } : { params: { campaignId: string }}
) {
  try {
    const { userId } = auth();
    const { campaignId } = params 
    api.defaults.headers.userId = userId
    console.log(campaignId)
    const campaign = await api.get(`/api/campaign`)
    return NextResponse.json(campaign.data.data);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params } : { params: { campaignId: string }}
) {
  try {
    const { userId } = auth();
    const { campaignId } = params 
    api.defaults.headers.userId = userId
    const campaign = await api.delete(`/api/campaign/${campaignId}`)
    return NextResponse.json(campaign.data);
  } catch (error) {
    console.log("[COURSES]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}