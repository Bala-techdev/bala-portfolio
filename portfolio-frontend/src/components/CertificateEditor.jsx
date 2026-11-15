import { AdminModal, MediaDropzone } from "./AdminComponents";

export default function CertificateEditor({ editing, form, onChange, onSubmit, onClose, saving, error }) {
  const setField = (name, value) => onChange({ target: { name, value } });
  return (
    <AdminModal title={editing ? "Edit certificate" : "Add certificate"} description="Store a verifiable credential with a clear, accessible presentation." onClose={onClose} busy={saving}>
      <form className="admin-project-form" onSubmit={onSubmit}>
        {error && <div className="admin-form-error">{error}</div>}
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label htmlFor="certificate-title">Certificate title *</label>
            <input id="certificate-title" name="title" value={form.title} onChange={onChange} required maxLength={150} placeholder="Java Programming" />
          </div>
          <div className="admin-form-group">
            <label htmlFor="certificate-issuer">Issuing organization *</label>
            <input id="certificate-issuer" name="issuer" value={form.issuer} onChange={onChange} required maxLength={100} placeholder="HackerRank" />
          </div>
          <div className="admin-form-group">
            <label htmlFor="certificate-date">Issue date</label>
            <input id="certificate-date" type="date" name="issueDate" value={form.issueDate || ""} onChange={onChange} />
          </div>
          <div className="admin-form-group">
            <label htmlFor="certificate-url">Credential verification URL *</label>
            <input id="certificate-url" type="url" name="url" value={form.url} onChange={onChange} required placeholder="https://..." />
          </div>
        </div>
        <MediaDropzone value={form.logoUrl} onChange={(value) => setField("logoUrl", value)} accept="image/*,application/pdf" maxSize={10 * 1024 * 1024} onError={(message) => setField("uploadError", message)} label="Certificate image or PDF" />
        {form.uploadError && <p className="admin-upload-error">{form.uploadError}</p>}
        <div className="admin-form-grid">
          <div className="admin-form-group"><label htmlFor="certificate-abbr">Short label</label><input id="certificate-abbr" name="abbr" value={form.abbr} onChange={onChange} maxLength={10} placeholder="JAVA" /></div>
          <div className="admin-form-group"><label htmlFor="certificate-order">Display order</label><input id="certificate-order" type="number" name="displayOrder" value={form.displayOrder} onChange={onChange} min="0" /></div>
        </div>
        <div className="admin-form-actions">
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update certificate" : "Create certificate"}</button>
        </div>
      </form>
    </AdminModal>
  );
}
