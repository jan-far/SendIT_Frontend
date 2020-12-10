import styled from 'styled-components';

export const Tbl = styled.table`
  display: block;
  width: 100%;
  justify-content: center;
  border-collapse: collapse;

  @media screen and (max-width: 768px) {
    overflow-x:  auto;
  }

  @media screen and (max-width: 480px) {
    overflow-x: auto;
  }
`;

export const Thead = styled.thead`
  background-color: #010127;
  color: white;
`;

export const Th = styled.th`
  text-align: center;
  padding: 15px;
  border: 1px solid #010157;
`;

export const Td = styled.td`
  text-align: center;
  padding: 15px;
  border: 1px solid;
  color: white;
`;
