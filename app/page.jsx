"use client";

import styles from "../styles/home.module.css";

import ContactsSection from "@/components/ContactsSection";
import PostInputBtn from "@/components/PostInputBtn";
import PostCardModal from "@/components/PostCardModal";
import PostedCard from "@/components/PostedCard";
import FollowingSection from "@/components/FollowingSection";
import Footer from "@/components/Footer";

import { useSelector } from "react-redux";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const [postedCardList, setPostedCardList] = useState([]);
  const [isPostCardModalOpen, setIsPostCardModalOpen] = useState(false);
  const [refreshPost, setRefreshPost] = useState(false);

  const user = useSelector((state) => state.user.value);

  if (!user.publicId) {
    redirect("/login");
  }

  // Chargement de toutes les publications
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/posts", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        });
        if (response.ok) {
          const data = await response.json();
          setPostedCardList(data.posts);
        }
      } catch (error) {
        console.error("Error during getting posts", error);
      }
    };
    fetchPosts();
  }, [refreshPost]);

  // Supprimer une publication
  const handlePostDeleted = (deletedPostId) => {
    setPostedCardList((prevPosts) => prevPosts.filter((post) => post._id !== deletedPostId));
  };

  // Liste de toutes les publications
  const posts = postedCardList.map((post) => (
    <PostedCard
      key={post._id}
      author={post.author}
      content={post.content}
      date={post.createdAt}
      postId={post._id}
      likes={post.likes.length}
      onPostDeleted={handlePostDeleted}
      onRefresh={() => setRefreshPost(!refreshPost)}
    />
  ));

  return (
    <div className={styles.page}>
      <FollowingSection />
      <Footer />
      <div className={styles.fluxContainer}>
        <div className={styles.flux}>
          <PostInputBtn onOpenPostCardModal={() => setIsPostCardModalOpen(true)} placeholder={`What's up, ${user.firstname} ?`} />
          {isPostCardModalOpen && (
            <PostCardModal onClosePostCardModal={() => setIsPostCardModalOpen(false)} onNewPost={() => setRefreshPost(!refreshPost)} />
          )}
          {posts}
        </div>
      </div>
      <ContactsSection />
    </div>
  );
}
