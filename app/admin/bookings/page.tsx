"use client";

import { useState, useEffect } from "react";

type Booking = {
  _id: string;
  submissionId: string;
  submittedAt: string;
  status: string;
  service: {
    name: string;
    basePrice: number;
  };
  contactInfo: {
    name: string;
    email: string;
    company?: string;
    phone?: string;
  };
  region: string;
  estimatedPrice: {
    amount: number;
    currency: string;
  };
  language: string;
  scheduledCall: boolean;
};

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [authToken, setAuthToken] = useState("");

  const fetchBookings = async () => {
    if (!authToken) {
      setError("Please enter auth token");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");
      console.log("Fetching bookings with token:", authToken);

      const response = await fetch("/api/admin/bookings", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API Error:", errorText);
        throw new Error(
          `HTTP error! status: ${response.status} - ${errorText}`
        );
      }

      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        setBookings(data.bookings);
        setError("");
        console.log("Successfully loaded bookings:", data.bookings.length);
      } else {
        setError(data.error || "Failed to fetch bookings");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch("/api/admin/bookings", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({
          bookingId,
          status: newStatus,
        }),
      });

      if (response.ok) {
        // Refresh bookings
        await fetchBookings();
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      new: "bg-blue-100 text-blue-800",
      reviewing: "bg-yellow-100 text-yellow-800",
      proposal_sent: "bg-purple-100 text-purple-800",
      accepted: "bg-green-100 text-green-800",
      in_progress: "bg-indigo-100 text-indigo-800",
      completed: "bg-gray-100 text-gray-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Booking Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and view all booking submissions
          </p>
        </div>

        {/* Auth Token Input */}
        <div className="mb-6 p-4 bg-white rounded-lg shadow">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <label
                htmlFor="authToken"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Admin Auth Token
              </label>
              <input
                type="password"
                id="authToken"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
                placeholder="Enter admin-secret-key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={fetchBookings}
              disabled={loading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Fetch Bookings"}
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-md">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Bookings Table */}
        {bookings.length > 0 && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Bookings ({bookings.length})
              </h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Service
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                        {booking.submissionId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {booking.contactInfo.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {booking.contactInfo.email}
                          </div>
                          {booking.contactInfo.company && (
                            <div className="text-sm text-gray-500">
                              {booking.contactInfo.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {booking.service.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {booking.region} • {booking.language.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {booking.estimatedPrice.currency}{" "}
                        {booking.estimatedPrice.amount.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            booking.status
                          )}`}
                        >
                          {booking.status.replace("_", " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(booking.submittedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            updateBookingStatus(booking._id, e.target.value)
                          }
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="new">New</option>
                          <option value="reviewing">In Review</option>
                          <option value="proposal_sent">Proposal Sent</option>
                          <option value="accepted">Accepted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {bookings.length === 0 && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              No bookings found. Submit a booking to see data here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
