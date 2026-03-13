import type { FormEvent } from 'react'
import { useEffect, useMemo, useState } from 'react'
import './App.css'

type ContentItem = {
  id: string
  name: string
  language: string
  bio: string
  version: number
}

type ContentForm = {
  name: string
  language: string
  bio: string
  version: string
}

const API_BASE = 'http://localhost:3000/api/content'

// ── Icons ────────────────────────────────────────────────────────────────────
const IconDB = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /><path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
  </svg>
)
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
)
const IconRefresh = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" />
  </svg>
)
const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
)
const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
  </svg>
)
const IconAlert = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

// ── Helpers ──────────────────────────────────────────────────────────────────
function SkeletonRows() {
  return (
    <>
      {[1, 2, 3].map((n) => (
        <div className="skeleton-row" key={n}>
          <div className="skel skel-w1" />
          <div className="skel skel-w2" />
          <div className="skel skel-w3" />
          <div className="skel skel-flex" />
        </div>
      ))}
    </>
  )
}

// ── App ───────────────────────────────────────────────────────────────────────
function App() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState<ContentForm>({
    name: '',
    language: '',
    bio: '',
    version: '1.0',
  })

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.name.localeCompare(b.name)),
    [items],
  )

  const languages = useMemo(
    () => new Set(items.map((i) => i.language)),
    [items],
  )

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage)

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * itemsPerPage
    return sortedItems.slice(firstPageIndex, firstPageIndex + itemsPerPage)
  }, [currentPage, sortedItems, itemsPerPage])

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    }
  }, [sortedItems.length, totalPages, currentPage])

  async function fetchItems() {
    setLoading(true)
    setError('')
    try {
      const response = await fetch(API_BASE)
      if (!response.ok) throw new Error('Không thể tải dữ liệu từ backend')
      const data = (await response.json()) as ContentItem[]
      setItems(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lỗi không xác định')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  function resetForm() {
    setEditingId(null)
    setForm({ name: '', language: '', bio: '', version: '1.0' })
  }

  function startEdit(item: ContentItem) {
    setEditingId(item.id)
    setForm({ name: item.name, language: item.language, bio: item.bio, version: String(item.version) })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError('')
    const payload = { name: form.name, language: form.language, bio: form.bio, version: Number(form.version) }
    try {
      const isUpdate = Boolean(editingId)
      const response = await fetch(isUpdate ? `${API_BASE}/${editingId}` : API_BASE, {
        method: isUpdate ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!response.ok) {
        const data = (await response.json()) as { message?: string }
        throw new Error(data.message || 'Không thể lưu nội dung')
      }
      await fetchItems()
      resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Lưu dữ liệu thất bại')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Bạn chắc chắn muốn xóa bản ghi này?')) return
    setError('')
    try {
      const response = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' })
      if (!response.ok) throw new Error('Không thể xóa nội dung')
      await fetchItems()
      if (editingId === id) resetForm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Xóa thất bại')
    }
  }

  const isEditing = Boolean(editingId)

  return (
    <div className="app-layout">
      {/* ── Top Navigation ── */}
      <header className="topbar">
        <a className="topbar-logo" href="#">
          <div className="logo-mark">CMS</div>
          <span className="logo-name">ContentStudio</span>
        </a>
        <div className="topbar-sep" />
        <nav className="breadcrumb">
          <span>Workspace</span>
          <span>/</span>
          <strong>Content Manager</strong>
        </nav>
        <div className="topbar-spacer" />
        <span className="topbar-badge">Microkernel + Layered</span>
      </header>

      {/* ── Main Content ── */}
      <main className="page-content">
        {/* Page header */}
        <div className="page-header panel-appear">
          <h1>Content Manager</h1>
          <p>Quản lý dữ liệu trong <code>data.json</code> — thêm, cập nhật và xóa các bản ghi.</p>
        </div>

        {/* Stats row */}
        <div className="stats-row panel-appear">
          <div className="stat-card accent">
            <span className="stat-label">Tổng bản ghi</span>
            <span className="stat-value">{items.length}</span>
            <span className="stat-sub">Lưu trữ trong data.json</span>
          </div>
          <div className="stat-card success">
            <span className="stat-label">Ngôn ngữ</span>
            <span className="stat-value">{languages.size}</span>
            <span className="stat-sub">Loại ngôn ngữ khác nhau</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Trạng thái</span>
            <span className="stat-value" style={{ fontSize: 16, paddingTop: 4 }}>
              {loading ? 'Đang tải...' : error ? 'Lỗi kết nối' : 'Hoạt động'}
            </span>
            <span className="stat-sub">Kết nối tới localhost:3000</span>
          </div>
        </div>

        {/* Workspace grid */}
        <div className="workspace-grid">
          {/* ── Form panel ── */}
          <div className="panel panel-appear">
            {isEditing && (
              <div className="edit-mode-banner">
                <IconEdit />
                Đang chỉnh sửa bản ghi
                <button className="btn btn-ghost btn-sm" onClick={resetForm} style={{ padding: '3px 10px' }}>
                  Hủy
                </button>
              </div>
            )}
            <div className="panel-header">
              <span className="panel-title">
                <IconPlus />
                {isEditing ? 'Cập nhật bản ghi' : 'Thêm bản ghi mới'}
              </span>
            </div>
            <div className="panel-body">
              {error && (
                <div className="alert alert-error">
                  <span className="alert-icon"><IconAlert /></span>
                  {error}
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label className="field-label" htmlFor="f-name">Tên <span className="required">*</span></label>
                  <input
                    id="f-name"
                    type="text"
                    placeholder="Nhập tên..."
                    value={form.name}
                    onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="f-lang">Ngôn ngữ <span className="required">*</span></label>
                  <input
                    id="f-lang"
                    type="text"
                    placeholder="vd: JavaScript, Python..."
                    value={form.language}
                    onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="f-version">Phiên bản <span className="required">*</span></label>
                  <input
                    id="f-version"
                    type="number"
                    step="0.01"
                    min="0"
                    placeholder="1.0"
                    value={form.version}
                    onChange={(e) => setForm((p) => ({ ...p, version: e.target.value }))}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field-label" htmlFor="f-bio">Mô tả <span className="required">*</span></label>
                  <textarea
                    id="f-bio"
                    rows={4}
                    placeholder="Nhập mô tả ngắn..."
                    value={form.bio}
                    onChange={(e) => setForm((p) => ({ ...p, bio: e.target.value }))}
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-full" disabled={submitting}>
                    {submitting
                      ? 'Đang lưu...'
                      : isEditing
                      ? 'Lưu thay đổi'
                      : (<><IconPlus /> Thêm bản ghi</>)}
                  </button>
                  {isEditing && (
                    <button type="button" className="btn btn-ghost" onClick={resetForm}>
                      Hủy
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* ── Table panel ── */}
          <div className="panel panel-appear">
            <div className="panel-header">
              <span className="panel-title">
                <IconDB />
                Danh sách bản ghi
                {!loading && <span className="count-badge">{sortedItems.length}</span>}
              </span>
              <button className="btn btn-ghost btn-sm" onClick={fetchItems} disabled={loading}>
                <IconRefresh /> Làm mới
              </button>
            </div>

            <div className="table-scroll">
              {loading ? (
                <SkeletonRows />
              ) : sortedItems.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <p>Chưa có bản ghi nào. Thêm bản ghi đầu tiên!</p>
                </div>
              ) : (
                <>
                  <table className="content-table">
                    <thead>
                      <tr>
                        <th>Tên</th>
                        <th>Ngôn ngữ</th>
                        <th>Version</th>
                        <th style={{ width: '40%' }}>Mô tả</th>
                        <th style={{ textAlign: 'center' }}>Thao tác</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentTableData.map((item) => (
                        <tr key={item.id} className={editingId === item.id ? 'is-editing' : ''}>
                          <td className="td-name"><strong>{item.name}</strong></td>
                          <td><span className="td-lang">{item.language}</span></td>
                          <td><span className="td-version">v{item.version}</span></td>
                          <td><div className="td-bio-truncated">{item.bio}</div></td>
                          <td>
                            <div className="td-actions-compact">
                              <button className="btn-icon" onClick={() => startEdit(item)} title="Sửa">
                                <IconEdit />
                              </button>
                              <button className="btn-icon btn-danger-icon" onClick={() => handleDelete(item.id)} title="Xóa">
                                <IconTrash />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {totalPages > 1 && (
                    <div className="pagination">
                      <button
                        className="btn btn-ghost btn-sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                      >
                        ← Trước
                      </button>
                      <span className="page-info">Trang {currentPage} / {totalPages}</span>
                      <button
                        className="btn btn-ghost btn-sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                      >
                        Sau →
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
