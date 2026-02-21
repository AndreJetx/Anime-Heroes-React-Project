"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const DEFAULT_SLIDES = [
  "/images/imgslide1.png",
  "/images/imgslide2.png",
  "/images/imgslide3.png",
  "/images/imgslide4.png",
];

export default function ImageSlider() {
  const [slides, setSlides] = useState<string[]>(DEFAULT_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/api/carousel")
      .then((res) => res.ok ? res.json() : [])
      .then((data: { imageUrl: string }[]) => {
        if (data.length > 0) setSlides(data.map((s) => s.imageUrl));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <div className="image-slider">
      <div className="slider-container">
        <div className="slider-track">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slider-slide ${index === current ? "active" : ""}`}
            >
              <Image
                src={slide}
                alt={`Slide ${index + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
                priority={index === 0}
                unoptimized={slide.startsWith("http")}
              />
            </div>
          ))}
        </div>

        <button
          className="slider-button slider-button-prev"
          onClick={goToPrevious}
          aria-label="Previous slide"
        >
          &#10094;
        </button>
        <button
          className="slider-button slider-button-next"
          onClick={goToNext}
          aria-label="Next slide"
        >
          &#10095;
        </button>
      </div>

      <div className="slider-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === current ? "active" : ""}`}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
