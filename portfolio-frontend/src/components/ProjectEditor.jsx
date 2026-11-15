import { useMemo, useRef, useState } from "react";
import {
  FiActivity,
  FiBriefcase,
  FiCheck,
  FiCode,
  FiCpu,
  FiDatabase,
  FiEdit3,
  FiGlobe,
  FiHeart,
  FiLayers,
  FiPlus,
  FiSearch,
  FiServer,
  FiShield,
  FiTerminal,
  FiTrash2,
  FiUploadCloud,
  FiX,
  FiZap,
} from "react-icons/fi";
import { apiUrl } from "../api/api";
import ProjectCard from "./ProjectCard";

const ICONS = [
  ["code", FiCode],
  ["heart", FiHeart],
  ["shield", FiShield],
  ["edit", FiEdit3],
  ["layers", FiLayers],
  ["database", FiDatabase],
  ["globe", FiGlobe],
  ["cpu", FiCpu],
  ["terminal", FiTerminal],
  ["briefcase", FiBriefcase],
  ["zap", FiZap],
  ["server", FiServer],
  ["activity", FiActivity],
];

const ACCENTS = [
  "linear-gradient(135deg, #4c6fff 0%, #22308f 100%)",
  "linear-gradient(135deg, #e5484d 0%, #a51111 100%)",
  "linear-gradient(135deg, #14b8a6 0%, #115e59 100%)",
  "linear-gradient(135deg, #a855f7 0%, #581c87 100%)",
  "linear-gradient(135deg, #f59e0b 0%, #92400e 100%)",
  "linear-gradient(135deg, #171b26 0%, #0b0d14 100%)",
];

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

