import styled from 'tailwind';

const StyledSharedLibs = styled.div`
  color: pink;
`;
export function SharedLibs() {
  return (
    <StyledSharedLibs>
      <h1>Welcome to SharedLibs!</h1>
    </StyledSharedLibs>
  );
}

export default SharedLibs;
