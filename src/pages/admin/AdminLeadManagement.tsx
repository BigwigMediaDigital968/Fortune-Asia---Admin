import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Lead {
    _id: string;
    name: string;
    phone: string;
    email?: string;
    purpose?: string;
    message?: string;
    source?: string;
    status?: string;
    assignedTo?: {
        _id: string;
        name: string;
        email: string;
    };
    notes?: {
        text: string;
        addedBy: string | null | Employee;
        createdAt: string;
    };
    createdAt: string;
}

export interface Employee {
    _id: string;
    name: string;
    email: string;
    phone: string;
    sheetId?: string | null;
    isActive: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const PAGE_LIMIT = 10;

const AdminLeadManagement = () => {
    const [leads, setLeads] = useState<Lead[]>([]);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [sourceFilter, setSourceFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);

    const [modal, setModal] = useState<{
        type: "delete" | "status" | "assign" | "note" | "view" | null;
        lead?: Lead;
    }>({ type: null });

    const [modalInput, setModalInput] = useState("");

    // Fetch leads with filters
    const fetchLeads = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: String(PAGE_LIMIT),
            });

            if (statusFilter !== "all") params.append("status", statusFilter);
            if (sourceFilter !== "all") params.append("source", sourceFilter);

            const res = await fetch(`${API_BASE_URL}/api/leads?${params.toString()}`);
            const data = await res.json();

            setLeads(data.data || []);
            setTotalPages(data.pages || 1);
            toast.success("Leads refreshed successfully");
        } catch (err) {
            console.error("Fetch error:", err);
            toast.error("Failed to fetch leads");
        } finally {
            setLoading(false);
        }
    };

    const fetchEmployees = async () => {
        try {
            const res = await fetch(`${API_BASE_URL}/api/employees/active`);
            const data = await res.json();
            setEmployees(data.data || []);
        } catch (err) {
            console.error("Fetch error:", err);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [page, statusFilter, sourceFilter]);

    // Filter leads by search locally
    const filteredLeads = leads.filter((lead) => {
        if (!search) return true;
        const searchLower = search.toLowerCase();
        return (
            lead.name.toLowerCase().includes(searchLower) ||
            lead.email?.toLowerCase().includes(searchLower) ||
            lead.phone.toLowerCase().includes(searchLower)
        );
    });

    const confirmDelete = async () => {
        if (!modal.lead) return;

        try {
            const res = await fetch(`${API_BASE_URL}/api/leads/${modal.lead._id}`, {
                method: "DELETE",
            });

            if (!res.ok) throw new Error("Delete failed");

            fetchLeads();
            toast.success("Lead deleted successfully");
        } catch (err) {
            toast.error("Failed to delete lead");
        } finally {
            setModal({ type: null });
        }
    };

    const confirmStatusUpdate = async () => {
        if (!modal.lead || !modalInput) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/api/leads/${modal.lead._id}/status`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ status: modalInput }),
                }
            );

            if (!res.ok) throw new Error("Status update failed");

            //const data = await res.json();

            fetchLeads();
            toast.success("Status updated successfully");
        } catch (err) {
            toast.error("Failed to update status");
        } finally {
            setModal({ type: null });
            setModalInput("");
        }
    };

    const confirmAssign = async () => {
        if (!modal.lead || !modalInput) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/api/leads/${modal.lead._id}/assign`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId: modalInput }),
                }
            );

            if (!res.ok) throw new Error("Assign failed");

            const data = await res.json();

            setLeads((prev) =>
                prev.map((l) => (l._id === modal.lead?._id ? data.data : l))
            );
            toast.success("Lead assigned successfully");
        } catch (err) {
            toast.error("Failed to assign lead");
        } finally {
            setModal({ type: null });
            setModalInput("");
        }
    };

    const confirmAddNote = async () => {
        if (!modal.lead || !modalInput.trim()) return;

        try {
            const res = await fetch(
                `${API_BASE_URL}/api/leads/${modal.lead._id}/notes`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ text: modalInput }),
                }
            );

            if (!res.ok) throw new Error("Add note failed");

            //const data = await res.json();

            fetchLeads();
            toast.success("Note added successfully");
        } catch (err) {
            toast.error("Failed to add note");
        } finally {
            setModal({ type: null });
            setModalInput("");
        }
    };

    const handleModalConfirm = () => {
        if (modal.type === "delete") confirmDelete();
        else if (modal.type === "status") confirmStatusUpdate();
        else if (modal.type === "assign") confirmAssign();
        else if (modal.type === "note") confirmAddNote();
        else if (modal.type === "view") setModal({ type: null });
    };

    return (
        <div className="h-screen bg-gray-900 text-white font-raleway flex flex-col">
            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-900 p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Lead Management</h1>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto flex-wrap">
                    <input
                        placeholder="Search name, email or phone"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded w-full sm:w-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setPage(1);
                            setStatusFilter(e.target.value);
                        }}
                        className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                        <option value="lost">Lost</option>
                        <option value="assigned">Assigned</option>
                    </select>

                    <select
                        value={sourceFilter}
                        onChange={(e) => {
                            setPage(1);
                            setSourceFilter(e.target.value);
                        }}
                        className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="all">All Sources</option>
                        <option value="website">Website</option>
                        <option value="referral">Referral</option>
                        <option value="social">Social Media</option>
                        <option value="direct">Direct</option>
                    </select>

                    <button
                        onClick={fetchLeads}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                        🔄 Refresh
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                {loading ? (
                    <p className="text-gray-400 text-center">Loading...</p>
                ) : filteredLeads.length === 0 ? (
                    <p className="text-gray-400 text-center">No leads found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border border-gray-700 text-sm">
                            <thead className="bg-gray-800 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3 text-left">Name</th>
                                    <th className="px-4 py-3 text-left">Email</th>
                                    <th className="px-4 py-3 text-left">Phone</th>
                                    <th className="px-4 py-3 text-left">Purpose</th>
                                    <th className="px-4 py-3 text-left">Source</th>
                                    <th className="px-4 py-3 text-left">Status</th>
                                    <th className="px-4 py-3 text-left">Assigned To</th>
                                    <th className="px-4 py-3 text-left">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredLeads.map((lead) => (
                                    <tr
                                        key={lead._id}
                                        className="even:bg-gray-900 hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="px-4 py-3">{lead.name}</td>
                                        <td className="px-4 py-3 break-words">
                                            {lead.email || "-"}
                                        </td>
                                        <td className="px-4 py-3">{lead.phone}</td>
                                        <td className="px-4 py-3">{lead.purpose || "-"}</td>
                                        <td className="px-4 py-3">{lead.source || "-"}</td>
                                        <td className="px-4 py-3">
                                            <span
                                                className={`px-2 py-1 rounded text-xs font-medium ${lead.status === "new"
                                                    ? "bg-blue-900 text-blue-300"
                                                    : lead.status === "contacted"
                                                        ? "bg-yellow-900 text-yellow-300"
                                                        : lead.status === "qualified"
                                                            ? "bg-purple-900 text-purple-300"
                                                            : lead.status === "converted"
                                                                ? "bg-green-900 text-green-300"
                                                                : lead.status === "assigned"
                                                                    ? "bg-indigo-900 text-indigo-300"
                                                                    : "bg-red-900 text-red-300"
                                                    }`}
                                            >
                                                {lead.status || "new"}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3">
                                            {lead.assignedTo?.name || "-"}
                                        </td>
                                        <td className="px-4 py-3 flex flex-wrap gap-2">
                                            <button
                                                onClick={() =>
                                                    setModal({ type: "status", lead })
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                                            >
                                                Status
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setModal({ type: "assign", lead })
                                                }
                                                className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                                            >
                                                Assign
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setModal({ type: "view", lead })
                                                }
                                                className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                                            >
                                                View
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setModal({ type: "delete", lead })
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

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-4 gap-2 sm:gap-0 text-sm">
                            <button
                                disabled={page === 1}
                                onClick={() => setPage((p) => p - 1)}
                                className="px-3 py-1 border border-gray-700 rounded disabled:opacity-50"
                            >
                                Prev
                            </button>

                            <span className="text-gray-400">
                                Page {page} of {totalPages}
                            </span>

                            <button
                                disabled={page === totalPages}
                                onClick={() => setPage((p) => p + 1)}
                                className="px-3 py-1 border border-gray-700 rounded disabled:opacity-50"
                            >
                                Next
                            </button>
                        </div>
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

                                        {employees.map((emp) => (
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
                                {modal.type === "view" && modal?.lead && (
                                    <div className="bg-gray-900 w-full  max-w-3xl rounded-lg shadow-lg border border-gray-700">

                                        {/* Header */}
                                        <div className="flex justify-between items-center px-5 py-4 border-b border-gray-700">
                                            <h2 className="text-lg font-semibold text-white">Lead Details</h2>
                                        </div>

                                        {/* Body */}
                                        <div className="p-5 space-y-4 text-sm text-gray-300">

                                            <div className="grid grid-cols-2 gap-4">

                                                <div>
                                                    <p className="text-gray-500">Name</p>
                                                    <p className="text-white font-medium">{modal.lead.name}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Phone</p>
                                                    <p className="text-white">{modal.lead.phone}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Email</p>
                                                    <p className="text-white break-words">
                                                        {modal.lead.email || "-"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Purpose</p>
                                                    <p className="text-white">{modal.lead.purpose || "-"}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Source</p>
                                                    <p className="text-white">{modal.lead.source || "-"}</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Assigned To</p>
                                                    <p className="text-white">
                                                        {modal.lead.assignedTo?.name || "-"}
                                                    </p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Status</p>
                                                    <span
                                                        className={`inline-block mt-1 px-2 py-1 rounded text-xs font-medium ${modal.lead.status === "new"
                                                            ? "bg-blue-900 text-blue-300"
                                                            : modal.lead.status === "contacted"
                                                                ? "bg-yellow-900 text-yellow-300"
                                                                : modal.lead.status === "qualified"
                                                                    ? "bg-purple-900 text-purple-300"
                                                                    : modal.lead.status === "assigned"
                                                                        ? "bg-indigo-900 text-indigo-300"
                                                                        : modal.lead.status === "closed"
                                                                            ? "bg-green-900 text-green-300"
                                                                            : "bg-red-900 text-red-300"
                                                            }`}
                                                    >
                                                        {modal.lead.status}
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Created At</p>
                                                    <p className="text-white">
                                                        {new Date(modal.lead.createdAt).toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <div>
                                                <p className="text-gray-500">Message</p>
                                                <p className="text-white mt-1">
                                                    {modal.lead.message || "No message provided"}
                                                </p>
                                            </div>

                                            {/* Notes */}
                                            {/**<div>
                                                    <p className="text-gray-500 mb-2">Notes</p>


                                                    {modal.lead.notes ? (
                                                        <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                                                            <div
                                                                className="bg-gray-800 p-3 rounded border border-gray-700"
                                                            >
                                                                <p className="text-white text-sm">{modal.lead.notes?.text}</p>
                                                                <p className="text-xs text-gray-400 mt-1">
                                                                    {modal.lead.notes?.addedBy?.name || "System"} •{" "}
                                                                    {new Date(modal.lead.notes?.createdAt).toLocaleString()}
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

export default AdminLeadManagement;