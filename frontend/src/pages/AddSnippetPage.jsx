import Editor from "@monaco-editor/react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import languages from "../assets/assets/languages";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import axiosInstance from "../utility/axios";
import { useTheme } from "../context/ThemeContext";

const AddSnippetPage = () => {
  const { accessToken } = useContext(AppContext);
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [snippetData, setSnippetData] = useState({
    title: "", description: "", code: "", language: "javascript", tags: [], difficulty: "intermediate",
  });

  const quillRef = useRef(null);
  const editorRef = useRef(null);

  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, { theme: "snow", placeholder: "Write description..." });
      quillRef.current.on("text-change", () => {
        setSnippetData((prev) => ({ ...prev, description: quillRef.current.root.innerHTML }));
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!snippetData.title.trim()) { toast.error("Title is required"); return; }
    if (!snippetData.code.trim()) { toast.error("Code is required"); return; }
    try {
      setLoading(true);
      const { data } = await axiosInstance.post("/snippet", { ...snippetData, title: snippetData.title.trim(), code: snippetData.code.trim() });
      if (data.success) { toast.success("Snippet saved"); setTimeout(() => navigate("/code-snippets"), 500); }
    } catch (error) { toast.error(error.response?.data?.message || "Failed to save"); }
    finally { setLoading(false); }
  };

  return (
    <div className="page-container">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>Add Snippet</h1>
          <button className="btn-secondary" onClick={() => navigate("/code-snippets")}><ArrowLeft size={16} /> Back</button>
        </div>
        <form className="card p-6 sm:p-8 flex flex-col gap-6" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="form-label">Title <span style={{ color: "var(--danger)" }}>*</span></label>
            <input type="text" required value={snippetData.title}
              onChange={(e) => setSnippetData((p) => ({ ...p, title: e.target.value }))} placeholder="e.g. Merge Sort" className="input-field" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">Description</label>
            <div ref={editorRef} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="form-label">Language <span style={{ color: "var(--danger)" }}>*</span></label>
              <select required value={snippetData.language}
                onChange={(e) => setSnippetData((p) => ({ ...p, language: e.target.value }))} className="select-field">
                <option value="">Select</option>
                {languages.map((lang) => <option key={lang} value={lang}>{lang.charAt(0).toUpperCase() + lang.slice(1)}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label className="form-label">Difficulty</label>
              <select value={snippetData.difficulty}
                onChange={(e) => setSnippetData((p) => ({ ...p, difficulty: e.target.value }))} className="select-field">
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">Tags <span style={{ color: "var(--text-muted)" }}>(comma-separated)</span></label>
            <input type="text" placeholder="e.g. algorithm, array" value={snippetData.tags.join(", ")}
              onChange={(e) => setSnippetData((p) => ({ ...p, tags: e.target.value.split(",").map((t) => t.trim()).filter(Boolean) }))} className="input-field" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="form-label">Code <span style={{ color: "var(--danger)" }}>*</span></label>
            <div className="rounded-lg overflow-hidden" style={{ border: "1px solid var(--border-color)" }}>
              <Editor height="300px" language={snippetData.language || "javascript"} defaultValue="// Enter your code here"
                value={snippetData.code} onChange={(v) => setSnippetData((p) => ({ ...p, code: v || "" }))}
                theme={theme === "dark" ? "vs-dark" : "light"} options={{ minimap: { enabled: false }, fontSize: 14, lineNumbers: "on", wordWrap: "on" }} />
            </div>
          </div>
          <div className="flex gap-3">
            <button type="submit" disabled={loading} className="btn-primary py-2.5">
              <Save size={16} /> {loading ? "Saving..." : "Save Snippet"}
            </button>
            <button type="button" onClick={() => navigate("/code-snippets")} className="btn-secondary py-2.5">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSnippetPage;
