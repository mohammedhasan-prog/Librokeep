import { useEffect, useState } from "react";
import styles from "./BookDetails.module.css";
import { fetchBookById, updateBook } from "./services/api";

export default function BookDetails({ bookId, onBack }) {
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleUpdateBook = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const file = formData.get("coverImage");
    if (file && file.size === 0) {
      formData.delete("coverImage");
    }

    try {
      setIsSubmitting(true);
      const updated = await updateBook(bookId, formData);
      setBook(updated);
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      alert(`Error: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <button className={styles.secondaryButton} onClick={() => setIsEditing(true)}>
              <span className="material-symbols-outlined">edit</span>
              Edit Details
            </button>
          </div>
        </div>
      </div>

      {isEditing && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '1rem' }}>
          <form 
            onSubmit={handleUpdateBook}
            style={{ backgroundColor: 'white', borderRadius: '12px', padding: '2rem', width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Edit Book Details</h2>
              <button type="button" onClick={() => setIsEditing(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Title*</label>
                <input type="text" name="title" required defaultValue={book.title} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Author*</label>
                <input type="text" name="author" required defaultValue={book.author} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Publication Year*</label>
                <input type="number" name="publicationYear" required defaultValue={book.publicationYear} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Genre*</label>
                <select name="genre" required defaultValue={book.genre} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-fiction">Non-fiction</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="History">History</option>
                  <option value="Biography">Biography</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Status</label>
                <select name="status" defaultValue={book.status || "Available"} style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }}>
                  <option value="Available">Available</option>
                  <option value="In Processing">In Processing</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label style={{ fontSize: '0.875rem', fontWeight: 500 }}>Update Cover Image (Optional)</label>
                <input type="file" name="coverImage" accept="image/*" style={{ padding: '0.75rem', border: '1px solid #e2e8f0', borderRadius: '6px' }} />
              </div>
            </div>

            <footer style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" onClick={() => setIsEditing(false)} style={{ padding: '0.75rem 1.5rem', border: 'none', background: 'transparent', cursor: 'pointer', fontWeight: 500 }}>
                Cancel
              </button>
              <button type="submit" disabled={isSubmitting} style={{ padding: '0.75rem 1.5rem', border: 'none', backgroundColor: '#3b82f6', color: 'white', borderRadius: '6px', cursor: 'pointer', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {isSubmitting ? 'Saving...' : 'Save Changes'}
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}
