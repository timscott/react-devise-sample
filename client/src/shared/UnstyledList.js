import styled from 'styled-components';

const UnstyledList = styled.ul`
  list-style: none;
  padding: 0;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export default UnstyledList;
