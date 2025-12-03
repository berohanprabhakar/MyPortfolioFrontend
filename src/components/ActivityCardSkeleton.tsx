import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const ActivityCardSkeleton = () => {
  return (
    <div className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-none">
      <Skeleton circle width={20} height={20} />

      <div className="flex-1">
        <Skeleton width={140} height={14} />
        <Skeleton width={220} height={14} style={{ marginTop: 6 }} />
        <Skeleton width={100} height={12} style={{ marginTop: 8 }} />
      </div>

      <Skeleton width={50} height={12} />
    </div>
  );
};

export default ActivityCardSkeleton;
