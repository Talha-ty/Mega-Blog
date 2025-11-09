import React from 'react'
import { Container } from '../components'
import { PostFrom } from '../components/index'
import AppTheme from '../components/customization/AppTheme'
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from '../components'

function AddPost(props) {
  return (
     <div className="mt-24">
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <Header />
      <Container maxWidth="lg" component="main">
        <PostFrom />
      </Container>
      </AppTheme >
      </div>
      )
}

  export default AddPost