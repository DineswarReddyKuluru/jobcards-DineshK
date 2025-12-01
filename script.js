// Job Data
const jobs = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp Solutions",
    logo: "TC",
    category: "frontend",
    location: "Remote",
    type: "Full-time",
    description:
      "Build stunning user interfaces and create seamless user experiences for our cutting-edge web applications.",
    skills: ["React", "JavaScript", "CSS", "TypeScript"],
    responsibilities: [
      "Develop responsive web applications using React and modern JavaScript",
      "Collaborate with designers to implement pixel-perfect UI designs",
      "Optimize applications for maximum speed and scalability",
      "Write clean, maintainable, and well-documented code",
    ],
    requirements: [
      "2+ years of experience with React and JavaScript",
      "Strong understanding of HTML5, CSS3, and responsive design",
      "Experience with state management libraries (Redux, Context API)",
      "Excellent problem-solving skills and attention to detail",
    ],
    salary: "$80,000 - $120,000",
    experience: "2-4 years",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "DataFlow Systems",
    logo: "DF",
    category: "backend",
    location: "Hybrid",
    type: "Full-time",
    description:
      "Design and implement robust backend systems that power our data-driven applications.",
    skills: ["Node.js", "Python", "MongoDB", "PostgreSQL"],
    responsibilities: [
      "Design and develop scalable RESTful APIs and microservices",
      "Implement database schemas and optimize query performance",
      "Ensure security best practices across all backend systems",
      "Collaborate with frontend teams to integrate services",
    ],
    requirements: [
      "3+ years of backend development experience",
      "Proficiency in Node.js, Python, or similar languages",
      "Strong knowledge of database design and optimization",
      "Experience with cloud platforms (AWS, Azure, or GCP)",
    ],
    salary: "$90,000 - $140,000",
    experience: "3-5 years",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    company: "Creative Labs",
    logo: "CL",
    category: "design",
    location: "On-site",
    type: "Full-time",
    description:
      "Create beautiful, intuitive designs that delight users and drive business results.",
    skills: ["Figma", "Adobe XD", "Sketch", "Prototyping"],
    responsibilities: [
      "Design user interfaces for web and mobile applications",
      "Create wireframes, prototypes, and high-fidelity mockups",
      "Conduct user research and usability testing",
      "Collaborate with developers to ensure design implementation",
    ],
    requirements: [
      "2+ years of UI/UX design experience",
      "Expert knowledge of Figma, Sketch, or Adobe XD",
      "Strong portfolio demonstrating design thinking",
      "Understanding of design systems and component libraries",
    ],
    salary: "$70,000 - $110,000",
    experience: "2-4 years",
  },
  {
    id: 4,
    title: "Data Scientist",
    company: "AI Innovations",
    logo: "AI",
    category: "data",
    location: "Remote",
    type: "Full-time",
    description:
      "Leverage machine learning and data analysis to extract insights and drive strategic decisions.",
    skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
    responsibilities: [
      "Build and deploy machine learning models for predictive analytics",
      "Analyze large datasets to identify trends and insights",
      "Develop data pipelines and automate data processing",
      "Present findings to stakeholders through visualizations",
    ],
    requirements: [
      "3+ years of experience in data science or analytics",
      "Strong programming skills in Python and SQL",
      "Experience with ML frameworks (TensorFlow, PyTorch, scikit-learn)",
      "Excellent communication and data storytelling skills",
    ],
    salary: "$100,000 - $150,000",
    experience: "3-6 years",
  },
];

