/* =========================================================
   Popcorn Picks — script.js
   Vanilla JS only. No frameworks, no backend, no external API.
   Reads movie data from the global MOVIES array (movies.js).
   ========================================================= */

(function () {
  "use strict";

  /* ---------- STATE ---------- */
  const state = {
    activeGenre: "All",
    searchTerm: "",
    favorites: loadFavorites(),
    lastOpenedGenre: null,
    lastOpenedId: null
  };

  /* ---------- DOM REFERENCES ---------- */
  const els = {
    navbar: document.getElementById("navbar"),
    navLinks: document.getElementById("navLinks"),
    hamburger: document.getElementById("hamburger"),
    themeToggle: document.getElementById("themeToggle"),

    heroBackdrop: document.getElementById("heroBackdrop"),
    heroEyebrow: document.getElementById("heroEyebrow"),
    heroTitle: document.getElementById("heroTitle"),
    heroMeta: document.getElementById("heroMeta"),
    heroDesc: document.getElementById("heroDesc"),
    heroDetailsBtn: document.getElementById("heroDetailsBtn"),

    searchInput: document.getElementById("searchInput"),
    searchClear: document.getElementById("searchClear"),
    genreFilter: document.getElementById("genreFilter"),

    movieGrid: document.getElementById("movieGrid"),
    resultsCount: document.getElementById("resultsCount"),
    emptyState: document.getElementById("emptyState"),

    recommendSection: document.getElementById("recommendSection"),
    recommendRow: document.getElementById("recommendRow"),
    recommendHeading: document.getElementById("recommendHeading"),

    favoritesGrid: document.getElementById("favoritesGrid"),
    favEmptyState: document.getElementById("favEmptyState"),
    favCount: document.getElementById("favCount"),

    modalOverlay: document.getElementById("modalOverlay"),
    modal: document.getElementById("modal"),
    modalClose: document.getElementById("modalClose"),
    modalPoster: document.getElementById("modalPoster"),
    modalGenre: document.getElementById("modalGenre"),
    modalTitle: document.getElementById("modalTitle"),
    modalRating: document.getElementById("modalRating"),
    modalYear: document.getElementById("modalYear"),
    modalDuration: document.getElementById("modalDuration"),
    modalDirector: document.getElementById("modalDirector"),
    modalCast: document.getElementById("modalCast"),
    modalDescription: document.getElementById("modalDescription"),
    modalFavBtn: document.getElementById("modalFavBtn"),
    modalFavLabel: document.getElementById("modalFavLabel"),
    modalTrailerBtn: document.getElementById("modalTrailerBtn"),

    toast: document.getElementById("toast"),
    yearSpan: document.getElementById("year")
  };

  /* =========================================================
     LOCAL STORAGE HELPERS
     ========================================================= */
  function loadFavorites() {
    try {
      const raw = localStorage.getItem("popcornpicks_favorites");
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites() {
    localStorage.setItem("popcornpicks_favorites", JSON.stringify(state.favorites));
  }

  function isFavorite(id) {
    return state.favorites.includes(id);
  }

  function toggleFavorite(id) {
    if (isFavorite(id)) {
      state.favorites = state.favorites.filter((f) => f !== id);
      showToast("Removed from Favorites");
    } else {
      state.favorites.push(id);
      showToast("Added to Favorites");
    }
    saveFavorites();
    updateFavCount();
    renderFavorites();
    // Refresh any visible fav buttons across the page
    document.querySelectorAll(`[data-fav-id="${id}"]`).forEach((btn) => {
      btn.classList.toggle("is-active", isFavorite(id));
    });
  }

  /* ---------- THEME ---------- */
  function loadTheme() {
    const saved = localStorage.getItem("popcornpicks_theme");
    if (saved === "light") {
      document.body.classList.add("light-mode");
    }
  }

  function toggleTheme() {
    document.body.classList.toggle("light-mode");
    const mode = document.body.classList.contains("light-mode") ? "light" : "dark";
    localStorage.setItem("popcornpicks_theme", mode);
  }

  /* =========================================================
     RENDER HELPERS
     ========================================================= */

  // Build the small meta row used on each card (year • genre • dot)
  function starIconSVG() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l2.9 6.9 7.1.6-5.5 4.9 1.8 7-6.3-3.9L5.7 21.4l1.8-7L2 9.5l7.1-.6L12 2z"/></svg>';
  }

  function heartIconSVG() {
    return '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-10-9.4C.4 7.3 2.5 3.8 6.2 3.4c2.2-.2 4.1 1 5.8 3 1.7-2 3.6-3.2 5.8-3 3.7.4 5.8 3.9 4.2 7.7-2.5 4.8-10 9.4-10 9.4z" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';
  }

  /**
   * Creates a single movie card DOM element.
   * @param {Object} movie
   * @returns {HTMLElement}
   */
  function createMovieCard(movie) {
    const card = document.createElement("article");
    card.className = "movie-card";
    card.setAttribute("data-id", movie.id);
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `View details for ${movie.title}`);

    const favActive = isFavorite(movie.id) ? "is-active" : "";

    card.innerHTML = `
      <div class="movie-card__poster-wrap">
        <img class="movie-card__poster" src="${movie.poster}" alt="${movie.title} poster" loading="lazy" />
        <div class="movie-card__gradient"></div>
        <span class="movie-card__rating">${starIconSVG()}${movie.rating.toFixed(1)}</span>
        <button class="fav-btn ${favActive}" data-fav-id="${movie.id}" aria-label="Toggle favorite for ${movie.title}" type="button">
          ${heartIconSVG()}
        </button>
      </div>
      <div class="movie-card__body">
        <h3 class="movie-card__title">${movie.title}</h3>
        <p class="movie-card__sub">
          <span>${movie.year}</span><span class="dot">&bull;</span>
          <span class="movie-card__genre-tag">${movie.genre}</span>
        </p>
      </div>
    `;

    // Open modal when the card itself is clicked (but not the heart button)
    card.addEventListener("click", (e) => {
      if (e.target.closest(".fav-btn")) return;
      openModal(movie.id);
    });
    card.addEventListener("keydown", (e) => {
      if ((e.key === "Enter" || e.key === " ") && !e.target.closest(".fav-btn")) {
        e.preventDefault();
        openModal(movie.id);
      }
    });

    // Favorite button
    const favBtn = card.querySelector(".fav-btn");
    favBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleFavorite(movie.id);
      favBtn.classList.add("pop");
      setTimeout(() => favBtn.classList.remove("pop"), 400);
    });

    return card;
  }

  /**
   * Filters MOVIES based on current search term + genre, returns array.
   */
  function getFilteredMovies() {
    const term = state.searchTerm.trim().toLowerCase();
    return MOVIES.filter((movie) => {
      const matchesGenre = state.activeGenre === "All" || movie.genre === state.activeGenre;
      if (!matchesGenre) return false;
      if (!term) return true;
      const haystack = [
        movie.title,
        movie.director,
        movie.genre,
        ...(movie.cast || [])
      ].join(" ").toLowerCase();
      return haystack.includes(term);
    });
  }

  /** Renders the main movie grid based on filters/search */
  function renderMovieGrid() {
    const filtered = getFilteredMovies();
    els.movieGrid.innerHTML = "";

    if (filtered.length === 0) {
      els.emptyState.hidden = false;
    } else {
      els.emptyState.hidden = true;
      filtered.forEach((movie, i) => {
        const card = createMovieCard(movie);
        card.style.animationDelay = `${Math.min(i * 35, 400)}ms`;
        els.movieGrid.appendChild(card);
      });
    }

    els.resultsCount.textContent = `${filtered.length} title${filtered.length === 1 ? "" : "s"} found`;
  }

  /** Renders the favorites grid from localStorage-backed state */
  function renderFavorites() {
    const favMovies = MOVIES.filter((m) => isFavorite(m.id));
    els.favoritesGrid.innerHTML = "";

    if (favMovies.length === 0) {
      els.favEmptyState.hidden = false;
    } else {
      els.favEmptyState.hidden = true;
      favMovies.forEach((movie) => {
        els.favoritesGrid.appendChild(createMovieCard(movie));
      });
    }
  }

  function updateFavCount() {
    els.favCount.textContent = state.favorites.length;
  }

  /** Renders a horizontal row of recommended movies based on a genre, excluding one id */
  function renderRecommendations(genre, excludeId) {
    const pool = MOVIES.filter((m) => m.genre === genre && m.id !== excludeId);
    // Shuffle lightly using id-based offset so it feels varied but is deterministic-ish
    const picks = pool.slice(0, 6);

    if (picks.length === 0) {
      els.recommendSection.hidden = true;
      return;
    }

    els.recommendSection.hidden = false;
    els.recommendHeading.textContent = `More ${genre} Picks For You`;
    els.recommendRow.innerHTML = "";
    picks.forEach((movie) => els.recommendRow.appendChild(createMovieCard(movie)));
  }

  /* =========================================================
     HERO
     ========================================================= */
  function renderHero() {
    const featuredMovies = MOVIES.filter((m) => m.featured);
    const featured = featuredMovies[Math.floor(Math.random() * featuredMovies.length)] || MOVIES[0];

    els.heroBackdrop.style.backgroundImage = `url('${featured.poster}')`;
    els.heroTitle.textContent = featured.title;
    els.heroMeta.textContent = `${featured.year} • ${featured.genre} • ${featured.duration} • ★ ${featured.rating.toFixed(1)}`;
    els.heroDesc.textContent = featured.description;

    els.heroDetailsBtn.onclick = () => openModal(featured.id);
  }

  /* =========================================================
     MODAL
     ========================================================= */
  function openModal(id) {
    const movie = MOVIES.find((m) => m.id === id);
    if (!movie) return;

    state.lastOpenedId = movie.id;
    state.lastOpenedGenre = movie.genre;

    els.modalPoster.src = movie.poster;
    els.modalPoster.alt = `${movie.title} poster`;
    els.modalGenre.textContent = movie.genre;
    els.modalTitle.textContent = movie.title;
    els.modalRating.textContent = movie.rating.toFixed(1);
    els.modalYear.textContent = movie.year;
    els.modalDuration.textContent = movie.duration;
    els.modalDirector.textContent = movie.director;
    els.modalCast.textContent = (movie.cast || []).join(", ");
    els.modalDescription.textContent = movie.description;

    updateModalFavButton(movie.id);
    els.modalFavBtn.onclick = () => {
      toggleFavorite(movie.id);
      updateModalFavButton(movie.id);
    };

    els.modalTrailerBtn.onclick = () => {
    window.open(
        `https://www.youtube.com/watch?v=${movie.trailer}`,
        "_blank",
         "noopener,noreferrer"
    );
};

    els.modalOverlay.hidden = false;
    // Force reflow so the transition triggers
    requestAnimationFrame(() => els.modalOverlay.classList.add("is-open"));
    document.body.style.overflow = "hidden";

    renderRecommendations(movie.genre, movie.id);
    els.modalClose.focus();
  }

  function updateModalFavButton(id) {
    const active = isFavorite(id);
    els.modalFavBtn.classList.toggle("is-active", active);
    els.modalFavLabel.textContent = active ? "Remove from Favorites" : "Add to Favorites";
  }

  function closeModal() {
    els.modalOverlay.classList.remove("is-open");
    document.body.style.overflow = "";
    setTimeout(() => { els.modalOverlay.hidden = true; }, 300);
  }

  /* =========================================================
     TOAST
     ========================================================= */
  let toastTimer = null;
  function showToast(message) {
    els.toast.textContent = message;
    els.toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("is-visible"), 2200);
  }

  /* =========================================================
     EVENT WIRING
     ========================================================= */
  function initSearch() {
    els.searchInput.addEventListener("input", (e) => {
      state.searchTerm = e.target.value;
      els.searchClear.hidden = state.searchTerm.length === 0;
      renderMovieGrid();
    });
    els.searchClear.addEventListener("click", () => {
      els.searchInput.value = "";
      state.searchTerm = "";
      els.searchClear.hidden = true;
      renderMovieGrid();
      els.searchInput.focus();
    });
  }

  function initGenreFilter() {
    els.genreFilter.addEventListener("click", (e) => {
      const btn = e.target.closest(".genre-pill");
      if (!btn) return;
      state.activeGenre = btn.dataset.genre;
      document.querySelectorAll(".genre-pill").forEach((p) => p.classList.remove("is-active"));
      btn.classList.add("is-active");
      renderMovieGrid();
    });
  }

  function initModal() {
    els.modalClose.addEventListener("click", closeModal);
    els.modalOverlay.addEventListener("click", (e) => {
      if (e.target === els.modalOverlay) closeModal();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && !els.modalOverlay.hidden) closeModal();
    });
  }

  function initTheme() {
    loadTheme();
    els.themeToggle.addEventListener("click", toggleTheme);
  }

  function initNav() {
    // Scroll shadow/blur
    window.addEventListener("scroll", () => {
      els.navbar.classList.toggle("is-scrolled", window.scrollY > 20);
    }, { passive: true });

    // Mobile hamburger
    els.hamburger.addEventListener("click", () => {
      const isOpen = els.navLinks.classList.toggle("is-open");
      els.hamburger.classList.toggle("is-open", isOpen);
      els.hamburger.setAttribute("aria-expanded", isOpen);
    });

    // Active link highlighting + close mobile menu on click
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        document.querySelectorAll(".nav-link").forEach((l) => l.classList.remove("is-active"));
        link.classList.add("is-active");
        els.navLinks.classList.remove("is-open");
        els.hamburger.classList.remove("is-open");
      });
    });
  }

  /** Sets up IntersectionObserver-based fade-in for sections */
  function initScrollReveal() {
    const targets = document.querySelectorAll(".fade-in");
    if (!("IntersectionObserver" in window)) {
      targets.forEach((t) => t.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    targets.forEach((t) => observer.observe(t));
  }

  /* =========================================================
     INIT
     ========================================================= */
  function init() {
    els.yearSpan.textContent = new Date().getFullYear();

    initTheme();
    initNav();
    initSearch();
    initGenreFilter();
    initModal();
    initScrollReveal();

    renderHero();
    renderMovieGrid();
    renderFavorites();
    updateFavCount();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
