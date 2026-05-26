import { useEffect, useMemo, useState } from "react";
import styles from "./App.module.css";
import { fetchBooks, createBook, deleteBook, fetchMembers, fetchLoans } from "./services/api";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [loanFilterStatus, setLoanFilterStatus] = useState("All");
  const [totalBooks, setTotalBooks] = useState(0);
  const dateLabel = useMemo(() => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good morning";
    if (hours < 18) return "Good afternoon";
    return "Good evening";
  }, []);
  const stats = useMemo(
    () => [
      {
        label: "Total Books",
        value: totalBooks.toLocaleString(),
        trend: "+12%",
        icon: "library_books",
        tone: "emerald",
      },
      {
        label: "Currently Borrowed",
        value: loans.filter(l => l.status === "Borrowed" || l.status === "Overdue").length.toString(),
        icon: "swap_horiz",
        tone: "indigo",
      },
      {
        label: "Overdue Returns",
        value: loans.filter(l => l.status === "Overdue").length.toString(),
        icon: "event_busy",
        tone: "rose",
      },
      {
        label: "Active Members",
        value: members.length.toString(),
        icon: "group",
        tone: "sky",
      },
    ],
    [totalBooks, loans, members]
  );

  const acquisitions = useMemo(() => {
    let filtered = books;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title?.toLowerCase().includes(q) ||
          b.author?.toLowerCase().includes(q)
      );
    }
    return filtered.map((book) => ({
      ...book,
      status: "Available",
      cover: book.coverImage || "https://placehold.co/400x600?text=No+Cover",
    }));
  }, [books, searchQuery]);

  const handleAddBook = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    
    // Prevent sending empty file which causes Cloudinary to throw a 500 error
    const file = formData.get("coverImage");
    if (file && file.size === 0) {
      formData.delete("coverImage");
    }

    try {
      setIsSubmitting(true);
      await createBook(formData);
      setModalOpen(false);
      await loadData();
    } catch (error) {
      console.error(error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      setLoading(true);
      await deleteBook(id);
      await loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to delete book");
    } finally {
      setLoading(false);
    }
  };

  const loadData = async () => {
    try {
      setError("");
      const [booksPayload, membersData, loansData] = await Promise.all([
        fetchBooks({ page: 1, limit: 12 }),
        fetchMembers(),
        fetchLoans(),
      ]);
      const data = booksPayload.data || booksPayload;
      setBooks(data);
      setTotalBooks(booksPayload.pagination?.total ?? data.length);
      setMembers(membersData);
      setLoans(loansData);
    } catch (err) {
      setError("Failed to load dashboard data. Please try again.");
    }
  };

  useEffect(() => {
    let isMounted = true;
    
    const initData = async () => {
      setLoading(true);
      await loadData();
      if (isMounted) setLoading(false);
    };
    
    initData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}>
            <span className="material-symbols-outlined">auto_stories</span>
          </div>
          <div>
            <p className={styles.brandTitle}>LibroKeep</p>
            <p className={styles.brandSubtitle}>Management System</p>
          </div>
        </div>

        <nav className={styles.nav}>
          <button className={`${styles.navItem} ${styles.navItemActive}`}>
            <span className="material-symbols-outlined">dashboard</span>
            Dashboard
          </button>
        </nav>

        <div className={styles.profileCard}>
          <div className={styles.profileInfo}>
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFpMGOYk8cJs7dhW7oh6in2uFHbHIDeSTac_RJlZ3TfdkEDczcmzL6D6nvCY1qwXxXRs8mSoY87DMVv47OKh-vjA1E-UdfeOR32ZBP7l28awfs8NmX-Of74x-uyiSh3mw2cIbYCNwkgJJ-f0klJqf_3EIChMIAwqAK5GiT9cXeOzHzhM8k_uPxDxnSCKllEQQ2m2sf8aoigZmY55pLHkqPdNm9wyfu5-OHW0Vfmfa-1n_zDTDXPDUUKByDTNer_F4xmKdLl8R6JcdA"
              alt="Alex Rivera"
            />
            <div>
              <p className={styles.profileName}>Alex Rivera</p>
              <p className={styles.profileRole}>Librarian</p>
            </div>
          </div>
          <button className={styles.profileLogout} title="Logout" type="button">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </aside>

      <div className={styles.content}>
        <header className={styles.topbar}>
          <div className={styles.searchWrap}>
            <span className={`material-symbols-outlined ${styles.searchIcon}`}>
              search
            </span>
            <input
              type="text"
              placeholder="Search by title, author, or ISBN..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className={styles.searchShortcut}>Ctrl K</span>
          </div>
          <div className={styles.topActions}>
            <button
              className={styles.primaryButton}
              type="button"
              onClick={() => setModalOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              Add New Book
            </button>
          </div>
        </header>

        <main className={styles.main}>
          <section className={styles.welcome}>
            <h1>
              {dateLabel}, Alex
            </h1>
            <p>Here's what's happening in your library today.</p>
          </section>

          <section className={styles.statsGrid}>
            {stats.map((card) => (
              <article
                key={card.label}
                className={`${styles.statCard} ${styles[`tone${card.tone}`]}`}
              >
                <div className={styles.statHeader}>
                  <p>{card.label}</p>
                  <span className={styles.statIcon}>
                    <span className="material-symbols-outlined">
                      {card.icon}
                    </span>
                  </span>
                </div>
                <div className={styles.statValue}>
                  <strong>{card.value}</strong>
                  {card.trend && (
                    <span className={styles.statTrend}>
                      <span className="material-symbols-outlined">trending_up</span>
                      {card.trend}
                    </span>
                  )}
                </div>
              </article>
            ))}
          </section>

          <section className={styles.dashboardGrid}>
            <div className={styles.acquisitions}>
              <div className={styles.sectionHeader}>
                <h2>Recent Acquisitions</h2>
              </div>
              <div className={styles.bookGrid}>
                {loading && (
                  <p className={styles.statusMessage}>Loading books...</p>
                )}
                {!loading && error && (
                  <p className={styles.statusMessage}>{error}</p>
                )}
                {!loading && !error && acquisitions.length === 0 && (
                  <p className={styles.statusMessage}>No books yet.</p>
                )}
                {!loading &&
                  !error &&
                  acquisitions.map((book) => (
                    <article key={book._id} className={styles.bookCard}>
                      <div className={styles.bookCover}>
                        <img src={book.cover} alt={`${book.title} cover`} />
                      </div>
                      <div className={styles.bookMeta}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                          <div>
                            <h3>{book.title}</h3>
                            <p>{book.author}</p>
                          </div>
                          <button 
                            className={styles.ghostButton} 
                            onClick={() => handleDeleteBook(book._id)}
                            style={{ color: 'var(--color-rose-600)', padding: '4px' }}
                            title="Delete Book"
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>delete</span>
                          </button>
                        </div>
                        <div className={styles.badgeRow}>
                          <span className={styles.badgeNeutral}>
                            {book.genre}
                          </span>
                          <span className={styles.badgeAvailable}>
                            {book.status}
                          </span>
                        </div>
                      </div>
                    </article>
                  ))}
              </div>
            </div>

            <div className={styles.loans}>
              <div className={styles.sectionHeader}>
                <h2>
                  Active Loans
                  {loanFilterStatus !== "All" && (
                    <span style={{ fontSize: "14px", marginLeft: "12px", color: "var(--color-slate-500)", fontWeight: "normal" }}>
                      Filtering by: {loanFilterStatus}
                    </span>
                  )}
                </h2>
                <div className={styles.sectionActions}>
                  <button 
                    className={styles.iconButton} 
                    type="button" 
                    title="Filter Status"
                    onClick={() => {
                      const statuses = ["All", "Borrowed", "Overdue", "Returned"];
                      const nextIndex = (statuses.indexOf(loanFilterStatus) + 1) % statuses.length;
                      setLoanFilterStatus(statuses[nextIndex]);
                    }}
                  >
                    <span className="material-symbols-outlined">
                      filter_list
                    </span>
                  </button>
                </div>
              </div>
              <div className={styles.tableWrap}>
                <table>
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Borrower</th>
                      <th>Due Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loans
                      .filter(loan => loanFilterStatus === "All" || loan.status === loanFilterStatus)
                      .map((loan) => (
                      <tr key={loan._id}>
                        <td>
                          <div className={styles.titleCell}>
                            <strong>{loan.book?.title || "Unknown Book"}</strong>
                            <span>{loan.book?.author || "Unknown Author"}</span>
                          </div>
                        </td>
                        <td>{loan.member?.name || "Unknown Member"}</td>
                        <td>{new Date(loan.dueDate).toLocaleDateString()}</td>
                        <td>
                          <span
                            className={
                              loan.status === "Overdue"
                                ? styles.badgeOverdue
                                : loan.status === "Borrowed"
                                  ? styles.badgeBorrowed
                                  : styles.badgeReturned
                            }
                          >
                            {loan.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <form className={styles.modalCard} onSubmit={handleAddBook}>
            <header>
              <h2>Add New Book</h2>
              <button type="button" onClick={() => setModalOpen(false)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </header>

            <div className={styles.modalBody}>
              <section>
                <h3>Book Details</h3>
                <div className={styles.formGrid}>
                  <label>
                    Title*
                    <input type="text" name="title" required placeholder="Enter full book title" />
                  </label>
                  <label>
                    Author*
                    <input type="text" name="author" required placeholder="Primary author" />
                  </label>
                  <label>
                    ISBN-13
                    <div className={styles.iconInput}>
                      <input
                        type="text"
                        name="isbn"
                        placeholder="e.g., 978-0-123456-47-2"
                      />
                      <span className="material-symbols-outlined">
                        document_scanner
                      </span>
                    </div>
                  </label>
                  <label>
                    Publication Year*
                    <input type="number" name="publicationYear" required placeholder="YYYY" />
                  </label>
                </div>
              </section>

              <section>
                <h3>Classification</h3>
                <div className={styles.formGrid}>
                  <label>
                    Genre*
                    <select name="genre" required defaultValue="">
                      <option value="" disabled>
                        Select a genre
                      </option>
                      <option value="Fiction">Fiction</option>
                      <option value="Non-fiction">Non-fiction</option>
                      <option value="Sci-Fi">Sci-Fi</option>
                      <option value="History">History</option>
                      <option value="Biography">Biography</option>
                    </select>
                  </label>
                  <label>
                    Language
                    <select name="language" defaultValue="English">
                      <option value="English">English</option>
                      <option value="Spanish">Spanish</option>
                      <option value="French">French</option>
                      <option value="German">German</option>
                    </select>
                  </label>
                </div>
              </section>

              <div className={styles.modalSplit}>
                <section>
                  <h3>Inventory Details</h3>
                  <div className={styles.formGrid}>
                    <label>
                      Copies
                      <input type="number" name="copies" min="1" defaultValue="1" />
                    </label>
                    <label>
                      Location / Shelf
                      <input type="text" name="location" placeholder="e.g., A4-Top" />
                    </label>
                  </div>
                </section>

                <section>
                  <h3>Status</h3>
                  <div className={styles.statusRow}>
                    <label>
                      <input type="radio" name="status" value="Available" defaultChecked />
                      <span>Available</span>
                    </label>
                    <label>
                      <input type="radio" name="status" value="In Processing" />
                      <span>In Processing</span>
                    </label>
                  </div>
                </section>
              </div>

              <section>
                <h3>Cover Image</h3>
                <label className={styles.uploadBox}>
                  <input type="file" name="coverImage" accept="image/*" />
                  <span className="material-symbols-outlined">cloud_upload</span>
                  <strong>Click to upload or drag and drop</strong>
                  <small>SVG, PNG, JPG or GIF (max. 800x400px)</small>
                </label>
              </section>
            </div>

            <footer>
              <button
                type="button"
                className={styles.ghostButton}
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </button>
              <button type="submit" className={styles.primaryButton} disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined" style={{ animation: "spin 1s linear infinite" }}>sync</span>
                    Uploading...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">add_circle</span>
                    Add to Collection
                  </>
                )}
              </button>
            </footer>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
