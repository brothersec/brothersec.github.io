/**
 * BEC (BROTHER’S ENGINEERING & CONSTRUCTION) — INTERACTIVE APPLICATION LOGIC
 * Manages full-service engineering & construction content rendering,
 * design-to-build workflow, process stages, portfolio filtering,
 * modal blueprint inspection, bilingual toggling, and project inquiry workflows.
 */

let currentLanguage = 'en';
let currentProjectCategory = 'ALL';
let currentModalProject = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroVideo();
  initMobileDrawer();
  
  // Dynamic Content Renderers
  renderServices();
  renderDesignToBuild();
  renderProcessStages();
  renderProjectsList();
  renderConstructionFlow();
  renderInteriorCategories();
  renderTrustPillars();

  initSmoothScroll();
});

/* ==========================================================================
   0. HERO BACKGROUND VIDEO AUTOPLAY & VIEWPORT-AWARE BATTERY/GPU SAVER
   ========================================================================== */
function initHeroVideo() {
  const heroVideo = document.getElementById('hero-bg');
  const heroSection = document.getElementById('hero');
  if (!heroVideo || heroVideo.tagName !== 'VIDEO') return;

  heroVideo.muted = true;
  heroVideo.defaultMuted = true;
  heroVideo.setAttribute('muted', '');
  heroVideo.setAttribute('playsinline', '');
  heroVideo.setAttribute('webkit-playsinline', 'true');
  heroVideo.setAttribute('x5-playsinline', 'true');

  const setPlaybackSpeed = () => {
    heroVideo.playbackRate = 0.65;
  };
  setPlaybackSpeed();
  heroVideo.addEventListener('loadedmetadata', setPlaybackSpeed, { once: true });
  heroVideo.addEventListener('play', setPlaybackSpeed);

  const attemptPlay = () => {
    heroVideo.muted = true;
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        const onUserGesture = () => {
          heroVideo.muted = true;
          heroVideo.playbackRate = 0.65;
          heroVideo.play().catch(() => {});
          ['click', 'touchstart', 'scroll', 'touchmove'].forEach(evt => {
            window.removeEventListener(evt, onUserGesture);
          });
        };
        ['click', 'touchstart', 'scroll', 'touchmove'].forEach(evt => {
          window.addEventListener(evt, onUserGesture, { passive: true, once: true });
        });
      });
    }
  };

  if (heroVideo.readyState >= 2) {
    attemptPlay();
  } else {
    heroVideo.addEventListener('canplay', attemptPlay, { once: true });
    attemptPlay();
  }

  // Viewport Observer: Pause video when scrolled out of view to free 100% GPU/CPU
  if ('IntersectionObserver' in window && heroSection) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          if (heroVideo.paused) {
            heroVideo.play().catch(() => {});
          }
        } else {
          if (!heroVideo.paused) {
            heroVideo.pause();
          }
        }
      });
    }, { threshold: 0.05 });
    videoObserver.observe(heroSection);
  }

  // Suspend when browser tab is hidden to save client resources
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      if (!heroVideo.paused) heroVideo.pause();
    } else if (heroSection && heroSection.getBoundingClientRect().bottom > 0) {
      heroVideo.play().catch(() => {});
    }
  });
}

/* ==========================================================================
   1. NAVIGATION SCROLL & HEADER TRANSITIONS (ZERO-JANK INTERSECTIONOBSERVER)
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('site-header');
  const hero = document.getElementById('hero');
  if (!header) return;

  if ('IntersectionObserver' in window && hero) {
    // Ultra-smooth zero-reflow scroll detection via compositor
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        header.classList.add('hero-transparent');
        header.classList.remove('scrolled');
      } else {
        header.classList.remove('hero-transparent');
        header.classList.add('scrolled');
      }
    }, {
      rootMargin: '-70px 0px 0px 0px',
      threshold: 0
    });
    observer.observe(hero);
  } else {
    // Throttled rAF fallback
    let ticking = false;
    let isScrolled = false;
    const update = () => {
      const scrollPos = window.scrollY || window.pageYOffset;
      const heroHeight = hero?.offsetHeight || 600;
      const shouldBeScrolled = scrollPos > heroHeight - 80;
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled;
        if (isScrolled) {
          header.classList.remove('hero-transparent');
          header.classList.add('scrolled');
        } else {
          header.classList.add('hero-transparent');
          header.classList.remove('scrolled');
        }
      }
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }, { passive: true });
    update();
  }
}

/* ==========================================================================
   2. MOBILE ARCHITECTURAL DRAWER
   ========================================================================== */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('menu-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');

  if (toggleBtn && drawer) {
    toggleBtn.addEventListener('click', () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  }

  if (closeBtn && drawer) {
    closeBtn.addEventListener('click', closeMobileDrawer);
  }
}

