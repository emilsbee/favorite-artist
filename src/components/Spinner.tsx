// External imports
import React from "react"
import styled from "styled-components";

// Internal imports
import {ReactComponent as SpinnerIcon} from "../svgIcons/spinner.svg";


const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`
const StyledSpinnerIcon = styled(SpinnerIcon)`
  height: 6rem;
  width: 6rem;
`

const Spinner = () => (
    <Wrapper>
        <StyledSpinnerIcon/>
    </Wrapper>
)

export default Spinner