import { useState } from 'react';
import { EventCard } from './EventCard';
import { EventDetailModal } from './EventDetailModal';
import { EVENTS } from '../data/events';
import type { Tag, TimelineEvent } from '../types/timeline';
import { farbeFuerTag } from '../utils/colors';

const COL_WIDTH = 260;

interface CybersynTimelineProps {
  activeFilter: Tag | null;
  onPersonClick?: (personId: string) => void;
}

export function CybersynTimeline({ activeFilter, onPersonClick }: Readonly<CybersynTimelineProps>) {
  const events = activeFilter ? EVENTS.filter((e) => e.tag === activeFilter) : EVENTS;
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);

  return (
    <>
      {/* Desktop: horizontal scrollable timeline */}
      <div className="hidden md:block relative">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-fiberglas dark:from-walnuss to-transparent z-20" />

        <div className="overflow-x-auto pb-4 pt-3">
          <div
            className="relative flex items-start"
            style={{ width: `${events.length * COL_WIDTH}px` }}
          >
            <div className="absolute top-[7px] left-[130px] right-[130px] h-0.5 bg-tinte/15 dark:bg-bezel z-0" />

            {events.map((event) => (
              <button
                key={event.id}
                type="button"
                className="flex flex-col items-center relative z-10 group cursor-pointer text-left"
                style={{ width: `${COL_WIDTH}px` }}
                onClick={() => setSelectedEvent(event)}
              >
                <div
                  className="w-4 h-4 rounded-full ring-2 ring-fiberglas dark:ring-walnuss flex-shrink-0 transition-transform group-hover:scale-125"
                  style={{ backgroundColor: farbeFuerTag(event.tag) }}
                />
                <span className="mt-2 mb-3 font-mono text-xs uppercase tracking-[0.1em] text-tinte/50 dark:text-fiberglas/50 text-center whitespace-nowrap px-1">
                  {event.datum}
                </span>
                <div className="px-2 w-full">
                  <EventCard event={event} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden relative pl-8">
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-tinte/15 dark:bg-bezel" />

        {events.map((event) => (
          <div key={event.id} className="relative mb-6 last:mb-0">
            <button
              type="button"
              aria-label={`${event.titel} öffnen`}
              className="absolute -left-5 top-1.5 w-3.5 h-3.5 rounded-full ring-2 ring-fiberglas dark:ring-walnuss cursor-pointer hover:scale-125 transition-transform"
              style={{ backgroundColor: farbeFuerTag(event.tag) }}
              onClick={() => setSelectedEvent(event)}
            />
            <span className="block font-mono text-xs uppercase tracking-[0.1em] text-tinte/50 dark:text-fiberglas/50 mb-1.5">
              {event.datum}
            </span>
            <EventCard event={event} onClick={() => setSelectedEvent(event)} />
          </div>
        ))}
      </div>

      <EventDetailModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
        onPersonClick={onPersonClick}
      />
    </>
  );
}
