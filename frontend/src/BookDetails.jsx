import { useEffect, useState } from "react";
import styles from "./BookDetails.module.css";
import { fetchBookById } from "./services/api";

export default function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    const loadBook = async () => {
      try {
        setLoading(true);
        const data = await fetchBookById(bookId);
        if (isMounted) {
          setBook(data);
          setError("");
        }
      } catch (err) {
        if (isMounted) setError("Failed to load book details.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadBook();
    return () => {
      isMounted = false;
    };
  }, [bookId]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back
          </button>
        </div>
        <div className={styles.content} style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--color-slate-500)' }}>Loading book details...</p>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onBack}>
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Dashboard
          </button>
        </div>
        <div className={styles.content} style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <p style={{ color: 'var(--color-rose-600)' }}>{error || "Book not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.backButton} onClick={onBack}>
          <span className="material-symbols-outlined">arrow_back</span>
          Back to Dashboard
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.coverWrapper}>
          <img 
            src={book.coverImage || "https://placehold.co/400x600?text=No+Cover"} 
            alt={`${book.title} cover`} 
          />
        </div>

        <div className={styles.details}>
          <div className={styles.titleSection}>
            <h1>{book.title}</h1>
            <p className={styles.author}>by {book.author}</p>
          </div>

          <div className={styles.badgeRow}>
            <span className={`${styles.badge} ${styles.badgePrimary}`}>
              {book.genre}
            </span>
            <span className={`${styles.badge} ${styles.badgeSuccess}`}>
              {book.status || "Available"}
            </span>
          </div>

          <div className={styles.metaGrid}>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Publication Year</span>
              <span className={styles.metaValue}>{book.publicationYear}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Added On</span>
              <span className={styles.metaValue}>{new Date(book.createdAt).toLocaleDateString()}</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>ISBN</span>
              <span className={styles.metaValue}>N/A</span>
            </div>
            <div className={styles.metaItem}>
              <span className={styles.metaLabel}>Location</span>
              <span className={styles.metaValue}>Main Library</span>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.primaryButton}>
              <span className="material-symbols-outlined">bookmark_add</span>
              Issue Loan
            </button>
            <button className={styles.secondaryButton}>
              <span className="material-symbols-outlined">edit</span>
              Edit Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