// DOM Elements
const jobsGrid = document.getElementById("jobsGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const jobModal = document.getElementById("jobModal");
const closeModal = document.getElementById("closeModal");
const modalBody = document.getElementById("modalBody");
const noResults = document.getElementById("noResults");

// Initialize page
function init() {
  renderJobs(jobs);
  setupEventListeners();
}

// Render job cards
function renderJobs(jobsToRender) {
  jobsGrid.innerHTML = "";

  if (jobsToRender.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";

  jobsToRender.forEach((job, index) => {
    const jobCard = createJobCard(job, index);
    jobsGrid.appendChild(jobCard);
  });
}

// Create individual job card
function createJobCard(job, index) {
  const card = document.createElement("div");
  card.className = "job-card";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
        <div class="job-header">
            <div class="company-logo">${job.logo}</div>
            <div>
                <h3 class="job-title">${job.title}</h3>
                <p class="company-name">${job.company}</p>
            </div>
        </div>
        
        <div class="job-meta">
            <span class="category-badge">${
              job.category.charAt(0).toUpperCase() + job.category.slice(1)
            }</span>
            <span class="job-tag">📍 ${job.location}</span>
            <span class="job-tag">⏰ ${job.type}</span>
        </div>
        
        <p class="job-description">${job.description}</p>
        
        <div class="skills">
            ${job.skills
              .map((skill) => `<span class="skill-tag">${skill}</span>`)
              .join("")}
        </div>
        
        <button class="apply-btn" onclick="openModal(${
          job.id
        })">Apply Now</button>
    `;

  return card;
}

// Filter jobs based on search and category
function filterJobs() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm) ||
      job.company.toLowerCase().includes(searchTerm) ||
      job.description.toLowerCase().includes(searchTerm) ||
      job.skills.some((skill) => skill.toLowerCase().includes(searchTerm));

    const matchesCategory =
      selectedCategory === "all" || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  renderJobs(filteredJobs);
}

// Open modal with job details
function openModal(jobId) {
  const job = jobs.find((j) => j.id === jobId);

  if (!job) return;

  modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${job.title}</h2>
            <p class="modal-company">${job.company}</p>
            <div class="job-meta" style="margin-top: 15px;">
                <span class="category-badge">${
                  job.category.charAt(0).toUpperCase() + job.category.slice(1)
                }</span>
                <span class="job-tag">📍 ${job.location}</span>
                <span class="job-tag">⏰ ${job.type}</span>
            </div>
        </div>
        
        <div class="modal-section">
            <h3>💰 Salary Range</h3>
            <p>${job.salary}</p>
        </div>
        
        <div class="modal-section">
            <h3>📊 Experience Required</h3>
            <p>${job.experience}</p>
        </div>
        
        <div class="modal-section">
            <h3>📝 About the Role</h3>
            <p>${job.description}</p>
        </div>
        
        <div class="modal-section">
            <h3>🔧 Required Skills</h3>
            <div class="skills">
                ${job.skills
                  .map((skill) => `<span class="skill-tag">${skill}</span>`)
                  .join("")}
            </div>
        </div>
        
        <div class="modal-section">
            <h3>✅ Key Responsibilities</h3>
            <ul>
                ${job.responsibilities
                  .map((resp) => `<li>${resp}</li>`)
                  .join("")}
            </ul>
        </div>
        
        <div class="modal-section">
            <h3>🎯 Requirements</h3>
            <ul>
                ${job.requirements.map((req) => `<li>${req}</li>`).join("")}
            </ul>
        </div>
        
        <button class="apply-btn" onclick="alert('Application submitted! (This is a demo)')">
            Submit Application
        </button>
    `;

  jobModal.classList.add("active");
  document.body.style.overflow = "hidden";
}

// Close modal
function closeModalWindow() {
  jobModal.classList.remove("active");
  document.body.style.overflow = "auto";
}

// Setup event listeners
function setupEventListeners() {
  searchInput.addEventListener("input", filterJobs);
  categoryFilter.addEventListener("change", filterJobs);
  closeModal.addEventListener("click", closeModalWindow);

  // Close modal when clicking outside
  jobModal.addEventListener("click", (e) => {
    if (e.target === jobModal) {
      closeModalWindow();
    }
  });

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && jobModal.classList.contains("active")) {
      closeModalWindow();
    }
  });
}

// Initialize the application
init();
