import { Hashtag } from '@readable/ui';
import { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

// 임시 data
const data = [
  'ux',
  'reactnative',
  'react',
  'designthinking',
  'react',
  'designthinking',
  'design',
  'ui',
  'startup',
  'uxserarcing',
  'uxwriting',
  'productdesign',
  'productdesign',
];

export const OnboardingTags = () => {
  const methods = useFormContext();
  const { register, control, getValues } = methods;

  const { fields, append, remove, insert, update } = useFieldArray({
    name: 'tags',
    control,
  });

  const [selectedHashtags, setSelectedHashtag] = useState<Set<string>>(new Set());
  console.log('TCL: selectedHashtags', selectedHashtags);

  const updateHashtag = (hashtag: string) => {
    if (selectedHashtags.has(hashtag)) {
      setSelectedHashtag(prev => {
        const newSelectedHashTags = new Set(prev);
        newSelectedHashTags.delete(hashtag);
        return newSelectedHashTags;
      });
    } else {
      setSelectedHashtag(prev => new Set([...prev, hashtag]));
    }
  };

  return (
    <div className="text-white mt-6 mb-8">
      <div className="flex -m-2 flex-wrap w-full max-w-xl">
        {data.map(hashtag => {
          const isSelected = selectedHashtags.has(hashtag);
          console.log('TCL: isSelected', isSelected);

          return (
            <div className="m-2">
              <Hashtag
                hoverColor="bg-black"
                defaultColor="bg-gray-400"
                activeColor={isSelected ? 'bg-black' : undefined}
                size="lg"
                onClick={() => {
                  updateHashtag(hashtag);
                }}
              >
                {hashtag}
              </Hashtag>
            </div>
          );
        })}
      </div>
    </div>
  );
};
