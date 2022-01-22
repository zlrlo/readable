import { MinusCircleIcon } from '@heroicons/react/solid';
import { ErrorMessage } from '@hookform/error-message';
import { useFormContext } from 'react-hook-form';

export const OnboardingNickname = () => {
  const methods = useFormContext();

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <div className="sm:mt-16 mt-9 sm:mb-44 mb-20">
      <input
        type="text"
        {...register('nickname', { required: 'Please enter your nickname.' })}
        placeholder="사용자 이름"
        className="sm:py-6 sm:px-5 max-w-sm w-full"
      />

      <ErrorMessage
        errors={errors}
        name="nickname"
        render={({ message }) => (
          <div className="text-red-600 mt-3 flex space-x-2">
            <div className="w-5 h-5">
              <MinusCircleIcon />
            </div>
            <p className="">{message}</p>
          </div>
        )}
      />
    </div>
  );
};
