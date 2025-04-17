// script.js

// Configuration Tailwind
tailwind.config = {
  theme: {
    extend: {
      colors: {
        primary: "#0072CE",
        secondary: '#FF6B35',
        accent: "#FF6B35",
        light: "#F5F7FA",
      },
      fontFamily: {
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
    },
  },
};

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobileMenuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileCategories = document.getElementById("mobileCategories");

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("open");
  });

  // Mobile categories toggle
  const categoriesLink = mobileMenu.querySelector('a[href="#categories"]');
  categoriesLink.addEventListener("click", (e) => {
    e.preventDefault();
    mobileCategories.classList.toggle("hidden");
  });

  // Dark mode toggle
  const darkModeToggle = document.getElementById("darkModeToggle");
  const mobileDarkModeToggle = document.getElementById("mobileDarkModeToggle");

  function toggleDarkMode() {
    document.documentElement.classList.toggle("dark-mode");
    localStorage.setItem(
      "darkMode",
      document.documentElement.classList.contains("dark-mode")
    );
  }

  darkModeToggle.addEventListener("click", toggleDarkMode);
  mobileDarkModeToggle.addEventListener("click", toggleDarkMode);

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "true") {
    document.documentElement.classList.add("dark-mode");
  }

  // Carousel functionality
  const carouselData = [
    {
      title: "L'IA révolutionne la découverte de médicaments contre le cancer",
      excerpt:
        "Une nouvelle plateforme utilisant l'apprentissage profond a identifié 3 candidats-médicaments prometteurs en seulement 6 mois.",
      category: "R&D",
      date: "Il y a 2 jours",
      image:
        "https://images.unsplash.com/photo-1581093450021-33f920a00803?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "L'Europe adopte de nouvelles règles pour l'IA en santé",
      excerpt:
        "Le règlement européen sur l'intelligence artificielle introduit des exigences strictes pour les applications médicales.",
      category: "Régulation",
      date: "Il y a 3 jours",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Les chatbots médicaux atteignent 90% de précision diagnostique",
      excerpt:
        "Une étude récente montre que les derniers modèles de langage surpassent les médecins généralistes dans certains diagnostics.",
      category: "Diagnostic",
      date: "Il y a 5 jours",
      image:
        "https://images.unsplash.com/photo-1622675363311-3e1904dc1885?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "L'automatisation des essais cliniques réduit les délais de 40%",
      excerpt:
        "Les solutions IA pour le recrutement et le suivi des patients montrent des résultats impressionnants.",
      category: "Essais cliniques",
      date: "Il y a 1 semaine",
      image:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
    {
      title: "Nouvelle IA générative pour la conception moléculaire",
      excerpt:
        "Cette technologie pourrait accélérer la découverte de médicaments pour les maladies rares.",
      category: "IA Générative",
      date: "Il y a 1 semaine",
      image:
        "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
    },
  ];

  const carouselTrack = document.getElementById("carouselTrack");
  const carouselIndicators = document.getElementById("carouselIndicators");

  if (carouselTrack && carouselIndicators) {
    carouselData.forEach((item, index) => {
      // Create carousel item
      const carouselItem = document.createElement("div");
      carouselItem.className =
        "carousel-item flex-shrink-0 w-full md:w-1/2 lg:w-1/3 px-2";
      carouselItem.innerHTML = `
                <div class="bg-white rounded-xl shadow-md overflow-hidden h-full">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover">
                    <div class="p-6">
                        <div class="flex items-center text-sm text-gray-500 mb-2">
                            <span>${item.date}</span>
                            <span class="mx-2">•</span>
                            <span>${item.category}</span>
                        </div>
                        <h3 class="font-heading text-xl font-bold mb-3">${item.title}</h3>
                        <p class="text-gray-600 mb-4">${item.excerpt}</p>
                        <a href="#" class="text-primary font-semibold hover:underline">Lire la suite</a>
                    </div>
                </div>
            `;
      carouselTrack.appendChild(carouselItem);

      // Create indicator
      const indicator = document.createElement("button");
      indicator.className = `w-3 h-3 rounded-full ${
        index === 0 ? "bg-primary" : "bg-gray-300"
      }`;
      indicator.dataset.index = index;
      indicator.addEventListener("click", () => {
        goToSlide(index);
      });
      carouselIndicators.appendChild(indicator);
    });

    let currentIndex = 0;
    const itemCount = carouselData.length;
    const itemWidth = 100 / 3; // 33.33% for each item (3 visible at a time)

    function updateCarousel() {
      const offset = -currentIndex * itemWidth;
      carouselTrack.style.transform = `translateX(${offset}%)`;

      // Update indicators
      const indicators = carouselIndicators.querySelectorAll("button");
      indicators.forEach((ind, idx) => {
        ind.className = `w-3 h-3 rounded-full ${
          idx === currentIndex ? "bg-primary" : "bg-gray-300"
        }`;
      });
    }

    function goToSlide(index) {
      currentIndex = index;
      updateCarousel();
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % itemCount;
      updateCarousel();
    }

    function prevSlide() {
      currentIndex = (currentIndex - 1 + itemCount) % itemCount;
      updateCarousel();
    }

    // Set up event listeners for next/prev buttons
    document
      .querySelector(".carousel-next")
      .addEventListener("click", nextSlide);
    document
      .querySelector(".carousel-prev")
      .addEventListener("click", prevSlide);

    // Auto-advance carousel every 5 seconds
    setInterval(nextSlide, 5000);

    // Initialize carousel
    updateCarousel();
  }

  // Charts
  if (typeof Chart !== "undefined") {
    // Tech Mentions Chart
    const techMentionsCtx = document
      .getElementById("techMentionsChart")
      ?.getContext("2d");
    if (techMentionsCtx) {
      const techMentionsChart = new Chart(techMentionsCtx, {
        type: "bar",
        data: {
          labels: [
            "IA Générative",
            "Machine Learning",
            "Robotique",
            "Vision par ordinateur",
            "Traitement NLP",
          ],
          datasets: [
            {
              label: "Mentions dans les publications",
              data: [125, 180, 75, 90, 110],
              backgroundColor: [
                "rgba(0, 114, 206, 0.7)",
                "rgba(255, 107, 53, 0.7)",
                "rgba(0, 114, 206, 0.5)",
                "rgba(255, 107, 53, 0.5)",
                "rgba(0, 114, 206, 0.3)",
              ],
              borderColor: [
                "rgba(0, 114, 206, 1)",
                "rgba(255, 107, 53, 1)",
                "rgba(0, 114, 206, 1)",
                "rgba(255, 107, 53, 1)",
                "rgba(0, 114, 206, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Adoption Chart
    const adoptionCtx = document
      .getElementById("adoptionChart")
      ?.getContext("2d");
    if (adoptionCtx) {
      const adoptionChart = new Chart(adoptionCtx, {
        type: "doughnut",
        data: {
          labels: ["R&D", "Production", "Logistique", "Marketing", "RH"],
          datasets: [
            {
              label: "Adoption par secteur",
              data: [35, 25, 20, 15, 5],
              backgroundColor: [
                "rgba(0, 114, 206, 0.7)",
                "rgba(255, 107, 53, 0.7)",
                "rgba(0, 114, 206, 0.5)",
                "rgba(255, 107, 53, 0.5)",
                "rgba(0, 114, 206, 0.3)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "right",
            },
          },
        },
      });
    }

    // Publications Chart
    const publicationsCtx = document
      .getElementById("publicationsChart")
      ?.getContext("2d");
    if (publicationsCtx) {
      const publicationsChart = new Chart(publicationsCtx, {
        type: "line",
        data: {
          labels: ["2018", "2019", "2020", "2021", "2022", "2023"],
          datasets: [
            {
              label: "Publications scientifiques",
              data: [45, 68, 92, 120, 175, 220],
              fill: false,
              backgroundColor: "rgba(0, 114, 206, 0.7)",
              borderColor: "rgba(0, 114, 206, 1)",
              tension: 0.4,
              borderWidth: 3,
            },
            {
              label: "Brevet déposés",
              data: [12, 18, 25, 40, 65, 90],
              fill: false,
              backgroundColor: "rgba(255, 107, 53, 0.7)",
              borderColor: "rgba(255, 107, 53, 1)",
              tension: 0.4,
              borderWidth: 3,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
});
