import { injectGlobal } from 'styled-components'

export const globalStyles = () =>
  injectGlobal`
    html {
      font-size: 62.5%;
      font-family: 'Helvetica Neue', sans-serif;
      min-height: 100%;
    }
    
    body {
      margin: 0;
      font-size: 1.6rem;
    }
  `
