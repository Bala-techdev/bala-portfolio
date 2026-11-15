import { useMemo, useRef, useState } from "react";
import {
  FiAlertCircle,
  FiBold,
  FiCheck,
  FiFile,
  FiItalic,
  FiLink,
  FiList,
  FiLoader,
  FiTrash2,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { apiUrl } from "../api/api";
import { ACCENT_OPTIONS, ICON_OPTIONS } from "./adminOptions";
import "./AdminComponents.css";

export function AdminModal({ title, description, children, onClose, busy, wide = false }) {
  return (
    <div className="admin-modal-overlay" role="presentation">
      <div className={`admin-modal ${wide ? "admin-modal-wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="admin-modal-title">
        <div className="admin-modal-header">
          <div>
            <h3 id="admin-modal-title">{title}</h3>
            {description && <p>{description}</p>}
          </div>
          <button type="button" className="admin-modal-close" onClick={onClose} disabled={busy} aria-label="Close dialog">
            <FiX aria-hidden="true" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function ConfirmModal({ title, message, confirmLabel = "Delete", onConfirm, onClose, busy = false }) {
  return (
    <AdminModal title={title} description={message} onClose={onClose} busy={busy}>
      <div className="admin-confirm-actions">
        <button type="button" onClick={onClose} disabled={busy}>Cancel</button>
        <button type="button" className="admin-danger-button" onClick={onConfirm} disabled={busy}>
          {busy ? "Deleting..." : confirmLabel}
        </button>
      </div>
    </AdminModal>
  );
}

export function Toast({ toast, onClose }) {
  if (!toast) return null;
  return (
    <div className={`admin-toast admin-toast-${toast.type}`} role="status">
      {toast.type === "error" ? <FiAlertCircle aria-hidden="true" /> : <FiCheck aria-hidden="true" />}
      <span>{toast.message}</span>
      <button type="button" onClick={onClose} aria-label="Dismiss notification"><FiX aria-hidden="true" /></button>
    </div>
  );
}

export function StatCard({ label, value, icon, onClick }) {
  const content = (
    <>
      <span className="admin-stat-icon">{icon}</span>
      <span className="admin-stat-label">{label}</span>
      <strong>{value}</strong>
      {onClick && <span className="admin-stat-link">Manage {label.toLowerCase()} →</span>}
    </>
  );
  return onClick ? (
    <button type="button" className="admin-card admin-card-button" onClick={onClick}>{content}</button>
  ) : (
    <div className="admin-card">{content}</div>
  );
}

export function SectionHeader({ eyebrow, title, description, action }) {
  return (
    <div className="admin-section-header">
      <div>
        {eyebrow && <span className="admin-eyebrow">{eyebrow}</span>}
        <h3>{title}</h3>
        {description && <p>{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, description, action }) {
  return (
    <div className="admin-empty-state">
      <span className="admin-empty-icon">∅</span>
      <strong>{title}</strong>
      <p>{description}</p>
      {action}
    </div>
  );
}

export function LoadingState({ label = "Loading content..." }) {
  return <div className="admin-loading-state"><FiLoader className="admin-spin" aria-hidden="true" />{label}</div>;
}

export function IconPicker({ value, onChange }) {
  const [query, setQuery] = useState("");
  const options = useMemo(
    () => ICON_OPTIONS.filter(([name]) => name.includes(query.trim().toLowerCase())),
    [query]
  );
  return (
    <div className="admin-picker">
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search icons..." aria-label="Search icons" />
      <div className="admin-icon-picker-grid">
        {options.map(([name, glyph]) => (
          <button type="button" key={name} className={value === name ? "is-selected" : ""} onClick={() => onChange(name)} aria-label={`Use ${name} icon`}>
            <span>{glyph}</span><small>{name}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

export function AccentPicker({ value, onChange }) {
  return (
    <div className="admin-accent-picker">
      {ACCENT_OPTIONS.map((accent) => (
        <button type="button" key={accent} style={{ background: accent }} className={value === accent ? "is-selected" : ""} onClick={() => onChange(accent)} aria-label="Select accent">
          {value === accent && <FiCheck aria-hidden="true" />}
        </button>
      ))}
    </div>
  );
}

function uploadFile(file, onProgress) {
  return new Promise((resolve, reject) => {
    const token = localStorage.getItem("admin_token");
    if (!token) {
      reject(new Error("Your admin session has expired."));
      return;
    }
    const request = new XMLHttpRequest();
    request.open("POST", apiUrl("/api/v1/admin/project-images"));
    request.timeout = 60000;
    request.setRequestHeader("Authorization", `Bearer ${token}`);
    request.upload.onprogress = (event) => {
      if (event.lengthComputable) onProgress(Math.round((event.loaded / event.total) * 100));
    };
    request.onload = () => {
      let data;
      try { data = JSON.parse(request.responseText || "{}"); } catch { reject(new Error("Invalid upload response.")); return; }
      if (request.status === 401 || request.status === 403) {
        reject(new Error("Your admin session has expired."));
      } else if (request.status < 200 || request.status >= 300 || !data.imageUrl) {
        reject(new Error(data.detail || "Unable to upload file."));
      } else {
        resolve(data.imageUrl);
      }
    };
    request.onerror = () => reject(new Error("Unable to reach the upload service."));
    request.ontimeout = () => reject(new Error("Upload timed out."));
    const body = new FormData();
    body.append("file", file);
    request.send(body);
  });
}

export function MediaDropzone({ value, onChange, accept = "image/*", maxSize = 5 * 1024 * 1024, label = "Upload media", onError }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file) => {
    if (!file) return;
    if (!accept.split(",").some((type) => type.trim() === file.type || (type.trim().endsWith("/*") && file.type.startsWith(type.trim().slice(0, -1))))) {
      onError("This file type is not supported.");
      return;
    }
    if (file.size > maxSize) {
      onError(`Files must be ${Math.round(maxSize / 1024 / 1024)} MB or smaller.`);
      return;
    }
    setUploading(true);
    setProgress(0);
    onError("");
    try {
      const url = await uploadFile(file, setProgress);
      onChange(url);
      setProgress(100);
    } catch (error) {
      onError(error.message || "Unable to upload file.");
    } finally {
      setUploading(false);
    }
  };

  const isPdf = typeof value === "string" && value.toLowerCase().includes(".pdf");
  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <div className={`admin-dropzone ${dragging ? "is-dragging" : ""}`} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); handleFile(event.dataTransfer.files[0]); }}>
        <FiUploadCloud aria-hidden="true" />
        <strong>{uploading ? `Uploading... ${progress}%` : "Drop a file here"}</strong>
        <span>or choose a file from your device</span>
        {uploading && <progress className="admin-upload-progress" value={progress} max="100" aria-label="Upload progress" />}
        <button type="button" className="admin-upload-button" onClick={() => inputRef.current?.click()} disabled={uploading}>Choose file</button>
        <input ref={inputRef} type="file" accept={accept} hidden onChange={(event) => handleFile(event.target.files[0])} />
      </div>
      {value && (
        <div className="admin-media-preview">
          {isPdf ? <FiFile aria-hidden="true" /> : <img src={value} alt="Uploaded media preview" />}
          <span>{isPdf ? "Uploaded PDF certificate" : "Uploaded image"}</span>
          <button type="button" onClick={() => onChange("")} aria-label="Remove uploaded media"><FiTrash2 aria-hidden="true" /></button>
        </div>
      )}
    </div>
  );
}

export function RichTextEditor({ value, onChange }) {
  const editorRef = useRef(null);
  const command = (name, argument = null) => {
    editorRef.current?.focus();
    document.execCommand(name, false, argument);
    onChange({ target: { name: "content", value: editorRef.current?.innerHTML || "" } });
  };
  return (
    <div className="admin-rich-editor">
      <div className="admin-rich-toolbar" role="toolbar" aria-label="Formatting">
        <button type="button" onClick={() => command("bold")} aria-label="Bold"><FiBold /></button>
        <button type="button" onClick={() => command("italic")} aria-label="Italic"><FiItalic /></button>
        <button type="button" onClick={() => command("insertUnorderedList")} aria-label="Bulleted list"><FiList /></button>
        <button type="button" onClick={() => { const url = window.prompt("Enter URL"); if (url) command("createLink", url); }} aria-label="Insert link"><FiLink /></button>
      </div>
      <div ref={editorRef} className="admin-rich-content" contentEditable suppressContentEditableWarning onInput={(event) => onChange({ target: { name: "content", value: event.currentTarget.innerHTML } })} dangerouslySetInnerHTML={{ __html: value }} />
    </div>
  );
}
