/**
 * BEC (BROTHER’S ENGINEERING & CONSTRUCTION) — INTERACTIVE APPLICATION LOGIC
 * Established: 2019 · Chattogram, Bangladesh
 * CEO: Engr. Md. Shahidul Islam (Milad) · B.Sc. Engg. (Civil), FIEB
 *
 * Manages full-service engineering & construction content rendering,
 * company facts, design-to-build workflow, client profiles, portfolio filtering,
 * modal blueprint inspection, bilingual toggling (EN/BN), and project inquiry workflows.
 */

let currentLanguage = 'en';
let currentProjectCategory = 'ALL';
let currentModalProject = null;

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initHeroVideo();
  initMobileDrawer();
  
  // Dynamic Content Renderers
  renderCompanyFacts();
  renderServices();
  renderDesignToBuild();
  renderWhoWeWorkWith();
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
    };
    window.addEventListener('scroll', update, { passive: true });
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
   3. COMPANY FACTS (VERIFIED ONLY)
   ========================================================================== */
function renderCompanyFacts() {
  const container = document.getElementById('facts-grid-container');
  if (!container || !BDM_DATA || !BDM_DATA.facts) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.facts.map((fact) => {
    const label = isEn ? fact.label : fact.bengaliLabel;
    const desc = isEn ? fact.desc : fact.bengaliDesc;

    return `
      <article class="fact-card">
        <span class="fact-val">${fact.val}</span>
        <span class="fact-label">${label}</span>
        <p class="fact-desc">${desc}</p>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   4. SERVICES SECTION RENDERING (WHAT WE DO)
   ========================================================================== */
function renderServices() {
  const container = document.getElementById('services-grid-container');
  if (!container || !BDM_DATA || !BDM_DATA.services) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.services.map((svc) => {
    const title = isEn ? svc.title : svc.bengaliTitle;
    const hook = isEn ? svc.hook : svc.bengaliHook;
    const desc = isEn ? svc.desc : svc.bengaliDesc;
    const scope = isEn ? svc.scope : svc.bengaliScope;

    return `
      <article class="service-card" tabindex="0">
        <div class="service-card-media">
          <img src="${svc.image}" alt="${title}" class="service-card-img" loading="lazy">
          <div class="service-card-badge">
            <span class="service-num">${svc.number}</span>
            <span class="material-symbols-outlined service-icon-sm">${svc.icon}</span>
          </div>
        </div>
        <div class="service-card-body">
          <h3 class="service-title">${title}</h3>
          <p class="service-hook">${hook}</p>
          <p class="service-desc">${desc}</p>
        </div>
        <div class="service-scope">
          <strong>${isEn ? 'TYPICAL SCOPE:' : 'কাজের আওতা:'}</strong> ${scope}
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   5. DESIGN-TO-BUILD SECTION RENDERING (7-STEP JOURNEY)
   ========================================================================== */
function renderDesignToBuild() {
  const container = document.getElementById('dtb-steps-container');
  if (!container || !BDM_DATA || !BDM_DATA.designToBuildSteps) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.designToBuildSteps.map((item) => {
    const name = isEn ? item.name : item.bengaliName;
    const desc = isEn ? item.desc : item.bengaliDesc;

    return `
      <div class="dtb-flow-step">
        <div>
          <span class="dtb-step-num">${item.step}</span>
          <h4 class="dtb-step-name">${name}</h4>
        </div>
        <p class="dtb-step-desc">${desc}</p>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   6. WHO WE WORK WITH SECTION
   ========================================================================== */
function renderWhoWeWorkWith() {
  const container = document.getElementById('who-we-work-with-container');
  if (!container || !BDM_DATA || !BDM_DATA.whoWeWorkWith) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.whoWeWorkWith.map((item) => {
    const title = isEn ? item.title : item.bengaliTitle;
    const desc = isEn ? item.desc : item.desc;

    return `
      <article class="client-card">
        <span class="material-symbols-outlined client-icon">${item.icon}</span>
        <div>
          <h3 class="client-title">${title}</h3>
          <p class="client-desc">${desc}</p>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   7. PROJECTS SECTION & CATEGORY FILTERING
   ========================================================================== */
function filterProjectsCategory(category) {
  currentProjectCategory = category;

  const tabs = document.querySelectorAll('.living-tabs .living-tab-btn');
  tabs.forEach(tab => {
    const tabText = tab.textContent.trim().toUpperCase();
    if (category === 'ALL' && tabText.includes('ALL')) {
      tab.classList.add('active');
    } else if (category !== 'ALL' && tabText === category) {
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

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="padding: 2.5rem; text-align: center; background: var(--color-ivory-light); border: 1px solid var(--color-stone);">
        <p class="body-md" style="color: var(--color-charcoal-dim);">
          ${isEn 
            ? 'We undertake custom design and construction for this category. Contact our Chattogram office to discuss your project scope.' 
            : 'আমরা এই ক্যাটাগরিতে নকশা ও নির্মাণ কার্যক্রম পরিচালনা করি। আপনার প্রকল্পের বিষয়ে বিস্তারিত জানতে আমাদের চট্টগ্রাম কার্যালয়ে যোগাযোগ করুন।'}
        </p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((proj) => {
    const statusClass = proj.id === 'bdm-shopnaloy' ? 'active' : (proj.id === 'bdm-shopno-nebash' ? 'ongoing' : 'upcoming');
    const name = isEn ? proj.name : proj.bengaliName;
    const location = isEn ? proj.location : proj.bengaliLocation;
    const status = isEn ? proj.status : proj.bengaliStatus;
    const catLabel = proj.categoryLabel || proj.category;

    return `
      <article class="project-row" onclick="openProjectModal('${proj.id}')" tabindex="0" role="button" aria-label="View ${name} details">
        <span class="project-row-num">${proj.index}</span>

        <div class="project-row-thumb">
          <img src="${proj.heroImage}" alt="${name}" class="project-thumb-img" loading="lazy">
        </div>
        
        <div class="project-row-title-box">
          <h3 class="project-row-title">${name}</h3>
          <span class="label-caps" style='color: var(--color-champagne); font-size: 0.675rem;'>${catLabel}</span>
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
   8. CONSTRUCTION FLOW BAR RENDERING
   ========================================================================== */
function renderConstructionFlow() {
  const container = document.getElementById('construction-flow-container');
  if (!container) return;

  const steps = [
    "SITE DISCOVERY",
    "FOUNDATION & PILING",
    "RCC STRUCTURE",
    "BRICKWORK & MASONRY",
    "MEP INFRASTRUCTURE",
    "SURFACE FINISHES",
    "INTERIOR FIT-OUT",
    "VERIFIED HANDOVER"
  ];

  container.innerHTML = steps.map((step, idx, arr) => {
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
   9. INTERIOR CATEGORIES RENDERING
   ========================================================================== */
function renderInteriorCategories() {
  const container = document.getElementById('interior-cat-container');
  if (!container || !BDM_DATA || !BDM_DATA.interiorCategories) return;

  const isEn = currentLanguage === 'en';

  container.innerHTML = BDM_DATA.interiorCategories.map((cat) => {
    const title = isEn ? cat.title : cat.bengaliTitle;
    const tag = isEn ? cat.tag : cat.bengaliTag;
    const desc = isEn ? cat.desc : cat.bengaliDesc;

    return `
      <article class="interior-cat-card" tabindex="0">
        <div class="interior-cat-media">
          <img src="${cat.image}" alt="${title}" class="interior-cat-img" loading="lazy">
          <div class="interior-cat-badge">
            <span class="label-caps">${tag}</span>
          </div>
        </div>
        <div class="interior-cat-body">
          <h3 class="interior-cat-title">${title}</h3>
          <p class="interior-cat-desc">${desc}</p>
        </div>
      </article>
    `;
  }).join('');
}

/* ==========================================================================
   10. TRUST PILLARS RENDERING (WHY WORK WITH BEC?)
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
   11. PROJECT DETAIL LIGHTBOX MODAL & BLUEPRINTS
   ========================================================================== */
function openProjectModal(projectId) {
  const proj = BDM_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  currentModalProject = proj;

  document.getElementById('modal-project-index').textContent = `${proj.index} · ${(proj.categoryLabel || proj.category).toUpperCase()}`;
  document.getElementById('modal-project-title').textContent = proj.name;
  document.getElementById('modal-project-desc').textContent = proj.description;

  const specsContainer = document.getElementById('modal-specs-grid');
  specsContainer.innerHTML = `
    <div class="spec-cell">
      <span class="spec-cell-label">LOCATION</span>
      <span class="spec-cell-val">${proj.location}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">SCOPE OF WORK</span>
      <span class="spec-cell-val" style='color: var(--color-champagne);'>${proj.scopeDetails || proj.categoryLabel}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">STATUS</span>
      <span class="spec-cell-val">${proj.statusBadge || proj.status}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">FRONT ROAD ACCESS</span>
      <span class="spec-cell-val">${proj.roadWidth}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">BUILDING SCALE</span>
      <span class="spec-cell-val">${proj.floors}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">UNIT PROPORTION</span>
      <span class="spec-cell-val">${proj.unitSize}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">PARCEL SIZE</span>
      <span class="spec-cell-val">${proj.landSize}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">LAYOUT CONFIGURATION</span>
      <span class="spec-cell-val">${proj.configuration}</span>
    </div>
    <div class="spec-cell">
      <span class="spec-cell-label">PROJECT CONSULTATION</span>
      <span class="spec-cell-val">${proj.bookingShare || 'Available via BEC Office'}</span>
    </div>
  `;

  switchModalTab('render');

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
    displayBadge.textContent = "ARCHITECTURAL PERSPECTIVE";
  } else if (tabKey === 'plan') {
    planBtn?.classList.add('active');
    displayImg.src = currentModalProject.floorPlanImage;
    displayBadge.textContent = (currentModalProject.planType || 'ARCHITECTURAL SCHEMATIC').toUpperCase();
  } else if (tabKey === 'twilight') {
    twilightBtn?.classList.add('active');
    displayImg.src = currentModalProject.twilightImage;
    displayBadge.textContent = "ELEVATION PERSPECTIVE VIEW";
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
    projectSelect.value = "Building Construction";
  }
  closeProjectModal();
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/* ==========================================================================
   12. INTERACTIVE CARTOGRAPHY (CHATTOGRAM LOCATIONS & OFFICE)
   ========================================================================== */
function selectMapLocation(locKey) {
  const tagElem = document.getElementById('loc-detail-tag');
  const titleElem = document.getElementById('loc-detail-title');
  const descElem = document.getElementById('loc-detail-desc');

  if (locKey === 'shopnaloy') {
    tagElem.textContent = "PROJECT SITE · AGRABAD CDA";
    titleElem.textContent = "BEC SHOPNALOY (PLOT 727)";
    descElem.textContent = "Plot 727, Road 14, Agrabad CDA, Chattogram. Active construction site featuring disciplined civil engineering, cast bored piling, and earthquake-resistant frame execution.";
  } else if (locKey === 'nebash') {
    tagElem.textContent = "PROJECT SITE · AGRABAD CDA";
    titleElem.textContent = "BEC SHOPNO NEBASH (PLOT 445)";
    descElem.textContent = "Plot 445, Road 11, Agrabad CDA, Chattogram. Ongoing residential project with generous layouts, cross-ventilation, and engineering-led execution.";
  } else if (locKey === 'hq') {
    tagElem.textContent = "COMPANY OFFICE & CONSULTATION DESK";
    titleElem.textContent = "BEC OFFICE (EIDGAH / PAHARTALI)";
    descElem.textContent = "2813/C, Al-Helal Bhaban, Ground Floor, Halishahar Road, Eidgah Kacha Rastar Matha, Pahartali, Chattogram. Our central facility for drawings review, technical consultation, and project planning.";
  }
}

/* ==========================================================================
   13. BILINGUAL SWITCHER (EN / বাংলা)
   ========================================================================== */
function setLanguage(lang) {
  currentLanguage = lang;

  const btnEn = document.getElementById('btn-lang-en');
  const btnBn = document.getElementById('btn-lang-bn');

  // Hero
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

  // About
  const aboutTag = document.getElementById('about-tag');
  const aboutTitle = document.getElementById('about-title');
  const aboutLead = document.getElementById('about-lead');
  const aboutDesc1 = document.getElementById('about-desc-1');
  const aboutDesc2 = document.getElementById('about-desc-2');
  const aboutDesc3 = document.getElementById('about-desc-3');
  const aboutDesc4 = document.getElementById('about-desc-4');
  const aboutQuote = document.getElementById('about-quote');
  const aboutExpStatement = document.getElementById('about-exp-statement');

  // Services
  const servicesTag = document.getElementById('services-tag');
  const servicesTitle = document.getElementById('services-title');
  const servicesSubline = document.getElementById('services-subline');
  const servicesLead = document.getElementById('services-lead');

  // Design-to-Build
  const dtbTag = document.getElementById('dtb-tag');
  const dtbTitle = document.getElementById('dtb-title');
  const dtbText1 = document.getElementById('dtb-text-1');
  const dtbText2 = document.getElementById('dtb-text-2');
  const dtbText3 = document.getElementById('dtb-text-3');

  // Who We Work With
  const clientsTag = document.getElementById('clients-tag');
  const clientsTitle = document.getElementById('clients-title');
  const clientsLead = document.getElementById('clients-lead');

  // Projects
  const projectsTag = document.getElementById('projects-tag');
  const projectsTitle = document.getElementById('projects-title');
  const projectsDesc = document.getElementById('projects-desc');

  // Construction
  const constructionTag = document.getElementById('construction-tag');
  const constructionTitle = document.getElementById('construction-title');
  const constructionText1 = document.getElementById('construction-text-1');
  const constructionText2 = document.getElementById('construction-text-2');

  // Interior
  const interiorTag = document.getElementById('interior-tag');
  const interiorTitle = document.getElementById('interior-title');
  const interiorText1 = document.getElementById('interior-text-1');
  const interiorText2 = document.getElementById('interior-text-2');

  // Trust
  const trustTag = document.getElementById('trust-tag');
  const trustTitle = document.getElementById('trust-title');
  const trustLead = document.getElementById('trust-lead');

  // Leadership
  const leadershipTag = document.getElementById('leadership-tag');
  const leadershipTitle = document.getElementById('leadership-title');
  const leadershipText1 = document.getElementById('leadership-text-1');
  const leadershipText2 = document.getElementById('leadership-text-2');
  const leadershipText3 = document.getElementById('leadership-text-3');
  const leadershipGoal = document.getElementById('leadership-goal');
  const ceoNameElem = document.getElementById('ceo-name');
  const ceoTitleElem = document.getElementById('ceo-title');
  const ceoCredElem = document.getElementById('ceo-cred');

  // Contact
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

    // Hero
    if (heroEyebrow) heroEyebrow.textContent = BDM_DATA.brand.bengaliEyebrow;
    if (heroHeadline) heroHeadline.innerHTML = BDM_DATA.brand.bengaliHeadline;
    if (heroSubtext) heroSubtext.textContent = BDM_DATA.brand.bengaliHeroDesc;
    if (heroCtaStart) heroCtaStart.textContent = "প্রকল্প শুরু করুন";
    if (heroCtaServices) heroCtaServices.innerHTML = `<span class='material-symbols-outlined' style='font-size: 18px;'>apps</span><span>সেবাসমূহ দেখুন</span>`;
    if (tickerLeftText) tickerLeftText.textContent = "স্থাপিত ২০১৯ · চট্টগ্রাম";
    if (tickerCenterText) tickerCenterText.innerHTML = "<span>উদ্দেশ্যপূর্ণ নকশা। আস্থার সাথে নির্মাণ।</span>";

    // About
    if (aboutTag) aboutTag.textContent = "আমাদের পরিচয় ও দৃষ্টিভঙ্গি";
    if (aboutTitle) aboutTitle.innerHTML = "প্রকৌশলের ওপর গড়ে ওঠা ভিত্তি।";
    if (aboutLead) aboutLead.textContent = "২০১৯ সালে প্রতিষ্ঠিত ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন চট্টগ্রামের একটি প্রকৌশল ও নির্মাণ প্রতিষ্ঠান—যা স্থাপত্য নকশা, স্ট্রাকচারাল ডিজাইন, ইন্টেরিয়র ডিজাইন, কনসালটেন্সি এবং নির্মাণকাজে নিয়োজিত।";
    if (aboutDesc1) aboutDesc1.textContent = "প্রতিষ্ঠার পর থেকে বিইসি অফলাইন কার্যক্রম ও স্থানীয় নির্মাণশিল্পে বাস্তব অংশগ্রহণের মাধ্যমে তার ভিত্তি তৈরি করেছে। এখন অনলাইন উপস্থিতি সম্প্রসারণের মাধ্যমে আমরা আমাদের সেবাগুলোকে আরও সহজে আবিষ্কারযোগ্য এবং ক্লায়েন্টদের কাছে আমাদের কাজের ধারা স্পষ্ট করতে চাই।";
    if (aboutDesc2) aboutDesc2.textContent = "সিভিল ইঞ্জিনিয়ারিংয়ে বি.এসসি. ইঞ্জি. ডিগ্রিধারী এবং এফআইইবি সদস্য প্রকো. মো. শহিদুল ইসলাম (মিলাদ)-এর নেতৃত্বে বিইসি প্রতিটি ভবনের পরিকল্পনা ও বাস্তবায়নে প্রকৌশল-ভিত্তিক দৃষ্টিভঙ্গি নিয়ে কাজ করে।";
    if (aboutDesc3) aboutDesc3.textContent = "আমাদের পদ্ধতি সহজ: ক্লায়েন্টের প্রয়োজন বোঝা, সাইটের বাস্তব অবস্থা পর্যালোচনা করা এবং নকশা, উপযোগিতা, নির্মাণ প্রযুক্তি ও বাজেটের মধ্যে একটি সুষম সমাধান তৈরি করা।";
    if (aboutDesc4) aboutDesc4.textContent = "প্রকল্পটি একখণ্ড খালি জমি, একটি ধারণামূলক স্কেচ, একটি স্থাপত্য ড্রয়িং বা সংস্কার প্রয়োজন এমন যেকোনো ভবন দিয়েই শুরু হোক না কেন—বিইসি তা সামনে এগিয়ে নেওয়ার সুনির্দিষ্ট দিকনির্দেশনা ও সেবা প্রদান করে।";
    if (aboutQuote) aboutQuote.innerHTML = "স্থাপিত ২০১৯। চট্টগ্রামে স্থানীয় শেকড়। উন্নত মানের মানসম্মত স্থাপনায় নিবেদিত।<br><span style='color: var(--color-champagne-dark); font-family: var(--font-mono); font-size: 0.8rem; display: block; margin-top: 0.5rem;'>একটি সুস্পষ্ট লক্ষ্য। একটি নির্ভরযোগ্য দল। পরিকল্পনা থেকে সমাপ্তি।</span>";
    if (aboutExpStatement) aboutExpStatement.textContent = "বাস্তব কাজের অভিজ্ঞতায় গড়ে ওঠা। এখন চট্টগ্রামে ডিজিটাল মাধ্যমে সেবা সম্প্রসারণ।";

    // Services
    if (servicesTag) servicesTag.textContent = "আমরা যা করি";
    if (servicesTitle) servicesTitle.textContent = "প্রথম ড্রয়িং থেকে চূড়ান্ত ফিনিশিং।";
    if (servicesSubline) servicesSubline.textContent = "পরিকল্পনা থেকে সমাপ্তি — প্রকৌশল ও নির্মাণ সমাধান।";
    if (servicesLead) servicesLead.textContent = "যেকোনো সফল ভবনের শুরু হয় চিন্তাশীল পরিকল্পনা দিয়ে এবং তা টিকে থাকে সাইটে সঠিক বাস্তবায়নের ওপর। বিইসি ক্লায়েন্টদের সঠিক সিদ্ধান্ত গ্রহণে ও প্রকল্প এগিয়ে নিতে সার্বিক প্রকৌশল ও নির্মাণ সেবা প্রদান করে।";

    // Design-to-Build
    if (dtbTag) dtbTag.textContent = "বিইসি-র সমন্বিত পদ্ধতি";
    if (dtbTitle) dtbTitle.innerHTML = "একটি প্রকল্প।<br><span class='gold-gradient-text'>ধারণা থেকে বাস্তবে রূপ নেওয়ার স্পষ্ট পথ।</span>";
    if (dtbText1) dtbText1.textContent = "যেকোনো নির্মাণ প্রকল্পেই অনেক সিদ্ধান্ত নিতে হয়—নকশা, প্রকৌশল, সামগ্রী নির্বাচন থেকে শুরু করে সিভিল নির্মাণ ও ইন্টেরিয়র ফিনিশিং পর্যন্ত।";
    if (dtbText2) dtbText2.innerHTML = "কখনও এটি শুরু হয় একখণ্ড জমি দিয়ে।<br>কখনও একটি প্রাথমিক ড্রয়িং দিয়ে।<br>কখনও পিন্টারেস্টের একটি পছন্দের ছবি দিয়ে।<br>আবার কখনও শুধু একটি ভাবনা দিয়ে যে স্থানটি কেমন হওয়া উচিত।";
    if (dtbText3) dtbText3.textContent = "বিইসি এই প্রক্রিয়াকে সহজ করে তোলে—প্রকল্পের বিভিন্ন পর্যায় বুঝিয়ে দিয়ে এবং প্রয়োজনীয় সেবাগুলো সমন্বয় করে এগিয়ে নিয়ে যায়:";

    // Who We Work With
    if (clientsTag) clientsTag.textContent = "আমাদের ক্লায়েন্ট পরিধি";
    if (clientsTitle) clientsTitle.textContent = "আপনি যা-ই নির্মাণের পরিকল্পনা করুন, আলোচনা দিয়েই শুরু হোক।";
    if (clientsLead) clientsLead.textContent = "আমরা চট্টগ্রামের গৃহমালিক, জমি মালিক, পরিবার, ব্যবসা প্রতিষ্ঠান, প্রোপার্টি মালিক এবং ডেভেলপারদের বাস্তবসম্মত পরামর্শ ও প্রকৌশল সেবা দিয়ে থাকি।";

    // Selected Work
    if (projectsTag) projectsTag.textContent = "বাছাইকৃত প্রকল্প";
    if (projectsTitle) projectsTitle.textContent = "যে কাজ একটি ধারণা দিয়ে শুরু হয়।";
    if (projectsDesc) projectsDesc.textContent = "প্রতিটি প্রকল্পই শুরু হয় ভিন্ন ভিন্ন প্রয়োজন ও প্রেক্ষাপট থেকে। বিইসি কী ধরনের পরিসর, ডিজাইন চ্যালেঞ্জ এবং নির্মাণ কার্যক্রম পরিচালনা করে তা দেখতে আমাদের বাছাইকৃত কাজগুলো দেখুন।";

    // Construction
    if (constructionTag) constructionTag.textContent = "সাইট বাস্তবায়ন ও কঠোর মানদণ্ড";
    if (constructionTitle) constructionTitle.innerHTML = "ভালো নকশা কেবল একটি সূচনা।";
    if (constructionText1) constructionText1.textContent = "একটি সুন্দর ড্রয়িংই একটি সম্পূর্ণ ভবন নয়।";
    if (constructionText2) constructionText2.textContent = "আসল পরীক্ষা শুরু হয় সাইটে। আমাদের নির্মাণ দৃষ্টিভঙ্গি সঠিক সাইট পরিচালনা, সময়ানুবর্তিতা, মানসম্পন্ন উপাদান এবং কারিগরি দক্ষতার ওপর গুরুত্ব দেয় যা একটি ভবনের দীর্ঘস্থায়িত্ব নির্ধারণ করে।";

    // Interior
    if (interiorTag) interiorTag.textContent = "অভ্যন্তরীণ পরিসর বাস্তবায়ন";
    if (interiorTitle) interiorTitle.textContent = "কাঠামো থেকে জীবনযাত্রার পরিসরে।";
    if (interiorText1) interiorText1.textContent = "আমরা বিশ্বাস করি সিভিল নির্মাণ এবং ইন্টেরিয়র দুটি সম্পূর্ণ বিচ্ছিন্ন প্রকল্প হওয়া উচিত নয়।";
    if (interiorText2) interiorText2.textContent = "আমাদের দল ভবনের কাঠামোগত চিন্তা থেকেই অভ্যন্তরীণ পরিসরের পরিকল্পনা তৈরি করে—যেখানে প্রাকৃতিক আলো, কাস্টম ক্যাবিনেট্রি, ব্যবহারিক সুবিধা এবং টেকসই উপাদানের সমন্বয় ঘটে।";

    // Trust
    if (trustTag) trustTag.textContent = "আস্থা ও দায়বদ্ধতা";
    if (trustTitle) trustTitle.textContent = "কেন ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন?";
    if (trustLead) trustLead.textContent = "বাস্তব কাজের অভিজ্ঞতা ও স্বচ্ছ দায়বদ্ধতার ওপর প্রতিষ্ঠিত প্রকৌশল সেবা—কোনো অতিরঞ্জিত বা কাল্পনিক দাবি ছাড়া।";

    // Leadership
    if (leadershipTag) leadershipTag.textContent = "নেতৃত্ব ও কারিগরি তত্ত্বাবধান";
    if (leadershipTitle) leadershipTitle.textContent = "প্রতিটি প্রকল্পের কেন্দ্রে প্রকৌশল জ্ঞান।";
    if (leadershipText1) leadershipText1.textContent = "ব্রাদার্স ইঞ্জিনিয়ারিং অ্যান্ড কনস্ট্রাকশন পরিচালিত হয় প্রকো. মো. শহিদুল ইসলাম (মিলাদ)-এর নেতৃত্বে, যিনি একজন পেশাদার সিভিল ইঞ্জিনিয়ার এবং যার কারিগরি জ্ঞান কোম্পানির নির্মাণ ও নকশা কাজের মূল চালিকাশক্তি।";
    if (leadershipText2) leadershipText2.textContent = "তাঁর নেতৃত্ব মূলত প্রকল্পের প্রয়োজন গভীরভাবে অনুধাবন, সাইটের বাস্তব পরিস্থিতি বিবেচনা এবং ভবন পরিকল্পনা ও বাস্তবায়নের প্রতিটি সিদ্ধান্তে প্রকৌশল জ্ঞান প্রয়োগে নিবেদিত।";
    if (leadershipText3) leadershipText3.textContent = "২০১৯ সালে প্রতিষ্ঠার পর থেকে বিইসি-র লক্ষ্য ছিল বাস্তব কাজের ওপর ভিত্তি করে একটি নির্ভরযোগ্য প্রতিষ্ঠান গড়ে তোলা এবং ক্লায়েন্টদের সাথে দীর্ঘস্থায়ী আস্থা তৈরি করা।";
    if (leadershipGoal) leadershipGoal.textContent = "বর্তমানে কোম্পানি তার ডিজিটাল উপস্থিতি জোরদার করছে যাতে চট্টগ্রামে প্রকৌশল, ডিজাইন ও নির্মাণ সেবা খুঁজছেন এমন মানুষের সাথে সহজে সংযোগ তৈরি করা যায়।";
    if (ceoNameElem) ceoNameElem.textContent = BDM_DATA.brand.leadership.bengaliName;
    if (ceoTitleElem) ceoTitleElem.textContent = BDM_DATA.brand.leadership.bengaliTitle;
    if (ceoCredElem) ceoCredElem.textContent = BDM_DATA.brand.leadership.bengaliCredentials;

    // Contact
    if (contactTag) contactTag.textContent = "প্রকল্প আলোচনা শুরু করুন";
    if (contactTitle) contactTitle.innerHTML = "চলুন কথা বলি<br><span class='gold-gradient-text'>আপনার পরবর্তী প্রকল্প নিয়ে।</span>";
    if (contactLead1) contactLead1.textContent = "আপনার কি কোনো খালি জমি, বাড়ি নির্মাণ, কোনো স্থান পুনর্নকশা বা সংস্কার করার পরিকল্পনা আছে?";
    if (contactLead2) contactLead2.textContent = "আমাদের সাথে কথা বলুন।";
    if (contactLead3) contactLead3.textContent = "আপনার ভাবনা আমাদের জানান। প্রকল্পের স্থান, প্রয়োজনীয়তা ও সম্ভাব্য বাজেট শেয়ার করুন—বিইসি টিম আপনার সাথে পরবর্তী পদক্ষেপ নিয়ে আলোচনা করবে।";
    if (formHeading) formHeading.textContent = "আপনার প্রকল্প সম্পর্কে জানান";
    if (formSubtext) formSubtext.textContent = "আপনার প্রয়োজনীয় তথ্য শেয়ার করুন। আমাদের প্রকৌশল টিম দ্রুত আপনার সাথে যোগাযোগ করবে।";
    if (btnSubmitText) btnSubmitText.textContent = "প্রকল্প আলোচনা শুরু করুন";
    if (finalBrandStatement) finalBrandStatement.innerHTML = "উদ্দেশ্যপূর্ণ নকশা।<br><span class='gold-gradient-text'>আস্থার সাথে নির্মাণ।</span>";
  } else {
    if (btnEn) btnEn.classList.add('active');
    if (btnBn) btnBn.classList.remove('active');

    // Hero
    if (heroEyebrow) heroEyebrow.textContent = BDM_DATA.brand.eyebrow;
    if (heroHeadline) heroHeadline.innerHTML = BDM_DATA.brand.headline;
    if (heroSubtext) heroSubtext.textContent = BDM_DATA.brand.heroDesc;
    if (heroCtaStart) heroCtaStart.textContent = "START YOUR PROJECT";
    if (heroCtaServices) heroCtaServices.innerHTML = `<span class='material-symbols-outlined' style='font-size: 18px;'>apps</span><span>EXPLORE SERVICES</span>`;
    if (tickerLeftText) tickerLeftText.textContent = "ESTABLISHED 2019 · CHATTOGRAM";
    if (tickerCenterText) tickerCenterText.innerHTML = "<span>DESIGN WITH PURPOSE. BUILD WITH CONFIDENCE.</span>";

    // About
    if (aboutTag) aboutTag.textContent = "WHO WE ARE";
    if (aboutTitle) aboutTitle.innerHTML = "A FOUNDATION BUILT ON ENGINEERING.";
    if (aboutLead) aboutLead.textContent = "Established in 2019, Brother’s Engineering & Construction is a Chattogram-based engineering and construction business focused on architectural design, structural design, interior design, consultancy and construction work.";
    if (aboutDesc1) aboutDesc1.textContent = "Since its establishment, BEC has been developing its business through offline operations and practical involvement in the local construction industry. Now, as the company expands its online presence, we aim to make our services easier to discover and our approach clearer to clients planning their next project.";
    if (aboutDesc2) aboutDesc2.textContent = "Led by Engr. Md. Shahidul Islam (Milad), a Civil Engineer holding a B.Sc. Engg. (Civil) qualification and FIEB credentials, BEC brings an engineering-led perspective to the planning and execution of building projects.";
    if (aboutDesc3) aboutDesc3.textContent = "Our approach is simple: understand the client's requirements, consider the practical realities of the project, and work toward a solution that balances design, functionality, construction requirements and budget.";
    if (aboutDesc4) aboutDesc4.textContent = "Whether the project begins with an idea, a plot of land, an architectural drawing or an existing property that needs improvement, BEC aims to provide the guidance and services needed to move it forward.";
    if (aboutQuote) aboutQuote.innerHTML = "Established in 2019. Locally rooted in Chattogram. Focused on better-built spaces.<br><span style='color: var(--color-champagne-dark); font-family: var(--font-mono); font-size: 0.8rem; display: block; margin-top: 0.5rem; letter-spacing: 0.05em;'>ONE VISION. ONE ACCOUNTABLE TEAM. FROM CONCEPT TO COMPLETION.</span>";
    if (aboutExpStatement) aboutExpStatement.textContent = "Established in 2019. Built on practical experience. Now bringing our capabilities online.";

    // Services
    if (servicesTag) servicesTag.textContent = "WHAT WE DO";
    if (servicesTitle) servicesTitle.textContent = "FROM THE FIRST DRAWING TO THE FINAL FINISH.";
    if (servicesSubline) servicesSubline.textContent = "ENGINEERING, DESIGN AND CONSTRUCTION SOLUTIONS.";
    if (servicesLead) servicesLead.textContent = "Every successful building project starts with thoughtful planning and depends on the quality of its execution. BEC offers engineering, design and construction services to help clients make informed decisions and move their projects from planning toward completion.";

    // Design-to-Build
    if (dtbTag) dtbTag.textContent = "THE BEC DIFFERENTIATOR";
    if (dtbTitle) dtbTitle.innerHTML = "ONE PROJECT.<br><span class='gold-gradient-text'>A CLEARER PATH FROM IDEA TO REALITY.</span>";
    if (dtbText1) dtbText1.textContent = "Planning a building project can involve many decisions, from design and engineering to materials, construction and interior finishing.";
    if (dtbText2) dtbText2.innerHTML = "Sometimes it starts with a piece of land.<br>Sometimes it starts with a drawing.<br>Sometimes it starts with a Pinterest image.<br>Sometimes it is simply an idea of how a space should feel.";
    if (dtbText3) dtbText3.textContent = "That is where we come in. BEC aims to make that process more manageable by helping clients understand the stages involved and coordinating the services required for their project:";

    // Who We Work With
    if (clientsTag) clientsTag.textContent = "WHO WE WORK WITH";
    if (clientsTitle) clientsTitle.textContent = "WHATEVER YOU'RE PLANNING TO BUILD, START WITH A CONVERSATION.";
    if (clientsLead) clientsLead.textContent = "From individual families and landholders to commercial businesses and project developers across Chattogram:";

    // Selected Work
    if (projectsTag) projectsTag.textContent = "SELECTED WORK";
    if (projectsTitle) projectsTitle.textContent = "WORK THAT STARTS WITH AN IDEA.";
    if (projectsDesc) projectsDesc.textContent = "Every project begins with a different set of requirements. Explore BEC's selected work to understand the kinds of spaces, design challenges and construction activities the company undertakes.";

    // Construction
    if (constructionTag) constructionTag.textContent = "CONSTRUCTION RIGOR";
    if (constructionTitle) constructionTitle.innerHTML = "GOOD DESIGN IS ONLY THE BEGINNING.";
    if (constructionText1) constructionText1.textContent = "A beautiful drawing is not a finished building.";
    if (constructionText2) constructionText2.textContent = "The real test begins on site. Our construction approach focuses on proper execution, coordination, material quality, workmanship and attention to the details that determine how a building performs over time.";

    // Interior
    if (interiorTag) interiorTag.textContent = "SPATIAL EXECUTION";
    if (interiorTitle) interiorTitle.textContent = "FROM STRUCTURE TO SPACE.";
    if (interiorText1) interiorText1.textContent = "We believe construction and interior should not feel like two completely separate projects.";
    if (interiorText2) interiorText2.textContent = "Our team carries the same design thinking from the building structure into the spaces people actually experience — balancing natural lighting, custom joinery, ergonomic flow, and durable materials.";

    // Trust
    if (trustTag) trustTag.textContent = "CREDIBILITY & ETHOS";
    if (trustTitle) trustTitle.textContent = "WHY WORK WITH BROTHER’S ENGINEERING & CONSTRUCTION?";
    if (trustLead) trustLead.textContent = "A professional engineering-led perspective grounded in real accountability, practical execution, and local understanding.";

    // Leadership
    if (leadershipTag) leadershipTag.textContent = "LEADERSHIP";
    if (leadershipTitle) leadershipTitle.textContent = "ENGINEERING KNOWLEDGE AT THE HEART OF EVERY PROJECT.";
    if (leadershipText1) leadershipText1.textContent = "Brother’s Engineering & Construction is led by Engr. Md. Shahidul Islam (Milad), a civil engineer whose professional background informs the company’s engineering-led approach to construction and design.";
    if (leadershipText2) leadershipText2.textContent = "His leadership focuses on understanding project requirements, considering practical site conditions and bringing engineering knowledge into decisions that affect how buildings are planned and executed.";
    if (leadershipText3) leadershipText3.textContent = "Since BEC’s establishment in 2019, the aim has been to build a business grounded in practical work, professional responsibility and long-term relationships with clients.";
    if (leadershipGoal) leadershipGoal.textContent = "Today, the company is strengthening its digital presence to communicate its capabilities more clearly and connect with more people looking for engineering, design and construction services in Chattogram.";
    if (ceoNameElem) ceoNameElem.textContent = BDM_DATA.brand.leadership.name;
    if (ceoTitleElem) ceoTitleElem.textContent = BDM_DATA.brand.leadership.title;
    if (ceoCredElem) ceoCredElem.textContent = BDM_DATA.brand.leadership.credentials;

    // Contact
    if (contactTag) contactTag.textContent = "START A CONVERSATION";
    if (contactTitle) contactTitle.innerHTML = "LET'S TALK ABOUT<br><span class='gold-gradient-text'>YOUR NEXT PROJECT.</span>";
    if (contactLead1) contactLead1.textContent = "Have a plot to develop, a building to construct, a space to redesign or an existing property to improve?";
    if (contactLead2) contactLead2.textContent = "Tell us what you have in mind.";
    if (contactLead3) contactLead3.textContent = "Share your project location, requirements and approximate budget, and the BEC team can discuss the next steps with you.";
    if (formHeading) formHeading.textContent = "TELL US ABOUT YOUR PROJECT";
    if (formSubtext) formSubtext.textContent = "Share your requirements and our engineering team will get back to you promptly.";
    if (btnSubmitText) btnSubmitText.textContent = "DISCUSS YOUR PROJECT";
    if (finalBrandStatement) finalBrandStatement.innerHTML = "DESIGN WITH PURPOSE.<br><span class='gold-gradient-text'>BUILD WITH CONFIDENCE.</span>";
  }

  // Re-render dynamic components with updated language
  renderCompanyFacts();
  renderServices();
  renderDesignToBuild();
  renderWhoWeWorkWith();
  renderProjectsList();
  renderTrustPillars();
  renderInteriorCategories();
}

/* ==========================================================================
   14. ENQUIRY FORM WORKFLOW
   ========================================================================== */
async function handleEnquirySubmit(e) {
  e.preventDefault();
  
  const name = document.getElementById('patron-name').value.trim();
  const phone = document.getElementById('patron-phone').value.trim();
  const service = document.getElementById('patron-service').value;
  const notes = document.getElementById('patron-notes').value.trim();
  const submitBtn = document.getElementById('btn-submit-project');
  const btnText = document.getElementById('btn-submit-text');

  if (!name || !phone) {
    alert("Please provide both your name and phone number.");
    return;
  }

  // Visual loading feedback
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';
  }
  if (btnText) {
    btnText.textContent = currentLanguage === 'en' ? "TRANSMITTING INQUIRY..." : "অনুরোধ পাঠানো হচ্ছে...";
  }

  try {
    // Send form data directly to company email: mail.brotherseng@gmail.com
    await fetch("https://formsubmit.co/ajax/mail.brotherseng@gmail.com", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        phone: phone,
        service: service,
        project_details: notes || "No additional notes specified.",
        _subject: `New Project Inquiry: ${service} - ${name}`,
        _template: "table"
      })
    });
  } catch (err) {
    console.warn("Form submission fallback:", err);
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
            ? `Your consultation request regarding <strong>${service}</strong> has been sent to <strong>mail.brotherseng@gmail.com</strong>. The BEC engineering team in Chattogram will connect with you at <strong>${phone}</strong> promptly.`
            : `<strong>${service}</strong> বিষয়ে আপনার পরামর্শ অনুরোধটি <strong>mail.brotherseng@gmail.com</strong>-এ পাঠানো হয়েছে। চট্টগ্রামের বিইসি প্রকৌশল টিম অতিশীঘ্রই <strong>${phone}</strong> নম্বরে আপনার সাথে যোগাযোগ করবে।`}
        </p>
        <div style="background: rgba(255,255,255,0.06); padding: 1.25rem; border-left: 2px solid var(--color-champagne); margin-top: 0.5rem;">
          <p class="body-sm" style='color: var(--color-champagne); font-weight: 600; margin: 0;'>
            ${isEn ? 'Direct Office Helplines: ' : 'সরাসরি কার্যালয় হেল্পলাইন: '}
          </p>
          <p class="body-sm" style='color: var(--color-ivory); margin: 0.25rem 0 0 0;'>
            <a href="tel:+8801828178962" style="color: var(--color-ivory); text-decoration: underline;">01828-178962</a> &nbsp;·&nbsp; 
            <a href="tel:+8801715065577" style="color: var(--color-ivory); text-decoration: underline;">01715-065577</a>
          </p>
          <p class="body-sm" style='color: rgba(244,240,232,0.8); margin: 0.5rem 0 0 0; font-size: 0.8rem;'>
            Email: <a href="mailto:mail.brotherseng@gmail.com" style="color: var(--color-champagne);">mail.brotherseng@gmail.com</a>
          </p>
        </div>
        <button class="btn btn-secondary" style='border-color: rgba(255,255,255,0.3); color: var(--color-ivory); margin-top: 1rem; align-self: flex-start;' onclick="window.location.reload()">
          <span>${isEn ? 'SUBMIT ANOTHER INQUIRY' : 'অন্য অনুসন্ধান পাঠান'}</span>
        </button>
      </div>
    `;
  }
}

/* ==========================================================================
   15. SMOOTH SCROLL FOR ALL ANCHORS
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
