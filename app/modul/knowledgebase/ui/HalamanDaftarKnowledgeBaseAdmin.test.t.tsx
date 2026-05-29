// import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import { describe, it, expect, vi, beforeEach } from "vitest";
// import { useOutletContext } from "react-router";
// import HalamanDaftarKnowledgeBaseAdmin from "./HalamanDaftarKnowledgeBaseAdmin";
// import {
//   mockKonektorBackend,
//   type MockKonektorBackend,
// } from "~test/MockBackend";

// // ─── Mocks ────────────────────────────────────────────────────────────────────

// vi.mock("react-router", () => ({
//   useOutletContext: vi.fn(),
// }));

// vi.mock("~/dasar/HalamanLoading", () => ({
//   default: () => <div data-testid="halaman-loading">Loading...</div>,
// }));

// vi.mock("./KnowledgeBaseStatusBadge", () => ({
//   default: ({ status }: { status: string }) => (
//     <span data-testid="status-badge">{status}</span>
//   ),
// }));

// vi.mock("./KnowledgeBaseDeleteConfirmation", () => ({
//   default: ({
//     dokumen,
//     isDeleting,
//     onConfirm,
//     onCancel,
//   }: {
//     dokumen: any;
//     isDeleting: boolean;
//     onConfirm: () => void;
//     onCancel: () => void;
//   }) => (
//     <div data-testid="delete-confirmation">
//       <span data-testid="delete-dokumen-judul">{dokumen.judul}</span>
//       <button
//         onClick={onConfirm}
//         disabled={isDeleting}
//         data-testid="confirm-delete"
//       >
//         {isDeleting ? "Deleting..." : "Confirm"}
//       </button>
//       <button onClick={onCancel} data-testid="cancel-delete">
//         Cancel
//       </button>
//     </div>
//   ),
// }));

// vi.mock("./KnowledgeBaseUploadFormCard", () => ({
//   default: ({
//     onClose,
//   }: {
//     onClose: (refreshRequired: boolean) => void;
//     konektorBackend: any;
//     setMasterError: any;
//   }) => (
//     <div data-testid="upload-form">
//       <button
//         onClick={() => onClose(false)}
//         data-testid="close-form-no-refresh"
//       >
//         Close (no refresh)
//       </button>
//       <button
//         onClick={() => onClose(true)}
//         data-testid="close-form-with-refresh"
//       >
//         Close (with refresh)
//       </button>
//     </div>
//   ),
// }));

// // ─── Fixtures ─────────────────────────────────────────────────────────────────

// const mockDokumenDtos = [
//   {
//     id: 1,
//     idKategori: 10,
//     judul: "Panduan Onboarding",
//     status: "processed",
//     createdAt: "2024-03-01T00:00:00Z",
//   },
//   {
//     id: 2,
//     idKategori: 20,
//     judul: "Kebijakan Keamanan",
//     status: "pending",
//     createdAt: null,
//   },
// ];

// const mockKategoriDtos = [
//   { id: 10, nama: "HR" },
//   { id: 20, nama: "IT" },
// ];

// // ─── Helper ───────────────────────────────────────────────────────────────────

// /**
//  * Buat MockKonektorBackend via `mockKonektorBackend()` dari MockBackend.ts,
//  * lalu override implementasi `get` agar sadar endpoint, dan opsional
//  * override `delete` untuk simulasi error atau pending.
//  */
// function makeBackend({
//   dokumenDtos = mockDokumenDtos,
//   kategoriDtos = mockKategoriDtos,
//   dokumenError = null as Error | null,
//   kategoriError = null as Error | null,
//   deleteImpl = undefined as (() => Promise<Response>) | undefined,
// } = {}): MockKonektorBackend {
//   const backend = mockKonektorBackend({ delete: deleteImpl });

//   backend.get.mockImplementation(async (endpoint: string) => {
//     if (endpoint === "/api/admin/knowledge-base") {
//       if (dokumenError) throw dokumenError;
//       return new Response(JSON.stringify(dokumenDtos), { status: 200 });
//     }
//     if (endpoint === "/api/admin/categories") {
//       if (kategoriError) throw kategoriError;
//       return new Response(JSON.stringify(kategoriDtos), { status: 200 });
//     }
//     throw new Error(`Unexpected GET: ${endpoint}`);
//   });

//   return backend;
// }

