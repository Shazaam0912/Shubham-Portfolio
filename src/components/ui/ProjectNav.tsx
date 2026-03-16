"use client";
import React, { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { GoArrowUpRight } from "react-icons/go";
import { MdArrowBack } from "react-icons/md";

export type ProjectNavItem = {
  id: string;
  label: string;
  category: string;
  bgColor: string;
  accentColor: string;
  thumb: string;
};

interface ProjectNavProps {
  items: ProjectNavItem[];
  currentId: string;
  onNavigate: (id: string) => void;
  onBack: () => void;
  ease?: string;
}

const ProjectNav: React.FC<ProjectNavProps> = ({
  items,
  currentId,
  onNavigate,
  onBack,
  ease = "power3.out",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    const navEl = navRef.current;
    if (!navEl) return;

    gsap.set(navEl, { height: 52, overflow: "hidden" });
    gsap.set(cardsRef.current, { y: 40, opacity: 0 });

    const tl = gsap.timeline({ paused: true });
    tl.to(navEl, { height: 200, duration: 0.45, ease });
    tl.to(
      cardsRef.current,
      { y: 0, opacity: 1, duration: 0.35, ease, stagger: 0.06 },
      "-=0.15"
    );
    tlRef.current = tl;

    return () => {
      tl.kill();
      tlRef.current = null;
    };
  }, [ease, items]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    if (!isOpen) {
      setIsOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback("onReverseComplete", () => setIsOpen(false));
      tl.reverse();
    }
  };

  const handleProjectClick = (id: string) => {
    if (id === currentId) {
      toggleMenu();
      return;
    }
    // Close nav then switch project
    const tl = tlRef.current;
    if (tl) {
      tl.eventCallback("onReverseComplete", () => {
        setIsOpen(false);
        onNavigate(id);
      });
      tl.reverse();
    } else {
      setIsOpen(false);
      onNavigate(id);
    }
  };

  const handleBack = () => {
    const tl = tlRef.current;
    if (tl && isOpen) {
      tl.eventCallback("onReverseComplete", () => {
        setIsOpen(false);
        onBack();
      });
      tl.reverse();
    } else {
      onBack();
    }
  };

  const current = items.find((p) => p.id === currentId);

  return (
    <div
      style={{
        position: "fixed",
        top: "16px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 400,
        width: "min(92vw, 860px)",
      }}
    >
      <div
        ref={navRef}
        style={{
          background: "rgba(14, 10, 18, 0.96)",
          backdropFilter: "blur(20px)",
          borderRadius: "16px",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.6)",
          overflow: "hidden",
          willChange: "height",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 14px",
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Back to portfolio */}
          <button
            onClick={handleBack}
            data-cursor="disable"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#aaa",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              fontSize: "10px",
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              padding: "6px 12px",
              borderRadius: "100px",
              cursor: "pointer",
              fontFamily: "inherit",
              transition: "color 0.2s, border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#fff";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.color = "#aaa";
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.12)";
            }}
          >
            <MdArrowBack size={12} />
            Portfolio
          </button>

          {/* Current project label */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {current && (
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: current.accentColor,
                  flexShrink: 0,
                }}
              />
            )}
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                color: "#fff",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              {current?.label ?? "Projects"}
            </span>
          </div>

          {/* Hamburger toggle */}
          <button
            onClick={toggleMenu}
            data-cursor="disable"
            aria-label={isOpen ? "Close projects" : "Browse projects"}
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "#aaa",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "5px",
              width: "38px",
              height: "32px",
              borderRadius: "8px",
              cursor: "pointer",
              padding: 0,
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.3)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor =
                "rgba(255,255,255,0.12)";
            }}
          >
            <span
              style={{
                display: "block",
                width: "16px",
                height: "1.5px",
                background: "#aaa",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: isOpen ? "translateY(3.25px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "16px",
                height: "1.5px",
                background: "#aaa",
                borderRadius: "2px",
                transition: "transform 0.25s, opacity 0.25s",
                transform: isOpen
                  ? "translateY(-3.25px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>

        {/* Project cards */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            padding: "0 10px 10px",
            visibility: isOpen ? "visible" : "hidden",
            pointerEvents: isOpen ? "auto" : "none",
          }}
          aria-hidden={!isOpen}
        >
          {items.map((item, idx) => {
            const isActive = item.id === currentId;
            return (
              <div
                key={item.id}
                ref={setCardRef(idx)}
                onClick={() => handleProjectClick(item.id)}
                data-cursor="disable"
                style={{
                  flex: "1 1 0%",
                  minWidth: 0,
                  borderRadius: "10px",
                  padding: "12px 14px",
                  cursor: "pointer",
                  background: isActive
                    ? item.bgColor
                    : "rgba(255,255,255,0.04)",
                  border: isActive
                    ? `1px solid ${item.accentColor}44`
                    : "1px solid rgba(255,255,255,0.06)",
                  transition: "background 0.2s, border-color 0.2s",
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(255,255,255,0.07)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLDivElement).style.background =
                      "rgba(255,255,255,0.04)";
                  }
                }}
              >
                {/* Thumbnail strip */}
                <div
                  style={{
                    width: "100%",
                    height: "52px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    background: "#111",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={item.thumb}
                    alt={item.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center top",
                    }}
                  />
                </div>

                <div
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    color: isActive ? "#fff" : "#ccc",
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                >
                  {item.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      fontSize: "9px",
                      color: isActive ? item.accentColor : "#666",
                      fontWeight: 500,
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      flex: 1,
                      minWidth: 0,
                    }}
                  >
                    {item.category}
                  </span>
                  <GoArrowUpRight
                    size={12}
                    style={{ color: isActive ? item.accentColor : "#444", flexShrink: 0 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProjectNav;
