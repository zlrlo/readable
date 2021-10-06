import { FormWithUnderline } from '@readable/ui';
import { useRouter } from 'next/router';

export interface SearchDropdownMenuProps {
  onClose: () => void;
}

export function SearchDropdownMenu({ onClose }: SearchDropdownMenuProps) {
  const router = useRouter();

  const moveToSearchResultPage = (inputKeywordValue: string) => {
    router.push({
      pathname: '/search',
      query: { query: inputKeywordValue },
    });
  };

  const onSearchKeywordSubmit = (inputKeywordValue: string) => {
    moveToSearchResultPage(inputKeywordValue);
    onClose();
  };

  return (
    <div className="absolute z-40 w-full border-b-2 border-black py-4 px-24 bg-white ">
      <FormWithUnderline onSubmit={onSearchKeywordSubmit} />
      <div className="py-4 font-bold">
        <div className="my-4 text-xl">Popular Searches</div>
        <div className="flex text-indigo-700 py-1">
          <div className="px-4  mr-4">Data Science</div>
          <div className="px-4  mr-4">Data Science</div>
          <div className="px-4  mr-4">Data Science</div>
          <div className="px-4  mr-4">Data Science</div>
        </div>
      </div>
    </div>
  );
}
