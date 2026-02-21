import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type UpdateItem = {
  id: string;
  title: string;
  content: string;
  sortOrder: number;
  createdAt: string;
};

const IconClose = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width={24} height={24} aria-hidden>
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

interface UpdatesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UpdatesModal({ isOpen, onClose }: UpdatesModalProps) {
  const { t } = useTranslation();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    fetch("/api/updates")
      .then((res) => (res.ok ? res.json() : []))
      .then(setUpdates)
      .catch(() => setUpdates([]))
      .finally(() => setLoading(false));
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const formatDate = (s: string) => {
    try {
      return new Date(s).toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" });
    } catch {
      return "";
    }
  };

  if (!isOpen) return null;

  return (
    <div className="updates-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="updates-modal-title">
      <div className="updates-modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="updates-modal-header">
          <h2 id="updates-modal-title">{t("navupdates")}</h2>
          <button type="button" className="updates-modal-close" onClick={onClose} aria-label="Fechar">
            <IconClose />
          </button>
        </div>
        <div className="updates-modal-body">
          {loading ? (
            <p className="updates-modal-loading">Carregando…</p>
          ) : updates.length === 0 ? (
            <p className="updates-modal-empty">Nenhuma atualização no momento.</p>
          ) : (
            <ul className="updates-modal-list">
              {updates.map((u) => (
                <li key={u.id} className="updates-modal-item">
                  <div className="updates-modal-item-head">
                    <strong>{u.title}</strong>
                    <span className="updates-modal-date">{formatDate(u.createdAt)}</span>
                  </div>
                  {u.content && <p className="updates-modal-content">{u.content}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <style jsx>{`
        .updates-modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          padding: 1rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .updates-modal-box {
          background: var(--card-bg-solid);
          border: 1px solid var(--border-light);
          border-radius: 1rem;
          max-width: 520px;
          width: 100%;
          max-height: 85vh;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
          animation: slideUp 0.25s ease;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .updates-modal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.25rem 1.5rem;
          border-bottom: 1px solid var(--border-color);
          flex-shrink: 0;
        }
        .updates-modal-header h2 {
          margin: 0;
          font-size: 1.25rem;
          color: var(--secondary);
        }
        .updates-modal-close {
          background: none;
          border: none;
          color: var(--text-primary);
          cursor: pointer;
          padding: 0.25rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 0.375rem;
        }
        .updates-modal-close:hover {
          background: var(--hover-bg);
        }
        .updates-modal-body {
          padding: 1.5rem;
          overflow-y: auto;
          flex: 1;
          min-height: 0;
        }
        .updates-modal-loading,
        .updates-modal-empty {
          color: var(--text-secondary);
          margin: 0;
          text-align: center;
        }
        .updates-modal-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .updates-modal-item {
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-color);
        }
        .updates-modal-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }
        .updates-modal-item-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 0.75rem;
        }
        .updates-modal-item-head strong {
          color: var(--text-primary);
          font-size: 1rem;
        }
        .updates-modal-date {
          font-size: 0.8rem;
          color: var(--text-secondary);
          flex-shrink: 0;
        }
        .updates-modal-content {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
          white-space: pre-wrap;
          word-break: break-word;
        }
      `}</style>
    </div>
  );
}
