import styles from "@/styles/profile.module.css";

export async function getUserData(id) {
  const res = await fetch(`http://localhost:3000/users/${id}`);
  if (!res.ok) {
    throw new Error("User not found");
  }
  return res.json();
}

export default async function Profile({ params }) {
  const { id } = params;
  let userData;

  try {
    userData = await getUserData(id);
  } catch (error) {
    return <p>Profil introuvable</p>;
  }

  return (
    <div className={styles.page}>
      <p>ProfilePage {userData.profile.firstname}</p>
      <p>ID: {userData._id}</p>
    </div>
  );
}
