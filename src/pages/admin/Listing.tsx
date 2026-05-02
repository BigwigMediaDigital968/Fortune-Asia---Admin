import { useState } from "react";
import { api } from "../../lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Employee } from "./AdminLeadManagement";
import toast from "react-hot-toast";
import { fetchEmployees } from "../../lib/leads";
//const baseURL = import.meta.env.VITE_API_BASE_URL;

export interface Listing {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;

  bedrooms?: string | null;
  size: string;
  message?: string | null;

  source?: string;

  // assignment
  assignedTo?: Employee | null;

  // status
  status:
  | "new"
  | "contacted"
  | "qualified"
  | "assigned"
  | "negotiation"
  | "closed"
  | "lost";

  // timestamps
  createdAt: string;
  updatedAt: string;
}

const AdminListings = () => {
  const queryClient = useQueryClient();
  const [modal, setModal] = useState<{
    type: "delete" | "status" | "assign" | "note" | "view" | null;
    listing?: Listing;
  }>({ type: null });
  const [modalInput, setModalInput] = useState("");


  const fetchListings = async () => {
    const { data } = await api.get("/api/listing");
    return data;
  };
  const { data: listings = [], isLoading, error } = useQuery({
    queryKey: ["listings"],
    queryFn: fetchListings,
  });
  console.error("fetch listings error", error);

  const { data: employees = [] } = useQuery({
    queryKey: ["employees"],
    queryFn: fetchEmployees,
  });
  console.log("employees", employees)
  console.log("listings", listings)

  // const updateListing = async (data: any) => {
  //   await queryClient.cancelQueries({ queryKey: ["listings"] });

  //   const prev = queryClient.getQueryData(["listings"]);

  //   queryClient.setQueryData(["listings"], (old: any[]) =>
  //     old?.map((l) =>
  //       l._id === data.id ? { ...l, status: data.status } : l
  //     )
  //   );

  //   return { prev };
  // }



  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/listing/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Lead deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete lead");
    },
  });
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { data } = await api.patch(`/api/listing/${id}/status`, {
        status,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Status updated successfully");
    },
    onError: () => {
      toast.error("Failed to update status");
    },
  });
  const assignMutation = useMutation({
    mutationFn: async ({ id, userId }: { id: string; userId: string }) => {
      const { data } = await api.patch(`/api/listing/${id}/assign`, {
        userId,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Lead assigned successfully");
    },
    onError: () => {
      toast.error("Failed to assign lead");
    },
  });


  const confirmDelete = () => {
    if (!modal.listing) return;

    deleteMutation.mutate(modal.listing._id);
    setModal({ type: null });
  };

  const confirmStatusUpdate = () => {
    if (!modal.listing || !modalInput) return;

    statusMutation.mutate({
      id: modal.listing._id,
      status: modalInput,
    });

    setModal({ type: null });
    setModalInput("");
  };

  const confirmAssign = () => {
    if (!modal.listing || !modalInput) return;

    assignMutation.mutate({
      id: modal.listing._id,
      userId: modalInput,
    });

    setModal({ type: null });
    setModalInput("");
  };


  const handleModalConfirm = () => {
    if (modal.type === "delete") confirmDelete();
    else if (modal.type === "status") confirmStatusUpdate();
    else if (modal.type === "assign") confirmAssign();
    else if (modal.type === "view") setModal({ type: null });
  };

  console.log(listings);

  return (
    <div className="h-screen bg-gray-900 text-white font-raleway flex flex-col">
      {/* Header */}
      <div className="sticky top-0 z-20 bg-gray-900 p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">
          Property Listing Requests
        </h1>
      </div>

      <div className="flex-1 overflow-auto p-4 sm:p-6">
        {isLoading ? (
          <p className="text-gray-400 text-center">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="text-gray-400 text-center">No leads found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border border-gray-700 text-sm">
              <thead className="bg-gray-800 sticky top-0">
                <tr>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Phone</th>
                  <th className="px-4 py-3 text-left">Source</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-left">Assigned To</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {listings.map((listing: any) => (
                  <tr
                    key={listing._id}
                    className="even:bg-gray-900 hover:bg-gray-800 transition-colors"
                  >
                    <td className="px-4 py-3">{listing.name}</td>
                    <td className="px-4 py-3 break-words">
                      {listing.email || "-"}
                    </td>
                    <td className="px-4 py-3">{listing.phone}</td>
                    <td className="px-4 py-3">{listing.source || "-"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${listing.status === "new"
                          ? "bg-blue-900 text-blue-300"
                          : listing.status === "contacted"
                            ? "bg-yellow-900 text-yellow-300"
                            : listing.status === "qualified"
                              ? "bg-purple-900 text-purple-300"
                              : listing.status === "converted"
                                ? "bg-green-900 text-green-300"
                                : listing.status === "assigned"
                                  ? "bg-indigo-900 text-indigo-300"
                                  : "bg-red-900 text-red-300"
                          }`}
                      >
                        {listing.status || "new"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {listing.assignedTo?.name || "-"}
                    </td>
                    <td className="px-4 py-3 flex flex-wrap gap-2">
                      <button
                        onClick={() =>
                          setModal({ type: "status", listing })
                        }
                        className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                      >
                        Status
                      </button>
                      <button
                        onClick={() =>
                          setModal({ type: "assign", listing })
                        }
                        className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                      >
                        Assign
                      </button>
                      <button
                        onClick={() =>
                          setModal({ type: "view", listing })
                        }
                        className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                      >
                        View
                      </button>
                      <button
                        onClick={() =>
                          setModal({ type: "delete", listing })
                        }
                        className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Confirm Modal */}
      {modal.type && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
          <div className="bg-gray-900 border border-gray-700 p-6 w-full max-w-xl rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-3">
              {modal.type === "delete"
                ? "Delete Lead?"
                : modal.type === "status"
                  ? "Update Status"
                  : modal.type === "assign"
                    ? "Assign Lead"
                    : "Add Note"}
            </h2>

            {modal.type === "delete" ? (
              <p className="text-sm text-gray-400 mb-6">
                This action cannot be undone.
              </p>
            ) : (
              <div className="mb-6">
                {modal.type === "status" && (
                  <select
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="lost">Lost</option>
                    <option value="assigned">Assigned</option>
                  </select>
                )}

                {modal.type === "assign" && (
                  <select
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Employee</option>

                    {employees.map((emp: any) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.name} ({emp.email})
                      </option>
                    ))}
                  </select>
                )}

                {modal.type === "note" && (
                  <textarea
                    placeholder="Enter note..."
                    value={modalInput}
                    onChange={(e) => setModalInput(e.target.value)}
                    rows={4}
                    className="w-full bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                )}
                {modal.type === "view" && modal?.listing && (
                  <div className="bg-gray-900 w-full  max-w-3xl rounded-lg shadow-lg border border-gray-700">

                    {/* Header */}
                    <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                      <h2 className="text-lg font-semibold text-white">Listing Req Details</h2>
                    </div>

                    {/* Body */}
                    <div className="p-5 space-y-4 text-sm text-gray-300">

                      <div className="grid grid-cols-2 gap-4">

                        <div>
                          <p className="text-gray-500">Name</p>
                          <p className="text-white font-medium">{modal.listing.name}</p>
                        </div>

                        <div>
                          <p className="text-gray-500">Phone</p>
                          <p className="text-white">{modal.listing.phone}</p>
                        </div>

                        <div>
                          <p className="text-gray-500">Email</p>
                          <p className="text-white break-words">
                            {modal.listing.email || "-"}
                          </p>
                        </div>


                        <div>
                          <p className="text-gray-500">Source</p>
                          <p className="text-white">{modal.listing.source || "-"}</p>
                        </div>

                        <div>
                          <p className="text-gray-500">Assigned To</p>
                          <p className="text-white">
                            {modal.listing?.assignedTo?.name || "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">Status</p>
                          <span
                            className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${modal.listing.status === "new"
                              ? "bg-blue-900 text-blue-300"
                              : modal.listing.status === "contacted"
                                ? "bg-yellow-900 text-yellow-300"
                                : modal.listing.status === "qualified"
                                  ? "bg-purple-900 text-purple-300"
                                  : modal.listing.status === "assigned"
                                    ? "bg-indigo-900 text-indigo-300"
                                    : modal.listing.status === "closed"
                                      ? "bg-green-900 text-green-300"
                                      : "bg-red-900 text-red-300"
                              }`}
                          >
                            {modal.listing.status}
                          </span>
                        </div>

                        <div>
                          <p className="text-gray-500">Created At</p>
                          <p className="text-white">
                            {new Date(modal.listing.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <p className="text-gray-500">Message</p>
                        <p className="text-white mt-1">
                          {modal.listing.message || "No message provided"}
                        </p>
                      </div>

                      {/* Notes */}
                      {/**<div>
                                                    <p className="text-gray-500 mb-2">Notes</p>


                                                    {modal.listing.notes ? (
                                                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                                            <div
                                                                className="bg-gray-800 p-3 rounded border border-gray-700"
                                                            >
                                                                <p className="text-white text-sm">{modal.listing.notes?.text}</p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {modal.listing.notes?.addedBy?.name || "System"} •{" "}
                                                                    {new Date(modal.listing.notes?.createdAt).toLocaleString()}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <p className="text-gray-400 text-sm">No notes available</p>
                                                    )}
                                                </div> */}
                    </div>
                  </div>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 flex-wrap">
              <button
                onClick={() => {
                  setModal({ type: null });
                  setModalInput("");
                }}
                className="px-4 py-2 border border-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleModalConfirm}
                disabled={
                  modal.type !== "delete" && !modalInput.trim()
                }
                className={`px-4 py-2 rounded text-white disabled:opacity-50 ${modal.type === "delete"
                  ? "bg-red-600 hover:bg-red-700"
                  : modal.type === "status"
                    ? "bg-blue-600 hover:bg-blue-700"
                    : modal.type === "assign"
                      ? "bg-indigo-600 hover:bg-indigo-700"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminListings;
