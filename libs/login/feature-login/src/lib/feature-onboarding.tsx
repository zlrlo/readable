import { useDataAccessOnboarding } from '@readable/home/data-access-home';
import { LoginLayout } from './login-layout';
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { MinusCircleIcon } from '@heroicons/react/solid';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline';
import { useState } from 'react';

type FormInputs = {
  nickname: string;
};

enum OnboardingStep {
  Nickname,
  Tag,
}

const OnboardingPageData = [
  {
    step: OnboardingStep.Nickname,
    title: '사용자 이름 만들기',
    description: '새 계정에 사용할 사용자 이름을 선택하세요. 나중에 언제든지 변경할 수 있습니다.',
  },
  {
    step: OnboardingStep.Tag,
    title: 'Pick your interests',
    description: 'Select 3-5 different topic',
  },
];

export const FeatureOnboarding = () => {
  const { setNickName } = useDataAccessOnboarding();

  const [onboardingStep, setOnboardingStep] = useState(OnboardingStep.Nickname);

  const lastOnboardingStep = OnboardingPageData.length - 1;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    getValues,
  } = useForm<FormInputs>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
    defaultValues: {},
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUseNativeValidation: false,
  });

  const onSubmit = () => {
    const { nickname } = getValues();
    setNickName(nickname);
  };

  const onNextStepButtonClick = () => {
    if (onboardingStep === lastOnboardingStep) {
      onSubmit();
      return;
    }

    if (isValid) {
      setOnboardingStep(prevOnboardingStep => {
        return prevOnboardingStep + 1;
      });
    }
  };

  const onPrevStepButtonClick = () => {
    setOnboardingStep(prevOnboardingStep => {
      return prevOnboardingStep - 1;
    });
  };

  const renderInput = () => {
    if (onboardingStep === OnboardingStep.Nickname) {
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
    }

    return;
  };

  return (
    <LoginLayout>
      <div className="text-black">
        <div className="space-y-3">
          <div className="lg:text-5xl sm:text-4xl text-2xl font-bold">{OnboardingPageData[onboardingStep].title}</div>
          <div className="text-gray-400 sm:text-xl text-sm">{OnboardingPageData[onboardingStep].description}</div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          {renderInput()}

          <div className="ml-auto space-x-2 flex items-center">
            <button
              type="button"
              onClick={onPrevStepButtonClick}
              className="sm:w-24 w-14 sm:h-24 h-14 rounded-full bg-gray-200 disabled:opacity-50"
              disabled={!Boolean(onboardingStep)}
            >
              <div className="sm:w-11 w-8 sm:h-11 h-8 mx-auto">
                <ChevronLeftIcon />
              </div>
            </button>
            <button
              type="button"
              onClick={onNextStepButtonClick}
              className="sm:w-24 w-14 sm:h-24 h-14 rounded-full bg-gray-200 disabled:opacity-50"
              disabled={!isDirty || !isValid}
            >
              <div className="sm:w-11 w-8 sm:h-11 h-8 mx-auto">
                <ChevronRightIcon />
              </div>
            </button>
          </div>
        </form>
      </div>
    </LoginLayout>
  );
};
