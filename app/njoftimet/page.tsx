"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import Image from "next/image";

type Notification = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

export default function NotificationsPage() {
  const supabase = createClient();
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    const { data } = await supabase
      .from("lajmerime")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) setNotifications(data);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-6 py-10">
          
          {/* Page header */}
          <div className="mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              NJOFTIMET
            </h1>
            <p className="text-gray-500 mt-2">
              Qëndroni të informuar me njoftimet më të fundit nga platforma.
            </p>
          </div>

          {/* Empty state */}
          {notifications.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center shadow-sm">
              
              <div className="flex justify-center mb-6">
                <Image
                  src="/notification.png"
                  alt="Notifications"
                  width={100}
                  height={100}
                  className="object-contain"
                />
              </div>

              <h2 className="text-xl font-semibold text-gray-800">
                Asnjë njoftim akoma
              </h2>
              <p className="text-gray-500 mt-2">
                Kur administratori të publikojë një njoftim, ai do të shfaqet këtu.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {notifications.map((note) => (
                <div
                  key={note.id}
                  className="bg-white border border-gray-200 hover:border-blue-400 transition rounded-2xl p-6 shadow-sm hover:shadow-md"
                >
                  <div className="flex justify-between items-start">
                    <h2 className="text-xl font-semibold text-gray-900">
                      {note.title}
                    </h2>

                    <span className="text-sm text-gray-400">
                      {new Date(note.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-gray-600 mt-3 leading-relaxed">
                    {note.message}
                  </p>

                  <div className="mt-4 text-sm text-gray-400">
                    {new Date(note.created_at).toLocaleTimeString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}