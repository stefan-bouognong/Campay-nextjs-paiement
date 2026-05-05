import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { phone, amount } = await req.json();

    if (!phone || !amount) {
      return NextResponse.json(
        { error: "phone et amount requis" },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${process.env.CAMPAY_BASE_URL}/collect/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${process.env.CAMPAY_API_KEY}`,
        },
        body: JSON.stringify({
          amount: String(amount),
          currency: "XAF",
          from: phone,
          description: "Paiement test Next.js",
          external_reference: `ORDER_${Date.now()}`,
        }),
      }
    );

    const data = await response.json();
    console.log("CamPay collect response:", data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erreur /api/pay:", error);
    return NextResponse.json(
      { error: "Erreur serveur", detail: String(error) },
      { status: 500 }
    );
  }
}