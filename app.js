/* -------------------------------------------------------------
   Dhruthi Wellness - Core Application Logic
------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Navigation & Header Effects ---
  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navLinksList = document.getElementById('nav-links');
  const navLinks = document.querySelectorAll('.nav-links a');
  const themeToggle = document.getElementById('theme-toggle');

  // Load Saved Theme
  const savedTheme = localStorage.getItem('theme') || 'light';
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    if (themeToggle) {
      themeToggle.innerHTML = '<i data-lucide="sun" style="width: 18px; height: 18px;"></i>';
    }
  }

  // Theme Toggle Click Handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-theme');
      themeToggle.innerHTML = `<i data-lucide="${isDark ? 'sun' : 'moon'}" style="width: 18px; height: 18px;"></i>`;
      lucide.createIcons();
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      showToast(`${isDark ? 'Dark' : 'Light'} mode enabled!`, 'success');
    });
  }

  // Add background shadow to header on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Toggle mobile navigation menu
  navToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
  });

  // Close mobile nav when clicking a link
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
    });
  });

  // Update active navigation link based on section scroll position
  function updateActiveNavLink() {
    let current = '';
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 120; // offset

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }


  // --- 2. Consultation Search & Filter (Disabled for Single Practitioner) ---
  // Search and filter inputs have been removed from index.html to reflect Akhila's single practitioner setup.


  // --- 3. Calorie & Macro Calculator ---
  // Calculator section has been removed from the website layout.


  // --- 5. Booking Modal & Consultation Appointments ---
  const bookingModal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const bookingForm = document.getElementById('booking-form');
  const calendarMonthHeading = document.getElementById('calendar-month-heading');
  const bookingExpertAvatar = document.getElementById('booking-expert-avatar');
  const bookingExpertName = document.getElementById('booking-expert-name');
  const bookingExpertTitle = document.getElementById('booking-expert-title');

  const todayObj = new Date();
  const currentMonthName = todayObj.toLocaleString('default', { month: 'long' });
  const currentYear = todayObj.getFullYear();
  const currentDayNum = todayObj.getDate();

  let selectedDate = String(currentDayNum);
  let selectedTime = '11:00 AM';
  let serverBookedSlots = [];

  // Fetch booked slots from backend API
  async function loadBookedSlots() {
    try {
      const res = await fetch('/api/booked-slots');
      if (res.ok) {
        const data = await res.json();
        if (data && data.bookedSlots) {
          serverBookedSlots = data.bookedSlots;
        }
      }
    } catch (e) {
      console.warn('Could not fetch booked slots from API, using local storage fallback.', e);
    }
    updateSlotsAvailability();
  }

  // Get combined booked slots (Server DB + LocalStorage)
  function getAllBookedSlots() {
    const localBooked = JSON.parse(localStorage.getItem('dhruthi_booked_slots') || '[]');
    return [...serverBookedSlots, ...localBooked];
  }

  // Render & setup calendar dates
  function initCalendar() {
    if (calendarMonthHeading) {
      calendarMonthHeading.textContent = `${currentMonthName} ${currentYear}`;
    }
    const calendarDates = document.querySelectorAll('.calendar-days .cal-date');
    
    calendarDates.forEach(dateElement => {
      const dayVal = parseInt(dateElement.getAttribute('data-date'), 10);
      if (isNaN(dayVal)) return;

      dateElement.classList.remove('past', 'disabled', 'today');

      if (dayVal < currentDayNum) {
        // Disable past completed days
        dateElement.classList.add('past', 'disabled');
      } else if (dayVal === currentDayNum) {
        dateElement.classList.add('today');
      }

      dateElement.addEventListener('click', () => {
        if (dateElement.classList.contains('disabled') || dateElement.classList.contains('past') || dateElement.classList.contains('empty')) {
          return;
        }
        document.querySelectorAll('.calendar-days .cal-date').forEach(d => d.classList.remove('active'));
        dateElement.classList.add('active');
        selectedDate = String(dayVal);
        updateSlotsAvailability();
      });
    });

    // Default select today if valid
    const todayElem = document.querySelector(`.calendar-days .cal-date[data-date="${currentDayNum}"]`);
    if (todayElem && !todayElem.classList.contains('disabled')) {
      document.querySelectorAll('.calendar-days .cal-date').forEach(d => d.classList.remove('active'));
      todayElem.classList.add('active');
      selectedDate = String(currentDayNum);
    }
  }

  // Helper to check if slot time has passed today
  function isTimePassedToday(timeStr) {
    const now = new Date();
    const [timePart, modifier] = timeStr.split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const slotDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes);
    return now >= slotDate;
  }

  // Update slot availability based on booked slots and present time
  function updateSlotsAvailability() {
    const slotBtns = document.querySelectorAll('.slots-list .slot-btn');
    const allBooked = getAllBookedSlots();

    let firstAvailableSlot = null;

    slotBtns.forEach(slot => {
      const timeVal = slot.getAttribute('data-time');
      slot.classList.remove('disabled', 'booked', 'passed');
      slot.style.pointerEvents = '';

      // Check 1: Is slot booked for this date?
      const isBooked = allBooked.some(b => {
        const bd = (b.booking_date || b.date || '').toLowerCase();
        const bt = (b.booking_time || b.time || '').toLowerCase();
        return bd.includes(`${currentMonthName.toLowerCase()} ${selectedDate}`) && bt.includes(timeVal.toLowerCase());
      });

      // Check 2: Has slot passed today?
      const isPassed = (parseInt(selectedDate, 10) === currentDayNum) && isTimePassedToday(timeVal);

      if (isBooked) {
        slot.classList.add('disabled', 'booked');
        slot.textContent = `${timeVal} (Booked)`;
      } else if (isPassed) {
        slot.classList.add('disabled', 'passed');
        slot.textContent = `${timeVal} (Passed)`;
      } else {
        slot.textContent = `${timeVal} (IST)`;
        if (!firstAvailableSlot) {
          firstAvailableSlot = timeVal;
        }
      }
    });

    // Auto-select first available slot if currently active slot is disabled
    const activeSlotBtn = Array.from(slotBtns).find(s => s.getAttribute('data-time') === selectedTime);
    if (!activeSlotBtn || activeSlotBtn.classList.contains('disabled')) {
      slotBtns.forEach(s => s.classList.remove('active'));
      if (firstAvailableSlot) {
        selectedTime = firstAvailableSlot;
        const newActiveBtn = Array.from(slotBtns).find(s => s.getAttribute('data-time') === firstAvailableSlot);
        if (newActiveBtn) newActiveBtn.classList.add('active');
      } else {
        selectedTime = '';
      }
    }
  }

  // Setup Slot button click handlers
  function initSlotButtons() {
    const slotBtns = document.querySelectorAll('.slots-list .slot-btn');
    slotBtns.forEach(slot => {
      slot.addEventListener('click', () => {
        if (slot.classList.contains('disabled')) return;
        slotBtns.forEach(s => s.classList.remove('active'));
        slot.classList.add('active');
        selectedTime = slot.getAttribute('data-time');
      });
    });
  }

  initCalendar();
  initSlotButtons();
  loadBookedSlots();

  // Handle booking click for package cards and hero card
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.book-btn');
    if (btn) {
      e.preventDefault();
      const expertName = btn.getAttribute('data-expert') || 'Dt. Akhila Konakalla - Consultation';
      const expertImg = btn.getAttribute('data-image') || 'Images/coverimage.png';
      const expertTitle = btn.getAttribute('data-title') || 'Personalized Nutrition Consultation';

      // Setup Modal data
      if (bookingExpertName) bookingExpertName.textContent = expertName;
      if (bookingExpertAvatar) {
        bookingExpertAvatar.src = expertImg;
        bookingExpertAvatar.alt = expertName;
      }
      if (bookingExpertTitle) bookingExpertTitle.textContent = expertTitle;

      // Refresh slot state
      loadBookedSlots();

      // Open Modal
      if (bookingModal) {
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }
  });

  // Close modal click handler
  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (bookingModal) {
    bookingModal.addEventListener('click', (e) => {
      if (e.target === bookingModal) closeModal();
    });
  }

  function closeModal() {
    if (bookingModal) bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  }

  // Helper function to export leads to Excel (CSV)
  window.exportDhruthiLeads = function() {
    const leads = JSON.parse(localStorage.getItem('dhruthi_leads') || '[]');
    if (leads.length === 0) {
      showToast('No enquiries/leads recorded in browser storage yet.', 'warning');
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Client Name,Phone,Email,Program,Date,Time,Notes\n";
    leads.forEach(l => {
      csvContent += `"${l.timestamp}","${l.name}","${l.phone}","${l.email}","${l.program}","${l.date}","${l.time}","${(l.message || '').replace(/"/g, '""')}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Dhruthi_Wellness_Leads_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Form Submission — Connects to WhatsApp & Excel Leads Storage
  if (bookingForm) {
    bookingForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('booking-name').value.trim();
      const phone = document.getElementById('booking-phone').value.trim();
      const email = document.getElementById('booking-email').value.trim();
      const message = document.getElementById('booking-message').value.trim();

      if (!name || !phone || !email) {
        showToast('Please enter your Name, Phone, and Email.', 'danger');
        return;
      }

      if (!selectedTime) {
        showToast('Selected date/time slot is no longer available. Please select another slot.', 'warning');
        return;
      }

      const programName = bookingExpertName ? bookingExpertName.textContent : 'Consultation';
      const programTitle = bookingExpertTitle ? bookingExpertTitle.textContent : 'Personalized Nutrition';
      const bookingDateStr = `${currentMonthName} ${selectedDate}, ${currentYear}`;

      // 1. Store lead in Local Storage
      const leadEntry = {
        timestamp: new Date().toLocaleString(),
        name,
        phone,
        email,
        program: `${programName} - ${programTitle}`,
        date: bookingDateStr,
        time: selectedTime,
        message
      };
      const existingLeads = JSON.parse(localStorage.getItem('dhruthi_leads') || '[]');
      existingLeads.push(leadEntry);
      localStorage.setItem('dhruthi_leads', JSON.stringify(existingLeads));

      // 2. Lock booked slot in Local Storage
      const existingBooked = JSON.parse(localStorage.getItem('dhruthi_booked_slots') || '[]');
      existingBooked.push({ date: bookingDateStr, time: selectedTime });
      localStorage.setItem('dhruthi_booked_slots', JSON.stringify(existingBooked));

      // 3. Prepare WhatsApp direct enquiry link
      const waNumber = '918688963230';
      const waMsg = `*New Consultation Enquiry — Dhruthi Wellness*\n\n` +
        `👤 *Name:* ${name}\n` +
        `📞 *Phone:* ${phone}\n` +
        `✉️ *Email:* ${email}\n` +
        `🌿 *Program:* ${programName} (${programTitle})\n` +
        `📅 *Date:* ${bookingDateStr}\n` +
        `⏰ *Preferred Slot:* ${selectedTime}\n` +
        (message ? `📝 *Notes:* ${message}\n` : '') +
        `\n_Hi Dt. Akhila, I have submitted my booking request on the website. Please confirm my free consultation appointment!_`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

      // 4. Send payload to Backend API
      const payload = {
        expert_name: programName,
        program_title: programTitle,
        client_name: name,
        client_email: email,
        client_phone: phone,
        booking_date: bookingDateStr,
        booking_time: selectedTime,
        client_message: message
      };

      try {
        await fetch('/api/book', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Backend API note:', err);
      }

      closeModal();
      showToast(`Appointment enquiry submitted! Opening WhatsApp to connect directly...`, 'success');
      bookingForm.reset();

      // Refresh slots
      loadBookedSlots();

      // Open WhatsApp chat with prefilled details
      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);
    });
  }


  // --- 6. Contact Form Submission Handler ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('contact-msg').value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill out all contact form fields.', 'danger');
        return;
      }

      // 1. Store lead in Local Storage (Excel exportable)
      const leadEntry = {
        timestamp: new Date().toLocaleString(),
        name,
        phone: 'N/A',
        email,
        program: 'Quick Message Inquiry',
        date: 'N/A',
        time: 'N/A',
        message: msg
      };
      const existingLeads = JSON.parse(localStorage.getItem('dhruthi_leads') || '[]');
      existingLeads.push(leadEntry);
      localStorage.setItem('dhruthi_leads', JSON.stringify(existingLeads));

      // 2. Prepare WhatsApp direct message link
      const waNumber = '918688963230';
      const waMsg = `*New Website Inquiry — Dhruthi Wellness*\n\n` +
        `👤 *Name:* ${name}\n` +
        `✉️ *Email:* ${email}\n` +
        `📝 *Health Concerns / Goals:* ${msg}\n\n` +
        `_Hi Dt. Akhila, I submitted a quick message inquiry on your website. Please connect with me!_`;

      const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`;

      // 3. Send payload to Backend API
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            client_name: name,
            client_email: email,
            subject: 'Quick Message Inquiry',
            message: msg
          })
        });
      } catch (err) {
        console.warn('Contact API note:', err);
      }

      showToast(`Thank you, ${name}! Opening WhatsApp to send your inquiry directly...`, 'success');
      contactForm.reset();

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 600);
    });
  }


  // --- 8. Testimonials Load & Render ---
  const testimonialsList = document.getElementById('testimonials-list');

  // Load reviews from backend database
  async function loadReviews() {
    if (!testimonialsList) return;
    try {
      const res = await fetch('/api/reviews');
      if (!res.ok) throw new Error('Failed to fetch reviews');
      const data = await res.json();
      if (data && data.length > 0) {
        data.forEach(review => {
          renderReviewCard(review, true); // prepend database reviews
        });
      }
    } catch (err) {
      console.warn('Could not load reviews from database, using static fallback.', err);
    }
  }

  function renderReviewCard(review, prepend = true) {
    const card = document.createElement('div');
    const catSlug = (review.category || 'lifestyle').toLowerCase().replace(/[^a-z0-9]/g, '-');
    card.className = 'testi-card glass-card story-item';
    card.setAttribute('data-category', catSlug);
    const firstLetter = (review.author_name || 'U').charAt(0).toUpperCase();
    
    let stars = '';
    for (let i = 0; i < 5; i++) {
      stars += i < review.rating ? '★' : '☆';
    }

    card.innerHTML = `
      <div class="testi-header">
        <div class="testi-stars">${stars}</div>
        <div class="testi-badges">
          <span class="source-badge">Verified Review</span>
          <span class="cat-badge">${review.category || 'Client Care'}</span>
        </div>
      </div>
      <p class="testi-text">"${review.message}"</p>
      <div class="testi-author">
        <div class="testi-avatar">${firstLetter}</div>
        <div>
          <h4 class="testi-name">${review.author_name}</h4>
          <p class="testi-info">${review.category || 'Nutrition Client'}</p>
        </div>
      </div>
    `;

    if (prepend) {
      testimonialsList.insertBefore(card, testimonialsList.firstChild);
    } else {
      testimonialsList.appendChild(card);
    }
  }

  // Initial load
  loadReviews();

  // --- Category Filter Chips Handler ---
  const filterChips = document.querySelectorAll('#story-filter-chips .filter-chip');

  if (filterChips.length > 0) {
    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const cat = chip.getAttribute('data-category');
        const storyItems = document.querySelectorAll('.story-item');

        storyItems.forEach(item => {
          const itemCat = item.getAttribute('data-category') || '';
          if (cat === 'all' || itemCat.includes(cat)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // --- Lightbox Modal Logic for Proof Screenshots ---
  const proofCards = document.querySelectorAll('.proof-card');
  const lightboxModal = document.getElementById('proof-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close-btn');
  const lightboxPrev = document.getElementById('lightbox-prev-btn');
  const lightboxNext = document.getElementById('lightbox-next-btn');

  let currentProofIndex = 0;
  const visibleProofs = [];

  function updateVisibleProofs() {
    visibleProofs.length = 0;
    document.querySelectorAll('.proof-card').forEach((card) => {
      if (card.style.display !== 'none') {
        visibleProofs.push(card);
      }
    });
  }

  function openLightbox(index) {
    updateVisibleProofs();
    if (visibleProofs.length === 0) return;
    currentProofIndex = (index + visibleProofs.length) % visibleProofs.length;

    const targetCard = visibleProofs[currentProofIndex];
    if (lightboxImg) lightboxImg.src = targetCard.getAttribute('data-src');
    if (lightboxCaption) lightboxCaption.textContent = targetCard.getAttribute('data-caption') || '';
    if (lightboxModal) lightboxModal.classList.add('active');
  }

  function closeLightbox() {
    if (lightboxModal) lightboxModal.classList.remove('active');
  }

  if (proofCards.length > 0 && lightboxModal) {
    proofCards.forEach((card) => {
      card.addEventListener('click', () => {
        updateVisibleProofs();
        const activeIdx = visibleProofs.indexOf(card);
        openLightbox(activeIdx >= 0 ? activeIdx : 0);
      });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
      lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(currentProofIndex - 1);
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        openLightbox(currentProofIndex + 1);
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal || e.target.classList.contains('lightbox-content')) {
        closeLightbox();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (!lightboxModal.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') openLightbox(currentProofIndex - 1);
      if (e.key === 'ArrowRight') openLightbox(currentProofIndex + 1);
    });
  }


  // --- 9. Healthy Living Blog Articles & Modal Logic ---
  const blogArticles = {
    '1': {
      title: 'Managing Diabetes: The Role of Glycemic Load',
      category: 'Hormonal Endocrinology',
      readTime: '5 min read',
      date: 'June 27, 2026',
      img: 'https://images.unsplash.com/photo-1505576399279-565b52d4ac71?auto=format&fit=crop&w=600&h=350&q=80',
      body: `
        <p>Blood sugar regulation and diabetes management are often oversimplified as "cutting out sugar." In customized nutrition practice, the key to glycemic stability lies in managing the <strong>glycemic load</strong> of your overall diet.</p>
        <h3>Understanding Glycemic Index vs. Glycemic Load</h3>
        <p>While Glycemic Index (GI) tells you how fast a carbohydrate turns into glucose, Glycemic Load (GL) takes portion size into account. A food can have a high GI but a low GL if the amount of carbohydrates in a typical serving is very low. By focusing on low-GL combinations, you prevent insulin spikes and maintain stable blood sugar levels throughout the day.</p>
        <h3>Customized Management Strategies</h3>
        <p>To successfully regulate diabetes and insulin sensitivity:</p>
        <ul>
          <li><strong>Combine Carbs with Fiber and Protein:</strong> Never eat "naked" carbs. Always pair grains with fiber-rich legumes and high-quality protein to slow digestion.</li>
          <li><strong>Portion Control and Timing:</strong> Consistent carbohydrate distribution prevents pancreatic stress and insulin resistance spikes.</li>
          <li><strong>Regular Glycemic Marker Audits:</strong> Track pre- and post-meal glucose logs to fine-tune your personalized food charts.</li>
        </ul>
        <p>For a tailored customized program, book a session with Dr. Akhila to design a customized plan based on your blood reports!</p>
      `
    },
    '2': {
      title: 'Reversing PCOD/PCOS: Nutritional Interventions',
      category: 'Hormonal Health',
      readTime: '6 min read',
      date: 'June 27, 2026',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=350&q=80',
      body: `
        <p>Polycystic Ovary Syndrome (PCOD/PCOS) is primarily an endocrine disorder, closely linked to insulin resistance and chronic low-grade inflammation. While lifestyle modifications are the first-line therapy, nutritional interventions play a key role in regulating ovulation, cycles, and weight.</p>
        <h3>The Insulin Connection</h3>
        <p>Up to 70% of women with PCOD/PCOS have insulin resistance. When insulin levels are chronically elevated, it signals the ovaries to produce excess androgens (like testosterone), leading to symptoms like hirsutism, acne, and irregular periods. Designing a low-insulin-spike customized diet is crucial to breaking this cycle.</p>
        <h3>Our PCOD/PCOS Nutritional Protocol</h3>
        <ul>
          <li><strong>Anti-inflammatory Foods:</strong> Incorporating omega-3 fats, colorful vegetables, and antioxidant-rich seeds to curb chronic inflammation.</li>
          <li><strong>Low Glycemic Load Complex Carbs:</strong> High-fiber grains (like millets and oats) paired with high-quality plant and dairy proteins.</li>
          <li><strong>Targeted Micronutrient Supplementation:</strong> Calibrating Vitamin D, Inositol, and Magnesium intake to improve insulin sensitivity.</li>
        </ul>
        <p>To reverse your PCOD/PCOS symptoms naturally, schedule a customized consultation with Dr. Akhila Konakalla today!</p>
      `
    },
    '3': {
      title: 'Thyroid Wellness: Unlocking Your Metabolic Potential',
      category: 'Thyroid Support',
      readTime: '4 min read',
      date: 'June 27, 2026',
      img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&h=350&q=80',
      body: `
        <p>Your thyroid gland is the master controller of your metabolic rate. When thyroid hormone production slows down (hypothyroidism), it can lead to unexplained weight gain, chronic fatigue, brain fog, and hair loss. Optimizing your thyroid requires targeted micronutrient support.</p>
        <h3>Key Nutrients for Thyroid Conversion</h3>
        <p>Your body needs specific building blocks to synthesize thyroid hormones (T4) and convert them to the active form (T3):</p>
        <ul>
          <li><strong>Selenium & Zinc:</strong> Crucial catalysts for the deiodinase enzymes that convert T4 to active T3.</li>
          <li><strong>Goitrogen Management:</strong> Restricting raw cruciferous vegetables and soy items that interfere with iodine uptake.</li>
          <li><strong>Metabolic Calorie Calibrations:</strong> Preventing severe caloric restrictions that signal your thyroid to slow down metabolism.</li>
        </ul>
        <p>Unlock your energy and optimize thyroid function by booking a specialized consultation with Dr. Akhila!</p>
      `
    },
    '4': {
      title: 'Optimizing Fertility: Evidence-Based Nutrition for Conception',
      category: 'Fertility Nutrition',
      readTime: '5 min read',
      date: 'August 7, 2026',
      img: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&h=350&q=80',
      body: `
        <p>Conception and reproductive wellness are deeply connected to cellular nutrition, hormonal balance, and metabolic health. Whether you are planning a pregnancy naturally or preparing for assisted reproductive treatments (IVF/IUI), tailored dietary interventions build a strong foundation for fertility.</p>
        <h3>Key Nutritional Pillars for Fertility Optimization</h3>
        <p>Nutrient-dense foods help regulate egg quality, optimize endometrial thickness, and balance reproductive hormone pathways:</p>
        <ul>
          <li><strong>Antioxidant-Rich Foods:</strong> Berries, leafy greens, nuts, and seeds fight oxidative stress in reproductive cells and support mitochondrial energy in eggs.</li>
          <li><strong>Healthy Essential Fats:</strong> Omega-3 fatty acids from walnuts, flaxseeds, and clean sources support pelvic blood flow and reduce systemic inflammation.</li>
          <li><strong>Micronutrient Synergies:</strong> Folate (B9), Vitamin D, Zinc, and Selenium play essential roles in hormone synthesis, ovulation regularity, and early embryonic development.</li>
          <li><strong>Blood Sugar Regulation:</strong> Preventing glucose and insulin spikes balances LH/FSH ratios and supports predictable ovulation cycles.</li>
        </ul>
        <h3>Personalized Preconception Care</h3>
        <p>Every fertility journey is unique. A tailored meal protocol addresses your specific blood biomarkers, cycle patterns, and nutritional needs.</p>
        <p>To prepare your body for a healthy conception journey, book a specialized Fertility Consultation with Dt. Akhila Konakalla today!</p>
      `
    }
  };

  const blogModal = document.getElementById('blog-modal');
  const blogModalCloseBtn = document.getElementById('blog-modal-close-btn');
  const blogReadButtons = document.querySelectorAll('.blog-read-btn');

  // Modal open trigger
  blogReadButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const articleId = btn.getAttribute('data-article');
      const article = blogArticles[articleId];
      
      if (!article || !blogModal) return;

      // Populate Modal Fields
      document.getElementById('blog-modal-category').textContent = article.category;
      document.getElementById('blog-modal-title').textContent = article.title;
      document.getElementById('blog-modal-date').textContent = article.date;
      document.getElementById('blog-modal-read-time').textContent = article.readTime;
      document.getElementById('blog-modal-img').src = article.img;
      document.getElementById('blog-modal-img').alt = article.title;
      document.getElementById('blog-modal-body').innerHTML = article.body;

      // Show Modal
      blogModal.classList.add('active');
    });
  });

  // Modal close trigger
  if (blogModalCloseBtn && blogModal) {
    blogModalCloseBtn.addEventListener('click', () => {
      blogModal.classList.remove('active');
    });

    blogModal.addEventListener('click', (e) => {
      if (e.target === blogModal) {
        blogModal.classList.remove('active');
      }
    });
  }


  // --- 10. Pricing Plan Duration Tab Switcher ---
  const planTabBtns = document.querySelectorAll('.plan-tab-btn');
  const planPrices = {
    '1': {
      pro: { strike: '₹2,599', promo: '₹1,299', discount: '50% OFF' },
      elite: { strike: '₹3,399', promo: '₹1,699', discount: '50% OFF' },
      preconception: { strike: '₹3,999', promo: '₹1,999', discount: '50% OFF' }
    },
    '3': {
      pro: { strike: '₹7,799', promo: '₹3,699', discount: '53% OFF' },
      elite: { strike: '₹10,194', promo: '₹4,899', discount: '52% OFF' },
      preconception: { strike: '₹11,994', promo: '₹5,799', discount: '52% OFF' }
    },
    '6': {
      pro: { strike: '₹15,999', promo: '₹6,499', discount: '59% OFF' },
      elite: { strike: '₹20,999', promo: '₹8,499', discount: '60% OFF' },
      preconception: { strike: '₹23,999', promo: '₹9,999', discount: '58% OFF' }
    }
  };

  planTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      planTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const duration = btn.getAttribute('data-duration');
      const data = planPrices[duration];
      if (!data) return;

      // Update Pro card
      const proStrike = document.getElementById('price-pro-strike');
      const proPromo = document.getElementById('price-pro-promo');
      const proBadge = document.getElementById('price-pro-badge');
      if (proStrike && proPromo && proBadge) {
        proStrike.textContent = data.pro.strike;
        proPromo.textContent = data.pro.promo;
        proBadge.textContent = data.pro.discount;
      }

      // Update Elite card
      const eliteStrike = document.getElementById('price-elite-strike');
      const elitePromo = document.getElementById('price-elite-promo');
      const eliteBadge = document.getElementById('price-elite-badge');
      if (eliteStrike && elitePromo && eliteBadge) {
        eliteStrike.textContent = data.elite.strike;
        elitePromo.textContent = data.elite.promo;
        eliteBadge.textContent = data.elite.discount;
      }

      // Update Preconception card
      const precStrike = document.getElementById('price-prec-strike');
      const precPromo = document.getElementById('price-prec-promo');
      const precBadge = document.getElementById('price-prec-badge');
      if (precStrike && precPromo && precBadge) {
        precStrike.textContent = data.preconception.strike;
        precPromo.textContent = data.preconception.promo;
        precBadge.textContent = data.preconception.discount;
      }
    });
  });


  // --- 11. Visual Guide Carousel Slider ---
  const carouselImg = document.getElementById('carousel-main-img');
  const carouselPrev = document.getElementById('carousel-prev');
  const carouselNext = document.getElementById('carousel-next');
  const carouselCounter = document.getElementById('carousel-counter');
  const carouselThumbs = document.querySelectorAll('.carousel-thumb-img');

  if (carouselImg && carouselThumbs.length > 0) {
    let currentIndex = 0;
    const slides = Array.from(carouselThumbs).map(t => t.getAttribute('src'));

    function updateCarousel(index) {
      currentIndex = (index + slides.length) % slides.length;
      carouselImg.src = slides[currentIndex];
      if (carouselCounter) {
        carouselCounter.textContent = (currentIndex + 1).toString();
      }

      carouselThumbs.forEach((thumb, i) => {
        if (i === currentIndex) {
          thumb.style.borderColor = 'var(--primary)';
          thumb.style.opacity = '1';
          thumb.classList.add('active');
        } else {
          thumb.style.borderColor = 'transparent';
          thumb.style.opacity = '0.75';
          thumb.classList.remove('active');
        }
      });
    }

    if (carouselPrev) {
      carouselPrev.addEventListener('click', () => updateCarousel(currentIndex - 1));
    }
    if (carouselNext) {
      carouselNext.addEventListener('click', () => updateCarousel(currentIndex + 1));
    }

    carouselThumbs.forEach((thumb, i) => {
      thumb.addEventListener('click', () => updateCarousel(i));
    });
  }


  // --- 12. Star Rating & Review Submission Handler ---
  const starContainer = document.getElementById('review-stars-container');
  let selectedRating = 5;

  if (starContainer) {
    const starBtns = starContainer.querySelectorAll('.star-btn');
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'));
        selectedRating = rating;
        starBtns.forEach(star => {
          const starVal = parseInt(star.getAttribute('data-rating'));
          if (starVal <= rating) {
            star.style.color = '#f59e0b';
            star.classList.add('active');
          } else {
            star.style.color = '#cbd5e1';
            star.classList.remove('active');
          }
        });
      });
    });
  }

  // Helper function to export reviews to Excel (CSV)
  window.exportDhruthiReviews = function() {
    const reviews = JSON.parse(localStorage.getItem('dhruthi_reviews') || '[]');
    if (reviews.length === 0) {
      showToast('No reviews recorded in browser storage yet.', 'warning');
      return;
    }
    let csvContent = "data:text/csv;charset=utf-8,Timestamp,Author Name,Program Category,Rating,Message\n";
    reviews.forEach(r => {
      csvContent += `"${r.timestamp}","${r.author_name}","${r.category}","${r.rating}","${(r.message || '').replace(/"/g, '""')}"\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Dhruthi_Wellness_Reviews_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value.trim();
      const category = document.getElementById('review-category').value.trim();
      const msg = document.getElementById('review-msg').value.trim();

      if (!name || !category || !msg) {
        showToast('Please fill out all review form fields.', 'danger');
        return;
      }

      const payload = {
        timestamp: new Date().toLocaleString(),
        author_name: name,
        category: category,
        rating: selectedRating,
        message: msg
      };

      // 1. Store in Local Storage for Excel CSV download
      const existingReviews = JSON.parse(localStorage.getItem('dhruthi_reviews') || '[]');
      existingReviews.push(payload);
      localStorage.setItem('dhruthi_reviews', JSON.stringify(existingReviews));

      // 2. Send payload to Backend API (logs to reviews.csv & Supabase)
      try {
        await fetch('/api/reviews', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } catch (err) {
        console.warn('Submit review offline note:', err);
      }

      // Private saving (NOT rendering live on website layout)
      showToast('Thank you! Your feedback has been saved to your Excel reviews sheet.', 'success');
      reviewForm.reset();
    });
  }


  // --- 13. Toast Notification Engine ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'danger' ? 'danger-toast' : ''}`;
    
    if (type === 'danger') {
      toast.style.borderColor = '#ef4444';
    }

    toast.innerHTML = `
      <div class="toast-icon" style="background: ${type === 'danger' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(16, 185, 129, 0.15)'}; color: ${type === 'danger' ? '#ef4444' : '#10b981'};">
        ${type === 'danger' ? '!' : '✓'}
      </div>
      <div>${message}</div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('active');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }

});