// /**
//  * Setup outlet context menggunakan vi.mocked() pada import top-level,
//  * bukan require() di dalam fungsi.
//  */
// function setupOutletContext(
//   backend: MockKonektorBackend,
//   setMasterError = vi.fn(),
// ) {
//   // ContextType tuple: [devMode, stateOtentikasi, konektorBackend, setMasterNotifikasi, setMasterError]
//   vi.mocked(useOutletContext).mockReturnValue([
//     false,
//     {},
//     backend,
//     vi.fn(),
//     setMasterError,
//   ]);
//   return { setMasterError };
// }

// /** Ambil semua endpoint yang sudah dipanggil di backend.get */
// function getCallEndpoints(backend: MockKonektorBackend): string[] {
//   return backend.get.mock.calls.map((c: any[]) => c[0]);
// }

// /** Hitung berapa kali backend.get dipanggil untuk endpoint tertentu */
// function countGetCalls(backend: MockKonektorBackend, endpoint: string): number {
//   return backend.get.mock.calls.filter((c: any[]) => c[0] === endpoint).length;
// }

// // ─── Tests ────────────────────────────────────────────────────────────────────

// describe("HalamanDaftarKnowledgeBaseAdmin", () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//     window.HTMLElement.prototype.scrollIntoView = vi.fn();
//   });

//   // ── 1. Loading State ─────────────────────────────────────────────────────

//   describe("Loading State", () => {
//     it("menampilkan HalamanLoading saat data masih di-fetch", () => {
//       const backend = makeBackend();
//       // Buat get tidak pernah resolve
//       backend.get.mockReturnValue(new Promise(() => {}));
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       expect(screen.getByTestId("halaman-loading")).toBeInTheDocument();
//     });

//     it("menghilangkan HalamanLoading setelah fetch selesai", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(screen.queryByTestId("halaman-loading")).not.toBeInTheDocument(),
//       );
//     });
//   });

//   // ── 2. Fetch Data ────────────────────────────────────────────────────────

//   describe("Fetch Data saat Mount", () => {
//     it("memanggil GET /api/admin/knowledge-base saat mount", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(backend.get).toHaveBeenCalledWith("/api/admin/knowledge-base"),
//       );
//     });

//     it("memanggil GET /api/admin/categories saat mount", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(backend.get).toHaveBeenCalledWith("/api/admin/categories"),
//       );
//     });

//     it("kedua endpoint dipanggil paralel (Promise.all) saat mount", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         const endpoints = getCallEndpoints(backend);
//         expect(endpoints).toContain("/api/admin/knowledge-base");
//         expect(endpoints).toContain("/api/admin/categories");
//       });
//     });

//     it("error dari getDokumens → setMasterError dipanggil", async () => {
//       const err = new Error("network error");
//       const backend = makeBackend({ dokumenError: err });
//       const { setMasterError } = setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => expect(setMasterError).toHaveBeenCalledWith(err));
//     });

//     it("error dari getDaftarKategori → setMasterError dipanggil", async () => {
//       const err = new Error("kategori error");
//       const backend = makeBackend({ kategoriError: err });
//       const { setMasterError } = setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => expect(setMasterError).toHaveBeenCalledWith(err));
//     });
//   });

//   // ── 3. Render Daftar Dokumen ─────────────────────────────────────────────

//   describe("Render Daftar Dokumen", () => {
//     it("menampilkan judul setiap dokumen", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         expect(screen.getByText("Panduan Onboarding")).toBeInTheDocument();
//         expect(screen.getByText("Kebijakan Keamanan")).toBeInTheDocument();
//       });
//     });

//     it("menampilkan nama kategori berdasarkan idKategori", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         expect(screen.getByText("HR")).toBeInTheDocument();
//         expect(screen.getByText("IT")).toBeInTheDocument();
//       });
//     });

//     it("tidak menampilkan badge kategori jika idKategori tidak ada di daftarKategori", async () => {
//       const backend = makeBackend({
//         dokumenDtos: [
//           {
//             id: 3,
//             idKategori: 999,
//             judul: "Dokumen Tanpa Kategori",
//             status: "processed",
//             createdAt: "2024-01-01T00:00:00Z",
//           },
//         ],
//       });
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(screen.getByText("Dokumen Tanpa Kategori")).toBeInTheDocument(),
//       );
//       expect(screen.queryByText("HR")).not.toBeInTheDocument();
//       expect(screen.queryByText("IT")).not.toBeInTheDocument();
//     });

