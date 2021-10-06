import { MainHeader, SearchDropdownMenu, SearchDropdownMenuProps } from '@readable/ui';

import { HomeProfile } from './home-profile';

export const HomeHeader = () => {
  return (
    <MainHeader renderProfileDropdown={() => <HomeProfile />}>
      {({ onClose }: SearchDropdownMenuProps) => {
        return <SearchDropdownMenu onClose={onClose} />;
      }}
    </MainHeader>
  );
};
