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
  const calendarDates = document.querySelectorAll('.calendar-days .cal-date');
  const slotBtns = document.querySelectorAll('.slots-list .slot-btn');
  const bookingExpertAvatar = document.getElementById('booking-expert-avatar');
  const bookingExpertName = document.getElementById('booking-expert-name');
  const bookingExpertTitle = document.getElementById('booking-expert-title');

  let selectedDate = '1';
  let selectedTime = '09:00 AM';

  // Handle booking click for package cards and hero card
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('book-btn')) {
      const btn = e.target;
      const expertName = btn.getAttribute('data-expert');
      const expertImg = btn.getAttribute('data-image');
      const expertTitle = btn.getAttribute('data-title');

      // Setup Modal data
      bookingExpertName.textContent = expertName;
      bookingExpertAvatar.src = expertImg;
      bookingExpertAvatar.alt = expertName;
      bookingExpertTitle.textContent = expertTitle;

      // Open Modal
      bookingModal.classList.add('active');
      document.body.style.overflow = 'hidden'; // stop scroll under
    }
  });

  // Close modal click handler
  closeBtn.addEventListener('click', closeModal);
  bookingModal.addEventListener('click', (e) => {
    if (e.target === bookingModal) closeModal();
  });

  function closeModal() {
    bookingModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // restore scroll
  }

  // Calendar click handler
  calendarDates.forEach(date => {
    date.addEventListener('click', () => {
      if (date.classList.contains('empty')) return;
      calendarDates.forEach(d => d.classList.remove('active'));
      date.classList.add('active');
      selectedDate = date.getAttribute('data-date');
    });
  });

  // Slots click handler
  slotBtns.forEach(slot => {
    slot.addEventListener('click', () => {
      slotBtns.forEach(s => s.classList.remove('active'));
      slot.classList.add('active');
      selectedTime = slot.getAttribute('data-time');
    });
  });

  // Form Submission
  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('booking-email').value;

    if (!email) {
      showToast('Please enter a valid email address.', 'danger');
      return;
    }

    // Success action
    closeModal();
    showToast(`Appointment confirmed with ${bookingExpertName.textContent} on June ${selectedDate}, 2026 at ${selectedTime}!`, 'success');
    
    // Reset form fields
    bookingForm.reset();
  });


  // --- 6. Contact Form Submission Handler ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const msg = document.getElementById('contact-msg').value.trim();

      if (!name || !email || !msg) {
        showToast('Please fill out all contact form fields.', 'danger');
        return;
      }

      showToast(`Thank you, ${name}! Your inquiry has been sent successfully.`, 'success');
      contactForm.reset();
    });
  }


  // --- 7. Star Rating Interaction Logic ---
  const starContainer = document.getElementById('review-stars-container');
  let selectedRating = 5; // Default rating

  if (starContainer) {
    const starBtns = starContainer.querySelectorAll('.star-btn');
    
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const rating = parseInt(btn.getAttribute('data-rating'));
        selectedRating = rating;
        
        // Update visual stars state
        starBtns.forEach(star => {
          const starVal = parseInt(star.getAttribute('data-rating'));
          if (starVal <= rating) {
            star.classList.add('active');
          } else {
            star.classList.remove('active');
          }
        });
      });
    });
  }


  // --- 8. Testimonials Review Form Submission ---
  const reviewForm = document.getElementById('review-form');
  const testimonialsList = document.getElementById('testimonials-list');

  if (reviewForm && testimonialsList) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('review-name').value.trim();
      const category = document.getElementById('review-category').value.trim();
      const msg = document.getElementById('review-msg').value.trim();

      if (!name || !category || !msg) {
        showToast('Please fill out all review form fields.', 'danger');
        return;
      }

      // Construct star string
      let stars = '';
      for (let i = 0; i < 5; i++) {
        stars += i < selectedRating ? '★' : '☆';
      }

      // Create new review card element
      const card = document.createElement('div');
      card.className = 'testi-card';
      
      // Get first letter for avatar
      const firstLetter = name.charAt(0).toUpperCase();

      card.innerHTML = `
        <div class="testi-stars">${stars}</div>
        <p class="testi-text">"${msg}"</p>
        <div class="testi-author">
          <div class="testi-avatar">${firstLetter}</div>
          <div>
            <h4 class="testi-name">${name}</h4>
            <p class="testi-info">${category}</p>
          </div>
        </div>
      `;

      // Prepend to list
      testimonialsList.insertBefore(card, testimonialsList.firstChild);

      // Scroll list to show new review
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

      // Reset Form
      reviewForm.reset();
      
      // Reset Stars to 5
      selectedRating = 5;
      if (starContainer) {
        const starBtns = starContainer.querySelectorAll('.star-btn');
        starBtns.forEach(star => star.classList.add('active'));
      }

      showToast('Thank you! Your review has been added successfully.', 'success');
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
      title: 'Reversing PCOS/PCOD: Nutritional Interventions',
      category: 'Hormonal Health',
      readTime: '6 min read',
      date: 'June 27, 2026',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=350&q=80',
      body: `
        <p>Polycystic Ovary Syndrome (PCOS/PCOD) is primarily an endocrine disorder, closely linked to insulin resistance and chronic low-grade inflammation. While lifestyle modifications are the first-line therapy, nutritional interventions play a key role in regulating ovulation, cycles, and weight.</p>
        <h3>The Insulin Connection</h3>
        <p>Up to 70% of women with PCOS have insulin resistance. When insulin levels are chronically elevated, it signals the ovaries to produce excess androgens (like testosterone), leading to symptoms like hirsutism, acne, and irregular periods. Designing a low-insulin-spike customized diet is crucial to breaking this cycle.</p>
        <h3>Our PCOS Nutritional Protocol</h3>
        <ul>
          <li><strong>Anti-inflammatory Foods:</strong> Incorporating omega-3 fats, colorful vegetables, and antioxidant-rich seeds to curb chronic inflammation.</li>
          <li><strong>Low Glycemic Load Complex Carbs:</strong> High-fiber grains (like millets and oats) paired with high-quality plant and dairy proteins.</li>
          <li><strong>Targeted Micronutrient Supplementation:</strong> Calibrating Vitamin D, Inositol, and Magnesium intake to improve insulin sensitivity.</li>
        </ul>
        <p>To reverse your PCOS symptoms naturally, schedule a customized consultation with Dr. Akhila Konakalla today!</p>
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


  // --- 10. Feedback Toast Notification Engine ---
  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'danger' ? 'danger-toast' : ''}`;
    
    // Custom style for errors if any
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

    // Fade in
    setTimeout(() => {
      toast.classList.add('active');
    }, 10);

    // Fade out and remove
    setTimeout(() => {
      toast.classList.remove('active');
      setTimeout(() => {
        toast.remove();
      }, 400);
    }, 4500);
  }

});
