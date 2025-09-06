import { sanityReadClient } from "@/lib/sanity";

export type Booking = {
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
  addOns?: unknown[];
  projectDetails?: unknown;
  notes?: string;
};

// Server component function to fetch bookings directly from Sanity
export async function getBookings(): Promise<Booking[]> {
  try {
    const query = `*[_type == "booking"] | order(submittedAt desc) {
      _id,
      submissionId,
      submittedAt,
      status,
      service,
      contactInfo,
      region,
      estimatedPrice,
      language,
      scheduledCall,
      addOns,
      projectDetails,
      notes
    }`;

    const bookings = await sanityReadClient.fetch(query);
    return bookings;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return [];
  }
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleString();
}

function getStatusColor(status: string) {
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
}

// Simple access check - in production, you'd use proper authentication
function checkAccess(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const accessKey = searchParams.key;
  if (accessKey !== "admin-access-2025") {
    return false;
  }
  return true;
}

export default async function AdminBookingsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  // Await searchParams as required by Next.js 15
  const params = await searchParams;

  // Simple access control
  if (!checkAccess(params)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Admin Access Required
          </h1>
          <p className="text-gray-600 mb-4">
            This page requires admin access. Please contact the administrator
            for the access key.
          </p>
          <p className="text-sm text-gray-500">
            Access URL format: /admin/bookings?key=ACCESS_KEY
          </p>
        </div>
      </div>
    );
  }

  // Fetch bookings using server component
  const bookings = await getBookings();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Booking Management
          </h1>
          <p className="mt-2 text-gray-600">
            Manage and view all booking submissions ({bookings.length} total)
          </p>
        </div>

        {bookings.length > 0 ? (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Recent Bookings
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
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {bookings.map((booking) => (
                    <tr key={booking._id} className="hover:bg-gray-50">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No bookings found
              </h3>
              <p className="text-gray-500">
                Submit a booking through the booking form to see data here.
              </p>
            </div>
          </div>
        )}

        {/* Quick stats */}
        {bookings.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {bookings.filter((b) => b.status === "new").length}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        New Bookings
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {bookings.filter((b) => b.status === "new").length}{" "}
                        pending review
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {
                          bookings.filter((b) =>
                            ["accepted", "in_progress", "completed"].includes(
                              b.status
                            )
                          ).length
                        }
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Active Projects
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {
                          bookings.filter((b) =>
                            ["accepted", "in_progress"].includes(b.status)
                          ).length
                        }{" "}
                        in progress
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">
                        {bookings.filter((b) => b.scheduledCall).length}
                      </span>
                    </div>
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        Scheduled Calls
                      </dt>
                      <dd className="text-lg font-medium text-gray-900">
                        {bookings.filter((b) => b.scheduledCall).length} calls
                        requested
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
