import { Card } from '@readable/ui';
import { useDataAccessFeed } from '@readable/home/data-access-home';
import { useEffect, useRef } from 'react';

export const HomeFeed = () => {
  const { entries, pageInfo, fetchMoreFeed } = useDataAccessFeed();

  const viewport = useRef<HTMLDivElement>(null);
  const target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: viewport.current,
      threshold: 0,
    };

    const handleIntersection = ([entry]: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      if (!entry.isIntersecting) {
        return;
      }

      fetchMoreFeed();

      observer.unobserve(entry.target);
      if (target.current) {
        observer.observe(target.current);
      }
    };

    const intersectionObserver = new IntersectionObserver(handleIntersection, options);

    if (target.current) {
      intersectionObserver.observe(target.current);
    }

    return () => intersectionObserver && intersectionObserver.disconnect();
  }, [fetchMoreFeed]);

  return (
    <>
      <div ref={viewport} className="border-8 h-96 overflow-scroll">
        {entries?.map(({ id, cursor, imageUrl }) => {
          return (
            <div key={id} ref={cursor === pageInfo?.endCursor ? target : null}>
              <Card imageUrl={imageUrl}></Card>
            </div>
          );
        })}
      </div>
    </>
  );
};