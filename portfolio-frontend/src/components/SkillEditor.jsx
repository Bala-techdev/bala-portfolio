import { AdminModal } from "./AdminComponents";

export default function SkillEditor({ editing, form, groups, onChange, onSubmit, onClose, saving, error }) {
  return (
    <AdminModal title={editing ? "Edit skill" : "Add skill"} description="Keep your technical profile concise and recruiter-friendly." onClose={onClose} busy={saving}>
      <form className="admin-project-form" onSubmit={onSubmit}>
        {error && <div className="admin-form-error">{error}</div>}
        <div className="admin-form-grid">
          <div className="admin-form-group">
            <label htmlFor="skill-name">Skill name *</label>
            <input id="skill-name" name="name" value={form.name} onChange={onChange} required maxLength={80} placeholder="Spring Boot" />
          </div>
          <div className="admin-form-group">
            <label htmlFor="skill-category">Category *</label>
            <select id="skill-category" name="category" value={form.category || ""} onChange={onChange} required>
              <option value="">Select category</option>
              {groups.map((group) => <option value={group.id} key={group.id}>{group.title}</option>)}
              {!groups.length && <><option value="Frontend">Frontend</option><option value="Backend">Backend</option><option value="Database">Database</option><option value="Tools">Tools</option></>}
            </select>
          </div>
          <div className="admin-form-group">
            <label htmlFor="skill-proficiency">Proficiency</label>
            <select id="skill-proficiency" name="proficiency" value={form.proficiency || ""} onChange={onChange}>
              <option value="">Select proficiency</option>
              <option>Beginner</option><option>Intermediate</option><option>Advanced</option>
            </select>
          </div>
          <div className="admin-form-group">
            <label htmlFor="skill-icon">Icon name</label>
            <input id="skill-icon" name="icon" value={form.icon} onChange={onChange} maxLength={40} placeholder="java" />
          </div>
          <div className="admin-form-group">
            <label htmlFor="skill-order">Display order</label>
            <input id="skill-order" type="number" name="displayOrder" value={form.displayOrder} onChange={onChange} min="0" />
          </div>
        </div>
        <div className="admin-form-actions">
          <button type="button" onClick={onClose} disabled={saving}>Cancel</button>
          <button type="submit" disabled={saving}>{saving ? "Saving..." : editing ? "Update skill" : "Create skill"}</button>
        </div>
      </form>
    </AdminModal>
  );
}
