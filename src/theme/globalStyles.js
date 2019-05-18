import { createGlobalStyle } from 'styled-components'
import globalStyleRules from './globalStyleRules'
import normalize from './normalize'

const GlobalStyle = createGlobalStyle`${normalize} ${globalStyleRules}`

export default GlobalStyle