function isHttpsUrl(value) {
  try {
    return !value || new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function TagInput({ label, values, placeholder, onChange }) {
  const [draft, setDraft] = useState("");

  const addTag = () => {
    const value = draft.trim();
    if (!value || values.includes(value)) return;
    onChange([...values, value]);
    setDraft("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addTag();
    }
    if (event.key === "Backspace" && !draft && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  };

  return (
    <div className="admin-form-group">
      <label>{label}</label>
      <div className="admin-tag-input">
        {values.map((value) => (
          <span className="admin-chip" key={value}>
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              <FiX aria-hidden="true" />
            </button>
          </span>
        ))}
        <input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={onKeyDown}
          onBlur={addTag}
          placeholder={placeholder}
        />
        <button type="button" className="admin-chip-add" onClick={addTag}>
          <FiPlus aria-hidden="true" />
          Add
        </button>
      </div>
      <small>Press Enter to add a chip.</small>
    </div>
  );
}

function ImageUploader({
  images,
  onChange,
  error,
  onError,
  onUnauthorized,
}) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadFile = (file, index, total) =>
    new Promise((resolve, reject) => {
      const token = localStorage.getItem("admin_token");
      if (!token) {
        reject(new Error("Your admin session has expired."));
        return;
      }

      const request = new XMLHttpRequest();
      request.open("POST", apiUrl("/api/v1/admin/project-images"));
      request.timeout = 60000;
      request.setRequestHeader("Authorization", `Bearer ${token}`);
      request.upload.addEventListener("progress", (event) => {
        if (!event.lengthComputable) return;
        const completed = index / total;
        const current = (event.loaded / event.total) / total;
        setUploadProgress(Math.round((completed + current) * 100));
      });
      request.addEventListener("load", () => {
        let data;
        try {
          data = JSON.parse(request.responseText || "{}");
        } catch {
          reject(new Error("The image upload service returned invalid data."));
          return;
        }
        if (request.status === 401 || request.status === 403) {
          onUnauthorized?.();
          reject(new Error("Your admin session has expired."));
          return;
        }
        if (request.status < 200 || request.status >= 300 || !data.imageUrl) {
          reject(new Error(data.detail || "Unable to upload project image."));
          return;
        }
        setUploadProgress(Math.round(((index + 1) / total) * 100));
        resolve(data.imageUrl);
      });
      request.addEventListener("error", () =>
        reject(new Error("Unable to reach the image upload service."))
      );
      request.addEventListener("timeout", () =>
        reject(new Error("Image upload timed out."))
      );

      const body = new FormData();
      body.append("file", file);
      request.send(body);
    });

  const uploadFiles = async (files) => {
    const selected = Array.from(files);
    if (selected.length === 0) return;
    const invalid = selected.find(
      (file) =>
        !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_FILE_SIZE
    );

    if (invalid) {
      onError(
        "Use JPG, PNG, WEBP or GIF images up to 5 MB each."
      );
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    onError("");

    try {
      const uploaded = [];
      for (let index = 0; index < selected.length; index += 1) {
        uploaded.push(await uploadFile(selected[index], index, selected.length));
      }

      onChange([...images, ...uploaded]);
    } catch (uploadError) {
      console.error("Project image upload failed:", uploadError);
      onError(uploadError.message || "Unable to upload project image.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="admin-form-group">
      <label>Images</label>
      <div
        className={`admin-dropzone ${dragging ? "is-dragging" : ""}`}
        onDragOver={(event) => {
          event.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setDragging(false);
          uploadFiles(event.dataTransfer.files);
        }}
      >
        <FiUploadCloud aria-hidden="true" />
        <strong>
          {uploading
            ? `Uploading images... ${uploadProgress}%`
            : "Drop images here"}
        </strong>
        <span>or choose files from your device</span>
        {uploading && (
          <progress
            className="admin-upload-progress"
            value={uploadProgress}
            max="100"
            aria-label="Image upload progress"
          />
        )}
        <button
          type="button"
          className="admin-upload-button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
        >
          Choose images
        </button>
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          multiple
          hidden
          onChange={(event) => uploadFiles(event.target.files)}
        />
      </div>

      {error && <p className="admin-upload-error">{error}</p>}

      {images.length > 0 && (
        <div className="admin-image-grid">
          {images.map((image) => (
            <div className="admin-image-preview" key={image}>
              <img src={image} alt="Project preview" />
              <button
                type="button"
                aria-label="Remove project image"
                onClick={() => onChange(images.filter((item) => item !== image))}
              >
                <FiTrash2 aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}
      <small>Images are uploaded to Cloudinary before the project is saved.</small>
    </div>
  );
}

export default function ProjectEditor({
  editingProject,
  projectForm,
  onChange,
  onSubmit,
  onClose,
  saving,
  error,
  onUnauthorized,
}) {
  const [iconSearch, setIconSearch] = useState("");
  const [uploadError, setUploadError] = useState("");
  const [urlError, setUrlError] = useState("");

  const filteredIcons = useMemo(
    () =>
      ICONS.filter(([name]) =>
        name.includes(iconSearch.trim().toLowerCase())
      ),
    [iconSearch]
  );

  const setField = (name, value) => onChange({ target: { name, value } });

  const submit = (event) => {
    const invalidUrl = [projectForm.liveUrl, projectForm.githubUrl].some(
      (value) => !isHttpsUrl(value)
    );
    if (invalidUrl) {
      event.preventDefault();
      setUrlError("Use valid HTTPS URLs for project links.");
      return;
    }
    setUrlError("");
    onSubmit(event);
  };

  const previewProject = {
    ...projectForm,
    id: editingProject?.id ?? "project-preview",
    title: projectForm.title || "Project name",
    summary: projectForm.summary || "Project description preview",
    accent:
      projectForm.accent ||
      "linear-gradient(135deg, #64748b 0%, #1e293b 100%)",
    icon: projectForm.icon || "code",
    category: projectForm.category || "Project",
  };

  return (
    <div className="admin-modal-overlay">
      <div className="admin-modal admin-project-editor-modal">
        <div className="admin-modal-header">
          <div>
            <h3>{editingProject ? "Edit Project" : "Add Project"}</h3>
            <p>Manage project content and preview it before saving.</p>
          </div>
          <button
            type="button"
            className="admin-modal-close"
            onClick={onClose}
            disabled={saving}
          >
            ×
          </button>
        </div>

        <form className="admin-project-form" onSubmit={submit}>
          {(error || urlError) && (
            <div className="admin-form-error">{error || urlError}</div>
          )}

          <div className="admin-editor-layout">
            <div>
              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>Project Name *</label>
                  <input
                    name="title"
                    value={projectForm.title}
                    onChange={onChange}
                    required
                    maxLength={150}
                    placeholder="Project name"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Category *</label>
                  <input
                    name="category"
                    value={projectForm.category}
                    onChange={onChange}
                    required
                    maxLength={50}
                    placeholder="Full Stack"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description *</label>
                <textarea
                  name="summary"
                  value={projectForm.summary}
                  onChange={onChange}
                  required
                  maxLength={500}
                  rows={4}
                  placeholder="Describe the project..."
                />
              </div>

              <div className="admin-form-group">
                <label>Project Status</label>
                <select
                  name="status"
                  value={projectForm.status}
                  onChange={onChange}
                >
                  <option value="In development">In development</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <TagInput
                label="Features"
                values={projectForm.features}
                onChange={(value) => setField("features", value)}
                placeholder="Add a feature"
              />
              <TagInput
                label="Technologies"
                values={projectForm.tech}
                onChange={(value) => setField("tech", value)}
                placeholder="Add a technology"
              />

              <ImageUploader
                images={projectForm.images}
                onChange={(value) => setField("images", value)}
                error={uploadError}
                onError={setUploadError}
                onUnauthorized={onUnauthorized}
              />

              <div className="admin-form-grid">
                <div className="admin-form-group">
                  <label>GitHub URL</label>
                  <input
                    type="url"
                    name="githubUrl"
                    value={projectForm.githubUrl}
                    onChange={onChange}
                    placeholder="https://github.com/username/project"
                  />
                </div>
                <div className="admin-form-group">
                  <label>Live URL</label>
                  <input
                    type="url"
                    name="liveUrl"
                    value={projectForm.liveUrl}
                    onChange={onChange}
                    placeholder="https://example.com"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Icon</label>
                <div className="admin-icon-search">
                  <FiSearch aria-hidden="true" />
                  <input
                    value={iconSearch}
                    onChange={(event) => setIconSearch(event.target.value)}
                    placeholder="Search icons"
                  />
                </div>
                <div className="admin-icon-grid">
                  {filteredIcons.map(([name, Icon]) => (
                    <button
                      type="button"
                      key={name}
                      className={
                        projectForm.icon === name ? "is-selected" : ""
                      }
                      onClick={() => setField("icon", name)}
                    >
                      <Icon aria-hidden="true" />
                      <span>{name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="admin-form-group">
                <label>Accent</label>
                <div className="admin-accent-grid">
                  {ACCENTS.map((accent) => (
                    <button
                      type="button"
                      key={accent}
                      aria-label={`Select accent ${accent}`}
                      className={
                        projectForm.accent === accent ? "is-selected" : ""
                      }
                      style={{ background: accent }}
                      onClick={() => setField("accent", accent)}
                    >
                      {projectForm.accent === accent && (
                        <FiCheck aria-hidden="true" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <aside className="admin-live-preview">
              <h4>Live Preview</h4>
              <ProjectCard project={previewProject} />
            </aside>
          </div>

          <div className="admin-form-actions">
            <button type="button" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" disabled={saving}>
              {saving
                ? "Saving..."
                : editingProject
                ? "Update Project"
                : "Create Project"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
