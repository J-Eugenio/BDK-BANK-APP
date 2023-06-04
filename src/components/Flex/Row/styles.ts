import styled from 'styled-components/native';

interface ContainerProps  {
  align?: 'center' | 'flex-end' | 'flex-start' |
  'space-between' | 'space-around'
}

export const Container = styled.View<ContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: ${({ align }) => align || 'space-between' };
  width: 100%;
  align-items: center;
`;