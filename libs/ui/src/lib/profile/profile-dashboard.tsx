import { Badge, ProfileBadge } from './profile-badge';

export interface ProfileDashboardProps {
  badges: Badge[];
}

export function ProfileDashboard({ badges }: ProfileDashboardProps) {
  return (
    <>
      <div className="md:hidden block py-4 w-3/5">
        <div className="py-4 px-3 leading-relaxed border-2 bg-indigo-700 border-black border-dashed shadow-offset-black text-xs">
          <div>I have 3 Interests</div>
          <div>I have 3 Interests</div>
          <div>I have 3 Interests</div>
        </div>
      </div>
      <div className="md:hidden flex justify-end space-x-1 w-2/5 ml-7">
        <ProfileBadge badges={badges} />
      </div>

      <div className="md:block hidden max-w-xs w-full ml-auto h-4/6 border-2 border-black border-dashed bg-indigo-700 shadow-offset-black"></div>
    </>
  );
}