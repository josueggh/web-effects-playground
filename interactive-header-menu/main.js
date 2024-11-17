document.addEventListener('DOMContentLoaded', () => {
  // State management with a single object
  const state = {
    isMenuActive: false,
    isSearchActive: false,
    isResultsVisible: false
  };

  // Cache DOM elements
  const elements = {
    searchIcon: document.querySelector('.search-icon'),
    closeIcon: document.querySelector('.close-icon'),
    searchInput: document.querySelector('.search-input'),
    searchWrapper: document.querySelector('.search-wrapper'),
    navLinks: document.querySelector('.nav-links'),
    logo: document.querySelector('.logo'),
    menuButton: document.querySelector('.menu-button'),
    navContent: document.querySelector('.nav-content'),
    overlay: document.querySelector('.overlay'),
    results: document.querySelector('.results')
  };

  // Utility function for batch class toggling
  const updateElements = (updates) => {
    updates.forEach(({ element, className, force }) => {
      element.classList[force ? 'add' : 'remove'](className);
    });
  };

  // Menu handlers
  const toggleMenu = () => {
    state.isMenuActive = !state.isMenuActive;
    const { navContent, overlay, searchIcon } = elements;

    updateElements([
      { element: navContent, className: 'active', force: state.isMenuActive },
      { element: overlay, className: 'active', force: state.isMenuActive },
      { element: searchIcon, className: 'hidden', force: state.isMenuActive }
    ]);
  };

  const closeMenu = () => {
    state.isMenuActive = false;
    const { navContent, overlay, searchIcon } = elements;

    updateElements([
      { element: navContent, className: 'active', force: false },
      { element: overlay, className: 'active', force: false },
      { element: searchIcon, className: 'hidden', force: false }
    ]);
  };

  // Search handlers
  const openSearch = () => {
    state.isSearchActive = true;
    const {
      searchInput, searchWrapper, navLinks, logo,
      menuButton, overlay, searchIcon, closeIcon
    } = elements;

    updateElements([
      { element: searchWrapper, className: 'active', force: true },
      { element: searchInput, className: 'active', force: true },
      { element: navLinks, className: 'hidden', force: true },
      { element: logo, className: 'hidden', force: true },
      { element: menuButton, className: 'hidden', force: true },
      { element: overlay, className: 'active', force: true },
      { element: searchIcon, className: 'hidden', force: true },
      { element: closeIcon, className: 'hidden', force: false }
    ]);

    setTimeout(() => searchInput.focus(), 300);
  };

  const closeSearch = () => {
    state.isSearchActive = false;
    const {
      searchInput, searchWrapper, navLinks, logo,
      menuButton, overlay, searchIcon, closeIcon, results
    } = elements;

    updateElements([
      { element: searchInput, className: 'active', force: false },
      { element: searchWrapper, className: 'active', force: false },
      { element: navLinks, className: 'hidden', force: false },
      { element: logo, className: 'hidden', force: false },
      { element: menuButton, className: 'hidden', force: false },
      { element: overlay, className: 'active', force: false },
      { element: searchIcon, className: 'hidden', force: false },
      { element: closeIcon, className: 'hidden', force: true },
      { element: results, className: 'visible', force: false }
    ]);

    searchInput.value = '';
  };

  // Search results handler
  const handleSearchInput = (e) => {
    const { results } = elements;
    const hasValue = e.target.value.trim().length > 0;

    state.isResultsVisible = hasValue;
    updateElements([
      { element: results, className: 'visible', force: hasValue }
    ]);
  };

  // Add debounce utility for search input
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Outside click handler
  const handleOutsideClick = (e) => {
    if (
      !e.target.closest('.search-container') &&
      !e.target.closest('.search-icon-wrapper') &&
      !e.target.closest('.menu-button') &&
      !e.target.closest('.nav-content') &&
      !state.isMenuActive
    ) {
      closeSearch();
    }
  };

  // Event listeners
  elements.menuButton.addEventListener('click', toggleMenu);
  elements.overlay.addEventListener('click', closeMenu);
  elements.searchIcon.addEventListener('click', openSearch);
  elements.closeIcon.addEventListener('click', closeSearch);
  elements.searchInput.addEventListener('input', debounce(handleSearchInput, 100));
  document.addEventListener('click', handleOutsideClick);
});
