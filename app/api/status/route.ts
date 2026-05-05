import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { reference } = await req.json();

    if (!reference) {
      return NextResponse.json(
        { error: "reference requise" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.CAMPAY_BASE_URL}/transaction/${reference}/`,
      {
        method: "GET",
        headers: {
          Authorization: `Token ${process.env.CAMPAY_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    console.log("CamPay status response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur /api/status:", error);
    return NextResponse.json(
      { error: "Erreur statut", detail: String(error) },
      { status: 500 }
    );
  }
}