/**
 * script.js
 * Main application logic, form handling, dynamic lists, and DOM updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const els = {
    form: document.getElementById('formPanel'),
    preview: document.getElementById('resumePaper'),
    templateRadios: document.querySelectorAll('input[name="template"]'),
    tmplCards: document.querySelectorAll('.tmpl-card'),
    btnGenerate: document.getElementById('btnGenerate'),
    btnLoadSample: document.getElementById('btnLoadSample'),
    btnClearForm: document.getElementById('btnClearForm'),
    btnExportPDF: document.getElementById('btnExportPDF'),
    btnExportPDF2: document.getElementById('btnExportPDF2'),
    zoomIn: document.getElementById('btnZoomIn'),
    zoomOut: document.getElementById('btnZoomOut'),
    zoomLevel: document.getElementById('zoomLevel'),
    toast: document.getElementById('toast'),
    overlay: document.getElementById('aiOverlay'),
    loaderText: document.getElementById('aiLoaderText'),
    
    // AI buttons
    btnAISummary: document.getElementById('btnAISummary'),
    btnAISkills: document.getElementById('btnAISkills'),
    
    // Dynamic lists
    btnAddEdu: document.getElementById('btnAddEdu'),
    eduList: document.getElementById('educationList'),
    btnAddExp: document.getElementById('btnAddExp'),
    expList: document.getElementById('experienceList'),
    btnAddProject: document.getElementById('btnAddProject'),
    projectList: document.getElementById('projectList'),
    btnAddCert: document.getElementById('btnAddCert'),
    certList: document.getElementById('certList'),
    
    // ATS Card
    atsScoreNum: document.getElementById('atsScoreNum'),
    atsLabel: document.getElementById('atsLabel'),
    atsTags: document.getElementById('atsTags'),
    ringFill: document.getElementById('ringFill')
  };

  let currentZoom = 1;
  let dynamicData = {
    education: [],
    experience: [],
    projects: [],
    certifications: []
  };

  // --- Initial Setup ---
  initTemplateSelection();
  setupDynamicLists();
  setupZoom();
  setupEventListeners();

  // Make globals available for pdfExport
  window.showToast = showToast;
  window.showAIOverlay = showAIOverlay;
  window.hideAIOverlay = hideAIOverlay;

  // --- Functions ---

  function initTemplateSelection() {
    els.templateRadios.forEach(radio => {
      radio.addEventListener('change', (e) => {
        els.tmplCards.forEach(c => c.classList.remove('active'));
        e.target.closest('.tmpl-card').classList.add('active');
        if (!els.preview.querySelector('.empty-state')) {
            generateResumePreview(); // Auto update if already generated
        }
      });
    });
  }

  function getSelectedTemplate() {
    const checked = document.querySelector('input[name="template"]:checked');
    return checked ? checked.value : 'modern';
  }

  function setupZoom() {
    els.zoomIn.addEventListener('click', () => {
      if (currentZoom < 1.5) {
        currentZoom += 0.1;
        updateZoom();
      }
    });
    els.zoomOut.addEventListener('click', () => {
      if (currentZoom > 0.4) {
        currentZoom -= 0.1;
        updateZoom();
      }
    });
  }

  function updateZoom() {
    els.preview.style.setProperty('--preview-scale', currentZoom);
    els.zoomLevel.textContent = Math.round(currentZoom * 100) + '%';
  }

  function showToast(message, type = 'info') {
    els.toast.textContent = message;
    els.toast.className = `toast show ${type}`;
    setTimeout(() => els.toast.classList.remove('show'), 3000);
  }

  function showAIOverlay(text = 'AI is working...') {
    els.loaderText.textContent = text;
    els.overlay.classList.add('visible');
  }

  function hideAIOverlay() {
    els.overlay.classList.remove('visible');
  }

  // --- Dynamic Lists (Edu, Exp, Proj, Certs) ---
  function setupDynamicLists() {
    // Simple helper to add entry form
    const createEntryForm = (type, listContainer, fields, mapToObj) => {
        const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
        const card = document.createElement('div');
        card.className = 'entry-card';
        card.dataset.id = id;
        card.dataset.type = type;
        
        let html = `<div class="entry-header">
            <span class="entry-title">${type.toUpperCase()}</span>
            <button class="btn-remove" type="button" onclick="this.closest('.entry-card').remove()">×</button>
        </div>
        <div class="entry-grid">`;
        
        fields.forEach(f => {
            const extraClass = f.full ? 'full' : '';
            if (f.type === 'textarea') {
                html += `<div class="form-group ${extraClass}">
                    <label>${f.label}</label>
                    <textarea class="entry-input" data-key="${f.key}" placeholder="${f.placeholder}"></textarea>
                </div>`;
            } else {
                html += `<div class="form-group ${extraClass}">
                    <label>${f.label}</label>
                    <input type="text" class="entry-input" data-key="${f.key}" placeholder="${f.placeholder}" />
                </div>`;
            }
        });
        html += `</div>`;
        card.innerHTML = html;
        listContainer.appendChild(card);
        return card;
    };

    els.btnAddEdu.addEventListener('click', () => {
        createEntryForm('education', els.eduList, [
            { key: 'degree', label: 'Degree', placeholder: 'B.Tech IT' },
            { key: 'institution', label: 'Institution', placeholder: 'Mumbai Univ' },
            { key: 'year', label: 'Year', placeholder: '2021-2025' },
            { key: 'grade', label: 'Grade', placeholder: '8.4 CGPA' },
            { key: 'description', label: 'Description', placeholder: 'Coursework...', full: true, type: 'textarea' }
        ]);
    });

    els.btnAddExp.addEventListener('click', () => {
        createEntryForm('experience', els.expList, [
            { key: 'title', label: 'Job Title', placeholder: 'Frontend Developer' },
            { key: 'company', label: 'Company', placeholder: 'Google' },
            { key: 'duration', label: 'Duration', placeholder: 'Jan 2023 - Present' },
            { key: 'location', label: 'Location', placeholder: 'Remote' },
            { key: 'bullets', label: 'Bullets (newline separated)', placeholder: '• Did this\n• Did that', full: true, type: 'textarea' }
        ]);
    });

    els.btnAddProject.addEventListener('click', () => {
        createEntryForm('projects', els.projectList, [
            { key: 'name', label: 'Project Name', placeholder: 'Portfolio' },
            { key: 'tech', label: 'Technologies', placeholder: 'React, Node' },
            { key: 'link', label: 'Link', placeholder: 'github.com/...' },
            { key: 'empty', label: '', placeholder: '' }, // spacer
            { key: 'bullets', label: 'Bullets (newline separated)', placeholder: '• Feature 1\n• Feature 2', full: true, type: 'textarea' }
        ]);
    });

    els.btnAddCert.addEventListener('click', () => {
        createEntryForm('certifications', els.certList, [
            { key: 'name', label: 'Cert Name', placeholder: 'AWS Practitioner' },
            { key: 'issuer', label: 'Issuer', placeholder: 'Amazon' },
            { key: 'year', label: 'Year', placeholder: '2024' },
            { key: 'empty', label: '', placeholder: '' }
        ]);
    });
  }

  function collectDynamicData(containerId, isBullet = false) {
      const container = document.getElementById(containerId);
      const cards = container.querySelectorAll('.entry-card');
      const data = [];
      cards.forEach(card => {
          const inputs = card.querySelectorAll('.entry-input');
          const item = {};
          inputs.forEach(input => {
              let val = input.value;
              if (input.dataset.key === 'bullets') {
                  item[input.dataset.key] = val.split('\n').filter(b => b.trim()).map(b => b.replace(/^[•\-\*]\s*/, '').trim());
              } else {
                  item[input.dataset.key] = val.trim();
              }
          });
          // Only add if at least one field is filled
          if (Object.values(item).some(v => Array.isArray(v) ? v.length > 0 : !!v)) {
              data.push(item);
          }
      });
      return data;
  }

  function collectFormData() {
    return {
      fullName: document.getElementById('fullName').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      linkedin: document.getElementById('linkedin').value,
      portfolio: document.getElementById('portfolio').value,
      location: document.getElementById('location').value,
      summary: document.getElementById('summary').value,
      skills: document.getElementById('skills').value,
      softSkills: document.getElementById('softSkills').value,
      achievements: document.getElementById('achievements').value,
      languages: document.getElementById('languages').value,
      education: collectDynamicData('educationList'),
      experience: collectDynamicData('experienceList', true),
      projects: collectDynamicData('projectList', true),
      certifications: collectDynamicData('certList')
    };
  }

  // --- AI Features ---
  els.btnAISummary.addEventListener('click', () => {
    const data = collectFormData();
    showAIOverlay('Drafting Professional Summary...');
    setTimeout(() => {
        const summary = window.ResumeGenerator.generateAISummary(data);
        document.getElementById('summary').value = summary;
        hideAIOverlay();
        showToast('AI Summary Generated!', 'success');
    }, 800);
  });

  els.btnAISkills.addEventListener('click', () => {
    const skillsInput = document.getElementById('skills');
    showAIOverlay('Analyzing skills and suggesting ATS keywords...');
    setTimeout(() => {
        const keywords = window.ResumeGenerator.getATSKeywords(skillsInput.value);
        if (keywords.length > 0) {
            const current = skillsInput.value.trim();
            skillsInput.value = current ? current + ', ' + keywords.join(', ') : keywords.join(', ');
            showToast('ATS Keywords Added!', 'success');
        } else {
            showToast('Skills look good already!', 'info');
        }
        hideAIOverlay();
    }, 800);
  });


  // --- Resume Generation Engine ---
  
  els.btnGenerate.addEventListener('click', () => {
      showAIOverlay('Enhancing content & rendering resume...');
      
      const rawData = collectFormData();
      
      // AI Enhancement Phase (Simulated)
      setTimeout(() => {
          // Enhance bullets
          if(rawData.experience) {
              rawData.experience = rawData.experience.map(exp => ({
                  ...exp, bullets: window.ResumeGenerator.enhanceBullets(exp.bullets || [])
              }));
          }
          if(rawData.projects) {
              rawData.projects = rawData.projects.map(proj => ({
                  ...proj, bullets: window.ResumeGenerator.enhanceBullets(proj.bullets || [])
              }));
          }
          
          generateResumePreview(rawData);
          updateATSScore(rawData);
          
          hideAIOverlay();
          showToast('Resume Generated successfully!', 'success');
      }, 1200);
  });

  function updateATSScore(data) {
      const result = window.ResumeGenerator.calculateATSScore(data);
      
      els.atsScoreNum.textContent = result.score;
      els.atsLabel.textContent = result.label;
      
      // Update Ring
      const offset = 213.6 - (213.6 * result.score) / 100;
      els.ringFill.style.strokeDashoffset = offset;
      
      // Color based on score
      let color = '#ef4444'; // red
      if (result.score >= 85) color = '#22c55e'; // green
      else if (result.score >= 70) color = '#f59e0b'; // orange
      
      els.ringFill.style.stroke = color;
      els.atsScoreNum.style.color = color;

      // Update Tags
      els.atsTags.innerHTML = '';
      result.tags.forEach(tag => {
          const span = document.createElement('span');
          span.className = `ats-tag ${tag.type}`;
          span.textContent = tag.label;
          els.atsTags.appendChild(span);
      });
  }


  // --- Template Rendering Logic ---

  function generateResumePreview(data = null) {
      if (!data) data = collectFormData();
      const tmpl = getSelectedTemplate();
      
      let html = '';
      if (tmpl === 'modern') html = renderModern(data);
      else if (tmpl === 'corporate') html = renderCorporate(data);
      else if (tmpl === 'creative') html = renderCreative(data);

      els.preview.innerHTML = html;
  }

  function renderModern(d) {
      const getInitials = (name) => {
          if(!name) return 'PR';
          return name.split(' ').map(n=>n[0]).slice(0,2).join('').toUpperCase();
      };
      
      const formatBullets = (bullets, className) => {
          if(!bullets || bullets.length===0) return '';
          return bullets.map(b => `<div class="${className}">${b}</div>`).join('');
      };

      const skillsHtml = (d.skills || '').split(',').map(s=>s.trim()).filter(Boolean)
          .map(s => `<div class="tm-skill-item">
            <div>${s}</div>
            <div class="tm-skill-bar"><div class="tm-skill-fill" style="width: ${Math.floor(Math.random()*30)+70}%"></div></div>
          </div>`).join('');

      const eduHtml = d.education.map(e => `<div class="tm-entry">
          <div class="tm-entry-title">${e.degree || ''}</div>
          <div class="tm-entry-subtitle">${e.institution || ''}</div>
          <div class="tm-entry-meta">${e.year || ''} | ${e.grade || ''}</div>
          <div class="tm-entry-desc">${e.description || ''}</div>
      </div>`).join('');

      const expHtml = d.experience.map(e => `<div class="tm-entry">
          <div style="display:flex; justify-content:space-between;">
              <div class="tm-entry-title">${e.title || ''}</div>
              <div class="tm-entry-meta">${e.duration || ''}</div>
          </div>
          <div class="tm-entry-subtitle">${e.company || ''} ${e.location ? '– '+e.location : ''}</div>
          ${formatBullets(e.bullets, 'tm-bullet')}
      </div>`).join('');

      const projHtml = d.projects.map(p => `<div class="tm-entry">
          <div style="display:flex; justify-content:space-between;">
              <div class="tm-entry-title">${p.name || ''}</div>
              <div class="tm-entry-meta" style="color:#38bdf8;">${p.link || ''}</div>
          </div>
          <div class="tm-entry-meta">Tech: ${p.tech || ''}</div>
          ${formatBullets(p.bullets, 'tm-bullet')}
      </div>`).join('');

      return `
      <div class="tmpl-modern">
          <aside class="tm-sidebar">
              <div class="tm-avatar">${getInitials(d.fullName)}</div>
              <div>
                  <div class="tm-name">${d.fullName || 'Your Name'}</div>
                  <div class="tm-role">${d.title || 'Professional Title'}</div>
              </div>
              
              <div class="tm-contact">
                  ${d.email ? `<span><span class="icon">✉</span> ${d.email}</span>` : ''}
                  ${d.phone ? `<span><span class="icon">📱</span> ${d.phone}</span>` : ''}
                  ${d.location ? `<span><span class="icon">📍</span> ${d.location}</span>` : ''}
                  ${d.linkedin ? `<span><span class="icon">🔗</span> ${d.linkedin}</span>` : ''}
                  ${d.portfolio ? `<span><span class="icon">🌐</span> ${d.portfolio}</span>` : ''}
              </div>

              ${d.skills ? `
              <div>
                  <div class="tm-section-title">Technical Skills</div>
                  <div class="tm-skills-list">${skillsHtml}</div>
              </div>` : ''}

              ${d.certifications && d.certifications.length>0 ? `
              <div>
                  <div class="tm-section-title">Certifications</div>
                  ${d.certifications.map(c=> `
                      <div style="margin-bottom:8px">
                          <div style="font-size:.75rem; font-weight:700; color:#fff">${c.name}</div>
                          <div style="font-size:.65rem; color:#cbd5e1">${c.issuer} ${c.year ? ' | '+c.year : ''}</div>
                      </div>
                  `).join('')}
              </div>` : ''}
              
              ${d.languages ? `
              <div>
                  <div class="tm-section-title">Languages</div>
                  <div style="font-size:.75rem; color:#cbd5e1;">${d.languages.replace(/,/g,'<br>')}</div>
              </div>` : ''}
          </aside>
          
          <main class="tm-main">
              ${d.summary ? `
              <section class="tm-header-main">
                  <div class="tm-section-head">Profile</div>
                  <div class="tm-summary-text">${d.summary}</div>
              </section>` : ''}

              ${d.experience && d.experience.length>0 ? `
              <section class="tm-main-section">
                  <div class="tm-section-head">Experience</div>
                  ${expHtml}
              </section>` : ''}

              ${d.projects && d.projects.length>0 ? `
              <section class="tm-main-section">
                  <div class="tm-section-head">Projects</div>
                  ${projHtml}
              </section>` : ''}

              ${d.education && d.education.length>0 ? `
              <section class="tm-main-section">
                  <div class="tm-section-head">Education</div>
                  ${eduHtml}
              </section>` : ''}
              
              ${d.achievements ? `
              <section class="tm-main-section">
                  <div class="tm-section-head">Achievements</div>
                  ${d.achievements.split('\n').map(a => `<div class="tm-bullet">${a.replace(/^[•\-\*]\\s*/, '')}</div>`).join('')}
              </section>` : ''}
          </main>
      </div>`;
  }

  function renderCorporate(d) {
    const formatBullets = (bullets, className) => {
        if(!bullets || bullets.length===0) return '';
        return bullets.map(b => `<div class="${className}">${b}</div>`).join('');
    };

    const expHtml = d.experience.map(e => `
      <div style="margin-bottom: 1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <div class="tc-entry-title">${e.company || ''}</div>
              <div class="tc-entry-meta">${e.location || ''} | ${e.duration || ''}</div>
          </div>
          <div class="tc-entry-sub">${e.title || ''}</div>
          <div style="margin-top:4px">${formatBullets(e.bullets, 'tc-bullet')}</div>
      </div>
    `).join('');

    const projHtml = d.projects.map(p => `
      <div style="margin-bottom: 1rem;">
          <div style="display:flex; justify-content:space-between; align-items:flex-end;">
              <div class="tc-entry-title">${p.name || ''}</div>
              <div class="tc-entry-meta">${p.link || ''}</div>
          </div>
          <div class="tc-entry-meta" style="color:#1e40af">${p.tech || ''}</div>
          <div style="margin-top:4px">${formatBullets(p.bullets, 'tc-bullet')}</div>
      </div>
    `).join('');

    const eduHtml = d.education.map(e => `
      <div style="margin-bottom: .8rem;">
          <div style="display:flex; justify-content:space-between;">
              <div class="tc-entry-title">${e.degree || ''}</div>
              <div class="tc-entry-meta">${e.year || ''}</div>
          </div>
          <div class="tc-entry-sub">${e.institution || ''}</div>
          <div class="tc-entry-meta">${e.grade || ''}</div>
          ${e.description ? `<div class="tc-bullet">${e.description}</div>` : ''}
      </div>
    `).join('');

    return `
    <div class="tmpl-corporate">
        <header class="tc-header">
            <div>
                <h1 class="tc-name">${d.fullName || 'Name'}</h1>
                <div class="tc-role">${d.title || ''}</div>
            </div>
            <div class="tc-contact-bar">
                ${d.email ? `<span>${d.email}</span>` : ''}
                ${d.phone ? `<span>${d.phone}</span>` : ''}
                ${d.location ? `<span>${d.location}</span>` : ''}
                ${d.linkedin ? `<span>${d.linkedin}</span>` : ''}
                ${d.portfolio ? `<span>${d.portfolio}</span>` : ''}
            </div>
        </header>

        <div class="tc-body">
            <main class="tc-main">
                ${d.summary ? `
                <div class="tc-section">
                    <div class="tc-section-title">Professional Summary</div>
                    <div class="tc-summary">${d.summary}</div>
                </div>` : ''}

                ${d.experience && d.experience.length>0 ? `
                <div class="tc-section">
                    <div class="tc-section-title">Experience</div>
                    ${expHtml}
                </div>` : ''}

                ${d.projects && d.projects.length>0 ? `
                <div class="tc-section">
                    <div class="tc-section-title">Projects</div>
                    ${projHtml}
                </div>` : ''}
            </main>
            
            <aside class="tc-side">
                ${d.skills ? `
                <div class="tc-section">
                    <div class="tc-section-title">Core Competencies</div>
                    <div class="tc-skill-row">
                        ${d.skills.split(',').map(s=> `<span class="tc-skill-tag">${s.trim()}</span>`).join('')}
                    </div>
                </div>` : ''}

                ${d.education && d.education.length>0 ? `
                <div class="tc-section">
                    <div class="tc-section-title">Education</div>
                    ${eduHtml}
                </div>` : ''}

                ${d.certifications && d.certifications.length>0 ? `
                <div class="tc-section">
                    <div class="tc-section-title">Certifications</div>
                    ${d.certifications.map(c=> `
                        <div class="tc-cert-item">
                            <div style="font-weight:700">${c.name}</div>
                            <div class="tc-cert-issuer">${c.issuer} ${c.year?'- '+c.year:''}</div>
                        </div>
                    `).join('')}
                </div>` : ''}
                
                ${d.achievements ? `
                <div class="tc-section">
                    <div class="tc-section-title">Achievements</div>
                    ${d.achievements.split('\n').map(a => `<div class="tc-achievement">${a.replace(/^[•\\-\\*]\\s*/, '')}</div>`).join('')}
                </div>` : ''}
            </aside>
        </div>
    </div>`;
  }

  function renderCreative(d) {
      const formatBullets = (bullets, className) => {
          if(!bullets || bullets.length===0) return '';
          return bullets.map(b => `<div class="${className}">${b}</div>`).join('');
      };

      const expHtml = d.experience.map(e => `
        <div style="margin-bottom: 1.2rem;">
            <div class="tcr-entry-title">${e.title || ''}</div>
            <div class="tcr-entry-sub">${e.company || ''}</div>
            <div class="tcr-entry-meta">${e.duration || ''} | ${e.location || ''}</div>
            <div style="margin-top:6px">${formatBullets(e.bullets, 'tcr-bullet')}</div>
        </div>
      `).join('');

      const projHtml = d.projects.map(p => `
        <div style="margin-bottom: 1.2rem;">
            <div style="display:flex; justify-content:space-between;">
              <div class="tcr-entry-title">${p.name || ''}</div>
              <div class="tcr-entry-meta">${p.link || ''}</div>
            </div>
            <div class="tcr-entry-sub">${p.tech || ''}</div>
            <div style="margin-top:6px">${formatBullets(p.bullets, 'tcr-bullet')}</div>
        </div>
      `).join('');

      const eduHtml = d.education.map(e => `
        <div style="margin-bottom: 1rem;">
            <div class="tcr-entry-title">${e.degree || ''}</div>
            <div class="tcr-entry-sub">${e.institution || ''}</div>
            <div class="tcr-entry-meta">${e.year || ''} | ${e.grade || ''}</div>
            ${e.description ? `<div class="tcr-bullet">${e.description}</div>` : ''}
        </div>
      `).join('');

      return `
      <div class="tmpl-creative">
          <header class="tcr-hero">
              <h1 class="tcr-name">${d.fullName || 'Creative Name'}</h1>
              <div class="tcr-role">${d.title || ''}</div>
              <div class="tcr-contact-row">
                  ${d.email ? `<span>${d.email}</span>` : ''}
                  ${d.phone ? `<span>${d.phone}</span>` : ''}
                  ${d.location ? `<span>${d.location}</span>` : ''}
                  ${d.linkedin ? `<span>${d.linkedin}</span>` : ''}
                  ${d.portfolio ? `<span>${d.portfolio}</span>` : ''}
              </div>
          </header>

          <div class="tcr-body">
              <main class="tcr-main">
                  ${d.summary ? `
                  <div class="tcr-section">
                      <div class="tcr-section-head">Profile</div>
                      <div class="tcr-summary">${d.summary}</div>
                  </div>` : ''}

                  ${d.experience && d.experience.length>0 ? `
                  <div class="tcr-section">
                      <div class="tcr-section-head">Experience</div>
                      ${expHtml}
                  </div>` : ''}

                  ${d.projects && d.projects.length>0 ? `
                  <div class="tcr-section">
                      <div class="tcr-section-head">Projects</div>
                      ${projHtml}
                  </div>` : ''}
              </main>

              <aside class="tcr-side">
                  ${d.skills ? `
                  <div class="tcr-section">
                      <div class="tcr-side-title">Skills</div>
                      <div class="tcr-chip-row">
                          ${d.skills.split(',').map(s=> `<span class="tcr-chip">${s.trim()}</span>`).join('')}
                      </div>
                  </div>` : ''}

                  ${d.education && d.education.length>0 ? `
                  <div class="tcr-section">
                      <div class="tcr-side-title">Education</div>
                      ${eduHtml}
                  </div>` : ''}

                  ${d.certifications && d.certifications.length>0 ? `
                  <div class="tcr-section">
                      <div class="tcr-side-title">Certifications</div>
                      ${d.certifications.map(c=> `
                          <div class="tcr-cert-item">
                              <div style="font-weight:700">${c.name}</div>
                              <div style="color:#64748b; font-size:.65rem">${c.issuer} ${c.year?'- '+c.year:''}</div>
                          </div>
                      `).join('')}
                  </div>` : ''}

                  ${d.achievements ? `
                  <div class="tcr-section">
                      <div class="tcr-side-title">Achievements</div>
                      ${d.achievements.split('\n').map(a => `<div class="tcr-achievement">${a.replace(/^[•\\-\\*]\\s*/, '')}</div>`).join('')}
                  </div>` : ''}
                  
                  ${d.languages ? `
                  <div class="tcr-section">
                      <div class="tcr-side-title">Languages</div>
                      ${d.languages.split(',').map(l=> `<div class="tcr-lang">${l.trim()}</div>`).join('')}
                  </div>` : ''}
              </aside>
          </div>
      </div>`;
  }

  // --- Load Sample Data & Export PDF ---

  function setupEventListeners() {
      els.btnLoadSample.addEventListener('click', () => {
          const sample = window.ResumeGenerator.SAMPLE_DATA;
          
          document.getElementById('fullName').value = sample.fullName;
          document.getElementById('email').value = sample.email;
          document.getElementById('phone').value = sample.phone;
          document.getElementById('linkedin').value = sample.linkedin;
          document.getElementById('portfolio').value = sample.portfolio;
          document.getElementById('location').value = sample.location;
          document.getElementById('skills').value = sample.skills;
          document.getElementById('softSkills').value = sample.softSkills;
          document.getElementById('achievements').value = sample.achievements;
          document.getElementById('languages').value = sample.languages;
          
          // AI Summary
          document.getElementById('summary').value = window.ResumeGenerator.generateAISummary(sample);

          // Clear lists
          els.eduList.innerHTML = '';
          els.expList.innerHTML = '';
          els.projectList.innerHTML = '';
          els.certList.innerHTML = '';

          // Add Edu
          sample.education.forEach(e => {
              const card = document.getElementById('btnAddEdu').click(); // trigger add
              const c = els.eduList.lastElementChild;
              c.querySelector('[data-key="degree"]').value = e.degree || '';
              c.querySelector('[data-key="institution"]').value = e.institution || '';
              c.querySelector('[data-key="year"]').value = e.year || '';
              c.querySelector('[data-key="grade"]').value = e.grade || '';
              c.querySelector('[data-key="description"]').value = e.description || '';
          });

          // Add Exp
          sample.experience.forEach(e => {
              document.getElementById('btnAddExp').click();
              const c = els.expList.lastElementChild;
              c.querySelector('[data-key="title"]').value = e.title || '';
              c.querySelector('[data-key="company"]').value = e.company || '';
              c.querySelector('[data-key="duration"]').value = e.duration || '';
              c.querySelector('[data-key="location"]').value = e.location || '';
              c.querySelector('[data-key="bullets"]').value = (e.bullets || []).join('\n');
          });

          // Add Proj
          sample.projects.forEach(p => {
              document.getElementById('btnAddProject').click();
              const c = els.projectList.lastElementChild;
              c.querySelector('[data-key="name"]').value = p.name || '';
              c.querySelector('[data-key="tech"]').value = p.tech || '';
              c.querySelector('[data-key="link"]').value = p.link || '';
              c.querySelector('[data-key="bullets"]').value = (p.bullets || []).join('\n');
          });

          // Add Certs
          sample.certifications.forEach(c => {
              document.getElementById('btnAddCert').click();
              const el = els.certList.lastElementChild;
              el.querySelector('[data-key="name"]').value = c.name || '';
              el.querySelector('[data-key="issuer"]').value = c.issuer || '';
              el.querySelector('[data-key="year"]').value = c.year || '';
          });

          showToast('Sample data loaded!', 'success');
      });

      els.btnClearForm.addEventListener('click', () => {
          if(!confirm('Are you sure you want to clear the form?')) return;
          const inputs = els.form.querySelectorAll('input:not([type="radio"]), textarea');
          inputs.forEach(i => i.value = '');
          els.eduList.innerHTML = '';
          els.expList.innerHTML = '';
          els.projectList.innerHTML = '';
          els.certList.innerHTML = '';
          els.preview.innerHTML = `<div class="empty-state">
            <div class="empty-icon">📄</div>
            <h3>Your Resume Preview</h3>
            <p>Fill in the form on the left and click <strong>Generate Resume</strong> to see a live preview here.</p>
          </div>`;
          
          els.atsScoreNum.textContent = '0';
          els.atsLabel.textContent = 'Fill the form to see your score';
          els.atsTags.innerHTML = '';
          els.ringFill.style.strokeDashoffset = 213.6;
          els.ringFill.style.stroke = '#1e2530';
          els.atsScoreNum.style.color = '#a78bfa';
          showToast('Form cleared', 'info');
      });

      // Export Buttons
      els.btnExportPDF.addEventListener('click', () => window.PDFExporter.exportPDF('AI_Resume.pdf'));
      els.btnExportPDF2.addEventListener('click', () => window.PDFExporter.exportPDF('AI_Resume.pdf'));
  }
});
