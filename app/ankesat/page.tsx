"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

type Complaint = {
  id: string;
  category: string;
  address: string;
  details: string;
  user_id: string;
  complaint_votes: { count: number }[];
};

export default function ComplaintsPage() {
  const supabase = createClient();

  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [myVote, setMyVote] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, []);

  async function initialize() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);

    await fetchComplaints();

    if (user) {
      const { data } = await supabase
        .from("complaint_votes")
        .select("complaint_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (data) setMyVote(data.complaint_id);
    }

    setLoading(false);
  }

  async function fetchComplaints() {
    const { data, error } = await supabase
      .from("complaints")
      .select(`
        id,
        category,
        address,
        details,
        user_id,
        complaint_votes(count)
      `);

    if (error) {
      console.error("Error fetching complaints:", error);
      return;
    }

    setComplaints(data || []);
  }

  async function handleVote(complaintId: string) {
    if (!user) {
      alert("Login first");
      return;
    }

    await supabase
      .from("complaint_votes")
      .delete()
      .eq("user_id", user.id);

    if (myVote !== complaintId) {
      await supabase.from("complaint_votes").insert({
        user_id: user.id,
        complaint_id: complaintId,
      });
      setMyVote(complaintId);
    } else {
      setMyVote(null);
    }

    await fetchComplaints();
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center mt-20 text-lg">
          Duke u hapur...
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <div className="max-w-2xl mx-auto mt-10 px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Ankesat e qytetarëve
        </h1>

        {complaints.length === 0 && (
          <div className="text-center text-gray-500">
            Nuk ka ankesa ende. Bëjë një ankesë, mos hesht!
          </div>
        )}

        {complaints.map((complaint) => {
          const voteCount =
            complaint.complaint_votes?.[0]?.count || 0;

          const isVoted = myVote === complaint.id;
          const isDisabled = !!myVote && !isVoted;

          return (
            <div
              key={complaint.id}
              className="bg-white shadow-md rounded-lg p-6 mb-6 border"
            >
              <h3 className="text-xl font-semibold mb-2">
                {complaint.category} — {complaint.address}
              </h3>

              <p className="text-gray-700 mb-4">
                {complaint.details}
              </p>

              <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                <span>👤 Anonim</span>
                <span>👍 {voteCount}</span>
              </div>

              <button
                onClick={() => handleVote(complaint.id)}
                disabled={isDisabled}
                className={`
                  w-full py-2 rounded-md text-white font-medium transition
                  ${
                    isVoted
                      ? "bg-green-500 hover:bg-green-600"
                      : "bg-blue-500 hover:bg-blue-600"
                  }
                  ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }
                `}
              >
                {isVoted
                  ? "Votuar (Kliko përsëri për të hequr votën)"
                  : "Votoni"}
              </button>
            </div>
          );
        })}
      </div>

      <Footer />
    </>
  );
}