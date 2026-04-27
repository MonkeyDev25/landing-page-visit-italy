document.addEventListener("DOMContentLoaded", () => {

    // ========================
    // HERO: CAROUSEL
    // ========================
    const heroCards = document.querySelectorAll(".carousel-card");
    let currentHero = 0;
    const HERO_DURATION = 5;

    function heroGoTo(index) {
        if (!heroCards.length) return;
        
        heroCards.forEach(card => {
            card.classList.remove("active");
            const pbar = card.querySelector(".ccard-progress-bar");
            if (pbar) {
                gsap.killTweensOf(pbar);
                gsap.set(pbar, { width: "0%" });
            }
        });

        currentHero = ((index % heroCards.length) + heroCards.length) % heroCards.length;
        const activeCard = heroCards[currentHero];
        activeCard.classList.add("active");

        // Animate progress bar of active card
        const activeBar = activeCard.querySelector(".ccard-progress-bar");
        if (activeBar) {
            gsap.fromTo(activeBar, 
                { width: "0%" },
                { width: "100%", duration: HERO_DURATION, ease: "none", onComplete: () => heroGoTo(currentHero + 1) }
            );
        }
    }

    if (heroCards.length > 0) {
        heroCards.forEach((card, i) => {
            card.addEventListener("click", () => {
                if (i !== currentHero) heroGoTo(i);
            });
        });
        // Init the first slide
        setTimeout(() => heroGoTo(0), 100); // slight delay to let DOM settle
    }

    // ========================
    // SCROLL ANIMATIONS
    // ========================
    if (typeof ScrollTrigger !== "undefined") {
        gsap.registerPlugin(ScrollTrigger);

        // --- Sezione 2: Manifesto ---
        const manifestoTl = gsap.timeline({
            scrollTrigger: { trigger: ".manifesto-section", start: "top 78%" }
        });
        manifestoTl
            .fromTo(".manifesto-eyebrow",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
            )
            .fromTo(".manifesto-title",
                { y: 70, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.18 },
                "-=0.3"
            )
            .fromTo(".manifesto-lead",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
                "-=0.5"
            )
            .fromTo(".manifesto-sub",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.7, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(".manifesto-stat",
                { y: 24, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.1 },
                "-=0.3"
            );

        // Floating element: scroll parallax
        gsap.to(".manifesto-float", {
            y: -80,
            ease: "none",
            scrollTrigger: {
                trigger: ".manifesto-section",
                start: "top bottom",
                end: "bottom top",
                scrub: 1.8
            }
        });

        // Float rings continuous rotation
        gsap.to(".float-ring--outer", {
            rotation: 360,
            duration: 22,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
        });
        gsap.to(".float-ring--inner", {
            rotation: -360,
            duration: 15,
            ease: "none",
            repeat: -1,
            transformOrigin: "center center"
        });

        // --- Sezione 3: Discovery Grid ---
        const discoveryTl = gsap.timeline({
            scrollTrigger: { trigger: ".discovery-section", start: "top 80%" }
        });
        discoveryTl
            .fromTo(".discovery-label",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            )
            .fromTo(".discovery-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo(".discovery-sub",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );

        // Bento cards staggered entrance
        gsap.fromTo(".bento-card",
            { y: 70, opacity: 0, scale: 0.96 },
            {
                y: 0, opacity: 1, scale: 1,
                duration: 0.9, ease: "power3.out", stagger: 0.1,
                scrollTrigger: { trigger: ".bento-grid", start: "top 84%" }
            }
        );

        // --- Sezione 4: How It Works (ex Tech Highlight) ---
        // Phone slides in from left
        gsap.fromTo(".tech-phone",
            { x: -50, opacity: 0, rotateY: 12 },
            {
                x: 0, opacity: 1, rotateY: 0,
                duration: 1.2, ease: "power3.out",
                scrollTrigger: { trigger: ".how-section", start: "top 78%" }
            }
        );

        // Right content stagger
        const techTl = gsap.timeline({
            scrollTrigger: { trigger: ".how-section", start: "top 78%" }
        });
        techTl
            .fromTo(".how-eyebrow",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            )
            .fromTo(".how-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo(".how-step",
                { x: 28, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.55, ease: "power2.out", stagger: 0.1 },
                "-=0.3"
            );

        // Map dots pulse
        gsap.to(".map-dot", {
            scale: 1.8,
            opacity: 0.3,
            duration: 1.1,
            ease: "power1.inOut",
            repeat: -1,
            yoyo: true,
            stagger: { each: 0.4, repeat: -1 }
        });

        // --- Sezione 5: Social Proof (ex Stories) ---
        const proofTl = gsap.timeline({
            scrollTrigger: { trigger: ".proof-section", start: "top 78%" }
        });
        proofTl
            .fromTo(".proof-eyebrow",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            )
            .fromTo(".proof-title",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo(".testimonial-card",
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power2.out", stagger: 0.15 },
                "-=0.4"
            )
            .fromTo(".press-strip",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            );

        // --- Sezione 6: Final CTA ---
        const fctaTl = gsap.timeline({
            scrollTrigger: { trigger: ".final-cta-section", start: "top 80%" }
        });
        fctaTl
            .fromTo(".fcta-eyebrow",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
            )
            .fromTo(".fcta-headline",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
                "-=0.2"
            )
            .fromTo(".fcta-sub",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.4"
            )
            .fromTo(".store-btn",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, ease: "power2.out", stagger: 0.15 },
                "-=0.3"
            )
            .fromTo(".fcta-app-stats",
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
                "-=0.2"
            );

        // --- Sezione 7: Footer ---
        gsap.fromTo(".footer-logo, .footer-tagline",
            { y: 20, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.7, ease: "power2.out", stagger: 0.12,
                scrollTrigger: { trigger: ".site-footer", start: "top 88%" }
            }
        );
        gsap.fromTo(".footer-nav a",
            { y: 14, opacity: 0 },
            {
                y: 0, opacity: 1, duration: 0.45, ease: "power2.out", stagger: 0.07, delay: 0.2,
                scrollTrigger: { trigger: ".site-footer", start: "top 88%" }
            }
        );
    }

    // ========================
    // HOW IT WORKS: SCREEN SYNC
    // ========================
    const howSteps = document.querySelectorAll(".how-step");
    const howScreens = document.querySelectorAll(".how-screen");
    
    if (howSteps.length > 0 && howScreens.length > 0) {
        howSteps.forEach((step, index) => {
            step.addEventListener("click", () => {
                // Update active step
                howSteps.forEach(s => s.classList.remove("active"));
                step.classList.add("active");
                
                // Slide screens
                howScreens.forEach((screen) => {
                    screen.style.transform = `translateX(-${index * 100}%)`;
                });
            });
        });
    }

    // ========================
    // SOCIAL PROOF: SLIDER NAV
    // ========================
    const testTrack = document.getElementById("testimonialsTrack");
    const tPrev = document.querySelector(".tslider-prev");
    const tNext = document.querySelector(".tslider-next");
    
    if (testTrack && tPrev && tNext) {
        tPrev.addEventListener("click", () => {
            testTrack.scrollBy({ left: -380, behavior: "smooth" });
        });
        tNext.addEventListener("click", () => {
            testTrack.scrollBy({ left: 380, behavior: "smooth" });
        });
    }

    // ========================
    // FLOATING CTA
    // ========================
    gsap.from('.floating-cta', {
        y: 100, opacity: 0, duration: 1, ease: 'back.out(1.7)', delay: 1.2
    });

    gsap.to('.pulse-neon', {
        boxShadow: '0 0 25px rgba(113, 251, 202, 0.4)',
        scale: 1.03,
        repeat: -1,
        yoyo: true,
        duration: 1.8,
        ease: 'sine.inOut'
    });

    // ========================
    // MOBILE NAV TOGGLE
    // ========================
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            document.body.classList.toggle("nav-open");
        });
        document.querySelectorAll(".nav-links a").forEach(link => {
            link.addEventListener("click", () => {
                document.body.classList.remove("nav-open");
            });
        });
    }

    // ========================
    // GO TO TOP BUTTON
    // ========================
    const btnGoTop = document.getElementById("btnGoTop");
    if (btnGoTop) {
        window.addEventListener("scroll", () => {
            // Show button after scrolling down 500px (past hero)
            if (window.scrollY > 500) {
                btnGoTop.classList.add("visible");
            } else {
                btnGoTop.classList.remove("visible");
            }
        });
        
        btnGoTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }
});
