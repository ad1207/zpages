'use client'
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from '../styles/Home.module.scss';
import { Menu, MenuItem, Snackbar, Alert, Divider } from "@mui/material";
import Image from "next/image";
import { useSnapshot } from "valtio";
import content from '../utils/content' 
import path from "path";
import axios from "axios";

const Header = ({ username = "" }) => {
  //  const snap = useSnapshot(content);
    const router = useRouter();
    const pathname = usePathname();
    const [anchorEl, setAnchorEl] = useState(null);
    const [isDisable, setIsDisable] = useState(false);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const [snack, setSnack] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const handleSignout = () => {
      axios.post(`/api/auth/logout`, {}).then(function (response) {
        localStorage.removeItem("islogged");
        localStorage.removeItem("user");
        state.islogged = false;
        router.push(`/`);
      });
    };
    const handleView = () => {
      let blog_id = pathname.split("/")[3];
      router.push(`/blog-preview/${blog_id}`);
    };
  
    const handleLeadView = () => {
      router.push(`/lead-page/preview/${router.query.lead_page_id}`);
    };
  
    const handlePublishLead = async () => {
      let resp = await axios.put(
        `/api/lead-page/publish/${router.query.lead_page_id}`
      );
      if (resp.status === 200) {
        setSnack(true);
        setMessage("Lead page published successfully");
        router.push("/dashboard");
      }
    };
  
    const handlePublish = async () => {
      let requestBody = {
        status: "P",
        published_status: "Y",
        blog_id: pathname.split("/")[3],
      };
      console.log("requestBody", requestBody)
    //  if (snap.obj != null) requestBody["content"] = snap.obj;
      let resp = await axios.put(`/api/blog/publish`, requestBody);
      if (resp.status === 200) {
        // Router.push('/dashboard')
        if (resp.data.isError) {
          setSnack(true);
          setMessage(`Fill the mandatory fields ${resp.data.error} `);
          setIsError(true);
        } else {
          setSnack(true);
          setMessage("blog published successfully");
          router.push("/dashboard");
        }
      }
    };
    //disable header
    // if(pathname.startsWith('/lead-page/') || pathname.startsWith('/blog/')) ;

    console.log(pathname);
    
    useEffect(() => {
      if(pathname.startsWith('/lead-page/') || pathname.startsWith('/blog/')) {
        console.log("pathname",pathname)
        setIsDisable(true);
      }
      else{
        setIsDisable(false);
      }
    }, [pathname])

    return (
      <>
        {!isDisable && (
          <div className={styles.toolbar__wrapper}>
            <div>
              <Link style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }} href={`/dashboard`}>
                
                  <Image
                    src="/static/images/webb1.svg"
                    alt="edit"
                    width={80}
                    height={42}
                  />
                
              </Link>
            </div>
  
            <div style={{ display: "flex", alignItems: "center" }}>
              {(pathname.startsWith("/admin/blog-edit/")) && (
                <div style={{ display: "flex" }}>
                  <div
                    onClick={() => handleView()}
                    style={{ display: "contents", cursor: "pointer" }}
                  >
                    <Image
                      src="/static/images/preview.svg"
                      alt="gallery"
                      width={30}
                      height={30}
                    />
                  </div>
  
                  <div onClick={() => handlePublish()}>
                    <span className={styles.publish}>Publish</span>
                  </div>
                </div>
              )}
              {/* lead page preview option  */}
  
              {(pathname.startsWith("/lead-page/research/")) && (
                <div style={{ display: "flex" }}>
                  <div
                    onClick={() => handleLeadView()}
                    style={{ display: "contents", cursor: "pointer" }}
                  >
                    <Image
                      src="/static/images/preview.svg"
                      alt="gallery"
                      width={30}
                      height={30}
                    />
                  </div>
                  <div onClick={() => handlePublishLead()}>
                    <span className={styles.publish}>Publish</span>
                  </div>
                </div>
              )}
              <div
                style={{
                  zIndex: "10",
                  position: "relative",
                  display: "flex",
                  paddingLeft: "16px",
                  cursor: "pointer",
                }}
              >
                <div style={{ padding: "0 0.8rem" }} onClick={handleClick}>
                  {username}
                </div>
  
                <Image
                  src="/static/images/down-arrow.svg"
                  onClick={handleClick}
                  alt="edit"
                  width={12}
                  height={20}
                />
  
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  elevation={2}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <Link href={`/admin/category`}>
                      Category
                    </Link>
                  </MenuItem>
  
                  <MenuItem onClick={handleClose}>
                    <Link href={`/admin/tag`}>
                      Tags
                    </Link>
                  </MenuItem>
  
                  <MenuItem onClick={handleClose}>
                    <Link href="/admin/user">
                      User
                    </Link>
                  </MenuItem>
  
                  <MenuItem onClick={handleClose}>
                    <Link href="/admin/company">
                    Profile
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleClose}>My account</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleSignout}>Sign Out</MenuItem>
                  {/* <MenuItem onClick={() => signout(() => Router.replace(`/ `))}>Singout</MenuItem> */}
                </Menu>
              </div>
            </div>
          </div>
        )}
        <Snackbar
          open={snack}
          autoHideDuration={3000}
          onClose={() => setSnack(false)}
        >
          <Alert
            elevation={6}
            onClose={() => setSnack(false)}
            variant="filled"
            severity={isError ? "error" : "success"}
          >
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
  
  export default Header;  