//     it("menampilkan badge PDF untuk setiap dokumen", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         const pdfBadges = screen.getAllByText("PDF");
//         expect(pdfBadges).toHaveLength(mockDokumenDtos.length);
//       });
//     });

//     it("menampilkan KnowledgeBaseStatusBadge untuk setiap dokumen", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         const badges = screen.getAllByTestId("status-badge");
//         expect(badges).toHaveLength(mockDokumenDtos.length);
//       });
//     });

//     it("formatDate: createdAt null → ditampilkan '-'", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(screen.getByText(/Uploaded by Admin on -/)).toBeInTheDocument(),
//       );
//     });

//     it("formatDate: createdAt valid → ditampilkan format YYYY-MM-DD", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(
//           screen.getByText(/Uploaded by Admin on 2024-03-01/),
//         ).toBeInTheDocument(),
//       );
//     });

//     it("menampilkan footer count jumlah dokumen", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(screen.getByText(/2 documents total/)).toBeInTheDocument(),
//       );
//     });
//   });

//   // ── 4. Empty State ───────────────────────────────────────────────────────

//   describe("Empty State", () => {
//     it("menampilkan pesan 'No documents uploaded yet.' saat tidak ada dokumen", async () => {
//       const backend = makeBackend({ dokumenDtos: [] });
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(
//           screen.getByText("No documents uploaded yet."),
//         ).toBeInTheDocument(),
//       );
//     });

//     it("menampilkan pesan 'No documents match your search.' saat search tidak cocok", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Panduan Onboarding"));

//       fireEvent.change(screen.getByPlaceholderText("Search documents..."), {
//         target: { value: "xyznotfound" },
//       });

//       expect(
//         screen.getByText("No documents match your search."),
//       ).toBeInTheDocument();
//     });
//   });

//   // ── 5. Search / Filter ───────────────────────────────────────────────────

//   describe("Search / Filter", () => {
//     it("memfilter dokumen berdasarkan judul (case-insensitive)", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Panduan Onboarding"));

//       fireEvent.change(screen.getByPlaceholderText("Search documents..."), {
//         target: { value: "panduan" },
//       });

//       expect(screen.getByText("Panduan Onboarding")).toBeInTheDocument();
//       expect(screen.queryByText("Kebijakan Keamanan")).not.toBeInTheDocument();
//     });

//     it("footer count berubah sesuai hasil filter", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText(/2 documents total/));

//       fireEvent.change(screen.getByPlaceholderText("Search documents..."), {
//         target: { value: "panduan" },
//       });

//       expect(
//         screen.getByText(/1 document matching "panduan"/),
//       ).toBeInTheDocument();
//     });
//   });

//   // ── 6. Upload Form Toggle ────────────────────────────────────────────────

//   describe("Upload Form Toggle", () => {
//     it("tombol 'Upload New Document' tampil saat form belum dibuka", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() =>
//         expect(screen.getByText("Upload New Document")).toBeInTheDocument(),
//       );
//     });

//     it("klik 'Upload New Document' → upload form muncul, tombol upload hilang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Upload New Document"));
//       fireEvent.click(screen.getByText("Upload New Document"));

//       expect(screen.getByTestId("upload-form")).toBeInTheDocument();
//       expect(screen.queryByText("Upload New Document")).not.toBeInTheDocument();
//     });

//     it("handleCloseForm(false) → form ditutup, getDokumens TIDAK dipanggil ulang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Upload New Document"));
//       fireEvent.click(screen.getByText("Upload New Document"));

//       const callsBefore = countGetCalls(backend, "/api/admin/knowledge-base");

//       fireEvent.click(screen.getByTestId("close-form-no-refresh"));

//       expect(countGetCalls(backend, "/api/admin/knowledge-base")).toBe(
//         callsBefore,
//       );
//       expect(screen.queryByTestId("upload-form")).not.toBeInTheDocument();
//     });

//     it("handleCloseForm(true) → form ditutup, getDokumens dipanggil ulang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Upload New Document"));
//       fireEvent.click(screen.getByText("Upload New Document"));

//       const callsBefore = countGetCalls(backend, "/api/admin/knowledge-base");

//       fireEvent.click(screen.getByTestId("close-form-with-refresh"));

//       await waitFor(() =>
//         expect(countGetCalls(backend, "/api/admin/knowledge-base")).toBe(
//           callsBefore + 1,
//         ),
//       );
//       expect(screen.queryByTestId("upload-form")).not.toBeInTheDocument();
//     });

//     it("saat form muncul, scrollIntoView dipanggil", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => screen.getByText("Upload New Document"));
//       fireEvent.click(screen.getByText("Upload New Document"));

//       await waitFor(() =>
//         expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled(),
//       );
//     });
//   });

//   // ── 7. Delete Flow ───────────────────────────────────────────────────────

//   describe("Delete Flow", () => {
//     async function renderAndWaitLoaded(backend: MockKonektorBackend) {
//       render(<HalamanDaftarKnowledgeBaseAdmin />);
//       await waitFor(() => screen.getByText("Panduan Onboarding"));
//     }

//     it("klik Delete → delete confirmation muncul dengan dokumen yang benar", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);

//       expect(screen.getByTestId("delete-confirmation")).toBeInTheDocument();
//       expect(screen.getByTestId("delete-dokumen-judul")).toHaveTextContent(
//         "Panduan Onboarding",
//       );
//     });

//     it("klik Cancel → konfirmasi hilang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("cancel-delete"));

//       expect(
//         screen.queryByTestId("delete-confirmation"),
//       ).not.toBeInTheDocument();
//     });

//     it("klik Confirm → DELETE /api/admin/knowledge-base/:id dipanggil dengan id yang benar", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("confirm-delete"));

//       await waitFor(() =>
//         expect(backend.delete).toHaveBeenCalledWith(
//           "/api/admin/knowledge-base/1",
//         ),
//       );
//     });

//     it("setelah hapus sukses → getDokumens dipanggil ulang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       const callsBefore = countGetCalls(backend, "/api/admin/knowledge-base");

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("confirm-delete"));

