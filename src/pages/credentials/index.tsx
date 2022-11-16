import AtomButton from '@Components/@atoms/AtomButton';
import AtomInput from '@Components/@atoms/AtomInput';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { useFormik } from 'formik';
import Cookies from 'js-cookie';
import { isUndefined } from 'lodash';
import { NextPageFC } from 'next';
import { getProviders, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import * as Yup from 'yup';

type SpotifyAuthProps = {
  providers: {
    spotify: {
      callbackUrl: string;
      id: string;
      name: string;
      signinUrl: string;
      type: string;
    };
  };
  access_token: string;
};

const Credentials: NextPageFC<SpotifyAuthProps> = ({ providers }) => {
  //   const user = useSession();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      CLIENT_ID: '',
      CLIENT_SECRET: ''
    },
    validationSchema: Yup.object({
      CLIENT_ID: Yup.string().required(),
      CLIENT_SECRET: Yup.string().required()
    }),
    onSubmit: (values) => {
      Cookies.set('CLIENT_ID', values.CLIENT_ID);
      Cookies.set('CLIENT_SECRET', values.CLIENT_SECRET);
      router.reload();
    }
  });

  return (
    <AtomWrapper
      padding="45px 90px"
      maxWidth="1440px"
      flexDirection="column"
      flexWrap="wrap"
      customCSS={css`
        gap: 10px;
        @media (max-width: 980px) {
          padding: 0px 30px;
        }
      `}
    >
      <AtomText color="white" fontSize="24px" fontWeight="bold">
        Credentials Spotify - Dashboard Projects
      </AtomText>
      <AtomText color="white" fontSize="18px" fontWeight="bold">
        Experimental - WARNING!
      </AtomText>
      <AtomText color="white" fontSize="16px" fontWeight="normal">
        Caution. if you change these variables, you may cause application
        errors.
      </AtomText>
      <AtomWrapper gap="20px">
        <AtomInput
          id="CLIENT_ID"
          type="text"
          formik={formik}
          placeholder="CLIENT_ID"
        />
        <AtomInput
          id="CLIENT_SECRET"
          type="text"
          formik={formik}
          placeholder="CLIENT_SECRET"
        />
        <AtomButton onClick={formik.submitForm}>Guardar</AtomButton>
      </AtomWrapper>
      <AtomWrapper>
        <AtomText color="white" fontSize="18px" fontWeight="bold">
          Your Credentials
        </AtomText>
        <AtomText color="WHITE">
          CONFIG_SPOTIFY.CLIENT_ID:{' '}
          {Cookies.get('CLIENT_ID') ?? '----DEFAULT PROJECT CLIENT_ID----'}
        </AtomText>
        <AtomText color="WHITE">
          CONFIG_SPOTIFY.CLIENT_SECRET:{' '}
          {Cookies.get('CLIENT_SECRET') ??
            '----DEFAULT PROJECT CLIENT_SECRET----'}
        </AtomText>
      </AtomWrapper>
      {!isUndefined(Cookies.get('CLIENT_ID')) &&
        !isUndefined(Cookies.get('CLIENT_SECRET')) && (
          <AtomButton
            backgroundColor="#1ED760"
            onClick={() => {
              signIn(providers?.spotify?.id);
            }}
            customCSS={css`
              border: none;
              border-radius: 50px;
              padding: 10px 20px;
              font-size: 16px;
              font-weight: bold;
              cursor: pointer;
              transition: all 0.3s ease-in-out;
              &:hover {
                box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
              }
            `}
          >
            Sing In Spotify
          </AtomButton>
        )}
    </AtomWrapper>
  );
};
export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers
    }
  };
}

Credentials.Layout = 'public';

export default Credentials;
