import { useState, useEffect, useCallback } from "react";

// --------------------
// Types
// --------------------
interface Employee {
    _id: string;
    name: string;
    email: string;
    phone?: string;
    sheetId?: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

interface Pagination {
    total: number;
    page: number;
    totalPages: number;
}

type ModalType = "create" | "edit" | "view" | null;

interface ModalState {
    type: ModalType;
    employee?: Employee;
}

interface FormData {
    name: string;
    email: string;
    phone: string;
    sheetId: string;
}
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_BASE = `${API_BASE_URL}/api/employees`; // adjust to your actual base URL

const defaultForm: FormData = { name: "", email: "", phone: "", sheetId: "" };

// --------------------
// API helpers
// --------------------
async function apiFetch(url: string, options?: RequestInit) {
    const res = await fetch(url, {
        headers: { "Content-Type": "application/json" },
        ...options,
    });
    const data = await res.json();
    console.log("data2 ", data)
    if (!data.success) {
        console.log("error", data)
        throw new Error(data.message || "Request failed");
    }
    return data;
}

// --------------------
// Sub-components
// --------------------
function StatusBadge({ isActive }: { isActive: boolean }) {
    return (
        <span
            className={`px-2 py-1 rounded text-xs font-medium ${isActive
                ? "bg-green-900 text-green-300"
                : "bg-red-900 text-red-300"
                }`}
        >
            {isActive ? "Active" : "Inactive"}
        </span>
    );
}

function Modal({
    modal,
    onClose,
    onSubmit,
    onToggle,
    loading,
}: {
    modal: ModalState;
    onClose: () => void;
    onSubmit: (form: FormData) => void;
    onToggle: (employee: Employee) => void;
    loading: boolean;
}) {
    const isEdit = modal.type === "edit";
    const isCreate = modal.type === "create";
    const isView = modal.type === "view";

    const [form, setForm] = useState<FormData>(
        modal.employee
            ? {
                name: modal.employee.name,
                email: modal.employee.email,
                phone: modal.employee.phone || "",
                sheetId: modal.employee.sheetId || "",
            }
            : defaultForm
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleBackdropClick}
        >
            <div className="bg-gray-800 border border-gray-700 rounded-lg w-full max-w-md shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-700">
                    <h2 className="text-lg font-bold text-white">
                        {isCreate && "Add Employee"}
                        {isEdit && "Edit Employee"}
                        {isView && "Employee Details"}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white text-xl leading-none transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Body */}
                <div className="p-5">
                    {isView && modal.employee ? (
                        <div className="space-y-3 text-sm">
                            <div className="space-y-3">
                                <div className="space-y-3 text-white">
                                    <div>
                                        <span className="text-gray-400 inline-block w-[90px]">Name:</span>
                                        <span>{modal.employee.name}</span>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 inline-block w-[90px]">Email:</span>
                                        <span className="break-all">{modal.employee.email}</span>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 inline-block w-[90px]">Phone:</span>
                                        <span>{modal.employee.phone || "-"}</span>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 inline-block w-full">Sheet ID:</span>
                                        <span className="break-all">{modal.employee.sheetId || "-"}</span>
                                    </div>

                                    <div>
                                        <span className="text-gray-400 inline-block w-[90px]">Created:</span>
                                        <span>
                                            {new Date(modal.employee.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="text-gray-400 w-[90px]">Status</span>
                                <StatusBadge isActive={modal.employee.isActive} />
                            </div>

                            {/* Toggle from view */}
                            <div className="pt-3 border-t border-gray-700">
                                <button
                                    onClick={() => onToggle(modal.employee!)}
                                    disabled={loading}
                                    className={`w-full py-2 rounded text-sm font-semibold transition-colors ${modal.employee.isActive
                                        ? "bg-red-700 hover:bg-red-600"
                                        : "bg-green-700 hover:bg-green-600"
                                        } disabled:opacity-50`}
                                >
                                    {loading
                                        ? "Updating…"
                                        : modal.employee.isActive
                                            ? "Deactivate Employee"
                                            : "Activate Employee"}
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {(
                                [
                                    { name: "name", label: "Name *", placeholder: "Full name" },
                                    {
                                        name: "email",
                                        label: isCreate ? "Email *" : "Email",
                                        placeholder: "email@example.com",
                                        type: "email",
                                    },
                                    {
                                        name: "phone",
                                        label: "Phone",
                                        placeholder: "+91 9876543210",
                                        type: "tel",
                                    },
                                    {
                                        name: "sheetId",
                                        label: "Sheet Url",
                                        placeholder: "Google Sheet Url",
                                    },
                                ] as {
                                    name: keyof FormData;
                                    label: string;
                                    placeholder: string;
                                    type?: string;
                                }[]
                            ).map(({ name, label, placeholder, type = "text" }) => (
                                <div key={name}>
                                    <label className="block text-xs text-gray-400 mb-1">
                                        {label}
                                    </label>
                                    <input
                                        name={name}
                                        type={type}
                                        value={form[name]}
                                        onChange={handleChange}
                                        placeholder={placeholder}
                                        className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {!isView && (
                    <div className="flex justify-end gap-2 p-5 border-t border-gray-700">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded text-sm transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSubmit(form)}
                            disabled={loading}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-semibold transition-colors disabled:opacity-50"
                        >
                            {loading ? "Saving…" : isCreate ? "Create" : "Save Changes"}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

// --------------------
// Main Component
// --------------------
export default function EmployeeManagement() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [pagination, setPagination] = useState<Pagination>({
        total: 0,
        page: 1,
        totalPages: 1,
    });
    const [loading, setLoading] = useState(false);
    const [actionLoading, setActionLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [page, setPage] = useState(1);
    const [modal, setModal] = useState<ModalState>({ type: null });
    const [toast, setToast] = useState<{
        msg: string;
        ok: boolean;
    } | null>(null);

    const showToast = (msg: string, ok = true) => {
        setToast({ msg, ok });
        setTimeout(() => setToast(null), 3000);
    };

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: String(page),
                limit: "10",
                ...(search && { search }),
                ...(statusFilter !== "all" && { isActive: statusFilter }),
            });
            const data = await apiFetch(`${API_BASE}?${params}`);
            console.log("data", data)
            setEmployees(data.data);
            setPagination(data.pagination);
        } catch (err: unknown) {
            showToast((err as Error).message || "Failed to fetch employees", false);
        } finally {
            setLoading(false);
        }
    }, [page, search, statusFilter]);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    // debounce search
    useEffect(() => {
        const t = setTimeout(() => {
            setPage(1);
        }, 400);
        return () => clearTimeout(t);
    }, [search]);

    const handleCreate = async (form: FormData) => {
        setActionLoading(true);
        try {
            await apiFetch(API_BASE, {
                method: "POST",
                body: JSON.stringify(form),
            });
            showToast("Employee created successfully");
            setModal({ type: null });
            fetchEmployees();
        } catch (err: unknown) {
            showToast((err as Error).message, false);
        } finally {
            setActionLoading(false);
        }
    };

    const handleEdit = async (form: FormData) => {
        if (!modal.employee) return;
        setActionLoading(true);
        try {
            await apiFetch(`${API_BASE}/${modal.employee._id}`, {
                method: "PUT",
                body: JSON.stringify(form),
            });
            showToast("Employee updated");
            setModal({ type: null });
            fetchEmployees();
        } catch (err: unknown) {
            showToast((err as Error).message, false);
        } finally {
            setActionLoading(false);
        }
    };

    const handleToggle = async (employee: Employee) => {
        setActionLoading(true);
        try {
            await apiFetch(`${API_BASE}/${employee._id}/toggle-status`, {
                method: "PATCH",
            });
            showToast(
                `Employee ${employee.isActive ? "deactivated" : "activated"}`
            );
            setModal({ type: null });
            fetchEmployees();
        } catch (err: unknown) {
            showToast((err as Error).message, false);
        } finally {
            setActionLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this employee?")) return;
        setActionLoading(true);
        try {
            await apiFetch(`${API_BASE}/${id}`, { method: "DELETE" });
            showToast("Employee deleted");
            fetchEmployees();
        } catch (err: unknown) {
            showToast((err as Error).message, false);
        } finally {
            setActionLoading(false);
        }
    };

    const modalSubmit = modal.type === "create" ? handleCreate : handleEdit;

    return (
        <div className="h-screen bg-gray-900 text-white font-raleway flex flex-col">
            {/* Toast */}
            {toast && (
                <div
                    className={`fixed top-4 right-4 z-[100] px-4 py-3 rounded shadow-lg text-sm font-medium transition-all ${toast.ok
                        ? "bg-green-800 text-green-100 border border-green-700"
                        : "bg-red-800 text-red-100 border border-red-700"
                        }`}
                >
                    {toast.ok ? "✓" : "✕"} {toast.msg}
                </div>
            )}

            {/* Header */}
            <div className="sticky top-0 z-20 bg-gray-900 p-4 sm:p-6 border-b border-gray-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl sm:text-3xl font-bold">Employee Management</h1>

                <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto flex-wrap">
                    <input
                        placeholder="Search name, email or phone"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="bg-gray-800 border border-gray-700 px-3 py-2 text-sm rounded w-full sm:w-48 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </select>
                    <button
                        onClick={fetchEmployees}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-colors"
                    >
                        🔄 Refresh
                    </button>
                    <button
                        onClick={() => setModal({ type: "create" })}
                        className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-sm font-semibold transition-colors"
                    >
                        + Add Employee
                    </button>
                </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
                {loading ? (
                    <p className="text-gray-400 text-center mt-10">Loading…</p>
                ) : employees.length === 0 ? (
                    <p className="text-gray-400 text-center mt-10">No employees found.</p>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto border border-gray-700 text-sm">
                            <thead className="bg-gray-800 sticky top-0">
                                <tr>
                                    {[
                                        "Name",
                                        "Phone",
                                        "Sheet Url",
                                        "Status",
                                        "Created",
                                        "Actions",
                                    ].map((h) => (
                                        <th key={h} className="px-4 py-3 text-left whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr
                                        key={emp._id}
                                        className="even:bg-gray-900 hover:bg-gray-800 transition-colors"
                                    >
                                        <td className="px-4 py-3 font-medium">{emp.name}
                                            <p className="text-gray-300">
                                                {emp.email}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3 text-gray-300">
                                            {emp.phone || "-"}
                                        </td>
                                        <td className="px-4 py-3 text-gray-300 font-mono text-xs line-clamp-2">
                                            {emp.sheetId
                                                ? emp.sheetId.length > 40
                                                    ? `${emp.sheetId.slice(0, 40)}...`
                                                    : emp.sheetId
                                                : "-"}
                                        </td>
                                        <td className="px-4 py-3">
                                            <StatusBadge isActive={emp.isActive} />
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-xs whitespace-nowrap">
                                            {new Date(emp.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex flex-wrap gap-2">
                                                <button
                                                    onClick={() => setModal({ type: "view", employee: emp })}
                                                    className="bg-purple-600 hover:bg-purple-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => setModal({ type: "edit", employee: emp })}
                                                    className="bg-indigo-600 hover:bg-indigo-700 px-2 py-1 rounded text-xs font-semibold transition-colors"
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleToggle(emp)}
                                                    disabled={actionLoading}
                                                    className={`px-2 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-50 ${emp.isActive
                                                        ? "bg-yellow-700 hover:bg-yellow-600"
                                                        : "bg-green-700 hover:bg-green-600"
                                                        }`}
                                                >
                                                    {emp.isActive ? "Deactivate" : "Activate"}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(emp._id)}
                                                    disabled={actionLoading}
                                                    className="bg-red-600 hover:bg-red-700 px-2 py-1 rounded text-xs font-semibold transition-colors disabled:opacity-50"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="sticky bottom-0 bg-gray-900 border-t border-gray-700 px-4 sm:px-6 py-3 flex items-center justify-between text-sm">
                <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page <= 1 || loading}
                    className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded disabled:opacity-40 transition-colors"
                >
                    Prev
                </button>
                <span className="text-gray-400">
                    Page {pagination.page} of {pagination.totalPages}&nbsp;
                    <span className="text-gray-500">
                        ({pagination.total} total)
                    </span>
                </span>
                <button
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                    disabled={page >= pagination.totalPages || loading}
                    className="px-4 py-1.5 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded disabled:opacity-40 transition-colors"
                >
                    Next
                </button>
            </div>

            {/* Modal */}
            {modal.type && (
                <Modal
                    modal={modal}
                    onClose={() => setModal({ type: null })}
                    onSubmit={modalSubmit}
                    onToggle={handleToggle}
                    loading={actionLoading}
                />
            )}
        </div>
    );
}