//       await waitFor(() =>
//         expect(countGetCalls(backend, "/api/admin/knowledge-base")).toBe(
//           callsBefore + 1,
//         ),
//       );
//     });

//     it("setelah hapus sukses → dialog konfirmasi hilang", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("confirm-delete"));

//       await waitFor(() =>
//         expect(
//           screen.queryByTestId("delete-confirmation"),
//         ).not.toBeInTheDocument(),
//       );
//     });

//     it("error saat hapus → setMasterError dipanggil", async () => {
//       const err = new Error("delete failed");
//       const backend = makeBackend({
//         deleteImpl: () => Promise.reject(err),
//       });
//       const { setMasterError } = setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("confirm-delete"));

//       await waitFor(() => expect(setMasterError).toHaveBeenCalledWith(err));
//     });

//     it("saat menghapus (isDeleting=true), tombol confirm di-disable", async () => {
//       const backend = makeBackend({
//         // Delete tidak pernah resolve → state menghapus=true terus
//         deleteImpl: () => new Promise(() => {}),
//       });
//       setupOutletContext(backend);
//       await renderAndWaitLoaded(backend);

//       fireEvent.click(screen.getAllByText("Delete")[0]);
//       fireEvent.click(screen.getByTestId("confirm-delete"));

//       await waitFor(() =>
//         expect(screen.getByTestId("confirm-delete")).toBeDisabled(),
//       );
//     });
//   });

//   // ── 8. Edge Cases ────────────────────────────────────────────────────────

//   describe("Edge Cases", () => {
//     it("dua dokumen dengan idKategori sama → keduanya mendapat nama kategori yang benar", async () => {
//       const backend = makeBackend({
//         dokumenDtos: [
//           {
//             id: 1,
//             idKategori: 10,
//             judul: "Dok A",
//             status: "processed",
//             createdAt: null,
//           },
//           {
//             id: 2,
//             idKategori: 10,
//             judul: "Dok B",
//             status: "pending",
//             createdAt: null,
//           },
//         ],
//         kategoriDtos: [{ id: 10, nama: "HR" }],
//       });
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);

//       await waitFor(() => {
//         const hrBadges = screen.getAllByText("HR");
//         expect(hrBadges).toHaveLength(2);
//       });
//     });

//     it("search dengan karakter spesial tidak crash", async () => {
//       const backend = makeBackend();
//       setupOutletContext(backend);

//       render(<HalamanDaftarKnowledgeBaseAdmin />);
//       await waitFor(() => screen.getByText("Panduan Onboarding"));

//       expect(() => {
//         fireEvent.change(screen.getByPlaceholderText("Search documents..."), {
//           target: { value: ".*[]()+?" },
//         });
//       }).not.toThrow();
//     });
//   });
// });
