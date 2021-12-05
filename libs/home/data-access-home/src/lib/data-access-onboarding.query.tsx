import { gql } from '@apollo/client';
import router from 'next/router';
import { useSetNickNameOnHomeMutation } from './data-access-onboarding.query.generated';

gql`
  mutation SetNickNameOnHome($setNickNameInput: SetNickNameInput!) {
    setNickName(setNickNameInput: $setNickNameInput) {
      nickName
    }
  }
`;

export function useDataAccessOnboarding() {
  const [updateNickName, { loading: isUpdateNickNameLoading }] = useSetNickNameOnHomeMutation({
    onCompleted: ({ setNickName: { nickName } }) => {
      router.push(`/${nickName}`);
    },
  });

  const setNickName = (nickName: string) => {
    updateNickName({ variables: { setNickNameInput: { nickName } } });
  };

  return { setNickName, isUpdateNickNameLoading };
}
