"use client";

import { useState } from "react";

export default function Home() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [reference, setReference] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phone, amount }),
      });

      const data = await res.json();
      console.log("Pay response:", data);

      if (data.reference) {
        setReference(data.reference);
        setStatus("PENDING");
      } else {
        alert("Erreur: " + JSON.stringify(data));
      }
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async () => {
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      const data = await res.json();
      console.log("Status response:", data);
      setStatus(data.status);
    } catch (err) {
      console.error(err);
      alert("Erreur réseau");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Paiement CamPay</h1>

      <input
        placeholder="Téléphone (2376XXXXXXXX)"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <br /><br />

      <input
        placeholder="Montant (XAF)"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <br /><br />

      <button onClick={handlePay} disabled={loading}>
        {loading ? "Chargement..." : "Payer"}
      </button>

      {reference && (
        <div style={{ marginTop: 20 }}>
          <p>Référence: <strong>{reference}</strong></p>
          <p>Status: <strong>{status}</strong></p>
          <button onClick={checkStatus}>Vérifier statut</button>
        </div>
      )}
    </div>
  );
}