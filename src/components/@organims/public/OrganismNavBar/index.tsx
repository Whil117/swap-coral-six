import AtomButton from '@Components/@atoms/AtomButton';
import AtomIcon from '@Components/@atoms/AtomIcon';
import { AtomText } from '@Components/@atoms/AtomText';
import AtomWrapper from '@Components/@atoms/Atomwrapper';
import { css } from '@emotion/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Sections = [
  {
    id: uuidv4(),
    name: 'Home',
    path: '/public',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661401537/group_otfmxi.svg'
  },
  {
    id: uuidv4(),
    name: 'Recommended',
    path: '/public/recommended',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661403453/like_n69iyx.svg'
  },
  {
    id: uuidv4(),
    name: 'Search',
    path: '/public/search',
    icon: 'https://res.cloudinary.com/whil/image/upload/v1661401540/search-normal_afllai.svg'
  }
];

const OrganismNavbar: FC = () => {
  const router = useRouter();
  return (
    <AtomWrapper
      backgroundColor="#191922"
      customCSS={css`
        grid-row: 1 / 2;
        grid-column: 1 / 2;
      `}
    >
      <AtomWrapper
        color="white"
        backgroundColor="#191922"
        customCSS={css`
          height: 100%;
          z-index: 2;
          display: grid;
          grid-template-rows: auto 1fr auto;
          border-radius: 0px 10px 0px 0px;
          top: 0;
          @media (max-width: 980px) {
            display: none;
          }
        `}
      >
        <AtomWrapper
          flexDirection="column"
          justifyContent="flex-start"
          alignItems="flex-start"
          padding="1rem"
          gap="1rem"
          customCSS={css`
            grid-row: 2;
          `}
        >
          <AtomButton
            padding="0px"
            backgroundColor="transparent"
            onClick={() =>
              router.push('/').then(() =>
                document?.getElementById('view')?.scroll({
                  top: 0,
                  behavior: 'smooth'
                })
              )
            }
          >
            <AtomIcon
              width="50px"
              height="50px"
              customCSS={css`
                grid-row: 1 / 2;
              `}
              color="default"
              icon="https://res.cloudinary.com/whil/image/upload/v1661402006/Group_101_a4dcb6.svg"
            />
          </AtomButton>
          {Sections?.map((section) => (
            <AtomButton
              key={section.id}
              padding="0px"
              backgroundColor="transparent"
              customCSS={css`
                gap: 20px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
              `}
              onClick={() => {
                router
                  .push({
                    pathname: section.path
                  })
                  .then(() => {
                    document?.getElementById('view')?.scroll({
                      top: 0,
                      behavior: 'smooth'
                    });
                  });
              }}
            >
              <AtomIcon
                width="30px"
                height="30px"
                color="default"
                customCSS={css`
                  svg {
                    path {
                      stroke: white;
                    }
                  }
                `}
                icon={section.icon}
              />
              <AtomText color="white" fontSize="16px" fontWeight={600}>
                {section.name}
              </AtomText>
            </AtomButton>
          ))}
        </AtomWrapper>
      </AtomWrapper>
    </AtomWrapper>
  );
};

export default OrganismNavbar;
