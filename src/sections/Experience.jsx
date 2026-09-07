import React, { useEffect, useRef, useState } from "react";
import { Calendar, CheckCircle2, MapPin } from "lucide-react";
import { ashlinProfile } from "../data/ashlinProfile";

function MetadataPanel({ mission, active }) {
  return (
    <article
      className={`career-panel career-metadata ${active ? "is-active" : ""}`}
    >
      <span className="career-panel-kicker">
        <Calendar className="w-3.5 h-3.5" /> TIMELINE
      </span>
      <p className="career-period">{mission.period}</p>
      <span className="career-panel-kicker mt-5">
        <MapPin className="w-3.5 h-3.5" /> LOCATION
      </span>
      <p className="career-location">{mission.location}</p>
      <span className="career-panel-kicker mt-5">ORGANISATION</span>
      <h3 className="career-organisation">{mission.company}</h3>
      {mission.organizationDetail && (
        <p className="career-location">{mission.organizationDetail}</p>
      )}
    </article>
  );
}

function DetailsPanel({ mission, active }) {
  return (
    <article
      className={`career-panel career-details ${active ? "is-active" : ""}`}
    >
      <span className="career-panel-kicker">POSITION</span>
      <h3 className="career-role">{mission.role}</h3>
      <span className="career-panel-kicker mt-6">WORK PERFORMED</span>
      <ul className="career-work-list">
        {mission.highlights.map((highlight) => (
          <li key={highlight}>
            <CheckCircle2 className="w-4 h-4" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
      <span className="career-panel-kicker mt-6">
        TECHNOLOGIES &amp; SKILLS
      </span>
      <div className="career-tags">
        {mission.technologies.map((technology) => (
          <span key={technology}>{technology}</span>
        ))}
      </div>
      {mission.metrics && (
        <div className="career-impact">
          <span className="career-panel-kicker">STRATEGIC IMPACT</span>
          <strong>{mission.metrics}</strong>
        </div>
      )}
      {mission.learningImpact && (
        <div className="career-impact">
          <span className="career-panel-kicker">LEARNING IMPACT</span>
          <strong>{mission.learningImpact}</strong>
        </div>
      )}
    </article>
  );
}

function CareerTimeline({ missions }) {
  const [activeMission, setActiveMission] = useState(0);
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveMission(Number(visible.target.dataset.index));
      },
      { rootMargin: "-28% 0px -34% 0px", threshold: [0.2, 0.45, 0.7] },
    );
    itemRefs.current.forEach((element) => element && observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="career-timeline"
      style={{
        "--career-progress": `${((activeMission + 1) / missions.length) * 100}%`,
      }}
    >
      <div className="career-beam" aria-hidden="true">
        <span />
      </div>
      {missions.map((mission, index) => {
        const active = activeMission === index;
        const metadataLeft = index % 2 === 0;
        return (
          <div
            key={mission.id}
            ref={(element) => {
              itemRefs.current[index] = element;
            }}
            data-index={index}
            className={`career-entry ${metadataLeft ? "metadata-left" : "details-left"} ${active ? "is-active" : ""}`}
          >
            <div className="career-side career-left">
              {metadataLeft ? (
                <MetadataPanel mission={mission} active={active} />
              ) : (
                <DetailsPanel mission={mission} active={active} />
              )}
            </div>
            <div className="career-axis" aria-label={`Experience ${index + 1}`}>
              <span className="career-node">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </span>
            </div>
            <div className="career-side career-right">
              {metadataLeft ? (
                <DetailsPanel mission={mission} active={active} />
              ) : (
                <MetadataPanel mission={mission} active={active} />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function Experience() {
  const { experience, socialImpact, socialInternships = [] } = ashlinProfile;
  const technicalInternships = experience;
  const socialMissions = [
    {
      ...socialImpact,
      company: socialImpact.organization,
      metrics: socialImpact.metric,
    },
    ...socialInternships.map((internship) => ({
      ...internship,
      company: internship.organization,
      metrics: internship.metric,
    })),
  ];

  return (
    <section className="relative z-10 px-6 py-12 sm:px-12 sm:py-16">
      <div className="w-full max-w-6xl mx-auto">
        <div className="flex flex-wrap items-center gap-3 mb-8 sm:mb-12">
          <span className="font-orbitron text-xs font-bold text-cyan-400 tracking-widest px-2.5 py-1 rounded bg-cyan-950/40 border border-cyan-500/30">
            PHASE 03
          </span>
          <h2 className="font-orbitron text-2xl sm:text-4xl font-bold tracking-tight text-white glow-cyan">
            INTERNSHIPS
          </h2>
        </div>

        <div className="space-y-12 sm:space-y-16">
          <div>
            <h3 className="font-orbitron text-lg sm:text-2xl font-bold tracking-tight text-cyan-300 glow-cyan mb-6">
              TECHNICAL INTERNSHIPS
            </h3>
            <CareerTimeline missions={technicalInternships} />
          </div>
          <div>
            <h3 className="font-orbitron text-lg sm:text-2xl font-bold tracking-tight text-cyan-300 glow-cyan mb-6">
              SOCIAL INTERNSHIPS
            </h3>
            <CareerTimeline missions={socialMissions} />
          </div>
        </div>
      </div>
    </section>
  );
}
