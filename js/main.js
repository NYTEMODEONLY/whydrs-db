// WhyDRS Landing Page JavaScript

// DOM Elements
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.querySelector('nav');
const currentYearElement = document.getElementById('current-year');
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const heroSearchForm = document.querySelector('#hero-search-form');
const heroSearchInput = document.querySelector('#hero-search');
const resultsContainer = document.querySelector('#search-results');

// Database data
let databaseData = [];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = new Date().getFullYear();
    currentYearElement.textContent = currentYear;

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close menu when clicking a link (mobile)
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                menuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Close menu when clicking outside nav
    document.addEventListener('click', function(event) {
        if (mainNav.classList.contains('active') && 
            !mainNav.contains(event.target) && 
            event.target !== menuToggle && 
            !menuToggle.contains(event.target)) {
            menuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" (no specific target)
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Get header height to use as offset
                const headerHeight = document.querySelector('header').offsetHeight;
                // Add extra padding (20px) for visual comfort
                const scrollOffset = headerHeight + 20;
                
                // Calculate the element's position and apply offset
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
                
                // Scroll to the adjusted position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Load the database
    fetchDatabase();

    // Main search form submission
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = searchInput.value.trim().toUpperCase();
            if (query) {
                searchDatabase(query);
                // Scroll to results
                resultsContainer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    // Hero search form submission
    if (heroSearchForm) {
        heroSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = heroSearchInput.value.trim().toUpperCase();
            if (query) {
                // Get the database section element
                const databaseSection = document.querySelector('#database');
                
                if (databaseSection) {
                    // Get header height to use as offset
                    const headerHeight = document.querySelector('header').offsetHeight;
                    // Add extra padding (20px) for visual comfort
                    const scrollOffset = headerHeight + 20;
                    
                    // Calculate the element's position and apply offset
                    const elementPosition = databaseSection.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
                    
                    // Scroll to the adjusted position
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                    
                    // Set the main search input value
                    searchInput.value = query;
                    
                    // Wait for scroll to complete then search
                    setTimeout(() => {
                        searchDatabase(query);
                    }, 500);
                }
            }
        });
    }

    // Initialize scroll indicator functionality
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const targetSection = document.querySelector('#how-it-works') || document.querySelector('#about');
            if (targetSection) {
                // Get header height to use as offset
                const headerHeight = document.querySelector('header').offsetHeight;
                // Add extra padding (20px) for visual comfort
                const scrollOffset = headerHeight + 20;
                
                // Calculate the element's position and apply offset
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - scrollOffset;
                
                // Scroll to the adjusted position
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    }
});

// Fetch the database
function fetchDatabase() {
    // Try multiple paths to find the database
    const paths = [
        'data/Issuers/Main_Database.json',
        './data/Issuers/Main_Database.json',
        '../data/Issuers/Main_Database.json',
        '/data/Issuers/Main_Database.json'
    ];
    
    // Try the first path
    tryFetchPath(paths, 0);
}

// Try fetching from a path, and if it fails, try the next one
function tryFetchPath(paths, index) {
    if (index >= paths.length) {
        console.error('Failed to load database from all paths');
        if (resultsContainer) {
            resultsContainer.innerHTML = '<div class="search-result"><h3>Failed to load database. Please try again later.</h3></div>';
        }
        return;
    }
    
    const path = paths[index];
    console.log(`Trying to load database from: ${path}`);
    
    fetch(path)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            databaseData = data;
            console.log(`Database loaded successfully from ${path}`);
        })
        .catch(error => {
            console.error(`Error loading database from ${path}:`, error);
            // Try the next path
            tryFetchPath(paths, index + 1);
        });
}

// Search the database
function searchDatabase(query) {
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    if (!databaseData.length) {
        resultsContainer.innerHTML = '<div class="search-result"><h3>Database not loaded yet. Please try again.</h3></div>';
        return;
    }
    
    // Filter results
    const results = databaseData.filter(item => 
        (item.Ticker && item.Ticker.toUpperCase() === query) || 
        (item.Company_Name_Issuer && item.Company_Name_Issuer.toUpperCase().includes(query))
    );
    
    if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="search-result"><h3>No results found</h3></div>';
        return;
    }
    
    // Display results
    results.forEach(company => {
        const resultHTML = `
            <div class="search-result">
                <h3>${company.Company_Name_Issuer || 'Unnamed Company'}</h3>
                
                <div class="result-section">
                    <h4>Company Information</h4>
                    <div class="result-details">
                        <div><strong>Ticker</strong> ${company.Ticker || 'N/A'}</div>
                        <div><strong>Exchange</strong> ${company.Exchange || 'N/A'}</div>
                        <div><strong>CUSIP</strong> ${company.CUSIP || 'N/A'}</div>
                        <div><strong>Shares Outstanding</strong> ${company.Shares_Outstanding || 'N/A'}</div>
                        <div><strong>CIK</strong> ${company.CIK || 'N/A'}</div>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>Direct Registration Information</h4>
                    <div class="result-details">
                        <div><strong>DRS Status</strong> ${company.DRS || 'Not Available'}</div>
                        <div><strong>Transfer Agent</strong> ${company.Transfer_Agent || 'N/A'}</div>
                        ${company.TA_URL ? `<div><strong>Transfer Agent Website</strong> <a href="${company.TA_URL}" target="_blank" rel="noopener noreferrer">Visit</a></div>` : '<div><strong>Transfer Agent Website</strong> N/A</div>'}
                        <div><strong>DTC Member Number</strong> ${company.DTC_Member_Number || 'N/A'}</div>
                        <div><strong>Percent Shares DRSd</strong> ${company.Percent_Shares_DRSd || 'N/A'}</div>
                    </div>
                </div>
                
                <div class="result-section">
                    <h4>Investor Relations</h4>
                    <div class="result-details">
                        <div><strong>IR Email</strong> ${company.IR_Emails || 'N/A'}</div>
                        <div><strong>IR Phone</strong> ${company.IR_Phone_Number || 'N/A'}</div>
                        ${company.IR_URL ? `<div><strong>IR Website</strong> <a href="${company.IR_URL}" target="_blank" rel="noopener noreferrer">Visit</a></div>` : '<div><strong>IR Website</strong> N/A</div>'}
                        <div><strong>Company Address</strong> ${company.IR_Company_Address || 'N/A'}</div>
                    </div>
                </div>
            </div>
        `;
        resultsContainer.innerHTML += resultHTML;
    });
}
