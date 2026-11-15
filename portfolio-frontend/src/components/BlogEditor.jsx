import { useState } from "react";
import {
  AccentPicker,
  AdminModal,
  IconPicker,
  MediaDropzone,
  RichTextEditor,
} from "./AdminComponents";
import { slugify } from "./adminOptions";

export default function BlogEditor({ editing, form, onChange, onSubmit, onClose, saving, error }) {
  const [slugTouched, setSlugTouched] = useState(Boolean(form.slug));
  const setField = (name, value) => onChange({ target: { name, value } });
  const changeTitle = (event) => {
    const title = event.target.value;
    setField("title", title);
    if (!slugTouched) setField("slug", slugify(title));
  };
  return (
    <AdminModal title={editing ? "Edit publication" : "Create publication"} description="Write, style and preview your publication before publishing." onClose={onClose} busy={saving} wide>
      <form className="admin-project-form" onSubmit={onSubmit}>
        {error && <div className="admin-form-error">{error}</div>}
        <div className="admin-editor-layout">
          <div>
            <div className="admin-form-grid">
              <div className="admin-form-group">
                <label htmlFor="blog-title">Title *</label>
                <input id="blog-title" name="title" value={form.title} onChange={changeTitle} required maxLength={200} placeholder="Publication title" />
              </div>
              <div className="admin-form-group">
                <label htmlFor="blog-slug">Slug</label>
                <input id="blog-slug" name="slug" value={form.slug} onChange={(event) => { setSlugTouched(true); onChange(event); }} maxLength={160} placeholder="publication-slug" />
              </div>
            </div>
            <div className="admin-form-group">
              <label htmlFor="blog-excerpt">Excerpt *</label>
              <textarea id="blog-excerpt" name="excerpt" value={form.excerpt} onChange={onChange} required maxLength={500} rows={3} placeholder="A short summary for recruiters and readers..." />
            </div>
            <div className="admin-form-group">
              <label>Content *</label>
              <RichTextEditor value={form.content} onChange={onChange} />
              <small>Use the toolbar for bold, italic, links and lists.</small>
            </div>
            <MediaDropzone value={form.coverUrl} onChange={(value) => setField("coverUrl", value)} onError={(message) => setField("uploadError", message)} label="Cover image" />
            {form.uploadError && <p className="admin-upload-error">{form.uploadError}</p>}
            <div className="admin-form-group">
              <label>Icon</label>
              <IconPicker value={form.icon} onChange={(value) => setField("icon", value)} />
            </div>
            <div className="admin-form-group">
              <label>Accent</label>
              <AccentPicker value={form.accent} onChange={(value) => setField("accent", value)} />
            </div>
            <label className="admin-switch">
              <input type="checkbox" name="published" checked={form.published} onChange={onChange} />
              <span>Publish this post</span>
            </label>
          </div>
          <aside className="admin-live-preview admin-blog-preview">
            <span className="admin-eyebrow">Preview</span>
            <div className="admin-blog-cover" style={{ background: form.accent || "linear-gradient(135deg,#64748b,#1e293b)" }}>
              {form.coverUrl ? <img src={form.coverUrl} alt="" /> : <span>{form.icon || "✦"}</span>}
            </div>
            <h4>{form.title || "Publication title"}</h4>
            <p>{form.excerpt || "Your excerpt will appear here."}</p>
            <span className={`message-status ${form.published ? "read" : "unread"}`}>{form.published ? "Published" : "Draft"}</span>
          </aside>
        </div>
        <div className="admin-form-actions">
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update publication" : "Create publication"}</button>
        </div>
      </form>
    </AdminModal>
  );
}
