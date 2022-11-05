import { gql } from '@apollo/client';

export const UPDATELYRICBYTRACKID = gql`
  mutation updateLyricByTrackId($input: UpdateLyricByTrackInput) {
    updateLyricByTrackId(input: $input) {
      id
      name
      duration
      lyrics {
        id
        phrase
        start
        translates {
          phrase
          id
        }
        artists {
          name
          id
          image
          color
        }
        notifies {
          id
        }
      }
    }
  }
`;