function closeMobileDrawer() {
  const drawer = document.getElementById('mobile-drawer');
  if (drawer) {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
}

/* ==========================================================================
   3. SERVICES SECTION RENDERING (WHAT WE DO)
   ========================================================================== */
function renderServices() {
  const container = document.getElementById('services-grid-container');
  if (!container || !BDM_DATA || !BDM_DATA.services) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.services.map((svc) => {
    const title = isEn ? svc.title : svc.bengaliTitle;
    const desc = isEn ? svc.desc : svc.bengaliDesc;
    const scope = isEn ? svc.scope : svc.bengaliScope;

    return `
      <article class="service-card" tabindex="0">
        <div>
          <div style='display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;'>
            <span class="service-num">${svc.number}</span>
            <span class="material-symbols-outlined service-icon">${svc.icon}</span>
          </div>
          <h3 class="service-title">${title}</h3>
          <p class="service-desc">${desc}</p>
        </div>
        <div class="service-scope">
          <strong>${isEn ? 'SCOPE:' : 'আওতা:'}</strong> ${scope}
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   4. DESIGN-TO-BUILD SECTION RENDERING (7-STEP JOURNEY)
   ========================================================================== */
function renderDesignToBuild() {
  const container = document.getElementById('dtb-steps-container');
  if (!container || !BDM_DATA || !BDM_DATA.designToBuildSteps) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.designToBuildSteps.map((item) => {
    return `
      <div class="dtb-flow-step">
        <div>
          <span class="dtb-step-num">${item.step}</span>
          <h4 class="dtb-step-name">${item.name}</h4>
        </div>
        <p class="dtb-step-desc">${item.desc}</p>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   5. PROCESS SECTION RENDERING (ONE TEAM. ONE PROCESS.)
   ========================================================================== */
function renderProcessStages() {
  const container = document.getElementById('process-stages-container');
  if (!container || !BDM_DATA || !BDM_DATA.processStages) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.processStages.map((stg) => {
    const title = isEn ? stg.title : stg.bengaliTitle;
    const desc = isEn ? stg.desc : stg.bengaliDesc;

    return `
      <article class="process-stage-card">
        <div>
          <span class="process-num">${stg.step}</span>
          <h3 class="process-title">${title}</h3>
        </div>
        <p class="process-desc">${desc}</p>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   6. PROJECTS SECTION & CATEGORY FILTERING
   ========================================================================== */
function filterProjectsCategory(category) {
  currentProjectCategory = category;

  // Update tabs active state
  const tabs = document.querySelectorAll('.living-tabs .living-tab-btn');
  tabs.forEach(tab => {
    if (tab.textContent.includes(category) || (category === 'ALL' && tab.textContent.includes('ALL'))) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  renderProjectsList();
}

function renderProjectsList() {
  const container = document.getElementById('projects-list-container');
  if (!container || !BDM_DATA || !BDM_DATA.projects) return;

  const isEn = currentLanguage === 'en';

  const filtered = BDM_DATA.projects.filter(p => {
    if (currentProjectCategory === 'ALL') return true;
    const catUpper = p.category.toUpperCase();
    return catUpper.includes(currentProjectCategory);
  });

  container.innerHTML = filtered.map((proj) => {
    const statusClass = proj.id === 'bdm-shopnaloy' ? 'active' : (proj.id === 'bdm-shopno-nebash' ? 'ongoing' : 'upcoming');
    const name = isEn ? proj.name : proj.bengaliName;
    const location = isEn ? proj.location : proj.bengaliLocation;
    const status = isEn ? proj.status : proj.bengaliStatus;

    return `
      <article class="project-row" onclick="openProjectModal('${proj.id}')" tabindex="0" role="button" aria-label="View ${name} details">
        <span class="project-row-num">${proj.index}</span>
        
        <div class="project-row-title-box">
          <h3 class="project-row-title">${name}</h3>
          <span class="label-caps" style='color: var(--color-champagne);'>${proj.category}</span>
        </div>

        <div class="project-row-loc">
          <span class="body-sm font-body">${location}</span>
        </div>

        <div class="project-row-specs">
          <span class="label-numeric font-body" style='font-weight: 600;'>${proj.unitSize}</span>
          <span class="label-caps" style='color: var(--color-charcoal-dim); font-size: 0.625rem;'>${proj.roadWidth}</span>
        </div>

        <div style='display: flex; justify-content: flex-end; align-items: center; gap: 0.75rem;'>
          <span class="status-badge ${statusClass}">${status}</span>
          <span class="material-symbols-outlined btn-arrow-icon" style='color: var(--color-champagne);'>arrow_forward</span>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   7. CONSTRUCTION FLOW BAR RENDERING
   ========================================================================== */
function renderConstructionFlow() {
  const container = document.getElementById('construction-flow-container');
  if (!container || !BDM_DATA || !BDM_DATA.constructionFlow) return;

  container.innerHTML = BDM_DATA.constructionFlow.map((step, idx, arr) => {
    const isLast = idx === arr.length - 1;
    return `
      <span class="construction-flow-item">
        <span>${step}</span>
        ${!isLast ? '<span class="material-symbols-outlined construction-flow-arrow">arrow_forward</span>' : ''}
      </span>
    `;
  }).join('');
}

/* ==========================================================================
   8. INTERIOR CATEGORIES RENDERING
   ========================================================================== */
function renderInteriorCategories() {
  const container = document.getElementById('interior-cat-container');
  if (!container || !BDM_DATA || !BDM_DATA.interiorCategories) return;

  container.innerHTML = BDM_DATA.interiorCategories.map((cat) => {
    return `
      <article class="interior-cat-card">
        <h3 class="interior-cat-title">${cat.title}</h3>
        <p class="interior-cat-desc">${cat.desc}</p>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   9. TRUST PILLARS RENDERING (WHY CLIENTS CHOOSE BEC)
   ========================================================================== */
function renderTrustPillars() {
  const container = document.getElementById('trust-grid-container');
  if (!container || !BDM_DATA || !BDM_DATA.whyChooseBec) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.whyChooseBec.map((pillar) => {
    const title = isEn ? pillar.title : pillar.bengaliTitle;
    const desc = isEn ? pillar.desc : pillar.bengaliDesc;

    return `
      <article class="trust-card">
        <span class="trust-card-num">${pillar.num}</span>
        <h3 class="trust-card-title">${title}</h3>
        <p class="body-sm" style='color: rgba(244,240,232,0.8); line-height: 1.65;'>${desc}</p>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   10. PROJECT DETAIL LIGHTBOX MODAL & BLUEPRINTS
   ========================================================================== */
function openProjectModal(projectId) {
  const proj = BDM_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  currentModalProject = proj;

  // Set modal headers and texts
  document.getElementById('modal-project-index').textContent = `${proj.index} · ${proj.category.toUpperCase()}`;
  document.getElementById('modal-project-title').textContent = proj.name;
  document.getElementById('modal-project-desc').textContent = proj.description;

  // Set specs grid
  const specsContainer = document.getElementById('modal-specs-grid');
  specsContainer.innerHTML = `
    <div class="spec-cell">
      <span class="spec-cell-label">LOCATION</span>
      <span class="spec-cell-val">${proj.location}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">FRONT ROAD ACCESS</span>
      <span class="spec-cell-val">${proj.roadWidth}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">BUILDING HEIGHT</span>
      <span class="spec-cell-val">${proj.floors}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">APARTMENT / UNIT SIZE</span>
      <span class="spec-cell-val" style='color: var(--color-champagne);'>${proj.unitSize}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">LAND PARCEL</span>
      <span class="spec-cell-val">${proj.landSize}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">TOTAL ALLOTMENTS</span>
      <span class="spec-cell-val">${proj.totalUnits}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">REGISTERED LAND SHARE</span>
      <span class="spec-cell-val" style='color: var(--color-champagne);'>${proj.landSharePerUnit}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">CONFIGURATION</span>
      <span class="spec-cell-val">${proj.configuration}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">CONSULTATION / BOOKING</span>
      <span class="spec-cell-val">${proj.bookingShare || 'Direct Consultation with BEC'}</span>
    </div>
  `;

  // Default to render view
  switchModalTab('render');

  // Open modal
  const modal = document.getElementById('project-modal');
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function switchModalTab(tabKey) {
  if (!currentModalProject) return;

  const renderBtn = document.getElementById('tab-btn-render');
  const planBtn = document.getElementById('tab-btn-plan');
  const twilightBtn = document.getElementById('tab-btn-twilight');
  const displayImg = document.getElementById('modal-display-img');
  const displayBadge = document.getElementById('modal-display-badge');

  [renderBtn, planBtn, twilightBtn].forEach(btn => btn?.classList.remove('active'));

  if (tabKey === 'render') {
    renderBtn?.classList.add('active');
    displayImg.src = currentModalProject.heroImage;
    displayBadge.textContent = "DAYTIME ARCHITECTURAL FACADE";
  } else if (tabKey === 'plan') {
    planBtn?.classList.add('active');
    displayImg.src = currentModalProject.floorPlanImage;
    displayBadge.textContent = (currentModalProject.planType || 'ARCHITECTURAL BLUEPRINT').toUpperCase();
  } else if (tabKey === 'twilight') {
    twilightBtn?.classList.add('active');
    displayImg.src = currentModalProject.twilightImage;
    displayBadge.textContent = "TWILIGHT PERSPECTIVE VIEW";
  }
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');
  if (modal) {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
  currentModalProject = null;
}

function closeProjectModalOnBackdrop(e) {
  if (e.target.id === 'project-modal') {
    closeProjectModal();
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeProjectModal();
    closeMobileDrawer();
  }
});

function enquireFromModal() {
  if (!currentModalProject) return;
  const projectSelect = document.getElementById('patron-service');
  if (projectSelect) {
    projectSelect.value = "Real Estate Development";
  }
  closeProjectModal();
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   11. INTERACTIVE CARTOGRAPHY (CHATTOGRAM OFFICES & SITES)
   ========================================================================== */
function selectMapLocation(locKey) {
  const tagElem = document.getElementById('loc-detail-tag');
  const titleElem = document.getElementById('loc-detail-title');
  const descElem = document.getElementById('loc-detail-desc');

  if (locKey === 'shopnaloy') {
    tagElem.textContent = "FLAGSHIP SECTOR · AGRABAD CDA";
    titleElem.textContent = "BEC SHOPNALOY (PLOT 727)";
    descElem.textContent = "Located on a 40-foot wide road in Road 14, Agrabad CDA. Active construction site featuring cast-in-situ bored piling and robust civil engineering.";
  } else if (locKey === 'nebash') {
    tagElem.textContent = "COMPANION DEVELOPMENT · AGRABAD CDA";
    titleElem.textContent = "BEC SHOPNO NEBASH (PLOT 445)";
    descElem.textContent = "Positioned on Road 11, Agrabad CDA. A tranquil 5 Katha parcel with optimal orientation and modern 4-bedroom executive residences.";
  } else if (locKey === 'hq') {
    tagElem.textContent = "CENTRAL ADMINISTRATION & PLANNING";
    titleElem.textContent = "BEC CORPORATE OFFICE";
    descElem.textContent = "Our corporate coordination and engineering office at 2813/C, Al Helal Bhaban, Eidgah, Halishahar Road, Pahartali, Chattogram.";
  }
}

/* ==========================================================================
   12. BILINGUAL SWITCHER (EN / বাংলা)
   ========================================================================== */
function setLanguage(lang) {
  currentLanguage = lang;

  const btnEn = document.getElementById('btn-lang-en');
  const btnBn = document.getElementById('btn-lang-bn');

  // Hero elements
  const heroEyebrow = document.getElementById('hero-eyebrow');
  const heroHeadline = document.getElementById('hero-headline');
  const heroStrapline = document.getElementById('hero-strapline');
  const heroSubtext = document.getElementById('hero-subtext');
  const heroExpBanner = document.getElementById('hero-exp-banner');
  const heroCtaStart = document.getElementById('hero-cta-start');
  const heroCtaServices = document.getElementById('hero-cta-services');
  const heroSupportingLine = document.getElementById('hero-supporting-line');
  const tickerLeftText = document.getElementById('ticker-left-text');
  const tickerCenterText = document.getElementById('ticker-center-text');

  // About elements
  const aboutTag = document.getElementById('about-tag');
  const aboutTitle = document.getElementById('about-title');
  const aboutLead = document.getElementById('about-lead');
  const aboutDesc1 = document.getElementById('about-desc-1');
  const aboutDesc2 = document.getElementById('about-desc-2');
  const aboutQuote = document.getElementById('about-quote');
  const aboutExpCopy = document.getElementById('about-exp-copy');
  const aboutExpSub = document.getElementById('about-exp-sub');

  // Services elements
  const servicesTag = document.getElementById('services-tag');
  const servicesTitle = document.getElementById('services-title');
  const servicesSubline = document.getElementById('services-subline');
  const servicesLead = document.getElementById('services-lead');

  // Design-to-Build elements
  const dtbTag = document.getElementById('dtb-tag');
  const dtbTitle = document.getElementById('dtb-title');
  const dtbText1 = document.getElementById('dtb-text-1');
  const dtbText2 = document.getElementById('dtb-text-2');
  const dtbText3 = document.getElementById('dtb-text-3');

  // Process elements
  const processTag = document.getElementById('process-tag');
  const processTitle = document.getElementById('process-title');
  const processSubline = document.getElementById('process-subline');

  // Construction elements
  const constructionTag = document.getElementById('construction-tag');
  const constructionTitle = document.getElementById('construction-title');
  const constructionText1 = document.getElementById('construction-text-1');
  const constructionText2 = document.getElementById('construction-text-2');

  // Interior elements
  const interiorTag = document.getElementById('interior-tag');
  const interiorTitle = document.getElementById('interior-title');
  const interiorText1 = document.getElementById('interior-text-1');
  const interiorText2 = document.getElementById('interior-text-2');

  // Trust elements
  const trustTag = document.getElementById('trust-tag');
  const trustTitle = document.getElementById('trust-title');
  const trustLead = document.getElementById('trust-lead');

  // Leadership elements
  const leadershipTag = document.getElementById('leadership-tag');
  const leadershipTitle = document.getElementById('leadership-title');
  const leadershipText1 = document.getElementById('leadership-text-1');
  const leadershipText2 = document.getElementById('leadership-text-2');
  const leadershipGoal = document.getElementById('leadership-goal');
  const btnMeetTeam = document.getElementById('btn-meet-team');

  // Contact elements
  const contactTag = document.getElementById('contact-tag');
  const contactTitle = document.getElementById('contact-title');
  const contactLead1 = document.getElementById('contact-lead-1');
  const contactLead2 = document.getElementById('contact-lead-2');
  const contactLead3 = document.getElementById('contact-lead-3');
  const formHeading = document.getElementById('form-heading');
  const formSubtext = document.getElementById('form-subtext');
  const btnSubmitText = document.getElementById('btn-submit-text');
  const finalBrandStatement = document.getElementById('final-brand-statement');

  if (lang === 'bn') {
    if (btnBn) btnBn.classList.add('active');
    if (btnEn) btnEn.classList.remove('active');

    // Hero (Bengali)
    if (heroEyebrow) heroEyebrow.textContent = "পূর্ণাঙ্গ সেবা — ইঞ্জিনিয়ারিং • কনস্ট্রাকশন • আর্কিটেকচার • ইন্টেরিয়র";
    if (heroHeadline) heroHeadline.innerHTML = "আমরা নকশা করি।<br>আমরা নির্মাণ করি।<br><span class='gold-gradient-text'>আমরা পৌঁছে দেই।</span>";
    if (heroStrapline) heroStrapline.textContent = "একটি ধারণা থেকে একটি পরিপূর্ণ স্থাপনা।";
    if (heroSubtext) heroSubtext.textContent = "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন এক ছাতার নিচে নিয়ে এসেছে প্রকৌশল, নির্মাণ, স্থাপত্য ও অভ্যন্তরীণ সজ্জা—যা ক্লায়েন্টদের ভাবনা, নকশা ও জমিকে চিন্তাশীল এবং পেশাদার বাস্তবতায় রূপ দিতে সহায়তা করে।";
    if (heroExpBanner) heroExpBanner.innerHTML = `<span class='material-symbols-outlined' style='color: var(--color-champagne); font-size: 22px;'>verified</span><div><strong>বাজারে নতুন নাম।</strong> কিন্তু নেতৃত্বের পেছনে রয়েছে ১৫+ বছরের বাস্তব নির্মাণ ও প্রকল্প অভিজ্ঞতা।</div>`;
    if (heroCtaStart) heroCtaStart.textContent = "প্রকল্প শুরু করুন";
    if (heroCtaServices) heroCtaServices.innerHTML = `<span class='material-symbols-outlined' style='font-size: 18px;'>apps</span><span>আমাদের সেবাসমূহ</span>`;
    if (heroSupportingLine) heroSupportingLine.textContent = "আবাসিক • বাণিজ্যিক • নির্মাণ • স্থাপত্য নকশা • ইন্টেরিয়র • আধুনিকায়ন";
    if (tickerLeftText) tickerLeftText.textContent = "স্থায়িত্বের জন্য প্রকৌশল। দীর্ঘায়ুর জন্য নকশা।";
    if (tickerCenterText) tickerCenterText.innerHTML = "<span>আপনার স্বপ্ন। আমাদের প্রকৌশল। একটি সম্পূর্ণ নির্মাণ।</span>";

    // About (Bengali)
    if (aboutTag) aboutTag.textContent = "বিইসি পরিচিতি ও অভিজ্ঞতা";
    if (aboutTitle) aboutTitle.innerHTML = "অভিজ্ঞতার ওপর গড়ে ওঠা।<br><span class='gold-gradient-text'>ভবিষ্যতের জন্য প্রস্তুত।</span>";
    if (aboutLead) aboutLead.textContent = "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন একটি বর্ধনশীল প্রকৌশল ও নির্মাণ প্রতিষ্ঠান—যা বাস্তব অভিজ্ঞতা, কারিগরি জ্ঞান এবং সঠিক নিয়মে নির্মাণকাজের প্রতিশ্রুতির ওপর প্রতিষ্ঠিত।";
    if (aboutDesc1) aboutDesc1.textContent = "কোম্পানি হিসেবে বিইসি তার আধুনিক পরিচয় প্রতিষ্ঠা করছে, তবে এর নেতৃত্বের রয়েছে নির্মাণ, প্রকৌশল ও প্রকল্প বাস্তবায়নে ১৫ বছরেরও বেশি বাস্তব অভিজ্ঞতা।";
    if (aboutDesc2) aboutDesc2.textContent = "এই অভিজ্ঞতাই নির্ধারণ করে আমাদের কাজের প্রতিটি ধাপ—প্রাথমিক আলোচনা ও নকশা প্রণয়ন থেকে শুরু করে স্ট্রাকচারাল কাজ, সিভিল কনস্ট্রাকশন, ইন্টেরিয়র এবং চূড়ান্ত হস্তান্তর।";
    if (aboutQuote) aboutQuote.innerHTML = "আমরা বিশ্বাস করি একটি প্রকল্পের প্রতিটি ধাপের জন্য ক্লায়েন্টকে একাধিক আলাদা দলের সাথে দৌড়াদৌড়ি করতে হবে না।<br><span style='color: var(--color-champagne-dark); font-family: var(--font-mono); font-size: 0.8rem; display: block; margin-top: 0.5rem;'>একটি একক দৃষ্টিভঙ্গি। একটি একক দায়বদ্ধ দল। নকশা থেকে নির্মাণ পর্যন্ত সম্পূর্ণ পথচলা।</span>";
    if (aboutExpCopy) aboutExpCopy.textContent = "এই অভিজ্ঞতা এসেছে বহু বছরের বাস্তব সাইটে কাজ, বাস্তব মালামাল পরীক্ষা এবং নির্মাণের মাঠপর্যায়ের চ্যালেঞ্জ সমাধানের মধ্য দিয়ে।";
    if (aboutExpSub) aboutExpSub.textContent = "আমাদের নেতৃত্ব এবং প্রকল্প অভিজ্ঞতায় রয়েছে ১৫+ বছরের শিল্প জ্ঞান।";

    // Services (Bengali)
    if (servicesTag) servicesTag.textContent = "আমাদের সেবাসমূহ";
    if (servicesTitle) servicesTitle.textContent = "আমরা যা করি";
    if (servicesSubline) servicesSubline.textContent = "প্রথম স্কেচ থেকে চূড়ান্ত হস্তান্তর।";
    if (servicesLead) servicesLead.textContent = "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন আপনার সম্পূর্ণ প্রকল্প সহযোগী। আমরা সিভিল কনস্ট্রাকশন, আর্কিটেকচারাল ডিজাইন, স্ট্রাকচারাল ইঞ্জিনিয়ারিং এবং ইন্টেরিয়র এক ছাতার নিচে প্রদান করি।";

    // Design-to-Build (Bengali)
    if (dtbTag) dtbTag.textContent = "বিইসি-র বিশেষত্ব";
    if (dtbTitle) dtbTitle.innerHTML = "আপনার পরিকল্পনা নিয়ে আসুন।<br><span class='gold-gradient-text'>আমরা তা বাস্তবে রূপ দেব।</span>";
    if (dtbText1) dtbText1.textContent = "সব ক্লায়েন্ট কিন্তু সম্পূর্ণ ড্রয়িং বা প্ল্যান নিয়ে শুরু করেন না।";
    if (dtbText2) dtbText2.innerHTML = "কখনও এটি শুরু হয় একখণ্ড জমি দিয়ে।<br>কখনও শুরু হয় একটি খসড়া স্কেচ দিয়ে।<br>কখনও পিন্টারেস্টের একটি পছন্দের ছবি দিয়ে।<br>আবার কখনও শুধু একটি ভাবনা দিয়ে যে স্থানটি কেমন হওয়া উচিত।";
    if (dtbText3) dtbText3.textContent = "ঠিক সেখানেই বিইসি আপনাকে পথ দেখায়—ধারণা থেকে নকশা, অনুমোদন, সিভিল নির্মাণ, ইন্টেরিয়র এবং চাবি হস্তান্তর পর্যন্ত:";

    // Process (Bengali)
    if (processTag) processTag.textContent = "কাজের পদ্ধতি";
    if (processTitle) processTitle.textContent = "একটি দল। একটি সমন্বিত পদ্ধতি।";
    if (processSubline) processSubline.textContent = "নির্মাণকে আরও সহজ ও নির্ভরযোগ্য করার উপায়।";

    // Construction (Bengali)
    if (constructionTag) constructionTag.textContent = "কঠোর নির্মাণ মানদণ্ড";
    if (constructionTitle) constructionTitle.innerHTML = "ভালো নকশা কেবল একটি সূচনা।";
    if (constructionText1) constructionText1.textContent = "একটি সুন্দর ড্রয়িং মানেই একটি সম্পূর্ণ ভবন নয়।";
    if (constructionText2) constructionText2.textContent = "আসল পরীক্ষা শুরু হয় সাইটে। সঠিক বাস্তবায়ন, সময়ানুবর্তিতা, মালামালের মান ও কারিগরি দক্ষতার ওপরই নির্ভর করে একটি ভবন যুগের পর যুগ কীভাবে টিকে থাকবে।";

    // Interior (Bengali)
    if (interiorTag) interiorTag.textContent = "অভ্যন্তরীণ পরিসর নির্মাণ";
    if (interiorTitle) interiorTitle.textContent = "কাঠামো থেকে জীবনযাত্রার পরিসরে।";
    if (interiorText1) interiorText1.textContent = "আমরা বিশ্বাস করি সিভিল নির্মাণ এবং ইন্টেরিয়র দুটি সম্পূর্ণ আলাদা কাজ হওয়া উচিত নয়।";
    if (interiorText2) interiorText2.textContent = "আমাদের দল ভবনের মূল কাঠামোগত চিন্তা থেকেই অভ্যন্তরীণ পরিসরের নকশা তৈরি করে—যেখানে আলো-বাতাস, আধুনিক আসবাব ও বাস্তবসম্মত প্রয়োজনীয়তার মেলবন্ধন ঘটে।";

    // Trust (Bengali)
    if (trustTag) trustTag.textContent = "বিশ্বাস ও মানদণ্ড";
    if (trustTitle) trustTitle.textContent = "কেন ক্লায়েন্টরা বিইসি বেছে নেন";
    if (trustLead) trustLead.textContent = "বাস্তব কাজের অভিজ্ঞতা ও স্বচ্ছ দায়বদ্ধতার ওপর প্রতিষ্ঠিত বিশ্বাস—কোনো অতিরঞ্জিত বা কাল্পনিক দাবি ছাড়া।";

    // Leadership (Bengali)
    if (leadershipTag) leadershipTag.textContent = "নেতৃত্ব ও দায়বদ্ধতা";
    if (leadershipTitle) leadershipTitle.textContent = "কোম্পানির পেছনের মূল অভিজ্ঞতা।";
    if (leadershipText1) leadershipText1.textContent = "বিইসি হয়তো তার বর্তমান করপোরেট রূপে একটি নতুন নাম, কিন্তু এর পেছনের মানুষগুলো নির্মাণ জগতে মোটেও নতুন নন।";
    if (leadershipText2) leadershipText2.textContent = "১৫ বছরেরও বেশি বাস্তব অভিজ্ঞতাসম্পন্ন এই নেতৃত্ব মাঠপর্যায়ের বাস্তবতা, মালামালের নির্বাচন এবং ড্রয়িংকে সুন্দর স্থানে রূপ দেওয়ার প্রতিটি সিদ্ধান্ত সম্পর্কে গভীরভাবে অবগত।";
    if (leadershipGoal) leadershipGoal.textContent = "লক্ষ্যটি অত্যন্ত স্পষ্ট: অতীতের সমৃদ্ধ বাস্তব অভিজ্ঞতার সাথে কাজের আধুনিক পদ্ধতির সমন্বয় ঘটানো।";
    if (btnMeetTeam) btnMeetTeam.innerHTML = `<span>আমাদের দলের সাথে কথা বলুন</span><span class='material-symbols-outlined btn-arrow-icon'>arrow_forward</span>`;

    // Contact (Bengali)
    if (contactTag) contactTag.textContent = "পরামর্শ ও যোগাযোগ";
    if (contactTitle) contactTitle.innerHTML = "চলুন গড়ে তুলি<br><span class='gold-gradient-text'>একটি বাস্তব স্বপ্ন।</span>";
    if (contactLead1) contactLead1.textContent = "আপনার কি কোনো খালি জমি, বাড়ি, সংস্কার প্রয়োজন এমন স্থাপনা বা শুধু একটি ধারণা আছে?";
    if (contactLead2) contactLead2.textContent = "আমাদের সাথে কথা বলুন।";
    if (contactLead3) contactLead3.textContent = "স্থাপত্য নকশা, স্ট্রাকচারাল ডিজাইন, সিভিল নির্মাণ, ইন্টেরিয়র বা সম্পূর্ণ টার্নকি প্রজেক্ট—আপনার পরিকল্পনা আমাদের জানান।";
    if (formHeading) formHeading.textContent = "আপনার প্রকল্প সম্পর্কে জানান";
    if (formSubtext) formSubtext.textContent = "আপনার তথ্য দিন। আমাদের প্রকৌশল টিম দ্রুত আপনার সাথে যোগাযোগ করবে।";
    if (btnSubmitText) btnSubmitText.textContent = "প্রকল্প আলোচনা শুরু করুন";
    if (finalBrandStatement) finalBrandStatement.innerHTML = "আমরা শুধু কাঠামো নির্মাণ করি না।<br><span class='gold-gradient-text'>আমরা মানুষের বসবাস, কাজ ও বেড়ে ওঠার ভালোবাসার পরিসর গড়ে তুলি।</span>";
  } else {
    if (btnEn) btnEn.classList.add('active');
    if (btnBn) btnBn.classList.remove('active');

    // Hero (English)
    if (heroEyebrow) heroEyebrow.textContent = "FULL-SERVICE — ENGINEERING • CONSTRUCTION • ARCHITECTURE • INTERIORS";
    if (heroHeadline) heroHeadline.innerHTML = "WE DESIGN.<br>WE BUILD.<br><span class='gold-gradient-text'>WE DELIVER.</span>";
    if (heroStrapline) heroStrapline.textContent = "FROM AN IDEA TO A FINISHED SPACE.";
    if (heroSubtext) heroSubtext.textContent = "Brother’s Engineering & Construction brings together engineering, construction, architecture and interior execution under one roof — helping clients turn ideas, plans and properties into thoughtfully designed, professionally built spaces.";
    if (heroExpBanner) heroExpBanner.innerHTML = `<span class='material-symbols-outlined' style='color: var(--color-champagne); font-size: 22px;'>verified</span><div><strong>A NEW NAME IN THE MARKET.</strong> 15+ YEARS OF PRACTICAL INDUSTRY EXPERIENCE BEHIND THE PEOPLE WHO LEAD IT.</div>`;
    if (heroCtaStart) heroCtaStart.textContent = "START A PROJECT";
    if (heroCtaServices) heroCtaServices.innerHTML = `<span class='material-symbols-outlined' style='font-size: 18px;'>apps</span><span>EXPLORE OUR SERVICES</span>`;
    if (heroSupportingLine) heroSupportingLine.textContent = "Residential • Commercial • Construction • Design • Interior • Renovation";
    if (tickerLeftText) tickerLeftText.textContent = "ENGINEERED TO BUILD. DESIGNED TO LAST.";
    if (tickerCenterText) tickerCenterText.innerHTML = "<span>YOUR VISION. OUR ENGINEERING. ONE COMPLETE BUILD.</span>";

    // About (English)
    if (aboutTag) aboutTag.textContent = "ABOUT BROTHER’S ENGINEERING & CONSTRUCTION";
    if (aboutTitle) aboutTitle.innerHTML = "BUILT ON EXPERIENCE.<br><span class='gold-gradient-text'>CREATED FOR WHAT’S NEXT.</span>";
    if (aboutLead) aboutLead.textContent = "Brother’s Engineering & Construction is a growing engineering and construction company built around practical experience, technical knowledge and a commitment to doing construction properly.";
    if (aboutDesc1) aboutDesc1.textContent = "While BEC is establishing its modern identity as a company, its leadership brings more than 15 years of hands-on experience across construction, engineering, project execution and the built environment.";
    if (aboutDesc2) aboutDesc2.textContent = "That experience shapes how we approach every project — from the first conversation and initial design to structural work, construction, interiors and final delivery.";
    if (aboutQuote) aboutQuote.innerHTML = "We believe clients should not have to coordinate multiple disconnected teams for every stage of a project.<br><span style='color: var(--color-champagne-dark); font-family: var(--font-mono); font-size: 0.8rem; display: block; margin-top: 0.5rem; letter-spacing: 0.05em;'>ONE VISION. ONE ACCOUNTABLE TEAM. ONE COMPLETE JOURNEY FROM DESIGN TO BUILD.</span>";
    if (aboutExpCopy) aboutExpCopy.textContent = "Experience that comes from years of working with real projects, real sites, real materials and real construction challenges.";
    if (aboutExpSub) aboutExpSub.textContent = "15+ years of industry experience within our leadership and project expertise.";

    // Services (English)
    if (servicesTag) servicesTag.textContent = "CAPABILITIES & SCOPE";
    if (servicesTitle) servicesTitle.textContent = "WHAT WE DO";
    if (servicesSubline) servicesSubline.textContent = "FROM FIRST SKETCH TO FINAL HANDOVER.";
    if (servicesLead) servicesLead.textContent = "Brother’s Engineering & Construction is a complete project partner. We bring together civil construction, architectural design, structural engineering, and interior execution to deliver unified spaces with seamless accountability.";

    // Design-to-Build (English)
    if (dtbTag) dtbTag.textContent = "THE BEC DIFFERENTIATOR";
    if (dtbTitle) dtbTitle.innerHTML = "YOU BRING THE IDEA.<br><span class='gold-gradient-text'>WE BUILD THE REALITY.</span>";
    if (dtbText1) dtbText1.textContent = "Not every client starts with a complete plan.";
    if (dtbText2) dtbText2.innerHTML = "Sometimes it starts with a piece of land.<br>Sometimes it starts with a drawing.<br>Sometimes it starts with a Pinterest image.<br>Sometimes it is simply an idea of how a space should feel.";
    if (dtbText3) dtbText3.textContent = "That is where we come in. BEC guides each project along a clear, accountable path:";

    // Process (English)
    if (processTag) processTag.textContent = "METHODOLOGY";
    if (processTitle) processTitle.textContent = "ONE TEAM. ONE PROCESS.";
    if (processSubline) processSubline.textContent = "A simpler way to build.";

    // Construction (English)
    if (constructionTag) constructionTag.textContent = "CONSTRUCTION RIGOR";
    if (constructionTitle) constructionTitle.innerHTML = "GOOD DESIGN IS ONLY THE BEGINNING.";
    if (constructionText1) constructionText1.textContent = "A beautiful drawing is not a finished building.";
    if (constructionText2) constructionText2.textContent = "The real test begins on site. Our construction approach focuses on proper execution, coordination, material quality, workmanship and attention to the details that determine how a building performs over time.";

    // Interior (English)
    if (interiorTag) interiorTag.textContent = "SPATIAL EXECUTION";
    if (interiorTitle) interiorTitle.textContent = "FROM STRUCTURE TO SPACE.";
    if (interiorText1) interiorText1.textContent = "We believe construction and interior should not feel like two completely separate projects.";
    if (interiorText2) interiorText2.textContent = "Our team carries the same design thinking from the building structure into the spaces people actually experience — balancing natural lighting, custom joinery, ergonomic flow, and durable materials.";

    // Trust (English)
    if (trustTag) trustTag.textContent = "CREDIBILITY & ETHOS";
    if (trustTitle) trustTitle.textContent = "WHY CLIENTS CHOOSE BEC";
    if (trustLead) trustLead.textContent = "Credible engineering grounded in real accountability — without hyperbole, inflated claims, or contractor passing.";

    // Leadership (English)
    if (leadershipTag) leadershipTag.textContent = "LEADERSHIP & GOVERNANCE";
    if (leadershipTitle) leadershipTitle.textContent = "EXPERIENCE BEHIND THE COMPANY.";
    if (leadershipText1) leadershipText1.textContent = "BEC may be a new name in its present form, but the people behind it are not new to construction.";
    if (leadershipText2) leadershipText2.textContent = "With more than 15 years of industry experience, the company’s leadership brings practical knowledge of construction, project execution, site realities and the decisions that turn plans into finished spaces.";
    if (leadershipGoal) leadershipGoal.textContent = "The goal is simple: Build a company that combines the experience of the past with a more modern way of working.";
    if (btnMeetTeam) btnMeetTeam.innerHTML = `<span>MEET THE TEAM</span><span class='material-symbols-outlined btn-arrow-icon'>arrow_forward</span>`;

    // Contact (English)
    if (contactTag) contactTag.textContent = "INITIATE A CONVERSATION";
    if (contactTitle) contactTitle.innerHTML = "LET'S BUILD<br><span class='gold-gradient-text'>SOMETHING REAL.</span>";
    if (contactLead1) contactLead1.textContent = "Have a plot, a project, an existing property or simply an idea?";
    if (contactLead2) contactLead2.textContent = "Talk to us.";
    if (contactLead3) contactLead3.textContent = "Whether you need architectural design, structural engineering, construction, interior work, renovation or a complete design-to-build solution, tell us what you are planning.";
    if (formHeading) formHeading.textContent = "TELL US ABOUT YOUR PROJECT";
    if (formSubtext) formSubtext.textContent = "Share your requirements and our engineering team will get back to you promptly.";
    if (btnSubmitText) btnSubmitText.textContent = "START YOUR PROJECT";
    if (finalBrandStatement) finalBrandStatement.innerHTML = "WE DON'T JUST BUILD STRUCTURES.<br><span class='gold-gradient-text'>WE BUILD SPACES FOR PEOPLE TO LIVE, WORK, GROW AND BELONG.</span>";
  }

  // Re-render dynamic components with updated language
  renderServices();
  renderDesignToBuild();
  renderProcessStages();
  renderProjectsList();
  renderTrustPillars();
}

/* ==========================================================================
   13. ENQUIRY FORM WORKFLOW
   ========================================================================== */
function handleEnquirySubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('patron-name').value.trim();
  const phone = document.getElementById('patron-phone').value.trim();
  const service = document.getElementById('patron-service').value;
  const notes = document.getElementById('patron-notes').value.trim();

  if (!name || !phone) {
    alert("Please provide both your name and phone number.");
    return;
  }

  const formPane = document.querySelector('.enquiry-form-pane');
  if (formPane) {
    const isEn = currentLanguage === 'en';
    formPane.innerHTML = `
      <div style='padding: 2rem 0; display: flex; flex-direction: column; gap: 1rem; text-align: left;'>
        <span class='material-symbols-outlined' style='color: var(--color-champagne); font-size: 44px;'>verified</span>
        <h3 class="headline-md" style='color: var(--color-ivory);'>
          ${isEn ? `Thank you, ${name}!` : `ধন্যবাদ, ${name}!`}
        </h3>
        <p class="body-md" style='color: rgba(244,240,232,0.85); line-height: 1.7;'>
          ${isEn 
            ? `Your consultation request for <strong>${service}</strong> has been logged. Our engineering desk in Chattogram will connect with you at <strong>${phone}</strong> shortly.`
            : `<strong>${service}</strong> বিষয়ে আপনার পরামর্শ অনুরোধটি গ্রহণ করা হয়েছে। আমাদের প্রকৌশল টিম অতিশীঘ্রই <strong>${phone}</strong> নম্বরে আপনার সাথে যোগাযোগ করবে।`}
        </p>
        <p class="body-sm" style='color: var(--color-champagne);'>
          ${isEn ? 'Direct Helplines: ' : 'সরাসরি হেল্পলাইন: '}<strong>+880 1749-349299</strong> / <strong>+880 1828-178962</strong>
        </p>
        <button class="btn btn-secondary" style='border-color: rgba(255,255,255,0.3); color: var(--color-ivory); margin-top: 1rem; align-self: flex-start;' onclick="window.location.reload()">
          <span>${isEn ? 'SUBMIT ANOTHER INQUIRY' : 'অন্য অনুসন্ধান পাঠান'}</span>
        </button>
      </div>
    `;
  }
}

/* ==========================================================================
   14. SMOOTH SCROLL FOR ALL ANCHORS
   ========================================================================== */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;

      const targetElem = document.querySelector(targetId);
      if (targetElem) {
        e.preventDefault();
        targetElem.scrollIntoView({ behavior: 'smooth' });
        closeMobileDrawer();
      }
    });
  });
}
