import React, {useEffect, useState} from 'react'
import {Container} from '../components/index'
import {PostFrom} from '../components/index'
import appwriteService from "../appwrite/conf";
import { useNavigate,  useParams } from 'react-router-dom';
import AppTheme from '../components/customization/AppTheme'
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from '../components'

function EditPost(props) {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
    <>
    <div className='mt-24'>
       <AppTheme {...props}>
             <CssBaseline enableColorScheme />
             <Header />
             <Container maxWidth="lg" component="main">
               <PostFrom post={post} />
             </Container>
             </AppTheme >
             </div>
             )
   </>
  ) : null
}

export default EditPost