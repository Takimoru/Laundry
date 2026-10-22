import {
  BadgeCheck,
  ArrowRight,
  ArrowLeftRight,
  Check,
  Clock3,
  Droplets,
  HeartHandshake,
  MessageCircle,
  Sparkles,
  Target,
  WashingMachine,
} from "lucide-react";
import { useCallback, useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

import { Button } from "@/components/ui/button";
import { PageMeta } from "@/components/site/PageMeta";
import { laundryServices, serviceHighlights, siteConfig, VisiMisi } from "@/config/site";
import { inquiryUrl } from "@/lib/whatsapp";
import storefrontImage from "@/assets/Header.jpeg";

const whatsappUrl = inquiryUrl("Halo Mele Laundry, saya ingin bertanya tentang layanan dan harga.");
const highlightIcons = [Sparkles, Clock3, HeartHandshake] as const;
const missions = [VisiMisi.Misi1, VisiMisi.Misi2, VisiMisi.Misi3, VisiMisi.Misi4];

function normalizeServiceMarquee(viewport: HTMLDivElement, track: HTMLDivElement | null) {
  const setWidth = track?.children[0]?.getBoundingClientRect().width ?? 0;

  if (setWidth === 0) return;

  const offset = ((viewport.scrollLeft - setWidth) % setWidth + setWidth) % setWidth;
  const normalizedPosition = setWidth + offset;

  if (Math.abs(viewport.scrollLeft - normalizedPosition) > 0.5) {
    viewport.scrollLeft = normalizedPosition;
  }
}

export function HomePage() {
  const servicesViewportRef = useRef<HTMLDivElement>(null);
  const servicesTrackRef = useRef<HTMLDivElement>(null);
  const isInteractingWithServicesRef = useRef(false);
  const isServicesRegionFocusedRef = useRef(false);
  const resumeAutoScrollTimerRef = useRef<number | null>(null);
  const dragStartRef = useRef<{ pointerId: number; startX: number; scrollLeft: number } | null>(null);

  const pauseServicesAutoScroll = useCallback(() => {
    isInteractingWithServicesRef.current = true;
    if (resumeAutoScrollTimerRef.current !== null) {
      window.clearTimeout(resumeAutoScrollTimerRef.current);
      resumeAutoScrollTimerRef.current = null;
    }
  }, []);

  const resumeServicesAutoScroll = useCallback(() => {
    if (resumeAutoScrollTimerRef.current !== null) {
      window.clearTimeout(resumeAutoScrollTimerRef.current);
    }

    resumeAutoScrollTimerRef.current = window.setTimeout(() => {
      if (!isServicesRegionFocusedRef.current) {
        isInteractingWithServicesRef.current = false;
      }
      resumeAutoScrollTimerRef.current = null;
    }, 1200);
  }, []);

  useEffect(() => {
    const viewport = servicesViewportRef.current;
    const track = servicesTrackRef.current;

    if (!viewport || !track) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let prefersReducedMotion = reducedMotion.matches;
    let previousFrameTime = 0;
    let animationFrameId = 0;

    const centerOnMiddleSet = () => {
      const setWidth = track.children[0]?.getBoundingClientRect().width ?? 0;
      if (setWidth > 0) viewport.scrollLeft = setWidth;
    };

    const handleWheel = (event: WheelEvent) => {
      const rawDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (rawDelta === 0) return;

      event.preventDefault();
      pauseServicesAutoScroll();
      const multiplier = event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? viewport.clientWidth : 1;
      const delta = rawDelta * multiplier;
      viewport.scrollLeft += delta;
      normalizeServiceMarquee(viewport, track);
      resumeServicesAutoScroll();
    };

    const handleMotionPreferenceChange = (event: MediaQueryListEvent) => {
      prefersReducedMotion = event.matches;
    };

    const animate = (frameTime: number) => {
      if (previousFrameTime === 0) previousFrameTime = frameTime;
      const elapsed = Math.min(frameTime - previousFrameTime, 50);
      previousFrameTime = frameTime;

      if (!prefersReducedMotion && !isInteractingWithServicesRef.current) {
        viewport.scrollLeft += elapsed * 0.035;
        normalizeServiceMarquee(viewport, track);
      }

      animationFrameId = window.requestAnimationFrame(animate);
    };

    centerOnMiddleSet();
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    reducedMotion.addEventListener("change", handleMotionPreferenceChange);
    window.addEventListener("resize", centerOnMiddleSet);
    animationFrameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
      viewport.removeEventListener("wheel", handleWheel);
      reducedMotion.removeEventListener("change", handleMotionPreferenceChange);
      window.removeEventListener("resize", centerOnMiddleSet);
      if (resumeAutoScrollTimerRef.current !== null) {
        window.clearTimeout(resumeAutoScrollTimerRef.current);
      }
    };
  }, [pauseServicesAutoScroll, resumeServicesAutoScroll]);

  const handleServicesPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    pauseServicesAutoScroll();

    if (event.pointerType === "mouse" && event.button === 0) {
      dragStartRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollLeft: event.currentTarget.scrollLeft,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.classList.add("is-dragging");
      event.preventDefault();
    }
  };

  const handleServicesPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragStartRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    event.currentTarget.scrollLeft = drag.scrollLeft + drag.startX - event.clientX;
    normalizeServiceMarquee(event.currentTarget, servicesTrackRef.current);
  };

  const handleServicesPointerEnd = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStartRef.current?.pointerId === event.pointerId) {
      dragStartRef.current = null;
      event.currentTarget.classList.remove("is-dragging");
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    }

    resumeServicesAutoScroll();
  };

  const handleServicesFocus = () => {
    isServicesRegionFocusedRef.current = true;
    pauseServicesAutoScroll();
  };

  const handleServicesBlur = () => {
    isServicesRegionFocusedRef.current = false;
    resumeServicesAutoScroll();
  };

  return (
    <main>
      <PageMeta
        title="Mele Laundry | Laundry Express"
        description="Mele Laundry melayani laundry satuan, kiloan, perlengkapan rumah, sepatu, tas, dan lainnya. Bersih, rapi, dan ramah."
      />

      <section id="home" className="laundry-hero relative scroll-mt-24 overflow-hidden bg-background">
        <div aria-hidden="true" className="laundry-hero-glow absolute -right-32 -top-36 size-[34rem] rounded-full" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_0.9fr] lg:px-8 lg:py-20">
          <div className="animate-fade-up">
            <div className="laundry-hero-badge inline-flex items-center gap-2 rounded-full border border-primary/15 bg-white px-4 py-2 text-sm font-semibold text-primary shadow-sm">
              <WashingMachine aria-hidden="true" className="size-4" />
              Laundry Express · 3 Jam Beres
            </div>
            <p className="mt-7 text-sm font-bold uppercase tracking-[0.2em] text-primary">
              {siteConfig.brand}
            </p>
            <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Urusan cucian selesai, <span className="laundry-hero-emphasis">harimu terasa lebih ringan.</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
              Nikmati cucian yang bersih, rapi, dan wangi dengan pelayanan yang cepat, efisien, dan ramah.
              Kami siap membantu kebutuhan laundry harian hingga barang rumah tangga.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  <MessageCircle aria-hidden="true" />
                  Tanya via WhatsApp
                  <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#services">Lihat layanan</a>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-medium text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-primary" />
                Bersih dan rapi
              </span>
              <span className="inline-flex items-center gap-2">
                <Check aria-hidden="true" className="size-4 text-primary" />
                Pelayanan ramah
              </span>
            </div>
            <div className="mt-9 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-3">
              <div className="laundry-proof-card rounded-2xl border border-border/70 bg-white/80 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-primary">3 jam</p>
                <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground">pilihan express</p>
              </div>
              <div className="laundry-proof-card rounded-2xl border border-border/70 bg-white/80 p-4 backdrop-blur">
                <p className="text-2xl font-bold text-primary">8</p>
                <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground">jenis perawatan</p>
              </div>
              <div className="laundry-proof-card col-span-2 rounded-2xl border border-border/70 bg-white/80 p-4 backdrop-blur sm:col-span-1">
                <p className="text-2xl font-bold text-primary">Sepenuh hati</p>
                <p className="mt-1 text-xs font-medium leading-5 text-muted-foreground">ramah untuk setiap pelanggan</p>
              </div>
            </div>
          </div>

          <div className="laundry-hero-photo animate-image-reveal animation-delay-150 relative mx-auto w-full max-w-lg lg:justify-self-end">
            <div className="absolute -inset-3 rotate-2 rounded-[2rem] bg-secondary/75 sm:-inset-4" />
            <div className="relative overflow-hidden rounded-[1.75rem] border-4 border-white bg-white shadow-2xl">
              <img
                src={storefrontImage}
                alt="Tampak depan gerai Mele Laundry"
                className="laundry-hero-image aspect-[4/5] w-full object-cover object-[center_16%]"
              />
            </div>
            <div className="laundry-hero-note absolute -bottom-5 left-4 rounded-2xl bg-white px-5 py-4 shadow-xl sm:-left-7 sm:px-6">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Cepat dan praktis</p>
              <p className="mt-1 text-lg font-bold text-primary">Cucian siap dalam 3 jam*</p>
            </div>
          </div>
        </div>
        <p className="relative mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground sm:px-6 lg:px-8">
          *Layanan express sesuai ketentuan dan jenis cucian.
        </p>
      </section>

      <section id="visi-misi" className="laundry-values-section scroll-mt-24 overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="laundry-reveal mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-primary">
              <Sparkles aria-hidden="true" className="size-4" />
              Pegangan kami
            </p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Tujuan yang sama, di setiap cucian.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Kami menjaga kualitas dan kenyamanan lewat tujuan yang jelas serta langkah yang konsisten.
            </p>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
            <article className="laundry-vision-card laundry-reveal relative overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground shadow-xl sm:p-9">
              <div aria-hidden="true" className="absolute -right-12 -top-12 size-48 rounded-full border-[24px] border-white/10" />
              <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-secondary text-primary shadow-md">
                <Target aria-hidden="true" className="size-6" />
              </span>
              <p className="relative mt-8 text-xs font-bold uppercase tracking-[0.2em] text-secondary">Visi kami</p>
              <h3 className="relative mt-3 text-2xl font-bold leading-snug sm:text-3xl">Membuat hari terasa lebih ringan.</h3>
              <p className="relative mt-5 max-w-lg text-base leading-7 text-primary-foreground/85">{VisiMisi.Visi}</p>
              <div className="relative mt-8 inline-flex items-center gap-2 text-sm font-semibold text-secondary">
                <BadgeCheck aria-hidden="true" className="size-5" />
                Bersih, cepat, dan ramah
              </div>
            </article>

            <article className="laundry-mission-card laundry-reveal rounded-[2rem] border border-border bg-white p-7 shadow-lg sm:p-9">
              <div className="flex items-center gap-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <Droplets aria-hidden="true" className="size-6" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">Misi kami</p>
                  <h3 className="mt-1 text-2xl font-bold text-foreground">Hal kecil, hasil yang terasa.</h3>
                </div>
              </div>
              <ol className="mt-7 grid gap-3 sm:grid-cols-2">
                {missions.map((mission, index) => (
                  <li key={mission} className="laundry-mission-item flex gap-3 rounded-2xl bg-background p-4">
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                      0{index + 1}
                    </span>
                    <span className="pt-1 text-sm font-medium leading-6 text-foreground">{mission}</span>
                  </li>
                ))}
              </ol>
            </article>
          </div>
        </div>
      </section>

      <section id="services" className="laundry-services-section scroll-mt-24 bg-white px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="laundry-reveal max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Layanan kami</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Satu tempat untuk banyak kebutuhan laundry.
            </h2>
            <p className="mt-4 leading-7 text-muted-foreground">
              Pilih layanan yang kamu perlukan. Hubungi kami untuk menanyakan harga dan estimasi pengerjaan.
            </p>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <span aria-hidden="true" className="inline-flex size-7 items-center justify-center rounded-full bg-secondary text-primary">
              <ArrowLeftRight className="size-4" />
            </span>
            Geser dengan jari, roda mouse, atau tahan lalu tarik.
          </p>

          <div
            ref={servicesViewportRef}
            className="laundry-services-marquee mt-8"
            role="region"
            aria-label="Daftar layanan Mele Laundry yang dapat digeser dan bergerak berulang."
            tabIndex={0}
            onPointerDown={handleServicesPointerDown}
            onPointerMove={handleServicesPointerMove}
            onPointerUp={handleServicesPointerEnd}
            onPointerCancel={handleServicesPointerEnd}
            onFocus={handleServicesFocus}
            onBlur={handleServicesBlur}
          >
            <div ref={servicesTrackRef} className="laundry-services-track">
              {[0, 1, 2].map((copyIndex) => (
                <div
                  key={copyIndex}
                  className="laundry-services-set"
                  aria-hidden={copyIndex !== 1}
                >
                  {laundryServices.map((service, index) => (
                    <article key={service.name} className="laundry-service-card">
                      <span className="inline-flex size-10 items-center justify-center rounded-xl bg-secondary/65 text-sm font-bold text-primary">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-4 text-lg font-bold text-foreground">{service.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{service.detail}</p>
                    </article>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-24 bg-primary px-4 py-16 text-primary-foreground sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="laundry-reveal">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">Tentang Mele Laundry</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Perawatan cucian yang praktis dan bisa dipercaya.
            </h2>
            <p className="mt-5 leading-7 text-primary-foreground/80">
              Mele Laundry hadir untuk membantu kebutuhan laundry sehari-hari. Kami berkomitmen memberi hasil cucian
              yang bersih dan rapi, proses yang efisien, serta pelayanan yang ramah.
            </p>
            <p className="mt-4 leading-7 text-primary-foreground/80">
              Tujuan kami sederhana: menjadi jasa laundry terpercaya yang mengutamakan kerapian, kecepatan, dan
              kenyamanan pelanggan.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {serviceHighlights.map((item, index) => {
              const Icon = highlightIcons[index];

              return (
                <article key={item.title} className="laundry-highlight-card rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                  <span className="inline-flex size-11 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="mt-5 font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-primary-foreground/75">{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="contact" className="scroll-mt-24 px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="laundry-contact-card mx-auto grid max-w-7xl gap-8 rounded-[2rem] bg-secondary/45 p-6 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center lg:p-12">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Hubungi kami</p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Siap menitipkan cucianmu?
            </h2>
            <p className="mt-4 max-w-2xl leading-7 text-muted-foreground">
              Hubungi Mele Laundry untuk bertanya tentang layanan, harga, dan estimasi waktu pengerjaan.
            </p>
            <div className="mt-5 space-y-1 text-sm text-foreground">
              <p><span className="font-semibold">WhatsApp:</span> {siteConfig.phoneDisplay}</p>
              <p><span className="font-semibold">Jam operasional:</span> {siteConfig.openingHours}</p>
              <p><span className="font-semibold">Alamat kami:</span> {siteConfig.alamat}</p>
            </div>
          </div>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" />
              Chat Mele Laundry
            </a>
          </Button>
        </div>
      </section>
    </main>
  );
}
