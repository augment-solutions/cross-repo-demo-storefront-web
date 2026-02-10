'use client';

import { CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

interface TimelineEvent {
  id: string;
  status: string;
  description: string;
  timestamp: string;
  completed: boolean;
}

interface OrderTimelineProps {
  events: TimelineEvent[];
}

export function OrderTimeline({ events }: OrderTimelineProps) {
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {events.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== events.length - 1 && (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              )}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                      event.completed ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    {event.completed ? (
                      <CheckCircleIcon className="h-5 w-5 text-white" />
                    ) : (
                      <ClockIcon className="h-5 w-5 text-white" />
                    )}
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{event.status}</p>
                    <p className="text-sm text-gray-500">{event.description}</p>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {new Date(event.timestamp).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderTimeline;

