import React from 'react'
import PropTypes from 'prop-types'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import theme from '.'

const ThemeProvider = ({ children }) => (
  <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
)

ThemeProvider.propTypes = {
  children: PropTypes.any,
}

export default ThemeProvider
