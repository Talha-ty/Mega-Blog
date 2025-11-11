import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/conf";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import AppTheme from '../components/customization/AppTheme'
import CssBaseline from "@mui/material/CssBaseline";
import { Header } from '../components'
import Footer from "../components/Footer/Footer";

export default function Post(props) {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    

    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8 mt-24">
       <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <Header />
      <Container>
        <div className="border p-2 text bg-[rgb(11, 14, 20)] mb-4 rounded-xl">
        <div className="w-full flex flex-column justify-center mb-4 relative  rounded-xl p-2">
          <img
            src={appwriteService.getFilePreview(post.featuredImage)}
            alt={post.title}
            className="rounded-xl"
            height={100}
          />

          {isAuthor && (
            <div className="absolute right-6 top-6">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-blue-600" className="mr-3">
                  Edit
                </Button>
              </Link>
              <Button bgColor="bg-red-600" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
          
        </div>
        <div className="w-full mb-6 mx-4 my-4">
            <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
            <div className="browser-css">{parse(post.content)}</div>
          </div>
          </div>
      </Container>
      <Footer/>
      </AppTheme>
    </div>
  ) : null;
}
