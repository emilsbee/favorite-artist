// External imports
import React from 'react'
import { NavLink } from 'react-router-dom'
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  padding: 0;
  background: #966fd6;
  color: white;
`

const NavSection = styled.section`
  width: 100%;
  display: flex;
  align-items: baseline;
`

const NavTitle = styled.h1`
  margin-left: 50px;
  margin-right: 50px;
`

const NavContent = styled.div`
  display: flex;
  justify-content: space-between;
`

const NavLinks = styled.div`
  display: flex;
`

const StyledNavLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
`

const NavBar = () => {
    return (
        <Nav>
            <NavSection>
                <NavTitle>
                    The Notorious B.I.G.
                </NavTitle>

                <NavContent>
                    <NavLinks>
                        <StyledNavLink to={"/"} activeStyle={{borderBottom: "2px solid white"}}>
                            Albums
                        </StyledNavLink>
                    </NavLinks>
                </NavContent>

            </NavSection>
        </Nav>
    )
}

export default NavBar