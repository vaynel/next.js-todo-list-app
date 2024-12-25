import styled from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';

const Header = () => {
  return (
    <HeaderContainer>
      <Logo>
        <FaCalendarAlt />
        Todo Calendar
      </Logo>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.header`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    font-size: 28px;
  }
`;
